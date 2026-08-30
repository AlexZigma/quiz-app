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
import { useEffect, useState } from "react";

export default function Tests() {
  const { user } = useAuth();
  const isAdmin = user?.userType === "admin";

  const [tests, setTests] = useState<TestBase[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sorting = (searchParams.get("sort_direction") as "asc") || "desc";

  useEffect(() => {
    fetchTests(currentPage.toString(), searchQuery, sorting)
      .then((data) => {
        setTests(data.results);
        setTotalPages(data.pagination.total_pages);
      })
      .catch(() => setError("Network error"));
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

      {error && error}

      {tests && <TestsList tests={tests} />}

      {tests && <Pagination totalPages={totalPages} />}
    </main>
  );
}
