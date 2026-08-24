import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonLinkProps {
  variant?: "primary" | "danger";
  className?: string;
  children: ReactNode;
  href: string;
  onClick?: () => void;
}

export default function ButtonLink({
  variant,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = clsx(
    styles.button,
    variant === "primary" && styles.buttonPrimary,
    variant === "danger" && styles.buttonDanger,
    className,
  );

  return (
    <Link {...rest} className={cls}>
      {children}
    </Link>
  );
}
