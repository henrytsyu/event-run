import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { Edit, Trash2 } from "lucide-react";
import { cookies } from "next/headers";

export default async function OrganiserSession({
  sessionId,
}: {
  sessionId: string;
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("sessions")
    .select(
      `
        id,
        created_at,
        events (
          organiser_id,
          name
        ),
        participants (
          group_no,
          statistics,
          users (
            display_name,
            email
          )
        )
      `
    )
    .eq("id", sessionId)
    .eq("events.organiser_id", user!.id)
    .single();

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data!.events!.name}</CardTitle>
        </CardHeader>
        <CardContent>{new Date(data!.created_at).toDateString()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant Name</TableHead>
                <TableHead>Group Number</TableHead>
                <TableHead>Statistics</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data!.participants.map((participant, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {participant.users!.display_name ??
                      participant.users!.email}
                  </TableCell>
                  <TableCell>{participant.group_no}</TableCell>
                  <TableCell>
                    {JSON.stringify(participant.statistics)}
                  </TableCell>
                  <TableCell className="flex space-x-4">
                    <Button variant="secondary" size="icon">
                      <Edit />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
