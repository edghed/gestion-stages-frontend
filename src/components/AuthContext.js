
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null); 
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null); 

    useEffect(() => {
        if (authToken) {
            setIsAuthenticated(true);
        }
    }, [authToken]);

    const login = (token, role) => {
        setIsAuthenticated(true);
        setAuthToken(token);
        setUserRole(role);

        // Enregistre le token et le rôle dans localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUserRole(null);

        // Supprime le token et le rôle de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
