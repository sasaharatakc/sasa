import { discoverCompetitors } from "@/lib/services/mock-ai";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function CompetitorsPage() {
  const items = await discoverCompetitors();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Competitor Like Board</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((c) => <Card key={c.url}><h3 className="font-semibold">{c.name}</h3><p className="text-xs opacity-80">{c.reason}</p><div className="mt-3 flex gap-2"><Button>Like</Button><Button variant="outline">Save</Button><Button variant="ghost">Reject</Button></div></Card>)}
      </div>
    </div>
  );
}
