import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LeMieRicette.css";
import "../App/App.css";

const LeMieRicette = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:8080/api/recipes",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status === 200) {
          // Recupero i pesi dei malti dalla sessionStorage
          const recipesWithWeights = response.data.map((recipe) => {
            const maltWeights = JSON.parse(
              sessionStorage.getItem(`recipe-${recipe.id}-weights`) || "{}"
            );
            return {
              ...recipe,
              maltWeights,
            };
          });
          setRecipes(recipesWithWeights);
        }
      } catch (error) {
        console.error("Errore durante il caricamento delle ricette:", error);
      }
    };

    if (user) {
      fetchRecipes();
    }
  }, [user]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8080/api/recipes/${recipeId}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 204) {
        sessionStorage.removeItem(`recipe-${recipeId}-weights`);
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        setSelectedRecipe(null);
      }
    } catch (error) {
      console.error("Errore durante la cancellazione della ricetta:", error);
    }
  };

  const generatePDF = (recipe) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(recipe.name, 20, 20);

    doc.setFontSize(14);
    doc.text("Malti:", 20, 40);
    let yPos = 50;
    recipe.malts.forEach((malt) => {
      const weight = recipe.maltWeights[malt] || "0";
      doc.text(`${malt} - ${weight}kg`, 30, yPos);
      yPos += 10;
    });

    doc.text("Luppoli:", 20, yPos + 10);
    yPos += 20;
    recipe.hops.forEach((hop) => {
      doc.text(hop, 30, yPos);
      yPos += 10;
    });

    doc.text("Lieviti:", 20, yPos + 10);
    yPos += 20;
    recipe.yeasts.forEach((yeast) => {
      doc.text(yeast, 30, yPos);
      yPos += 10;
    });

    doc.text(`Alcool Stimato: ${recipe.estimatedAlcohol}%`, 20, yPos + 10);

    doc.save(`${recipe.name.replace(/\s+/g, "_")}.pdf`);
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
                    key={recipe.id || index}
                    className={`recipe-card ${
                      selectedRecipe === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRecipe(index)}>
                    <div className="recipe-card-content">
                      <h3>{recipe.name}</h3>
                      <h4>Malti: {recipe.malts.length}</h4>
                      <h4>Luppoli: {recipe.hops.length}</h4>
                      <h4>Alcol: {recipe.estimatedAlcohol}%</h4>
                    </div>
                    <div className="recipe-card-footer">
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(recipe.id);
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
                <h3>{recipes[selectedRecipe].name}</h3>
                <div className="recipe-content">
                  <h4>Malti:</h4>
                  <ul>
                    {recipes[selectedRecipe].malts.map((malt, index) => (
                      <li key={index} className="malt-item">
                        {malt} -{" "}
                        {recipes[selectedRecipe].maltWeights[malt] || "0"}kg
                      </li>
                    ))}
                  </ul>
                  <h4>Luppoli:</h4>
                  <ul>
                    {recipes[selectedRecipe].hops.map((hop, index) => (
                      <li key={index}>{hop}</li>
                    ))}
                  </ul>
                  <h4>Lieviti:</h4>
                  <ul>
                    {recipes[selectedRecipe].yeasts.map((yeast, index) => (
                      <li key={index}>{yeast}</li>
                    ))}
                  </ul>
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
