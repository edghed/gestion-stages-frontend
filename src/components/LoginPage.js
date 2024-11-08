
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
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            const { token, role } = response.data;

            if (token && role) {
               
                login(token, role);

                if (role === 'Role_ADMIN') {
                    navigate('/admin-dashboard');
                } else if (role === 'Role_STUDENT') {
                    navigate('/student-dashboard');
                } else {
                    navigate('/access-denied');
                }
            } else {
                setError("Erreur : token ou rôle manquant dans la réponse.");
            }
        } catch (err) {
            console.error("Erreur de connexion", err.response);
            setError("Échec de la connexion. Vérifiez vos identifiants.");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Connexion</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
