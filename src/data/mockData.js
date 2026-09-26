// Mock/demo data powering the NEXORA prototype.
// Everything here simulates what a real AI pipeline would return.

export const ROLES = [
  {
    id: "full-stack",
    name: "Full Stack Developer",
    blurb: "Build end-to-end web products across client and server.",
    skills: [
      { name: "JavaScript", required: 5 },
      { name: "React", required: 4 },
      { name: "Node.js", required: 4 },
      { name: "SQL", required: 4 },
      { name: "System Design", required: 3 },
      { name: "Git & CI/CD", required: 3 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Developer",
    blurb: "Craft fast, accessible, pixel-perfect user interfaces.",
    skills: [
      { name: "JavaScript", required: 5 },
      { name: "React", required: 5 },
      { name: "CSS & Animation", required: 4 },
      { name: "TypeScript", required: 3 },
      { name: "Accessibility", required: 3 },
      { name: "Performance Tuning", required: 3 },
    ],
  },
  {
    id: "backend",
    name: "Backend Developer",
    blurb: "Design resilient APIs, services and data layers.",
    skills: [
      { name: "Node.js", required: 5 },
      { name: "SQL", required: 5 },
      { name: "System Design", required: 4 },
      { name: "API Design", required: 4 },
      { name: "Docker", required: 3 },
      { name: "Security Fundamentals", required: 3 },
    ],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    blurb: "Turn raw data into decisions leadership can act on.",
    skills: [
      { name: "SQL", required: 5 },
      { name: "Excel & Sheets", required: 4 },
      { name: "Data Visualization", required: 4 },
      { name: "Python", required: 3 },
      { name: "Statistics", required: 3 },
      { name: "Storytelling", required: 3 },
    ],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    blurb: "Model, predict and extract signal from complex datasets.",
    skills: [
      { name: "Python", required: 5 },
      { name: "Statistics", required: 5 },
      { name: "Machine Learning", required: 4 },
      { name: "SQL", required: 4 },
      { name: "Data Visualization", required: 3 },
      { name: "Experiment Design", required: 3 },
    ],
  },
  {
    id: "uiux",
    name: "UI/UX Designer",
    blurb: "Design intuitive, delightful, research-backed experiences.",
    skills: [
      { name: "Figma", required: 5 },
      { name: "User Research", required: 4 },
      { name: "Wireframing", required: 4 },
      { name: "Design Systems", required: 3 },
      { name: "Prototyping", required: 3 },
      { name: "Interaction Design", required: 3 },
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Analyst",
    blurb: "Defend systems and respond to evolving digital threats.",
    skills: [
      { name: "Network Security", required: 5 },
      { name: "Threat Detection", required: 4 },
      { name: "Linux", required: 4 },
      { name: "Security Fundamentals", required: 4 },
      { name: "Scripting", required: 3 },
      { name: "Incident Response", required: 3 },
    ],
  },
  {
    id: "ai-ml",
    name: "AI/ML Engineer",
    blurb: "Ship production-grade machine learning systems.",
    skills: [
      { name: "Python", required: 5 },
      { name: "Machine Learning", required: 5 },
      { name: "Deep Learning", required: 4 },
      { name: "Statistics", required: 4 },
      { name: "MLOps", required: 3 },
      { name: "System Design", required: 3 },
    ],
  },
];

// Friendly, human self-assessment prompts per skill.
export const SKILL_QUESTIONS = {
  JavaScript: "How comfortable are you with JavaScript asynchronous programming (promises, async/await)?",
  React: "How confident are you building multi-component apps with React (state, hooks, effects)?",
  "Node.js": "How comfortable are you building REST APIs or services with Node.js?",
  SQL: "How confident are you writing joins, aggregations and subqueries in SQL?",
  "System Design": "How comfortable are you designing scalable systems (caching, load balancing, trade-offs)?",
  "Git & CI/CD": "How confident are you with Git workflows and setting up CI/CD pipelines?",
  "CSS & Animation": "How comfortable are you building responsive layouts and CSS animations?",
  TypeScript: "How confident are you using TypeScript's type system in real projects?",
  Accessibility: "How comfortable are you building accessible (WCAG-compliant) interfaces?",
  "Performance Tuning": "How confident are you profiling and optimizing front-end performance?",
  "API Design": "How comfortable are you designing clean, versioned REST/GraphQL APIs?",
  Docker: "How confident are you containerizing and deploying apps with Docker?",
  "Security Fundamentals": "How comfortable are you with core application security practices (OWASP, auth, encryption)?",
  "Excel & Sheets": "How confident are you building pivot tables and formulas in Excel/Sheets?",
  "Data Visualization": "How comfortable are you communicating insights through charts and dashboards?",
  Python: "How confident are you writing data-processing scripts in Python?",
  Statistics: "How comfortable are you with statistical concepts (distributions, hypothesis testing, significance)?",
  Storytelling: "How confident are you presenting data-driven insights to non-technical stakeholders?",
  "Machine Learning": "How comfortable are you training and evaluating machine learning models?",
  "Experiment Design": "How confident are you designing A/B tests and experiments?",
  Figma: "How comfortable are you designing high-fidelity UI in Figma?",
  "User Research": "How confident are you planning and running user research sessions?",
  Wireframing: "How comfortable are you translating ideas into low-fidelity wireframes?",
  "Design Systems": "How confident are you building or maintaining a design system?",
  Prototyping: "How comfortable are you creating interactive prototypes for usability testing?",
  "Interaction Design": "How confident are you designing micro-interactions and motion?",
  "Network Security": "How comfortable are you securing networks against common attack vectors?",
  "Threat Detection": "How confident are you identifying and triaging security threats?",
  Linux: "How comfortable are you administering and hardening Linux systems?",
  Scripting: "How confident are you automating security tasks with scripting (Bash/Python)?",
  "Incident Response": "How comfortable are you leading incident response and post-mortems?",
  "Deep Learning": "How confident are you building neural networks with PyTorch/TensorFlow?",
  MLOps: "How comfortable are you deploying and monitoring ML models in production?",
};

export const ASSESSMENT_LEVELS = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Basic" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

// Demo snapshot shown on the landing-page hero visualization.
export const DEMO_DASHBOARD = {
  targetRole: "Full Stack Developer",
  readiness: 68,
  skills: [
    { name: "JavaScript", current: 3.5, required: 5 },
    { name: "React", current: 2.5, required: 4 },
    { name: "Node.js", current: 3, required: 4 },
    { name: "SQL", current: 2, required: 4 },
  ],
};

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Build Your Profile",
    description: "Upload your Resume, connect LinkedIn & GitHub, or complete a self-assessment.",
    items: ["Resume", "LinkedIn", "GitHub", "Self-assessment"],
  },
  {
    step: "02",
    title: "AI Skill Analysis",
    description: "NEXORA analyzes your profile and identifies your current skill levels.",
  },
  {
    step: "03",
    title: "Discover Your Skill Gaps",
    description: "Compare current level against the level required for your target role.",
    example: [
      { name: "JavaScript", current: 2, required: 5 },
      { name: "React", current: 1, required: 4 },
      { name: "SQL", current: 2, required: 4 },
    ],
  },
  {
    step: "04",
    title: "Follow Your Roadmap",
    description: "Get a personalized sequence of Learn → Practice → Build → Test for every gap.",
    loop: ["Learn", "Practice", "Build", "Test"],
  },
  {
    step: "05",
    title: "Measure & Improve",
    description: "AI evaluates your progress and dynamically updates the roadmap as you grow.",
    loop: ["Assess", "Learn", "Practice", "Test", "Improve", "Retest"],
  },
];

export const PROBLEM_CARDS = [
  {
    index: "01",
    title: "Skill Confusion",
    description: "Students don't know which skills they actually need for their target role.",
  },
  {
    index: "02",
    title: "Learning Overload",
    description: "Hundreds of courses make it difficult to decide what to learn first.",
  },
  {
    index: "03",
    title: "No Progress Validation",
    description: "Students learn but don't know whether they've actually reached the required skill level.",
  },
];

export const ROADMAP_PHASES = ["Learn", "Practice", "Build", "Test"];

const LEARNING_RESOURCES = {
  Learn: (skill) => `Deep-dive course: ${skill} Fundamentals to Advanced`,
  Practice: (skill) => `Guided drills & katas for ${skill}`,
  Build: (skill) => `Ship a mini-project using ${skill}`,
  Test: (skill) => `AI skill-check: validate ${skill} at target level`,
};

// Builds a personalized roadmap from a set of { name, current, required } skills.
export function buildRoadmap(skillGaps) {
  const sorted = [...skillGaps]
    .filter((s) => s.required > s.current)
    .sort((a, b) => b.required - b.current - (a.required - a.current));

  return sorted.map((skill, i) => ({
    id: `${skill.name.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    skill: skill.name,
    current: skill.current,
    required: skill.required,
    gap: Math.round((skill.required - skill.current) * 10) / 10,
    phases: ROADMAP_PHASES.map((phase) => ({
      phase,
      task: LEARNING_RESOURCES[phase](skill.name),
      done: false,
    })),
  }));
}

export function computeReadiness(skillGaps) {
  if (!skillGaps.length) return 0;
  const total = skillGaps.reduce((acc, s) => acc + Math.min(s.current / s.required, 1), 0);
  return Math.round((total / skillGaps.length) * 100);
}
