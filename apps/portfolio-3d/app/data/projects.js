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
    slug: "medication-verification",
    title: "Medication Consistency Verification",
    solutionArea: "Clinical Operations",
    oneLine: "Compare approved medication sources and direct clinicians to exact differences requiring review.",
    problem: ["Medication information can differ across documentation and active orders.","Complete-list comparison creates repetitive checking."],
    solution: ["A deterministic comparison highlights exact differences.","n8n routes discrepancies and records human resolution."],
    demo: { type:"live", cta:"Explore Product", href:"/projects/medication-verification", note:"Interactive concept using fictional medication data." },
    howItWorks:["Retrieve","Validate","Compare","Clinical review","Record outcome"],impact:["Differences made visible","Review focused","Authority preserved"],tools:["Next.js","n8n","Deterministic Rules","Human Review"],futureDirection:"A governed medication-safety integration pilot using approved interfaces."
  },
  {
    slug: "antenatal-companion",
    title: "AI Antenatal Companion",
    solutionArea: "Care Experience",
    oneLine: "Gestation-specific guidance, reminders and governed maternity-concern escalation.",
    problem:["Pregnant women face uncertainty about schedules, investigations and how to raise concerns."],
    solution:["A personalised timeline delivers approved information.","Structured concerns create owned maternity-team review tasks."],
    demo:{type:"live",cta:"Open Companion",href:"/projects/antenatal-companion",note:"Interactive concept using fictional maternity data."},
    howItWorks:["Enrol","Personalise","Inform","Structure concern","Clinical review"],impact:["Clearer journey","Visible concern status","Structured staff queue"],tools:["Next.js","n8n","Approved Content","Human Review"],futureDirection:"A multilingual, governed antenatal support pilot with approved maternity content."
  },
  {
    slug: "healthcare-ai-agents",
    title: "Healthcare AI Agents",
    solutionArea: "Healthcare Intelligence",
    oneLine: "AI agents designed to interpret healthcare context, coordinate tasks and support staff while keeping clinical decisions under human control.",
    hero: "Healthcare AI agents turn clinical and operational context into structured actions, while healthcare professionals remain responsible for final judgment.",
    sections: [
      ["Clinical Context", "Understand requests, records, policies and workflow states before taking action."],
      ["Agent Capabilities", "Summarise information, compare records, prepare tasks, route exceptions and support staff follow-up."],
      ["Human Control", "Agents recommend and coordinate. Clinical staff review, acknowledge, override or escalate."],
      ["Operational Value", "Reduce repetitive coordination, improve consistency and allow teams to focus on decisions requiring professional judgment."],
    ],
  },
  {
    slug: "workflow-orchestration",
    title: "Workflow Orchestration",
    solutionArea: "Healthcare Intelligence",
    oneLine: "Traceable workflows that connect systems, rules, AI services and human review across healthcare operations.",
    hero: "Workflow orchestration connects triggers, rules, AI services, human review and audit records into one controlled operational process.",
    sections: [
      ["Workflow Triggers", "Start workflows from clinical documentation, system events, forms, schedules or staff actions."],
      ["Rules and Routing", "Validate conditions, assign ownership, manage exceptions and route work to the correct team. n8n can coordinate these steps without acting as the clinical decision-maker."],
      ["Human Review", "Pause workflows at defined checkpoints for acknowledgement, approval or escalation."],
      ["Traceability", "Record timestamps, workflow status, comments, system responses and final outcomes."],
    ],
  },
  {
    slug: "system-integration",
    title: "System Integration",
    solutionArea: "Healthcare Intelligence",
    oneLine: "A secure integration layer connecting clinical systems, operational platforms and AI-enabled services without replacing core hospital infrastructure.",
    hero: "System integration allows existing hospital platforms and new AI services to exchange information through governed and traceable interfaces.",
    sections: [
      ["Existing Systems", "Connect clinical documentation, prescribing, scheduling, dashboards and operational platforms."],
      ["Integration Layer", "Use APIs, webhooks, structured data exchange and workflow middleware to coordinate systems."],
      ["Safety and Governance", "Apply access control, validation, logging, privacy protection and clear system boundaries."],
      ["Scalable Architecture", "Add new AI products without rebuilding or directly replacing core hospital systems."],
    ],
  },
];

export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
export const projectSlugByTitle = Object.fromEntries(projects.map((project) => [project.title, project.slug]));
const projectSlugAliases = {
  "Roster Automation": "roster-automation",
  "Medication Verification": "medication-verification",
};

export function getProjectSlug(title) {
  return projectSlugByTitle[title] || projectSlugAliases[title] || "#contact";
}
