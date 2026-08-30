"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
  isAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  isAdmin = false,
}: ProtectedRouteProps) {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    if (!isLoading && isAdmin && user?.userType === "user")
      router.push("/tests");
  }, [isLoading, user, router, isAdmin]);

  if (isLoading) return null;
  if (!isLoading && !user) return null;
  if (!isLoading && isAdmin && user?.userType === "user") return null;
  return children;
}
