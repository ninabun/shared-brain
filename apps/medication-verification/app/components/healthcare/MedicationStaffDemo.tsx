"use client";
import {useEffect,useState} from "react";
import MedicationVerificationPage from "./MedicationVerificationPage";
import MedicationClinicalHeader from "./MedicationClinicalHeader";
import styles from "./MedicationVerification.module.css";
const KEY="wingyee-medication-demo-entered";
export default function MedicationStaffDemo(){
 const [entered,setEntered]=useState(false); const [role,setRole]=useState("Staff Nurse");
 useEffect(()=>setEntered(sessionStorage.getItem(KEY)==="true"),[]);
 useEffect(()=>{if(entered)requestAnimationFrame(()=>window.scrollTo(0,0))},[entered]);
 const enter=()=>{sessionStorage.setItem(KEY,"true");setEntered(true)};
 const reset=()=>{sessionStorage.removeItem(KEY);setEntered(false);location.hash=""};
 if(entered)return <><div className={styles.demoUtility}><a href="/projects/healthcare-workflow-intelligence/medication-verification">← Product overview</a><span>Demo role: {role}</span><button onClick={reset}>Reset Demo</button></div><MedicationClinicalHeader/><div className={styles.demoWorkspace}><MedicationVerificationPage/></div></>;
 return <main className={styles.entry}><div className={styles.entryCard}><p className={styles.eyebrow}>Interactive staff application · Synthetic data only</p><h1>Medication Verification</h1><p>Automatically compare simulated e-Documentation and IPMOE records, review discrepancies and experience the complete acknowledgement workflow.</p><div className={styles.entryMetrics}>{[[30,"Demonstration cases"],[10,"Matches"],[10,"Review required"],[10,"Mismatches"]].map(([n,l])=><article key={String(l)}><b>{n}</b><span>{l}</span></article>)}</div><aside><b>Demonstration only.</b> Synthetic data · Generic prototype rules · No live clinical connection.</aside><fieldset><legend>Choose a demonstration role</legend>{["Staff Nurse","Workflow Reviewer"].map(x=><label key={x}><input type="radio" name="role" checked={role===x} onChange={()=>setRole(x)}/>{x}</label>)}</fieldset><div className={styles.entryActions}><button onClick={enter}>Enter Clinical Dashboard</button><a href="/projects/healthcare-workflow-intelligence/medication-verification#product-story">View How It Works</a></div><div className={styles.quickDemo}><span>Quick demo</span><button onClick={enter}>Try a Match</button><button onClick={enter}>Try a Review Case</button><button onClick={enter}>Try a Mismatch</button></div></div></main>
}
