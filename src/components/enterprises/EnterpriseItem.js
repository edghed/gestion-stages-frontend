import React from 'react';
import { Link } from 'react-router-dom';

function EnterpriseItem({ enterprise, onShowDetails }) {
  return (
    <li className="list-group-item">
      <h3>{enterprise.name}</h3>
      <p>Secteur : {enterprise.sector}</p>
      <p>Lieu : {enterprise.location}</p>

      {/* Bouton pour afficher les détails dans une autre page */}
      <Link to={`/enterprises/${enterprise.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour afficher les détails dans la même page */}
      <button onClick={() => onShowDetails(enterprise)} className="btn btn-secondary">Afficher résumé</button>
    </li>
  );
}

export default EnterpriseItem;
