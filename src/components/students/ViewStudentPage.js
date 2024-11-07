import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios'; 
function ViewStudentPage() {
  const { id } = useParams(); 
  const axiosInstance = useAxios(); 
  const [student, setStudent] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    axiosInstance.get(`/students/${id}`)
      .then(response => {
        setStudent(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails de l\'étudiant', error);
        setError("Erreur lors du chargement de l'étudiant");
        setLoading(false);
      });
  }, [id, axiosInstance]); 

  if (loading) {
    return <p>Chargement des détails de l'étudiant...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  if (!student) {
    return <p>Aucun étudiant trouvé</p>; 
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
