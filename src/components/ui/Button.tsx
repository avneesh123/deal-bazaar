import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "whatsapp";

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
    "bg-gold text-dark font-semibold hover:bg-gold-light",
  secondary:
    "border border-gold text-gold font-semibold hover:bg-gold hover:text-dark",
  whatsapp:
    "bg-whatsapp text-white font-semibold hover:brightness-110",
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
    "inline-flex items-center justify-center px-6 py-3 rounded-sm text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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
