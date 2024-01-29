import { Card, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function AppBar() {
  return (
    <header className="p-4 pb-0">
      <Card className="p-4">
        <CardTitle className="flex justify-between">
          <Link href="/">Event Run</Link>
          <Link href="/settings">
            <Settings />
          </Link>
        </CardTitle>
      </Card>
    </header>
  );
}
