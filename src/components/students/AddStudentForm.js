
import React, { useState } from 'react';
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

function AddStudentForm() {
  const axiosInstance = useAxios();
  const [successMessage, setSuccessMessage] = useState('');
  const { userRole } = useAuth();


  if (userRole !== 'Role_Admin') {
    return <p className="alert alert-danger">Accès restreint : seuls les administrateurs peuvent ajouter un étudiant.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 className="text-center mb-4">Ajouter un Étudiant</h1>
        {successMessage && <p className="alert alert-success">{successMessage}</p>}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={StudentSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            axiosInstance.post('/students', values)
              .then(() => {
                setSuccessMessage("Étudiant ajouté avec succès!");
                resetForm();
                setSubmitting(false);
              })
              .catch(error => {
                console.error("Erreur lors de l'ajout de l'étudiant :", error);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">Prénom :</label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Nom :</label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email :</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Ajouter Étudiant
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddStudentForm;
