"use client";
import dynamic from "next/dynamic";
const Flashcard = dynamic(() => import("./Flashcard"), { ssr: false });
export default function Home() {
  return (
      <main className="page">
        <h1>Math Flashcards</h1>
        <Flashcard />
      </main>
  );
}
