import { llmOrMock } from "./llm";
import { Duration, MarketingStrategy, ProductAnalysis, Scene, Storyboard } from "./types";

export const creativeDirectorPrompt = `You are Creative Director AI. Build concise scene-by-scene storyboard for TikTok/Reels, 9:16, with clear visual direction and short captions.`;
export const storyboardPrompt = `First 3 seconds must stop the scroll. Product must appear early. Keep scene copy concise.`;

function makeScenes(duration: Duration, productName: string, hook: string): Scene[] {
  const sceneCount = duration === "5 seconds" ? 3 : duration === "15 seconds" ? 5 : 7;
  const step = duration === "5 seconds" ? 1.6 : duration === "15 seconds" ? 3 : 4;
  return Array.from({ length: sceneCount }).map((_, i) => ({
    sceneNumber: i + 1,
    timeRange: `${Math.floor(i * step)}-${Math.floor((i + 1) * step)}s`,
    role: i === 0 ? "hook" : i === sceneCount - 1 ? "cta" : "benefit",
    visual: i === 0 ? `Tight close-up + bold text overlay with ${productName}` : `Creator demo scene ${i + 1} featuring ${productName}`,
    camera: i === 0 ? "Whip-in macro" : "Handheld vertical",
    lighting: "Soft high-contrast beauty lighting",
    motion: "Quick cut rhythm",
    caption: i === 0 ? "Wait—new routine unlocked" : i === sceneCount - 1 ? "Tap to see details" : "Daily support, zero fuss",
    voiceover: i === 0 ? hook : `Scene ${i + 1} emphasizes confidence and practical use`,
    emotion: i === 0 ? "Curiosity spike" : "Trust + aspiration",
    cta: i === sceneCount - 1 ? "Shop now" : ""
  }));
}

export async function buildStoryboard(product: ProductAnalysis, strategy: MarketingStrategy, duration: Duration): Promise<Storyboard> {
  const mock: Storyboard = {
    concept: strategy.concept,
    hook: strategy.hook,
    persona: strategy.persona,
    conversionGoal: strategy.conversionGoal,
    scenes: makeScenes(duration, product.productName, strategy.hook)
  };

  return llmOrMock(mock, `${creativeDirectorPrompt}\n${storyboardPrompt}\n${JSON.stringify({ product, strategy, duration })}`);
}
