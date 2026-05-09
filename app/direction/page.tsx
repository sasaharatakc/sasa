import { generateDirectionMap } from "@/lib/services/mock-ai";
import { Card } from "@/components/ui/card";

export default async function DirectionPage() {
  const map = await generateDirectionMap();
  return <div className="space-y-4"><h2 className="text-2xl font-semibold">AI Direction Map</h2><Card><pre className="text-sm">{JSON.stringify(map, null, 2)}</pre></Card></div>;
}
