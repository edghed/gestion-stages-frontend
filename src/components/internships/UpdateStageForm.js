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
  const [accessRestricted, setAccessRestricted] = useState(false); // Nouvel état pour gérer l'accès

  useEffect(() => {
    if (userRole !== 'Role_Admin') {
      setAccessRestricted(true); // Restreindre l'accès si l'utilisateur n'est pas admin
      setLoading(false); // Arrêter le chargement
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
    return <p>Accès restreint : vous n'avez pas la permission de modifier ce stage.</p>;
  }

  if (loading) return <p>Chargement des informations du stage...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Modifier le Stage</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
              <div>
                <label>Titre :</label>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label>Description :</label>
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label>Date de début :</label>
                <Field type="date" name="dateDebut" />
                <ErrorMessage name="dateDebut" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label>Date de fin :</label>
                <Field type="date" name="dateFin" />
                <ErrorMessage name="dateFin" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
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
