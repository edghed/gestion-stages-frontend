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
          <Link to="/internships" style={{ textDecoration: 'none', color: 'white' }}>Stages</Link>
        </li>
        <li>
          <Link to="/enterprises" style={{ textDecoration: 'none', color: 'white' }}>Entreprises</Link>
        </li>
        <li>
          <Link to="/supervisors" style={{ textDecoration: 'none', color: 'white' }}>Tuteurs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
