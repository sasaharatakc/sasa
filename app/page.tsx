"use client";

import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import OutputTabs from "@/components/OutputTabs";
import { Duration, MarketingStrategy, ProductAnalysis, Storyboard, Category, Tone, ImagePrompt, VideoPrompt } from "@/lib/types";

export default function Page() {
  const [form, setForm] = useState<{ url: string; category: Category; tone: Tone; duration: Duration }>({ url: "", category: "Beauty", tone: "TikTok trend", duration: "15 seconds" });
  const [loading, setLoading] = useState(false);
  const [productAnalysis, setProductAnalysis] = useState<ProductAnalysis>();
  const [storyboard, setStoryboard] = useState<Storyboard>();
  const [marketingStrategy, setMarketingStrategy] = useState<MarketingStrategy>();
  const [imagePrompts, setImagePrompts] = useState<ImagePrompt[]>([]);
  const [videoPrompts, setVideoPrompts] = useState<VideoPrompt[]>([]);

  const generate = async () => {
    setLoading(true);
    const analysisRes = await fetch("/api/analyze-product", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: form.url, category: form.category }) });
    const analysis = await analysisRes.json();
    setProductAnalysis(analysis);

    const cmRes = await fetch("/api/generate-cm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productAnalysis: analysis, tone: form.tone, duration: form.duration, platform: "TikTok/Reels" }) });
    const cm = await cmRes.json();
    setStoryboard(cm);
    setMarketingStrategy({ concept: cm.concept, hook: cm.hook, persona: cm.persona, conversionGoal: cm.conversionGoal, safetyNotes: [] });

    const promptsRes = await fetch("/api/generate-prompts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ storyboard: cm, modelTarget: "flux_schnell" }) });
    const prompts = await promptsRes.json();
    setImagePrompts(prompts.imagePrompts ?? []);
    setVideoPrompts(prompts.videoPrompts ?? []);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#090a12] via-[#121629] to-[#1b1133] p-8">
      <h1 className="mb-6 text-3xl font-bold">ai-cm-generator</h1>
      <div className="mb-6 grid grid-cols-5 gap-2 text-xs text-cyan-200"><span>1. Analyze</span><span>2. Strategy</span><span>3. Storyboard</span><span>4. Prompts</span><span>5. Export</span></div>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <GeneratorForm values={form} onChange={setForm} onGenerate={generate} loading={loading} />
        <OutputTabs productAnalysis={productAnalysis} marketingStrategy={marketingStrategy} storyboard={storyboard} imagePrompts={imagePrompts} videoPrompts={videoPrompts} />
      </div>
    </main>
  );
}
