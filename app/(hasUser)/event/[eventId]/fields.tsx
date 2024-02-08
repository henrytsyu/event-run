import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewField from "./newField";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import DeleteField from "./deleteField";
import EditField from "./editField";

export default async function Fields({
  eventId,
}: {
  eventId: string;
}) {
  const supabase = createClient(cookies());

  const { data } = await supabase
    .from("fields")
    .select("name, default_value, icon")
    .eq("event_id", eventId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Statistics</span>
          <NewField eventId={eventId} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead>Default Value</TableHead>
              <TableHead>Field Icon</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data!.map((field, i) => (
              <TableRow key={i}>
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.default_value}</TableCell>
                <TableCell>{field.icon}</TableCell>
                <TableCell className="flex space-x-4">
                  <EditField eventId={eventId} field={field} />
                  <DeleteField eventId={eventId} field={field} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
