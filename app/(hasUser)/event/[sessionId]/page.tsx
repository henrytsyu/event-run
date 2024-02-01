import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function EventSession({
  params: { sessionId },
}: {
  params: { sessionId: string };
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
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
      <Card>
        <CardHeader>
          <CardTitle>Checkpoint</CardTitle>
        </CardHeader>
        <CardContent>Enter 6 digit pin code</CardContent>
      </Card>
    </div>
  );
}
