import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function OrganiserHome() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: liveEvents } = await supabase
    .from("sessions")
    .select(
      `
        id,
        completed,
        created_at,
        events (
          name,
          organiser_id
        )
      `
    )
    .eq("events.organiser_id", user!.id);

  const { data: draftEvents } = await supabase
    .from("events")
    .select("name, id")
    .eq("organiser_id", user!.id);

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Live Events</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {liveEvents
            ?.filter((record) => record.events)
            .map((record, i) => {
              return (
                <Link href={`/session/${record.id}`} key={i}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{record.events?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {new Date(record.created_at).toDateString()}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Draft Events</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {draftEvents?.map((record, i) => {
            return (
              <Link href={`/event/${record.id}`} key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>{record.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
