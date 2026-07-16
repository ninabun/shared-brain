"use client";

import { useEffect, useState } from "react";
import styles from "./MedicationVerification.module.css";

const FLOW = ["e-Documentation event", "IPMOE event", "Gateway pairs records", "Deterministic comparison", "Dashboard alert", "Staff review"];
const DEFAULT_OUTCOME = "Reviewed — no additional workflow action";

type Acknowledgement = { outcome: string; comment: string; event: string };

export default function MedicationClinicalHeader() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [outcome, setOutcome] = useState(DEFAULT_OUTCOME);
  const [comment, setComment] = useState("");
  const [acknowledgement, setAcknowledgement] = useState<Acknowledgement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setStep((value) => Math.min(value + 1, FLOW.length - 1)), 650);
    return () => clearInterval(id);
  }, []);

  const needsComment = outcome !== DEFAULT_OUTCOME;
  const recordAcknowledgement = () => {
    const retainedComment = comment.trim();
    if (needsComment && !retainedComment) return;
    setAcknowledgement({ outcome, comment: retainedComment, event: `Acknowledgement recorded · DEMO-STAFF-01 · ${outcome}` });
    setOpen(false);
  };
  const stats = [[30, "Active cases"], [10, "New alerts"], [10, "Review required"], [10, "Mismatches"], [2, "Awaiting source"], [acknowledgement ? 1 : 0, "Acknowledged"], [0, "Awaiting correction"], [10, "Closed"]];

  return <section className={styles.clinicalHeader}>
    <div className={styles.clinicalHeaderTop}><div><p className={styles.eyebrow}>Clinical Dashboard · Fictional records</p><h1>Medication verification queue</h1><p>The system detects and explains discrepancies. Healthcare professionals review and acknowledge the result.</p></div><button className={styles.ackPrimary} onClick={() => setOpen(true)}>Acknowledge Review</button></div>
    <div className={styles.dashboardStats}>{stats.map(([number, label]) => <article key={String(label)}><b>{number}</b><span>{label}</span></article>)}</div>
    <div className={styles.eventFlow}>{FLOW.map((item, index) => <div data-active={index <= step} key={item}><span>{index < step ? "✓" : index === step ? "●" : "○"}</span><b>{item}</b></div>)}</div>
    <p className={styles.aiBoundary}><b>AI understands.</b> The Consistency Engine compares. n8n coordinates. Healthcare professionals review and acknowledge.</p>
    {acknowledgement && <div className={styles.ackRecord} aria-live="polite"><p className={styles.eyebrow}>Prototype audit event</p><b>{acknowledgement.event}</b><span>Outcome: {acknowledgement.outcome}</span><span>Comment: {acknowledgement.comment || "No comment entered"}</span><small>Retained in local component state for this demo session only.</small></div>}
    {open && <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><div className={styles.ackModal} role="dialog" aria-modal="true" aria-labelledby="ack-title"><h2 id="ack-title">Acknowledge comparison review</h2><p>You are confirming that you have reviewed the comparison result. This action does not approve the medication order or confirm clinical appropriateness.</p><label>Outcome<select value={outcome} onChange={(event) => setOutcome(event.target.value)}>{[DEFAULT_OUTCOME, "Request prescriber clarification", "e-Documentation may require correction", "IPMOE may require correction", "Unable to determine", "Escalate to designated reviewer"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Comment {needsComment && <span>(required)</span>}<textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Synthetic workflow note" /></label><div><button onClick={() => setOpen(false)}>Cancel</button><button className={styles.ackPrimary} disabled={needsComment && !comment.trim()} onClick={recordAcknowledgement}>Record acknowledgement</button></div><small>Fictional staff ID DEMO-STAFF-01 · Prototype audit event will be recorded.</small></div></div>}
  </section>;
}
