import React from 'react';
import { Link } from 'react-router-dom';

function StageItem({ stage, onShowDetails }) {
  return (
    <li className="list-group-item">
      <h3>{stage.entreprise}</h3> {}
      <p>Sujet : {stage.sujet}</p>
      <p>Lieu : {stage.location}</p>

      {/* Bouton pour afficher les détails dans une autre page */}
      <Link to={`/stages/${stage.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour afficher les détails dans la même page */}
      <button onClick={() => onShowDetails(stage)} className="btn btn-secondary">Afficher résumé</button>
    </li>
  );
}

export default StageItem;
