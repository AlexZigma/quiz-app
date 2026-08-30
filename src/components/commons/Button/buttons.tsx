"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import ButtonLink from "./ButtonLink";

export function SortDateButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAsc = searchParams.get("sort_direction")?.toString() === "asc";
  const params = new URLSearchParams(searchParams);

  params.set("page", "1");
  if (isAsc) {
    params.delete("sort_direction");
  } else {
    params.set("sort_direction", "asc");
  }
  const pageUrl = `${pathname}?${params.toString()}`;

  return (
    <ButtonLink href={pageUrl}>
      {isAsc ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
      Date
    </ButtonLink>
  );
}

export function AddTestButton() {
  return (
    <ButtonLink variant="primary" href="/tests/create">
      <MdAdd />
      add test
    </ButtonLink>
  );
}
