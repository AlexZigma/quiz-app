"use client";

import { fetchTestById } from "@/app/api/utils";
import TestForm from "@/components/commons/Tests/TestForm";
import { useRequest } from "@/lib/hooks";
import { Test } from "@/models/test/types";
import { useTest } from "@/providers/TestProvider";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect } from "react";

export default function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { loadTest } = useTest();

  const { data: test, isLoading } = useRequest<Test>(
    useCallback(() => fetchTestById(id), [id]),
  );

  useEffect(() => {
    if (!test) return;
    loadTest(test);
  }, [test, loadTest]);

  if (isLoading) return;

  if (!test) notFound();

  return (
    <main>
      <h1>Edit Test</h1>
      <TestForm mode="edit" />
    </main>
  );
}
