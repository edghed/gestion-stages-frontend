
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Nom d'utilisateur trop court!")
    .required("Nom d'utilisateur obligatoire"),
  password: Yup.string()
    .min(6, "Mot de passe trop court!")
    .required("Mot de passe obligatoire"),
  role: Yup.string().required("Rôle obligatoire"),
});

function AddUserForm() {
  const axiosInstance = useAxios();

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 className="text-center mb-4">Ajouter un utilisateur</h1>
        <Formik
          initialValues={{ username: '', password: '', role: 'ROLE_User' }}
          validationSchema={UserSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await axiosInstance.post('/users', values);
              alert("Utilisateur ajouté avec succès!");
              resetForm();
            } catch (error) {
              console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nom d'utilisateur :</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe :</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Rôle :</label>
                <Field as="select" name="role" className="form-select">
                  <option value="ROLE_User">Utilisateur</option>
                  <option value="ROLE_Admin">Administrateur</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Ajouter Utilisateur
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddUserForm;
