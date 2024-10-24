import { jsPDF } from "jspdf";

export const generateRecipePDF = (recipe) => {
  const doc = new jsPDF();

  const remToPt = (rem) => rem * 16;

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  const addNewPage = () => {
    doc.addPage();

    doc.setFillColor(255, 187, 0);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setDrawColor(51, 51, 51);
    doc.setLineWidth(3);
    doc.rect(0, 0, pageWidth, pageHeight);
    return margin;
  };

  const checkNewPage = (currentY, textHeight = 10) => {
    if (currentY + textHeight > pageHeight - margin) {
      return addNewPage();
    }
    return currentY;
  };

  doc.setFillColor(255, 187, 0);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 60, "F");

  doc.setDrawColor(51, 51, 51);
  doc.setLineWidth(3);
  doc.rect(0, 0, pageWidth, pageHeight);

  doc.setTextColor(51, 51, 51);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(remToPt(4));

  const titleWidth = doc.getTextWidth(recipe.name);
  const xPos = (pageWidth - titleWidth) / 2;
  doc.text(recipe.name, xPos, 40);

  doc.setTextColor(51, 51, 51); // #333333

  let yPos = 90;

  const addSection = (title, items, includeWeight = false) => {
    yPos = checkNewPage(yPos, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(remToPt(1.3));
    doc.text(title, 20, yPos);
    yPos += 15;

    doc.setFont("helvetica", "medium");
    doc.setFontSize(remToPt(1));

    items.forEach((item) => {
      yPos = checkNewPage(yPos, 15);
      const text = includeWeight
        ? `• ${item} - ${recipe.maltWeights[item] || "0"}kg`
        : `• ${item}`;
      doc.text(text, 30, yPos);
      yPos += 10;
    });

    yPos += 10;
  };

  addSection("Malti:", recipe.malts, true);
  addSection("Luppoli:", recipe.hops);
  addSection("Lieviti:", recipe.yeasts);

  yPos = checkNewPage(yPos, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(remToPt(1.2));
  yPos += 2;
  doc.text(`Alcol stimato: ${recipe.estimatedAlcohol}%`, 20, yPos);

  yPos += 25;
  yPos = checkNewPage(yPos, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(remToPt(1.1));
  doc.text("Procedimento per fare questa ricetta a casa (25 Litri):", 20, yPos);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(remToPt(0.9));
  yPos += 15;

  const procedimento = [
    "1. Scalda 30 litri d'acqua a 67°C",
    "2. Aggiungi i malti in infusione e mescola bene",
    "3. Mantieni la temperatura tra 65-68°C per 60 minuti",
    "4. Dopo i 60 minuti di infusione, filtra con un colino, o un filtro apposito, il liquido(mosto) dalla parte solida dei malti e mettilo in un altra pentola che porterai a bollore",
    "5. Porta a bollore, fai bollire per 60 minuti e aggiungi i luppoli secondo ricetta, se li aggiungi a 10 minuti dalla fine estrarrai più aroma al contrario più amaro ",
    "6. Raffredda velocemente a 20°C, con una serpentina per birra o alimenti",
    "7. Trasferisci tutto nel fermentatore, cercando di lasciare sul fondo i residui solidi, aggiungi i litri mancanti per arrivare a 25 Litri in fermentatore, aggiungi il lievito e chiudi bene, non deve entrare aria esterna!!",
    "8. Lascia fermentare per 2 settimane a 20°C Lievito ad alta Fermentazione e 9°C-11°C se utilizzi un Lievito a bassa fermentazione",
    "9. Imbottiglia aggiungendo 4g/L di zucchero",
    "10. Tieni a riposo le bottiglie a 20°C per alemno 1 mese e mezzo",
    "11. Stappa! Cheers!",
  ];

  procedimento.forEach((step) => {
    const lines = doc.splitTextToSize(step, maxWidth - 20);
    lines.forEach((line) => {
      yPos = checkNewPage(yPos, 12);
      doc.text(line, 20, yPos);
      yPos += 10;
    });
  });

  doc.save(`${recipe.name.replace(/\s+/g, "_")}.pdf`);
};
