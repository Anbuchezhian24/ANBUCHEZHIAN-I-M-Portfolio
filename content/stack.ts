/* My Design Stack — tools shown in the spiral orbit.
   `src` uses a real logo from /public/images/logos when we have one;
   otherwise a brand-tinted monogram mark keeps the set visually uniform.
   To upgrade a monogram: drop an SVG/PNG in that folder and swap in `src`. */

export type Tool = {
  name: string;
  group: "AI" | "Design" | "Build" | "Creative";
  src?: string;
  mono?: string;
  color?: string;
};

export const TOOLS: Tool[] = [
  /* — AI — */
  { name: "Claude", group: "AI", src: "/images/logos/claude.png" },
  { name: "ChatGPT", group: "AI", src: "/images/logos/chatgpt.png" },
  { name: "Gemini", group: "AI", src: "/images/logos/gemini.svg", mono: "Gm", color: "#2C6BD8" },
  { name: "Perplexity", group: "AI", src: "/images/logos/perplexity.svg", mono: "Px", color: "#1F7A86" },

  /* — Design — */
  { name: "Figma", group: "Design", src: "/images/logos/figma.png" },
  { name: "Framer", group: "Design", src: "/images/logos/framer.png" },
  { name: "Spline", group: "Design", src: "/images/logos/spline.png" },
  { name: "Notion", group: "Design", src: "/images/logos/notion.png" },

  /* — Build — */
  { name: "Cursor", group: "Build", src: "/images/logos/cursor.svg", mono: "Cu", color: "#141414" },
  { name: "VS Code", group: "Build", src: "/images/logos/vscode.svg", mono: "VS", color: "#0065A9" },
  { name: "GitHub", group: "Build", src: "/images/logos/github.svg", mono: "GH", color: "#181717" },
  { name: "React", group: "Build", src: "/images/logos/react.svg", mono: "Re", color: "#0E7C99" },
  { name: "Next.js", group: "Build", src: "/images/logos/nextjs.svg", mono: "N", color: "#141414" },
  { name: "Tailwind", group: "Build", src: "/images/logos/tailwind.svg", mono: "TW", color: "#0891A6" },
  { name: "HTML", group: "Build", src: "/images/logos/html.svg", mono: "H5", color: "#D6431C" },
  { name: "CSS", group: "Build", src: "/images/logos/css.svg", mono: "C3", color: "#1572B6" },

  /* — Creative — */
  { name: "Photoshop", group: "Creative", src: "/images/logos/photoshop.svg", mono: "Ps", color: "#1E7FC4" },
  { name: "Illustrator", group: "Creative", src: "/images/logos/illustrator.svg", mono: "Ai", color: "#D97A00" },
  { name: "After Effects", group: "Creative", src: "/images/logos/aftereffects.svg", mono: "Ae", color: "#5C4FE0" },
  { name: "Midjourney", group: "Creative", src: "/images/logos/midjourney.png" },
  { name: "CapCut", group: "Creative", src: "/images/logos/capcut.png" },
  { name: "Runway", group: "Creative", src: "/images/logos/runway.png", mono: "Rw", color: "#141414" },
  { name: "ElevenLabs", group: "Creative", src: "/images/logos/elevenlabs.svg", mono: "11", color: "#141414" },
];

/* Complete Developer Tech Stack — dedicated page at /stack */
export type TechItem = {
  name: string;
  role: string;
  mono: string;
  color: string;
  src?: string;
};

export type TechCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: TechItem[];
};

export const DEV_STACK: TechCategory[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND",
    description: "Building responsive, modern user interfaces with a focus on component architecture, performance, and refined interaction.",
    items: [
      { name: "React", role: "UI Component Library", src: "/images/logos/react.svg", mono: "Re", color: "#0E7C99" },
      { name: "Next.js", role: "Full-Stack React Framework", src: "/images/logos/nextjs.svg", mono: "N", color: "#141414" },
      { name: "Tailwind CSS", role: "Utility-First CSS", src: "/images/logos/tailwind.svg", mono: "TW", color: "#0891A6" },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "BACKEND",
    description: "Designing resilient backend architectures, RESTful services, server-side business logic, and API integrations.",
    items: [
      { name: "Node.js", role: "JavaScript Runtime", src: "/images/logos/nodejs.svg", mono: "Node", color: "#339933" },
      { name: "Express", role: "Backend Web Framework", src: "/images/logos/express.svg", mono: "Ex", color: "#141414" },
      { name: "REST APIs", role: "API Architecture & Protocols", src: "/images/logos/api.svg", mono: "API", color: "#FF2E0F" },
    ],
  },
  {
    id: "database",
    number: "03",
    title: "DATABASE",
    description: "Managing structured data models, relational database schemas, real-time sync, and scalable cloud storage.",
    items: [
      { name: "PostgreSQL", role: "Relational Database", src: "/images/logos/postgresql.svg", mono: "PG", color: "#336791" },
      { name: "Supabase", role: "Backend-as-a-Service & Auth", src: "/images/logos/supabase.svg", mono: "Sb", color: "#3ECF8E" },
    ],
  },
  {
    id: "programming",
    number: "04",
    title: "PROGRAMMING",
    description: "Core languages used across frontend engineering, backend services, object-oriented systems, and data queries.",
    items: [
      { name: "JavaScript", role: "Web & Runtime Language", src: "/images/logos/javascript.svg", mono: "JS", color: "#F7DF1E" },
      { name: "Java", role: "Object-Oriented Programming", src: "/images/logos/java.svg", mono: "Ja", color: "#E76F00" },
      { name: "Python", role: "General-Purpose & Scripting", src: "/images/logos/python.svg", mono: "Py", color: "#3776AB" },
      { name: "SQL", role: "Relational Query Language", src: "/images/logos/sql.svg", mono: "SQL", color: "#00758F" },
    ],
  },
  {
    id: "tools",
    number: "05",
    title: "TOOLS",
    description: "Version control systems, collaborative development platforms, and rapid visual development tools.",
    items: [
      { name: "Git", role: "Distributed Version Control", src: "/images/logos/git.svg", mono: "Git", color: "#F05032" },
      { name: "GitHub", role: "Code Repository & CI/CD", src: "/images/logos/github.svg", mono: "GH", color: "#181717" },
      { name: "Flutter Flow", role: "Visual Application Builder", src: "/images/logos/flow.png", mono: "FF", color: "#02569B" },
    ],
  },
];
