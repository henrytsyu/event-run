"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { Json } from "@/utils/supabase/database.types";
import { User } from "@supabase/supabase-js";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditStatistics({
  eventId,
  user,
  statistics,
}: {
  eventId: string;
  user: User;
  statistics: Json;
}) {
  const [fields, setFields] = useState(
    statistics as { [key: string]: Json | undefined }
  );

  const router = useRouter();

  const supabase = createClient();

  const _newStatistic = () => {
    const fieldName: string = "field";
    let i = 0;
    while (Object.keys(fields!).includes(fieldName + i)) i++;
    const newFields = { ...fields };
    newFields[fieldName + i] = "";
    setFields(newFields);
  };

  const _removeStatistic = (i: number) => {
    const newFields = { ...fields };
    delete newFields[Object.keys(newFields)[i]];
    setFields(newFields);
  };

  const _editStatistics = async (formData: FormData) => {
    const newStatistics: { [key: string]: Json | undefined } = {};

    formData.forEach((v, k) => {
      const kString = k.toString();
      if (kString.startsWith("name")) {
        newStatistics[v.toString()] = formData
          .get(kString.replace("name", "icon"))!
          .toString();
      }
    });

    await supabase
      .from("events")
      .update({ statistics: newStatistics })
      .eq("id", eventId)
      .eq("organiser_id", user.id);

    router.refresh();
    setFields(newStatistics);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Statistics</span>
          <Button
            variant="secondary"
            onClick={() => {
              _newStatistic();
            }}
          >
            New Field
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="editStatistics" action={_editStatistics}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>Field Icon</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(fields!).map((kv, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input name={`name-${i}`} defaultValue={kv[0]} required />
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`icon-${i}`}
                      defaultValue={kv[1]?.toString()}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to remove the field "{kv[0]}"?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              _removeStatistic(i);
                            }}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </CardContent>
      <CardFooter className="flex space-x-4 justify-end">
        <Button
          variant="secondary"
          type="reset"
          form="editStatistics"
          onClick={() => {
            setFields(statistics as { [key: string]: Json | undefined });
          }}
        >
          Cancel
        </Button>
        <Button type="submit" form="editStatistics">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
