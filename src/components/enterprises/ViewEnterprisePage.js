import React from 'react';
import { useParams } from 'react-router-dom';

function ViewEnterprisePage() {
  const { id } = useParams();
  const enterprise = {
    id: id,
    name: 'Entreprise ' + id,
    sector: 'Technologie',
    location: 'Paris',
    description: 'Description détaillée de l’entreprise ' + id,
  };

  return (
    <div>
      <h1>Détails de l’entreprise : {enterprise.name}</h1>
      <p>Secteur : {enterprise.sector}</p>
      <p>Lieu : {enterprise.location}</p>
      <p>Description : {enterprise.description}</p>
    </div>
  );
}

export default ViewEnterprisePage;
