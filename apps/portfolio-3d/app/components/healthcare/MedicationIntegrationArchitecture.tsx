"use client";

import { useState } from "react";
import styles from "./Healthcare.module.css";

const principles = [
  ["Read-only by default", "The verification service retrieves approved data but does not independently alter e-Documentation or IPMOE."],
  ["Approved interfaces only", "Data is exchanged through interfaces authorised by the hospital and system owners. The workflow does not scrape screens or bypass access controls."],
  ["Identity, version and freshness checks", "Patient, encounter, source, record status, timestamp and version must be validated before medication fields are compared."],
  ["Human decision retained", "A match does not declare medication clinically approved, and a discrepancy does not determine which source is correct."]
];

const states = {
  mvp: {
    heading: "Simulated system adapters",
    copy: "The prototype uses a mock e-Documentation adapter and a mock IPMOE adapter. Both provide structured fictional records to the same comparison and orchestration pathway proposed for future integration.",
    chips: ["Synthetic data", "Mock adapters", "No live clinical connection", "Local deterministic comparison"],
    sources: ["Mock e-Documentation", "Mock IPMOE"], final: "Simulated human review"
  },
  future: {
    heading: "Hospital-approved integration services",
    copy: "In a hospital deployment, the mock adapters would be replaced by approved interfaces operating within the hospital’s technical and governance boundaries.",
    chips: ["Approved interfaces", "Read-only service access", "Hospital network boundary", "Role-based access", "Monitored workflow", "Formal downtime pathway"],
    sources: ["Authorised e-Documentation interface", "Authorised IPMOE interface"], final: "Authorised clinical review"
  }
} as const;

function Connector({ label }: { label?: string }) { return <div className={styles.integrationConnector} aria-hidden="true"><span>{label}</span></div>; }

export default function MedicationIntegrationArchitecture() {
  const [mode, setMode] = useState<keyof typeof states>("mvp");
  const state = states[mode];
  function handleKey(event: React.KeyboardEvent<HTMLButtonElement>, next: keyof typeof states) {
    if (["Enter", " ", "Spacebar", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault(); setMode(next);
    }
  }
  return <>
    <div className={styles.integrationDiagram} aria-label="Medication verification integration architecture">
      <div className={styles.integrationSources}>
        <article className={styles.integrationCard}><span className={styles.previewLabel}>System of record</span><h3>e-Documentation</h3><p>Approved medication plan and documentation version.</p></article>
        <article className={styles.integrationCard}><span className={styles.previewLabel}>System of record</span><h3>IPMOE</h3><p>Active medication orders and current order version.</p></article>
      </div>
      <Connector label="Approved integration interfaces" />
      <div className={styles.interfaceChips}>{["API","HL7/FHIR","Integration engine","Read-only data service"].map(x=><span key={x}>{x}</span>)}</div>
      <Connector />
      <article className={`${styles.integrationCard} ${styles.integrationEngine}`}><span className={styles.previewLabel}>External read-only reconciliation layer</span><h3>Medication Consistency Engine</h3><ul><li>Validate identity and encounter</li><li>Normalise medication fields</li><li>Compare current versions</li><li>Classify discrepancies</li></ul></article>
      <Connector />
      <article className={`${styles.integrationCard} ${styles.integrationOrchestration}`}><span className={styles.previewLabel}>Operational coordination layer</span><h3>n8n Orchestration</h3><div className={styles.interfaceChips}>{["Assign reviewer","Notify","Wait","Escalate","Log"].map(x=><span key={x}>{x}</span>)}</div></article>
      <Connector label="Human approval when required" />
      <article className={`${styles.integrationCard} ${styles.integrationHuman}`}><h3>Healthcare Professional</h3><p>Reviews the discrepancy and makes the authorised clinical decision.</p></article>
    </div>

    <div className={styles.integrationPrinciples}>{principles.map(([title, copy])=><article className={styles.card} key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>

    <div className={styles.deploymentPanel}>
      <div className={styles.segmentedControl} role="tablist" aria-label="Integration deployment state">
        <button type="button" role="tab" aria-selected={mode==="mvp"} aria-controls="integration-state" id="integration-mvp" tabIndex={mode==="mvp"?0:-1} onClick={()=>setMode("mvp")} onKeyDown={event=>handleKey(event,"mvp")}>Current MVP</button>
        <button type="button" role="tab" aria-selected={mode==="future"} aria-controls="integration-state" id="integration-future" tabIndex={mode==="future"?0:-1} onClick={()=>setMode("future")} onKeyDown={event=>handleKey(event,"future")}>Future hospital integration</button>
      </div>
      <div id="integration-state" role="tabpanel" aria-labelledby={mode==="mvp"?"integration-mvp":"integration-future"} tabIndex={0}>
        <span className={styles.previewLabel}>{mode==="mvp"?"Current MVP state":"Future deployment state"}</span><h3>{state.heading}</h3><p>{state.copy}</p>
        <div className={styles.interfaceChips}>{state.chips.map(x=><span key={x}>{x}</span>)}</div>
        <div className={styles.deploymentFlow}><div><b>{state.sources[0]}</b><b>{state.sources[1]}</b></div><span>→</span><b>Consistency Engine</b><span>→</span><b>n8n</b><span>→</span><b>{state.final}</b></div>
      </div>
    </div>

    <p className={styles.integrationSafety}><strong>Clinical safety boundary.</strong> e-Documentation and IPMOE remain the systems of record. The service compares records but does not determine which record is clinically correct, alter documentation or orders, or label a match safe, approved or ready to administer. Clinical verification remains a human responsibility.</p>
  </>;
}
