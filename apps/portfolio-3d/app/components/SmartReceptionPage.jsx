"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing, CheckCircle2, ClipboardList, GitBranch, MonitorPlay, Route, ShieldCheck, Tablet } from "lucide-react";
import HeroMotionBar from "./HeroMotionBar";

const navItems = [
  { label: "Solutions", href: "/#platform" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
const oldWorkflow = ["Visitor looks for staff", "Interrupts nurse", "Nurse clarifies request", "Nurse redirects visitor", "Workflow interrupted", "Response delayed"];
const newWorkflow = ["Visitor", "Digital Reception", "AI Routing Logic", "Correct Staff", "Notification", "Response", "Minimal interruption"];
const values = [
  ["Reduce interruptions", "Low-value enquiries can be captured before they reach clinical staff."],
  ["Standardise communication", "Visitors follow a consistent pathway instead of guessing who to ask."],
  ["Improve efficiency", "Clinical teams spend less time redirecting routine requests."],
  ["Support transformation", "A repeated communication problem becomes a scalable workflow layer."],
];
const evidence = [
  ["Clear entry point", "The interface collects the visitor need before escalation."],
  ["Routed response", "AI-assisted logic sends requests toward the right role or pathway."],
  ["Human oversight", "Staff remain responsible for response, prioritisation and judgement."],
];
const technology = ["Digital Reception", "AI Routing Logic", "Tablet Interface", "Notification Workflow", "Human Review", "React", "Next.js", "Workflow Design"];

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f9fb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,139,255,0.16),transparent_28%),radial-gradient(circle_at_18%_70%,rgba(99,230,216,0.14),transparent_30%),linear-gradient(180deg,#F7FAFC_0%,#EEF4F8_52%,#E6EEF5_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(120,170,200,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)] [background-size:132px_132px]" />
      <motion.div className="absolute left-[8%] top-[28%] h-px w-[84%] rotate-[4deg] bg-gradient-to-r from-transparent via-[#63E6D8]/22 to-transparent" animate={{ x: ["4%", "-4%", "4%"], opacity: [0.16, 0.48, 0.16] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[10%] top-[24%] h-64 w-64 rounded-full bg-[#63E6D8]/12 blur-3xl" animate={{ scale: [1.04, 0.92, 1.04], opacity: [0.26, 0.52, 0.26] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 text-[#1b2430]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/" className="rounded-full border border-white/50 bg-white/34 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(8,18,28,0.14)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition hover:bg-white/50">
          Wing Yee AI Lab
        </a>
        <div className="hidden items-center gap-2.5 text-[13px] text-[#1b2430]/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full border border-white/48 bg-white/32 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_34px_rgba(7,15,28,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/50 hover:text-[#1b2430]"
            >
              {item.label}
            </a>
          ))}
        </div></nav>
    </header>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[2.1rem] border border-white/70 bg-white/42 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_10px_12px_28px_rgba(255,255,255,0.22),inset_-14px_-18px_34px_rgba(83,112,128,0.09),0_24px_80px_rgba(40,70,88,0.11)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl ${className}`}>
      <span className="pointer-events-none absolute left-8 right-12 top-3 h-5 rounded-full bg-white/38 blur-md" />
      {children}
    </div>
  );
}

function Section({ eyebrow, title, children, className = "" }) {
  return (
    <motion.section className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-18 text-[#1b2430] sm:px-8 sm:py-24 lg:px-12 ${className}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-18%" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <p className="mb-5 text-sm font-medium uppercase tracking-[0.26em] text-[#2f8396]/82 sm:text-base">{eyebrow}</p>
      <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#1b2430] sm:text-5xl">{title}</h2>
      <div className="mt-12">{children}</div>
    </motion.section>
  );
}

function WorkflowColumn({ title, items, accent }) {
  return (
    <GlassCard className="p-6">
      <p className="text-sm uppercase tracking-[0.22em] text-[#526170]/68">{title}</p>
      <div className="mt-7 space-y-3">
        {items.map((item, index) => (
          <motion.div key={item} className="flex items-center gap-4 rounded-2xl border border-white/72 bg-white/38 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]" initial={{ opacity: 0, x: title === "Old Workflow" ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${accent}`}>{index + 1}</span>
            <span className="text-base text-[#334155]/84">{item}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

export default function SmartReceptionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <Background />
      <Header />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-16 pt-28 text-center sm:px-8 lg:px-12">
<motion.p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2f8396]/78" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.04 }}>
          Clinical Operations
        </motion.p>
        <motion.h1 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-7xl lg:text-8xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          Smart Reception
        </motion.h1>
        <motion.p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#526170]/86 sm:text-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>
          A healthcare workflow optimisation solution that routes visitor enquiries before they interrupt clinical staff.
        </motion.p>
        <motion.div className="mx-auto mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26 }}>
          {["Reduce interruption", "Standardise routing", "Improve visitor clarity"].map((item) => (
            <div key={item} className="rounded-full border border-white/64 bg-white/46 px-5 py-3 text-sm font-medium text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</div>
          ))}
        </motion.div>
              <HeroMotionBar accent="#2f8396" label="Reception rhythm" detail="Visitor request signal" />
      </section>

      <Section eyebrow="Healthcare Problem" title="Frontline teams are interrupted by unclear requests.">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Repeated interruption", "Clinical staff are pulled away by enquiries that may not need a nurse."],
            ["Unclear pathways", "Visitors often do not know whether to ask reception, nurses or another team."],
            ["Inconsistent response", "Similar requests can be handled differently depending on who is approached."],
          ].map(([title, body]) => (
            <GlassCard key={title} className="p-6 transition duration-500 hover:-translate-y-1.5 hover:bg-white/54">
              <BellRing className="text-[#2f8396]" size={24} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Workflow Transformation" title="From visitor uncertainty to routed communication.">
        <div className="grid gap-5 lg:grid-cols-2">
          <WorkflowColumn title="Old Workflow" items={oldWorkflow} accent="bg-[#526170]/12 text-[#526170]" />
          <WorkflowColumn title="New Workflow" items={newWorkflow} accent="bg-[#2f8396] text-white" />
        </div>
      </Section>

      <Section eyebrow="Experience The Workflow" title="A product demo space for visitor routing.">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="min-h-[360px] p-6">
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#2f8396]/22 bg-white/32 text-center">
              <MonitorPlay className="text-[#2f8396]" size={38} strokeWidth={1.5} />
              <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Demo Video</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#526170]/78">Visitor request capture, AI routing, staff notification and response tracking.</p>
            </div>
          </GlassCard>
          <div className="grid gap-5">
            {[["Outside Visitor Interface", Tablet], ["Inside Staff Dashboard", ClipboardList], ["Routing Logic", Route]].map(([title, Icon]) => (
              <GlassCard key={title} className="flex items-center justify-between gap-5 p-6">
                <div><p className="text-xl font-semibold tracking-[-0.035em]">{title}</p><p className="mt-2 text-sm text-[#526170]/72">Workflow module</p></div>
                <Icon className="text-[#2f8396]" size={24} strokeWidth={1.6} />
              </GlassCard>
            ))}
          </div>
        </div>
        <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white">Live Demo Coming Soon <ArrowRight size={15} /></span>
      </Section>

      <Section eyebrow="Operational Value" title="What should hospital management care about?">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, body]) => (
            <GlassCard key={title} className="p-6">
              <CheckCircle2 className="text-[#2f8396]" size={24} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Evidence" title="The value is visible in the workflow design.">
        <div className="grid gap-5 lg:grid-cols-3">
          {evidence.map(([title, body]) => (
            <GlassCard key={title} className="p-6">
              <ShieldCheck className="text-[#2f8396]" size={24} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Technology exists to protect clinical attention.">
        <div className="flex flex-wrap gap-3">
          {technology.map((item) => <span key={item} className="rounded-full border border-white/68 bg-white/44 px-5 py-3 text-sm font-medium text-[#526170]/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_28px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</span>)}
        </div>
      </Section>

      <Section eyebrow="Future Direction" title="From smart reception to hospital communication layer.">
        <GlassCard className="max-w-5xl p-8">
          <GitBranch className="text-[#2f8396]" size={28} strokeWidth={1.6} />
          <p className="mt-8 max-w-4xl text-xl leading-9 text-[#526170]/84">The next version can support multilingual visitor guidance, role-based escalation, request tracking, service analytics and integration with hospital communication workflows.</p>
        </GlassCard>
      </Section>
    </main>
  );
}
