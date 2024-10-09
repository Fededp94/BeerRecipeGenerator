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
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    if (selectedRecipe === index) {
      setSelectedRecipe(null);
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
            <h2>Le Mie Ricette</h2>
            {recipes.length === 0 ? (
              <p>Non hai ancora salvato nessuna ricetta</p>
            ) : (
              <div className="recipes-grid">
                {recipes.map((recipe, index) => (
                  <div
                    key={index}
                    className={`recipe-card ${
                      selectedRecipe === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRecipe(index)}>
                    <div className="recipe-card-content">
                      <h3>{recipe.beerName}</h3>
                      <p>Alcool: {recipe.estimatedAlcohol}%</p>
                      <div className="recipe-details">
                        <p>Malti: {Object.keys(recipe.malts).length}</p>
                        <p>Luppoli: {recipe.hops.length}</p>
                      </div>
                    </div>
                    <div className="recipe-card-footer">
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(index);
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
