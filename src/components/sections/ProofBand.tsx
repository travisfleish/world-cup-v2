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
      <div className="mx-auto w-full max-w-6xl px-3 py-1 md:px-10 md:py-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/25 px-4 py-16 md:px-8 md:py-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/proof_bg.png')" }}
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(8, 26, 67, 0.49)" }}
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(6, 23, 63, 0.61) 0%, rgba(10, 32, 79, 0.53) 50%, rgba(6, 23, 63, 0.61) 100%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 grid items-start gap-6 md:grid-cols-3 md:gap-0">
            <div className="flex justify-start md:self-stretch md:items-center md:justify-center">
              <img
                src="/logo_white_transparent.png"
                alt="MediaScience"
                className="h-auto w-full max-w-[255px]"
              />
            </div>

            <div className="md:border-l md:border-white/30 md:px-6">
              <p className="text-[1.1rem] font-normal leading-[1.12] tracking-tight text-white md:text-[1.75rem]">
                <span className="text-[#e0fe67]">Surprise</span>, intensity, and{" "}
                <span className="text-[#e0fe67]">game outcome</span> meaningfully influence memory and ad effectiveness during live sports
                viewing
              </p>
            </div>

            <div className="md:pl-6">
              <p className="text-[1.1rem] font-normal leading-[1.12] tracking-tight text-white md:text-[1.75rem]">
                Brand recall was <span className="text-[#e0fe67]">2x higher</span> following moments of &lsquo;surprise&rsquo; compared
                with &lsquo;expected&rsquo; moments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default ProofBand;
