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

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.from("participants").select(`
    group_no,
    session_id,
    sessions (
      completed,
      created_at,
      events (
        name,
        users (
          display_name
        )
      )
    )
  `);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
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
              <Link href={`/event/${record.session_id}`} key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {record.sessions!.events!.name} by{" "}
                      {record.sessions!.events!.users!.display_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Group {record.group_no} |{" "}
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
