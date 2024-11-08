// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

    useEffect(() => {
        console.log('AuthProvider - isAuthenticated:', isAuthenticated);
        console.log('AuthProvider - authToken:', authToken);
        console.log('AuthProvider - userRole:', userRole);
        setIsAuthenticated(!!authToken);
    }, [authToken, userRole]);

    const login = (token, role) => {
        setAuthToken(token);
        setUserRole(role);
        setIsAuthenticated(true);

        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);

        console.log('Login - token:', token);
        console.log('Login - role:', role);
    };

    const logout = () => {
        setAuthToken(null);
        setUserRole(null);
        setIsAuthenticated(false);

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
