import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StageItem from './StageItem';

function ListStagesPage() {
  const [stages, setStages] = useState([]);  // Stockage des stages récupérés depuis le backend
  const [selectedStage, setSelectedStage] = useState(null);
  const [loading, setLoading] = useState(true);  // Gestion du chargement
  const [error, setError] = useState(null);  // Gestion des erreurs

  // Appel à l'API Spring Boot pour récupérer les stages
  useEffect(() => {
    axios.get('http://localhost:8080/stages')
      .then(response => {
        setStages(response.data);  // Mettre à jour l'état avec les données des stages
        setLoading(false);  // Arrêter l'indicateur de chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des stages', error);
        setError("Erreur lors du chargement des stages");
        setLoading(false);
      });
  }, []);

  const showDetails = (stage) => {
    setSelectedStage(stage);  // Stocker l'étape sélectionnée pour afficher les détails
  };

  if (loading) {
    return <p>Chargement des stages...</p>;  // Message pendant le chargement
  }

  if (error) {
    return <p>{error}</p>;  // Message en cas d'erreur
  }

  return (
    <div>
      <h1>Liste des Stages</h1>
      <ul className="list-group">
        {stages.map(stage => (
          <StageItem key={stage.id} stage={stage} onShowDetails={showDetails} />
        ))}
      </ul>

      {/* Afficher les détails du stage sélectionné */}
      {selectedStage && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résumé du stage à {selectedStage.entreprise}</h2>
          <p>Sujet : {selectedStage.sujet}</p>
          <p>Lieu : {selectedStage.location}</p>
        </div>
      )}
    </div>
  );
}

export default ListStagesPage;
