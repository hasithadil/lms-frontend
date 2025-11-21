import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import keycloak from '../keycloak';
import { getUserDatabaseId } from '../services/userMappingService';

interface AuthContextType {
  isAuthenticated: boolean;
  roles: string[];
  username: string | null;
  email: string | null;
  keycloakId: string | null;
  databaseId: number | null;          
  login: () => void;
  logout: () => void;
  token: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [keycloakId, setKeycloakId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [databaseId, setDatabaseId] = useState<number | null>(null);  // ← NEW

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await keycloak.init({ 
          onLoad: 'check-sso',
          checkLoginIframe: false 
        });
        
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const realmRoles = keycloak.realmAccess?.roles || [];
          const userKeycloakId = keycloak.subject || null;
          
          setRoles(realmRoles);
          setUsername(keycloak.tokenParsed?.preferred_username || null);
          setEmail(keycloak.tokenParsed?.email || null);
          setKeycloakId(userKeycloakId);
          setToken(keycloak.token || null);
          
          // ============================================
          // NEW: Get database ID based on role
          // ============================================
          if (userKeycloakId) {
            let dbId: number | null = null;
            
            if (realmRoles.includes('STUDENT')) {
              dbId = await getUserDatabaseId(userKeycloakId, 'STUDENT');
            } else if (realmRoles.includes('LECTURER')) {
              dbId = await getUserDatabaseId(userKeycloakId, 'LECTURER');
            }
            
            setDatabaseId(dbId);
            console.log('✅ Database ID loaded:', dbId);
          }
          
          console.log('✅ User authenticated:', {
            username: keycloak.tokenParsed?.preferred_username,
            roles: realmRoles,
            email: keycloak.tokenParsed?.email,
            databaseId: databaseId
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('❌ Keycloak initialization failed', error);
        setLoading(false);
      }
    };

    initAuth();

    // Refresh token every minute
    const refreshInterval = setInterval(() => {
      keycloak.updateToken(300)
        .then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.token || null);
            console.log('🔄 Token refreshed');
          }
        })
        .catch(() => {
          console.error('❌ Token refresh failed');
        });
    }, 60000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      roles,
      username,
      email,
      keycloakId,
      databaseId,        
      login,
      logout,
      token,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};