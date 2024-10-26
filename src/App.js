import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListStudentsPage from './components/students/ListStudentsPage';
import ViewStudentPage from './components/students/ViewStudentPage';
import ListSupervisorsPage from './components/supervisors/ListSupervisorsPage';
import ViewSupervisorPage from './components/supervisors/ViewSupervisorPage';
import AddStudentPage from './components/students/AddStudentPage';
import UpdateStudentForm from './components/students/UpdateStudentForm';
import UpdateStageForm from './components/internships/UpdateStageForm';
import AddStageForm from './components/internships/AddStageForm';
import ViewInternshipPage from './components/internships/ViewInternshipPage';
import ListInternshipPage from './components/internships/ListInternshipsPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          {/* Routes pour les étudiants */}
          <Route path="/students" element={<ListStudentsPage />} />
          <Route path="/students/:id" element={<ViewStudentPage />} />
          <Route path="/students/update/:id" element={<UpdateStudentForm />} />
          <Route path="/add-student" element={<AddStudentPage />} />


          {/* Routes pour les stages */}
          <Route path="/stages" element={<ListInternshipPage />} />
          <Route path="/stages/:id" element={<ViewInternshipPage />} />
          <Route path="/add-stage" element={<AddStageForm />} />
          <Route path="/update-stage/:id" element={<UpdateStageForm />} />
          <Route path="/" element={<h1>Bienvenue dans l'application de gestion des stages</h1>} />

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
