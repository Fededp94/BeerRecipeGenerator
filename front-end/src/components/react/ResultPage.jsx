import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ResultPage.css";
import "../css/App.css";

const ResultPage = () => {
  const location = useLocation();
  const { malts, hops, yeast, beerName } = location.state || {};
  const navigate = useNavigate(); // Hook per la navigazione

  const [maltWeights, setMaltWeights] = useState(
    malts?.reduce((acc, malt) => ({ ...acc, [malt]: "" }), {}) || {}
  );
  const [finalRecipe, setFinalRecipe] = useState(null);

  const handleWeightChange = (malt, weight) => {
    setMaltWeights((prev) => ({
      ...prev,
      [malt]: weight,
    }));
  };

  const calculateAlcoholContent = (weights) => {
    let totalKg = 0;

    Object.entries(weights).forEach(([_, weight]) => {
      const numericWeight = parseFloat(weight) || 0;
      totalKg += numericWeight;
    });

    const alcoholPercentage = (totalKg / 10) * 8;
    return Math.min(Math.max(alcoholPercentage.toFixed(1), 0), 100);
  };

  const handleConfirm = () => {
    const scaledWeights = {};
    Object.entries(maltWeights).forEach(([malt, weight]) => {
      if (weight) {
        scaledWeights[malt] = parseFloat(weight);
      }
    });

    setFinalRecipe({
      beerName,
      malts: scaledWeights,
      hops,
      yeast,
      estimatedAlcohol: calculateAlcoholContent(scaledWeights),
    });
  };

  const getEmoji = (percentage) => {
    if (percentage >= 0 && percentage <= 4) {
      return "😢"; // triste
    } else if (percentage > 4 && percentage <= 5.9) {
      return "😊"; // felice
    } else {
      return "😁"; // felicissima
    }
  };

  // Funzione per gestire il salvataggio della ricetta
  const handleSaveRecipe = () => {
    console.log("Ricetta salvata!"); // Logica per salvare la ricetta
  };

  return (
    <div>
      <div className="navbar"></div>

      <div className="container">
        <div className="recipe-container">
          <div className="recipe-section">
            <h3>Nome della Birra</h3>
            {beerName ? (
              <div className="beer-name">{beerName}</div>
            ) : (
              <p>Il nome della birra non è stato inserito</p>
            )}
            <div>
              <h3>Malti:</h3>
              {malts?.map((malt) => (
                <div key={malt} className="malt-input">
                  <span>{malt}</span>
                  <input
                    type="number"
                    value={maltWeights[malt]}
                    onChange={(e) => handleWeightChange(malt, e.target.value)}
                    placeholder="kg"
                  />
                </div>
              ))}
            </div>
            <div>
              <h3>Luppoli:</h3>
              <ul>
                {hops?.map((hop) => (
                  <li key={hop}>{hop}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Lieviti:</h3>
              <p>{yeast || "None"}</p>
            </div>
            <div className="button-container">
              <button className="confirm-button" onClick={handleConfirm}>
                Conferma Ricetta
              </button>
            </div>
          </div>

          <div className="recipe-section final-recipe">
            <h2>Ricetta Finale (25 Litri)</h2>
            {finalRecipe ? (
              <>
                <div className="recipe-name">{finalRecipe.beerName}</div>
                <div>
                  <h3>Malti:</h3>
                  <ul>
                    {Object.entries(finalRecipe.malts).map(([malt, weight]) => (
                      <li key={malt}>
                        {malt}: <span className="malt-amount">{weight} kg</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Luppoli:</h3>
                  <ul>
                    {finalRecipe.hops?.map((hop) => (
                      <li key={hop}>{hop}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Lieviti:</h3>
                  <p>{finalRecipe.yeast || "None"}</p>
                </div>
                <div className="alcohol-content">
                  Alcool Stimato: {finalRecipe.estimatedAlcohol}%{" "}
                  {getEmoji(finalRecipe.estimatedAlcohol)}
                </div>

                {/* Pulsanti sotto l'alcool stimato */}
                <div className="button-group">
                  <button
                    className="btn-confirm"
                    onClick={() => navigate("/lemiericette")}>
                    Le mie ricette
                  </button>
                  <button className="btn-confirm" onClick={handleSaveRecipe}>
                    Salva ricetta
                  </button>
                  <button className="btn-confirm" onClick={() => navigate("/")}>
                    Ricomincia
                  </button>
                </div>
              </>
            ) : (
              <p>Conferma la ricetta per vedere il calcolo finale</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
