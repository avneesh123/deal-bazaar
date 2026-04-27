const BRANDS = [
  "Nike",
  "Jordan",
  "Adidas",
  "New Balance",
  "Yeezy",
  "Cartier",
  "Audemars Piguet",
  "Rolex",
  "Tiffany & Co.",
  "Van Cleef",
  "Asics",
  "Off-White",
  "Bvlgari",
];

export default function BrandMarquee() {
  // Two copies side-by-side give a seamless -50% loop
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className="relative bg-paper-deep text-ink py-10 md:py-14 overflow-hidden border-y border-ink/15">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 mb-6 flex items-end justify-between text-[10px] uppercase tracking-[0.32em] text-ink/55">
        <span className="numeral">— Houses we authenticate</span>
        <span>13 of 40+</span>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track items-center" style={{ animationDuration: "60s" }}>
          {track.map((brand, i) => (
            <span
              key={i}
              className="flex items-center shrink-0 px-10 md:px-16"
            >
              <span className="font-serif display-italic text-[clamp(2.5rem,7vw,6.5rem)] leading-none whitespace-nowrap">
                {brand}
              </span>
              <span aria-hidden className="text-brass-light ml-10 md:ml-16 text-2xl">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
