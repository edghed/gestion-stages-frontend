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
  const { userRole } = useAuth(); 

 
  useEffect(() => {
    if (userRole === 'Role_Admin') {
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
      setLoading(false);
    }
  }, [id, axiosInstance, userRole]);

  if (loading) return <p>Chargement des informations de l'étudiant...</p>;

  
  if (userRole !== 'Role_Admin') {
    return <p>Accès restreint : seuls les administrateurs peuvent modifier les informations d'un étudiant.</p>;
  }

  if (error) return <p className="text-danger">{error}</p>;

  
  if (!student) return <p>Aucun étudiant trouvé avec cet ID.</p>;

  return (
    <div className="container mt-5">
      <h1>Modifier l'étudiant</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">Prénom :</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Nom :</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email :</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
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

export default UpdateStudentForm;
