import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewStagePage() {
  const { id } = useParams();  // Récupère l'id du stage depuis l'URL
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    axios.get(`http://localhost:8080/stages/${id}`)
      .then(response => {
        setStage(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du stage', error);
        setError("Erreur lors du chargement du stage");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Chargement des détails du stage...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Détails du stage à {stage.entreprise}</h1>
      <p>Sujet : {stage.sujet}</p>
      <p>Lieu : {stage.location}</p>
    </div>
  );
}

export default ViewStagePage;
