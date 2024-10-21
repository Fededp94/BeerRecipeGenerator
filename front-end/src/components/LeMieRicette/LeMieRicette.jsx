import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LeMieRicette.css";
import "../App/App.css";

const LeMieRicette = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    // Funzione per caricare le ricette dal backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/user"); // Recupera le ricette dell'utente autenticato
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error("Errore durante il caricamento delle ricette");
        }
      } catch (error) {
        console.error("Errore durante la richiesta al server:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setSelectedRecipe(null);
      } else {
        console.error("Errore durante la cancellazione della ricetta");
      }
    } catch (error) {
      console.error("Errore durante la cancellazione della ricetta:", error);
    }
  };

  const generatePDF = (recipe) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(recipe.beerName, 20, 20);

    doc.setFontSize(14);
    doc.text("Malti:", 20, 40);
    let yPos = 50;
    Object.entries(recipe.malts).forEach(([malt, weight]) => {
      doc.text(`${malt}: ${weight} kg`, 30, yPos);
      yPos += 10;
    });

    doc.text("Luppoli:", 20, yPos + 10);
    yPos += 20;
    recipe.hops.forEach((hop) => {
      doc.text(`${hop}`, 30, yPos);
      yPos += 10;
    });

    doc.text(`Lievito: ${recipe.yeast}`, 20, yPos + 10);
    doc.text(`Alcool Stimato: ${recipe.estimatedAlcohol}%`, 20, yPos + 20);

    doc.save(`${recipe.beerName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div>
      <div className="navbar"></div>
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 recipes-list">
            <h2>Le mie ricette</h2>
            {recipes.length === 0 ? (
              <p>Non hai ancora salvato nessuna ricetta</p>
            ) : (
              <div className="recipes-grid">
                {recipes.map((recipe, index) => (
                  <div
                    key={recipe.id} // Cambiato da index a recipe.id
                    className={`recipe-card ${
                      selectedRecipe === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRecipe(index)}>
                    <div className="recipe-card-content">
                      <h3>{recipe.beerName}</h3>
                      <h4>Malti: {Object.keys(recipe.malts).length}</h4>
                      <h4>Luppoli: {recipe.hops.length}</h4>
                      <h4>Alcol: {recipe.estimatedAlcohol}%</h4>
                    </div>
                    <div className="recipe-card-footer">
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(recipe.id); // Passa l'ID della ricetta
                        }}>
                        Elimina
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-4 recipe-details">
            {selectedRecipe !== null && (
              <div className="selected-recipe">
                <h3>{recipes[selectedRecipe].beerName}</h3>
                <div className="recipe-content">
                  <h4>Malti:</h4>
                  <ul>
                    {Object.entries(recipes[selectedRecipe].malts).map(
                      ([malt, weight]) => (
                        <li key={malt}>
                          {malt}: {weight} kg
                        </li>
                      )
                    )}
                  </ul>
                  <h4>Luppoli:</h4>
                  <ul>
                    {recipes[selectedRecipe].hops.map((hop, index) => (
                      <li key={index}>{hop}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Lievito:</strong> {recipes[selectedRecipe].yeast}
                  </p>
                  <p>
                    <strong>Alcool Stimato:</strong>{" "}
                    {recipes[selectedRecipe].estimatedAlcohol}%
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => generatePDF(recipes[selectedRecipe])}>
                    Scarica PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="btn btn-secondary mt-4"
          onClick={() => navigate("/")}>
          Torna alla Home
        </button>
      </div>
    </div>
  );
};

export default LeMieRicette;
