import { NextRequest, NextResponse } from "next/server";
import { generatePrompts } from "@/lib/prompt-generator";

export async function POST(req: NextRequest) {
  const { storyboard, modelTarget } = await req.json();
  if (!storyboard || !modelTarget) {
    return NextResponse.json({ error: "storyboard and modelTarget required" }, { status: 400 });
  }

  const output = await generatePrompts(storyboard, modelTarget);
  return NextResponse.json(output);
}
