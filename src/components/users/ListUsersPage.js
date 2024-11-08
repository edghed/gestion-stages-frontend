// ListUsersPage.js
import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import UserItem from './userItem'; // Assurez-vous du chemin
import { Link } from 'react-router-dom';

function ListUsersPage() {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setError("Impossible de charger les utilisateurs.");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <Link to="/add-user">
        <button className="btn btn-primary" style={{ marginBottom: '10px' }}>Ajouter utilisateur</button>
      </Link>
      {users.length > 0 ? (
        <ul className="list-group">
          {users.map(user => (
            <UserItem key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}

export default ListUsersPage;
