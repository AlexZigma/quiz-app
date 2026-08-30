"use client";

import Button from "@/components/commons/Button/Button";
import Card from "@/components/commons/Card";
import Input from "@/components/commons/Inputs/TextInput";
import ErrorText from "@/components/commons/Text/Error";
import { SignInSchema } from "@/lib/zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useState } from "react";
import z from "zod";
import styles from "./auth.module.scss";

type ErrorType = { username?: string[]; password?: string[]; message?: string };

export default function AuthForm() {
  const router = useRouter();

  const [formError, setFormError] = useState<ErrorType | null>(null);
  const { login, isLoading } = useAuth();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const parsed = SignInSchema.safeParse(data);

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
    <form onSubmit={handleSubmit}>
      <Card className={styles.form}>
        <p className="h1">LOGIN</p>

        <label className={styles.field}>
          Username
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="username"
          />
          <ErrorText text={formError?.username?.[0]} />
        </label>

        <label className={styles.field}>
          Password
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="******"
          />
          <ErrorText text={formError?.password?.[0]} />
        </label>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log in"}
        </Button>
        <ErrorText text={formError?.message} />
      </Card>
    </form>
  );
}
