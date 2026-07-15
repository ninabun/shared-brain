import AIAudioProjectPage from "../../components/AIAudioProjectPage";
import EarthObservatoryPage from "../../components/EarthObservatoryPage";
import N8nWorkflowPage from "../../components/N8nWorkflowPage";
import HealthcareWorkflowPage from "../../components/healthcare/HealthcareWorkflowPage";
import ProjectPageTemplate from "../../components/ProjectPageTemplate";
import RosterAutomationPage from "../../components/RosterAutomationPage";
import SmartReceptionPage from "../../components/SmartReceptionPage";
import { projects, projectsBySlug, solutionAreaThemes } from "../../data/projects";

const clearedProjectSlugs = new Set([
  "projection-mapping",
  "immersive-medical-ux",
  "roster-automation",
  "smart-reception",
  "hermes-ai-agent",
  "multi-agent-healthcare-workflow",
]);

export function generateStaticParams() {
  return [...projects.map((project) => ({ slug: project.slug })), { slug: "n8n-workflow" }, { slug: "multi-agent-healthcare-workflow" }];
}

export function generateMetadata({ params }) {
  const project = projectsBySlug[params.slug];

  return {
    title: project ? `${project.title} | Wing Yee AI Lab` : "Project | Wing Yee AI Lab",
    description: project?.oneLine || "A Wing Yee AI Lab project case study.",
  };
}

export default function ProjectPage({ params }) {
  const project = projectsBySlug[params.slug];

  if (params.slug === "ai-music-video") {
    return <AIAudioProjectPage />;
  }

  if (params.slug === "roster-automation") {
    return <RosterAutomationPage />;
  }

  if (params.slug === "earth-observatory") {
    return <EarthObservatoryPage />;
  }

  if (params.slug === "smart-reception") {
    return <SmartReceptionPage />;
  }

  if (params.slug === "n8n-workflow") {
    return <HealthcareWorkflowPage />;
  }

  if (params.slug === "multi-agent-healthcare-workflow") {
    return <HealthcareWorkflowPage />;
  }

  if (clearedProjectSlugs.has(params.slug)) {
    return <main className="min-h-screen bg-[#f4f8fb]" />;
  }

  if (!project) {
    return <ProjectPageTemplate project={{ ...projects[0], title: "Project Not Found" }} />;
  }

  const theme = solutionAreaThemes[project.solutionArea];

  return <ProjectPageTemplate project={{ ...project, ...theme }} />;
}
