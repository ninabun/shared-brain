"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, BrainCircuit, Menu, Network, Sparkles, Workflow, X } from "lucide-react";
import { useState } from "react";
import content from "../data/lab.json";
import HeroBackground from "./HeroBackground";
import ProjectShowcase3D from "./ProjectShowcase3D";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Lab", href: "#ai-lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const heroTags = ["Healthcare AI", "AI Agents", "Workflow Automation", "Immersive Web"];
const iconMap = {
  "Healthcare AI": Activity,
  "AI Automation": Workflow,
  "Immersive Web": Network,
  "Creative AI": Sparkles,
};
const heroChoices = [
  { label: "Projects", href: "#projects", position: "left-[8%] top-[22%]" },
  { label: "AI Lab", href: "#ai-lab", position: "right-[7%] top-[28%]" },
  { label: "About", href: "#about", position: "left-[12%] bottom-[24%]" },
  { label: "Contact", href: "#contact", position: "right-[10%] bottom-[20%]" },
];

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
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#245c86" floodOpacity="0.22" />
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#021429" floodOpacity="0.2" />
        </filter>
      </defs>
      {sketch.paths.map((path, pathIndex) => (
        <g key={path}>
          <motion.path
            d={path}
            pathLength="1"
            stroke="#0e2a45"
            strokeWidth={pathIndex === 0 ? 20 : 14}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.12"
            filter={`url(#${shadowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.12 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.25, delay: 0.14 + pathIndex * 0.22, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={path}
            pathLength="1"
            stroke={`url(#${gradientId})`}
            strokeWidth={pathIndex === 0 ? 13 : 9}
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
            strokeWidth={pathIndex === 0 ? 4.2 : 3}
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
        </motion.g>
      ))}
    </svg>
  );
}

function HeroObject() {
  return (
    <motion.div
      className="relative flex aspect-square w-[min(76vw,430px)] items-center justify-center"
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

function HeroChoices({ opacity, y }) {
  return (
    <motion.div className="pointer-events-none absolute inset-0 hidden md:block" style={{ opacity, y }}>
      {heroChoices.map((choice, index) => (
        <motion.a
          key={choice.label}
          href={choice.href}
          className={`pointer-events-auto absolute ${choice.position} rounded-full border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-medium text-white/58 shadow-[0_18px_60px_rgba(80,220,255,0.08)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-cyan-100/30 hover:bg-white/12 hover:text-white`}
          initial={{ opacity: 0, scale: 0.86, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {choice.label}
        </motion.a>
      ))}
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
        <div className="hidden items-center gap-7 text-sm text-white/54 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
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
      className={`relative z-10 mx-auto min-h-[86vh] w-full max-w-7xl px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className="mb-5 text-xs uppercase tracking-[0.3em] text-cyan-100/42">{eyebrow}</p> : null}
      {title ? <h2 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl">{title}</h2> : null}
      {children}
    </motion.section>
  );
}

function ScrollJourney() {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 text-xs uppercase tracking-[0.34em] text-cyan-100/45">Scroll Journey</p>
        <div className="grid gap-3 md:grid-cols-5">
          {content.ecosystem.map((item, index) => (
            <motion.div
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white/68 shadow-[0_20px_80px_rgba(80,220,255,0.06)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ duration: 0.9, delay: index * 0.12, ease: "easeInOut" }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectGlassCard({ project, index }) {
  const Icon = iconMap[project.category] || BrainCircuit;

  return (
    <motion.article
      className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-white shadow-[0_38px_120px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition duration-700 hover:-translate-y-2 hover:border-cyan-100/35 hover:bg-white/[0.085] sm:p-7"
      initial={{ opacity: 0, y: 26, scale: 0.98, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ duration: 1.05, delay: index * 0.06, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(143,232,255,0.16),transparent_28%),radial-gradient(circle_at_22%_78%,rgba(157,116,255,0.12),transparent_30%)] opacity-80" />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-200/10 blur-3xl transition duration-700 group-hover:bg-cyan-200/18" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.08] text-cyan-100/78 shadow-[0_18px_60px_rgba(120,230,255,0.08)]">
            <Icon size={21} />
          </div>
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-cyan-100/42">{project.category}</p>
          <h3 className="text-3xl font-semibold leading-[1] tracking-[-0.045em] text-white">{project.title}</h3>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/56">{project.statement}</p>
        </div>
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tools.slice(0, 3).map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[11px] text-white/48">
                {tool}
              </span>
            ))}
          </div>
          <a href={project.href} className="inline-flex items-center gap-2 text-sm text-white/72 transition group-hover:text-white">
            View signal <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ProductPanel({ project, index }) {
  const alignRight = index % 2 === 1;

  return (
    <motion.article
      className={`grid min-h-[76vh] items-center gap-10 border-t border-black/[0.07] py-16 lg:grid-cols-2 lg:py-24 ${
        alignRight ? "lg:[&>div:first-child]:order-2" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-black/38">{project.category}</p>
        <h3 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl">
          {project.title}
        </h3>
        <p className="mt-6 max-w-xl text-xl leading-8 text-black/56">{project.statement}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tools.slice(0, 4).map((tool) => (
            <span key={tool} className="rounded-full border border-black/10 bg-white/58 px-3 py-1 text-xs text-black/54">
              {tool}
            </span>
          ))}
        </div>
        <a href={project.href} className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-black/62">
          Learn more <ArrowRight size={15} />
        </a>
      </div>

      <div className="relative mx-auto flex aspect-[4/3] w-full max-w-xl items-center justify-center overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#f8fdff] via-[#dff2f7] to-[#cbd7ff] shadow-[0_48px_140px_rgba(42,91,126,0.16)] ring-1 ring-white/70">
        <ProjectShowcase3D index={index} />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_38%_28%,rgba(255,255,255,0.66),transparent_30%),radial-gradient(circle_at_72%_64%,rgba(45,111,210,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.48),transparent_44%)]"
          initial={{ opacity: 0, scale: 1.04, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 bottom-8 h-44 w-44 rounded-full bg-[#b7eef8]/42 blur-3xl"
          initial={{ opacity: 0, scale: 0.82 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.35, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.div
          className="absolute -right-12 top-10 h-40 w-40 rounded-full bg-[#7e8cff]/22 blur-3xl"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.35, ease: "easeInOut", delay: 0.16 }}
        />
        <motion.div
          className="absolute inset-x-8 bottom-8 top-8 rounded-[2rem] bg-white/28 shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-18px_36px_rgba(76,127,185,0.08),0_30px_110px_rgba(85,120,140,0.14)] backdrop-blur-2xl"
          initial={{ y: 24, scale: 0.96, rotateX: 10, rotateZ: alignRight ? -2.6 : 2.6, opacity: 0, filter: "blur(14px)" }}
          whileInView={{ y: 0, scale: 1, rotateX: 0, rotateZ: alignRight ? -1.6 : 1.6, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-16%" }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
        />
        <motion.div
          className="relative flex h-[78%] w-[82%] items-center justify-center rounded-[2rem] border border-white/80 bg-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_30px_90px_rgba(55,103,142,0.14)] backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 18, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-16%" }}
          transition={{ duration: 1.15, ease: "easeInOut", delay: 0.08 }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-center"
            animate={{ y: [0, -8, 0], rotate: [0, alignRight ? -1 : 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <DrawingStroke index={index} />
          </motion.div>
        </motion.div>
        <motion.span
          className="absolute bottom-6 right-7 text-xs tracking-[0.28em] text-black/28"
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-16%" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.22 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>
    </motion.article>
  );
}

function EcosystemMap() {
  return (
    <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-8">
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 320" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M90 160C250 82 360 238 500 160C640 82 750 238 910 160"
          pathLength="1"
          stroke="url(#ecosystem-line)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="ecosystem-line" x1="90" y1="160" x2="910" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9befff" stopOpacity="0" />
            <stop offset="0.48" stopColor="#d9c7ff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#9befff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative grid gap-4 md:grid-cols-5">
      {content.ecosystem.map((item, index) => (
        <motion.div
          key={item}
          className="relative rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-white shadow-[0_20px_70px_rgba(120,230,255,0.04)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.75, delay: index * 0.1, ease: "easeInOut" }}
        >
          <motion.div
            className="mb-12 h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(155,239,255,0.85)]"
            initial={{ scale: 0.6, opacity: 0.3 }}
            whileInView={{ scale: [0.8, 1.35, 1], opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease: "easeInOut" }}
          />
          <span className="text-xs text-cyan-100/38">0{index + 1}</span>
          <p className="mt-4 text-sm leading-6 text-white/68">{item}</p>
        </motion.div>
      ))}
      </div>
    </div>
  );
}

function DemoConsole() {
  const tabs = ["Roster Fairness", "Agent Briefing", "Experience Layer"];

  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050914]/78 p-5 text-white shadow-[0_50px_160px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-5">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab}
            className={`rounded-full border px-4 py-2 text-xs transition ${
              index === 0 ? "border-cyan-100/35 bg-cyan-100/10 text-cyan-50" : "border-white/10 bg-white/[0.035] text-white/48"
            }`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: "easeInOut" }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-4 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/38">Live Console</p>
          <div className="mt-8 space-y-3">
            {["Fairness balance", "Shift coverage", "Agent summary"].map((label, index) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-xs text-white/48">
                  <span>{label}</span>
                  <span>{[92, 87, 96][index]}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-100 to-violet-200"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${[92, 87, 96][index]}%` }}
                    viewport={{ once: true, margin: "-18%" }}
                    transition={{ duration: 1.2, delay: index * 0.12, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {["Roster signal clean", "Briefing generated", "Experience ready"].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-5"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.09, ease: "easeInOut" }}
            >
              <p className="text-sm text-white/68">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
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
          <p className="text-xs uppercase tracking-[0.34em] text-black/42">Personal Mark</p>
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
          <p className="text-xs uppercase tracking-[0.28em] text-black/35">Wing Yee AI Lab</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default function LabExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.965]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.58]);
  const heroIntroOpacity = useTransform(scrollYProgress, [0, 0.055, 0.13], [0, 0.72, 1]);
  const heroIntroY = useTransform(scrollYProgress, [0, 0.13], [26, 0]);
  const heroChoicesOpacity = useTransform(scrollYProgress, [0.035, 0.1, 0.2], [0, 1, 1]);
  const heroChoicesY = useTransform(scrollYProgress, [0.035, 0.14], [18, 0]);
  const { site, projects, research } = content;

  return (
    <main className="min-h-screen overflow-hidden bg-[#04070d] text-white">
      <HeroBackground />
      <Header />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-[118vh] max-w-7xl flex-col items-center justify-start px-5 pb-12 pt-24 text-center sm:px-8 lg:px-12"
      >
        <div className="sticky top-20 flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center">
          <HeroChoices opacity={heroChoicesOpacity} y={heroChoicesY} />
          <HeroObject />
          <motion.div className="mt-8 flex flex-col items-center" style={{ opacity: heroIntroOpacity, y: heroIntroY }}>
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-cyan-100/48">{site.name}</p>
            <h1 className="max-w-4xl text-[clamp(3rem,9vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white">
              Clinical AI Intelligence
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-xl sm:leading-8">
              AI systems for healthcare workflows, automation and immersive digital experience.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2 md:hidden">
              {heroChoices.map((choice) => (
                <a
                  key={choice.label}
                  href={choice.href}
                  className="rounded-full border border-white/10 bg-white/[0.075] px-4 py-2 text-xs font-medium text-white/64 backdrop-blur-xl"
                >
                  {choice.label}
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {heroTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[11px] text-white/42 backdrop-blur-xl">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <ScrollJourney />

      <Section id="projects" eyebrow="Selected Work" title="Signals from the lab.">
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectGlassCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Section>

      <Section id="ai-lab" eyebrow="AI Ecosystem" title="From clinical knowledge to intelligent experience.">
        <EcosystemMap />
      </Section>

      <Section id="featured-demo" eyebrow="Featured Demo" title="Clinical Flow Console.">
        <DemoConsole />
      </Section>

      <Section id="mission" eyebrow="Mission" title="Useful intelligence, quietly integrated into care.">
        <p className="mt-10 max-w-3xl text-xl leading-9 text-white/62">
          Less friction. Clearer workflows. Better digital experiences for people who care for others.
        </p>
      </Section>

      <Section id="about" eyebrow="About" title="A healthcare professional building with computer science fluency.">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <p className="max-w-3xl text-2xl leading-[1.35] tracking-[-0.035em] text-white/68 sm:text-4xl">
            Wing Yee Lee combines clinical practice, computer science and AI to design practical systems that make
            healthcare workflows clearer, faster and more human.
          </p>
          <div className="grid gap-3 text-sm text-white/62">
            {["Registered Nurse and Midwife", "Master in Computer Science", "Master in Nursing", "Bachelor in Tourism Management"].map(
              (item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(120,230,255,0.04)] backdrop-blur-xl">
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      <Section id="research" eyebrow="Research" title="Agentic healthcare tools and spatial AI interfaces.">
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {research.map((item, index) => (
            <motion.div
              key={item}
              className="min-h-44 rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(120,230,255,0.04)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className="text-xs text-cyan-100/35">0{index + 1}</span>
              <p className="mt-16 text-lg tracking-[-0.03em] text-white/72">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Build the next clinical AI experience.">
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-lg leading-8 text-white/56">
            Available for AI workflow design, healthcare automation, immersive web prototypes and creative AI systems.
          </p>
          <a
            href="#projects"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-cyan-100"
          >
            Explore collaboration areas <ArrowRight size={16} />
          </a>
        </div>
      </Section>

      <SignatureFooter />
    </main>
  );
}
