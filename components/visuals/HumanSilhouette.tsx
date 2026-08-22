'use client';

/**
 * Abstract human silhouette with a soft teal core glow — represents medicine
 * being absorbed and supporting the body. Decorative.
 */
export function HumanSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="humanBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fc3b6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0a6b62" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="humanCore" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#eafaf7" />
          <stop offset="0.5" stopColor="#7fded1" />
          <stop offset="1" stopColor="#7fded1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Head */}
      <circle cx="150" cy="60" r="38" fill="url(#humanBody)" />
      {/* Torso + arms as a single flowing shape */}
      <path
        data-part="torso"
        d="M150 104
           C120 104 104 120 100 150
           L70 250 C66 268 84 276 92 260 L120 190
           L112 320 C110 360 118 420 128 470
           C130 486 150 486 152 470
           C154 452 156 420 160 380
           C164 420 166 452 168 470
           C170 486 190 486 192 470
           C202 420 210 360 208 320
           L200 190 L228 260 C236 276 254 268 250 250
           L220 150 C216 120 200 104 170 104 Z"
        fill="url(#humanBody)"
      />
      {/* Core glow (medicine absorbed) */}
      <circle data-part="core" cx="150" cy="210" r="70" fill="url(#humanCore)" />
      <circle cx="150" cy="210" r="10" fill="#ffffff" />
    </svg>
  );
}
