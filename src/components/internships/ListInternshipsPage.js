// ListInternshipsPage.js
import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import InternshipItem from './InternshipItem';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const ListInternshipPage = () => {
  const axiosInstance = useAxios();
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState(null);
  const { userRole } = useAuth();
  const navigate = useNavigate(); // Utilisation de `useNavigate`

  const fetchInternships = async () => {
    try {
      const response = await axiosInstance.get('/stages');
      setInternships(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erreur lors du chargement des stages :", error);
      setError("Impossible de charger les stages.");
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = (id) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des stages</h2>

      {/* Bouton d'ajout visible uniquement pour les administrateurs */}
      {userRole === 'Role_Admin' && (
        <button onClick={() => navigate('/add-stage')} className="btn btn-primary">
          Ajouter un stage
        </button>
      )}

      {internships.length > 0 ? (
        <ul className="list-group">
          {internships.map(internship => (
            <InternshipItem
              key={internship.id}
              stage={internship}
              onDelete={userRole === 'Role_Admin' ? handleDelete : null} // Bouton de suppression uniquement pour admin
            />
          ))}
        </ul>
      ) : (
        <p>Aucun stage trouvé.</p>
      )}
    </div>
  );
};

export default ListInternshipPage;
