import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ResultPage.css";
import "../../App.css";
import "../react/PlayPage.jsx";

const ResultPage = () => {
  // Recupera lo stato passato dalla PlayPage usando useLocation
  const location = useLocation();
  const { malts, hops, yeast, beerName } = location.state || {};

  // Inizializza gli stati per i pesi dei malti
  const [maltWeights, setMaltWeights] = useState(
    malts?.reduce((acc, malt) => ({ ...acc, [malt]: "" }), {}) || {}
  );
  const [finalRecipe, setFinalRecipe] = useState(null);

  // Funzione per aggiornare il peso di ciascun malto
  const handleWeightChange = (malt, weight) => {
    setMaltWeights((prev) => ({
      ...prev,
      [malt]: weight,
    }));
  };

  // Calcolo della percentuale di alcool stimata
  const calculateAlcoholContent = (weights) => {
    let totalKg = 0;

    Object.entries(weights).forEach(([_, weight]) => {
      const numericWeight = parseFloat(weight) || 0;
      totalKg += numericWeight;
    });

    const alcoholPercentage = (totalKg / 10) * 8;
    return Math.min(Math.max(alcoholPercentage.toFixed(1), 0), 100);
  };

  // Conferma della ricetta
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
                {finalRecipe.recipeName && (
                  <div className="recipe-name">{finalRecipe.recipeName}</div>
                )}
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
                  Alcool Stimato: {finalRecipe.estimatedAlcohol}%
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
