import ProtectedRoute from "@/app/ProtectedRoute";
import TestProvider from "@/providers/TestProvider";
import { ReactNode } from "react";

export default function EditorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ProtectedRoute isAdmin>
      <TestProvider>{children}</TestProvider>;
    </ProtectedRoute>
  );
}
