"use client";

import { fetchTests } from "@/app/api/utils";
import styles from "./tests.module.scss";

import {
  AddTestButton,
  SortDateButton,
} from "@/components/commons/Button/buttons";
import Search from "@/components/commons/Inputs/Search";
import Pagination from "@/components/commons/Pagination/Pagination";
import TestsList from "@/components/commons/Tests/TestsList";
import { TestBase } from "@/models/test/types";
import { useAuth } from "@/providers/AuthProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Tests() {
  const { user } = useAuth();
  const isAdmin = user?.userType === "admin";

  const [tests, setTests] = useState<TestBase[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sorting = (searchParams.get("sort_direction") as "asc") || "desc";

  const keyRef = useRef<null | string>(null);

  useEffect(() => {
    const key = `${currentPage.toString()}-${searchQuery}-${sorting}`;
    if (keyRef.current === key) return;
    keyRef.current = key;

    fetchTests(currentPage.toString(), searchQuery, sorting)
      .then((data) => {
        setTests(data.results);
        setTotalPages(data.pagination.total_pages);
      })
      .catch(() => setError("Network error"))
      .finally(() => setIsLoading(false));
  }, [currentPage, searchQuery, sorting]);

  return (
    <main className={styles.main}>
      <h1>Avalible Tests</h1>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <Search placeholder="Search..." />
          <SortDateButton />
        </div>

        {isAdmin && (
          <div className={styles.toolbarActions}>
            <AddTestButton />
          </div>
        )}
      </div>

      {error && <h2 className={styles.info}>{error}</h2>}

      {isLoading && <h2 className={styles.info}>Loading...</h2>}

      {!isLoading && tests && tests.length === 0 && (
        <h2 className={styles.info}>No tests found</h2>
      )}

      {tests && tests.length > 0 && (
        <>
          <TestsList tests={tests} />
          <Pagination totalPages={totalPages} />
        </>
      )}
    </main>
  );
}
