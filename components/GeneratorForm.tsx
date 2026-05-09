"use client";

import { Category, Duration, Tone } from "@/lib/types";

interface Props {
  values: {
    url: string;
    category: Category;
    tone: Tone;
    duration: Duration;
  };
  onChange: (next: Props["values"]) => void;
  onGenerate: () => void;
  loading: boolean;
}

const categories: Category[] = ["ED", "AGA", "Beauty", "Supplement", "Generic ecommerce"];
const tones: Tone[] = ["TikTok trend", "Luxury", "Medical trust", "Gorgeous", "Natural"];
const durations: Duration[] = ["5 seconds", "15 seconds", "30 seconds"];

export default function GeneratorForm({ values, onChange, onGenerate, loading }: Props) {
  return (
    <div className="rounded-2xl bg-card/80 p-6 shadow-xl shadow-fuchsia-900/20">
      <h2 className="mb-4 text-xl font-semibold">AI CM Generator</h2>
      <div className="space-y-4">
        <input className="w-full rounded-lg bg-black/30 p-3" placeholder="https://product-url.com" value={values.url} onChange={(e) => onChange({ ...values, url: e.target.value })} />
        <select className="w-full rounded-lg bg-black/30 p-3" value={values.category} onChange={(e) => onChange({ ...values, category: e.target.value as Category })}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select className="w-full rounded-lg bg-black/30 p-3" value={values.tone} onChange={(e) => onChange({ ...values, tone: e.target.value as Tone })}>{tones.map((t) => <option key={t}>{t}</option>)}</select>
        <select className="w-full rounded-lg bg-black/30 p-3" value={values.duration} onChange={(e) => onChange({ ...values, duration: e.target.value as Duration })}>{durations.map((d) => <option key={d}>{d}</option>)}</select>
        <button onClick={onGenerate} disabled={loading} className="w-full rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-3 font-semibold disabled:opacity-50">{loading ? "Generating..." : "Generate"}</button>
      </div>
    </div>
  );
}
