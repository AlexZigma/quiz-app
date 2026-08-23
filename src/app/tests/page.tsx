"use client";

import Tests from "@/components/pages/Tests/Tests";
import ProtectedRoute from "../ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Tests />
    </ProtectedRoute>
  );
}
