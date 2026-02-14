interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
