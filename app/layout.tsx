import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import london from "@/images/london.jpg";

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
      <body className="relative">
        <Image
          alt="London"
          src={london}
          placeholder="blur"
          quality={100}
          fill
          className="w-screen absolute -z-10"
        />
        <div className="flex flex-col h-screen overflow-auto">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
