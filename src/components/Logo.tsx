export function Logo({ size = 20 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-[10px]"
      style={{
        width: size + 14,
        height: size + 14,
        background: "linear-gradient(140deg,#5aa0f0,#2456a8)",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M16 8 A5.6 5.6 0 1 0 16 16" />
        <circle cx="16.2" cy="12" r="2.3" fill="#fff" stroke="none" />
      </svg>
    </span>
  );
}
