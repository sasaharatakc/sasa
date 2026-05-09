"use client";

export default function JsonExport({ payload }: { payload: unknown }) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ai-cm-generator-output.json";
    a.click();
  };

  return <button onClick={handleExport} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold">Export JSON</button>;
}
