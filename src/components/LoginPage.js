import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { authToken, login } = useAuth(); 
    const navigate = useNavigate();

    
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
    });

 
    axiosInstance.interceptors.request.use(
        (config) => {
            if (authToken) {
                config.headers['Authorization'] = `Bearer ${authToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            const response = await axiosInstance.post('/api/auth/login', {
                email: username,
                password: password
            });

            
            const { token, role } = response.data;

            
            login(token, role);

           
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

         
            if (role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (role === 'USER') {
                navigate('/user-dashboard');
            } else {
                navigate('/access-denied');
            }
        } catch (err) {
            console.error("Erreur de connexion", err.response); 
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
