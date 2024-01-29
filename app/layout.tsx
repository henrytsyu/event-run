import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppBar from "./appBar";

export const metadata: Metadata = {
  title: "Event Run",
  description: "Automatic score tallying system for checkpoint-based events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <AppBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
