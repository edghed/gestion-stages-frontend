    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function UserItem({ user, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.username} ?`)) {
        onDelete(user.id);
        }
    };

    return (
        <li className="list-group-item">
        <h3>{user.username}</h3>
        <button onClick={() => navigate(`/users/update/${user.id}`)} className="btn btn-warning">
            Modifier
        </button>
        <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
        </li>
    );
    }

    export default UserItem;
