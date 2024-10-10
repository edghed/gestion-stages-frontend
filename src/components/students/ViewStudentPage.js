import React from 'react';
import { useParams } from 'react-router-dom';

function ViewStudentPage() {
  const { id } = useParams();
  const student = {
    id: id,
    name: 'Étudiant ' + id,
    email: 'etudiant' + id + '@example.com',
    department: 'Informatique',
    description: 'Description détaillée de l’étudiant ' + id,
  };

  return (
    <div>
      <h1>Détails de {student.name}</h1>
      <p>Email : {student.email}</p>
      <p>Département : {student.department}</p>
      <p>Description : {student.description}</p>
    </div>
  );
}

export default ViewStudentPage;
