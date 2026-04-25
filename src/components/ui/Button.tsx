import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-oxblood",
  secondary:
    "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost:
    "text-ink hover:text-oxblood underline-offset-4 hover:underline",
  whatsapp:
    "bg-whatsapp text-white hover:brightness-110",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-4 text-[11px] uppercase tracking-[0.28em] transition-all duration-300 cursor-pointer";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
