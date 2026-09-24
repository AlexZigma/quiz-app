"use client";

import { fetchCurrentUser, loginRequest, logoutRequest } from "@/app/api/utils";
import { User } from "@/models/user/user";
import { ApiError } from "next/dist/server/api-utils";
import { usePathname } from "next/navigation";
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

const skipAuthPaths = ["/login/"];

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const isSkipAuthPath = useMemo(
    () => skipAuthPaths.includes(pathname),
    [pathname],
  );
  const [isLoading, setIsLoading] = useState(isSkipAuthPath);

  useEffect(() => {
    if (isSkipAuthPath) {
      return;
    }

    const getCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === 401) {
          setUser(null);
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, [isSkipAuthPath]);

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
