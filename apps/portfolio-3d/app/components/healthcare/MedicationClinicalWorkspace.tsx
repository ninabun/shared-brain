"use client";

import { AlertTriangle, CheckCircle2, ChevronRight, Clock3, Search, ShieldAlert, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { caseCounts, demoCases } from "./medication-cases";
import type { FieldComparison } from "./medication-engine";
import styles from "./MedicationVerification.module.css";

const ResultIcon = ({ state }: { state: string }) => state === "MATCH" ? <CheckCircle2 /> : state === "REVIEW" ? <Clock3 /> : <AlertTriangle />;
const workflow = ["Record received", "Identity validation", "Version validation", "Deterministic comparison", "Case classification", "Reviewer assignment", "Notification", "Wait", "Escalation if overdue", "Re-run after source update", "Audit closure"];

export default function MedicationClinicalWorkspace() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("ALL");
  const [selected, setSelected] = useState(demoCases[10]);
  const [field, setField] = useState<FieldComparison>(demoCases[10].comparison.fields[0]);
  const [mobileApp, setMobileApp] = useState<"EDOC" | "IPMOE">("EDOC");
  const [comment, setComment] = useState("");
  const cases = useMemo(() => demoCases.filter((item) => (result === "ALL" || item.comparison.overallResult === result) && `${item.id} ${item.title}`.toLowerCase().includes(query.toLowerCase())), [query, result]);
  const choose = (item: typeof selected) => {
    setSelected(item);
    setField(item.comparison.fields.find((candidate) => candidate.result !== "MATCH") || item.comparison.fields[0]);
  };

  return <main className={styles.root}>
    <aside className={styles.notice} role="note"><ShieldAlert /><span><b>Demonstration only.</b> Synthetic data and generic prototype rules are used. This product is not connected to CMS, e-Documentation, IPMOE or any live clinical system.</span></aside>
    <section className={styles.workspace} aria-labelledby="workspace-title">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Clinical workspace</p><h2 id="workspace-title">Review the difference, not two complete records.</h2></div><p>30 deterministic synthetic cases. Prototype rules pending approved clinical standards.</p></div>
      <div className={styles.metrics}>{[[30, "Total cases"], [caseCounts.MATCH, "Match"], [caseCounts.REVIEW, "Review required"], [caseCounts.MISMATCH, "Mismatch"]].map(([number, label]) => <article key={String(label)}><b>{number}</b><span>{label}</span></article>)}</div>
      <div className={styles.controls}>
        <label><Search /><span className={styles.sr}>Search cases</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search case or medication" /></label>
        <div role="group" aria-label="Filter by result">{["ALL", "MATCH", "REVIEW", "MISMATCH"].map((value) => <button aria-pressed={result === value} onClick={() => setResult(value)} key={value}>{value}</button>)}</div>
      </div>
      <div className={styles.clinicalGrid}>
        <nav className={styles.caseList} aria-label="Synthetic cases">{cases.map((item) => <button className={selected.id === item.id ? styles.selected : ""} onClick={() => choose(item)} key={item.id}><ResultIcon state={item.comparison.overallResult} /><span><b>{item.id} · {item.title}</b><small>{item.kind} · {item.workflowStatus}</small></span><em data-state={item.comparison.overallResult}>{item.comparison.overallResult}</em><ChevronRight /></button>)}</nav>
        <div className={styles.caseDetail}>
          <div className={styles.caseTitle}><div><p className={styles.eyebrow}>{selected.id} · Synthetic record</p><h3>{selected.title}</h3></div><span data-state={selected.comparison.overallResult}><ResultIcon state={selected.comparison.overallResult} />{selected.comparison.overallResult}</span></div>
          <div className={styles.mobileTabs}>{[["EDOC", "e-Documentation"], ["IPMOE", "IPMOE"]].map(([value, label]) => <button aria-pressed={mobileApp === value} onClick={() => setMobileApp(value as typeof mobileApp)} key={value}>{label}</button>)}</div>
          <div className={styles.apps}><SourceCard title="e-Documentation" record={selected.eDocumentation} hidden={mobileApp !== "EDOC"} /><SourceCard title="IPMOE" record={selected.ipmoe} hidden={mobileApp !== "IPMOE"} /></div>
          <div className={styles.result}><ResultIcon state={selected.comparison.overallResult} /><div><b>{selected.comparison.message}</b><p>Consistency does not establish clinical appropriateness. Required professional verification remains applicable.</p></div></div>
          <div className={styles.inspector}>
            <div className={styles.fieldList}>{selected.comparison.fields.map((candidate) => <button aria-pressed={field.field === candidate.field} onClick={() => setField(candidate)} key={candidate.field}><ResultIcon state={candidate.result} /><span>{candidate.field}</span><small>{candidate.result}</small></button>)}</div>
            <article className={styles.rule}><p className={styles.eyebrow}>Comparison inspector</p><h4>{field.field}</h4><dl><div><dt>e-Documentation</dt><dd>{String(field.eDocumentationValue ?? "Not supplied")}</dd></div><div><dt>IPMOE</dt><dd>{String(field.ipmoeValue ?? "Not supplied")}</dd></div><div><dt>Normalised</dt><dd>{String(field.normalisedEDocumentation ?? "—")} / {String(field.normalisedIpmoe ?? "—")}</dd></div><div><dt>Prototype rule</dt><dd>{field.ruleId} · v{field.ruleVersion}</dd></div><div><dt>Reason</dt><dd>{field.reasonCode}</dd></div></dl><p>{field.explanation}</p><strong>{field.action}</strong></article>
          </div>
          <ReviewPanel comment={comment} setComment={setComment} />
        </div>
      </div>
    </section>
    <section className={styles.orchestration}><p className={styles.eyebrow}>Mock n8n orchestration</p><h2>Coordinates workflow. Never determines clinical correctness.</h2><div className={styles.rail}>{workflow.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b></div>)}</div><label>Generic demonstration escalation timer <select defaultValue="30"><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">60 minutes</option></select></label></section>
    <section className={styles.audit}><p className={styles.eyebrow}>Prototype audit trail</p><h2>Every comparison remains inspectable.</h2><div>{[["Source records", `${selected.eDocumentation.sourceRecordId} / ${selected.ipmoe.sourceRecordId}`], ["Source versions", `${selected.eDocumentation.version} / ${selected.ipmoe.version}`], ["Engine", selected.comparison.engineVersion], ["Rule set", selected.comparison.fields.map((candidate) => `${candidate.ruleId} v${candidate.ruleVersion}`).filter((value, index, all) => all.indexOf(value) === index).join(" · ")], ["Result history", `Received → ${selected.comparison.overallResult}`], ["Reviewer actions", "No clinical decision recorded"], ["Re-run history", "Initial deterministic run"], ["Closure reason", selected.workflowStatus === "Closed" ? "No configured discrepancy detected" : "Open"]].map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b></article>)}</div><p>This is a prototype audit trail; no claim of legal immutability is made.</p></section>
  </main>;
}

function SourceCard({ title, record, hidden }: { title: string; record: any; hidden: boolean }) {
  const values = [["Patient", record.patientId], ["Encounter", record.encounterId], ["Medication", record.medicationName], ["Dose", record.doseValue == null ? "Not supplied" : `${record.doseValue} ${record.doseUnit}`], ["Route", record.route || "Not supplied"], ["Timing", record.scheduledTime || record.intervalMinutes && `${record.intervalMinutes} minutes` || "Not supplied"], ["Status", record.orderStatus], ...(record.isIntravenousFluid ? [["Fluid", record.fluidName], ["Volume", `${record.fluidVolumeMl} mL`], ["Duration", record.infusionDurationMinutes ? `${record.infusionDurationMinutes} minutes` : record.infusionRateMlHour ? `${record.infusionRateMlHour} mL/hour` : "Not supplied"]] : [])];
  return <article className={`${styles.source} ${hidden ? styles.mobileHidden : ""}`}><header><span>Mock application</span><b>{title}</b><small>{record.sourceRecordId} · v{record.version}</small></header><dl>{values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>;
}

function ReviewPanel({ comment, setComment }: { comment: string; setComment: (value: string) => void }) {
  return <aside className={styles.review}><p className={styles.eyebrow}>Human review</p><h4><UserRound /> Authorised workflow actions</h4><div>{["Acknowledge case", "Request clarification", "Documentation requires correction", "IPMOE requires correction", "Unable to determine", "Reassign", "Re-run verification"].map((item) => <button key={item}>{item}</button>)}</div><label>Add comment<textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Synthetic workflow note" /></label><button className={styles.save}>Add comment</button><small>Actions record workflow state only. Corrections occur in the relevant source application.</small></aside>;
}
