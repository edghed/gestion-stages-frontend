import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px' }}>
      <div style={{ color: 'white', fontSize: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Gestion Stages
        </Link>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/students" style={{ textDecoration: 'none', color: 'white' }}>Étudiants</Link>
        </li>
        <li>
          <Link to="/add-student" style={{ textDecoration: 'none', color: 'white' }}>Ajouter un étudiant</Link> {/* Lien pour ajouter un étudiant */}
        </li>
        <li>
          <Link to="/stages" style={{ textDecoration: 'none', color: 'white' }}>Stages</Link>
        </li>
        <li>
          <Link to="/add-stage" style={{ textDecoration: 'none', color: 'white' }}>Ajouter un stage</Link> {/* Lien pour ajouter un stage */}
        </li>
        <li>
          <Link to="/supervisors" style={{ textDecoration: 'none', color: 'white' }}>Tuteurs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
