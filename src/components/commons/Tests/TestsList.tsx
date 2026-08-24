"use client";

import TestCard from "./TestCard";

import styles from "./tests.module.scss";

interface TestsListProps {
  tests: { id: number; title: string }[];
}

export default function TestsList({ tests }: TestsListProps) {
  // const [tests, setTests] = useState<TestBase[]>();
  // const [isLoading, setIsLoading] = useState(true);

  // const searchParams = useSearchParams();
  // const searchQuery = searchParams.get("search") || "";
  // const currentPage = Number(searchParams.get("page")) || 1;
  // const sorting = (searchParams.get("sort_direction") as "asc") || "desc";

  // useEffect(() => {
  //   fetchTests(currentPage.toString(), searchQuery, sorting)
  //     .then((data) => setTests(data))
  //     .catch((error) => alert(error))
  //     .finally(() => setIsLoading(false));
  // }, [currentPage, searchQuery, sorting]);

  // if (isLoading) return "Loading...";
  // if (!tests) return null;

  return (
    <div className={styles.grid}>
      {tests.map((test) => (
        <TestCard key={test.id} id={test.id.toString()} title={test.title} />
      ))}
    </div>
  );
}
