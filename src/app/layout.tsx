import Header from "@/components/commons/Header/Header";
import ModalProvider from "@/components/commons/Modal/ModalContext";
import AuthProvider from "@/providers/AuthProvider";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tester",
  description: "Create test - solve test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body>
        <ModalProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
