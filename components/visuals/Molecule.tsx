'use client';

/**
 * Scientific molecular-network graphic. Nodes and bonds carry data-part hooks
 * so scenes can stagger their appearance. Purely decorative.
 */
export function Molecule({ className }: { className?: string }) {
  const nodes = [
    { x: 300, y: 300, r: 30, c: '#0f9b8e' }, // core
    { x: 180, y: 190, r: 15, c: '#12b3a3' },
    { x: 430, y: 200, r: 17, c: '#12b3a3' },
    { x: 160, y: 400, r: 13, c: '#4fc3b6' },
    { x: 440, y: 410, r: 16, c: '#4fc3b6' },
    { x: 300, y: 120, r: 12, c: '#7fded1' },
    { x: 300, y: 480, r: 14, c: '#7fded1' },
    { x: 100, y: 300, r: 10, c: '#7fded1' },
    { x: 500, y: 300, r: 11, c: '#7fded1' },
  ];
  const bonds: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 7],
    [2, 8],
    [1, 5],
    [2, 5],
    [3, 6],
    [4, 6],
  ];

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="molCore" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4fc3b6" />
          <stop offset="1" stopColor="#0a6b62" />
        </radialGradient>
      </defs>

      <g data-part="bonds" stroke="#0f9b8e" strokeOpacity="0.35" strokeWidth="2">
        {bonds.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>

      <g data-part="nodes">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === 0 ? 'url(#molCore)' : n.c}
            opacity={i === 0 ? 1 : 0.9}
          />
        ))}
      </g>
    </svg>
  );
}
