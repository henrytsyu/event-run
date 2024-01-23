import "./globals.css";

export const metadata = {
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
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
