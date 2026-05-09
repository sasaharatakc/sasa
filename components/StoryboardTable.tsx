import { Scene } from "@/lib/types";

export default function StoryboardTable({ scenes }: { scenes: Scene[] }) {
  return <div className="space-y-2">{scenes.map((s) => <div key={s.sceneNumber} className="rounded-lg bg-black/30 p-3 text-sm"><p className="font-semibold">Scene {s.sceneNumber} ({s.timeRange})</p><p>{s.visual}</p><p className="text-cyan-300">Caption: {s.caption}</p></div>)}</div>;
}
