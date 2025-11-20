import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth/UnauthorizedPage.css';

const UnauthorizedPage: React.FC = () => {
  const { logout, roles } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Redirect based on their role
    if (roles.includes('ADMIN')) {
      navigate('/admin');
    } else if (roles.includes('LECTURER')) {
      navigate('/lecturer/dashboard');
    } else if (roles.includes('STUDENT')) {
      navigate('/student/dashboard');
    } else {
      logout();
    }
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="error-icon">⛔</div>
        <h1>Access Denied</h1>
        <p className="error-message">
          You don't have permission to access this page.
        </p>
        <p className="error-submessage">
          Your current roles: <strong>{roles.join(', ')}</strong>
        </p>
        
        <div className="action-buttons">
          <button onClick={handleGoBack} className="btn-primary">
            Go to My Dashboard
          </button>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;