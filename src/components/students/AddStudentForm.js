import React, { useState } from 'react';
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

function AddStudentForm() {
  const axiosInstance = useAxios(); 
  const [successMessage, setSuccessMessage] = useState(''); 

  return (
    <div>
      <h1>Ajouter un Étudiant</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={StudentSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axiosInstance.post('/students', values) 
            .then(response => {
              setSuccessMessage('Étudiant ajouté avec succès!');
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
                Ajouter Étudiant
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddStudentForm;
