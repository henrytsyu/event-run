import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditName from "./editName";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Settings() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("users")
    .select("display_name, is_organiser, email")
    .eq("id", user!.id)
    .single();

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row space-x-0 space-y-4 sm:space-x-4 sm:space-y-0">
        <EditName name={data!.display_name ?? data!.email} id={user!.id} />
      </CardContent>
    </Card>
  );
}
