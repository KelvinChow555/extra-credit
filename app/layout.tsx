import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
  title: "Flashcards",
  description: "Anser the question and pratice your math.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  );
}
