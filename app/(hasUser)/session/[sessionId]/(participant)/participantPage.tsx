import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Checkpoint from "./checkpoint";

export default async function ParticipantSession({
  sessionId,
}: {
  sessionId: string;
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("participants")
    .select(
      `
        user_id,
        session_id,
        group_no,
        statistics,
        sessions (
          events (
            name
          )
        )
      `
    )
    .eq("session_id", sessionId)
    .eq("user_id", user!.id)
    .single();

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data!.sessions!.events!.name}</CardTitle>
          <CardDescription>Group {data!.group_no}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {Object.entries(data!.statistics!).map((kv, i) => (
                <TableRow key={i}>
                  <TableCell className="w-1/3">{kv[0]}</TableCell>
                  <TableCell className="w-2/3">{"⭐".repeat(kv[1])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Checkpoint />
    </div>
  );
}
