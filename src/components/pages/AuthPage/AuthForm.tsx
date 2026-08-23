"use client";

import Button from "@/components/commons/Button/Button";
import Input from "@/components/commons/Inputs/TextInput";
import { SignInSchema } from "@/lib/zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useState } from "react";
import z from "zod";
import styles from "./auth.module.scss";

type ErrorType = { username?: string[]; password?: string[]; message?: string };

export default function AuthForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<ErrorType | null>(null);
  const { login, isLoading } = useAuth();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setFormError(null);

    const parsed = SignInSchema.safeParse({ username, password });

    if (!parsed.success) {
      setFormError(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    try {
      await login(parsed.data.username, parsed.data.password);
      router.push("/tests");
    } catch {
      setFormError({ message: "Wrong login or password" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className="h1">LOGIN</p>

      <label className={styles.field}>
        Username
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {formError?.username && (
          <p className="error">{formError.username[0]}</p>
        )}
      </label>

      <label className={styles.field}>
        Password
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {formError?.password && (
          <p className="error">{formError.password[0]}</p>
        )}
      </label>

      <Button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Loading..." : "Log in"}
      </Button>
      {formError?.message && <p className="error">{formError.message}</p>}
    </form>
  );
}
