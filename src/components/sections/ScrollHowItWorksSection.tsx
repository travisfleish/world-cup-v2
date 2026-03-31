import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "../motion/MotionPrimitives";

const steps: { title: string; body: string }[] = [
  {
    title: "Step 1",
    body: "Always-on official data from NCAA and 400+ partners. The source of truth for live game state."
  },
  {
    title: "Step 2",
    body: "Contextual intelligence plus the Genius Fan Graph: the right fans, for this exact moment, assembled in real time."
  },
  {
    title: "Step 3",
    body: "Pre-configured Deal IDs fire automatically. Activate through your preferred DSP with your existing workflow."
  },
  {
    title: "Step 4",
    body: "Creative runs across curated premium inventory on the biggest sports and entertainment publishers."
  }
];

const DIAGRAM_IMAGE_URL = "/how-it-works/Final-HIW_v2.png";
const DIAGRAM_WIDTH_PX = 11852;
const DIAGRAM_HEIGHT_PX = 3836;
const DIAGRAM_ASPECT = `${DIAGRAM_WIDTH_PX} / ${DIAGRAM_HEIGHT_PX}`;
const STEP_CENTER_X = [0 + 331.96 / 2, 395.23 + 331.96 / 2, 864.51 + 164.47 / 2, 1205.33 + 322.49 / 2];
const LEGACY_DIAGRAM_WIDTH = 1530.14;
const STEP_POSITIONS_PCT = STEP_CENTER_X.map((x) => (x / LEGACY_DIAGRAM_WIDTH) * 100);
const SCROLL_DRIVE_VH = 500;
const STEP_THRESHOLDS = [0, 0.25, 0.5, 0.75, 0.75];
const ENTER_THRESHOLDS: [number, number, number, number] = [0, 0.25, 0.5, 0.75];
const HYSTERESIS = 0.05;
const MOBILE_BREAKPOINT = 768;
const COMPACT_DESKTOP_HEIGHT_PX = 900;
const TRANSITION_MS = 400;

function svgStepToTimelineIndex(svgStepIndex: number): number {
  if (svgStepIndex >= 4) return 3;
  if (svgStepIndex >= 2) return 2;
  return svgStepIndex;
}

function hiwDesktopVizMaxWidthCss(pinTitleOutsideSticky: boolean): string {
  const reserve = pinTitleOutsideSticky ? "21rem" : "27rem";
  return `min(1400px, calc((min(100dvh, 100svh) - ${reserve}) * ${DIAGRAM_WIDTH_PX} / ${DIAGRAM_HEIGHT_PX}))`;
}

export default function ScrollHowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const timelineStepIndexRef = useRef(0);
  const progressBarFromClickRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineStepIndex, setTimelineStepIndex] = useState(0);
  const [maxRevealedStepIndex, setMaxRevealedStepIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompactDesktopHeight, setIsCompactDesktopHeight] = useState(false);
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-height: ${COMPACT_DESKTOP_HEIGHT_PX}px) and (min-width: ${MOBILE_BREAKPOINT}px)`
    );
    const update = () => setIsCompactDesktopHeight(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      setTimelineStepIndex(3);
      timelineStepIndexRef.current = 3;
      setMaxRevealedStepIndex(3);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const updateFromScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollRange = sectionHeight - viewportHeight;
      const progress = scrollRange > 0 ? (window.scrollY - sectionTop) / scrollRange : 1;
      const progressClamped = Math.max(0, Math.min(1, progress));
      const progressSafe = Number.isFinite(progressClamped) ? progressClamped : 0;

      let svgStepIndex = 0;
      for (let i = 0; i <= 4; i += 1) {
        if (progressSafe >= STEP_THRESHOLDS[i]) svgStepIndex = i;
      }
      let newTimelineIndex = Math.max(0, Math.min(3, svgStepToTimelineIndex(svgStepIndex)));

      const current = timelineStepIndexRef.current;
      if (newTimelineIndex < current) {
        const leaveThreshold = ENTER_THRESHOLDS[current] - HYSTERESIS;
        if (progressSafe >= leaveThreshold) newTimelineIndex = current;
      }

      progressBarFromClickRef.current = false;
      setScrollProgress(progressSafe);
      setMaxRevealedStepIndex((prev) => Math.max(prev, newTimelineIndex));
      if (newTimelineIndex !== current) {
        timelineStepIndexRef.current = newTimelineIndex;
        setTimelineStepIndex(newTimelineIndex);
      }
    };

    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateFromScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const syncRaf = requestAnimationFrame(() => updateFromScroll());
    return () => {
      cancelAnimationFrame(syncRaf);
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [reducedMotion]);

  const activeStepIndex = Math.max(0, Math.min(3, timelineStepIndex));
  const useStickyScroll = !reducedMotion && !isMobile;
  const pinTitleOutsideSticky = useStickyScroll && isCompactDesktopHeight;
  const trackWidthPct = STEP_POSITIONS_PCT[3] - STEP_POSITIONS_PCT[0];
  const progressLineWidthPct = progressBarFromClickRef.current
    ? STEP_POSITIONS_PCT[activeStepIndex] - STEP_POSITIONS_PCT[0]
    : trackWidthPct * scrollProgress;

  return (
    <section
      id="genius-how-it-works"
      className="scroll-mt-24 relative left-1/2 w-screen -translate-x-1/2 bg-[var(--color-navy)] text-white pt-8 pb-12 md:pt-12 md:pb-16"
      aria-labelledby="genius-how-it-works-heading"
    >
      <div
        ref={sectionRef}
        style={useStickyScroll ? { minHeight: `${SCROLL_DRIVE_VH}vh` } : undefined}
      >
        {pinTitleOutsideSticky && (
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 pt-14 pb-3 md:pt-16 md:pb-4 flex flex-col items-center">
            <h2 id="genius-how-it-works-heading" className="section-title section-title-lg !text-white text-center">
              How it works
            </h2>
          </div>
        )}
        <div
          className={
            useStickyScroll
              ? pinTitleOutsideSticky
                ? "sticky top-0 min-h-screen flex flex-col items-center justify-center mx-auto w-full max-w-6xl py-5 md:py-6 px-4 sm:px-6 md:px-8"
                : "sticky top-0 min-h-screen flex flex-col items-center mx-auto w-full max-w-6xl pt-14 pb-8 md:pt-20 md:pb-12 [@media(max-height:900px)]:md:pt-14 [@media(max-height:900px)]:md:pb-8 px-4 sm:px-6 md:px-8"
              : "mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8"
          }
        >
          {!pinTitleOutsideSticky && (
            <h2
              id="genius-how-it-works-heading"
              className="section-title section-title-lg !text-white mb-6 md:mb-10 [@media(max-height:900px)]:md:mb-6 text-center"
            >
              How it works
            </h2>
          )}

          <div
            className={`mx-auto w-full flex flex-col min-h-0 ${pinTitleOutsideSticky ? "justify-center flex-none w-full" : "flex-1 justify-start mt-4 md:mt-6 [@media(max-height:900px)]:md:mt-4"}`}
            style={{ maxWidth: isMobile ? "100%" : hiwDesktopVizMaxWidthCss(pinTitleOutsideSticky) }}
          >
            <div
              className="how-it-works-svg-container w-full [&_img]:block [&_img]:w-full [&_img]:h-auto"
              style={{ aspectRatio: DIAGRAM_ASPECT, minHeight: "180px" }}
            >
              <img
                src={DIAGRAM_IMAGE_URL}
                alt="How Genius Moments works: official data, fan graph, Deal IDs, and inventory across four steps."
                width={DIAGRAM_WIDTH_PX}
                height={DIAGRAM_HEIGHT_PX}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mt-6 md:hidden flex flex-col items-center text-center">
              {steps.map((step, index) => (
                <div key={step.title} className="mb-8 last:mb-0">
                  <h3 className="mobile-card-title font-medium text-white mb-2">{step.title}</h3>
                  <p className="mobile-card-body text-white/85 max-w-[340px] mx-auto">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 md:mt-4 w-full mx-auto hidden md:block shrink-0" role="tablist" aria-label="How it works steps">
              <div className="relative w-full" style={{ minHeight: "20px" }}>
                <div
                  className="absolute top-[9px] left-0 h-0.5 bg-white/20 pointer-events-none"
                  style={{ left: `${STEP_POSITIONS_PCT[0]}%`, width: `${trackWidthPct}%` }}
                  aria-hidden
                />
                <div
                  className="absolute top-[9px] left-0 h-0.5 bg-[var(--color-blue)] pointer-events-none transition-[width] ease-out"
                  style={{
                    left: `${STEP_POSITIONS_PCT[0]}%`,
                    width: `${progressLineWidthPct}%`,
                    transitionDuration: reducedMotion ? "0ms" : "80ms"
                  }}
                  aria-hidden
                />
                {[1, 2, 3, 4].map((stepNum) => {
                  const isActive = activeStepIndex === stepNum - 1;
                  const pct = STEP_POSITIONS_PCT[stepNum - 1];
                  return (
                    <button
                      key={stepNum}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Step ${stepNum}`}
                      className={`absolute top-0 z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-[opacity,background-color,border-color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] ${
                        isActive ? "border-[var(--color-blue)] bg-[var(--color-blue)]" : "border-white/45 bg-transparent"
                      }`}
                      style={{ left: `${pct}%`, transform: "translateX(-50%)", opacity: 1 }}
                      onClick={() => {
                        const index = stepNum - 1;
                        progressBarFromClickRef.current = true;
                        timelineStepIndexRef.current = index;
                        setTimelineStepIndex(index);
                        setMaxRevealedStepIndex((prev) => Math.max(prev, index));
                      }}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-navy)]" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 relative w-full text-white/80 text-center" style={{ minHeight: "1.25rem" }}>
                {[1, 2, 3, 4].map((stepNum) => {
                  const isActive = activeStepIndex === stepNum - 1;
                  return (
                    <span
                      key={stepNum}
                      className="absolute transition-opacity duration-300 text-sm md:text-base"
                      style={{
                        left: `${STEP_POSITIONS_PCT[stepNum - 1]}%`,
                        transform: "translateX(-50%)",
                        opacity: isActive ? 1 : 0.8
                      }}
                    >
                      Step {stepNum}
                    </span>
                  );
                })}
              </div>

              <div
                className="mt-3 md:mt-4 relative w-full text-sm md:text-base text-left text-white/90 min-h-[7.5rem] md:min-h-[10rem] [@media(max-height:900px)]:md:min-h-[9rem] shrink-0 pb-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {steps.map((step, i) => (
                  <p
                    key={step.title}
                    className={`absolute top-0 how-it-works-step-copy text-left transition-opacity ease-out w-full max-w-full md:w-[max(22%,140px)] md:max-w-[280px] ${
                      maxRevealedStepIndex >= i ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    style={{
                      ["--step-pct" as string]: `${STEP_POSITIONS_PCT[i]}%`,
                      transitionDuration: reducedMotion ? "0ms" : `${TRANSITION_MS}ms`
                    }}
                    aria-hidden={maxRevealedStepIndex < i}
                  >
                    {step.body}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
