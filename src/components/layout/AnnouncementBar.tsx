const ITEMS = [
  "Authenticated by hand",
  "Free shipping on orders over $250",
  "WhatsApp +1 (646) 887 4540",
  "Issue 04 · SS '26",
  "Now sourcing: Jordan 1, AP Royal Oak, Cuban links",
];

export default function AnnouncementBar() {
  // Repeat enough times so the marquee always fills the viewport on wide screens
  const track = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-ink text-paper border-b border-ink/30">
      <div className="overflow-hidden">
        <div className="marquee-track py-2 text-[11px] uppercase tracking-[0.22em]">
          {track.map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="px-8">{item}</span>
              <span aria-hidden className="text-brass">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
