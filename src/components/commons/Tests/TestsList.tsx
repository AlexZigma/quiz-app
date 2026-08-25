"use client";

import TestCard from "./TestCard";

import styles from "./tests.module.scss";

interface TestsListProps {
  tests: { id: number; title: string }[];
}

export default function TestsList({ tests }: TestsListProps) {
  return (
    <div className={styles.grid}>
      {tests.map((test) => (
        <TestCard key={test.id} id={test.id.toString()} title={test.title} />
      ))}
    </div>
  );
}
