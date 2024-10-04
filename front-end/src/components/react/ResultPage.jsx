import React from "react";
import { useLocation } from "react-router-dom"; // Per ottenere lo stato passato

const ResultPage = () => {
  const location = useLocation();
  const { malts, hops, yeast } = location.state || {}; // Estrai i dati passati

  return (
    <div className="container mt-5">
      <h1>Result Page</h1>
      <h2>Selected Ingredients</h2>
      <div>
        <h3>Malti:</h3>
        <ul>
          {malts?.map((malto) => (
            <li key={malto}>{malto}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Luppoli:</h3>
        <ul>
          {hops?.map((luppolo) => (
            <li key={luppolo}>{luppolo}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Lievito:</h3>
        <p>{yeast || "None"}</p>
      </div>
    </div>
  );
};

export default ResultPage;
