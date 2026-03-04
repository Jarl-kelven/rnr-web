"use client";

import { createContext, useState } from "react";
import { useGetProfile } from "@/hooks/auth-api";
import { useQueryClient } from "@tanstack/react-query"; // Import QueryClient

interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
  } | null
  token: string | null;
  loading: boolean;
  login: (userData: AuthContextType['user'], token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  );

  const queryClient = useQueryClient(); // Get client

  // Fetches profile only if token exists
  const { data: user, isLoading } = useGetProfile(Boolean(token));

  const login = (userData: AuthContextType['user'], token: string) => {
    setToken(token);
    localStorage.setItem("auth_token", token);

    // Immediately set the user data in the cache so the UI updates instantly
    if (userData) {
      queryClient.setQueryData(["me"], userData);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading: isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};




