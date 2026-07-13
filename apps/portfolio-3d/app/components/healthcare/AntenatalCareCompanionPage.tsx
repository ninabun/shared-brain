"use client";

import { motion } from "framer-motion";
import { Baby, CalendarDays, Check, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import { Shell } from "./Shared";

const journey = [
  { week: "15", label: "Now", detail: "Current week", icon: Baby },
  { week: "20", label: "10 Aug", detail: "Morphology scan", icon: CalendarDays },
  { week: "28", label: "Sep", detail: "Blood screening", icon: HeartPulse },
  { week: "36", label: "Nov", detail: "GBS screening", icon: Stethoscope },
];

function AntenatalHeroVisual() {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/55 p-5 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_28px_90px_rgba(50,76,92,.14)] ring-1 ring-[#243446]/5 backdrop-blur-2xl sm:p-7"
      initial={{ opacity: 0, x: 28, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Animated antenatal journey and governed clinical response workflow"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#8b7bff]/20 blur-3xl"
        animate={{ scale: [0.94, 1.14, 0.94], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#63d9bd]/18 blur-3xl"
        animate={{ scale: [1.08, 0.9, 1.08], opacity: [0.28, 0.55, 0.28] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#6558d1]">Personalised journey</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1b2430] sm:text-[1.7rem]">Your pregnancy timeline</h2>
            <p className="mt-2 text-sm text-[#5d6d7a]">Approved guidance, timed to your gestation.</p>
          </div>
          <motion.div
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#8b7bff,#6d5ed8)] text-center text-white shadow-[0_12px_34px_rgba(110,94,216,.3)]"
            animate={{ y: [0, -5, 0], boxShadow: ["0 12px 28px rgba(110,94,216,.22)", "0 18px 42px rgba(110,94,216,.42)", "0 12px 28px rgba(110,94,216,.22)"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span><b className="block text-xl leading-5">15</b><small className="text-[9px] font-bold uppercase tracking-wider text-white/80">weeks</small></span>
          </motion.div>
        </div>

        <div className="relative mt-8 grid grid-cols-4 gap-2">
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-[19px] h-px bg-[#b9c7cd]" />
          <motion.div
            aria-hidden="true"
            className="absolute top-[16px] z-20 h-[7px] w-[7px] rounded-full bg-[#32ad91] shadow-[0_0_16px_rgba(50,173,145,.75)]"
            animate={{ left: ["8%", "90%"] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {journey.map(({ week, label, detail, icon: Icon }, index) => (
            <motion.div
              key={week}
              className="relative z-10 min-w-0 text-center"
              animate={{ y: [0, index % 2 ? -3 : 3, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 }}
            >
              <span className={`mx-auto grid h-10 w-10 place-items-center rounded-full border ${index === 0 ? "border-[#7868e2] bg-[#7868e2] text-white" : "border-[#c7c0f1] bg-white/90 text-[#6558d1]"}`}><Icon size={17} strokeWidth={1.8} /></span>
              <b className="mt-3 block text-xs text-[#1b2430]">Week {week}</b>
              <small className="mt-1 block truncate text-[10px] font-semibold text-[#6558d1]">{label}</small>
              <small className="mt-1 hidden text-[10px] leading-4 text-[#687986] sm:block">{detail}</small>
            </motion.div>
          ))}
        </div>

        <div className="mt-7 rounded-[1.45rem] border border-[#dce8e5] bg-[#f5fbf9]/90 p-4 shadow-[inset_0_1px_0_white]">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#267966]">Governed response</p><p className="mt-1 text-sm font-semibold text-[#21322f]">Concern pathway</p></div>
            <span className="rounded-full bg-[#e3f4ef] px-3 py-1 text-[10px] font-bold text-[#267966]">Clinician-led</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["Concern structured", "Clinical task created", "Midwife review"].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-white bg-white/80 px-3 py-2.5 text-[11px] font-medium text-[#526170] shadow-sm"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.55 + index * 0.16 }}
              ><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dff3ed] text-[#267966]"><Check size={12} strokeWidth={2.4} /></span>{item}</motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[#6558d1]"><ShieldCheck size={15} />AI supports the workflow. Clinical decisions remain human.</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AntenatalCareCompanionPage() {
  return (
    <Shell>
      <section className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
        <motion.p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2f8396]/78" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.04 }}>Care Experience</motion.p>
        <motion.h1 className="mx-auto mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>Personalised guidance throughout the antenatal journey.</motion.h1>
        <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#526170]/86 sm:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>Gestation-specific information, investigation schedules and approved education — with a governed pathway for raising clinical concerns.</motion.p>
        <motion.div className="mx-auto mt-5 grid w-full max-w-4xl gap-2 sm:grid-cols-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26 }}>
          {["Personalised timeline", "Approved guidance", "Clinician-led escalation"].map((item) => (
            <div key={item} className="rounded-full border border-white/64 bg-white/46 px-5 py-3 text-sm font-medium text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</div>
          ))}
        </motion.div>
        <div className="mx-auto mt-5 w-full max-w-5xl text-left"><AntenatalHeroVisual /></div>
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3">
          <a className="inline-flex items-center rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]" href="https://antenatal-care-companion.vercel.app/" target="_blank" rel="noreferrer">Open Live Demo</a>
          <span className="max-w-xl text-left text-xs leading-5 text-[#74551f]"><b>Safety boundary: </b>The app supports information and escalation. Clinical decisions remain with healthcare professionals.</span>
        </div>
      </section>
    </Shell>
  );
}
