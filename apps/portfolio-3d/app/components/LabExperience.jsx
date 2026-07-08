"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, BrainCircuit, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import content from "../data/lab.json";
import HeroBackground from "./HeroBackground";

const navItems = [
  { label: "Solutions", href: "#platform" },
  { label: "Vision", href: "#mission" },
  { label: "Research", href: "#roadmap" },
  { label: "About", href: "#about" },
];

const iconMap = {
  "Patient Experience": Sparkles,
  "Clinical Workflow": Activity,
  "Healthcare Intelligence": BrainCircuit,
};
const sketchPaths = [
  {
    label: "Roster flow",
    paths: [
      "M48 156C88 116 122 184 158 134C185 96 216 118 244 82",
      "M70 190C108 202 168 206 224 176",
      "M206 84L244 82L230 118",
    ],
    tips: [
      [244, 82],
      [224, 176],
      [230, 118],
    ],
  },
  {
    label: "Agent network",
    paths: [
      "M56 166C92 92 164 214 224 92",
      "M82 112C128 74 176 82 212 130",
      "M82 112L132 146L212 130",
    ],
    nodes: [
      [82, 112],
      [132, 146],
      [212, 130],
      [224, 92],
    ],
    tips: [
      [224, 92],
      [212, 130],
      [132, 146],
    ],
  },
  {
    label: "Observatory orbit",
    paths: [
      "M58 142C90 78 202 78 234 142C204 202 92 202 58 142Z",
      "M98 102C136 136 160 162 196 184",
      "M198 98C158 128 132 158 92 186",
    ],
    tips: [
      [234, 142],
      [196, 184],
      [92, 186],
    ],
  },
  {
    label: "Automation loop",
    paths: [
      "M72 128C78 74 180 74 204 120C232 178 124 214 78 164",
      "M186 98L206 122L174 126",
      "M96 178L74 158L108 152",
    ],
    tips: [
      [78, 164],
      [174, 126],
      [108, 152],
    ],
  },
];

function PersonalSymbol({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      role="img"
      aria-label="Wing Yee Lee clinical AI builder symbol"
    >
      <circle cx="120" cy="120" r="86" stroke="currentColor" strokeWidth="3" />
      <path d="M76 91L96 147L119 92L142 147L164 91" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M164 91L184 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M184 56V84M170 70H198" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 164H156" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M120 164V188" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="84" cy="164" r="6" fill="currentColor" />
      <circle cx="156" cy="164" r="6" fill="currentColor" />
      <circle cx="120" cy="188" r="6" fill="currentColor" />
      <path d="M72 72C96 53 142 49 169 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M70 190C96 209 145 212 174 189" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function DrawingStroke({ index }) {
  const sketch = sketchPaths[index % sketchPaths.length];
  const gradientId = `glass-stroke-${index}`;
  const highlightId = `glass-highlight-${index}`;
  const tipId = `glass-tip-${index}`;
  const shadowId = `glass-shadow-${index}`;

  return (
    <svg
      className="relative h-[74%] w-[80%] overflow-visible"
      viewBox="0 0 288 240"
      fill="none"
      role="img"
      aria-label={sketch.label}
    >
      <defs>
        <linearGradient id={gradientId} x1="48" y1="70" x2="244" y2="194" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e9fbff" />
          <stop offset="0.28" stopColor="#77d5ef" />
          <stop offset="0.56" stopColor="#176fc9" />
          <stop offset="1" stopColor="#2430c7" />
        </linearGradient>
        <linearGradient id={highlightId} x1="70" y1="76" x2="224" y2="176" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.94" />
          <stop offset="0.48" stopColor="#dff8ff" stopOpacity="0.78" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id={tipId} cx="35%" cy="26%" r="68%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.34" stopColor="#baf3ff" />
          <stop offset="0.68" stopColor="#1684d7" />
          <stop offset="1" stopColor="#1129a8" />
        </radialGradient>
        <filter id={shadowId} x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="13" stdDeviation="9" floodColor="#245c86" floodOpacity="0.22" />
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#021429" floodOpacity="0.24" />
          <feDropShadow dx="-2" dy="-2" stdDeviation="1.2" floodColor="#ffffff" floodOpacity="0.34" />
        </filter>
      </defs>
      {sketch.paths.map((path, pathIndex) => (
        <g key={path}>
          <motion.path
            d={path}
            pathLength="1"
            stroke="#0e2a45"
            strokeWidth={pathIndex === 0 ? 24 : 17}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.14"
            filter={`url(#${shadowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.14 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.25, delay: 0.14 + pathIndex * 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={path}
            pathLength="1"
            stroke={`url(#${gradientId})`}
            strokeWidth={pathIndex === 0 ? 15 : 10.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter={`url(#${shadowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: pathIndex === 0 ? 0.96 : 0.78 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.28, delay: 0.18 + pathIndex * 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={path}
            pathLength="1"
            stroke={`url(#${highlightId})`}
            strokeWidth={pathIndex === 0 ? 5.2 : 3.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.82"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.82 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.16, delay: 0.34 + pathIndex * 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
      ))}
      {sketch.nodes?.map(([cx, cy], nodeIndex) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={nodeIndex === 0 ? 7 : 5.5}
          fill={`url(#${tipId})`}
          filter={`url(#${shadowId})`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.45, delay: 1 + nodeIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {sketch.tips.map(([cx, cy], tipIndex) => (
        <motion.g
          key={`${cx}-${cy}-tip`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.52, delay: 0.95 + tipIndex * 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={tipIndex === 0 ? 12 : 9} fill={`url(#${tipId})`} filter={`url(#${shadowId})`} />
          <circle cx={cx - 3} cy={cy - 4} r={tipIndex === 0 ? 3.3 : 2.4} fill="#ffffff" opacity="0.9" />
          <circle cx={cx + 2} cy={cy + 3} r={tipIndex === 0 ? 9 : 6.5} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.22" />
        </motion.g>
      ))}
    </svg>
  );
}

function HeroObject({ className = "" }) {
  return (
    <motion.div
      className={`relative flex aspect-square w-[min(76vw,430px)] items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.94, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 rounded-[42%_58%_48%_52%/50%_42%_58%_50%] bg-[radial-gradient(circle_at_34%_26%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.84),rgba(203,231,239,0.38)_48%,rgba(184,196,255,0.32))] shadow-[0_52px_160px_rgba(66,117,145,0.18)] ring-1 ring-white/80 backdrop-blur-2xl"
        animate={{ rotate: [0, -2.6, 2.2, 0], borderRadius: ["42% 58% 48% 52% / 50% 42% 58% 50%", "50% 50% 44% 56% / 46% 55% 45% 54%", "44% 56% 54% 46% / 54% 44% 56% 46%", "42% 58% 48% 52% / 50% 42% 58% 50%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-[11%] rounded-[2.2rem] bg-white/32 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-22px_40px_rgba(70,125,176,0.08)] backdrop-blur-2xl" />
      <motion.div
        className="relative flex h-[62%] w-[62%] items-center justify-center rounded-[2rem] bg-white/54 text-black shadow-[0_30px_100px_rgba(70,120,160,0.13)] ring-1 ring-white/90 backdrop-blur-2xl"
        animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <PersonalSymbol className="h-[68%] w-[68%]" />
      </motion.div>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#04070d]/58 text-white backdrop-blur-2xl">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-2 text-sm font-medium tracking-[-0.01em]">
          <PersonalSymbol className="h-5 w-5" />
          Wing Yee AI Lab
        </a>
        <div className="hidden items-center gap-5 text-[13px] text-white/62 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition duration-300 hover:text-white/88">
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-[#04070d]/92 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white/68"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 mx-auto min-h-[52vh] w-full max-w-7xl px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className="mb-5 text-[13px] uppercase tracking-[0.26em] text-cyan-100/58">{eyebrow}</p> : null}
      {title ? (
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#F8FAFC] sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {children}
    </motion.section>
  );
}

function ProjectGlassCard({ project, area, index }) {
  return (
    <motion.article
      className="group relative min-h-[270px] overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035)_54%,rgba(0,0,0,0.08))] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-16px_30px_rgba(0,0,0,0.2),0_14px_0_rgba(0,0,0,0.06),0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-700 hover:border-cyan-100/26 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-16px_30px_rgba(0,0,0,0.18),0_18px_0_rgba(0,0,0,0.055),0_44px_120px_rgba(80,220,255,0.12)]"
      initial={{ opacity: 0, y: 24, scale: 0.985, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -7, scale: 1.01, rotateX: 1 }}
      whileTap={{ y: 2, scale: 0.992, rotateX: -0.8 }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ duration: 0.95, delay: index * 0.05, ease: "easeInOut" }}
      style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-200/7 blur-3xl transition duration-700 group-hover:bg-cyan-200/12" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p className="mb-4 text-[13px] uppercase tracking-[0.22em] text-cyan-100/58">{area.title}</p>
          <h3 className="text-[22px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#F8FAFC]">{project.name}</h3>
          <p className="mt-5 text-[13px] uppercase tracking-[0.18em] text-[#94A3B8]/78">Problem</p>
          <p className="mt-2 max-w-md text-[15px] leading-7 text-[#CBD5E1]/78">{project.problem}</p>
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-[13px] uppercase tracking-[0.18em] text-[#94A3B8]/78">Solution</p>
            <p className="mt-2 text-[14px] leading-6 text-[#CBD5E1]/80">{project.solution}</p>
          </div>
        </div>
        <div>
          <div className="mb-5 mt-6 flex flex-wrap gap-2">
            {project.tools.slice(0, 3).map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[13px] text-[#94A3B8]/78">
                {tool}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.ctas.map((cta) => (
              <a
                key={cta}
                href="#contact"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                  cta === "Future Direction"
                    ? "border-white/10 bg-white/[0.035] text-white/56"
                    : "border-white/12 bg-white/[0.075] text-[#CBD5E1]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_28px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:border-cyan-100/28 hover:text-white active:translate-y-0.5"
                }`}
              >
                {cta}
                {cta === "Future Direction" ? null : <ArrowRight size={13} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ThinkingFramework() {
  const steps = content.thinking;

  return (
    <div className="relative mt-16 max-w-3xl">
      <motion.div
        className="absolute bottom-10 left-[1.15rem] top-7 w-px bg-gradient-to-b from-cyan-100/0 via-cyan-100/28 to-cyan-100/0"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-18%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          className="relative grid grid-cols-[2.4rem_1fr] gap-5 pb-10 last:pb-0"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.65, delay: index * 0.1, ease: "easeInOut" }}
        >
          <div className="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100/18 bg-[#08101c] text-[13px] text-cyan-100/62 shadow-[0_0_30px_rgba(155,239,255,0.08)]">
            {index + 1}
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#F8FAFC]/90">{step.title}</h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#CBD5E1]/70">{step.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PlatformArchitecture({ modules }) {
  const [openAreas, setOpenAreas] = useState({});

  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((area, areaIndex) => {
        const Icon = iconMap[area.title] || Sparkles;
        const isOpen = Boolean(openAreas[area.title]);
        const visibleProjects = isOpen ? area.projects : area.projects.slice(0, 2);

        return (
          <motion.div
            key={area.title}
            className="relative flex min-h-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.035] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.9, delay: areaIndex * 0.08, ease: "easeInOut" }}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-100/6 blur-3xl" />
            <div className="relative z-10 mb-7">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-cyan-100/76">
                  <Icon size={21} />
                </div>
                <p className="text-[13px] uppercase tracking-[0.22em] text-cyan-100/58">Module 0{areaIndex + 1}</p>
              </div>
              <h3 className="text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#F8FAFC]">{area.title}</h3>
              <p className="mt-5 text-[15px] leading-7 text-[#CBD5E1]/78">{area.description}</p>
            </div>
            <div className="relative z-10 grid flex-1 gap-4">
              {visibleProjects.map((project, index) => (
                <ProjectGlassCard key={project.name} project={project} area={area} index={index} />
              ))}
            </div>
            {area.projects.length > 3 ? (
              <button
                type="button"
                className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-sm font-medium text-[#CBD5E1]/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-cyan-100/24 hover:text-white active:translate-y-0.5"
                onClick={() => setOpenAreas((current) => ({ ...current, [area.title]: !isOpen }))}
              >
                {isOpen ? "Show Less" : "View Module"} <ArrowRight size={14} className={isOpen ? "-rotate-90 transition" : "rotate-90 transition"} />
              </button>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}

function SignatureFooter() {
  return (
    <motion.footer
      className="relative z-10 overflow-hidden bg-[#f7f8f6] px-5 py-24 text-[#111513] sm:px-8 sm:py-32 lg:px-12"
      initial={{ opacity: 0.9 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-[13px] uppercase tracking-[0.34em] text-black/50">Personal Mark</p>
          <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-black sm:text-7xl">
            Clinical care, code and AI systems.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/54">
            A reserved signature space for Wing Yee Lee: a minimal black-and-white mark combining a W/Y monogram,
            clinical cross and small AI network nodes.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 lg:items-end">
          <motion.div
            className="flex aspect-square w-[min(76vw,390px)] items-center justify-center rounded-[2.4rem] bg-white text-black shadow-[0_44px_150px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.07]"
            initial={{ scale: 0.94, y: 28 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <PersonalSymbol className="h-[70%] w-[70%]" />
          </motion.div>
          <p className="text-[13px] uppercase tracking-[0.28em] text-black/46">Wing Yee AI Lab</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default function LabExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.975]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);
  const heroIntroY = useTransform(scrollYProgress, [0, 0.13], [0, -8]);
  const { modules, roadmap } = content;

  return (
    <main className="min-h-screen overflow-hidden bg-[#04070d] text-white">
      <HeroBackground />
      <Header />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start px-5 pb-10 pt-16 text-center sm:px-8 lg:px-12"
      >
        <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-14">
          <motion.div
            className="flex max-w-6xl -translate-y-7 flex-col items-center px-5 py-5 sm:-translate-y-9 sm:px-8"
            style={{ y: heroIntroY }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mb-9 text-[13px] uppercase tracking-[0.36em] text-cyan-100/62">Wing Yee AI Lab</p>
            <h1 className="max-w-5xl text-[clamp(3.25rem,8.4vw,7.15rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#F8FAFC]">
              Healthcare.
              <br />
              Reimagined.
            </h1>
            <p className="mt-12 max-w-2xl text-lg leading-8 text-[#CBD5E1] sm:text-[1.65rem] sm:leading-9">
              AI Solutions for Modern Care.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[13px] uppercase tracking-[0.22em] text-white/56 sm:gap-x-5">
              {["Patient Experience", "Clinical Workflow", "Healthcare Intelligence"].map((item, index) => (
                <a
                  key={item}
                  href="#platform"
                  className="group inline-flex items-center gap-4 transition duration-300 hover:text-white/88"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-100/55 transition-all duration-500 group-hover:w-full" />
                  </span>
                  {index < 2 ? <span className="text-white/28">&bull;</span> : null}
                </a>
              ))}
            </div>
          </motion.div>
          <HeroObject className="-mt-6 w-[min(54vw,224px)] opacity-86 sm:-mt-8" />
          <motion.a
            href="#platform"
            aria-label="Scroll to solutions"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/42"
            animate={{ y: [0, 9, 0], opacity: [0.42, 0.78, 0.42] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-9 w-px bg-gradient-to-b from-transparent via-white/55 to-transparent" />
            <span className="text-[13px] uppercase tracking-[0.24em]">Scroll</span>
          </motion.a>
        </div>
      </motion.section>

      <Section id="platform" eyebrow="Platform Architecture" title="One assistant. Three healthcare modules.">
        <div className="mt-10 flex flex-wrap items-center gap-3 text-[15px] text-[#CBD5E1]/82">
          <span className="rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-[#F8FAFC]">AI Ward Assistant</span>
          <ArrowRight size={16} className="text-cyan-100/58" />
          {modules.map((module) => (
            <span key={module.title} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
              {module.title}
            </span>
          ))}
        </div>
        <PlatformArchitecture modules={modules} />
      </Section>

      <Section
        id="how"
        eyebrow="How I Think"
        title="The product development framework behind AI Ward Assistant."
      >
        <ThinkingFramework />
      </Section>

      <Section id="about" eyebrow="About" title="Built between care, code and product design.">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-3xl space-y-5 text-lg leading-8 tracking-[-0.02em] text-white/60 sm:text-2xl sm:leading-9">
            <p>Wing Yee builds AI-powered healthcare products by combining clinical experience, computer science and product design.</p>
            <p>The goal is to transform everyday healthcare workflows into practical AI systems.</p>
          </div>
          <div className="grid gap-3 text-sm text-white/62">
            {["Patient experience", "Clinical workflow improvement", "Healthcare intelligence", "Immersive communication"].map(
              (item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(120,230,255,0.04)] backdrop-blur-xl">
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      <Section id="mission" eyebrow="Mission" title="Technology should give healthcare professionals more time to care.">
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#CBD5E1]/82">
          AI should reduce repetitive work, improve communication, and create better healthcare experiences.
        </p>
      </Section>

      <Section id="roadmap" eyebrow="Roadmap" title="Future versions of AI Ward Assistant.">
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((item, index) => (
            <motion.div
              key={item}
              className="min-h-36 rounded-[1.35rem] border border-white/[0.085] bg-white/[0.045] p-5 shadow-[0_18px_60px_rgba(120,230,255,0.025)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className="text-[13px] text-cyan-100/52">0{index + 1}</span>
              <p className="mt-10 text-base tracking-[-0.025em] text-white/68">{item}</p>
              <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-cyan-100/52">
                {index === 0 ? "Current Modules" : "Future Version"}
              </p>
            </motion.div>
          ))}
        </div>
        <a
          href="#contact"
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-[15px] font-medium text-[#CBD5E1] transition hover:border-cyan-100/30 hover:text-white"
        >
          View Roadmap <ArrowRight size={15} />
        </a>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Start a practical AI workflow conversation.">
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base leading-8 text-white/54">
            Bring a healthcare workflow problem, patient experience idea, or AI automation concept into the lab.
          </p>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-100"
          >
            Start conversation <ArrowRight size={16} />
          </a>
        </div>
      </Section>

      <SignatureFooter />
    </main>
  );
}
