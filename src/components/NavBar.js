// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function NavBar() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ color: 'white', fontSize: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Gestion Stages</Link>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/stages" style={{ textDecoration: 'none', color: 'white' }}>Stages</Link>
              {userRole === 'Role_Admin' && (
                <Link to="/add-stage" style={{ textDecoration: 'none', color: 'white', marginLeft: '5px' }}>
                  Ajouter un stage
                </Link>
              )}
            </li>
            {userRole === 'Role_Admin' && (
              <>
                <li>
                  <Link to="/students" style={{ textDecoration: 'none', color: 'white' }}>Étudiants</Link>
                  <Link to="/add-student" style={{ textDecoration: 'none', color: 'white', marginLeft: '5px' }}>
                    Ajouter un étudiant
                  </Link>
                </li>
                <li>
                  <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}>Users</Link>
                  <Link to="/add-user" style={{ textDecoration: 'none', color: 'white', marginLeft: '5px' }}>
                    Ajouter un utilisateur
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={logout} style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>
                Déconnexion
              </button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Connexion</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
