import React from 'react';
import { Link } from 'react-router-dom';

function SupervisorItem({ supervisor, onShowDetails }) {
  return (
    <li className="list-group-item">
      <h3>{supervisor.name}</h3>
      <p>Email : {supervisor.email}</p>
      <p>Spécialisation : {supervisor.specialization}</p>

      {/* Bouton pour afficher les détails dans une autre page */}
      <Link to={`/supervisors/${supervisor.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour afficher les détails dans la même page */}
      <button onClick={() => onShowDetails(supervisor)} className="btn btn-secondary">Afficher résumé</button>
    </li>
  );
}

export default SupervisorItem;
