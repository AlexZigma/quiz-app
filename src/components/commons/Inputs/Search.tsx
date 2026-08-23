"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from "use-debounce";
import styles from "./inputs.module.scss";

interface SearchProps {
  placeholder: string;
}

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    const trimedQuery = query.trim();

    params.set("page", "1");
    if (trimedQuery) {
      params.set("search", trimedQuery);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <label className={clsx(styles.search, styles.card)}>
      <CiSearch className={styles.searchIcon} />
      <input
        type="search"
        id="search"
        placeholder={placeholder}
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />
    </label>
  );
}
