// ListStudentsPage.js
import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import StudentItem from './StudentItem';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const ListStudentsPage = () => {
  const axiosInstance = useAxios();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Ajouter un état de chargement
  const { userRole } = useAuth();
  const navigate = useNavigate();

  // Fonction pour récupérer les étudiants
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('/students');
      setStudents(Array.isArray(response.data) ? response.data : []);
      setLoading(false); // Arrêter le chargement une fois les données chargées
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
      setError("Impossible de charger les étudiants.");
      setLoading(false); // Arrêter le chargement en cas d'erreur
    }
  };

  // Appeler `fetchStudents` une seule fois au montage
  useEffect(() => {
    fetchStudents();
  }, []);

  // Gestion de la suppression locale d'un étudiant
  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Affichage du message d'erreur si une erreur est survenue
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Liste des étudiants</h2>

      {/* Affichage du bouton Ajouter un étudiant si l'utilisateur est administrateur */}
      {userRole === 'Role_Admin' && (
        <button onClick={() => navigate('/add-student')} className="btn btn-primary mb-3">
          Ajouter un étudiant
        </button>
      )}

      {/* Affichage du chargement */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        /* Affichage de la liste des étudiants */
        students.length > 0 ? (
          <ul className="list-group">
            {students.map(student => (
              <StudentItem
                key={student.id}
                student={student}
                onDelete={userRole === 'Role_Admin' ? handleDelete : null} 
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Aucun étudiant trouvé.</p>
        )
      )}
    </div>
  );
};

export default ListStudentsPage;
