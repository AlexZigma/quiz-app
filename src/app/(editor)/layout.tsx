import TestProvider from "@/providers/TestProvider";
import { ReactNode } from "react";

export default function EditorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <TestProvider>{children}</TestProvider>;
}
