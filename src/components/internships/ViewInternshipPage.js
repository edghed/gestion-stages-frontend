// ViewInternshipPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios';

function ViewInternshipPage() {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [internship, setInternship] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await axiosInstance.get(`/stages/${id}`);
        setInternship(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du stage :", error);
        setError("Impossible de charger les détails du stage.");
      }
    };
    fetchInternship();
  }, [id, axiosInstance]);

  if (error) return <p>{error}</p>;
  if (!internship) return <p>Chargement des détails du stage...</p>;

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
