import HealthcareApplicationPage from "../../../components/healthcare/HealthcareApplicationPage";
import { applications } from "../../../components/healthcare/data";

export function generateStaticParams(){ return Object.keys(applications).map(application=>({application})); }
export function generateMetadata({params}){ const app=applications[params.application]; return { title: app?`${app.title} | Wing Yee AI Lab`:"Healthcare Workflow Prototype", description:app?.description, openGraph:{title:app?.title,description:app?.statement,type:"website"} }; }
export default function Page({params}){ return <HealthcareApplicationPage app={applications[params.application] || applications["medication-verification"]}/>; }
