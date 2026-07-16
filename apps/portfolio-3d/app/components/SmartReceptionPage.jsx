"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing, CheckCircle2, ClipboardList, GitBranch, MonitorPlay, Route, ShieldCheck, Tablet } from "lucide-react";
import TechnologyExplainer from "./TechnologyExplainer";

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
const technology = [
  { name: "Digital Reception", purpose: "Creates a clear first contact point where visitors can submit routine needs without interrupting clinical staff." },
  { name: "AI Routing Logic", purpose: "Classifies the request and directs it toward the most appropriate ward role or response pathway." },
  { name: "Tablet Interface", purpose: "Provides an accessible visitor-facing screen designed for quick use at the ward entrance." },
  { name: "Notification Workflow", purpose: "Delivers the routed request to staff and keeps the communication path visible until response." },
  { name: "Human Review", purpose: "Keeps prioritisation, response and clinical judgement with authorised ward staff." },
  { name: "React", purpose: "Builds responsive visitor and staff interfaces from reusable workflow components." },
  { name: "Next.js", purpose: "Provides the application structure, routing and production-ready web delivery for both ward panels." },
  { name: "Workflow Design", purpose: "Maps each visitor request to a clear operational step so technology reduces rather than adds interruption." },
];
const outsideWardPanelUrl = "https://smart-reception-indol.vercel.app/outside";
const insideWardPanelUrl = "https://smart-reception-indol.vercel.app/ward";

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

function ReceptionHeroVisual() {
  const requests = ["Directions", "Visiting time", "Patient item"];
  const wardSignals = ["Nurse alert", "Ward queue", "Resolved"];

  return (
    <motion.div
      className="relative mx-auto mt-5 w-full max-w-5xl overflow-hidden rounded-[2.6rem] border border-white/72 bg-[linear-gradient(145deg,rgba(255,255,255,0.5),rgba(225,242,242,0.3))] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_16px_18px_38px_rgba(255,255,255,0.25),inset_-18px_-22px_42px_rgba(80,100,120,0.1),0_28px_90px_rgba(40,70,88,0.13)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl"
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M250 210 C390 95 610 95 750 210"
          fill="none"
          stroke="#2f8396"
          strokeWidth="1"
          strokeOpacity="0.26"
          strokeDasharray="10 14"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M250 210 C390 325 610 325 750 210"
          fill="none"
          stroke="#63E6D8"
          strokeWidth="1"
          strokeOpacity="0.28"
          strokeDasharray="8 16"
          animate={{ strokeDashoffset: [0, 48] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.9fr_0.45fr_0.9fr]">
        <div className="mx-auto w-full max-w-xs rounded-[2.2rem] border border-white/72 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_54px_rgba(47,131,150,0.13)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">Outside ward</p>
            <Tablet className="text-[#2f8396]" size={20} strokeWidth={1.6} />
          </div>
          <div className="mt-6 min-h-64 rounded-[1.6rem] border border-white/70 bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]">
            <p className="text-2xl font-semibold tracking-[-0.05em] text-[#1b2430]">How can we help?</p>
            <div className="mt-5 space-y-3">
            {requests.map((item, index) => (
              <motion.div
                key={item}
                className="rounded-2xl border border-white/74 bg-white/56 px-4 py-3 text-sm font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]"
                animate={{ x: [0, 6, 0], opacity: [0.76, 1, 0.76] }}
                transition={{ duration: 4 + index * 0.45, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
              >
                {item}
              </motion.div>
            ))}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-48 items-center justify-center">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="absolute h-3 w-3 rounded-full bg-[#63E6D8] shadow-[0_0_24px_rgba(99,230,216,0.6)]"
              animate={{ rotate: 360, x: [0, 74, 0, -74, 0], y: [-42, 0, 42, 0, -42], opacity: [0.2, 1, 0.55, 1, 0.2] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
            />
          ))}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-[#2f8396]/24 bg-white/58 text-[#2f8396] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_44px_rgba(99,230,216,0.24)] backdrop-blur-xl">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
              <Route size={34} strokeWidth={1.45} />
            </motion.div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs rounded-[2.2rem] border border-white/72 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_54px_rgba(47,131,150,0.13)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">Inside ward</p>
            <ClipboardList className="text-[#2f8396]" size={20} strokeWidth={1.6} />
          </div>
          <div className="mt-6 min-h-64 rounded-[1.6rem] border border-white/70 bg-white/42 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]">
            <p className="text-2xl font-semibold tracking-[-0.05em] text-[#1b2430]">Ward queue</p>
            <div className="mt-5 space-y-3">
            {wardSignals.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-white/74 bg-white/56 px-4 py-3 text-sm font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]"
                animate={{ y: [0, index === 1 ? -4 : 4, 0], borderColor: ["rgba(255,255,255,0.7)", "rgba(99,230,216,0.34)", "rgba(255,255,255,0.7)"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.22 }}
              >
                <span>{item}</span>
                <span className="h-2 w-2 rounded-full bg-[#63E6D8] shadow-[0_0_14px_rgba(99,230,216,0.62)]" />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SmartReceptionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <Background />
      <Header />

      <section className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
<motion.p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2f8396]/78" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.04 }}>
          Clinical Operations
        </motion.p>
        <motion.h1 className="mx-auto mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-6xl lg:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          Smart Reception
        </motion.h1>
        <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#526170]/86 sm:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>
          A healthcare workflow optimisation solution that routes visitor enquiries before they interrupt clinical staff.
        </motion.p>
        <motion.div className="mx-auto mt-5 grid w-full max-w-4xl gap-2 sm:grid-cols-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.26 }}>
          {["Reduce interruption", "Standardise routing", "Improve visitor clarity"].map((item) => (
            <div key={item} className="rounded-full border border-white/64 bg-white/46 px-5 py-3 text-sm font-medium text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(55,80,95,0.08)] backdrop-blur-xl">{item}</div>
          ))}
        </motion.div>
              <ReceptionHeroVisual />
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

      <Section eyebrow="Experience The Workflow" title="Video demo and ward panel previews.">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <GlassCard className="self-start p-3">
            <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.65rem] border border-dashed border-[#2f8396]/24 bg-white/32 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] sm:h-64">
              <div className="px-6">
                <MonitorPlay className="mx-auto text-[#2f8396]" size={42} strokeWidth={1.45} />
                <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Video Demo</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#526170]/78">
                  Reserved space for the workflow video showing outside ward request, inside ward response and routing logic.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xl font-semibold tracking-[-0.04em]">Smart Reception Demo</p>
                <p className="mt-2 text-sm leading-6 text-[#526170]/76">
                  Place the final recorded demo here when the video is ready.
                </p>
              </div>
              <a
                href="https://smart-reception-indol.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#1b2430] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]"
              >
                Open Live Demo <ArrowRight size={15} />
              </a>
            </div>
          </GlassCard>

          <div className="grid gap-5">
            {[
              ["Outside Ward Panel", "Visitor-facing tablet interface for submitting enquiries.", outsideWardPanelUrl, Tablet],
              ["Inside Ward Panel", "Staff dashboard or ward-side response view.", insideWardPanelUrl, ClipboardList],
            ].map(([title, body, href, Icon]) => (
              <GlassCard key={title} className="p-6">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2f8396]/22 bg-white/62 text-[#2f8396] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(80,120,140,0.1)]">
                    <Icon size={23} strokeWidth={1.6} />
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${title}`}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#2f8396]/18 bg-white/42 px-3 py-1.5 text-[12px] font-medium text-[#2f8396] transition hover:-translate-y-0.5 hover:bg-white/62"
                  >
                    Open <ArrowRight size={12} />
                  </a>
                </div>
                <p className="mt-7 text-xl font-semibold tracking-[-0.035em]">{title}</p>
                <p className="mt-3 text-sm leading-6 text-[#526170]/78">{body}</p>
              </GlassCard>
            ))}

            <GlassCard className="flex items-center justify-between gap-5 p-6">
              <div>
                <p className="text-xl font-semibold tracking-[-0.035em]">Routing Logic</p>
                <p className="mt-2 text-sm text-[#526170]/72">Connects visitor request to the correct ward response path.</p>
              </div>
              <Route className="text-[#2f8396]" size={24} strokeWidth={1.6} />
            </GlassCard>
          </div>
        </div>
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
        <TechnologyExplainer items={technology} accent="#2f8396" />
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
