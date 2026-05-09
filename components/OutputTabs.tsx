"use client";

import { useState } from "react";
import { ImagePrompt, MarketingStrategy, ProductAnalysis, Storyboard, VideoPrompt } from "@/lib/types";
import StoryboardTable from "./StoryboardTable";
import PromptCards from "./PromptCards";
import JsonExport from "./JsonExport";

const tabs = ["Product Analysis", "Marketing Strategy", "Storyboard", "Image Prompts", "Video Prompts", "Export JSON"] as const;

export default function OutputTabs({ productAnalysis, marketingStrategy, storyboard, imagePrompts, videoPrompts }: { productAnalysis?: ProductAnalysis; marketingStrategy?: MarketingStrategy; storyboard?: Storyboard; imagePrompts: ImagePrompt[]; videoPrompts: VideoPrompt[]; }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Product Analysis");
  const exportPayload = { productAnalysis, marketingStrategy, storyboard, imagePrompts, videoPrompts, comfyuiReady: false, nextStep: "Send image prompts to ComfyUI API" };

  return (
    <div className="rounded-2xl bg-card/80 p-6">
      <div className="mb-4 flex flex-wrap gap-2">{tabs.map((t) => <button key={t} onClick={() => setActive(t)} className={`rounded-md px-3 py-1 text-sm ${active === t ? "bg-fuchsia-500" : "bg-black/30"}`}>{t}</button>)}</div>
      {active === "Product Analysis" && <pre className="text-xs">{JSON.stringify(productAnalysis, null, 2)}</pre>}
      {active === "Marketing Strategy" && <pre className="text-xs">{JSON.stringify(marketingStrategy, null, 2)}</pre>}
      {active === "Storyboard" && (storyboard ? <StoryboardTable scenes={storyboard.scenes} /> : <p>No storyboard yet.</p>)}
      {active === "Image Prompts" && <pre className="text-xs">{JSON.stringify(imagePrompts, null, 2)}</pre>}
      {active === "Video Prompts" && <pre className="text-xs">{JSON.stringify(videoPrompts, null, 2)}</pre>}
      {active === "Export JSON" && <div className="space-y-3"><PromptCards imagePrompts={imagePrompts} videoPrompts={videoPrompts} /><JsonExport payload={exportPayload} /></div>}
    </div>
  );
}
