import Step3CreativeViz from "../visualizations/Step3CreativeViz";
import type { MarchMadnessMomentsContent } from "../../content/marchMadnessMoments";
import { Reveal } from "../motion/MotionPrimitives";

type CreativeChannelSectionProps = {
  header: string;
  paragraph: string;
  creativeViz: MarchMadnessMomentsContent["creativeAndChannel"]["creativeViz"];
};

function CreativeChannelSection({ header, paragraph, creativeViz }: CreativeChannelSectionProps) {
  const [triggerPrefix, triggerSuffix] = creativeViz.triggerTitle.split(": ");

  return (
    <Reveal
      id="creative"
      as="section"
      className="scroll-mt-24 pb-5 md:pb-10"
    >
      <h2 className="section-title">{header}</h2>
      <p className="section-copy">{paragraph}</p>
      <div className="mt-7 -mx-4 border-y border-slate-200 bg-slate-50/70 px-4 py-3 text-center sm:-mx-6 sm:px-6 md:hidden">
        <p className="text-base font-medium text-slate-900">
          {triggerSuffix ? (
            <>
              <span className="block">{`${triggerPrefix}:`}</span>
              <span className="block">{triggerSuffix}</span>
            </>
          ) : (
            creativeViz.triggerTitle
          )}
        </p>
        <p className="mt-1 text-base text-slate-700">{creativeViz.exampleEvent}</p>
      </div>
      <Step3CreativeViz data={creativeViz} />
    </Reveal>
  );
}

export default CreativeChannelSection;
