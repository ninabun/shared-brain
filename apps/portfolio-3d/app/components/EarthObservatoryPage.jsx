"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  MonitorPlay,
  Orbit,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import HeroMotionBar from "./HeroMotionBar";

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
const tools = ["Next.js", "React Three Fiber", "Three.js", "Drei", "GSAP", "Framer Motion", "WebGL", "Vercel"];
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

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-16 pt-28 text-center sm:px-8 lg:px-12">
<motion.p
          className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7BFF]/78"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.04 }}
        >
          Care Experience
        </motion.p>
        <motion.h1
          className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-[#1b2430] sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Earth Observatory
        </motion.h1>
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#526170]/86 sm:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
        >
          A cinematic 3D experience prototype for turning complex healthcare information into calm, visual understanding.
        </motion.p>
        <motion.div
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.26 }}
        >
          <a
            href="https://earth-observatory.vercel.app"
            className="inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(27,36,48,0.18)] transition hover:-translate-y-0.5 hover:bg-[#263343]"
          >
            Launch Experience <ArrowRight size={15} />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-3 rounded-full border border-white/64 bg-white/46 px-6 py-3 text-sm font-medium text-[#1b2430]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_16px_36px_rgba(27,36,48,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/62"
          >
            View Case Study
          </a>
        </motion.div>
              <HeroMotionBar accent="#8B7BFF" label="Visual rhythm" detail="Observatory motion signal" />
      </section>

      <Section eyebrow="Product Demo" title="A live 3D observatory experience." className="pt-8" id="demo">
        <GlassCard className="mt-12 p-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.65rem] bg-[#dfeaf2]">
            <iframe
              title="Earth Observatory live demo"
              src="https://earth-observatory.vercel.app"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </GlassCard>
        <p className="mx-auto mt-7 max-w-3xl text-center text-lg leading-8 text-[#526170]/82">
          The current demo uses Earth as the visual subject. The same interaction model can be adapted for fetal development, anatomy education and projection-mapped healthcare communication.
        </p>
      </Section>

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
          <div className="grid gap-3 md:grid-cols-5">
            {flow.map((item, index) => (
              <motion.div
                key={item}
                className="relative rounded-[1.35rem] border border-white/72 bg-white/38 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#2f8396]/70">
                  0{index + 1}
                </span>
                <p className="mt-5 text-[15px] font-medium leading-6 text-[#1b2430]/82">{item}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </Section>

      <Section eyebrow="Potential Impact" title="Designed to support communication, not replace care.">
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {impact.map(([label, value]) => (
            <GlassCard key={label} className="p-7">
              <p className="text-sm uppercase tracking-[0.22em] text-[#526170]/68">{label}</p>
              <p className="mt-8 text-4xl font-semibold tracking-[-0.06em] text-[#1b2430]">{value}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Built as an immersive WebGL product prototype.">
        <div className="mt-10 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/68 bg-white/44 px-5 py-3 text-sm font-medium text-[#526170]/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_28px_rgba(55,80,95,0.08)] backdrop-blur-xl"
            >
              {tool}
            </span>
          ))}
        </div>
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
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="/#platform"
            className="inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]"
          >
            Back to Solutions <ArrowRight size={15} />
          </a>
          <a
            href="https://earth-observatory.vercel.app"
            className="inline-flex items-center gap-3 rounded-full border border-white/64 bg-white/46 px-6 py-3 text-sm font-medium text-[#1b2430]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_16px_36px_rgba(27,36,48,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/62"
          >
            Open Live Demo <MonitorPlay size={15} />
          </a>
        </div>
      </Section>
    </main>
  );
}
