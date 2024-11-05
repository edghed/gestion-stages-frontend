// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListStudentsPage from './components/students/ListStudentsPage';
import ViewStudentPage from './components/students/ViewStudentPage';
import ListInternshipPage from './components/internships/ListInternshipsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'; // Import du formulaire d'inscription
import { AuthProvider, useAuth } from './components/AuthContext';

function PrivateRoute({ element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <div className="container">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <div>
                                    <h1>Bienvenue dans l'application de gestion des stages</h1>
                                    <Link to="/login">
                                        <button>Se connecter</button>
                                    </Link>
                                    <Link to="/register" style={{ marginLeft: '10px' }}>
                                        <button>S'inscrire</button>
                                    </Link>
                                </div>
                            } 
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} /> {/* Route pour l'inscription */}
                        <Route path="/students" element={<PrivateRoute element={<ListStudentsPage />} />} />
                        <Route path="/students/:id" element={<PrivateRoute element={<ViewStudentPage />} />} />
                        <Route path="/stages" element={<PrivateRoute element={<ListInternshipPage />} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
