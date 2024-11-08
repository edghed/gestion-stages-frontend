// UpdateStudentForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';
import { useAuth } from '../AuthContext';

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
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { userRole } = useAuth(); // Toujours appeler le hook ici

  // Utilisation inconditionnelle de useEffect
  useEffect(() => {
    if (userRole === 'ROLE_Admin') {
      axiosInstance.get(`/students/${id}`)
        .then(response => {
          setStudent(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'étudiant', error);
          setError("Erreur lors du chargement de l'étudiant");
          setLoading(false);
        });
    } else {
      setLoading(false); // Arrêter le chargement pour les utilisateurs non autorisés
    }
  }, [id, axiosInstance, userRole]);

  if (loading) return <p>Chargement des informations de l'étudiant...</p>;
  
  // Vérification des autorisations après le chargement
  if (userRole !== 'Role_Admin') {
    return <p>Accès restreint : seuls les administrateurs peuvent modifier les informations d'un étudiant.</p>;
  }

  if (error) return <p>{error}</p>;

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
            axiosInstance.put(`/students/${id}`, values)
              .then(() => {
                setSuccessMessage("Étudiant mis à jour avec succès !");
                setSubmitting(false);
                navigate('/students');
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
