export default function BiohazardIcon({ size = 120, className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.9">
        <path
          d="M50 30 C35 30, 25 45, 30 55 C20 40, 25 20, 50 15 C75 20, 80 40, 70 55 C75 45, 65 30, 50 30Z"
          fill="currentColor"
        />
        <path
          d="M30 60 C25 45, 35 35, 45 38 C30 35, 20 50, 25 65 C30 80, 50 85, 60 75 C50 82, 35 75, 30 60Z"
          fill="currentColor"
        />
        <path
          d="M70 60 C75 45, 65 35, 55 38 C70 35, 80 50, 75 65 C70 80, 50 85, 40 75 C50 82, 65 75, 70 60Z"
          fill="currentColor"
        />
        <circle cx="50" cy="52" r="6" fill="currentColor" />
        <circle cx="50" cy="52" r="3" fill="#0a0a0a" />
      </g>
    </svg>
  );
}
