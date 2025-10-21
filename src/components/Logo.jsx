export default function Logo({ className = "w-32 h-auto", gradient = false }) {
  const fillColor = gradient ? "url(#logoGradient)" : "currentColor"

  return (
    <svg
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {gradient && (
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FAB800" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#FAB800" />
          </linearGradient>
        </defs>
      )}

      <g>
        {/* Grid 2x2 para S N K T */}

        {/* S - Top Left */}
        <g transform="translate(5, 5)">
          <rect width="35" height="35" fill={fillColor} />
          <path d="M 8 8 L 27 8 L 27 15 L 15 15 L 15 20 L 27 20 L 27 27 L 8 27 L 8 20 L 20 20 L 20 15 L 8 15 Z" fill="black" />
        </g>

        {/* N - Top Right */}
        <g transform="translate(50, 5)">
          <rect width="35" height="35" fill={fillColor} />
          <path d="M 8 8 L 14 8 L 14 15 L 21 15 L 21 8 L 27 8 L 27 27 L 21 27 L 21 20 L 14 20 L 14 27 L 8 27 Z" fill="black" />
        </g>

        {/* K - Bottom Left */}
        <g transform="translate(5, 50)">
          <rect width="35" height="35" fill={fillColor} />
          <path d="M 8 8 L 14 8 L 14 15 L 21 15 L 21 8 L 27 8 L 27 14 L 20 14 L 20 21 L 27 21 L 27 27 L 21 27 L 21 20 L 14 20 L 14 27 L 8 27 Z" fill="black" />
        </g>

        {/* T - Bottom Right */}
        <g transform="translate(50, 50)">
          <rect width="35" height="35" fill={fillColor} />
          <path d="M 8 8 L 27 8 L 27 14 L 21 14 L 21 27 L 14 27 L 14 14 L 8 14 Z" fill="black" />
        </g>

        {/* HOUSE® text */}
        <text
          x="5"
          y="105"
          fontSize="18"
          fontWeight="900"
          letterSpacing="2"
          fill={fillColor}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          HOUSE
        </text>
        <text
          x="95"
          y="105"
          fontSize="10"
          fontWeight="400"
          fill={fillColor}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          ®
        </text>
      </g>
    </svg>
  )
}
