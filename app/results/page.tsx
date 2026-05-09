import { runGenerator } from "@/lib/services/mock-ai";
import { Card } from "@/components/ui/card";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind = "SEO Article Generator" } = await searchParams;
  const res = await runGenerator(kind);
  return <div className="space-y-4"><h2 className="text-2xl font-semibold">Generator Result</h2><Card><p className="mb-2">Style presets: premium · medical trust · D2C conversion · SNS trend · luxury · friendly · compliance-safe</p><pre className="text-sm">{JSON.stringify(res, null, 2)}</pre></Card></div>;
}
