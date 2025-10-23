export default function FlagMexico({ className = "w-12 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bandeira do México */}
      <g>
        {/* Faixa verde */}
        <rect x="0" y="0" width="300" height="600" fill="#006847" />
        {/* Faixa branca do meio */}
        <rect x="300" y="0" width="300" height="600" fill="#FFFFFF" />
        {/* Faixa vermelha */}
        <rect x="600" y="0" width="300" height="600" fill="#CE1126" />

        {/* Escudo simplificado no centro */}
        <g transform="translate(450, 300)">
          {/* Águia estilizada */}
          <circle r="50" fill="#8B4513" opacity="0.3" />
          {/* Cacto (representação simplificada) */}
          <rect x="-8" y="20" width="16" height="40" fill="#2D5016" rx="4" />
          {/* Serpente (representação simplificada) */}
          <path
            d="M -30,-10 Q -20,-20 0,-15 Q 20,-20 30,-10"
            stroke="#8B4513"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Corpo da águia */}
          <ellipse cx="0" cy="-10" rx="25" ry="30" fill="#654321" />
          {/* Cabeça */}
          <circle cx="0" cy="-30" r="12" fill="#8B6914" />
          {/* Bico */}
          <path d="M 0,-30 L 10,-32 L 8,-28 Z" fill="#F4C430" />
          {/* Olho */}
          <circle cx="3" cy="-32" r="2" fill="#000" />
          {/* Asas */}
          <ellipse cx="-20" cy="-5" rx="15" ry="25" fill="#654321" transform="rotate(-20 -20 -5)" />
          <ellipse cx="20" cy="-5" rx="15" ry="25" fill="#654321" transform="rotate(20 20 -5)" />
        </g>
      </g>
    </svg>
  )
}
