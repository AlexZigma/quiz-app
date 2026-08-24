import styles from "./text.module.scss";

interface ErrorTextProps {
  text?: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return text && <p className={styles.error}>{text}</p>;
}
