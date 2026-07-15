export const solutionAreaThemes = {
  "Care Experience": {
    accentColor: "#63E6D8",
    rgb: "99,230,216",
  },
  "Clinical Operations": {
    accentColor: "#4F8BFF",
    rgb: "79,139,255",
  },
  "Healthcare Intelligence": {
    accentColor: "#8B7BFF",
    rgb: "139,123,255",
  },
};

export const projects = [
  {
    slug: "projection-mapping",
    title: "Projection Mapping",
    solutionArea: "Care Experience",
    oneLine: "Immersive visual storytelling for care education and calming environments.",
    problem: [
      "Healthcare education can feel flat, abstract or hard to remember.",
      "Patients and teams often need visual context before information becomes meaningful.",
      "Presentation tools rarely create an emotional bridge between care, learning and experience.",
    ],
    solution: [
      "Projection Mapping turns clinical communication into an immersive visual layer.",
      "It combines spatial design, AI media and motion to make ideas easier to feel and understand.",
    ],
    demo: {
      type: "coming-soon",
      cta: "Watch Concept",
      note: "A concept demo space is being prepared.",
    },
    howItWorks: ["Care message", "Visual system", "Immersive output", "Human facilitation"],
    impact: ["Communication improved", "Experience enhanced", "Education made memorable"],
    tools: ["Blender", "TouchDesigner", "HeavyM", "AI Video"],
    futureDirection: "A modular immersive room concept for patient education, relaxation and clinical storytelling.",
  },
  {
    slug: "earth-observatory",
    title: "Earth Observatory",
    solutionArea: "Care Experience",
    oneLine: "A cinematic 3D patient-experience prototype for making complex healthcare information easier to understand.",
    problem: [
      "Healthcare information is often explained through static diagrams, long text or short verbal explanations, which can feel abstract for patients.",
      "Expectant mothers and families may understand pregnancy or fetal development better when information is presented visually and step by step.",
      "Clinicians and educators need more engaging ways to explain complex concepts without increasing communication workload.",
    ],
    solution: [
      "Earth Observatory demonstrates an immersive 3D interaction model that can turn complex spatial information into a calm, guided and patient-friendly experience.",
      "Although the current prototype uses Earth as the visual subject, the same design pattern can be adapted for obstetric education, fetal development walkthroughs, anatomy explanation or projection-mapped healthcare presentations.",
    ],
    demo: {
      type: "live",
      cta: "Open Live Demo",
      href: "https://earth-observatory.vercel.app",
      note: "The live demo shows a scroll-driven 3D observatory interface. It acts as a design prototype for future patient education experiences, such as 3D fetal development journeys or immersive clinical presentations.",
    },
    howItWorks: [
      "Patient education topic",
      "AI-assisted simplification",
      "Interactive 3D story",
      "Clinician review",
    ],
    impact: [
      "Patient understanding improved",
      "Healthcare communication made more visual",
      "Education experience made calmer and more memorable",
    ],
    tools: [
      "Next.js",
      "React Three Fiber",
      "Drei",
      "Three.js",
      "GSAP ScrollTrigger",
      "Vercel",
      "Patient Experience Design",
    ],
    futureDirection:
      "Earth Observatory can evolve into a healthcare visualization platform for patient education. In obstetrics, it could help expectant mothers explore fetal development week by week in 3D. In clinics, it could become a consultation-room education tool. In seminars or exhibitions, it could support projection mapping and large-screen medical storytelling. The system should remain education-focused, clinician-reviewed and supportive of human judgement rather than replacing clinical advice.",
  },
  {
    slug: "ai-music-video",
    title: "AI Music & Video",
    solutionArea: "Care Experience",
    oneLine: "AI-assisted sound and visuals for calmer healthcare communication.",
    problem: [
      "Health messages can feel technical, rushed or emotionally distant.",
      "Patient-facing communication sometimes needs a softer sensory layer.",
      "Teams need faster ways to prototype clear education and campaign media.",
    ],
    solution: [
      "AI Music & Video creates lightweight media concepts for healthcare storytelling.",
      "The work uses AI-assisted sound, video editing and product messaging to support calmer communication.",
    ],
    demo: {
      type: "coming-soon",
      cta: "Watch Demo",
      note: "Demo clips can be attached when ready.",
    },
    howItWorks: ["Message", "AI media generation", "Edited experience", "Human approval"],
    impact: ["Communication improved", "Patient experience softened", "Demo creation accelerated"],
    tools: ["Suno", "Higgsfield", "CapCut", "Prompting"],
    futureDirection: "A care communication media kit for education, ambience and digital experience design.",
  },
  {
    slug: "immersive-medical-ux",
    title: "Immersive Medical UX",
    solutionArea: "Care Experience",
    oneLine: "Immersive medical experiences that make healthcare ideas easier to understand.",
    problem: [
      "Complex workflow ideas are hard to explain through text alone.",
      "Stakeholders need to see the product feeling before committing to a direction.",
      "Early healthcare concepts need fast, clear and low-friction visualization.",
    ],
    solution: [
      "Immersive Medical UX uses generated visuals and interaction design to prototype healthcare experiences.",
      "It helps translate a clinical workflow idea into a clear, shareable product experience.",
    ],
    demo: {
      type: "coming-soon",
      cta: "View Prototype",
      note: "Prototype previews will be added as the concept develops.",
    },
    howItWorks: ["Workflow idea", "AI visual concept", "Edited prototype", "Feedback loop"],
    impact: ["Concept clarity improved", "Stakeholder communication improved", "Iteration made faster"],
    tools: ["Higgsfield", "CapCut", "Google AI Studio", "Prompting"],
    futureDirection: "A repeatable immersive prototyping workflow for healthcare product ideas.",
  },
  {
    slug: "roster-automation",
    title: "AI Rostering Automation System",
    solutionArea: "Clinical Operations",
    oneLine: "A configurable workforce planning system that generates fair, request-aware duty rosters for clinical teams.",
    problem: [
      "Healthcare duty rostering is often created manually using spreadsheets or paper templates.",
      "Ward managers need to balance rank, staffing coverage, night-duty sequence, leave requests, fixed assignments, student limits and day-off patterns at the same time.",
      "Manual rostering increases the risk of errors, unfair workload distribution, missed requests and repeated rework whenever one duty changes.",
    ],
    solution: [
      "The system lets each department configure its own staff list, duty requests, fixed assignments, leave balance and rostering criteria.",
      "A criteria-based automation engine then generates a monthly roster while keeping manager review, adjustment and final approval in the workflow.",
    ],
    demo: {
      type: "live",
      cta: "Open Live Demo",
      href: "https://ninabun.github.io/Rostering-Automation/",
      note: "The live demo shows staff editing, request and fixed-duty entry, department criteria, monthly roster generation, balance tracking, export and print/PDF preview.",
    },
    howItWorks: ["Staff and requests", "Criteria logic", "Generated roster", "Manager review"],
    impact: [
      "Roster preparation time reduced",
      "Workflow rules and staff requests made visible",
      "Communication improved through request and fixed-duty markers",
      "User experience upgraded from manual spreadsheet planning",
      "Fairness improved through workload and sequence balancing",
    ],
    tools: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Codex", "Workflow Design", "CSV Export", "Print / PDF"],
    futureDirection:
      "This project can evolve into a full healthcare workforce planning platform with staff login, self-service duty requests, leave approval workflow, AI optimization, multi-department dashboards, audit trails, HR integration, mobile staff views and automated conflict alerts.",
  },
  {
    slug: "smart-reception",
    title: "Smart Reception",
    solutionArea: "Clinical Operations",
    oneLine: "A tablet-based inquiry layer that reduces unnecessary staff interruption.",
    problem: [
      "Front-desk and bell inquiries can interrupt clinical staff before needs are understood.",
      "Simple requests and urgent requests often arrive through the same channel.",
      "Teams need a calmer way to triage questions without adding complexity.",
    ],
    solution: [
      "Smart Reception captures the visitor or patient need before escalating it.",
      "It routes common inquiries and highlights the requests that need human attention.",
    ],
    demo: {
      type: "coming-soon",
      cta: "Open Demo",
      note: "Interactive tablet prototype coming soon.",
    },
    howItWorks: ["Inquiry", "Intent selection", "Routed response", "Staff review"],
    impact: ["Interruptions reduced", "User experience improved", "Requests clarified"],
    tools: ["Tablet UI", "Workflow Design", "AI Assistant"],
    futureDirection: "A reception assistant that connects visitor needs, ward workflow and escalation logic.",
  },
  {
    slug: "hermes-ai-agent",
    title: "Hermes AI Agent",
    solutionArea: "Healthcare Intelligence",
    oneLine: "A daily AI intelligence pipeline for fast-changing healthcare and AI developments.",
    problem: [
      "AI developments move too quickly to follow manually.",
      "Useful updates are scattered across many sources.",
      "Teams need brief, actionable intelligence instead of information overload.",
    ],
    solution: [
      "Hermes AI Agent collects signals, summarizes updates and turns them into a daily briefing.",
      "The goal is practical awareness: what changed, why it matters and what to watch next.",
    ],
    demo: {
      type: "coming-soon",
      cta: "View Today's Brief",
      note: "Briefing output can be connected when available.",
    },
    howItWorks: ["Sources", "LLM briefing", "Daily summary", "Human review"],
    impact: ["Knowledge updated", "Scanning time reduced", "Decision context improved"],
    tools: ["LLM", "VPS", "Automation", "Prompting"],
    futureDirection: "A focused healthcare AI intelligence feed for clinical innovation and product opportunities.",
  },
  {
    slug: "healthcare-workflow-intelligence",
    title: "Healthcare Workflow Intelligence",
    solutionArea: "Clinical Operations",
    oneLine: "Agentic AI for understanding, n8n for controlled action and human judgement for clinical decisions.",
    problem: [
      "Healthcare AI must operate through explicit authority, validation and escalation boundaries.",
      "Clinical and operational work spans systems, professions and documented handovers.",
      "Fluent AI output alone does not create a safe or traceable operating process.",
    ],
    solution: [
      "AI agents interpret language within a bounded task while n8n validates, routes, waits, escalates and logs.",
      "Interactive prototypes show medication verification, discharge coordination and critical-result escalation.",
    ],
    demo: {
      type: "coming-soon",
      cta: "Explore Architecture",
      note: "Includes three interactive clinical workflow concept prototypes using fictional data.",
    },
    howItWorks: ["Understand", "Validate", "Route", "Human decision", "Audit"],
    impact: ["Coordination made visible", "Exceptions escalated", "Clinical accountability preserved"],
    tools: ["n8n", "Agentic AI", "Workflow assurance", "Human approval", "Audit trail"],
    futureDirection: "A governed orchestration layer connecting approved AI services with clinical and operational systems.",
  },
];

export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
export const projectSlugByTitle = Object.fromEntries(projects.map((project) => [project.title, project.slug]));
const projectSlugAliases = {
  "Roster Automation": "roster-automation",
};

export function getProjectSlug(title) {
  return projectSlugByTitle[title] || projectSlugAliases[title] || "#contact";
}
