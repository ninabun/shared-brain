import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Code2,
  HeartPulse,
  Layers3,
  Music4,
  Network,
  Orbit,
  Rocket,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";

const featuredProjects = [
  "Healthcare AI Operating System",
  "Nursing Roster Automation",
  "Hermes AI Intelligence Agent",
  "Shared Brain",
  "Earth Observatory",
];

const projectGroups = [
  {
    title: "Healthcare AI",
    intro: "Practical systems designed to reduce clinical workload and support safer healthcare operations.",
    icon: HeartPulse,
    projects: [
      "Roster Automation",
      "AI Handover (Future)",
      "Incident Assistant",
      "Clinical Knowledge Assistant",
      "Ward Dashboard",
    ],
    fields: ["Problem", "Solution", "Technology", "Demo", "GitHub", "Reflection"],
  },
  {
    title: "AI Systems",
    intro: "Agentic workflows, automation layers and knowledge systems that turn AI into operational infrastructure.",
    icon: Workflow,
    projects: [
      "Hermes Daily AI Agent",
      "n8n Workflow",
      "Shared Brain",
      "MCP Experiments",
      "Prompt Library",
    ],
    fields: ["Objective", "Architecture", "Workflow", "Result", "Future"],
  },
  {
    title: "Interactive Applications",
    intro: "Explorable interfaces that communicate complex systems through interaction and visual design.",
    icon: Orbit,
    projects: ["Earth Observatory"],
    fields: ["Concept", "Interaction", "System Design", "Demo", "Reflection"],
  },
  {
    title: "AI Product Communication",
    intro: "Creative AI projects that show how products, ideas and intelligent systems can be communicated visually.",
    icon: Music4,
    projects: ["Creative AI", "AI Music", "MV", "Suno", "Higgsfield", "CapCut"],
    fields: ["Message", "Toolchain", "Visual Direction", "Output", "Learning"],
  },
];

const labGroups = [
  ["AI Foundation", ["OpenAI", "Claude", "Gemini", "Perplexity"]],
  ["Automation", ["n8n", "Zapier", "Make"]],
  ["AI Agents", ["Hermes", "OpenManus", "AutoGen", "CrewAI", "OpenAI Agent SDK", "MCP"]],
  ["Development", ["Cursor", "Claude Code", "GitHub", "Vercel", "Supabase"]],
  ["Creative AI", ["Suno", "Higgsfield", "CapCut", "Runway"]],
  ["Healthcare AI", ["FHIR", "MedGemma", "Clinical NLP", "Medical RAG"]],
  ["Core Skills", ["LLM", "Coding", "Prompt", "Research", "Deployment", "Productivity"]],
];

const learningTimeline = [
  { year: "2024", skills: ["Python", "HTML", "CSS"] },
  { year: "2025", skills: ["React", "Next.js", "GitHub"] },
  { year: "2026", skills: ["AI Agent", "Hermes", "n8n", "Workflow", "Healthcare AI"] },
];

const dailyTopics = ["OpenAI", "Claude", "Google", "Meta", "Open Source", "Daily Update"];

const interests = ["AI Agents", "Healthcare AI", "Workflow Automation", "Digital Health", "Product Design"];

function App() {
  return (
    <main className="site-shell">
      <nav className="site-nav">
        <a href="#home" className="nav-brand">
          <span className="brand-glyph">WY</span>
          <span>
            <strong>Wing Yee AI Lab</strong>
            <small>Healthcare AI Systems</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#ai-lab">AI Lab</a>
          <a href="#journey">Learning Journey</a>
          <a href="#daily">AI Daily</a>
          <a href="#about">About Me</a>
          <a href="#ecosystem">My AI Ecosystem</a>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Wing Yee AI Operating System</p>
          <h1>Wing Yee AI Lab</h1>
          <div className="hero-credentials">
            <span>Building AI-powered Healthcare Systems</span>
            <span>RN | MSc Computer Science | AI Workflow Designer</span>
          </div>
          <p className="hero-statement">
            I design AI solutions that reduce healthcare workload through AI agents,
            workflow automation and intelligent systems.
          </p>
          <p className="mission-line">
            I build practical AI systems that bridge clinical knowledge, workflow
            automation, intelligent agents and human-centered design.
          </p>
          <div className="hero-actions">
            <a href="#projects">Explore Projects <ArrowRight size={17} /></a>
            <a href="#ai-lab">AI Lab</a>
            <a href="#projects">Healthcare</a>
            <a href="#about">About Me</a>
          </div>
        </div>
        <div className="hero-system-card">
          <div className="system-orbit">
            <Sparkles />
            <span>Build AI Systems</span>
          </div>
          <div className="system-stack">
            <span>Clinical Knowledge</span>
            <span>Workflow Automation</span>
            <span>AI Agents</span>
            <span>Human-centered Design</span>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <SectionHeader
          kicker="First 30 seconds"
          title="Featured Projects"
          text="The clearest signal: this is not experimenting with AI. This is building AI systems."
        />
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <article key={project} className="featured-card">
              <span>⭐</span>
              <h3>{project}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section">
        <SectionHeader
          kicker="Menu 01"
          title="Projects"
          text="Real work, organized by system purpose rather than screenshots."
        />
        <div className="project-groups">
          {projectGroups.map((group) => (
            <article key={group.title} className="project-group-card">
              <div className="project-group-head">
                <group.icon size={28} />
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
              </div>
              <div className="project-list">
                {group.projects.map((project) => (
                  <div key={project} className="project-row">
                    <strong>{project}</strong>
                    <div>
                      {group.fields.map((field) => (
                        <span key={field}>{field}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ai-lab" className="content-section">
        <SectionHeader
          kicker="Menu 02"
          title="AI Lab"
          text="A structured intelligence library for AI foundations, tools, agents, workflows and healthcare deployment."
        />
        <div className="lab-grid">
          {labGroups.map(([group, tools]) => (
            <article key={group} className="lab-card">
              <h3>{group}</h3>
              <div>
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="content-section">
        <SectionHeader
          kicker="Menu 03"
          title="Learning Journey"
          text="A timeline that shows learning speed, technical growth and direction."
        />
        <div className="timeline">
          {learningTimeline.map((item, index) => (
            <article key={item.year} className="timeline-card">
              <CalendarDays />
              <h3>{item.year}</h3>
              <div>
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              {index < learningTimeline.length - 1 && <b>↓</b>}
            </article>
          ))}
        </div>
      </section>

      <section id="daily" className="content-section split-section">
        <div>
          <SectionHeader
            kicker="Menu 04"
            title="AI Daily"
            text="The Hermes intelligence layer: daily tracking of AI movement across frontier labs, open source and product ecosystems."
          />
          <div className="daily-topics">
            {dailyTopics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
        <div className="daily-panel">
          <BrainCircuit size={42} />
          <h3>Today's AI</h3>
          <p>Signals, summaries and practical implications for healthcare AI systems.</p>
        </div>
      </section>

      <section id="about" className="content-section split-section">
        <div>
          <SectionHeader
            kicker="Menu 05"
            title="About Me"
            text="I am passionate about transforming healthcare workflows using AI."
          />
          <p className="about-copy">
            I combine clinical experience, computer science and modern AI technologies
            to build practical digital solutions for healthcare.
          </p>
        </div>
        <div className="interest-card">
          <h3>Current Interests</h3>
          {interests.map((interest) => (
            <p key={interest}><CheckCircle2 size={17} /> {interest}</p>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="content-section">
        <SectionHeader
          kicker="Menu 06"
          title="My AI Ecosystem"
          text="A single system map that connects clinical work, AI agents, knowledge infrastructure and creative communication."
        />
        <div className="ecosystem-map">
          <div className="eco-node root">Wing Yee AI Lab</div>
          <div className="eco-branches">
            <div>
              <div className="eco-node">Clinical</div>
              <div className="eco-node small">Nursing</div>
              <div className="eco-node small">Roster</div>
              <div className="eco-node small">Workflow</div>
            </div>
            <div>
              <div className="eco-node">AI Systems</div>
              <div className="eco-node small">Hermes Agent</div>
              <div className="eco-node small">n8n</div>
              <div className="eco-node small">Prompt</div>
            </div>
          </div>
          <div className="eco-node center">Knowledge Brain</div>
          <div className="eco-node center">Interactive Apps</div>
          <div className="eco-node center">AI Creativity</div>
        </div>
      </section>

      <footer className="site-footer">
        <h2>Wing Yee AI Lab</h2>
        <p>Transforming Healthcare Through AI, Automation and Intelligent Workflows.</p>
        <p>From Clinical Experience to AI Innovation.</p>
      </footer>
    </main>
  );
}

function SectionHeader({ kicker, title, text }) {
  return (
    <header className="section-header">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}

export default App;
