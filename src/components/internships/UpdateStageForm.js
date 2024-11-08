import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';
import { useAuth } from '../AuthContext';

const StageSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Le titre est trop court!').max(50, 'Le titre est trop long!').required('Le titre est obligatoire'),
  description: Yup.string().min(10, 'La description est trop courte!').required('La description est obligatoire'),
  dateDebut: Yup.date().required('La date de début est obligatoire'),
  dateFin: Yup.date().required('La date de fin est obligatoire'),
});

function UpdateStageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { userRole } = useAuth();
  const [accessRestricted, setAccessRestricted] = useState(false); 

  useEffect(() => {
    if (userRole !== 'Role_Admin') {
      setAccessRestricted(true); 
      setLoading(false); 
      return;
    }

    const fetchStage = async () => {
      try {
        const response = await axiosInstance.get(`/stages/${id}`);
        setStage(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du stage', error);
        setError("Erreur lors du chargement du stage");
      } finally {
        setLoading(false);
      }
    };

    fetchStage();
  }, [id, axiosInstance, userRole]);

  if (accessRestricted) {
    return <div className="alert alert-danger">Accès restreint : vous n'avez pas la permission de modifier ce stage.</div>;
  }

  if (loading) return <p>Chargement des informations du stage...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Modifier le Stage</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {stage && (
        <Formik
          initialValues={{
            title: stage.title || '',
            description: stage.description || '',
            dateDebut: stage.dateDebut || '',
            dateFin: stage.dateFin || '',
          }}
          validationSchema={StageSchema}
          onSubmit={(values, { setSubmitting }) => {
            axiosInstance.put(`/stages/${id}`, values)
              .then(() => {
                setSuccessMessage("Stage mis à jour avec succès !");
                setSubmitting(false);
                navigate('/stages');
              })
              .catch(error => {
                console.error('Erreur lors de la mise à jour du stage', error);
                setError("Erreur lors de la mise à jour du stage");
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Titre :</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description :</label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="dateDebut" className="form-label">Date de début :</label>
                <Field
                  type="date"
                  name="dateDebut"
                  id="dateDebut"
                  className="form-control"
                />
                <ErrorMessage name="dateDebut" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="dateFin" className="form-label">Date de fin :</label>
                <Field
                  type="date"
                  name="dateFin"
                  id="dateFin"
                  className="form-control"
                />
                <ErrorMessage name="dateFin" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Mettre à jour
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default UpdateStageForm;
