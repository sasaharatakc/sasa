import { ProductAnalysis } from "./types";
import { llmOrMock } from "./llm";

export const productAnalyzerPrompt = `Analyze ecommerce product from URL and extract structure: productName, category, ingredients, benefits, price, targetAudience, usp, warnings.`;

export async function analyzeProduct(url: string, category: string): Promise<ProductAnalysis> {
  const mock: ProductAnalysis = {
    productName: "HydraGlow Daily Serum",
    category,
    ingredients: ["Niacinamide", "Hyaluronic acid", "Green tea extract"],
    benefits: ["Supports smoother look", "Helps lock hydration", "Designed for daily confidence"],
    price: "$39.00",
    targetAudience: ["25-40 skincare buyers", "D2C beauty shoppers"],
    usp: ["Fast-absorbing", "No sticky residue", "Travel-ready 30ml"],
    warnings: ["Patch test recommended", "Individual results vary", "Consult a professional for sensitive skin"],
    sourceUrl: url,
    warning: "Live scraping unavailable or intentionally bypassed in MVP; mock structure returned."
  };

  return llmOrMock(mock, `${productAnalyzerPrompt}\nURL:${url}\nCategory:${category}`);
}
