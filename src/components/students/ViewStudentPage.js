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
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!student) {
    return <p className="text-center text-muted">Aucun étudiant trouvé</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Détails de l'Étudiant</h2>
        </div>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center text-uppercase">
            {student.firstName} {student.lastName}
          </h3>
          <div className="mb-3">
            <h5>
              <i className="fas fa-envelope me-2 text-muted"></i>Email :
            </h5>
            <p className="ms-3">{student.email || <span className="text-muted">Aucun email renseigné</span>}</p>
          </div>
          <div className="mb-3">
            <h5>
              <i className="fas fa-building me-2 text-muted"></i>Département :
            </h5>
            <p className="ms-3">{student.department || <span className="text-muted">Aucun département renseigné</span>}</p>
          </div>
          <div className="mb-3">
            <h5>
              <i className="fas fa-align-left me-2 text-muted"></i>Description :
            </h5>
            <p className="ms-3">{student.description || <span className="text-muted">Aucune description disponible</span>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentPage;
