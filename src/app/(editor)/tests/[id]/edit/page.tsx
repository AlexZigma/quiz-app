"use client";

import { fetchTestById } from "@/app/api/utils";
import TestForm from "@/components/commons/Tests/TestForm";
import { useTest } from "@/providers/TestProvider";
import { notFound } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

export default function TestEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { loadTest } = useTest();
  const [isLoading, setIsLoaging] = useState(true);
  const [error, setError] = useState("");

  const keyRef = useRef<null | string>(null);

  useEffect(() => {
    const key = id;
    if (keyRef.current === key) return;
    keyRef.current = key;

    fetchTestById(id)
      .then((test) => loadTest(test))
      .catch(() => setError("network error"))
      .finally(() => setIsLoaging(false));
  }, [id, loadTest]);

  if (isLoading) return;

  if (error) notFound();

  return (
    <main>
      <h1>Edit Test</h1>
      <TestForm mode="edit" />
    </main>
  );
}
