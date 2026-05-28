export default function InstagramLogo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <h1
      className={`font-logo text-[${size}px] leading-none tracking-tight ${className}`}
      style={{ fontFamily: "'Grand Hotel', cursive", fontSize: size }}
    >
      InstaClone
    </h1>
  );
}
