import { NextRequest, NextResponse } from "next/server";
import { buildMarketingStrategy } from "@/lib/marketing-brain";
import { buildStoryboard } from "@/lib/creative-director";

export async function POST(req: NextRequest) {
  const { productAnalysis, tone, duration } = await req.json();
  if (!productAnalysis || !tone || !duration) {
    return NextResponse.json({ error: "productAnalysis, tone, duration required" }, { status: 400 });
  }

  const marketing = await buildMarketingStrategy(productAnalysis, tone);
  const storyboard = await buildStoryboard(productAnalysis, marketing, duration);

  return NextResponse.json(storyboard);
}
