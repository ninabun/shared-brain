"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  Orbit,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import TechnologyExplainer from "./TechnologyExplainer";

const navItems = [
  { label: "Solutions", href: "/#platform" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const matters = [
  ["Patient understanding", "Complex information becomes easier to see, follow and remember.", Brain],
  ["Emotional reassurance", "Calm visual pacing can reduce uncertainty before clinical conversations.", HeartPulse],
  ["Clinical explanation", "Teams can explain abstract concepts with a clearer shared reference.", Stethoscope],
  ["Care experience", "Immersive media supports human connection instead of replacing it.", UsersRound],
];

const applications = [
  ["Pregnancy education", "A future 3D fetal development journey for expectant families."],
  ["Treatment explanation", "Visual storytelling for treatment plans, procedures and recovery."],
  ["Children's care", "Gentle interactive environments for education and reassurance."],
  ["Clinical learning", "Immersive anatomy and health concepts for staff or student education."],
];

const flow = ["Clinical topic", "AI-assisted simplification", "3D visual story", "Clinician review", "Patient understanding"];
const impact = [
  ["Understanding", "Clearer"],
  ["Communication", "More visual"],
  ["Experience", "Calmer"],
  ["Education", "Memorable"],
];
const tools = [
  { name: "Next.js", purpose: "Provides the product shell, routing and deployable web experience around the interactive observatory." },
  { name: "React Three Fiber", purpose: "Connects React components to the 3D scene so interface state and spatial content can work together." },
  { name: "Three.js", purpose: "Renders the Earth, camera, lighting and spatial interactions that form the core visual experience." },
  { name: "Drei", purpose: "Supplies reliable 3D helpers for camera control, scene setup and reusable WebGL behaviours." },
  { name: "GSAP", purpose: "Coordinates cinematic sequences and precise timeline-based movement inside the experience." },
  { name: "Framer Motion", purpose: "Animates the interface around the 3D scene and keeps transitions clear and responsive." },
  { name: "WebGL", purpose: "Uses the device GPU to deliver the live, immersive 3D presentation directly in the browser." },
  { name: "Vercel", purpose: "Hosts and distributes the prototype globally so the live product can be opened without installation." },
];
const future = ["Fetal development", "Anatomy education", "Consultation display", "Projection mapping", "Exhibition experience"];

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f9fb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(99,230,216,0.18),transparent_28%),radial-gradient(circle_at_78%_34%,rgba(139,123,255,0.12),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(79,139,255,0.12),transparent_30%),linear-gradient(180deg,#F7FAFC_0%,#EEF4F8_52%,#E6EEF5_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(120,170,200,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)] [background-size:132px_132px]" />
      <motion.div
        className="absolute left-[12%] top-[20%] h-px w-[78%] rotate-[-7deg] bg-gradient-to-r from-transparent via-[#4F8BFF]/18 to-transparent"
        animate={{ x: ["-4%", "5%", "-4%"], opacity: [0.18, 0.48, 0.18] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[18%] h-56 w-56 rounded-full bg-[#63E6D8]/12 blur-3xl"
        animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.28, 0.55, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[28%] h-72 w-72 rounded-full bg-[#8B7BFF]/10 blur-3xl"
        animate={{ scale: [1.05, 0.92, 1.05], opacity: [0.22, 0.44, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 text-[#1b2430]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="/"
          className="rounded-full border border-white/50 bg-white/34 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(8,18,28,0.14)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition hover:bg-white/50"
        >
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
        </div>
      </nav>
    </header>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-18 text-[#1b2430] sm:px-8 sm:py-24 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.26em] text-[#2f8396]/78 sm:text-base">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#1b2430] sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {children}
    </motion.section>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.1rem] border border-white/70 bg-white/42 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_10px_12px_28px_rgba(255,255,255,0.22),inset_-14px_-18px_34px_rgba(83,112,128,0.09),0_24px_80px_rgba(40,70,88,0.11)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl ${className}`}
    >
      <span className="pointer-events-none absolute left-8 right-12 top-3 h-5 rounded-full bg-white/38 blur-md" />
      {children}
    </div>
  );
}

function ApplicationCard({ title, body, index }) {
  const accents = ["#63E6D8", "#4F8BFF", "#8B7BFF", "#63E6D8"];

  return (
    <GlassCard className="group min-h-[260px] p-6 transition duration-500 hover:-translate-y-1.5 hover:bg-white/54">
      <div
        className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(80,120,140,0.12)]"
        style={{ borderColor: `${accents[index]}55`, color: accents[index] }}
      >
        <Orbit size={22} strokeWidth={1.7} />
      </div>
      <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
    </GlassCard>
  );
}

export default function EarthObservatoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <Background />
      <Header />

      <section className="relative z-10 mx-auto flex h-svh max-w-7xl flex-col px-5 pb-4 pt-16 text-center sm:px-8 lg:px-12">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7BFF]/78"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.04 }}
        >
          Care Experience
        </motion.p>
        <motion.h1
          className="mx-auto mt-2 max-w-5xl text-[clamp(2.35rem,6.5svh,4.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Earth Observatory
        </motion.h1>
        <motion.p
          className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#526170]/86 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
        >
          A cinematic 3D experience prototype for turning complex healthcare information into calm, visual understanding.
        </motion.p>
        <motion.div
          className="mx-auto mt-4 flex min-h-0 w-full max-w-5xl flex-1 flex-col rounded-[2rem] border border-white/76 bg-white/42 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_24px_70px_rgba(40,70,88,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.26 }}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.4rem] bg-[#dfeaf2]">
            <iframe
              title="Earth Observatory live demo"
              src="https://earth-observatory.vercel.app"
              className="h-full w-full border-0"
              loading="eager"
            />
          </div>
          <div className="flex pt-3">
            <a
              href="https://earth-observatory.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b2430] px-5 py-2.5 text-sm font-medium !text-white shadow-[0_12px_30px_rgba(20,30,40,0.2)] transition hover:-translate-y-0.5 hover:bg-[#263343]"
              style={{ color: "#fff" }}
            >
              Open Live Demo <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </section>

      <Section eyebrow="Why It Matters" title="Healthcare is easier when people can see it.">
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {matters.map(([title, body, Icon]) => (
            <GlassCard key={title} className="p-6 transition duration-500 hover:-translate-y-1.5 hover:bg-white/54">
              <Icon className="text-[#8B7BFF]" size={25} strokeWidth={1.6} />
              <p className="mt-7 text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/82">{body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Healthcare Applications" title="One interaction pattern. Many clinical moments.">
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {applications.map(([title, body], index) => (
            <ApplicationCard key={title} title={title} body={body} index={index} />
          ))}
        </div>
      </Section>

      <Section eyebrow="How It Works" title="From clinical information to visual understanding.">
        <GlassCard className="mt-12 p-6 sm:p-8">
          <div className="relative grid gap-4 md:grid-cols-5">
            <div className="absolute bottom-8 left-[10%] right-[10%] top-8 hidden overflow-hidden rounded-full bg-[#8B7BFF]/12 md:block">
              <motion.div className="h-full w-full origin-left bg-gradient-to-r from-[#4F8BFF]/30 via-[#63E6D8]/75 to-[#8B7BFF]/45" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            {flow.map((item, index) => (
              <motion.div
                key={item}
                className="relative z-10 rounded-[1.35rem] border border-white/82 bg-white/72 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_34px_rgba(55,80,95,0.1)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <motion.span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#1b2430] text-[12px] font-semibold text-white" animate={{ boxShadow: ["0 0 0 0 rgba(99,230,216,0)", "0 0 0 8px rgba(99,230,216,0.16)", "0 0 0 0 rgba(99,230,216,0)"] }} transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}>
                  0{index + 1}
                </motion.span>
                <p className="mt-4 text-[15px] font-medium leading-6 text-[#1b2430]/82">{item}</p>
                {index < flow.length - 1 ? <ArrowRight className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 rotate-90 text-[#2f8396] md:-right-5 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0" size={20} /> : null}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </Section>

      <Section eyebrow="Potential Impact" title="Designed to support communication, not replace care.">
        <GlassCard className="mt-12 p-5 sm:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {impact.map(([label, value], index) => (
            <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-3 lg:flex-row">
              <motion.div className="w-full flex-1 rounded-[1.5rem] border border-white/80 bg-white/58 p-6 text-center" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.12 }}>
                <p className="text-xs uppercase tracking-[0.2em] text-[#526170]/68">{label}</p>
                <p className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-[#1b2430]">{value}</p>
              </motion.div>
              {index < impact.length - 1 ? <motion.div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#8B7BFF]/12 text-[#8B7BFF]" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}><ArrowRight className="rotate-90 lg:rotate-0" size={17} /></motion.div> : null}
            </div>
          ))}
          </div>
          <p className="mt-6 text-center text-sm leading-6 text-[#526170]/72">Clearer understanding enables more visual communication, creating a calmer experience that makes education more memorable.</p>
        </GlassCard>
      </Section>

      <Section eyebrow="Technology" title="Built as an immersive WebGL product prototype.">
        <div className="mt-10"><TechnologyExplainer items={tools} accent="#8B7BFF" /></div>
      </Section>

      <Section eyebrow="Future Direction" title="From Earth today to healthcare journeys tomorrow.">
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {future.map((item, index) => (
            <motion.div
              key={item}
              className="rounded-[1.4rem] border border-white/68 bg-white/42 p-5 text-center text-[#526170]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.84),0_16px_34px_rgba(55,80,95,0.1)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <Sparkles className="mx-auto text-[#63E6D8]" size={21} strokeWidth={1.6} />
              <p className="mt-5 text-sm font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  );
}
