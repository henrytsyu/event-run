import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
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

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Event Name</CardTitle>
        </CardHeader>
        <CardContent>Some content</CardContent>
      </Card>
    </div>
  );
}
