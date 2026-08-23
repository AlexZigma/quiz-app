import { InputHTMLAttributes } from "react";

import clsx from "clsx";
import styles from "./inputs.module.scss";

export default function Checkbox({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(styles.checkbox)} type="checkbox" {...rest} />;
}
