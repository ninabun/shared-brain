"use client";

import { AlertTriangle, Check, ChevronDown, Database, Network, ShieldCheck } from "lucide-react";
import styles from "./MedicationVerification.module.css";

const interfaceOptions = ["Internal API", "HL7 message", "FHIR interface or event subscription", "Hospital integration engine", "Governed read-only data service"];
const gatewayTasks = ["Source authentication", "Schema validation", "Patient matching", "Encounter matching", "Medication-event pairing", "Timestamp validation", "Source-version validation", "Duplicate-event detection", "Readiness checking", "Error handling"];
const engineTasks = ["Clinical field normalisation", "Medication comparison", "Dose comparison", "Route comparison", "Frequency and timing comparison", "IVF comparison", "Status comparison", "Rule-based classification"];
const n8nTasks = ["Case creation", "Dashboard routing", "Reviewer assignment", "Notification", "Wait for acknowledgement", "Reminder", "Escalation", "Re-comparison trigger", "Audit logging"];
const deployments = [["Event or message integration", "Real-time or near-real-time source events trigger automatic comparison."], ["Approved read-only APIs", "The integration gateway retrieves the latest authorised source records."], ["Hospital integration engine", "Existing hospital middleware standardises and forwards source information."], ["Controlled scheduled extract", "Suitable for early non-real-time pilots, but not presented as the preferred final clinical model."]];
const readiness = ["Approved access to both source systems", "Reliable event trigger", "Patient and encounter identifiers", "Medication-event pairing", "Structured versus free-text data", "Record status", "Source timestamps", "Source versions", "Duplicate handling", "Interface downtime", "Security and service accounts", "Network boundary", "Audit ownership", "Rule ownership", "Workflow fallback"];

function TaskList({items}:{items:string[]}) { return <ul className={styles.integrationTaskList}>{items.map(item=><li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul>; }
function Arrow() { return <span className={styles.integrationArrow} aria-hidden="true">→</span>; }

export default function RealWorldIntegration() { return <section id="real-world-integration" className={styles.realWorldIntegration} aria-labelledby="real-world-title">
  <div className={styles.integrationIntro}><p className={styles.eyebrow}>Real-world Integration</p><h2 id="real-world-title">Can Medication Verification connect safely with e-Documentation and IPMOE?</h2><p>Medication Verification is only viable in clinical practice when e-Documentation and IPMOE can provide authorised, timely and version-controlled data through the hospital’s approved integration architecture.</p><strong>The clinical dashboard is the visible review layer. The integration pathway is what makes automated comparison operationally possible.</strong></div>
  <div className={styles.realArchitecture} aria-label="Proposed real-world medication verification architecture">
    <article className={styles.archNode}><span>01</span><b>Doctor</b></article><Arrow/><article className={styles.archNode}><span>02 · Sources</span><b>e-Documentation + IPMOE</b><small>Authorised current records</small></article><Arrow/>
    <article className={`${styles.archNode} ${styles.interfaceNode}`}><span>03 · Possible interfaces</span><b>Approved Hospital Integration Interface</b><div>{interfaceOptions.map(x=><em key={x}>{x}</em>)}</div><small>Final interface depends on source-system capability, vendor support and hospital approval.</small></article><Arrow/>
    <article className={`${styles.archNode} ${styles.detailedNode}`}><Network/><span>04 · Validation layer</span><b>Integration Gateway</b><TaskList items={gatewayTasks}/></article><Arrow/>
    <article className={`${styles.archNode} ${styles.detailedNode}`}><Database/><span>05 · Deterministic layer</span><b>Clinical Consistency Engine</b><TaskList items={engineTasks}/></article><Arrow/>
    <article className={`${styles.archNode} ${styles.detailedNode}`}><ShieldCheck/><span>06 · Orchestration</span><b>n8n Workflow</b><TaskList items={n8nTasks}/></article><Arrow/>
    <article className={styles.archNode}><span>07 · Review layer</span><b>Medication Verification Dashboard</b></article><Arrow/><article className={`${styles.archNode} ${styles.humanNode}`}><span>08 · Human authority</span><b>Healthcare Professional Acknowledgement</b></article>
  </div>
  <div className={styles.integrationCards}>{deployments.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  <article className={styles.scrapingWarning}><AlertTriangle/><div><h3>Screen scraping is not the proposed production model</h3><p>Medication Verification should not depend on uncontrolled screen scraping or consumer-style RPA to copy clinical information from e-Documentation and IPMOE. Production integration requires approved machine interfaces, source authentication, version control and monitored failure handling.</p></div></article>
  <details className={styles.readinessChecklist}><summary><span><small>Real-world readiness checklist</small>What must be resolved before clinical deployment</span><ChevronDown aria-hidden="true"/></summary><div>{readiness.map(item=><label key={item}><span aria-hidden="true"/>{item}</label>)}</div></details>
  <div className={styles.statusComparison}><article><span>Current state</span><h3>Prototype</h3><TaskList items={["Mock e-Documentation", "Mock IPMOE", "Synthetic events", "Generic rules", "Local comparison", "No clinical connection"]}/></article><article><span>Conditional future state</span><h3>Potential hospital deployment</h3><TaskList items={["Approved source interfaces", "Hospital integration gateway", "Version-controlled comparison engine", "Hospital-hosted n8n", "Authorised clinical dashboard", "Formal governance and downtime procedures"]}/></article></div>
  <blockquote className={styles.integrationFinal}>“If authorised source interfaces are available, the product is technically achievable. Without reliable access to current source records, it must remain a prototype.”</blockquote>
</section>; }
