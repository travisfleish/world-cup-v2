import { motion } from "framer-motion";
import { type MouseEvent, useCallback, useEffect, useState } from "react";
import { useReducedMotionSafe } from "../motion/MotionPrimitives";
import GeniusStripHoverBg from "../ui/GeniusStripHoverBg";
type HeroSectionProps = {
  kicker: string;
  headlineLines?: string[];
  subhead: string;
  ctaButtonText?: string;
  ctaHref?: string;
  titleLines: string[];
  stats: {
    value: string;
    label: string;
    description: string;
    size?: "sm" | "md" | "lg";
  }[];
  sideBarStat: {
    value: string;
    label: string;
    description: string;
  };
};

const DESKTOP_TILE_CLASSES: Record<"sm" | "md" | "lg", string> = {
  sm: "col-span-8 min-h-[5.9rem] rounded-2xl p-3 md:col-span-1 md:min-h-[8.5rem] md:p-5 lg:col-span-3 lg:row-span-1 lg:min-h-0 lg:p-7",
  md: "col-span-8 min-h-[6.7rem] rounded-2xl p-3 md:col-span-1 md:min-h-[10.75rem] md:p-5 lg:col-span-4 lg:row-span-2 lg:min-h-0 lg:p-7",
  lg: "col-span-8 min-h-[5.7rem] rounded-2xl p-3 md:min-h-[7.75rem] md:p-5 lg:col-span-8 lg:row-span-1 lg:min-h-0 lg:p-7"
};

function renderTitleWithWorldCupAccent(line: string) {
  return line.split(/(World|Cup)/g).map((segment, index) =>
    segment === "World" || segment === "Cup" ? (
      <span key={`world-cup-${index}`} className="text-[#0014ff]">
        {segment}
      </span>
    ) : (
      <span key={`segment-${index}`}>{segment}</span>
    )
  );
}

function HeroSection({
  kicker,
  headlineLines,
  subhead,
  ctaButtonText,
  ctaHref,
  titleLines,
  stats,
  sideBarStat
}: HeroSectionProps) {
  const hasHeadlineLines = Boolean(headlineLines?.length);
  const reducedMotion = useReducedMotionSafe();
  const [isLoaded, setIsLoaded] = useState(false);
  const [rollVersions, setRollVersions] = useState<Record<string, number>>({});
  const [hideDesktopStatPanel, setHideDesktopStatPanel] = useState(false);
  const sideBarRollId = `${sideBarStat.value}-${sideBarStat.label}-sidebar`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const updateDesktopPanelVisibility = useCallback(() => {
    // Keep the desktop panel visible after scaling adjustments.
    setHideDesktopStatPanel(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    const measureAfterLayout = () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          updateDesktopPanelVisibility();
        });
      });
    };

    // Keep panel visible by default, then hide only if text wraps beyond 5 lines.
    setHideDesktopStatPanel(false);
    measureAfterLayout();
    window.addEventListener("resize", measureAfterLayout);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measureAfterLayout);
    };
  }, [updateDesktopPanelVisibility]);

  const triggerRoll = (tileId: string) => {
    setRollVersions((previous) => ({
      ...previous,
      [tileId]: (previous[tileId] ?? 0) + 1
    }));
  };

  const smoothScrollToAnchor = (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined" || !ctaHref || !ctaHref.startsWith("#")) return;

    const target = document.querySelector(ctaHref);
    if (!target) return;

    event.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    if (reducedMotion) {
      window.scrollTo({ top: targetTop });
      return;
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const durationMs = 760;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo({
        top: startTop + distance * easedProgress
      });

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[60%] w-[42%] lg:block" aria-hidden>
        <img
          src="/genius-assets/green-lines.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right opacity-75 lg:opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-4 pt-8 sm:px-6 md:px-9 md:pb-6 md:pt-10 lg:max-h-[min(90vh,820px)] lg:px-12 lg:pt-12 lg:pb-6">
        <div className="relative grid min-h-0 items-center gap-7 sm:gap-8 lg:grid-cols-[45%_55%] lg:items-center lg:gap-0">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-[45%] hidden w-px -translate-x-1/2 bg-[#0A1330]/12 lg:block"
          />
          <motion.div
            className="flex min-h-0 flex-col items-center justify-center pr-0 md:min-h-[18rem] md:pr-6 lg:min-h-[22rem] lg:pr-14"
            initial={{ opacity: reducedMotion ? 1 : 0 }}
            animate={{ opacity: isLoaded || reducedMotion ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            <div className="mx-auto w-full max-w-[60ch] text-center lg:mx-0 lg:text-left">
              <span className="mb-1 inline-block whitespace-nowrap font-heading font-book text-[12px] leading-[1.35] tracking-[-0.01em] opacity-80 md:mb-0 md:text-[15px] md:leading-[21.75px] md:tracking-[-0.140625px]">
                {kicker}
              </span>
              {hasHeadlineLines ? (
                <p className="mx-auto mt-4 max-w-[24ch] text-[clamp(1.05rem,1.7vw,2rem)] font-medium leading-[1.04] tracking-[-0.01em] text-[#0A1330] lg:mx-0">
                  {(headlineLines ?? []).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ) : null}
              <h1
                className={`-ml-[0.01em] text-[clamp(2.65rem,16vw,4.5rem)] font-[300] leading-[0.96] tracking-[-0.04em] text-[var(--gs-text)] [font-family:ESKlarheitKurrentTRIAL,_system-ui,_-apple-system,_"Segoe_UI",_Roboto,_Helvetica,_Arial,_sans-serif,_"Apple_Color_Emoji",_"Segoe_UI_Emoji"] [font-feature-settings:normal] [font-variation-settings:normal] md:mt-5 md:text-[72px] md:leading-[77.76px] md:tracking-[-2.16px] ${hasHeadlineLines ? "mt-4" : "mt-2 md:mt-3"}`}
              >
                <span className="inline-flex flex-col items-center gap-0 text-center md:flex-row md:items-end md:gap-3 md:whitespace-nowrap lg:flex-col lg:items-start lg:gap-0 lg:text-left lg:whitespace-normal">
                  <span>{renderTitleWithWorldCupAccent(titleLines[0] ?? "")}</span>
                  <span>{renderTitleWithWorldCupAccent(titleLines[1] ?? "")}</span>
                  {titleLines[2] ? <span>{renderTitleWithWorldCupAccent(titleLines[2])}</span> : null}
                </span>
              </h1>
              <p className="mx-auto mt-4 w-full max-w-[54ch] text-[0.98rem] font-normal leading-relaxed text-[#0A1330] md:mt-5 md:max-w-[50ch] md:text-[1.02rem] lg:mx-0 lg:mt-3 lg:max-w-[54ch] lg:text-[1.08rem]">
                {subhead}
              </p>
              {ctaButtonText ? (
                <div className="mt-6 md:mt-7">
                  <a
                    href={ctaHref ?? "#contact-cta"}
                    className="group inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d1226] focus-visible:ring-offset-2"
                    onClick={smoothScrollToAnchor}
                  >
                    <span className="relative cursor-pointer overflow-hidden rounded-full bg-[#0d1226]">
                      <GeniusStripHoverBg />
                      <span className='relative left-0 z-20 inline-flex h-[52px] w-[min(100%,219px)] items-center justify-center rounded-full px-8 text-center text-[16px] font-normal leading-[20px] tracking-[-0.16px] text-white transition-colors duration-300 ease-in-out [font-family:ESKlarheitKurrentTRIAL,_system-ui,_-apple-system,_"Segoe_UI",_Roboto,_Helvetica,_Arial,_sans-serif,_"Apple_Color_Emoji",_"Segoe_UI_Emoji"] [font-feature-settings:normal] [font-variation-settings:normal] md:h-[54.3906px] md:text-[17px] md:leading-[20.4px] md:tracking-[-0.180625px]'>
                        {ctaButtonText}
                      </span>
                    </span>
                  </a>
                </div>
              ) : null}
              <div className="mt-7 grid grid-cols-2 gap-2.5 text-left lg:hidden">
                {[...stats, sideBarStat].map((stat) => (
                  <article
                    key={`${stat.value}-${stat.label}`}
                    className="rounded-xl bg-[#0014ff] p-3 text-white ring-1 ring-white/25"
                  >
                    <p className="text-[1.45rem] font-medium leading-[0.92]">{stat.value}</p>
                    {stat.label ? (
                      <p className="mt-0.5 text-[0.82rem] font-medium leading-tight text-white/95">{stat.label}</p>
                    ) : null}
                    <p className="mt-1.5 text-[0.66rem] leading-snug text-blue-50/90">{stat.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            className={`relative hidden min-h-0 w-full lg:block lg:h-full lg:translate-x-4 lg:pl-10 ${
              hideDesktopStatPanel ? "lg:pointer-events-none lg:invisible" : ""
            }`}
            initial={{ opacity: reducedMotion ? 1 : 0 }}
            animate={{ opacity: isLoaded || reducedMotion ? 1 : 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.32,
              ease: "easeOut",
              delay: reducedMotion ? 0 : 0.32
            }}
          >
            <div className="lg:flex lg:h-full lg:min-h-0 lg:w-full lg:items-center lg:justify-center">
            <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-[#0011e1] lg:aspect-[1] lg:max-h-[min(52vh,420px)] lg:min-h-0 lg:w-full lg:origin-center lg:scale-[0.9] xl:max-h-[min(55vh,480px)]">
              <div className="relative z-10 grid h-full min-h-0 gap-2 p-2 md:gap-3 md:p-3 md:grid-cols-2 md:items-stretch lg:grid-cols-[minmax(0,1fr)_11.5rem] lg:p-4">
              <div className="grid auto-rows-auto grid-cols-8 gap-2 md:gap-3 lg:min-h-0 lg:h-full lg:grid-rows-3">
              {stats.map((stat, index) => {
                const tileSize = stat.size ?? "md";
                const statRollId = `${stat.value}-${stat.label}-${index}`;
                const isFirstStatTile = index === 0;
                const isSecondStatTile = index === 1;
                const isThirdStatTile = index === 2;
                const spanClass =
                  isThirdStatTile
                    ? "col-span-8 min-h-[6.7rem] rounded-2xl p-3 md:col-span-1 md:min-h-[10.75rem] md:p-6 lg:col-span-5 lg:row-span-2 lg:min-h-0 lg:p-8"
                    : tileSize === "lg"
                      ? DESKTOP_TILE_CLASSES.lg
                      : tileSize === "sm"
                        ? DESKTOP_TILE_CLASSES.sm
                        : isSecondStatTile
                          ? "col-span-8 min-h-[6.5rem] rounded-2xl p-3 md:col-span-1 md:min-h-[9.75rem] md:p-5 lg:col-span-3 lg:row-span-2 lg:min-h-0 lg:p-6"
                          : DESKTOP_TILE_CLASSES.md;

                return (
                  <article
                    key={`${stat.value}-${stat.label}`}
                    className={`text-white lg:h-full lg:min-h-0 ${spanClass} ${
                      isThirdStatTile
                        ? "flex flex-col justify-center bg-[#0014ff] ring-1 ring-white/34"
                        : isFirstStatTile
                          ? "flex flex-col justify-center bg-[#0014ff] ring-1 ring-white/30"
                          : isSecondStatTile
                            ? "flex flex-col justify-center bg-[#0014ff] ring-1 ring-white/28"
                            : "bg-[#0014ff] ring-1 ring-white/28"
                    }`}
                    onMouseEnter={() => triggerRoll(statRollId)}
                  >
                    <p
                      className={`font-medium leading-[0.88] ${
                        isThirdStatTile
                          ? "text-[1.95rem] md:text-[3rem] lg:text-[clamp(1.95rem,3.2vw,4.15rem)]"
                          : isFirstStatTile
                            ? "text-[1.8rem] md:text-[2.7rem] lg:text-[clamp(1.8rem,2.85vw,3.4rem)]"
                            : "text-[1.75rem] md:text-[2.6rem] lg:text-[clamp(1.75rem,2.5vw,3.1rem)]"
                      }`}
                    >
                      {/* Slot animation temporarily disabled for alignment check */}
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.92rem] font-medium leading-none text-white/95 md:text-[1.08rem] lg:text-[clamp(0.92rem,1vw,1.32rem)]">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 max-w-[28ch] text-[0.64rem] leading-snug text-blue-50/92 md:mt-3 md:text-xs lg:text-[clamp(0.7rem,0.85vw,1rem)]">
                      {stat.description}
                    </p>
                  </article>
                );
              })}
              </div>
              <aside
                className="flex flex-col overflow-hidden rounded-2xl bg-[#0014ff] text-left text-white ring-1 ring-white/30 md:min-h-[20rem] lg:h-full lg:min-h-0"
                onMouseEnter={() => triggerRoll(sideBarRollId)}
              >
                <div className="shrink-0 min-h-0 border-b border-white/30 p-3 md:p-6 lg:flex lg:basis-[40%] lg:flex-col lg:justify-center lg:p-5">
                  <p className="text-[1.9rem] font-medium leading-[0.88] lg:text-[clamp(1.9rem,2.6vw,3.5rem)]">
                    {/* Slot animation temporarily disabled for alignment check */}
                    {sideBarStat.value}
                  </p>
                  <p className="mt-1 text-[0.95rem] font-medium leading-none text-white/95 md:text-[1.15rem] lg:text-[clamp(0.95rem,1vw,1.35rem)]">
                    {sideBarStat.label}
                  </p>
                  <p className="mt-1.5 text-[0.64rem] leading-snug text-blue-50/92 md:mt-3 md:text-xs lg:text-[clamp(0.7rem,0.85vw,1rem)]">
                    {sideBarStat.description}
                  </p>
                </div>
                <div className="relative hidden w-full min-h-0 flex-1 overflow-hidden md:block">
                  <img
                    src="/fans-vertical.png"
                    alt="Cheering basketball fans"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </aside>
            </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
