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
import InternshipItem from './components/internships/InternshipItem';
import UpdateStageForm from './components/internships/UpdateStageForm';
import ViewInternshipPage from './components/internships/UpdateStageForm';



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
                        <Route path="/register" element={<RegisterPage />} /> 
                        <Route path="/students" element={<PrivateRoute element={<ListStudentsPage />} />} />
                        <Route path="/students/:id" element={<PrivateRoute element={<ViewStudentPage />} />} />
                        <Route path="/students/update/:id" element={<PrivateRoute element={<UpdateStudentForm />} />} />
                        <Route path="/add-student" element={<PrivateRoute element={<AddStudentForm />} />} />
                        <Route path="/stages" element={<PrivateRoute element={<ListInternshipPage />} />} />
                        <Route path="/stages/:id" element={<PrivateRoute element={<ViewInternshipPage />} />} />
                        <Route path="/stages/update/:id" element={<PrivateRoute element={<UpdateStageForm />} />} />
                        <Route path="/add-stage" element={<PrivateRoute element={<AddStageForm />} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
