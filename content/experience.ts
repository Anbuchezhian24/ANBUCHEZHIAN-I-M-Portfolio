/* Professional experience — developer and learning journey.
   Chronological narrative order per portfolio strategy. */

export type Role = {
  company: string;
  role: string;
  type: "Internship" | "Full-time" | "Hackathon" | "Freelance" | "Cohort" | "Bootcamp" | "Teaching";
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  outcome: string;
  skills: string[];
  /* panel color — intentional, one vibrant per role (Experience deck) */
  color: string;
  fg: "light" | "dark";
  /* Short typographic mark for visual identity tile (e.g. NEXTONE, FUSION, LC) */
  mark?: string;
  /* Company mark. `variant` follows what the supplied file actually IS:
     · "tile"  — the logo ships with its own background baked in (square
                 avatars), so it is shown as a rounded tile, uncropped
     · "plate" — transparent artwork that needs a light ground to read;
                 the plate's width follows the logo's true aspect ratio
     · absent  — no official file supplied yet → typographic fallback */
  logo?: {
    src: string;
    variant: "tile" | "plate";
    aspect: number;
    /* Placement adapts to how dense the panel's copy is — a logo is not
       forced into the same slot for every company.
       "right" — sits beside the content (default, when there is room)
       "below" — closes the panel underneath the content (dense copy) */
    placement?: "right" | "below";
  };
  /* French copy for the translatable fields (see lib/i18n.tsx → L()) */
  fr?: { role?: string; summary?: string; outcome?: string; achievements?: string[] };
};

export const ROLES: Role[] = [
  {
    company: "NextOne Solution",
    role: "Frontend Developer Intern",
    type: "Internship",
    location: "Web Development",
    period: "2024 – 2025",
    summary:
      "Worked on frontend development and built responsive web interfaces while gaining practical experience with modern web development workflows.",
    achievements: [],
    outcome:
      "Built practical frontend experience and strengthened my ability to turn interface requirements into responsive web experiences.",
    skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design", "Git"],
    color: "#0072E3",
    fg: "light",
    mark: "NEXTONE",
    logo: {
      src: "/images/Experience/NextOne.jpg",
      variant: "tile",
      aspect: 1,
    },
    fr: {
      role: "Stagiaire développeur frontend",
      summary:
        "Travail sur le développement frontend et conception d’interfaces web réactives, avec l’acquisition d’une expérience pratique sur les flux de développement web modernes.",
      outcome:
        "Développement d’une expérience concrète en frontend et consolidation de ma capacité à traduire des besoins d’interface en expériences web réactives.",
    },
  },
  {
    company: "FusionSpace",
    role: "Full Stack Developer Intern",
    type: "Internship",
    location: "Full Stack Development",
    period: "2025 – 2026",
    summary:
      "Worked across frontend and backend development, gaining practical experience with full-stack application development, APIs, databases, and application workflows.",
    achievements: [],
    outcome:
      "Expanded from frontend development into full-stack engineering and gained practical experience working across the complete application stack.",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Git",
    ],
    color: "#6D3BF5",
    fg: "light",
    mark: "FUSION",
    logo: {
      src: "/images/Experience/fusionspace.jpg",
      variant: "plate",
      aspect: 2.5,
    },
    fr: {
      role: "Stagiaire développeur full stack",
      summary:
        "Intervention sur le frontend et le backend, avec une pratique concrète du développement d’applications complètes, des API, des bases de données et des flux applicatifs.",
      outcome:
        "Évolution du frontend vers l’ingénierie full stack et acquisition d’une pratique solide sur l’intégralité de la chaîne applicative.",
    },
  },
  {
    company: "LeetCode Championship Training Cohort",
    role: "Competitive Programming & DSA Trainee",
    type: "Cohort",
    location: "Algorithmic Training",
    period: "APR 2025",
    summary:
      "Selected for a focused training cohort to strengthen problem-solving, data structures, algorithms, and competitive programming skills.",
    achievements: [],
    outcome:
      "Strengthened algorithmic thinking and developed a more structured approach to solving programming problems.",
    skills: ["LeetCode", "Data Structures", "Algorithms", "Problem Solving", "Java"],
    color: "#FFA116",
    fg: "dark",
    mark: "LC",
    logo: {
      src: "/images/Experience/leetcode.jpg",
      variant: "tile",
      aspect: 1,
    },
    fr: {
      role: "Stagiaire en programmation compétitive & algorithmes",
      summary:
        "Sélectionné au sein d’une cohorte d’entraînement intensive visant à renforcer la résolution de problèmes, les structures de données, les algorithmes et la programmation compétitive.",
      outcome:
        "Renforcement de la pensée algorithmique et développement d’une approche méthodique face aux problèmes de programmation.",
    },
  },
  {
    company: "Agentic AI Bootcamp",
    role: "Agentic AI & Automation Learner",
    type: "Bootcamp",
    location: "Applied AI & Automation",
    period: "JUN 2025",
    summary:
      "Explored agentic AI concepts and practical AI automation workflows, including hands-on learning with n8n.",
    achievements: [],
    outcome:
      "Expanded my understanding of AI-powered workflows, agent-based systems, and practical automation.",
    skills: [
      "Agentic AI",
      "n8n",
      "AI Workflows",
      "Automation",
      "Prompt Engineering",
    ],
    color: "#EA4B71",
    fg: "light",
    mark: "AGENTIC",
    logo: {
      src: "/images/Experience/agentic-ai.jpg",
      variant: "plate",
      aspect: 2,
    },
    fr: {
      role: "Apprenant en IA agentique & automatisation",
      summary:
        "Exploration des concepts d’IA agentique et des flux d’automatisation pratiques par l’IA, avec un apprentissage appliqué sur n8n.",
      outcome:
        "Approfondissement de ma compréhension des flux de travail pilotés par l’IA, des systèmes multi-agents et de l’automatisation concrète.",
    },
  },
  {
    company: "AI Tools Workshop",
    role: "AI Tools Mentor",
    type: "Teaching",
    location: "Peer Mentorship & Sessions",
    period: "SEP 2025",
    summary:
      "Conducted a practical session for junior students introducing modern AI tools and demonstrating how they can support learning, development, and productivity.",
    achievements: [],
    outcome:
      "Helped junior students understand practical applications of AI tools and encouraged them to explore AI-assisted workflows.",
    skills: [
      "AI Tools",
      "Generative AI",
      "Prompt Engineering",
      "AI-Assisted Development",
      "Productivity Tools",
    ],
    color: "#0D9488",
    fg: "light",
    mark: "AI",
    logo: {
      src: "/images/Experience/ai-tools-workshop.jpg",
      variant: "plate",
      aspect: 1.5,
    },
    fr: {
      role: "Mentor en outils IA",
      summary:
        "Animation d’une session pratique pour les étudiants juniors afin de présenter les outils d’IA modernes et leur rôle dans l’apprentissage, le développement et la productivité.",
      outcome:
        "Accompagnement des étudiants dans la compréhension des applications concrètes de l’IA et encouragement vers des flux de travail assistés par l’IA.",
    },
  },
  {
    company: "Independent",
    role: "Freelance Full Stack Developer",
    type: "Freelance",
    location: "Independent Practice",
    period: "SEP 2026 – PRESENT",
    summary:
      "Started working independently on web development projects, focusing on building modern full-stack applications and digital experiences.",
    achievements: [],
    outcome:
      "Applied my full-stack development skills to real-world requirements while strengthening my ability to take projects from concept to implementation.",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Git",
      "Vercel",
    ],
    color: "#171429",
    fg: "light",
    mark: "IND.",
    logo: {
      src: "/images/Experience/freelance.jpg",
      variant: "tile",
      aspect: 1,
    },
    fr: {
      role: "Développeur full stack freelance",
      summary:
        "Développement indépendant sur des projets web, axé sur la conception d’applications full stack modernes et d’expériences numériques.",
      outcome:
        "Application de mes compétences full stack à des besoins réels et consolidation de ma capacité à mener des projets du concept à la mise en production.",
    },
  },
];
