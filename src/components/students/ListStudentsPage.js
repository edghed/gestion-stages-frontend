import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentItem from './StudentItem';

function ListStudentsPage() {
  const [students, setStudents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  // Fonction pour récupérer les étudiants depuis le backend
  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(response => {
        setStudents(response.data);  
        setLoading(false);  
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des étudiants', error);
        setError("Erreur lors du chargement des étudiants");
        setLoading(false);
      });
  }, []);

  // Fonction pour supprimer un étudiant de la liste
  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id)); // Mettre à jour la liste après suppression
  };

  if (loading) {
    return <p>Chargement des étudiants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Liste des Étudiants</h1>
      <ul className="list-group">
        {students.map(student => (
          <StudentItem key={student.id} student={student} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ListStudentsPage;
