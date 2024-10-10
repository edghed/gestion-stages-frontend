import React from 'react';
import { Link } from 'react-router-dom';

function InternshipItem({ internship, onShowDetails }) {
  return (
    <li className="list-group-item">
      <h3>{internship.title}</h3>
      <p>Entreprise : {internship.company}</p>
      <p>Lieu : {internship.location}</p>

      {/* Bouton pour afficher les détails dans une autre page */}
      <Link to={`/internships/${internship.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour afficher les détails dans la même page */}
      <button onClick={() => onShowDetails(internship)} className="btn btn-secondary">Afficher résumé</button>
    </li>
  );
}

export default InternshipItem;
