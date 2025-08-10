"use client";

import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User, AuthState } from "@/types";

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
    client: null,
    token: null,
    loading: false,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        const userEmail = localStorage.getItem("userEmail");
        const token = localStorage.getItem("authToken");

        if (isAuthenticated && userEmail && token) {
          const user: User = {
            id: "1",
            email: userEmail,
            name: userEmail.split("@")[0],
          };

          setAuthState({
            isAuthenticated: true,
            user,
            client: null,
            token,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email && password) {
        const user: User = {
          id: "1",
          email,
          name: email.split("@")[0],
        };

        const token = "mock-jwt-token"; // Replace with actual JWT

        // Store auth data
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("authToken", token);

        setAuthState({
          isAuthenticated: true,
          user,
          client: null,
          token,
          loading: false,
          error: null,
        });

        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: "Login failed",
        loading: false,
      }));
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    // Clear stored auth data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");

    setAuthState({
      isAuthenticated: false,
      user: null,
      client: null,
      token: null,
      loading: false,
      error: null,
    });

    router.push("/login");
  };

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      isLoading,
    }),
    [authState, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
