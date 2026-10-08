/* THE JOURNEY — personal learning and developer evolution.
 *
 * SOURCING: The developer's real personal journey from curiosity to code,
 * building practical projects, problem solving, AI, and ongoing growth.
 *
 * Shape per chapter:
 *   year        — milestone year (e.g. "2024")
 *   title       — milestone title (e.g. "The Beginning")
 *   subtitle    — short label / focus (e.g. "Started my CSE journey")
 *   description — narrative of the milestone
 *   quote       — optional reflection or takeaway quote
 *   fr          — optional French localization
 *
 * To add a new milestone in the future, simply append an object to CHAPTERS:
 * {
 *   year: "2027",
 *   title: "Next Milestone",
 *   subtitle: "Focus Area",
 *   description: "Description of your growth and learning...",
 * }
 */

export type Chapter = {
  id?: string;
  year: string;
  month?: string;
  title: string;
  subtitle?: string;
  shortLabel?: string;
  location?: string;
  place?: string;
  description?: string;
  story?: string;
  quote?: string;
  bridge?: string;
  fr?: {
    month?: string;
    title?: string;
    subtitle?: string;
    shortLabel?: string;
    location?: string;
    place?: string;
    description?: string;
    story?: string;
    quote?: string;
    bridge?: string;
  };
};

export const CHAPTERS: Chapter[] = [
  {
    id: "the-beginning-2024",
    year: "2024",
    month: "SEP",
    title: "The Beginning",
    subtitle: "Started my CSE journey",
    shortLabel: "Started my CSE journey",
    place: "Started my CSE journey",
    description:
      "Started college with curiosity about how technology works and began exploring programming, computer science, and the world of software development.",
    story:
      "Started college with curiosity about how technology works and began exploring programming, computer science, and software development.",
    fr: {
      month: "SEP",
      title: "Le commencement",
      subtitle: "Début de mon parcours en informatique",
      shortLabel: "Début de mon parcours en informatique",
      place: "Début de mon parcours en informatique",
      description:
        "Entrée à l'université avec la curiosité de comprendre le fonctionnement de la technologie, marquant mes débuts dans la programmation, l'informatique et le développement logiciel.",
      story:
        "Entrée à l'université avec la curiosité de comprendre le fonctionnement de la technologie, marquant mes débuts dans la programmation, l'informatique et le développement logiciel.",
    },
  },
  {
    id: "finding-direction-2024",
    year: "2024",
    month: "OCT",
    title: "Finding My Direction",
    subtitle: "Learning to Build",
    shortLabel: "Learning to Build",
    place: "Learning to Build",
    description:
      "Started experimenting with different technologies and discovered that I enjoyed turning ideas into interactive digital experiences.",
    story:
      "Started experimenting with different technologies and discovered that I enjoyed turning ideas into interactive digital experiences.",
    fr: {
      month: "OCT",
      title: "Trouver ma direction",
      subtitle: "Apprendre à concevoir",
      shortLabel: "Apprendre à concevoir",
      place: "Apprendre à concevoir",
      description:
        "J'ai commencé à expérimenter diverses technologies et découvert ma passion pour transformer des idées en expériences numériques interactives.",
      story:
        "J'ai commencé à expérimenter diverses technologies et découvert ma passion pour transformer des idées en expériences numériques interactives.",
    },
  },
  {
    id: "beyond-classroom-2025",
    year: "2025",
    month: "JAN",
    title: "Beyond the Classroom",
    subtitle: "Learning Through Projects",
    shortLabel: "Learning Through Projects",
    place: "Learning Through Projects",
    description:
      "Began moving from simply learning concepts to building practical projects, experimenting with modern development tools and understanding how real applications come together.",
    story:
      "Began moving from simply learning concepts to building practical projects, experimenting with modern development tools and understanding how real applications come together.",
    fr: {
      month: "JAN",
      title: "Au-delà des cours",
      subtitle: "Apprendre par les projets",
      shortLabel: "Apprendre par les projets",
      place: "Apprendre par les projets",
      description:
        "Passage de la théorie à la création de projets concrets, en expérimentant avec des outils modernes et en comprenant l'assemblage d'applications réelles.",
      story:
        "Passage de la théorie à la création de projets concrets, en expérimentant avec des outils modernes et en comprenant l'assemblage d'applications réelles.",
    },
  },
  {
    id: "problem-solving-2025",
    year: "2025",
    month: "APR",
    title: "Problem Solving",
    subtitle: "Thinking Beyond Code",
    shortLabel: "Thinking Beyond Code",
    place: "Thinking Beyond Code",
    description:
      "Started giving more attention to problem solving, DSA, debugging, and understanding how to approach a problem before jumping into implementation.",
    story:
      "Started giving more attention to problem solving, DSA, debugging, and understanding how to approach a problem before jumping into implementation.",
    fr: {
      month: "APR",
      title: "Résolution de problèmes",
      subtitle: "Penser au-delà du code",
      shortLabel: "Penser au-delà du code",
      place: "Penser au-delà du code",
      description:
        "Attention accrue portée à la résolution de problèmes, aux structures de données et algorithmes, au débogage et à la réflexion avant l'implémentation.",
      story:
        "Attention accrue portée à la résolution de problèmes, aux structures de données et algorithmes, au débogage et à la réflexion avant l'implémentation.",
    },
  },
  {
    id: "building-with-ai-2026",
    year: "2026",
    month: "JAN",
    title: "Building With AI",
    subtitle: "A New Way of Creating",
    shortLabel: "A New Way of Creating",
    place: "A New Way of Creating",
    description:
      "Started exploring AI-powered development, automation, and modern tools that changed the way I think about building software.",
    story:
      "Started exploring AI-powered development, automation, and modern tools that changed the way I think about building software.",
    fr: {
      month: "JAN",
      title: "Créer avec l'IA",
      subtitle: "Une nouvelle façon de concevoir",
      shortLabel: "Une nouvelle façon de concevoir",
      place: "Une nouvelle façon de concevoir",
      description:
        "Exploration du développement assisté par l'IA, de l'automatisation et des outils modernes qui ont transformé ma vision de la conception logicielle.",
      story:
        "Exploration du développement assisté par l'IA, de l'automatisation et des outils modernes qui ont transformé ma vision de la conception logicielle.",
    },
  },
  {
    id: "still-becoming-2026",
    year: "2026",
    month: "...",
    title: "Still Becoming",
    subtitle: "The journey continues",
    shortLabel: "The journey continues",
    place: "The journey continues",
    description:
      "I'm still learning, experimenting, building, and figuring out where technology can take me next.",
    story:
      "I'm still learning, experimenting, building, and figuring out where technology can take me next.",
    fr: {
      month: "...",
      title: "En constante évolution",
      subtitle: "Le voyage continue",
      shortLabel: "Le voyage continue",
      place: "Le voyage continue",
      description:
        "Je continue d'apprendre, d'expérimenter, de développer et d'explorer jusqu'où la technologie peut me mener.",
      story:
        "Je continue d'apprendre, d'expérimenter, de développer et d'explorer jusqu'où la technologie peut me mener.",
    },
  },
];
