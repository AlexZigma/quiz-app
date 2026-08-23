import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./card.module.scss";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  const cls = clsx(styles.card, className);
  return <div className={cls}>{children}</div>;
}
