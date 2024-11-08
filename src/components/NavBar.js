import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function NavBar() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Gestion Stages</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/stages" className="nav-link">Stages</Link>
                </li>
                
                {userRole === 'Role_Admin' && (
                  <>
                    <li className="nav-item">
                      <Link to="/add-stage" className="nav-link" title="Ajouter un stage">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/students" className="nav-link">Étudiants</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/add-student" className="nav-link" title="Ajouter un étudiant">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/users" className="nav-link">Utilisateurs</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/add-user" className="nav-link" title="Ajouter un utilisateur">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </li>
                  </>
                )}
                
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-light ms-2">Déconnexion</button>
                </li>
              </>
            )}
            
            {!isAuthenticated && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
