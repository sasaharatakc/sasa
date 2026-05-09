import { generateChecklist } from "@/lib/services/mock-ai";
import { Card } from "@/components/ui/card";

export default async function ChecklistPage(){const list=await generateChecklist();return <div className="space-y-4"><h2 className="text-2xl font-semibold">Compliance / SEO Checklist</h2><Card><ul className="space-y-2">{list.map((i)=><li key={i.item}>[{i.done?"x":" "}] <span className="font-semibold">{i.category}</span> - {i.item}</li>)}</ul></Card></div>}
