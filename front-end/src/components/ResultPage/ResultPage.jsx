import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ResultPage/ResultPage.css";
import "../App/App.css";

const ResultPage = () => {
  const { user } = useAuth();
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
    Object.values(weights).forEach((weight) => {
      totalKg += parseFloat(weight) || 0;
    });
    const alcoholPercentage = (totalKg / 10) * 8;
    return Math.min(Math.max(alcoholPercentage.toFixed(1), 0), 100);
  };

  const handleConfirm = () => {
    const scaledWeights = Object.fromEntries(
      Object.entries(maltWeights).filter(([_, weight]) => weight !== "")
    );

    setFinalRecipe({
      name: beerName,
      malts: Object.keys(scaledWeights),
      hops: hops,
      yeasts: [yeast],
      estimatedAlcohol: calculateAlcoholContent(scaledWeights),
    });
  };

  const getEmoji = (percentage) => {
    if (percentage >= 0 && percentage <= 4) return "😢";
    if (percentage > 4 && percentage <= 5.9) return "😊";
    return "😁";
  };

  const handleSaveRecipe = async () => {
    if (!finalRecipe) {
      alert("Per favore, conferma prima la ricetta");
      return;
    }
    if (!user) {
      alert("Devi essere loggato per salvare la ricetta");
      navigate("/");
      return;
    }

    const requestData = {
      name: finalRecipe.name,
      malts: finalRecipe.malts,
      hops: finalRecipe.hops,
      yeasts: finalRecipe.yeasts,
      estimatedAlcohol: finalRecipe.estimatedAlcohol,
      userEmail: user.email,
    };

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/recipes",
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: false,
      });

      if (response.status === 201 || response.status === 200) {
        const recipeId = response.data.id;
        if (recipeId) {
          sessionStorage.setItem(
            `recipe-${recipeId}-weights`,
            JSON.stringify(maltWeights)
          );
        }

        alert("Ricetta salvata con successo nel database!");
      }
    } catch (error) {
      if (error.response) {
        alert(
          "Errore nel salvataggio della ricetta: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
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
              <div className="recipe-name">{finalRecipe.name}</div>
              <div>
                <h3>Malti:</h3>
                <ul>
                  {finalRecipe.malts?.map((malt) => (
                    <li key={malt}>
                      {malt}:{" "}
                      <span className="malt-amount">
                        {maltWeights[malt]} kg
                      </span>
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
                <p>{finalRecipe.yeasts?.[0] || "None"}</p>
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
  );
};

export default ResultPage;
