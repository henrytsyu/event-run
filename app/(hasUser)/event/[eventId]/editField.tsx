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
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditField({
  eventId,
  field,
}: {
  eventId: string;
  field: {
    name: string;
    default_value: number;
    icon: string;
  };
}) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const supabase = createClient();

  const _editField = async (formData: FormData) => {
    const data = {
      event_id: eventId,
      name: formData.get("name")!.toString(),
      default_value: parseInt(formData.get("defaultValue")!.toString()),
      icon: formData.get("icon")!.toString(),
    };
    const { error } = await supabase
      .from("fields")
      .update(data)
      .eq("event_id", eventId)
      .eq("name", field.name);
    if (error) {
      toast({
        variant: "destructive",
        description: "Field names must be unique!",
      });
    } else {
      router.refresh();
      setOpen(false);
      toast({
        description: `Updated field "${data.name}".`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Editing Field</DialogHeader>
        <form
          id="editField"
          action={_editField}
          className="flex flex-col space-y-4"
        >
          <Input
            name="name"
            defaultValue={field.name}
            placeholder="Field Name"
            required
          />
          <Input
            type="number"
            name="defaultValue"
            defaultValue={field.default_value}
            placeholder="Default Value"
            required
          />
          <Input
            name="icon"
            defaultValue={field.icon}
            placeholder="Field Icon"
            required
          />
        </form>
        <DialogFooter className="flex space-x-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="editField">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
