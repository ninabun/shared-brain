import AIAudioProjectPage from "../../components/AIAudioProjectPage";
import EarthObservatoryPage from "../../components/EarthObservatoryPage";
import HealthcareApplicationPage from "../../components/healthcare/HealthcareApplicationPage";
import { applications } from "../../components/healthcare/data";
import HealthcareIntelligencePage from "../../components/HealthcareIntelligencePage";
import ProjectPageTemplate from "../../components/ProjectPageTemplate";
import RosterAutomationPage from "../../components/RosterAutomationPage";
import SmartReceptionPage from "../../components/SmartReceptionPage";
import { projects, projectsBySlug, solutionAreaThemes } from "../../data/projects";
import { notFound, redirect } from "next/navigation";

export function generateStaticParams() {
  return [...projects.map((project) => ({ slug: project.slug })), { slug: "antenatal-care-companion" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug === "antenatal-care-companion") {
    return {
      title: "Pregnancy Companion | Wing Yee AI Lab",
      description: projectsBySlug["antenatal-companion"].oneLine,
      alternates: { canonical: "/projects/antenatal-companion" },
    };
  }

  const project = projectsBySlug[slug];

  return {
    title: project ? `${project.title} | Wing Yee AI Lab` : "Project | Wing Yee AI Lab",
    description: project?.oneLine || "A Wing Yee AI Lab project case study.",
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  if (slug === "antenatal-care-companion") {
    redirect("/projects/antenatal-companion");
  }

  const project = projectsBySlug[slug];

  if (slug === "ai-music-video") return <AIAudioProjectPage />;
  if (slug === "roster-automation") return <RosterAutomationPage />;
  if (slug === "medication-verification") return <HealthcareApplicationPage app={applications["medication-verification"]} />;
  if (slug === "antenatal-companion") return <HealthcareApplicationPage app={applications["antenatal-care-companion"]} />;
  if (slug === "earth-observatory") return <EarthObservatoryPage />;
  if (slug === "smart-reception") return <SmartReceptionPage />;

  if (!project) notFound();

  if (project.solutionArea === "Healthcare Intelligence" && project.sections) {
    return <HealthcareIntelligencePage project={project} />;
  }

  const theme = solutionAreaThemes[project.solutionArea];
  return <ProjectPageTemplate project={{ ...project, ...theme }} />;
}
