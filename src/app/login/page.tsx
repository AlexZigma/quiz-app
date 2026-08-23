import AuthForm from "@/components/pages/AuthPage/AuthForm";
import styles from "./page.module.scss";

export default function AuthPage() {
  return (
    <main className={styles.main}>
      <AuthForm />
    </main>
  );
}
