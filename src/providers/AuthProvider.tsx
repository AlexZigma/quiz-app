"use client";

import { fetchCurrentUser, loginRequest, logoutRequest } from "@/app/api/utils";
import { User } from "@/models/user/user";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginRequest({ username, password });
      setUser(data);
    } finally {
      setIsLoading(false);
    }
    return;
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutRequest();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
    return;
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("context error");

  return context;
};
