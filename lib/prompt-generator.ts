import { llmOrMock } from "./llm";
import { ImagePrompt, Storyboard, VideoPrompt } from "./types";

export const imagePromptGenerator = `Generate ComfyUI-ready image prompts with positive and negative guidance for vertical ad scenes.`;
export const videoPromptGenerator = `Generate motion prompts ready for WAN/Kling style tools with start/end frame intent.`;

export async function generatePrompts(storyboard: Storyboard, modelTarget: string): Promise<{ imagePrompts: ImagePrompt[]; videoPrompts: VideoPrompt[] }> {
  const imagePrompts: ImagePrompt[] = storyboard.scenes.map((scene) => ({
    sceneNumber: scene.sceneNumber,
    positivePrompt: `${scene.visual}, ${scene.lighting}, ${scene.camera}, premium ${modelTarget}, vertical 9:16, ecommerce ad, clean background`,
    negativePrompt: "medical cure claim, explicit sexual content, illegal drugs, distorted anatomy, blurry text",
    aspectRatio: "9:16",
    style: "high-contrast social ad",
    seedHint: `scene-${scene.sceneNumber}-seed`
  }));

  const videoPrompts: VideoPrompt[] = storyboard.scenes.map((scene) => ({
    sceneNumber: scene.sceneNumber,
    startFramePrompt: scene.visual,
    endFramePrompt: `${scene.visual}, product clearly visible, CTA-friendly framing`,
    motionPrompt: scene.motion,
    cameraMotion: scene.camera,
    duration: scene.timeRange,
    fps: 24
  }));

  return llmOrMock({ imagePrompts, videoPrompts }, `${imagePromptGenerator}\n${videoPromptGenerator}\n${JSON.stringify({ storyboard, modelTarget })}`);
}
