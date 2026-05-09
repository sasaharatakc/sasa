export type Category = "ED" | "AGA" | "Beauty" | "Supplement" | "Generic ecommerce";
export type Tone = "TikTok trend" | "Luxury" | "Medical trust" | "Gorgeous" | "Natural";
export type Duration = "5 seconds" | "15 seconds" | "30 seconds";

export interface ProductAnalysis {
  productName: string;
  category: string;
  ingredients: string[];
  benefits: string[];
  price: string;
  targetAudience: string[];
  usp: string[];
  warnings: string[];
  sourceUrl: string;
  warning?: string;
}

export interface MarketingStrategy {
  concept: string;
  hook: string;
  persona: string;
  conversionGoal: string;
  safetyNotes: string[];
}

export interface Scene {
  sceneNumber: number;
  timeRange: string;
  role: string;
  visual: string;
  camera: string;
  lighting: string;
  motion: string;
  caption: string;
  voiceover: string;
  emotion: string;
  cta: string;
}

export interface Storyboard {
  concept: string;
  hook: string;
  persona: string;
  conversionGoal: string;
  scenes: Scene[];
}

export interface ImagePrompt {
  sceneNumber: number;
  positivePrompt: string;
  negativePrompt: string;
  aspectRatio: "9:16";
  style: string;
  seedHint: string;
}

export interface VideoPrompt {
  sceneNumber: number;
  startFramePrompt: string;
  endFramePrompt: string;
  motionPrompt: string;
  cameraMotion: string;
  duration: string;
  fps: 24;
}
