import React, { useState } from 'react';
import InternshipItem from './InternshipItem';

function ListInternshipsPage() {
  const [selectedInternship, setSelectedInternship] = useState(null);

  const internships = [
    { id: 1, title: 'Stage Développement Web', company: 'Entreprise A', location: 'Paris' },
    { id: 2, title: 'Stage Data Science', company: 'Entreprise B', location: 'Lyon' },
    { id: 3, title: 'Stage Cybersécurité', company: 'Entreprise C', location: 'Marseille' }
  ];

  const showDetails = (internship) => {
    setSelectedInternship(internship);
  };

  return (
    <div>
      <h1>Liste des Stages</h1>
      <ul className="list-group">
        {internships.map(internship => (
          <InternshipItem key={internship.id} internship={internship} onShowDetails={showDetails} />
        ))}
      </ul>

      {/* Afficher les détails du stage sélectionné */}
      {selectedInternship && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résumé du stage : {selectedInternship.title}</h2>
          <p>Entreprise : {selectedInternship.company}</p>
          <p>Lieu : {selectedInternship.location}</p>
        </div>
      )}
    </div>
  );
}

export default ListInternshipsPage;
