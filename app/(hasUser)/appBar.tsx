import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardTitle } from "@/components/ui/card";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default async function AppBar() {
  return (
    <header className="p-4 pb-0">
      <Card className="p-4">
        <CardTitle className="flex justify-between">
          <Link href="/">Event Run</Link>
          <div className="flex space-x-4">
            <Link href="/settings">
              <Settings />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger>
                <LogOut />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link href="/logout">
                    <AlertDialogAction>Logout</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
      </Card>
    </header>
  );
}
