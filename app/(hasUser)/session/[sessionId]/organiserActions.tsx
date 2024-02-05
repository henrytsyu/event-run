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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { Json } from "@/utils/supabase/database.types";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [editOpen, setEditOpen] = useState(false);

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

  const _editParticipant = async (formData: FormData) => {
    const statistics: { [key: string]: Json | undefined } = {};
    formData.forEach((v, k) => {
      statistics[k] = parseInt(v.toString());
    });
    await supabase
      .from("participants")
      .update({ statistics })
      .eq("session_id", participant.session_id)
      .eq("user_id", participant.user_id);
    router.refresh();
    setEditOpen(false);
  };

  return (
    <div className="flex space-x-4">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Editing statistics for{" "}
            {participant.users!.display_name ?? participant.users!.email}
          </DialogHeader>
          <form
            id="editParticipant"
            action={_editParticipant}
            className="flex flex-col space-y-4"
          >
            <Table>
              <TableBody>
                {Object.entries(participant.statistics!).map((kv, i) => (
                  <TableRow key={i}>
                    <TableCell>{kv[0]}</TableCell>
                    <TableCell>
                      <Input type="number" name={kv[0]} defaultValue={kv[1]} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>
          <DialogFooter className="flex space-x-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="editParticipant">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
