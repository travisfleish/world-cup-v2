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
            <div className="grid gap-4 md:auto-rows-fr md:grid-cols-3">
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
