"use client";

import { fetchTestById } from "@/app/api/utils";
import ProtectedRoute from "@/app/ProtectedRoute";
import Quiz from "@/components/pages/Quiz";
import { Test } from "@/models/test/types";
import { notFound } from "next/navigation";
import { use, useLayoutEffect as useEffect, useRef, useState } from "react";

export default function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [test, setTest] = useState<Test>();
  const [isLoading, setIsLoading] = useState(true);

  const keyRef = useRef<null | string>(null);

  useEffect(() => {
    const key = id;
    if (keyRef.current === key) return;
    keyRef.current = key;

    fetchTestById(id)
      .then((data) => setTest(data))
      .catch()
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return;

  if (!test) notFound();

  return (
    <ProtectedRoute>
      <Quiz test={test} />;
    </ProtectedRoute>
  );
}
