import React, { useState } from 'react';
import StudentItem from './StudentItem';

function ListStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: 'Étudiant 1', email: 'etudiant1@example.com', department: 'Informatique' },
    { id: 2, name: 'Étudiant 2', email: 'etudiant2@example.com', department: 'Mathématiques' },
    { id: 3, name: 'Étudiant 3', email: 'etudiant3@example.com', department: 'Physique' }
  ];

  const showDetails = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <h1>Liste des Étudiants</h1>
      <ul className="list-group">
        {students.map(student => (
          <StudentItem key={student.id} student={student} onShowDetails={showDetails} />
        ))}
      </ul>

      {/* Afficher les détails de l'étudiant sélectionné */}
      {selectedStudent && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résumé de {selectedStudent.name}</h2>
          <p>Email : {selectedStudent.email}</p>
          <p>Département : {selectedStudent.department}</p>
        </div>
      )}
    </div>
  );
}

export default ListStudentsPage;
