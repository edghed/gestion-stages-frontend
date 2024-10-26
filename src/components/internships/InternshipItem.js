import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function InternshipItem({ stage, onDelete }) {
  const navigate = useNavigate(); // Utilisé pour naviguer vers la page de mise à jour

  console.log("InternshipItem : onDelete reçu est :", onDelete); // Log pour voir la fonction reçue

  // Fonction pour supprimer un stage
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le stage "${stage.title}" ?`)) {
      // Appelle directement la fonction onDelete passée comme prop
      if (typeof onDelete === 'function') {
        onDelete();
      } else {
        console.error("onDelete n'est pas une fonction ou n'a pas été passé correctement");
      }
    }
  };

  return (
    <li className="list-group-item">
      <h3>{stage.title}</h3>
      <p>Description : {stage.description}</p>
      <p>Date de début : {stage.dateDebut}</p>
      <p>Date de fin : {stage.dateFin}</p>

      {/* Bouton pour voir les détails */}
      <Link to={`/stages/${stage.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour aller à la page de mise à jour */}
      <button onClick={() => navigate(`/update-stage/${stage.id}`)} className="btn btn-warning" style={{ marginRight: '10px' }}>Modifier</button>
      
      {/* Bouton pour supprimer */}
      <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
    </li>
  );
}

export default InternshipItem;
