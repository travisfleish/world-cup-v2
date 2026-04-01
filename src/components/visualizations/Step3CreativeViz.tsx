import type { MarchMadnessMomentsContent } from "../../content/marchMadnessMoments";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "../motion/MotionPrimitives";
import { MarchMadnessBracket } from "./VCU";

type Step3CreativeVizProps = {
  data: MarchMadnessMomentsContent["creativeAndChannel"]["creativeViz"];
};

function Step3CreativeViz({ data }: Step3CreativeVizProps) {
  const reducedMotion = useReducedMotionSafe();
  const vizRef = useRef<HTMLDivElement | null>(null);
  const hasEnteredViewport = useInView(vizRef, { once: true, amount: 0.2 });
  const connectorDrawDurationDesktop = reducedMotion ? 0 : 1.2;
  const connectorStartDelayDesktop = reducedMotion ? 0 : 0.25;
  const singleCardFadeDelayDesktop = reducedMotion ? 0 : 0.55;
  const singleCardFadeDelayMobile = reducedMotion ? 0 : 0.42;
  const argentinaCreativeSrc = "/comfystay-argentina.png";
  const [isBracketComplete, setIsBracketComplete] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(reducedMotion);
  const [bracketAnimationState, setBracketAnimationState] = useState(reducedMotion ? 3 : 0);
  const handleBracketComplete = useCallback(() => {
    if (typeof window === "undefined" || reducedMotion) {
      setIsBracketComplete(true);
      return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    const breathMs = isMobileViewport ? 220 : 320;
    window.setTimeout(() => setIsBracketComplete(true), breathMs);
  }, [reducedMotion]);
  const revealCreativeFlow = isMobileViewport
    ? true
    : reducedMotion
      ? true
      : isBracketComplete;
  const showArgentinaCreative = reducedMotion ? true : bracketAnimationState >= 2;
  const showMexicoCreative = reducedMotion ? true : isBracketComplete;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (hasEnteredViewport && !hasStartedAnimation) {
      setHasStartedAnimation(true);
    }
  }, [hasEnteredViewport, hasStartedAnimation]);

  return (
    <motion.div
      ref={vizRef}
      className="mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.45, ease: "easeOut" }}
    >
      <div className="w-full px-0 py-0">
        <div className="mx-auto hidden max-w-3xl text-center md:block">
          <p className="font-heading text-lg font-medium text-slate-900 md:text-2xl">{data.triggerTitle}</p>
          <p className="mt-3 text-lg text-slate-700 md:text-xl">{data.exampleEvent}</p>
        </div>
        <div className="relative mt-6 hidden overflow-hidden md:block">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(58% 74% at 50% 40%, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 42%, rgba(16,185,129,0.015) 68%, rgba(16,185,129,0) 100%)",
              filter: "blur(18px)"
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 w-[52%]"
            aria-hidden="true"
            initial={false}
            animate={revealCreativeFlow ? { opacity: 1, x: 0, scaleX: 1 } : { opacity: 0, x: 18, scaleX: 0.9 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.55, ease: "easeOut" }}
            style={{ originX: 1 }}
          >
            <img
              src="/genius-assets/green-lines.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-right opacity-[0.75]"
              style={{
                filter: "saturate(0.82) blur(1.6px)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.46) 62%, rgba(0,0,0,0.74) 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.46) 62%, rgba(0,0,0,0.74) 100%)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-50/12 to-slate-50/88" />
          </motion.div>
          <div className="relative z-10 h-[400px] min-w-[860px] md:min-w-0">
            <MarchMadnessBracket
              onAnimationComplete={handleBracketComplete}
              onAnimationStateChange={setBracketAnimationState}
              startAnimation={!isMobileViewport && hasStartedAnimation}
            />
          </div>
        </div>

        {!revealCreativeFlow && (
          <div className="mt-0 md:hidden -mt-px h-[34rem]" aria-hidden="true" />
        )}
        {revealCreativeFlow && (
          <div className="mt-0 -mt-px md:hidden">
            <div className="flex flex-col items-center px-1 pt-2 sm:px-0">
              <motion.div
                className="mt-3 grid w-full max-w-[42rem] grid-cols-1 gap-5"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0.1 : 0.3,
                  ease: "easeOut",
                  delay: singleCardFadeDelayMobile
                }}
              >
                <motion.div
                  className="mx-auto flex w-full max-w-[680px] flex-col items-center"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: "easeOut", delay: reducedMotion ? 0 : 0.08 }}
                >
                  <p className="text-center font-heading text-sm font-medium text-slate-900 md:text-base">
                    Argentina Advances:
                  </p>
                  <img
                    src={argentinaCreativeSrc}
                    alt="Comfy Stay Argentina celebration creative"
                    className="mt-2 block h-auto w-full rounded-xl"
                    loading="lazy"
                    draggable={false}
                  />
                </motion.div>
                <motion.div
                  className="mx-auto flex w-full max-w-[680px] flex-col items-center"
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.3, ease: "easeOut", delay: reducedMotion ? 0 : 0.45 }}
                >
                  <p className="text-center font-heading text-sm font-medium text-slate-900 md:text-base">
                    Mexico Advances:
                  </p>
                  <img
                    src={data.leftCardImageSrc}
                    alt={data.leftCardTitle}
                    className="mt-2 block h-auto w-full rounded-xl"
                    loading="lazy"
                    draggable={false}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        <div className="mt-0 hidden -mt-px md:block md:min-h-[16rem] lg:min-h-[22rem] xl:min-h-[24rem]">
          <div className="mx-auto flex w-full max-w-[1120px] items-start justify-between gap-8">
            <div className="flex flex-col items-center">
              <motion.div
                className="h-12 w-px bg-amber-400"
                initial={{ scaleY: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
                animate={
                  showArgentinaCreative
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }
                }
                transition={{
                  duration: connectorDrawDurationDesktop,
                  delay: reducedMotion ? 0 : Math.max(0, singleCardFadeDelayDesktop - connectorStartDelayDesktop),
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "top" }}
                aria-hidden="true"
              />
              <motion.div
                className="mt-3 w-full max-w-[520px]"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                animate={showArgentinaCreative ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 10 }}
                transition={{
                  duration: reducedMotion ? 0.1 : 0.35,
                  ease: "easeOut",
                  delay: reducedMotion ? 0 : singleCardFadeDelayDesktop
                }}
              >
                <img
                  src={argentinaCreativeSrc}
                  alt="Comfy Stay Argentina celebration creative"
                  className="block h-auto w-full"
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                className="h-12 w-px bg-amber-400"
                initial={{ scaleY: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }}
                animate={
                  showMexicoCreative
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: reducedMotion ? 1 : 0, opacity: reducedMotion ? 1 : 0 }
                }
                transition={{
                  duration: connectorDrawDurationDesktop,
                  delay: reducedMotion
                    ? 0
                    : Math.max(0, singleCardFadeDelayDesktop + 0.18 - connectorStartDelayDesktop),
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "top" }}
                aria-hidden="true"
              />
              <motion.div
                className="mt-3 w-full max-w-[520px]"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                animate={showMexicoCreative ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 10 }}
                transition={{
                  duration: reducedMotion ? 0.1 : 0.35,
                  ease: "easeOut",
                  delay: reducedMotion ? 0 : singleCardFadeDelayDesktop + 0.18
                }}
              >
                <img
                  src={data.leftCardImageSrc}
                  alt={data.leftCardTitle}
                  className="block h-auto w-full"
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Step3CreativeViz;
