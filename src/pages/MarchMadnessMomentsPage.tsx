import AudiencesSection from "../components/sections/AudiencesSection";
import CreativeChannelSection from "../components/sections/CreativeChannelSection";
import FanCloudComparisonSection from "../components/sections/FanCloudComparisonSection";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import MomentsSection from "../components/sections/MomentsSection";
import SectionNav from "../components/nav/SectionNav";
import ProofBand from "../components/sections/ProofBand";
import ContactCtaSection from "../components/sections/ContactCtaSection";
import { marchMadnessMomentsContent as content } from "../content/marchMadnessMoments";

function MarchMadnessMomentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection {...content.hero} />
      <div className="bg-white px-4 pb-8 md:px-8 md:pb-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <SectionNav />
          <FanCloudComparisonSection {...content.fanCloudComparison} />
          <ProofBand {...content.proof} />
          <HowItWorksSection {...content.howItWorks} />
          <MomentsSection
            header={content.moments.header}
            introParagraph1={content.moments.introParagraph1}
            introParagraph2={content.moments.introParagraph2}
            labels={content.moments.labels}
          />
          <AudiencesSection {...content.audiences} />
          <CreativeChannelSection {...content.creativeAndChannel} />
        </div>
      </div>
      <ContactCtaSection />
    </main>
  );
}

export default MarchMadnessMomentsPage;
