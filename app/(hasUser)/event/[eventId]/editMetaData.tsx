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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function EditMetaData({
  eventId,
  user,
  data,
}: {
  eventId: string;
  user: User;
  data: {
    name: string;
    participant_limit: number | null;
    group_size: number | null;
    no_groups: number | null;
    duration_minutes: number | null;
  };
}) {
  const router = useRouter();

  const supabase = createClient();

  const _editMetaData = async (formData: FormData) => {
    const newMetaData = {
      participant_limit: parseInt(
        formData.get("participant_limit")!.toString()
      ),
      group_size: parseInt(formData.get("group_size")!.toString()),
      no_groups: parseInt(formData.get("no_groups")!.toString()),
      duration_minutes: parseInt(formData.get("duration_minutes")!.toString()),
    };
    await supabase
      .from("events")
      .update(newMetaData)
      .eq("id", eventId)
      .eq("organiser_id", user.id);
    router.refresh();
  };

  const eventMetadata: [string, string, number | null][] = [
    ["participant_limit", "Participant Limit", data.participant_limit],
    ["group_size", "Group Size", data.group_size],
    ["no_groups", "Number of Groups", data.no_groups],
    ["duration_minutes", "Duration", data.duration_minutes],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="editMetaData" action={_editMetaData}>
          <Table>
            <TableBody>
              {eventMetadata.map((kv, i) => (
                <TableRow key={i}>
                  <TableCell>{kv[1]}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      name={kv[0]}
                      defaultValue={kv[2] ?? undefined}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </CardContent>
      <CardFooter className="flex space-x-4 justify-end">
        <Button variant="secondary" type="reset" form="editMetaData">
          Cancel
        </Button>
        <Button type="submit" form="editMetaData">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
