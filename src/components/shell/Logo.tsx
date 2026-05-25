type LogoProps = {
  /** размер знака в px */
  size?: number;
  className?: string;
  /** только знак, без подписи */
  markOnly?: boolean;
};

/**
 * Знак id.140dev: уголки регистрации + три штриха «1 · 4 · 0».
 * Ноль — кислотная точка, как акцент на сайте.
 */
export function Logo({ size = 22, className = "", markOnly = false }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-bone ${className}`}
      aria-hidden={markOnly ? undefined : true}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <path d="M0 7V0H7" stroke="currentColor" strokeWidth="1" />
        <path d="M24 17V24H17" stroke="currentColor" strokeWidth="1" />
        <rect x="3.5" y="12" width="2.5" height="8" fill="currentColor" />
        <rect x="9" y="5.5" width="2.5" height="14.5" fill="currentColor" />
        <circle cx="17.5" cy="16" r="2.5" fill="var(--acid)" />
      </svg>
      {!markOnly && (
        <span className="t-meta leading-none tracking-[0.28em]">id.140dev</span>
      )}
    </span>
  );
}
