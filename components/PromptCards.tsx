import { ImagePrompt, VideoPrompt } from "@/lib/types";

export default function PromptCards({ imagePrompts, videoPrompts }: { imagePrompts: ImagePrompt[]; videoPrompts: VideoPrompt[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-lg bg-black/30 p-3">
        <h3 className="mb-2 font-semibold">Image Prompts</h3>
        {imagePrompts.map((p) => <p key={p.sceneNumber} className="mb-2 text-xs">#{p.sceneNumber} {p.positivePrompt}</p>)}
      </div>
      <div className="rounded-lg bg-black/30 p-3">
        <h3 className="mb-2 font-semibold">Video Prompts</h3>
        {videoPrompts.map((p) => <p key={p.sceneNumber} className="mb-2 text-xs">#{p.sceneNumber} {p.motionPrompt}</p>)}
      </div>
    </div>
  );
}
