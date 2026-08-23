"use client";

import { fetchCurrentUser, loginRequest, logoutRequest } from "@/app/api/utils";
import { User } from "@/models/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginRequest({ username, password });
      setUser(data);
    } catch {
      alert("network error");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutRequest();
      setUser(null);
    } catch {
      alert("network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext value={{ user: user, isLoading, login, logout }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("context error");

  return context;
};
