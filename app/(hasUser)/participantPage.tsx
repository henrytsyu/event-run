import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ParticipantHome() {
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
        sessions (
          completed,
          created_at,
          events (
            name,
            users (
              display_name,
              email
            )
          )
        )
      `
    )
    .eq("user_id", user!.id);

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My Events</CardTitle>
          <CardDescription>
            You have {data?.length} active event(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.map((record, i) => {
            return (
              <Link href={`/session/${record.session_id}`} key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>{record.sessions!.events!.name}</CardTitle>
                    <CardDescription>
                      {record.sessions!.events!.users!.display_name ??
                        record.sessions!.events!.users!.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {new Date(record.sessions!.created_at).toDateString()}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Join New Event</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
