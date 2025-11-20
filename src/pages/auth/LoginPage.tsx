import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth/LoginPage.css';
import { getUserDatabaseId } from '../../services/userMappingService';  // ← ADD IMPORT


const LoginPage: React.FC = () => {
  const { login, isAuthenticated, roles, keycloakId } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // Auto-redirect based on user role after login
  // ============================================
  useEffect(() => {
  const redirectUser = async () => {
    if (isAuthenticated && keycloakId) {
      console.log('User authenticated with roles:', roles);
      
      // Redirect based on role
      if (roles.includes('ADMIN')) {
        navigate('/admin');
      } else if (roles.includes('LECTURER')) {
        // Get lecturer database ID
        const lecturerId = await getUserDatabaseId(keycloakId, 'LECTURER');
        if (lecturerId) {
          navigate(`/lecturer/${lecturerId}`);
        } else {
          console.error('Could not find lecturer ID');
          alert('Error: Could not load your profile');
        }
      } else if (roles.includes('STUDENT')) {
        // Get student database ID
        const studentId = await getUserDatabaseId(keycloakId, 'STUDENT');
        if (studentId) {
          navigate(`/student/${studentId}`);
        } else {
          console.error('Could not find student ID');
          alert('Error: Could not load your profile');
        }
      } else {
        navigate('/');
      }
    }
  };

  redirectUser();
}, [isAuthenticated, roles, keycloakId, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎓 University LMS</h1>
          <p>Learning Management System</p>
        </div>

        <div className="login-content">
          <p className="welcome-text">
            Welcome! Please login to continue.
          </p>
          
          <button 
            onClick={login}
            className="login-button"
          >
            🔐 Login with Keycloak
          </button>
        </div>

        <div className="login-footer">
          <p className="info-text">
            Use your university credentials to access the system
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;