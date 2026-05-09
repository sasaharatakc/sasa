export type SiteAnalysis = {
  business_summary: string;
  target_customer: string;
  main_offer: string;
  seo_score: number;
  geo_score: number;
  cta_score: number;
  trust_score: number;
  ymyl_risk_score: number;
  problems: string[];
  priority_fixes: string[];
};

export type CompetitorCard = {
  name: string;
  url: string;
  type: "direct" | "seo" | "ads" | "sns" | "ai_search";
  reason: string;
  seo_strength: number;
  design_strength: number;
  lp_strength: number;
  sns_strength: number;
  cta_strength: number;
  tags: string[];
};

export async function analyzeUrl(website_url: string): Promise<SiteAnalysis> {
  return {
    business_summary: `${website_url} provides a modern SaaS product focused on automated growth content generation.`,
    target_customer: "SMB founders, marketers, and solo operators",
    main_offer: "AI-powered multi-channel growth asset generation",
    seo_score: 67,
    geo_score: 52,
    cta_score: 59,
    trust_score: 71,
    ymyl_risk_score: 19,
    problems: ["Thin structured data", "Weak above-the-fold CTA", "No AI Overview-targeted FAQ blocks"],
    priority_fixes: ["Add Organization/Product schema", "Rewrite hero with outcome-first messaging", "Publish entity-based FAQ section"]
  };
}

export async function discoverCompetitors(): Promise<CompetitorCard[]> {
  return ["seo", "direct", "ads", "sns", "ai_search"].map((type, i) => ({
    name: `Competitor ${i + 1}`,
    url: `https://example${i + 1}.com`,
    type: type as CompetitorCard["type"],
    reason: `Strong ${type} visibility in the same buyer journey.`,
    seo_strength: 75 - i,
    design_strength: 70 + i,
    lp_strength: 68 + i,
    sns_strength: 65 + i,
    cta_strength: 66 + i,
    tags: ["high-conv", "brand", type],
  }));
}

export async function generateDirectionMap() {
  return {
    recommended_positioning: "Practical AI growth copilot for lean teams",
    visual_direction: "Blue-violet gradients, polished product UI, proof-heavy sections",
    copy_direction: "Outcome first, specific numeric claims, clear objection handling",
    seo_strategy: "Cluster around industry + use-case long-tail queries",
    geo_strategy: "Entity grounding + citation-ready concise blocks",
    cta_strategy: "Single primary CTA per section with low-friction microcopy",
    differentiation_points: ["Competitor-like board", "End-to-end generator workflow"],
    things_to_avoid: ["Generic AI buzzwords", "Overlong hero text"],
  };
}

export async function runGenerator(kind: string) {
  return { kind, output: { title: `${kind} output`, blocks: ["Section A", "Section B"], schema: { "@type": "Article" } } };
}

export async function generateChecklist() {
  return [
    { category: "SEO", item: "Meta title includes primary keyword", done: false },
    { category: "GEO", item: "Entity definitions present", done: false },
    { category: "CTA", item: "Primary CTA visible above the fold", done: true },
    { category: "YMYL", item: "Claims include verifiable proof", done: false },
    { category: "Tech", item: "Structured data validates", done: false },
  ];
}
