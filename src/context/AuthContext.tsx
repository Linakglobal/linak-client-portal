"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userEmail = localStorage.getItem('userEmail');
        const token = localStorage.getItem('authToken');

        if (isAuthenticated === 'true' && userEmail) {
          // Create user object from stored data
          const user: User = {
            id: '1',
            email: userEmail,
            name: userEmail.split('@')[0],
            role: 'user',
            accountType: 'premium',
            createdAt: new Date(),
          };

          setAuthState({
            isAuthenticated: true,
            user,
            token,
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email && password) {
        const user: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user',
          accountType: 'premium',
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        const token = 'mock-jwt-token'; // Replace with actual JWT

        // Store auth data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('authToken', token);

        setAuthState({
          isAuthenticated: true,
          user,
          token,
        });

        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');

    // Reset state
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    // Redirect to home
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
