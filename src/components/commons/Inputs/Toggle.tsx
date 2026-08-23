import { InputHTMLAttributes } from "react";

import styles from "./inputs.module.scss";

export default function Toggle({
  type,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={type === "radio" ? styles.radio : styles.checkbox}
      type={type}
      {...rest}
    />
  );
}
