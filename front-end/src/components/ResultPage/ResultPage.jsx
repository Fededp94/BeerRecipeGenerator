import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ResultPage/ResultPage.css";
import "../App/App.css";

const ResultPage = () => {
  const location = useLocation();
  const { malts, hops, yeast, beerName } = location.state || {};
  const navigate = useNavigate();

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
      return "😢";
    } else if (percentage > 4 && percentage <= 5.9) {
      return "😊";
    } else {
      return "😁";
    }
  };

  // Funzione aggiornata per gestire il salvataggio della ricetta
  const handleSaveRecipe = () => {
    if (!finalRecipe) {
      alert("Per favore, conferma prima la ricetta");
      return;
    }

    // Recupera le ricette esistenti dal localStorage
    const existingRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];

    // Controlla se una ricetta con lo stesso nome esiste già
    const recipeExists = existingRecipes.some(
      (recipe) => recipe.beerName === finalRecipe.beerName
    );

    if (recipeExists) {
      const shouldOverwrite = window.confirm(
        "Esiste già una ricetta con questo nome. Vuoi sovrascriverla?"
      );
      if (shouldOverwrite) {
        const updatedRecipes = existingRecipes.map((recipe) =>
          recipe.beerName === finalRecipe.beerName ? finalRecipe : recipe
        );
        localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
        alert("Ricetta aggiornata con successo!");
      }
    } else {
      // Aggiungi la nuova ricetta
      const updatedRecipes = [...existingRecipes, finalRecipe];
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      alert("Ricetta salvata con successo!");
    }
  };

  return (
    <div>
      <div className="navbar"></div>

      <div className="container">
        <div className="recipe-container">
          <div className="recipe-section">
            <h3>Nome della Birra:</h3>
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

          <div className="recipe-section final-recipe custom-recipe">
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
                  Alcol Stimato: {finalRecipe.estimatedAlcohol}%{" "}
                  {getEmoji(finalRecipe.estimatedAlcohol)}
                </div>

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
