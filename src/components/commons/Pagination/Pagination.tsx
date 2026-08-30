import Button from "@/components/commons/Button/Button";
import ButtonLink from "@/components/commons/Button/ButtonLink";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./styles.module.scss";

interface PaginationArrowProps {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}

export function PaginationArrow({
  href,
  direction,
  isDisabled,
}: PaginationArrowProps) {
  const arrow = direction === "left" ? <FaAngleLeft /> : <FaAngleRight />;
  if (isDisabled) return <Button disabled>{arrow}</Button>;

  return <ButtonLink href={href}>{arrow}</ButtonLink>;
}

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePagination = (currentPage: number, total: number) => {
    if (total <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= total - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />

      {allPages?.map((page, index) => {
        return page === "..." ? (
          <Button key={`${page}-${index}`}>...</Button>
        ) : (
          <ButtonLink
            key={`${page}-${index}`}
            href={createPageURL(page)}
            className={clsx(currentPage === page && styles.active)}
          >
            {page}
          </ButtonLink>
        );
      })}

      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}
