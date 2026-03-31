const STRIP_ROWS = [
  { top: "0%", originLeft: true, delay: "0ms" },
  { top: "25%", originLeft: false, delay: "120ms" },
  { top: "50%", originLeft: true, delay: "240ms" },
  { top: "75%", originLeft: false, delay: "360ms" }
] as const;

function GeniusStripHoverBg() {
  return (
    <>
      {STRIP_ROWS.map(({ top, originLeft, delay }) => (
        <div
          key={top}
          className="pointer-events-none absolute left-0 right-0 z-10 h-1/4 overflow-hidden"
          style={{ top }}
          aria-hidden
        >
          <div
            className={`h-full w-full scale-x-0 bg-[#0000dc] transition-transform duration-[350ms] ease-out group-hover:scale-x-100 ${
              originLeft ? "origin-left" : "origin-right"
            }`}
            style={{ transitionDelay: delay }}
          />
        </div>
      ))}
    </>
  );
}

export default GeniusStripHoverBg;
