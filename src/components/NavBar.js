import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: 'white', fontSize: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Gestion Stages
        </Link>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          {/* Lien vers la page des étudiants */}
          <Link to="/students" style={{ textDecoration: 'none', color: 'white' }}>Étudiants</Link>
          {/* Bouton pour ajouter un étudiant */}
          <Link to="/add-student" style={{ marginLeft: '10px' }}>
            <button style={{ backgroundColor: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '5px', padding: '5px 10px' }}>
              + Ajouter Étudiant
            </button>
          </Link>
        </li>
        <li>
          <Link to="/enterprises" style={{ textDecoration: 'none', color: 'white' }}>Entreprises</Link>
        </li>
        <li>
          <Link to="/stages" style={{ textDecoration: 'none', color: 'white' }}>Stages</Link>
        </li>
        <li>
          <Link to="/supervisors" style={{ textDecoration: 'none', color: 'white' }}>Tuteurs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
