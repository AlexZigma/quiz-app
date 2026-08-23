import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import styles from "./inputs.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function TextInput({ className, ...rest }: TextInputProps) {
  return (
    <input
      className={clsx(styles.input, styles.card, className)}
      {...rest}
    />
  );
}
