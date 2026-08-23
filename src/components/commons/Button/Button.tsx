import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
}

export default function Button({
  variant,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = clsx(
    styles.button,
    variant === "primary" && styles.buttonPrimary,
    variant === "danger" && styles.buttonDanger,
    className,
  );

  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
