"use client";

import { ArrowRight, Check, CircleAlert, Clock3, Play, RotateCcw, ShieldCheck, Workflow } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./Healthcare.module.css";
import type { ApplicationConfig, WorkflowStatus, WorkflowStep } from "./data";

export function Shell({ children }: { children: React.ReactNode }) {
  return <main className={styles.root}><div className={styles.backdrop}/><div className={styles.content}><Header/>{children}</div></main>;
}

function Header() { return <header className={styles.topbar}><a className={styles.brand} href="/">Wing Yee AI Lab</a><nav className={styles.toplinks} aria-label="Global navigation"><a className={styles.toplink} href="/#platform">Solutions</a><a className={styles.toplink} href="/#about">About</a><a className={styles.toplink} href="/#contact">Contact</a></nav></header>; }

export function LocalSectionNav({ items }: { items: { label:string; href:string }[] }) { return <nav className={styles.localNav} aria-label="On this page"><div className={styles.localNavInner}>{items.map(i=><a key={i.href} href={i.href}>{i.label}</a>)}</div></nav>; }

export function Section({ id, eyebrow, title, intro, children, wide=false }: { id?:string; eyebrow:string; title:string; intro?:string; children:React.ReactNode; wide?:boolean }) {
  const inner=<section id={id} className={styles.section}><div className={styles.sectionHead}><div><div className={styles.eyebrow}>{eyebrow}</div><h2 className={styles.h2}>{title}</h2></div>{intro&&<p className={styles.sub}>{intro}</p>}</div>{children}</section>;
  return wide?<div className={styles.sectionWide}>{inner}</div>:inner;
}

export function Flow({ steps, captions }: { steps:string[]; captions?:string[] }) { return <div className={styles.flow}>{steps.map((step,i)=><div style={{display:"contents"}} key={step}><div className={styles.flowNode}><strong>{step}</strong>{captions?.[i]&&<span>{captions[i]}</span>}</div>{i<steps.length-1&&<div className={styles.arrow}><ArrowRight size={16}/></div>}</div>)}</div>; }

export function ArchitectureFlow({ nodes, animated=true }: { nodes:{title:string; detail:string; checkpoint?:boolean}[]; animated?:boolean }) { return <div className={styles.arch}>{animated&&<span className={styles.signal}/>} {nodes.map((n,i)=><div style={{display:"contents"}} key={n.title}><div className={`${styles.archNode} ${n.checkpoint?styles.checkpoint:""}`}><b>{n.title}</b><small>{n.detail}</small></div>{i<nodes.length-1&&<div className={styles.connector}/>}</div>)}</div>; }

export function SystemStatusBadge({ label, tone="ok" }: { label:string; tone?:"ok"|"warn" }) { return <span className={styles.status}><span className={styles.dot} style={tone==="warn"?{background:"#ffae63"}:{}}/>{label}</span>; }

export function ApplicationCard({ app, problem, solution, workflow }: { app:ApplicationConfig; problem:string; solution:string; workflow:string[] }) { return <article className={`${styles.card} ${styles.appCard}`}><div style={{display:"flex",justifyContent:"space-between",gap:12}}><SystemStatusBadge label="Interactive concept"/><SystemStatusBadge label={`${app.risk} risk`} tone="warn"/></div><h3>{app.title}</h3><p><b style={{color:"#dfe4eb"}}>Clinical problem.</b> {problem}</p><p style={{marginTop:12}}><b style={{color:"#dfe4eb"}}>Workflow response.</b> {solution}</p><div className={styles.workflowMini}>{workflow.map(s=><span key={s}>{s}</span>)}</div><div className={styles.actions}><a href={`/projects/healthcare-workflow-intelligence/${app.slug}`} className={`${styles.button} ${styles.primary}`}>Explore application <ArrowRight size={15}/></a></div></article>; }

export function RiskControlPanel({ application }: { application?:ApplicationConfig }) { return <div className={styles.card}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}><CircleAlert size={20} color="#ff9f7e"/><strong>Risk and controls</strong></div><div className={styles.riskFlow}>{[
  ["Potential failure",application?.slug==="medication-verification"?"False negative or wrong encounter":application?.slug==="critical-result-escalation"?"Wrong recipient or alert failure":"Stale task state or workflow duplication"],
  ["Consequence","Important work may be delayed or acted on with incomplete context"],
  ["Preventive control","Identity checks, versioned rules, least privilege and idempotency"],
  ["Detection control","Reconciliation, timeout monitoring, freshness and exception alerts"],
  ["Human fallback","Authorised staff verify, override and continue through downtime procedure"]
].map(([a,b])=><div key={a}><b>{a}</b>{b}</div>)}</div></div>; }

export function DemoVideoSection({ title }: { title:string }) { return <div><div className={styles.video}><div><button className={`${styles.button} ${styles.primary}`} aria-label={`Play ${title} video placeholder`}><Play size={17} fill="currentColor"/> Play scenario</button><h3>{title}</h3><p className={styles.sub}>From trigger to clinical resolution · 03:00 placeholder</p></div></div><p className={styles.micro}>Captions and transcript will be supplied with the final video. Video never autoplays with sound.</p></div>; }

export interface WorkflowRun { id:string; status:WorkflowStatus; current:number; steps:WorkflowStep[] }
export interface HumanDecision { approved:boolean; reason?:string }
export interface WorkflowAdapter { startWorkflow(workflowId:string,payload:Record<string,unknown>):Promise<WorkflowRun>; getWorkflowStatus(runId:string):Promise<WorkflowRun>; submitHumanDecision(runId:string,decision:HumanDecision):Promise<WorkflowRun> }
export class MockWorkflowAdapter implements WorkflowAdapter {
  constructor(private steps:WorkflowStep[]){};
  async startWorkflow(workflowId:string,payload:Record<string,unknown>){ if(!workflowId||!payload) throw new Error("Invalid synthetic workflow input"); return {id:`mock-${Date.now()}`,status:"running" as const,current:0,steps:this.steps}; }
  async getWorkflowStatus(runId:string):Promise<WorkflowRun>{ return {id:runId,status:"waiting",current:this.steps.length-2,steps:this.steps}; }
  async submitHumanDecision(runId:string,decision:HumanDecision):Promise<WorkflowRun>{ if(!decision.approved) return {id:runId,status:"escalated",current:this.steps.length-2,steps:this.steps}; return {id:runId,status:"completed",current:this.steps.length,steps:this.steps}; }
}
// Future N8nWebhookAdapter: call an authenticated server-side gateway; never expose webhook credentials in the browser.

export function WorkflowExecutionPanel({ labels, trigger=0, waitingAt }: { labels:string[]; trigger?:number; waitingAt?:number }) {
  const steps=useMemo(()=>labels.map((label,i)=>({id:String(i),label,detail:"Synthetic execution event"})),[labels]);
  const adapter=useMemo(()=>new MockWorkflowAdapter(steps),[steps]);
  const [run,setRun]=useState<WorkflowRun>({id:"preview",status:"pending",current:-1,steps}); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  async function start(){setBusy(true);setError("");try{const next=await adapter.startWorkflow("concept",{trigger});setRun(next)}catch(e){setError(e instanceof Error?e.message:"Workflow failed")}finally{setBusy(false)}}
  async function decide(approved=true){setBusy(true);try{setRun(await adapter.submitHumanDecision(run.id,{approved,reason:"Synthetic demo decision"}))}catch{setError("Decision could not be recorded. Retry available.")}finally{setBusy(false)}}
  useEffect(()=>{if(run.status!=="running")return;const timer=setInterval(()=>setRun(r=>{const n=r.current+1;if(waitingAt!==undefined&&n===waitingAt)return {...r,current:n,status:"waiting"};if(n>=steps.length)return {...r,current:steps.length,status:"completed"};return {...r,current:n}}),650);return()=>clearInterval(timer)},[run.status,steps.length,waitingAt]);
  return <div className={styles.card}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,marginBottom:15}}><div><div className={styles.eyebrow}>n8n execution</div><h3 style={{margin:"8px 0 0"}}>Workflow run</h3></div><SystemStatusBadge label={run.status}/></div><div className={styles.execution}>{steps.map((s,i)=>{const state:WorkflowStatus=run.status==="waiting"&&i===run.current?"waiting":i<run.current||run.status==="completed"?"completed":i===run.current?"running":"pending";return <div className={styles.executionNode} data-state={state} key={s.id}>{state==="completed"?<Check size={15}/>:state==="running"?<Clock3 size={15}/>:<span style={{width:15,textAlign:"center"}}>○</span>}<span>{s.label}</span><small style={{marginLeft:"auto"}}>{state}</small></div>})}</div>{error&&<p role="alert" style={{color:"#ff9b86",fontSize:12}}>{error}</p>}<div className={styles.actions}>{run.status==="pending"||run.status==="completed"?<button disabled={busy} onClick={start} className={`${styles.button} ${styles.primary}`}>{run.status==="completed"?<RotateCcw size={15}/>:<Workflow size={15}/>} {busy?"Starting…":run.status==="completed"?"Replay":"Run workflow"}</button>:null}{run.status==="waiting"&&<><button disabled={busy} onClick={()=>decide(true)} className={`${styles.button} ${styles.primary}`}><ShieldCheck size={15}/> Approve as clinician</button><button disabled={busy} onClick={()=>decide(false)} className={styles.button}>Escalate</button></>}</div></div>;
}

export function AuditTimeline({ items }: { items:string[] }) { return <div className={styles.audit}>{items.map((item,i)=><div className={styles.auditItem} key={item}><b>{item}</b><span>{String(9+i).padStart(2,"0")}:{i%2?"14":"02"}:2{i} · Synthetic audit event</span></div>)}</div>; }

export function HumanApprovalGate({ children }: { children:React.ReactNode }) { return <div className={styles.card} style={{borderColor:"rgba(255,184,87,.3)"}}><ShieldCheck color="#ffc071"/><h3>Human approval gate</h3><p>{children}</p></div>; }
