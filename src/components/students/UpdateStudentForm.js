import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios'; 


const StudentSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Le prénom est trop court!')
    .max(50, 'Le prénom est trop long!')
    .required('Le prénom est obligatoire'),
  lastName: Yup.string()
    .min(2, 'Le nom de famille est trop court!')
    .max(50, 'Le nom de famille est trop long!')
    .required('Le nom de famille est obligatoire'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email est obligatoire'),
});

function UpdateStudentForm() {
  const { id } = useParams(); // Récupérer l'ID de l'étudiant à modifier depuis l'URL
  const navigate = useNavigate(); // Utilisé pour rediriger après la mise à jour
  const axiosInstance = useAxios(); // Utiliser l'instance Axios configurée avec le token
  const [student, setStudent] = useState(null); // Stocker les données de l'étudiant
  const [loading, setLoading] = useState(true); // Gestion du chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès après la mise à jour

  // Récupérer les informations de l'étudiant à modifier
  useEffect(() => {
    axiosInstance.get(`/students/${id}`)
      .then(response => {
        setStudent(response.data); // Stocker les données de l'étudiant
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'étudiant', error);
        setError("Erreur lors du chargement de l'étudiant");
        setLoading(false);
      });
  }, [id, axiosInstance]);

  if (loading) {
    return <p>Chargement des informations de l'étudiant...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Modifier l'étudiant</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {student && (
        <Formik
          initialValues={{
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            email: student.email || '',
          }}
          validationSchema={StudentSchema}
          onSubmit={(values, { setSubmitting }) => {
            axiosInstance.put(`/students/${id}`, values) // Utilisation de axiosInstance pour l'appel PUT
              .then(response => {
                setSuccessMessage("Étudiant mis à jour avec succès !");
                setSubmitting(false);
                // Rediriger après un petit délai (si nécessaire)
                setTimeout(() => navigate('/students'), 2000);
              })
              .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'étudiant', error);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>Prénom :</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label>Nom :</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
              </div>
              <div>
                <label>Email :</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
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

export default UpdateStudentForm;
