"use client";
import {useEffect,useState} from "react";
import MedicationVerificationPage from "./MedicationVerificationPage";
import styles from "./MedicationVerification.module.css";
const KEY="wingyee-medication-demo-entered";
export default function MedicationStaffDemo(){
 const [entered,setEntered]=useState(false); const [role,setRole]=useState("Staff Nurse");
 useEffect(()=>setEntered(sessionStorage.getItem(KEY)==="true"),[]);
 const enter=()=>{sessionStorage.setItem(KEY,"true");setEntered(true)};
 const reset=()=>{sessionStorage.removeItem(KEY);setEntered(false);location.hash=""};
 if(entered)return <><div className={styles.demoUtility}><a href="/projects/medication-verification">← Product overview</a><span>Demo role: {role}</span><button onClick={reset}>Reset Demo</button></div><div className={styles.demoWorkspace}><MedicationVerificationPage/></div></>;
 return <main className={styles.entry}><div className={styles.entryCard}><p className={styles.eyebrow}>Interactive staff application · Synthetic data only</p><h1>Medication Consistency Verification</h1><p>Compare simulated e-Documentation and IPMOE records, identify discrepancies and experience how n8n coordinates review, escalation and audit logging.</p><div className={styles.entryMetrics}>{[[10,"No configured discrepancy detected"],[10,"Review required"],[10,"Mismatch detected"]].map(([n,l])=><article key={String(l)}><b>{n}</b><span>{l}</span></article>)}</div><aside><b>Demonstration only.</b> All names, identifiers, medication records and workflow rules are fictional. This application is not connected to CMS, e-Documentation, IPMOE or any live clinical system.</aside><fieldset><legend>Choose a demonstration role</legend>{["Staff Nurse","Workflow Reviewer"].map(x=><label key={x}><input type="radio" name="role" checked={role===x} onChange={()=>setRole(x)}/>{x}</label>)}</fieldset><div className={styles.entryActions}><button onClick={enter}>Enter Staff Workspace</button><a href="/projects/medication-verification#product-story">How the Demo Works</a></div><div className={styles.quickDemo}><span>Quick demo</span><button onClick={enter}>Try a Match</button><button onClick={enter}>Try a Review Case</button><button onClick={enter}>Try CASE-X05 Mismatch</button></div></div></main>
}
