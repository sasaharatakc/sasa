import { analyzeUrl } from "@/lib/services/mock-ai";
import { Card } from "@/components/ui/card";

export default async function AnalysisPage() {
  const analysis = await analyzeUrl("https://my-growth-site.com");
  return <div className="space-y-4"><h2 className="text-2xl font-semibold">URL Analysis</h2><Card><pre className="whitespace-pre-wrap text-sm">{JSON.stringify(analysis, null, 2)}</pre></Card></div>;
}
