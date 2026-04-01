import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Stagger, useReducedMotionSafe } from "../motion/MotionPrimitives";
import GeniusStripeRail from "../ui/GeniusStripeRail";

type AudiencesSectionProps = {
  header: string;
  subtitle?: string;
  popularHeader?: string;
  audienceGroups: {
    title: string;
    description: string;
    audiences: string[];
  }[];
};

function AudiencesSection({
  header,
  subtitle,
  popularHeader,
  audienceGroups
}: AudiencesSectionProps) {
  const reducedMotion = useReducedMotionSafe();
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!audienceGroups.length) {
      setMobileIndex(0);
      return;
    }

    if (mobileIndex > audienceGroups.length - 1) {
      setMobileIndex(audienceGroups.length - 1);
    }
  }, [audienceGroups.length, mobileIndex]);

  const focusMobileCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (!audienceGroups.length) return;

    const nextIndex = Math.max(0, Math.min(index, audienceGroups.length - 1));
    setMobileIndex(nextIndex);

    const carouselNode = mobileCarouselRef.current;
    const cardNode = mobileCardRefs.current[nextIndex];
    if (!carouselNode || !cardNode) return;

    cardNode.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest"
    });
  };

  const moveMobileCard = (direction: "left" | "right") => {
    if (!audienceGroups.length) return;
    const nextIndex = direction === "left" ? mobileIndex - 1 : mobileIndex + 1;
    focusMobileCard(nextIndex);
  };

  return (
    <Reveal id="audiences" as="section" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gs-surface px-6 pb-6 pt-2 md:px-8 md:pb-8 md:pt-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gs-surface via-gs-surface to-transparent" />
          <GeniusStripeRail
            theme="green"
            className="absolute bottom-0 right-0 top-28 hidden lg:block lg:w-[24%] xl:w-[33%]"
            dimmed
          />
        </div>
        <div className="relative z-10">
          <h2 className="section-title">{header}</h2>
          {subtitle ? (
            <p className="mt-4 max-w-2xl font-sans text-base leading-[1.45] tracking-[-0.01125em] text-[var(--gs-text-muted)]">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-3">
            {popularHeader ? <h3 className="mb-4 text-lg font-medium text-slate-900">{popularHeader}</h3> : null}
            <div className="mb-4 flex items-center justify-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => moveMobileCard("left")}
                disabled={mobileIndex <= 0}
                aria-label="Scroll audience cards left"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ←
                </span>
              </button>
              <button
                type="button"
                onClick={() => moveMobileCard("right")}
                disabled={mobileIndex >= audienceGroups.length - 1}
                aria-label="Scroll audience cards right"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </button>
            </div>

            <div
              ref={mobileCarouselRef}
              className="overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden"
            >
              <div className="flex w-max min-w-full snap-x snap-mandatory gap-3 px-1">
                {audienceGroups.map((group, index) => (
                  <motion.div
                    key={`mobile-${group.title}`}
                    ref={(node) => {
                      mobileCardRefs.current[index] = node;
                    }}
                    className="flex h-full w-[min(calc(100vw-5rem),22rem)] shrink-0 snap-center flex-col rounded-brand bg-[var(--color-snow)] p-5"
                    variants={{
                      hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
                      show: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: reducedMotion ? 0.18 : 0.3, ease: "easeOut" }}
                  >
                    <h4 className="m-0 text-base font-medium text-slate-900">{group.title}</h4>
                    <p className="mt-2 text-sm leading-[1.45] text-[var(--gs-text-muted)]">{group.description}</p>
                    <Stagger as="ul" className="mt-4 space-y-2" staggerChildren={0.06}>
                      {group.audiences.map((item) => (
                        <motion.li
                          key={item}
                          className="flex items-start gap-3 text-slate-700"
                          variants={{
                            hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
                            show: { opacity: 1, y: 0 }
                          }}
                          transition={{ duration: reducedMotion ? 0.18 : 0.3, ease: "easeOut" }}
                        >
                          <span
                            className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full bg-accent-500"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </Stagger>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden gap-4 md:grid md:auto-rows-fr md:grid-cols-3">
              {audienceGroups.map((group) => (
                <motion.div
                  key={group.title}
                  className="flex h-full flex-col rounded-brand bg-[var(--color-snow)] p-5"
                  variants={{
                    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: reducedMotion ? 0.18 : 0.3, ease: "easeOut" }}
                >
                  <h4 className="m-0 text-base font-medium text-slate-900">{group.title}</h4>
                  <p className="mt-2 text-sm leading-[1.45] text-[var(--gs-text-muted)]">{group.description}</p>
                  <Stagger as="ul" className="mt-4 space-y-2" staggerChildren={0.06}>
                    {group.audiences.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-3 text-slate-700"
                        variants={{
                          hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
                          show: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: reducedMotion ? 0.18 : 0.3, ease: "easeOut" }}
                      >
                        <span
                          className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full bg-accent-500"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </Stagger>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default AudiencesSection;
