import { complianceSafetyPrompt, sanitizeCopy } from "./compliance";
import { llmOrMock } from "./llm";
import { MarketingStrategy, ProductAnalysis, Tone } from "./types";

export const marketingBrainPrompt = `You are Marketing Brain. Build conversion strategy optimized for short-form ads with first 3-second hook and early product reveal.`;

export async function buildMarketingStrategy(product: ProductAnalysis, tone: Tone): Promise<MarketingStrategy> {
  const mock: MarketingStrategy = {
    concept: `${tone} creator diary: visible routine moments with social-proof framing`,
    hook: sanitizeCopy(`Stop scrolling: this ${product.productName} supports a better daily care ritual in 7 seconds.`),
    persona: "Relatable expert creator",
    conversionGoal: "Drive click-through to product page and add-to-cart",
    safetyNotes: [complianceSafetyPrompt]
  };

  return llmOrMock(mock, `${marketingBrainPrompt}\n${JSON.stringify(product)}\nTone:${tone}`);
}
