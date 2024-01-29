import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="flex justify-center">Page Not Found!</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/" className={`${buttonVariants()} w-full`}>
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
