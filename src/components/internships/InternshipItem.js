// InternshipItem.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../useAxios';
import { useAuth } from '../AuthContext';

function InternshipItem({ stage, onDelete }) {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { userRole } = useAuth();

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le stage "${stage.title}" ?`)) {
      axiosInstance.delete(`/stages/${stage.id}`)
        .then(() => {
          if (onDelete) onDelete(stage.id);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression du stage :", error);
        });
    }
  };

  return (
    <li className="list-group-item">
      <h3>{stage.title}</h3>
      <p>Description : {stage.description}</p>
      <p>Date de début : {stage.dateDebut}</p>
      <p>Date de fin : {stage.dateFin}</p>

      {/* Lien pour voir les détails, accessible à tous */}
      <Link to={`/stages/${stage.id}`} className="btn btn-primary" style={{ marginRight: '10px' }}>
        Voir détails
      </Link>

      {/* Boutons de modification et suppression accessibles uniquement aux administrateurs */}
      {userRole === 'Role_Admin' && (
        <>
          <button
            onClick={() => navigate(`/update-stage/${stage.id}`)}
            className="btn btn-warning"
            style={{ marginRight: '10px' }}
          >
            Modifier
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Supprimer
          </button>
        </>
      )}
    </li>
  );
}

export default InternshipItem;
