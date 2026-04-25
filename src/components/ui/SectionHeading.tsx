interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  number?: string;
  eyebrow?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  number = "01",
  eyebrow,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="numeral text-[10px] tracking-[0.3em] text-ink-soft">
          § {number}
        </span>
        {eyebrow && (
          <span className="text-[10px] uppercase tracking-[0.32em] text-ink-soft">
            {eyebrow}
          </span>
        )}
        <span className="flex-1 h-px bg-ink/15" />
      </div>
      <h2 className="font-serif display-soft text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-soft text-[15px] md:text-base max-w-xl mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
