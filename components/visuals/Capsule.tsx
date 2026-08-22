'use client';

/**
 * Stylised pharmaceutical capsule rendered as SVG so it can be transformed,
 * split and rotated cheaply on the GPU. Named parts (data-part) let scenes
 * target the two halves and the inner granules independently.
 */
export function Capsule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="capTeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12b3a3" />
          <stop offset="0.55" stopColor="#0f9b8e" />
          <stop offset="1" stopColor="#0a6b62" />
        </linearGradient>
        <linearGradient id="capWhite" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dff3ef" />
        </linearGradient>
        <radialGradient id="capShine" cx="0.3" cy="0.25" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Left half — teal (filled) */}
      <g data-part="cap-left">
        <path
          d="M110 40 H210 V160 H110 A60 60 0 0 1 110 40 Z"
          fill="url(#capTeal)"
        />
        {/* granules */}
        <g data-part="granules" fill="#eafaf7">
          <circle cx="95" cy="80" r="6" />
          <circle cx="120" cy="110" r="5" />
          <circle cx="150" cy="70" r="7" />
          <circle cx="165" cy="120" r="5" />
          <circle cx="130" cy="90" r="4" fill="#7fded1" />
          <circle cx="185" cy="95" r="6" fill="#7fded1" />
          <circle cx="100" cy="120" r="4" />
          <circle cx="175" cy="60" r="4" fill="#c9f3ec" />
        </g>
      </g>

      {/* Right half — white shell */}
      <g data-part="cap-right">
        <path
          d="M310 40 H210 V160 H310 A60 60 0 0 0 310 40 Z"
          fill="url(#capWhite)"
          stroke="#cfeee8"
          strokeWidth="1.5"
        />
      </g>

      {/* Seam highlight */}
      <rect x="205" y="40" width="10" height="120" fill="url(#capShine)" />
      {/* Top gloss */}
      <path
        d="M120 52 Q210 40 300 52"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
