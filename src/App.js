import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListStudentsPage from './components/students/ListStudentsPage';
import ViewStudentPage from './components/students/ViewStudentPage';
import ListInternshipsPage from './components/internships/ListInternshipsPage';
import ViewInternshipPage from './components/internships/ViewInternshipPage';
import ListEnterprisesPage from './components/enterprises/ListEnterprisesPage';
import ViewEnterprisePage from './components/enterprises/ViewEnterprisePage';
import ListSupervisorsPage from './components/supervisors/ListSupervisorsPage';
import ViewSupervisorPage from './components/supervisors/ViewSupervisorPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          {/* Routes pour les étudiants */}
          <Route path="/students" element={<ListStudentsPage />} />
          <Route path="/students/:id" element={<ViewStudentPage />} />

          {/* Routes pour les stages */}
          <Route path="/internships" element={<ListInternshipsPage />} />
          <Route path="/internships/:id" element={<ViewInternshipPage />} />

          {/* Routes pour les entreprises */}
          <Route path="/enterprises" element={<ListEnterprisesPage />} />
          <Route path="/enterprises/:id" element={<ViewEnterprisePage />} />

          {/* Routes pour les tuteurs */}
          <Route path="/supervisors" element={<ListSupervisorsPage />} />
          <Route path="/supervisors/:id" element={<ViewSupervisorPage />} />

          {/* Route par défaut */}
          <Route path="/" element={<h1>Bienvenue dans l'application de gestion des stages</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
