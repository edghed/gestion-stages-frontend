import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Nom d\'utilisateur trop court!')
    .required('Nom d\'utilisateur obligatoire'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court!')
    .required('Mot de passe obligatoire'),
  role: Yup.string()
    .required('Rôle obligatoire'),
});

function AddUserForm() {
  const axiosInstance = useAxios();

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
      <Formik
        initialValues={{ username: '', password: '', role: 'ROLE_User' }}
        validationSchema={UserSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axiosInstance.post('/users', values);
            alert('Utilisateur ajouté avec succès!');
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
            <div>
              <label>Nom d'utilisateur :</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Mot de passe :</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Rôle :</label>
              <Field as="select" name="role">
                <option value="ROLE_User">Utilisateur</option>
                <option value="ROLE_Admin">Administrateur</option>
              </Field>
              <ErrorMessage name="role" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>Ajouter Utilisateur</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddUserForm;
