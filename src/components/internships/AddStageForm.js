import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Schéma de validation avec Yup
const StageSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Le titre est trop court!')
    .max(50, 'Le titre est trop long!')
    .required('Le titre est obligatoire'),
  description: Yup.string()
    .min(10, 'La description est trop courte!')
    .required('La description est obligatoire'),
  location: Yup.string().required('Le lieu est obligatoire'),
});

function AddStageForm() {
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès après ajout

  return (
    <div>
      <h1>Ajouter un Stage</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Formik
        initialValues={{
          title: '',
          description: '',
          location: '',
        }}
        validationSchema={StageSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios.post('http://localhost:8080/stages', values)
            .then(response => {
              setSuccessMessage('Stage ajouté avec succès!');
              resetForm(); // Réinitialiser le formulaire après soumission
              setSubmitting(false);
            })
            .catch(error => {
              console.error('Erreur lors de l\'ajout du stage', error);
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
              <label>Lieu :</label>
              <Field type="text" name="location" />
              <ErrorMessage name="location" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Ajouter Stage
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddStageForm;
