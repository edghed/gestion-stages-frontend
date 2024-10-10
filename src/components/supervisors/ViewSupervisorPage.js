import React from 'react';
import { useParams } from 'react-router-dom';

function ViewSupervisorPage() {
  const { id } = useParams();
  const supervisor = {
    id: id,
    name: 'Tuteur ' + id,
    email: 'tuteur' + id + '@example.com',
    specialization: 'Développement Web',
    description: 'Description détaillée du tuteur ' + id,
  };

  return (
    <div>
      <h1>Détails de {supervisor.name}</h1>
      <p>Email : {supervisor.email}</p>
      <p>Spécialisation : {supervisor.specialization}</p>
      <p>Description : {supervisor.description}</p>
    </div>
  );
}

export default ViewSupervisorPage;
