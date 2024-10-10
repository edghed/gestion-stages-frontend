import React, { useState } from 'react';
import EnterpriseItem from './EnterpriseItem';

function ListEnterprisesPage() {
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  const enterprises = [
    { id: 1, name: 'Entreprise A', sector: 'Technologie', location: 'Paris' },
    { id: 2, name: 'Entreprise B', sector: 'Finance', location: 'Lyon' },
    { id: 3, name: 'Entreprise C', sector: 'Santé', location: 'Marseille' }
  ];

  const showDetails = (enterprise) => {
    setSelectedEnterprise(enterprise);
  };

  return (
    <div>
      <h1>Liste des Entreprises</h1>
      <ul className="list-group">
        {enterprises.map(enterprise => (
          <EnterpriseItem key={enterprise.id} enterprise={enterprise} onShowDetails={showDetails} />
        ))}
      </ul>

      {/* Afficher les détails de l'entreprise sélectionnée */}
      {selectedEnterprise && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résumé de {selectedEnterprise.name}</h2>
          <p>Secteur : {selectedEnterprise.sector}</p>
          <p>Lieu : {selectedEnterprise.location}</p>
        </div>
      )}
    </div>
  );
}

export default ListEnterprisesPage;
