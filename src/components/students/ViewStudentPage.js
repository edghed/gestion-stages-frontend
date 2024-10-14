import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewStudentPage() {
  const { id } = useParams(); // Récupère l'ID de l'étudiant depuis l'URL
  const [student, setStudent] = useState(null); // State pour stocker les infos de l'étudiant
  const [loading, setLoading] = useState(true); // Gestion du chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Utiliser useEffect pour récupérer les données de l'étudiant quand le composant est monté
  useEffect(() => {
    axios.get(`http://localhost:8080/students/${id}`)
      .then(response => {
        setStudent(response.data); // Mettre à jour les données de l'étudiant
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'étudiant', error);
        setError("Erreur lors du chargement de l'étudiant");
        setLoading(false);
      });
  }, [id]); // Exécuter cet effet à chaque fois que l'ID change

  if (loading) {
    return <p>Chargement des détails de l'étudiant...</p>; // Affichage pendant le chargement
  }

  if (error) {
    return <p>{error}</p>; // Affichage en cas d'erreur
  }

  if (!student) {
    return <p>Aucun étudiant trouvé</p>; // Si aucune donnée n'est retournée
  }

  return (
    <div>
      <h1>Détails de {student.firstName} {student.lastName}</h1>
      <p>Email : {student.email || 'Aucun email renseigné'}</p>
      <p>Département : {student.department || 'Aucun département renseigné'}</p>
      <p>Description : {student.description || 'Aucune description disponible'}</p>
    </div>
  );
}

export default ViewStudentPage;
