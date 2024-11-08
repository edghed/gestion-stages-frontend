// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListStudentsPage from './components/students/ListStudentsPage';
import ViewStudentPage from './components/students/ViewStudentPage';
import UpdateStudentForm from './components/students/UpdateStudentForm';
import AddStudentForm from './components/students/AddStudentForm';
import ListInternshipPage from './components/internships/ListInternshipsPage';
import AddStageForm from './components/internships/AddStageForm';
import UpdateStageForm from './components/internships/UpdateStageForm';
import ViewInternshipPage from './components/internships/ViewInternshipPage';

import ListUsersPage from './components/users/ListUsersPage'; // Nouvelle importation
import AddUserForm from './components/users/AddUserForm'; // Nouvelle importation
import UpdateUserForm from './components/users/UpdateUserForm'; // Nouvelle importation

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
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
                        {/* Page d'accueil */}
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
                        {/* Authentification */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} /> 

                        {/* Gestion des étudiants */}
                        <Route path="/students" element={<PrivateRoute element={<ListStudentsPage />} />} />
                        <Route path="/students/:id" element={<PrivateRoute element={<ViewStudentPage />} />} />
                        <Route path="/students/update/:id" element={<PrivateRoute element={<UpdateStudentForm />} />} />
                        <Route path="/add-student" element={<PrivateRoute element={<AddStudentForm />} />} />

                        {/* Gestion des stages */}
                        <Route path="/stages" element={<PrivateRoute element={<ListInternshipPage />} />} />
                        <Route path="/stages/:id" element={<PrivateRoute element={<ViewInternshipPage />} />} />
                        <Route path="/stages/update/:id" element={<PrivateRoute element={<UpdateStageForm />} />} />
                        <Route path="/add-stage" element={<PrivateRoute element={<AddStageForm />} />} />

                        {/* Gestion des utilisateurs (pour l'admin) */}
                        <Route path="/users" element={<PrivateRoute element={<ListUsersPage />} />} />
                        <Route path="/add-user" element={<PrivateRoute element={<AddUserForm />} />} />
                        <Route path="/users/update/:id" element={<PrivateRoute element={<UpdateUserForm />} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
