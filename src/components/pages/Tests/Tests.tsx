"use client";

import { fetchTests } from "@/app/api/utils";
import styles from "./tests.module.scss";

import ButtonLink from "@/components/commons/Button/ButtonLink";
import { SortDateButton } from "@/components/commons/Button/buttons";
import Search from "@/components/commons/Inputs/Search";
import Pagination from "@/components/commons/Pagination/Pagination";
import TestsList from "@/components/commons/Tests/TestsList";
import { TestBase } from "@/models/test/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

export default function Tests() {
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

        <div className={styles.toolbarActions}>
          <ButtonLink variant="primary" href="/tests/create">
            <MdAdd />
            add test
          </ButtonLink>
        </div>
      </div>

      {error && error}

      {tests && <TestsList tests={tests} />}

      {tests && <Pagination totalPages={totalPages} />}
    </main>
  );
}
