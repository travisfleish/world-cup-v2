import { Reveal } from "../motion/MotionPrimitives";
import GeniusStripeRail from "../ui/GeniusStripeRail";
import MomentsAccordion from "../ui/MomentsAccordion";

type MomentsSectionProps = {
  header: string;
  introParagraph1: string;
  introParagraph2: string;
  labels: string[];
};

const highlightedPhrases = ["Genius Moments", "Fan Graph"] as const;
const proprietaryMomentLabels = new Set<string>();
const momentDetailsByLabel: Record<string, { signal: string; emotion: string; description: string }> = {
  "LEAD UP: TAILGATE/Watch Party": {
    signal: "Kick-off time",
    emotion: "Anticipation",
    description:
      "This package activates 24 hours ahead of kick-off, reaching audiences the moment excitement builds and last-minute preparation happens. Ideal for brands looking to own the start of the experience and associate it with pre-game rituals, research, and anticipation."
  },
  "MATCHUPS: LINEUPS AND ANTHEMS": {
    signal: "Kick-off time",
    emotion: "Anticipation, Pride",
    description:
      "Activates immediately before each match. Targets fans of participating teams and connects to the moment when national anthems are sung and lineups are announced."
  },
  "SUPERSTITION: IN-GAME RITUALS": {
    signal: "Kick-off time and halftime; win/loss",
    emotion: "Fear and tension",
    description:
      "Soccer fans are very superstitious: sitting in the same spot every game, wearing the same jersey if the team keeps winning, and not moving during key moments. Targets fans of winning and losing teams."
  },
  "DOWN TO THE WIRE: EXTRA TIME": {
    signal: "Between 45% and 55% win probability when extra time is announced",
    emotion: "Fear and tension",
    description:
      "Activates when extra time is added to a close match. It builds on a team's late-game push, delivering high-attention moments filled with tension, hope, and rising excitement."
  },
  "CINDERELLA STORIES: NEW COMPETITORS": {
    signal:
      "Matches involving newcomer competitors (Curacao, Uzbekistan, Jordan); goals by any new competitor nation; wins by any new competitor nation",
    emotion: "Surprise, Joy",
    description:
      "Activates before kick-off when a new competitor nation in the World Cup is playing. Delivers on the surprise and potential of underdogs and newcomers."
  },
  "COMEBACK STORIES: RETURNING NATIONS": {
    signal: "Matches involving Norway and Scotland, who have not been involved in decades",
    emotion: "Trust, Pride, Surprise",
    description:
      "Activates before kick-off when a returning competitor nation in the World Cup is playing. Delivers on the surprise and potential of returning nations, with a sense of belonging and achievement."
  },
  "ADVANCEMENT: WINNING MOMENTS": {
    signal: "Wins throughout the tournament that result in teams advancing in the group standings",
    emotion: "Joy and Love",
    description:
      "Activates when teams give their fans hope and something to look forward to in the next stage of the World Cup, delivering relief and bragging rights to fans who were feeling down."
  },
  "ELIMINATION": {
    signal: "Losses during the World Cup that put teams mathematically out of contention",
    emotion: "Disgust/Anger",
    description:
      "Activates disgust among losing fan bases. They look for blame, changes, and most of all dread the years they will have to wait to try again."
  },
  "SET PIECE GOALS: SCORING PLAYS": {
    signal: "Goals scored from corner kicks and penalty kicks",
    emotion: "Surprise, Joy",
    description:
      "Activates when teams score from a set position, usually triggered by a dazzling curving shot or a well-placed pass."
  },
  "SHOOT-OUTS": {
    signal: "Games that go to the shoot-out stage",
    emotion: "Anticipation, Joy or Sadness depending on outcome",
    description:
      "Own the most iconic moment in sports: after two extra-time periods, games are decided with each team taking five penalty kicks. This can also lead to sudden death if teams are still tied after the initial five kicks."
  }
};

function renderHighlightedIntro(text: string) {
  const segments = text.split(new RegExp(`(${highlightedPhrases.join("|")})`, "g"));

  return segments.map((segment, index) =>
    highlightedPhrases.includes(segment as (typeof highlightedPhrases)[number]) ? (
      <strong key={`${segment}-${index}`} className="font-medium text-slate-900">
        {segment}
      </strong>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    )
  );
}

function isProprietaryMoment(label: string) {
  return proprietaryMomentLabels.has(label);
}

function MomentsSection({
  header,
  introParagraph1,
  introParagraph2,
  labels
}: MomentsSectionProps) {
  const filteredLabels = labels.filter((label) => !isProprietaryMoment(label));

  return (
    <Reveal id="moments" as="section" once={false} className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-gs-surface">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f4f6] via-[#f3f4f6] to-transparent" />
          <GeniusStripeRail
            theme="blue"
            className="absolute inset-y-0 right-0 hidden lg:block lg:w-[26%] xl:w-[38%]"
            dimmed
          />
        </div>

        <div className="relative z-10 px-4 pb-6 pt-4 sm:px-6 md:px-10 md:pb-10 md:pt-6">
          <h2 className="section-title">{header}</h2>
          <div className="mt-4 max-w-3xl space-y-3">
            {introParagraph1 !== header ? (
              <p className="m-0 font-sans text-[0.98rem] leading-[1.45] tracking-[-0.01125em] text-[var(--gs-text-muted)] md:text-base">
                {introParagraph1}
              </p>
            ) : null}
            <p className="m-0 font-sans text-[0.98rem] leading-[1.45] tracking-[-0.01125em] text-[var(--gs-text-muted)] md:text-base">
              {renderHighlightedIntro(introParagraph2)}
            </p>
          </div>
        </div>

        <div className="relative z-10 px-4 pb-6 sm:px-6 md:px-10 md:pb-10">
          <MomentsAccordion labels={filteredLabels} detailsByLabel={momentDetailsByLabel} />
        </div>
      </div>
    </Reveal>
  );
}

export default MomentsSection;
