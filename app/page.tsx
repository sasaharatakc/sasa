import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <Card className="bg-aurora">
        <p className="text-lg">Start your growth workflow in 7 steps.</p>
        <Link href="/analysis" className="mt-4 inline-block rounded-lg bg-white/20 px-4 py-2">Analyze URL</Link>
      </Card>
    </div>
  );
}
