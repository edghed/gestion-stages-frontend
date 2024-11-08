import React, { useState } from 'react';
import SupervisorItem from './SupervisorItem';

function ListSupervisorsPage() {
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  const supervisors = [
    { id: 1, name: 'Tuteur 1', email: 'tuteur1@example.com', specialization: 'Développement Web' },
    { id: 2, name: 'Tuteur 2', email: 'tuteur2@example.com', specialization: 'Data Science' },
    { id: 3, name: 'Tuteur 3', email: 'tuteur3@example.com', specialization: 'Cybersécurité' }
  ];

  const showDetails = (supervisor) => {
    setSelectedSupervisor(supervisor);
  };

  return (
    <div>
      <h1>Liste des Tuteurs</h1>
      <ul className="list-group">
        {supervisors.map(supervisor => (
          <SupervisorItem key={supervisor.id} supervisor={supervisor} onShowDetails={showDetails} />
        ))}
      </ul>

      {}
      {selectedSupervisor && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résumé de {selectedSupervisor.name}</h2>
          <p>Email : {selectedSupervisor.email}</p>
          <p>Spécialisation : {selectedSupervisor.specialization}</p>
        </div>
      )}
    </div>
  );
}

export default ListSupervisorsPage;
