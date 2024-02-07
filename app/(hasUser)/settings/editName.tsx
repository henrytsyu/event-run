"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function EditName({ name, id }: { name: string; id: string }) {
  const supabase = createClient();

  const router = useRouter();

  const _editName = async (formData: FormData) => {
    const newName: string = formData.get("name")!.toString();
    await supabase.from("users").update({ display_name: newName }).eq("id", id);
    router.refresh();
  };

  return (
    <form action={_editName} className="w-full sm:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Edit Name</CardTitle>
        </CardHeader>
        <CardContent>
          <Input name="name" defaultValue={name} />
        </CardContent>
        <CardFooter className="flex space-x-4 justify-end">
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
