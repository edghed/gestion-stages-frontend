import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios';
import { Spinner } from 'react-bootstrap';

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

  if (error) return <p className="text-danger">{error}</p>;
  if (!internship) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white">
          <h2>Détails du Stage</h2>
        </div>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center text-uppercase">{internship.title}</h3>
          <div className="mb-3">
            <h5>
              <i className="fas fa-building me-2 text-muted"></i>Entreprise :
            </h5>
            <p className="ms-3">{internship.company}</p>
          </div>
          <div className="mb-3">
            <h5>
              <i className="fas fa-map-marker-alt me-2 text-muted"></i>Lieu :
            </h5>
            <p className="ms-3">{internship.location}</p>
          </div>
          <div className="mb-3">
            <h5>
              <i className="fas fa-align-left me-2 text-muted"></i>Description :
            </h5>
            <p className="ms-3">{internship.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInternshipPage;
