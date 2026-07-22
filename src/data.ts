export interface Project {
  index: string;
  title: string;
  shortTitle: string;
  kicker: string;
  description: string;
  contribution: string;
  tags: string[];
  live: string | null;
  source: string;
}

export const projects: Project[] = [
  {
    index: "01",
    title: "NovaLearn AI",
    shortTitle: "NovaLearn",
    kicker: "AI-assisted study platform",
    description:
      "A study platform that turns source material into notes, quizzes, and flashcards through AI-assisted workflows.",
    contribution:
      "Contribution: prompt creation, content refinement, and careful improvements to interface text.",
    tags: ["Prompt design", "Content refinement", "AI workflows"],
    live: "https://novalearn-ai.vercel.app",
    source: "https://github.com/Kryz21/nova-learn-ai",
  },
  {
    index: "02",
    title: "BuildSpace OS",
    shortTitle: "BuildSpace OS",
    kicker: "Digital productivity workspace",
    description:
      "A desktop-inspired workspace combining tasks, notes, files, code snippets, and AI tools in one interface.",
    contribution:
      "Contribution: prompt design, content systems, and small manual interface and copy adjustments.",
    tags: ["Prompt systems", "Product structure", "UI refinement"],
    live: "https://buildspace-os-dusky.vercel.app",
    source: "https://github.com/Kryz21/BuildSpace",
  },
  {
    index: "03",
    title: "CredFolio",
    shortTitle: "CredFolio",
    kicker: "Student resume and portfolio builder",
    description:
      "A student-focused platform for creating resumes and portfolios while organizing achievements and credentials.",
    contribution:
      "Contribution: prompts, copy refinement, and small interface adjustments across the product experience.",
    tags: ["Student technology", "Copy systems", "Interface polish"],
    live: null,
    source: "https://github.com/Kryz21/CredFolio",
  },
];

export interface Achievement {
  year: string;
  result: string;
  title: string;
  event: string;
  detail: string;
  tone: "gold" | "cyan" | "violet" | "muted";
}

export const achievements: Achievement[] = [
  {
    year: "2026",
    result: "1st Prize",
    title: "MindBot",
    event: "TAPSFEST by APS",
    detail: "Inter-school technology competition.",
    tone: "gold",
  },
  {
    year: "2026",
    result: "2nd Place",
    title: "Overclock Delhi Hackathon",
    event: "Delhi inter-school hackathon",
    detail: "Placed second in the competition.",
    tone: "cyan",
  },
  {
    year: "2026",
    result: "4th Place",
    title: "Phishing Phantoms",
    event: "DigX.CyberX",
    detail: "Contributed to the school’s overall first-place finish.",
    tone: "violet",
  },
  {
    year: "2026",
    result: "Participant",
    title: "Bidding Bankers",
    event: "MATRIX Ecomm Psynapse by MSM",
    detail: "Represented the school through Pyrotech.",
    tone: "muted",
  },
  {
    year: "2026",
    result: "Participant",
    title: "C0RE Creative",
    event: "Melange Spectrum by DPS Dwarka",
    detail: "Represented the school through Pyrotech.",
    tone: "muted",
  },
  {
    year: "2026",
    result: "Participant",
    title: "Code.IT",
    event: "Byte.IT",
    detail: "Represented the school through Pyrotech.",
    tone: "muted",
  },
  {
    year: "2025",
    result: "School Representative",
    title: "Inter-University Accelerator Centre",
    event: "IUAC, New Delhi",
    detail:
      "Attended a seminar on health and medical sciences related to cancer care and observed particle accelerator facilities.",
    tone: "cyan",
  },
  {
    year: "2023",
    result: "School Rank 2",
    title: "Indian Science Olympiad",
    event: "School-level result",
    detail: "Secured second rank in school.",
    tone: "gold",
  },
];

export const skills = [
  "Python",
  "HTML & CSS",
  "Supabase",
  "GitHub",
  "AI prompt design",
  "Content & UI refinement",
];

export const languages = [
  { name: "English", level: "Fluent", width: 96 },
  { name: "Hindi", level: "Fluent", width: 96 },
  { name: "Nepali", level: "Conversational", width: 66 },
  { name: "Garhwali", level: "Understanding proficiency", width: 44 },
];
