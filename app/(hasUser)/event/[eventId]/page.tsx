import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import EditMetaData from "./editMetaData";
import Fields from "./fields";

export default async function Session({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("events")
    .select(
      `
        name,
        participant_limit,
        group_size,
        no_groups,
        duration_minutes,
        score_metric
      `
    )
    .eq("id", eventId)
    .eq("organiser_id", user!.id)
    .single();

  return (
    <div className="p-4 flex flex-col space-y-4">
      <EditMetaData eventId={eventId} user={user!} data={data!} />
      <Fields eventId={eventId} />
    </div>
  );
}
