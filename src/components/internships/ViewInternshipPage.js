import React from 'react';
import { useParams } from 'react-router-dom';

function ViewInternshipPage() {
  const { id } = useParams();
  const internship = {
    id: id,
    title: 'Stage ' + id,
    company: 'Entreprise ' + id,
    location: 'Paris',
    description: 'Description détaillée du stage ' + id,
  };

  return (
    <div>
      <h1>Détails du stage : {internship.title}</h1>
      <p>Entreprise : {internship.company}</p>
      <p>Lieu : {internship.location}</p>
      <p>Description : {internship.description}</p>
    </div>
  );
}

export default ViewInternshipPage;
