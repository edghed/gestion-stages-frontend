// src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Rôle par défaut pour tous les utilisateurs inscrits : "Role_Student"
    const defaultRole = 'Role_Student';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
                role: defaultRole // Définit le rôle à "Role_Student"
            });
            console.log(response.data); 
            navigate('/login'); // Redirection vers la page de connexion après l'inscription
        } catch (err) {
            console.error(err.response);
            setError("Échec de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default RegisterPage;
