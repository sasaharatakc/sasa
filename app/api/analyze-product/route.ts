import { NextRequest, NextResponse } from "next/server";
import { analyzeProduct } from "@/lib/product-analyzer";

export async function POST(req: NextRequest) {
  try {
    const { url, category } = await req.json();
    if (!url || !category) {
      return NextResponse.json({ error: "url and category are required" }, { status: 400 });
    }

    const analysis = await analyzeProduct(url, category);
    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json(
      {
        productName: "Fallback Product",
        category: "Generic ecommerce",
        ingredients: [],
        benefits: [],
        price: "N/A",
        targetAudience: [],
        usp: [],
        warnings: ["Fallback due to processing error"],
        sourceUrl: "",
        warning: "Product analysis failed; fallback mock returned."
      },
      { status: 200 }
    );
  }
}
