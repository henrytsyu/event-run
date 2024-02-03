import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ParticipantSession from "./participantPage";
import OrganiserSession from "./organiserPage";

export default async function Session({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("users")
    .select("id, is_organiser")
    .eq("id", user!.id)
    .single();

  return data!.is_organiser ? (
    <OrganiserSession sessionId={sessionId} />
  ) : (
    <ParticipantSession sessionId={sessionId} />
  );
}
