import type { ReactNode } from "react";
import { Heading, SectionShell, Text } from "@genius-sports/gs-marketing-ui";

type ContactCtaStat = {
  id: string;
  value: string;
  outline: string;
  label: ReactNode;
};

const contactCtaStats: ContactCtaStat[] = [
  { id: "sports-partners", value: "400", outline: "350", label: <>Sports partners</> },
  {
    id: "years-working",
    value: "20",
    outline: "5",
    label: (
      <>
        Years working <span className="whitespace-nowrap">with sports</span>
      </>
    )
  },
  {
    id: "countries-using",
    value: "150",
    outline: "35",
    label: (
      <>
        Countries using <span className="whitespace-nowrap">our tech</span>
      </>
    )
  }
];

const stripeOverlayStyle = {
  backgroundImage:
    "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.28) 0 2px, transparent 2px 14px)"
} as const;

function ContactCtaSection() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-white pb-12 pt-8 text-gs-primary-900 md:pb-20 md:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] opacity-90 lg:block"
        style={stripeOverlayStyle}
      />

      <SectionShell width="default" className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(360px,500px)] lg:gap-10">
          <div className="flex flex-col items-center justify-center gap-5 py-2 text-center md:gap-6 md:py-4">
            <div className="space-y-5">
              <Heading
                level="h2"
                className="mx-auto max-w-[12ch] text-center !text-gs-primary-900 !text-[clamp(1.85rem,8vw,4rem)] !leading-[1.08] !tracking-[-0.02em] sm:max-w-none sm:whitespace-nowrap"
              >
                Get the ball rolling
              </Heading>
              <Text
                variant="lead"
                className="mx-auto max-w-[32ch] text-center !text-base !leading-relaxed text-gs-primary-900/80 sm:max-w-[40ch] sm:!text-[1.125rem]"
              >
                Tell us a bit about yourself and how we can help, whether you are an agency, a
                brand, or beyond.
              </Text>
            </div>

            <dl className="mt-12 hidden w-full gap-4 sm:grid-cols-3 sm:gap-5 md:mt-16 md:grid">
              {contactCtaStats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center">
                  <dt className="relative inline-flex h-[80px] items-center justify-center md:h-[92px]">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-[-4px] z-0 h-[20%] w-full -translate-x-1/2 overflow-hidden text-center font-heading text-5xl leading-none tracking-[-0.02em] text-transparent md:top-[-6px] md:h-[22%] md:text-6xl"
                      style={{ WebkitTextStroke: "1.5px rgba(11, 42, 83, 0.35)" }}
                    >
                      <span className="block">{stat.outline}</span>
                    </span>
                    <span className="relative z-10 font-heading text-4xl leading-none tracking-[-0.02em] md:text-5xl">
                      {stat.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[-12px] left-1/2 z-0 h-[28%] w-full -translate-x-1/2 overflow-hidden text-center font-heading text-5xl leading-none tracking-[-0.02em] text-transparent md:bottom-[-14px] md:h-[30%] md:text-6xl"
                      style={{ WebkitTextStroke: "1.5px rgba(11, 42, 83, 0.35)" }}
                    >
                      <span className="block -translate-y-[72%]">{stat.outline}</span>
                    </span>
                  </dt>
                  <dd className="mt-2 max-w-[14ch] text-center text-sm leading-snug text-gs-primary-900/70 md:text-base">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-[46rem] overflow-hidden rounded-2xl bg-white p-3 shadow-[0_20px_45px_rgba(0,0,0,0.22)] md:p-6 lg:mx-0 lg:max-w-none">
            <iframe
              title="Contact Genius Sports"
              src="https://digital.geniussports.com/l/822433/2026-04-01/tzm3tn"
              className="h-[820px] w-full sm:h-[760px] md:h-[560px] lg:h-[640px] xl:h-[620px] 2xl:h-[620px]"
              width="100%"
              height="820"
              frameBorder="0"
              allowTransparency={true}
              style={{ border: 0 }}
            />
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export default ContactCtaSection;
