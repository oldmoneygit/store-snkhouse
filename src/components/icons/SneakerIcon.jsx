const SneakerIcon = ({ className = "w-8 h-8", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 17L6 13L8 15L11 11L14 13L17 9L20 12V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12L17 9L14 13L11 11L8 15L6 13L3 17"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      <ellipse
        cx="7"
        cy="16"
        rx="1.5"
        ry="1.5"
        fill="black"
        opacity="0.4"
      />
      <path
        d="M3 17C3 17 4 16 5 16C6 16 7 17 8 17C9 17 10 16 11 16C12 16 13 17 14 17C15 17 16 16 17 16C18 16 19 17 20 17"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

export default SneakerIcon
