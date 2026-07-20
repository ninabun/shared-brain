"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, CalendarDays, CheckCircle2, ClipboardList, GitBranch, MonitorPlay, ShieldCheck, SlidersHorizontal, UsersRound } from "lucide-react";
import TechnologyExplainer from "./TechnologyExplainer";

const navItems = [
  { label: "Solutions", href: "/#platform" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
const oldWorkflow = ["Requests collected", "Manual spreadsheet", "Manager balances duties", "One change creates rework", "Roster delayed"];
const newWorkflow = ["Staff and requests", "Rostering criteria", "AI-assisted logic", "Draft roster", "Manager review", "Ready to share"];
const values = [
  ["Reduce rework", "Managers review structured roster options instead of rebuilding from scratch."],
  ["Improve fairness", "Rules, requests and workload balance become visible before approval."],
  ["Standardise planning", "Departments apply clear criteria instead of informal manual habits."],
  ["Support transformation", "A repeated operational task becomes a scalable digital workflow."],
];
const evidence = [
  ["Request-aware", "Leave, fixed duties and preferences are handled inside the workflow."],
  ["Criteria-based", "Coverage, sequence and staff mix can be configured by department."],
  ["Manager-controlled", "Automation supports planning while keeping final review human."],
];
const technology = [
  { name: "Workflow Logic", purpose: "Turns staff availability, requests and coverage needs into a repeatable sequence for generating a draft roster." },
  { name: "Rules Engine", purpose: "Applies department criteria consistently and flags conflicts before a manager reviews the proposed schedule." },
  { name: "CSV Export", purpose: "Moves roster data into common operational tools for further checking, reporting or controlled distribution." },
  { name: "Print / PDF", purpose: "Creates a stable, shareable roster format for noticeboards, meetings and offline operational use." },
  { name: "Codex", purpose: "Supports rapid development and refinement of the prototype while the workflow remains governed by human requirements." },
  { name: "HTML", purpose: "Provides the semantic structure for staff inputs, roster tables and management review screens." },
  { name: "CSS", purpose: "Makes complex schedule information readable across desktop, tablet, print and PDF layouts." },
  { name: "JavaScript", purpose: "Runs the interactive validation, roster generation and export behaviours directly in the browser." },
];

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f9fb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,139,255,0.18),transparent_28%),radial-gradient(circle_at_78%_34%,rgba(99,230,216,0.1),transparent_28%),linear-gradient(180deg,#F7FAFC_0%,#EEF4F8_52%,#E6EEF5_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(120,170,200,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)] [background-size:132px_132px]" />
      <motion.div className="absolute left-[10%] top-[22%] h-px w-[80%] rotate-[-6deg] bg-gradient-to-r from-transparent via-[#4F8BFF]/20 to-transparent" animate={{ x: ["-4%", "5%", "-4%"], opacity: [0.16, 0.48, 0.16] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[12%] left-[16%] h-56 w-56 rounded-full bg-[#4F8BFF]/12 blur-3xl" animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.28, 0.55, 0.28] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
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
      <p className="mb-5 text-sm font-medium uppercase tracking-[0.26em] text-[#4F8BFF]/82 sm:text-base">{eyebrow}</p>
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

function RosterHeroVisual() {
  const staff = ["RN Lee", "RM Chan", "EN Ho", "SN Wong"];
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const shifts = ["AM", "PM", "N", "OFF", "AM", "PM", "OFF", "N", "AM", "PM", "AM", "OFF", "PM", "N", "AM", "OFF", "AM", "PM", "N", "OFF", "AM", "PM", "AM", "N", "OFF", "PM", "AM", "OFF"];
  const constraints = ["Leave request", "Night sequence", "Skill mix"];

  return (
    <motion.div
      className="relative mx-auto mt-5 w-full max-w-6xl overflow-hidden rounded-[2.6rem] border border-white/72 bg-[linear-gradient(145deg,rgba(255,255,255,0.52),rgba(222,236,246,0.34))] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_16px_18px_38px_rgba(255,255,255,0.25),inset_-18px_-22px_42px_rgba(80,100,120,0.1),0_28px_90px_rgba(40,70,88,0.13)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl sm:p-5"
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(79,139,255,0.15),transparent_42%)]" />
      <motion.div
        className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-transparent via-[#4F8BFF]/12 to-transparent"
        animate={{ x: ["-30%", "760%", "-30%"], opacity: [0, 0.75, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[18%] top-[16%] h-24 w-24 rounded-full bg-[#4F8BFF]/18 blur-3xl"
        animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.22, 0.5, 0.22] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 grid gap-4 lg:grid-cols-[0.72fr_1.55fr_0.78fr]">
        <div className="rounded-[2rem] border border-white/72 bg-white/46 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_18px_44px_rgba(55,80,95,0.1)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">Staff pool</p>
            <UsersRound className="text-[#4F8BFF]" size={20} strokeWidth={1.55} />
          </div>
          <div className="mt-6 space-y-3">
            {staff.map((name, index) => (
              <motion.div
                key={name}
                className="flex items-center justify-between rounded-2xl border border-white/72 bg-white/52 px-4 py-3 text-sm font-semibold text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]"
                animate={{ x: [0, index % 2 ? 4 : -4, 0], borderColor: ["rgba(255,255,255,0.72)", "rgba(79,139,255,0.32)", "rgba(255,255,255,0.72)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
              >
                <span>{name}</span>
                <span className="h-2 w-2 rounded-full bg-[#4F8BFF] shadow-[0_0_14px_rgba(79,139,255,0.6)]" />
              </motion.div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-[#4F8BFF]/18 bg-white/38 p-4">
            <p className="text-sm font-semibold tracking-[-0.02em] text-[#1b2430]">AI checks requests before publishing.</p>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/72 bg-white/48 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_44px_rgba(55,80,95,0.1)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">Generated monthly roster</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#1b2430]">Balanced duty matrix</p>
            </div>
            <CalendarDays className="text-[#4F8BFF]" size={24} strokeWidth={1.55} />
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {week.map((day, index) => (
              <div key={`${day}-${index}`} className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#526170]/58">
                {day}
              </div>
            ))}
            {shifts.map((shift, index) => (
              <motion.div
                key={`${shift}-${index}`}
                className="relative flex h-12 items-center justify-center rounded-xl border border-white/72 bg-white/54 text-[12px] font-semibold text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)]"
                animate={{
                  backgroundColor: ["rgba(255,255,255,0.54)", index % 6 === 0 ? "rgba(79,139,255,0.16)" : "rgba(255,255,255,0.66)", "rgba(255,255,255,0.54)"],
                  y: [0, index % 3 === 0 ? -3 : 2, 0],
                }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.045 }}
              >
                {shift}
                {index % 7 === 2 ? <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4F8BFF] shadow-[0_0_12px_rgba(79,139,255,0.6)]" /> : null}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute left-5 right-5 top-[46%] h-px bg-gradient-to-r from-transparent via-[#4F8BFF]/70 to-transparent"
            animate={{ y: [0, 96, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="rounded-[2rem] border border-white/72 bg-white/46 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_18px_44px_rgba(55,80,95,0.1)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">Fairness controls</p>
            <SlidersHorizontal className="text-[#4F8BFF]" size={20} strokeWidth={1.55} />
          </div>
          <div className="mt-6 space-y-5">
            {constraints.map((item, index) => (
              <div key={item}>
                <div className="flex items-center justify-between text-sm font-medium text-[#526170]/80">
                  <span>{item}</span>
                  <span>{86 - index * 9}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#526170]/10">
                  <motion.span
                    className="block h-full rounded-full bg-[#4F8BFF] shadow-[0_0_18px_rgba(79,139,255,0.34)]"
                    animate={{ width: [`${54 + index * 8}%`, `${86 - index * 9}%`, `${54 + index * 8}%`] }}
                    transition={{ duration: 4.8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <motion.div
            className="mt-7 rounded-[1.4rem] border border-[#4F8BFF]/20 bg-[#4F8BFF]/10 px-4 py-4 text-center text-sm font-semibold text-[#315fbd]"
            animate={{ boxShadow: ["0 0 0 rgba(79,139,255,0)", "0 0 32px rgba(79,139,255,0.18)", "0 0 0 rgba(79,139,255,0)"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            Ready for manager review
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RosterAutomationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <Background />
      <Header />

      <section className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
<motion.p className="text-sm font-medium uppercase tracking-[0.3em] text-[#4F8BFF]/78" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.04 }}>
          Clinical Operations
        </motion.p>
        <motion.h1 className="mx-auto mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          Roster Automation
        </motion.h1>
        <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#526170]/86 sm:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>
          A workflow optimisation system for fairer, faster and more transparent clinical roster planning.
        </motion.p>
        <motion.div className="mx-auto mt-5 grid w-full max-w-4xl gap-2 sm:grid-cols-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26 }}>
          {["Reduce rework", "Improve fairness", "Protect manager review"].map((item) => (
            <div key={item} className="rounded-full border border-white/64 bg-white/46 px-5 py-3 text-sm font-medium text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</div>
          ))}
        </motion.div>
              <RosterHeroVisual />
      </section>

      <Section eyebrow="Healthcare Problem" title="Rostering is an operational burden, not an admin detail.">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Manual balancing", "Managers balance staffing coverage, requests, rank mix and night-duty sequence at the same time."],
            ["Hidden constraints", "Rules and preferences are often scattered across messages, spreadsheets and memory."],
            ["Repeated rework", "One duty change can trigger multiple adjustments across the month."],
          ].map(([title, body]) => (
            <GlassCard key={title} className="p-6 transition duration-500 hover:-translate-y-1.5 hover:bg-white/54">
              <Bell className="text-[#4F8BFF]" size={24} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Workflow Transformation" title="From manual roster repair to structured workforce planning.">
        <div className="grid gap-5 lg:grid-cols-2">
          <WorkflowColumn title="Old Workflow" items={oldWorkflow} accent="bg-[#526170]/12 text-[#526170]" />
          <WorkflowColumn title="New Workflow" items={newWorkflow} accent="bg-[#4F8BFF] text-white" />
        </div>
      </Section>

      <Section eyebrow="Experience The Workflow" title="A product demo space for clinical planning.">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="min-h-[360px] p-6">
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#4F8BFF]/22 bg-white/32 text-center">
              <MonitorPlay className="text-[#4F8BFF]" size={38} strokeWidth={1.5} />
              <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Demo Video</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#526170]/78">Request entry, criteria setup, roster generation and manager review.</p>
            </div>
          </GlassCard>
          <div className="grid gap-5">
            {[["Manager Planning Interface", ClipboardList], ["Staff Request View", UsersRound], ["Live Demo", ArrowRight]].map(([title, Icon]) => (
              <GlassCard key={title} className="flex items-center justify-between gap-5 p-6">
                <div><p className="text-xl font-semibold tracking-[-0.035em]">{title}</p><p className="mt-2 text-sm text-[#526170]/72">Workflow module</p></div>
                <Icon className="text-[#4F8BFF]" size={24} strokeWidth={1.6} />
              </GlassCard>
            ))}
          </div>
        </div>
        <a href="https://ninabun.github.io/Rostering-Automation/" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]">Open Live Demo <ArrowRight size={15} /></a>
      </Section>

      <Section eyebrow="Operational Value" title="What should hospital management care about?">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, body]) => (
            <GlassCard key={title} className="p-6">
              <CheckCircle2 className="text-[#4F8BFF]" size={24} strokeWidth={1.6} />
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
              <ShieldCheck className="text-[#4F8BFF]" size={24} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Technology exists to support the operating model.">
        <TechnologyExplainer items={technology} accent="#4F8BFF" />
      </Section>

      <Section eyebrow="Future Direction" title="From roster generator to workforce planning platform.">
        <GlassCard className="max-w-5xl p-8">
          <GitBranch className="text-[#4F8BFF]" size={28} strokeWidth={1.6} />
          <p className="mt-8 max-w-4xl text-xl leading-9 text-[#526170]/84">The next version can support staff self-service requests, approval workflow, conflict alerts, audit trails and multi-department workforce dashboards.</p>
        </GlassCard>
      </Section>

      <section id="workflow-extension" className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-20 text-[#1b2430] sm:px-8 lg:px-12">
        <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#4F8BFF]">Healthcare AI</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">From generated roster to approved clinical operation.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#526170]">Roster generation solves the planning problem. Workflow orchestration solves approval, publication and change management.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[['Roster engine','Generate and validate the schedule.'],['n8n','Coordinate review, approval, publication, notification and version history.'],['Management','Review exceptions, approve publication and retain authority.']].map(([title,body])=><GlassCard key={title} className="p-6"><p className="text-sm uppercase tracking-[0.2em] text-[#4F8BFF]">{title}</p><p className="mt-4 text-base leading-7 text-[#526170]">{body}</p></GlassCard>)}
        </div>
        <p className="mt-8 rounded-3xl border border-amber-300/40 bg-amber-50/70 p-6 text-[#76531f]">A technically valid roster still requires operational and clinical management review.</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href="https://n8nrostering.vercel.app/operations.html" className="inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white">Open Workflow Extension <ArrowRight size={15}/></a></div>
      </section>
    </main>
  );
}
