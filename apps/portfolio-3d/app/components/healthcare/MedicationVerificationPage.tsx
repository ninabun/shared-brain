"use client";

import { MotionConfig, motion } from "framer-motion";
import { Check, FileText, Pill, ShieldCheck, UserRound } from "lucide-react";
import { Shell } from "./Shared";

const sources = [
  { label: "e-Documentation", detail: "Documented medication plan", icon: FileText },
  { label: "IPMOE", detail: "Current medication order", icon: Pill },
];

function MedicationHeroVisual() {
  return <motion.div className="relative w-full overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/55 p-5 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_28px_90px_rgba(50,76,92,.14)] ring-1 ring-[#243446]/5 backdrop-blur-2xl sm:p-7" initial={{opacity:0,x:28,scale:.97}} animate={{opacity:1,x:0,scale:1}} transition={{duration:.9,delay:.28,ease:[.22,1,.36,1]}} aria-label="Animated medication consistency verification workflow">
    <motion.div aria-hidden="true" className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#8b7bff]/20 blur-3xl" animate={{scale:[.94,1.14,.94],opacity:[.35,.7,.35]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}/>
    <motion.div aria-hidden="true" className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#63d9bd]/18 blur-3xl" animate={{scale:[1.08,.9,1.08],opacity:[.28,.55,.28]}} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}/>
    <div className="relative z-10">
      <div className="flex items-start justify-between gap-5"><div><p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#6558d1]">Read-only comparison</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] sm:text-[1.7rem]">Medication consistency check</h2><p className="mt-2 text-sm text-[#5d6d7a]">Current, authorised source records remain the systems of record.</p></div><motion.div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#8b7bff,#6d5ed8)] text-white shadow-[0_12px_34px_rgba(110,94,216,.3)]" animate={{y:[0,-5,0]}} transition={{duration:3.4,repeat:Infinity,ease:"easeInOut"}}><ShieldCheck size={26}/></motion.div></div>
      <div className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {sources.map(({label,detail,icon:Icon},index)=><div key={label} style={{display:"contents"}}><motion.article className="rounded-[1.25rem] border border-white bg-white/80 p-4 text-center shadow-sm" animate={{y:[0,index?-3:3,0]}} transition={{duration:4.2,repeat:Infinity,ease:"easeInOut",delay:index*.28}}><span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-[#c7c0f1] bg-white text-[#6558d1]"><Icon size={18}/></span><b className="mt-3 block text-sm">{label}</b><small className="mt-1 block text-[10px] leading-4 text-[#687986]">{detail}</small></motion.article>{index===0&&<div className="relative h-px w-10 bg-[#b9c7cd] sm:w-16"><motion.span className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[#32ad91] shadow-[0_0_16px_rgba(50,173,145,.75)]" animate={{left:[0,"calc(100% - 7px)"]}} transition={{duration:2.8,repeat:Infinity,ease:"easeInOut"}}/></div>}</div>)}
      </div>
      <div className="mt-5 rounded-[1.45rem] border border-[#dce8e5] bg-[#f5fbf9]/90 p-4 shadow-[inset_0_1px_0_white]"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#267966]">Human-governed result</p><p className="mt-1 text-sm font-semibold">Exception review pathway</p></div><span className="rounded-full bg-[#e3f4ef] px-3 py-1 text-[10px] font-bold text-[#267966]">Clinician-led</span></div><div className="mt-3 grid gap-2 sm:grid-cols-3">{["Fields normalised","Difference classified","Reviewer assigned"].map((item,index)=><motion.div key={item} className="flex items-center gap-2 rounded-xl border border-white bg-white/80 px-3 py-2.5 text-[11px] font-medium text-[#526170] shadow-sm" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.55,delay:.55+index*.16}}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dff3ed] text-[#267966]"><Check size={12} strokeWidth={2.4}/></span>{item}</motion.div>)}</div><div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[#6558d1]"><UserRound size={15}/>The system checks consistency. Healthcare professionals determine correctness.</div></div>
    </div>
  </motion.div>;
}

export default function MedicationVerificationPage() {
  return (
    <MotionConfig reducedMotion="user">
      <Shell>
        <section className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
          <motion.p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2f8396]/78" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.04 }}>
            Clinical Operations
          </motion.p>
          <motion.h1 className="mx-auto mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            Medication Consistency Verification
          </motion.h1>
          <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#526170]/86 sm:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>
            A read-only layer that compares medication records and routes exceptions for authorised human review.
          </motion.p>
          <motion.div className="mx-auto mt-5 grid w-full max-w-4xl gap-2 sm:grid-cols-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26 }}>
            {["Read-only comparison", "Human review", "Traceable workflow"].map((item) => (
              <div key={item} className="rounded-full border border-white/64 bg-white/46 px-5 py-3 text-sm font-medium text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</div>
            ))}
          </motion.div>
          <div className="mx-auto mt-5 w-full max-w-5xl text-left"><MedicationHeroVisual /></div>
          <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3">
            <a className="inline-flex items-center rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]" href="https://staging-six-alpha.vercel.app/" target="_blank" rel="noreferrer">Open Live Demo</a>
            <span className="max-w-xl text-left text-xs leading-5 text-[#74551f]"><b>Safety boundary: </b>The product highlights differences. Healthcare professionals retain clinical judgement.</span>
          </div>
        </section>
      </Shell>
    </MotionConfig>
  );
}
