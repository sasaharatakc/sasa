import Link from "next/link";

const nav = [
  ["Dashboard", "/"],
  ["URL Analysis", "/analysis"],
  ["Competitors", "/competitors"],
  ["Direction Map", "/direction"],
  ["Generators", "/generators"],
  ["Results", "/results"],
  ["Checklist", "/checklist"],
] as const;

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
      <aside className="border-r border-border p-4">
        <h1 className="bg-aurora mb-6 rounded-xl p-3 text-lg font-bold">GrowthStep AI</h1>
        <nav className="space-y-1">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-white/10">{label}</Link>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
