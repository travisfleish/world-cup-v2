export type MomentModalTemplate = {
  bullets: string[];
};

export type StepCard = {
  title: string;
  body: string;
  badge?: string;
};

export type AudienceGroup = {
  title: string;
  description: string;
  audiences: string[];
};

export type AudienceGridSection = {
  header: string;
  subtitle?: string;
  popularHeader?: string;
  audienceGroups: AudienceGroup[];
};

export type MarchMadnessMomentsContent = {
  hero: {
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
  fanCloudComparison: {
    headline: string;
    leftLabel: string;
    rightLabel: string;
    leftImageSrc: string;
    rightImageSrc: string;
    helperText?: string;
    metricsEyebrow: string;
    metrics: {
      value: string;
      label: string;
    }[];
  };
  campaignIntro: {
    title: string;
    subtitle: string;
  };
  proof: {
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
  howItWorks: {
    header: string;
    paragraph: string;
    steps: StepCard[];
  };
  moments: {
    header: string;
    introParagraph1: string;
    introParagraph2: string;
    labels: string[];
    modalTemplate: MomentModalTemplate;
  };
  audiences: AudienceGridSection;
  creativeAndChannel: {
    header: string;
    paragraph: string;
    creativeViz: {
      triggerTitle: string;
      exampleLabel: string;
      exampleEvent: string;
      leftAudienceLabel: string;
      leftCardTitle: string;
      leftCardImageSrc?: string;
      leftLead: string;
      leftBody: string;
      rightAudienceLabel: string;
      rightCardTitle: string;
      rightCardImageSrc?: string;
      rightLead: string;
      rightBody: string;
    };
  };
  cta: {
    primaryButtonText: string;
    modalTitle: string;
    modalBody: string;
    email: string;
    closeButtonText: string;
  };
};

export const marchMadnessMomentsContent: MarchMadnessMomentsContent = {
  hero: {
    kicker: "Genius Sports Partnership Opportunities",
    subhead:
      "The biggest sporting event in global history is here. No one puts brands in the middle of the World Cup like Genius Sports.",
    ctaButtonText: "Get Started",
    ctaHref: "#contact-cta",
    titleLines: ["World Cup", "2026", ""],
    stats: [
      {
        value: "6 Billion",
        label: "",
        description: "The number of people FIFA estimates will engage with the World Cup",
        size: "lg"
      },
      {
        value: "48",
        label: "Teams",
        description: "The most teams ever in World Cup history, up from 32 in 2022",
        size: "md"
      },
      {
        value: "104",
        label: "Matches",
        description: "With an average of 4 matches a day during the Group stages",
        size: "md"
      }
    ],
    sideBarStat: {
      value: "140",
      label: "Super Bowls",
      description: "The relative size of the World Cup in viewership"
    }
  },
  fanCloudComparison: {
    headline: "No One Knows World Cup\nFans Better Than Genius Sports",
    leftLabel: "How other data and media partners see World Cup fans.",
    rightLabel: "How Genius Sports sees World Cup fans.",
    leftImageSrc: "/slider_left.png",
    rightImageSrc: "/slider_right.png",
    helperText: "Drag the slider to compare.",
    metricsEyebrow: "",
    metrics: [
      { value: "250M", label: "Consumers" },
      { value: "50B", label: "Interactions" },
      { value: "10K", label: "Brands" },
      { value: "5K", label: "Exclusive Brands" },
      { value: "2,500", label: "Communities" }
    ]
  },
  campaignIntro: {
    title: "Genius Sports World Cup Moments",
    subtitle:
      "Connecting brands with fans during the moments that matter most, when emotions are high, history is being made, and brand recall is at its highest."
  },
  proof: {
    body: "Emotional engagement is deeply tied to brand impact, with ads airing immediately after high-surprise gameplay moments delivering nearly 2x higher unaided brand recall.",
    chart: {
      title: "Unaided Brand Recall Following Gameplay Moments",
      subtitle: "(i.e., exposed early in ad break)",
      bars: [
        {
          value: 14,
          label: "Following high-surprise moments",
          color: "#1D26FF"
        },
        {
          value: 7,
          label: "Following low-surprise moments",
          color: "#1EC971"
        }
      ],
      footnote: "*Genius Sports Media Science Research Study 2026"
    }
  },
  howItWorks: {
    header: "Your World Cup Moments Campaign",
    paragraph:
      "Addressable ads triggered at precise, emotion-driven moments before, during, or after the game, Genius Moments uses official game data and our Genius Fan Graph segments to deliver targeted creative to the right fans based on the real-time moment that matters most.",
    steps: [
      {
        title: "Step 1: Choose Your Moment",
        body: "Select the key in-game or tournament moments you want to align your brand with."
      },
      {
        title: "Step 2: Customize Your Audience",
        body: "Choose high-intent fan segments based on fandom, behaviors, and purchase signals."
      },
      {
        title: "Customize Your Creative & Channel",
        badge: "Optional",
        body: "Tailor messaging dynamically to the moment and deliver across CTV, OTT, and digital."
      }
    ]
  },
  moments: {
    header: "Step 1: Choose Your Moment",
    introParagraph1: "Step 1: Choose Your Moment",
    introParagraph2:
      "Select the key in-game or tournament moments you want to align your brand with.",
    labels: [
      "LEAD UP: TAILGATE/Watch Party",
      "MATCHUPS: LINEUPS AND ANTHEMS",
      "SUPERSTITION: IN-GAME RITUALS",
      "DOWN TO THE WIRE: EXTRA TIME",
      "CINDERELLA STORIES: NEW COMPETITORS",
      "COMEBACK STORIES: RETURNING NATIONS",
      "ADVANCEMENT: WINNING MOMENTS",
      "ELIMINATION",
      "SET PIECE GOALS: SCORING PLAYS",
      "SHOOT-OUTS"
    ],
    modalTemplate: {
      bullets: ["What it is", "Why it matters to fans", "Best message types"]
    }
  },
  audiences: {
    header: "Step 2: Customize Your Audience",
    subtitle:
      "The Genius Sports audience desk will create custom addressable segments aligned to your specific campaign goals and target audiences.",
    popularHeader: "Popular World Cup Audiences",
    audienceGroups: [
      {
        title: "League & Competition Fans:",
        description:
          "Broad reach among global soccer audiences leading up to and during the tournament.",
        audiences: ["Soccer Fans", "International Soccer Fans", "Hispanic Die Hards"]
      },
      {
        title: "National Team Fans:",
        description: "Connect with fans supporting specific countries and national teams.",
        audiences: [
          "USA National Team Fans",
          "Mexico National Team Fans",
          "Brazil National Team Fans",
          "Argentina National Team Fans"
        ]
      },
      {
        title: "Customize by:",
        description: "",
        audiences: [
          "Demographic + psychographic attributes",
          "Category/brand purchase behavior across 5K+ brands",
          "Category/brand purchase frequency across 5K+ brands",
          "100+ Fluid Fan communities such as Values-Driven Fans, Gen Z fans, Sober Curious Fans"
        ]
      }
    ]
  },
  creativeAndChannel: {
    header: "Optional: Customize Your Creative & Channel",
    paragraph:
      "With Genius Sports AI-driven dynamic creative optimization engine, advertisers can tailor their message to each moment, whether it’s a comeback, a buzzer beater, or a championship celebration. Select content can be pushed across channels, including CTV, OTT, and digital.",
    creativeViz: {
      triggerTitle: "Moment Trigger: Tournament Advancement",
      exampleLabel: "Example Event:",
      exampleEvent: "USA advances to the knockout stage",
      leftAudienceLabel: "World Cup Fans + Existing Brand Purchaser",
      leftCardTitle: "CREATIVE MESSAGE A",
      leftCardImageSrc: "/comfystay.png",
      leftLead: "Big moments reveal future stars.",
      leftBody:
        "VCU showed us: the biggest stages create the biggest opportunities. Thanks for being a loyal [Brand] customer -- celebrate the rise of the tournament's newest star with 15% off your next purchase.",
      rightAudienceLabel: "World Cup Fans + Competitive Brand Purchaser",
      rightCardTitle: "CREATIVE MESSAGE B",
      rightCardImageSrc: "/acme-tv-creative-b-cutout-v2.png",
      rightLead: "Every tournament creates new stars.",
      rightBody:
        "From under-the-radar to center stage, this World Cup breakout proved anything can happen. New to [Brand]? Start strong with 15% off your first purchase and be ready for whatever emerges next."
    }
  },
  cta: {
    primaryButtonText: "Request Moment-Based Activation",
    modalTitle: "Request Moment-Based Activation",
    modalBody:
      "Thanks for your interest in activating against World Cup moments. Reach out and our team will help map moments, audiences, and creative strategy.",
    email: "sales@geniussports.com",
    closeButtonText: "Close"
  }
};
