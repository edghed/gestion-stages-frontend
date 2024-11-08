
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

import ListUsersPage from './components/users/ListUsersPage';
import AddUserForm from './components/users/AddUserForm';
import UpdateUserForm from './components/users/UpdateUserForm';

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
                <div className="container d-flex align-items-center justify-content-center min-vh-100">
                    <Routes>
                        {}
                        <Route 
                            path="/" 
                            element={
                                <div className="card text-center p-5 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                                    <h1 className="card-title mb-4">Bienvenue dans l'application de gestion des stages</h1>
                                    <div className="mb-4">
                                        <p className="card-text">Connectez-vous ou inscrivez-vous pour accéder aux fonctionnalités.</p>
                                    </div>
                                    <div>
                                        <Link to="/login">
                                            <button className="btn btn-primary mx-2">Se connecter</button>
                                        </Link>
                                        <Link to="/register">
                                            <button className="btn btn-secondary mx-2">S'inscrire</button>
                                        </Link>
                                    </div>
                                </div>
                            } 
                        />
                        {}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} /> 

                        {}
                        <Route path="/students" element={<PrivateRoute element={<ListStudentsPage />} />} />
                        <Route path="/students/:id" element={<PrivateRoute element={<ViewStudentPage />} />} />
                        <Route path="/students/update/:id" element={<PrivateRoute element={<UpdateStudentForm />} />} />
                        <Route path="/add-student" element={<PrivateRoute element={<AddStudentForm />} />} />

                        {}
                        <Route path="/stages" element={<PrivateRoute element={<ListInternshipPage />} />} />
                        <Route path="/stages/:id" element={<PrivateRoute element={<ViewInternshipPage />} />} />
                        <Route path="/update-stage/:id" element={<PrivateRoute element={<UpdateStageForm />} />} />
                        <Route path="/add-stage" element={<PrivateRoute element={<AddStageForm />} />} />

                        {}
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
