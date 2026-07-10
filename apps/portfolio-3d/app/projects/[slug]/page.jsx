import AIAudioProjectPage from "../../components/AIAudioProjectPage";
import ProjectPageTemplate from "../../components/ProjectPageTemplate";
import { projects, projectsBySlug, solutionAreaThemes } from "../../data/projects";

const clearedProjectSlugs = new Set([
  "projection-mapping",
  "immersive-medical-ux",
  "smart-reception",
  "ai-feedback-assistant",
  "hermes-ai-agent",
  "n8n-workflow",
  "multi-agent-healthcare-workflow",
]);

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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

  if (clearedProjectSlugs.has(params.slug)) {
    return <main className="min-h-screen bg-[#f4f8fb]" />;
  }

  if (!project) {
    return <ProjectPageTemplate project={{ ...projects[0], title: "Project Not Found" }} />;
  }

  const theme = solutionAreaThemes[project.solutionArea];

  return <ProjectPageTemplate project={{ ...project, ...theme }} />;
}
