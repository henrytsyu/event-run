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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default async function AppBar() {
  return (
    <Card className="m-4 mb-0">
      <CardHeader>
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
                  <AlertDialogAction asChild>
                    <Link href="/logout">Logout</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
