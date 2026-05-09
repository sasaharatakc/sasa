import Link from "next/link";
import { Card } from "@/components/ui/card";
const gens = ["SEO Article Generator","LP Generator","Product Page Generator","Instagram Ad Generator","TikTok/Reels CM Generator","GEO Generator"];
export default function GeneratorsPage(){return <div className="space-y-4"><h2 className="text-2xl font-semibold">Generator Selection</h2><div className="grid md:grid-cols-2 gap-3">{gens.map((g)=><Card key={g}><h3>{g}</h3><Link href={`/results?kind=${encodeURIComponent(g)}`} className="text-primary">Run generator →</Link></Card>)}</div></div>}
