"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SwitchRole({
  isOrganiser,
  id,
}: {
  isOrganiser: boolean;
  id: string;
}) {
  const supabase = createClient();

  const router = useRouter();

  const _switchRole = async () => {
    await supabase
      .from("users")
      .update({ is_organiser: !isOrganiser })
      .eq("id", id);
    router.refresh();
  };

  return (
    <Card className="w-full sm:w-1/2 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>User Role</CardTitle>
      </CardHeader>
      <CardContent>
        You are currently {isOrganiser ? "an organiser" : "a participant"}.
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => {
            _switchRole();
          }}
        >
          Switch to {isOrganiser ? "participant" : "organiser"} view
        </Button>
      </CardFooter>
    </Card>
  );
}
