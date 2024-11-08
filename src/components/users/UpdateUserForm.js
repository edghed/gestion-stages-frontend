import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxios from '../useAxios';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Nom d\'utilisateur trop court!')
    .required('Nom d\'utilisateur obligatoire'),
  role: Yup.string()
    .required('Rôle obligatoire'),
});

function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };
    fetchUser();
  }, [id, axiosInstance]);

  return (
    <div>
      <h1>Modifier l'utilisateur</h1>
      {user && (
        <Formik
          initialValues={{
            username: user.username,
            password: '',
            role: user.role || 'Role_User'  
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const payload = {
                username: values.username,
                role: values.role,
                // Only include password if it has been set
                ...(values.password && { password: values.password })
              };

              await axiosInstance.put(`/users/${id}`, payload);
              alert('Utilisateur mis à jour avec succès!');
              navigate('/users');
            } catch (error) {
              console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label>Nom d'utilisateur :</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label>Mot de passe (laisser vide si inchangé) :</label>
                <Field type="password" name="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label>Rôle :</label>
                <Field as="select" name="role" className="form-select">
                  <option value="Role_User">Utilisateur</option>
                  <option value="Role_Admin">Administrateur</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Mettre à jour</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default UpdateUserForm;
