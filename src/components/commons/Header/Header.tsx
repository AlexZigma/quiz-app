"use client";

import Button from "@/components/commons/Button/Button";
import ButtonLink from "@/components/commons/Button/ButtonLink";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import styles from "./header.module.scss";

export default function Header() {
  const { user, logout } = useAuth();

  const renderUserInfo = user && <p>{`${user.username}: ${user.userType}`}</p>;

  const renderUserButton = user ? (
    <Button onClick={logout}>log out</Button>
  ) : (
    <ButtonLink href="/login">log in</ButtonLink>
  );

  return (
    <header className={styles.header}>
      <Link href="/tests" className="h2">
        TESTER
      </Link>
      <div className={styles.headerActions}>
        {renderUserInfo}
        {renderUserButton}
      </div>
    </header>
  );
}
