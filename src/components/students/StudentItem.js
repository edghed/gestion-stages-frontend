import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../useAxios'; 

function StudentItem({ student, onDelete }) {
  const navigate = useNavigate();
  const axiosInstance = useAxios(); 

  
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${student.firstName} ${student.lastName} ?`)) {
      axiosInstance.delete(`/students/${student.id}`) 
        .then(() => {
          onDelete(student.id); 
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de l'étudiant :", error);
        });
    }
  };

  return (
    <li className="list-group-item">
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Email : {student.email}</p>
      <p>Département : {student.department}</p>
      
      {/* Bouton pour voir les détails */}
      <Link to={`/students/${student.id}`} className="btn btn-primary">Voir détails</Link>

      {/* Bouton pour aller à la page de mise à jour */}
      <button onClick={() => navigate(`/students/update/${student.id}`)} className="btn btn-warning">Modifier</button>
      
      {/* Bouton pour supprimer */}
      <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
    </li>
  );
}

export default StudentItem;
