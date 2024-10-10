import React from 'react';
import { Link } from 'react-router-dom';

function StudentItem({ student, onShowDetails }) {
  return (
    <li className="list-group-item">
      <h3>{student.name}</h3>
      <p>Email : {student.email}</p>
      <p>Département : {student.department}</p>
      
      {/* Bouton pour afficher le détail complet dans une autre page */}
      <Link to={`/students/${student.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour afficher les détails directement sur la même page */}
      <button onClick={() => onShowDetails(student)} className="btn btn-secondary">Afficher résumé</button>
    </li>
  );
}

export default StudentItem;
