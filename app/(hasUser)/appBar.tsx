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
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { LogOut, Settings } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AppBar() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("users")
    .select("display_name")
    .eq("id", user!.id)
    .single();
  const { display_name } = data!;

  return (
    <Card className="p-4 m-4 mb-0">
      <CardTitle className="flex justify-between">
        <div className="flex space-x-4">
          <Link href="/">Event Run</Link>
          <Separator orientation="vertical" />
          <span>{display_name ?? user!.email ?? "Participant"}</span>
        </div>
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
  );
}
