// src/components/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {}, {
                auth: { username, password },
            });

            const { token, role } = response.data; // Assume the backend returns token and role
            login(token, role);

            // Redirect based on role
            if (role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (role === 'USER') {
                navigate('/user-dashboard');
            } else {
                navigate('/access-denied');
            }
        } catch (err) {
            setError("Échec de la connexion. Vérifiez vos identifiants.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;
