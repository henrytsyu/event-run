import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>My Events</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Join New Event</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
