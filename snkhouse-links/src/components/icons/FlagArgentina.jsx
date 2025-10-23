export default function FlagArgentina({ className = "w-12 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bandeira da Argentina */}
      <g>
        {/* Faixa azul superior */}
        <rect x="0" y="0" width="900" height="200" fill="#74ACDF" />
        {/* Faixa branca do meio */}
        <rect x="0" y="200" width="900" height="200" fill="#FFFFFF" />
        {/* Faixa azul inferior */}
        <rect x="0" y="400" width="900" height="200" fill="#74ACDF" />
        {/* Sol de Mayo */}
        <g transform="translate(450, 300)">
          {/* Círculo central do sol */}
          <circle r="26" fill="#F6B40E" stroke="#85340A" strokeWidth="2" />
          {/* Raios do sol */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16
            const isLong = i % 2 === 0
            const length = isLong ? 35 : 28
            const width = isLong ? 8 : 6
            return (
              <g key={i} transform={`rotate(${angle})`}>
                <path
                  d={`M -${width / 2},26 L 0,${26 + length} L ${width / 2},26 Z`}
                  fill="#F6B40E"
                  stroke="#85340A"
                  strokeWidth="1"
                />
              </g>
            )
          })}
          {/* Face do sol */}
          <circle cx="-8" cy="-8" r="2" fill="#85340A" />
          <circle cx="8" cy="-8" r="2" fill="#85340A" />
          <path
            d="M -8,2 Q 0,8 8,2"
            stroke="#85340A"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </g>
    </svg>
  )
}
