"use client";

import ProtectedRoute from "@/app/ProtectedRoute";
import Tests from "@/components/pages/Tests";

export default function Home() {
  return (
    <ProtectedRoute>
      <Tests />
    </ProtectedRoute>
  );
}
