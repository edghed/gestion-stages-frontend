import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipItem from './InternshipItem';

function ListInternshipsPage() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/stages')
      .then(response => {
        setStages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des stages', error);
        setError("Erreur lors du chargement des stages");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/stages/${id}`)
      .then(() => {
        setStages(stages.filter(stage => stage.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du stage', error);
        setError("Erreur lors de la suppression du stage");
      });
  };

  if (loading) {
    return <p>Chargement des stages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Liste des Stages</h1>
      <ul className="list-group">
        {stages.length > 0 ? (
          stages.map(stage => (
            <InternshipItem
              key={stage.id}
              stage={stage}
              onDelete={() => handleDelete(stage.id)} // Assurez-vous que cette prop est correctement passée en tant que fonction
            />
          ))
        ) : (
          <p>Aucun stage disponible.</p>
        )}
      </ul>
    </div>
  );
}

export default ListInternshipsPage;
