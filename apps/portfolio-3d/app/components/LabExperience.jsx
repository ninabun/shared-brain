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
  "Care Experience": Sparkles,
  "Clinical Operations": Activity,
  "Healthcare Intelligence": BrainCircuit,
};

const areaCtas = {
  "Care Experience": "View Care Solutions",
  "Clinical Operations": "View Clinical Solutions",
  "Healthcare Intelligence": "View Intelligence Solutions",
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

function FlowRingLogo({ className = "", showText = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Wing Yee AI Lab">
      <img
        src="/logo/ai-lab.png"
        alt=""
        className={`${showText ? "h-full w-auto" : "h-full w-full"} shrink-0 object-contain`}
        draggable="false"
      />
      {showText ? <span className="hidden whitespace-nowrap sm:inline">Wing Yee AI Lab</span> : null}
    </span>
  );
}

function HeaderLogo() {
  return (
    <span
      className="inline-flex items-center gap-2.5 rounded-full border border-white/62 bg-white/24 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(55,80,95,0.1)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl"
      aria-label="Wing Yee AI Lab"
    >
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/58 bg-[linear-gradient(145deg,rgba(255,255,255,0.38),rgba(105,124,136,0.2)_52%,rgba(43,57,68,0.18))] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-12px_22px_rgba(34,48,58,0.18),0_16px_34px_rgba(55,80,95,0.2)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_42%_28%,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_50%_96%,rgba(255,255,255,0.52),transparent_28%)]" />
        <img
          src="/logo/ai-lab.png"
          alt=""
          className="relative z-10 h-8 w-8 rounded-full object-cover"
          draggable="false"
        />
      </span>
      <span className="hidden whitespace-nowrap text-[15px] font-semibold tracking-[-0.03em] text-[#1b2430] sm:inline">
        Wing Yee AI Lab
      </span>
    </span>
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
      className={`relative flex aspect-square items-center justify-center ${className}`}
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
        className="relative flex h-[62%] w-[62%] items-center justify-center overflow-hidden rounded-[2rem] border border-white/66 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),rgba(204,222,231,0.28)_52%,rgba(89,111,126,0.18))] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),inset_10px_12px_24px_rgba(255,255,255,0.28),inset_-12px_-18px_32px_rgba(71,94,108,0.16),0_30px_100px_rgba(70,120,160,0.13)] ring-1 ring-[#1b2430]/10 backdrop-blur-2xl"
        animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.5),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent_54%)]" />
        <div className="absolute inset-[16%] rounded-[1.35rem] bg-white/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.52),inset_0_-12px_24px_rgba(71,94,108,0.08)] backdrop-blur-sm" />
        <FlowRingLogo className="relative z-10 h-[78%] w-[78%] overflow-hidden rounded-full opacity-100 contrast-125" />
      </motion.div>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 text-[#1b2430]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/" className="flex items-center">
          <HeaderLogo />
        </a>
        <div className="hidden items-center gap-2.5 text-[13px] text-[#1b2430]/68 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full border border-white/62 bg-white/36 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),inset_0_-10px_20px_rgba(85,110,125,0.06),0_12px_34px_rgba(55,80,95,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/52 hover:text-[#1b2430]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/62 bg-white/38 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_34px_rgba(55,80,95,0.12)] backdrop-blur-2xl md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>
      {open ? (
        <div className="mx-5 rounded-[1.5rem] border border-white/62 bg-white/64 px-4 py-4 shadow-[0_20px_60px_rgba(55,80,95,0.14)] backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/70 bg-white/50 px-4 py-3 text-sm text-[#1b2430]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
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
      className={`relative z-10 mx-auto min-h-[52vh] w-full max-w-7xl scroll-mt-24 px-5 py-20 text-[#1b2430] sm:scroll-mt-28 sm:px-8 sm:py-28 lg:px-12 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className="mb-6 text-base font-medium uppercase tracking-[0.28em] text-[#2f8396]/78 sm:text-lg">{eyebrow}</p> : null}
      {title ? (
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#1b2430] sm:text-5xl">
          {title}
        </h2>
      ) : null}
      {children}
    </motion.section>
  );
}

function ThinkingFramework() {
  const steps = content.thinking;

  return (
    <div className="relative mt-16 max-w-3xl">
      <motion.div
        className="absolute bottom-10 left-[1.15rem] top-7 w-px bg-gradient-to-b from-cyan-100/0 via-[#2f8396]/28 to-cyan-100/0"
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
          <div className="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#2f8396]/18 bg-white/78 text-[13px] text-[#2f8396]/72 shadow-[0_0_30px_rgba(155,239,255,0.16)]">
            {index + 1}
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#1b2430]/90">{step.title}</h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#526170]/76">{step.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PlatformArchitecture({ modules }) {
  return (
    <div className="relative mt-16">
      <motion.div
        className="pointer-events-none absolute left-[12%] right-[12%] top-16 hidden h-px bg-gradient-to-r from-transparent via-[#2f8396]/34 to-transparent lg:block"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-16 hidden h-2 w-28 -translate-x-1/2 rounded-full bg-cyan-100/28 blur-xl lg:block"
        animate={{ x: ["-44vw", "0vw", "44vw"], opacity: [0, 0.55, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative grid gap-6 lg:grid-cols-3">
      {modules.map((area, areaIndex) => {
        const Icon = iconMap[area.title] || Sparkles;
        const visibleProjects = area.projects.slice(0, 3);
        const cta = areaCtas[area.title] || "View Solutions";

        return (
          <motion.div
            key={area.title}
            className="group relative flex min-h-full flex-col overflow-hidden rounded-[2.1rem] border border-white/72 bg-[linear-gradient(145deg,rgba(255,255,255,0.7),rgba(225,238,244,0.58)_54%,rgba(192,211,220,0.38))] p-6 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_8px_10px_24px_rgba(255,255,255,0.36),inset_-12px_-18px_34px_rgba(83,112,128,0.11),0_24px_80px_rgba(40,70,88,0.13)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-700 hover:-translate-y-1 hover:bg-white/74 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_10px_12px_26px_rgba(255,255,255,0.42),inset_-14px_-20px_36px_rgba(83,112,128,0.1),0_34px_96px_rgba(40,100,120,0.17)] sm:p-7"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.9, delay: areaIndex * 0.08, ease: "easeInOut" }}
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute inset-x-8 top-4 h-10 rounded-full bg-white/22 blur-xl" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-100/28 blur-3xl transition duration-700 group-hover:bg-cyan-100/36" />
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1b2430]/10 bg-white/76 text-[#2f8396] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(55,80,95,0.1)]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span className="h-px flex-1 bg-gradient-to-r from-[#2f8396]/20 to-transparent" />
              </div>
              <h3 className="text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1b2430]">{area.title}</h3>
              <p className="mt-5 min-h-20 text-[15px] leading-7 text-[#334155]/82">{area.description}</p>
              <div className="mt-8 border-t border-[#1b2430]/10 pt-6">
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#526170]/72">Projects</p>
                <div className="mt-4 grid gap-2.5">
                  {visibleProjects.map((project) => (
                    <div
                      key={project.name}
                      className="relative overflow-hidden rounded-full border border-white/78 bg-white/38 px-5 py-3.5 text-[15px] font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_10px_10px_24px_rgba(255,255,255,0.28),inset_-12px_-16px_28px_rgba(82,105,116,0.1),0_16px_36px_rgba(58,84,98,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-500 hover:-translate-y-0.5 hover:bg-white/54 hover:text-[#1b2430]"
                    >
                      <span className="pointer-events-none absolute left-7 right-10 top-1.5 h-3 rounded-full bg-white/42 blur-sm" />
                      {project.name}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#1b2430]/10 bg-white/70 px-5 py-3 text-sm font-medium text-[#1b2430]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_16px_36px_rgba(27,36,48,0.08)] transition hover:-translate-y-0.5 hover:border-[#2f8396]/28 hover:text-[#1b2430]"
              >
                {cta} <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}

export default function LabExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.975]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);
  const heroIntroY = useTransform(scrollYProgress, [0, 0.13], [0, -8]);
  const { modules, roadmap } = content;
  const futureRoadmap = roadmap.slice(3);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <HeroBackground />
      <Header />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#f6f9fb]/72 via-[#f6f9fb]/36 to-transparent backdrop-blur-[1px]" />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start px-5 pb-8 pt-18 text-center sm:px-8 lg:px-12"
      >
        <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center gap-7 sm:gap-8">
          <motion.div
            className="flex max-w-6xl -translate-y-3 flex-col items-center px-5 py-3 sm:-translate-y-5 sm:px-8"
            style={{ y: heroIntroY }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="max-w-4xl text-[clamp(2.15rem,5.4vw,4.65rem)] font-semibold leading-[0.94] tracking-[-0.062em] text-[#1b2430]">
              Healthcare.
              <br />
              Reimagined.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#526170] sm:text-[1.28rem] sm:leading-8">
              AI Solutions for Modern Care.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.2em] text-[#526170]/76 sm:gap-x-4">
              {["Care Experience", "Clinical Operations", "Healthcare Intelligence"].map((item, index) => (
                <a
                  key={item}
                  href="#platform"
                  className="group inline-flex items-center gap-4 transition duration-300 hover:text-[#1b2430]"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2f8396]/55 transition-all duration-500 group-hover:w-full" />
                  </span>
                  {index < 2 ? <span className="text-[#526170]/32">&bull;</span> : null}
                </a>
              ))}
            </div>
          </motion.div>
          <HeroObject className="-mt-2 w-[min(34vw,132px)] opacity-84 sm:-mt-3" />
          <motion.a
            href="#platform"
            aria-label="Scroll to solutions"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[#1b2430]/36"
            animate={{ y: [0, 9, 0], opacity: [0.42, 0.78, 0.42] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-9 w-px bg-gradient-to-b from-transparent via-[#1b2430]/36 to-transparent" />
            <span className="text-[13px] uppercase tracking-[0.24em]">Scroll</span>
          </motion.a>
        </div>
      </motion.section>

      <Section id="platform" eyebrow="Solution Areas">
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526170]/82">
          Three areas where AI creates meaningful impact across modern healthcare.
        </p>
        <PlatformArchitecture modules={modules} />
      </Section>

      <Section
        id="how"
        eyebrow="How I Think"
        title="The product development framework behind AI solutions."
      >
        <ThinkingFramework />
      </Section>

      <Section id="about" eyebrow="About" title="Built between care, code and product design.">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-xl space-y-3 text-[14px] leading-6 tracking-[-0.005em] text-[#526170]/78 sm:text-[15px] sm:leading-7">
            <p>Wing Yee builds AI-powered healthcare products by combining clinical experience, computer science and product design.</p>
            <p>The goal is to transform everyday healthcare workflows into practical AI systems.</p>
          </div>
          <div className="grid gap-3 text-sm text-[#526170]/76">
            {["Care experience", "Clinical operations", "Healthcare intelligence", "Immersive communication"].map(
              (item) => (
                <div
                  key={item}
                  className="relative overflow-hidden rounded-full border border-white/78 bg-white/40 px-7 py-5 text-lg font-medium leading-7 text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_12px_12px_26px_rgba(255,255,255,0.3),inset_-14px_-18px_34px_rgba(82,105,116,0.11),0_18px_44px_rgba(58,84,98,0.13)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-500 hover:-translate-y-0.5 hover:bg-white/56 hover:text-[#1b2430] sm:text-xl"
                >
                  <span className="pointer-events-none absolute left-8 right-12 top-2 h-4 rounded-full bg-white/46 blur-sm" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      <Section id="mission" eyebrow="Mission" title="Technology should give healthcare professionals more time to care.">
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#526170]/82">
          AI should reduce repetitive work, improve communication, and create better healthcare experiences.
        </p>
      </Section>

      <Section id="roadmap" eyebrow="Roadmap" title="Future versions.">
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {futureRoadmap.map((item, index) => (
            <motion.div
              key={item}
              className="min-h-36 rounded-[1.35rem] border border-[#1b2430]/[0.085] bg-white/72 p-5 shadow-[0_18px_60px_rgba(80,120,140,0.08)] backdrop-blur-xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className="text-[13px] text-[#2f8396]/62">0{index + 1}</span>
              <p className="mt-10 text-base tracking-[-0.025em] text-[#1b2430]/76">{item}</p>
              <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-[#2f8396]/62">
                Future Version
              </p>
            </motion.div>
          ))}
        </div>
        <a
          href="#contact"
          className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-[#1b2430]/10 bg-white/72 px-5 py-3 text-[15px] font-medium text-[#1b2430]/78 transition hover:border-[#2f8396]/30 hover:text-[#1b2430]"
        >
          View Roadmap <ArrowRight size={15} />
        </a>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Start a practical AI workflow conversation.">
        <div className="mt-10 flex flex-col gap-5 border-t border-[#1b2430]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base leading-8 text-[#526170]/78">
            Bring a healthcare workflow problem, patient experience idea, or AI automation concept into the lab.
          </p>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#263343]"
          >
            Start conversation <ArrowRight size={16} />
          </a>
        </div>
      </Section>

    </main>
  );
}
