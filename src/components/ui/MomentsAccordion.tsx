import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "../motion/MotionPrimitives";

type MomentDetails = {
  signal: string;
  description: string;
};

type MomentsAccordionProps = {
  labels: string[];
  detailsByLabel: Record<string, MomentDetails>;
};

const minorTitleCaseWords = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to"]);

function toTitleCase(value: string) {
  const words = value.toLowerCase().split(/\s+/);
  let wordIndex = 0;

  return words
    .map((word) => {
      const isHyphenatedWord = word.includes("-");
      return (
      word
        .split(/([/:-])/)
        .map((part) => {
          if (!part || /[/:-]/.test(part)) return part;
          const isFirstWord = wordIndex === 0;
          wordIndex += 1;
          if (!isHyphenatedWord && !isFirstWord && minorTitleCaseWords.has(part)) return part;
          return `${part[0].toUpperCase()}${part.slice(1)}`;
        })
        .join("")
      );
    })
    .join(" ");
}

function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  const iconFillClass = isOpen ? "text-[var(--color-lightGrey)]" : "text-[#18C971]";
  const iconStroke = isOpen ? "#0d1226" : "#ffffff";

  return (
    <span className="block h-6 w-6" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <rect width="24" height="24" rx="12" fill="currentColor" className={iconFillClass} />
        <path d="M7.5 12h9" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" />
        {!isOpen ? <path d="M12 7.5v9" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" /> : null}
      </svg>
    </span>
  );
}

function MomentsAccordion({ labels, detailsByLabel }: MomentsAccordionProps) {
  const reducedMotion = useReducedMotionSafe();
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);
  const [mobileFocusedId, setMobileFocusedId] = useState<string | null>(labels[0] ?? null);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [openIdsByColumn, setOpenIdsByColumn] = useState<Record<number, string | null>>({
    0: null,
    1: null
  });
  const midpoint = Math.ceil(labels.length / 2);
  const labelColumns = [labels.slice(0, midpoint), labels.slice(midpoint)];
  const activeMobileIndex = mobileActiveId ? labels.indexOf(mobileActiveId) : -1;
  const focusedMobileIndex = mobileFocusedId ? labels.indexOf(mobileFocusedId) : -1;

  useEffect(() => {
    if (!labels.length) {
      setMobileActiveId(null);
      setMobileFocusedId(null);
      return;
    }

    if (mobileActiveId && !labels.includes(mobileActiveId)) {
      setMobileActiveId(null);
    }

    if (!mobileFocusedId || !labels.includes(mobileFocusedId)) {
      setMobileFocusedId(labels[0]);
    }
  }, [labels, mobileActiveId, mobileFocusedId]);

  const focusMobileMoment = (label: string, behavior: ScrollBehavior = "smooth") => {
    setMobileFocusedId(label);

    const carouselNode = mobileCarouselRef.current;
    const buttonNode = mobileButtonRefs.current[label];
    if (!carouselNode || !buttonNode) return;

    buttonNode.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest"
    });
  };

  const moveActiveMoment = (direction: "left" | "right") => {
    if (!labels.length) return;
    if (focusedMobileIndex === -1) {
      focusMobileMoment(labels[0]);
      return;
    }

    const currentIndex = focusedMobileIndex;
    const nextIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(labels.length - 1, currentIndex + 1);
    const nextLabel = labels[nextIndex];
    if (!nextLabel) return;

    focusMobileMoment(nextLabel);
    if (mobileActiveId) {
      setMobileActiveId(nextLabel);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => moveActiveMoment("left")}
            disabled={focusedMobileIndex <= 0}
            aria-label="Scroll moments left"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={() => moveActiveMoment("right")}
            disabled={focusedMobileIndex === -1 || focusedMobileIndex >= labels.length - 1}
            aria-label="Scroll moments right"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              →
            </span>
          </button>
        </div>
        <p className="text-center text-sm font-medium tabular-nums text-slate-600">
          {`${focusedMobileIndex >= 0 ? focusedMobileIndex + 1 : 0}/${labels.length}`}
        </p>
        <div
          ref={mobileCarouselRef}
          className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-2 px-2">
            {labels.map((label) => {
              const isActive = mobileActiveId === label;
              return (
                <button
                  key={label}
                  type="button"
                  ref={(node) => {
                    mobileButtonRefs.current[label] = node;
                  }}
                  onClick={() => {
                    if (mobileActiveId === label) {
                      setMobileActiveId(null);
                      focusMobileMoment(label);
                      return;
                    }
                    setMobileActiveId(label);
                    focusMobileMoment(label);
                  }}
                  className={`w-[min(calc(100vw-5rem),21rem)] shrink-0 snap-center overflow-hidden rounded-lg border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-[#1D26FF] bg-[#1D26FF] text-white shadow-[0_10px_24px_rgba(29,38,255,0.28)]"
                      : "border-slate-200 bg-white text-slate-900"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="flex items-center gap-3">
                    <PlusMinusIcon isOpen={isActive} />
                    <span className="font-heading text-base font-book leading-6 break-words">
                      {toTitleCase(label)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {mobileActiveId ? (
            <motion.div
              key={mobileActiveId}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{
                duration: reducedMotion ? 0.12 : 0.2,
                ease: "easeOut"
              }}
              className="overflow-hidden rounded-lg border border-[var(--color-lightGrey)] bg-white"
            >
              {(() => {
                const details = detailsByLabel[mobileActiveId] ?? {
                  signal: "Moment signal details for this selection.",
                  description:
                    "Moment description placeholder explaining how this in-game event connects your message to fan emotion."
                };

                return (
                  <div className="space-y-2 px-5 pb-4 pt-3 text-left">
                    <p className="text-sm text-slate-900">
                      <span className="font-medium text-slate-700">Signal: </span>
                      {details.signal}
                    </p>
                    <p className="text-sm text-slate-900">
                      <span className="font-medium text-slate-700">Description: </span>
                      {details.description}
                    </p>
                  </div>
                );
              })()}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="hidden flex-col gap-4 md:flex md:flex-row md:items-start md:gap-8">
        {labelColumns.map((columnLabels, columnIndex) => (
          <div key={`column-${columnIndex}`} className="mt-0 flex w-full flex-col divide-y divide-[var(--color-lightGrey)] overflow-hidden rounded-lg bg-white">
            {columnLabels.map((label, index) => {
              const isOpen = openIdsByColumn[columnIndex] === label;
              const panelId = `moment-panel-${columnIndex}-${index}`;
              const details = detailsByLabel[label] ?? {
                signal: "Moment signal details for this selection.",
                description:
                  "Moment description placeholder explaining how this in-game event connects your message to fan emotion."
              };

              return (
                <div
                  key={label}
                  className="overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIdsByColumn((current) => ({
                        ...current,
                        [columnIndex]: current[columnIndex] === label ? null : label
                      }))
                    }
                    className="flex w-full flex-col bg-white px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80"
                  >
                    <span className="flex items-center gap-3">
                      <PlusMinusIcon isOpen={isOpen} />
                      <h3 className="m-0 font-heading text-left text-base font-book leading-6 text-slate-900">
                        {toTitleCase(label)}
                      </h3>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        key={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reducedMotion ? 0.12 : 0.22,
                          ease: "easeOut"
                        }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="mx-auto max-w-3xl space-y-2 px-6 pb-4 pt-3 text-left">
                          <p className="text-base text-slate-900">
                            <span className="font-medium text-slate-700">Signal: </span>
                            {details.signal}
                          </p>
                          <p className="text-base text-slate-900">
                            <span className="font-medium text-slate-700">Description: </span>
                            {details.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default MomentsAccordion;
