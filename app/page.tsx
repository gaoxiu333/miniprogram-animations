"use client";
import { Link } from "@nextui-org/react";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center gap-4">
      <Header />
    </div>
  );
}
