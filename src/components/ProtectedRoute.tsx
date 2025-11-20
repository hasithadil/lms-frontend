import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ============================================
// Protected Route Props
// ============================================
interface ProtectedRouteProps {
  children: React.ReactNode;           // The component to render
  allowedRoles?: string[];             // Roles allowed to access (optional)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, roles, loading } = useAuth();

  // ============================================
  // STEP 1: Show loading while checking auth
  // ============================================
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '20px'
      }}>
        <div>
          <p>🔄 Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 2: Redirect to login if not authenticated
  // ============================================
  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // ============================================
  // STEP 3: Check if user has required role
  // ============================================
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some(role => roles.includes(role));
    
    if (!hasRole) {
      console.log('❌ User does not have required role:', allowedRoles);
      console.log('User roles:', roles);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ============================================
  // STEP 4: All checks passed - render component
  // ============================================
  console.log('✅ Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;

// What this does:

// Protects routes from unauthorized access
// Checks if user is logged in
// Checks if user has required role
// Shows loading while checking
// Redirects appropriately