import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';
import { useAuth } from '../AuthContext';

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
  const axiosInstance = useAxios();
  const [successMessage, setSuccessMessage] = useState('');
  const { userRole } = useAuth(); 

  if (userRole !== 'Role_Admin') return null; 

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Ajouter un Stage</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <Formik
        initialValues={{ title: '', description: '', location: '' }}
        validationSchema={StageSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axiosInstance.post('/stages', values)
            .then(response => {
              setSuccessMessage('Stage ajouté avec succès!');
              resetForm();
              setSubmitting(false);
            })
            .catch(error => {
              console.error("Erreur lors de l'ajout du stage :", error);
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
                id="title" 
                name="title" 
                className="form-control" 
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description :</label>
              <Field 
                type="text" 
                id="description" 
                name="description" 
                className="form-control" 
              />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">Lieu :</label>
              <Field 
                type="text" 
                id="location" 
                name="location" 
                className="form-control" 
              />
              <ErrorMessage name="location" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
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
