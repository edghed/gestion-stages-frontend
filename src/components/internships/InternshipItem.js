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
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div>
        <h3>{stage.title}</h3>
        <p><strong>Description :</strong> {stage.description}</p>
        <p><strong>Date de début :</strong> {stage.dateDebut}</p>
        <p><strong>Date de fin :</strong> {stage.dateFin}</p>
      </div>

      <div className="btn-group">
        {/* Lien pour voir les détails, accessible à tous */}
        <Link to={`/stages/${stage.id}`} className="btn btn-primary btn-sm">
          Voir détails
        </Link>

        {/* Boutons de modification et suppression accessibles uniquement aux administrateurs */}
        {userRole === 'Role_Admin' && (
          <>
            <button
              onClick={() => navigate(`/update-stage/${stage.id}`)}
              className="btn btn-warning btn-sm"
            >
              Modifier
            </button>
            <button 
              onClick={handleDelete} 
              className="btn btn-danger btn-sm"
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default InternshipItem;
