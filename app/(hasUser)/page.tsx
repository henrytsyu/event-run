import { cookies } from "next/headers";
import ParticipantHome from "./participantPage";
import { createClient } from "@/utils/supabase/server";
import OrganiserHome from "./organiserPage";

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("users")
    .select("id, is_organiser")
    .eq("id", user!.id)
    .single();

  return (data!.is_organiser) ? <OrganiserHome /> : <ParticipantHome />;
}
