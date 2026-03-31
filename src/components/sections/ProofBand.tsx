import { Reveal } from "../motion/MotionPrimitives";

type ProofBandProps = {
  body: string;
  chart: {
    title: string;
    subtitle: string;
    bars: {
      value: number;
      label: string;
      color: string;
    }[];
    footnote: string;
  };
};

function ProofBand({ body, chart }: ProofBandProps) {
  void body;
  void chart;

  return (
    <Reveal
      as="section"
      id="proof"
      className="relative w-screen max-w-none [margin-left:calc(50%-50vw)] scroll-mt-24 overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-10 md:py-16">
        <div className="rounded-2xl border border-slate-200/70 bg-[var(--color-lightGrey)] p-5 md:p-8">
          <div className="grid items-start gap-6 md:grid-cols-3 md:gap-0">
            <div className="flex justify-start md:self-stretch md:items-center md:pr-6">
              <img
                src="/genius-assets/media-science-logo.png"
                alt="MediaScience"
                className="h-auto w-full max-w-[255px]"
              />
            </div>

            <div className="md:border-l md:border-slate-300 md:px-6">
              <p className="text-[1.3rem] font-medium leading-[1.12] tracking-tight text-slate-900 md:text-[2.1rem]">
                <span className="text-[#8DB12D]">Surprise</span>, intensity, and{" "}
                <span className="text-[#8DB12D]">game outcome</span> meaningfully influence memory and ad effectiveness during live sports
                viewing
              </p>
            </div>

            <div className="md:pl-6">
              <p className="text-[1.3rem] font-medium leading-[1.12] tracking-tight text-slate-900 md:text-[2.1rem]">
                Brand recall was <span className="text-[#8DB12D]">2x higher</span> following moments of &lsquo;surprise&rsquo; compared
                with &nbsp;&lsquo;expected&rsquo; moments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default ProofBand;
