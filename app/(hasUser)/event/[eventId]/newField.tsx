"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewField({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const supabase = createClient();

  const _newField = async (formData: FormData) => {
    const data = {
      event_id: eventId,
      name: formData.get("name")!.toString(),
      default_value: parseInt(formData.get("defaultValue")!.toString()),
      icon: formData.get("icon")!.toString(),
    };
    const { error } = await supabase.from("fields").insert(data);
    if (error) {
      toast({
        variant: "destructive",
        description: "Field names must be unique!",
      });
    } else {
      router.refresh();
      setOpen(false);
      toast({
        description: `Added new field "${data.name}".`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">New Field</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>New Field</DialogHeader>
        <form
          id="newField"
          action={_newField}
          className="flex flex-col space-y-4"
        >
          <Input name="name" placeholder="Field Name" required />
          <Input
            type="number"
            name="defaultValue"
            placeholder="Default Value"
            required
          />
          <Input name="icon" placeholder="Field Icon" required />
        </form>
        <DialogFooter className="flex space-x-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="newField">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
