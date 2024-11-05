// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [userRole, setUserRole] = useState(null); 

    const login = (token, role) => {
        setIsAuthenticated(true);
        setAuthToken(token);
        setUserRole(role); 
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
