"use client";

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
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Json } from "@/utils/supabase/database.types";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrganiserActions({
  participant,
}: {
  participant: {
    session_id: string;
    user_id: string;
    group_no: number;
    statistics: Json;
    users: {
      display_name: string | null;
      email: string;
    } | null;
  };
}) {
  const router = useRouter();

  const supabase = createClient();

  const _removeParticipant = async () => {
    await supabase
      .from("participants")
      .delete()
      .eq("session_id", participant.session_id)
      .eq("user_id", participant.user_id);
    router.refresh();
  };

  return (
    <div className="flex space-x-4">
      <Button variant="secondary" size="icon">
        <Edit />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove{" "}
              {participant.users!.display_name ?? participant.users!.email}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                _removeParticipant();
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
