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

const areaThemes = {
  "Care Experience": {
    color: "#63E6D8",
    rgb: "99,230,216",
    atmosphere: "soft flowing glow",
  },
  "Clinical Operations": {
    color: "#4F8BFF",
    rgb: "79,139,255",
    atmosphere: "structured workflow light",
  },
  "Healthcare Intelligence": {
    color: "#8B7BFF",
    rgb: "139,123,255",
    atmosphere: "constellation intelligence glow",
  },
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
      className="inline-flex items-center rounded-full border border-white/50 bg-white/34 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(8,18,28,0.14)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-300 hover:bg-white/50 sm:text-[15px]"
      aria-label="Wing Yee AI Lab"
    >
      Wing Yee AI Lab
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

function HeroObject({ className = "", style = {} }) {
  const orbitDots = [
    { className: "left-[13%] top-[34%] h-2.5 w-2.5", delay: 0 },
    { className: "right-[18%] top-[24%] h-3 w-3", delay: 0.9 },
    { className: "bottom-[20%] left-[28%] h-2 w-2", delay: 1.6 },
    { className: "bottom-[30%] right-[14%] h-2.5 w-2.5", delay: 2.2 },
  ];

  return (
    <motion.div
      className={`relative flex aspect-square items-center justify-center ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.94, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,var(--sphere-glow,rgba(165,230,255,0.2)),transparent_58%)] blur-3xl"
        animate={{ opacity: [0.36, 0.68, 0.36], scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-full border border-white/18 bg-[radial-gradient(circle_at_50%_50%,var(--sphere-core,rgba(220,250,255,0.34)),transparent_15%),radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.46),transparent_22%),radial-gradient(circle_at_62%_66%,var(--sphere-edge,rgba(110,200,230,0.18)),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.18),rgba(60,83,106,0.1)_42%,rgba(7,15,28,0.26))] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_16px_20px_42px_rgba(255,255,255,0.1),inset_-22px_-30px_52px_rgba(2,10,18,0.34),0_30px_130px_var(--sphere-shadow,rgba(80,190,225,0.2))] ring-1 ring-cyan-100/14 backdrop-blur-2xl"
        animate={{ rotate: [0, 4, 0], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-[9%] rounded-full border border-cyan-100/18" />
        <div className="absolute inset-[18%] rounded-full border border-white/10" />
        <div className="absolute left-[10%] right-[10%] top-1/2 h-px -rotate-12 bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent" />
        <div className="absolute left-[13%] right-[13%] top-[36%] h-px rotate-[22deg] bg-gradient-to-r from-transparent via-white/22 to-transparent" />
        <div className="absolute left-[20%] right-[17%] top-[64%] h-px rotate-[8deg] bg-gradient-to-r from-transparent via-cyan-100/24 to-transparent" />
        <svg className="absolute inset-[12%] h-[76%] w-[76%] opacity-38" viewBox="0 0 220 220" fill="none">
          <path d="M38 110C72 52 150 52 184 110C152 166 70 166 38 110Z" stroke="rgba(205,244,255,0.46)" strokeWidth="1" />
          <path d="M70 62C96 94 122 132 160 160" stroke="rgba(255,255,255,0.34)" strokeWidth="1" />
          <path d="M158 58C124 90 98 132 62 166" stroke="rgba(160,224,255,0.32)" strokeWidth="1" />
          {[52, 82, 112, 146, 174].map((cx, index) => (
            <circle key={cx} cx={cx} cy={index % 2 ? 70 + index * 22 : 150 - index * 16} r="2.4" fill="rgba(235,252,255,0.72)" />
          ))}
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),var(--sphere-core-strong,rgba(177,236,255,0.52))_34%,var(--sphere-core-soft,rgba(88,178,220,0.12))_68%,transparent)] blur-[1px]"
          animate={{ opacity: [0.65, 1, 0.65], scale: [0.86, 1.12, 0.86] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-[4%] rounded-full border border-cyan-100/22"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {orbitDots.map((dot) => (
          <motion.span
            key={dot.className}
            className={`absolute rounded-full bg-cyan-50/78 shadow-[0_0_22px_rgba(180,240,255,0.72)] ${dot.className}`}
            animate={{ opacity: [0.28, 0.9, 0.28], scale: [0.78, 1.12, 0.78] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}
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
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/48 bg-white/36 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_12px_34px_rgba(7,15,28,0.12)] backdrop-blur-2xl md:hidden"
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
        className="pointer-events-none absolute left-[12%] right-[12%] top-16 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(99,230,216,0.36)_18%,rgba(79,139,255,0.3)_50%,rgba(139,123,255,0.28)_82%,transparent)] lg:block"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-16 hidden h-2 w-28 -translate-x-1/2 rounded-full bg-[#63E6D8]/28 blur-xl lg:block"
        animate={{
          x: ["-44vw", "0vw", "44vw"],
          opacity: [0, 0.55, 0],
          backgroundColor: ["rgba(99,230,216,0.28)", "rgba(79,139,255,0.28)", "rgba(139,123,255,0.28)"],
        }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative grid gap-6 lg:grid-cols-3">
      {modules.map((area, areaIndex) => {
        const Icon = iconMap[area.title] || Sparkles;
        const visibleProjects = area.projects.slice(0, 3);
        const cta = areaCtas[area.title] || "View Solutions";
        const theme = areaThemes[area.title] || areaThemes["Care Experience"];

        return (
          <motion.div
            key={area.title}
            className="group relative flex min-h-full flex-col overflow-hidden rounded-[2.1rem] border border-[rgba(var(--area-rgb),0.2)] bg-[linear-gradient(145deg,rgba(255,255,255,0.7),rgba(225,238,244,0.58)_54%,rgba(192,211,220,0.38))] p-6 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_8px_10px_24px_rgba(255,255,255,0.36),inset_-12px_-18px_34px_rgba(83,112,128,0.11),0_24px_80px_rgba(40,70,88,0.13)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-700 hover:-translate-y-1 hover:border-[rgba(var(--area-rgb),0.38)] hover:bg-white/74 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_10px_12px_26px_rgba(255,255,255,0.42),inset_-14px_-20px_36px_rgba(83,112,128,0.1),0_34px_96px_rgba(var(--area-rgb),0.18)] sm:p-7"
            style={{ "--area-color": theme.color, "--area-rgb": theme.rgb }}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.9, delay: areaIndex * 0.08, ease: "easeInOut" }}
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-50" />
            <div className="absolute inset-x-8 top-4 h-10 rounded-full bg-white/22 blur-xl" />
            <motion.div
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(var(--area-rgb),0.16)] blur-3xl transition duration-700 group-hover:bg-[rgba(var(--area-rgb),0.24)]"
              animate={{ opacity: [0.42, 0.7, 0.42], scale: areaIndex === 1 ? [1, 1.04, 1] : [0.96, 1.06, 0.96] }}
              transition={{ duration: areaIndex === 1 ? 5 : 6.5, repeat: Infinity, ease: "easeInOut", delay: areaIndex * 0.7 }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
              <span className="absolute left-[16%] top-[18%] h-1.5 w-1.5 rounded-full bg-[var(--area-color)] shadow-[0_0_18px_rgba(var(--area-rgb),0.75)]" />
              <span className="absolute right-[18%] top-[44%] h-1 w-1 rounded-full bg-[var(--area-color)] shadow-[0_0_16px_rgba(var(--area-rgb),0.65)]" />
              <span className="absolute bottom-[20%] left-[30%] h-1 w-1 rounded-full bg-[var(--area-color)] shadow-[0_0_16px_rgba(var(--area-rgb),0.65)]" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(var(--area-rgb),0.24)] bg-white/76 text-[var(--area-color)] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(var(--area-rgb),0.1)]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span className="h-px flex-1 bg-gradient-to-r from-[rgba(var(--area-rgb),0.32)] to-transparent" />
              </div>
              <h3 className="text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1b2430]">{area.title}</h3>
              <p className="mt-5 min-h-20 text-[15px] leading-7 text-[#334155]/82">{area.description}</p>
              <div className="mt-8 border-t border-[#1b2430]/10 pt-6">
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#526170]/72">Projects</p>
                <div className="mt-4 grid gap-2.5">
                  {visibleProjects.map((project) => (
                    <div
                      key={project.name}
                      className="relative overflow-hidden rounded-full border border-white/78 bg-white/38 px-5 py-3.5 text-[15px] font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_10px_10px_24px_rgba(255,255,255,0.28),inset_-12px_-16px_28px_rgba(82,105,116,0.1),0_16px_36px_rgba(58,84,98,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-500 hover:-translate-y-0.5 hover:border-[rgba(var(--area-rgb),0.26)] hover:bg-white/54 hover:text-[#1b2430] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_10px_10px_24px_rgba(255,255,255,0.28),inset_-12px_-16px_28px_rgba(82,105,116,0.1),0_18px_42px_rgba(var(--area-rgb),0.14)]"
                    >
                      <span className="pointer-events-none absolute left-7 right-10 top-1.5 h-3 rounded-full bg-white/42 blur-sm" />
                      <span className="pointer-events-none absolute bottom-0 left-8 right-12 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-0 transition duration-500 group-hover:opacity-35" />
                      {project.name}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#1b2430]/10 bg-white/70 px-5 py-3 text-sm font-medium text-[#1b2430]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_16px_36px_rgba(27,36,48,0.08)] transition hover:-translate-y-0.5 hover:border-[rgba(var(--area-rgb),0.34)] hover:text-[#1b2430] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_18px_42px_rgba(var(--area-rgb),0.13)]"
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
  const sphereGlow = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54],
    ["rgba(165,230,255,0.2)", "rgba(99,230,216,0.24)", "rgba(79,139,255,0.22)", "rgba(139,123,255,0.22)"]
  );
  const sphereCore = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54],
    ["rgba(220,250,255,0.34)", "rgba(99,230,216,0.28)", "rgba(79,139,255,0.26)", "rgba(139,123,255,0.26)"]
  );
  const sphereShadow = useTransform(
    scrollYProgress,
    [0, 0.18, 0.36, 0.54],
    ["rgba(80,190,225,0.2)", "rgba(99,230,216,0.18)", "rgba(79,139,255,0.17)", "rgba(139,123,255,0.17)"]
  );
  const { modules, roadmap } = content;
  const futureRoadmap = roadmap.slice(3);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <HeroBackground />
      <Header />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-white/12 via-white/6 to-transparent backdrop-blur-[1px]" />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start overflow-hidden px-5 pb-8 pt-18 text-center sm:px-8 lg:px-12"
      >
        <div className="absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_50%_38%,rgba(75,178,215,0.32),transparent_28%),radial-gradient(circle_at_50%_24%,rgba(175,220,255,0.16),transparent_18%),linear-gradient(180deg,rgba(3,8,16,0.9)_0%,rgba(7,17,28,0.82)_54%,rgba(10,22,34,0.7)_78%,rgba(246,249,251,0)_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-[linear-gradient(180deg,rgba(3,8,16,0.32),transparent_38%,rgba(246,249,251,0.18)_100%)]" />
        <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center gap-6 pt-4 sm:gap-7 sm:pt-6">
          <HeroObject
            className="w-[min(76vw,350px)] sm:w-[min(58vw,430px)] lg:w-[min(43vw,480px)]"
            style={{
              "--sphere-glow": sphereGlow,
              "--sphere-core": sphereCore,
              "--sphere-edge": sphereCore,
              "--sphere-shadow": sphereShadow,
              "--sphere-core-strong": sphereCore,
              "--sphere-core-soft": sphereShadow,
            }}
          />
          <motion.div
            className="flex max-w-5xl flex-col items-center px-5 py-3 sm:px-8"
            style={{ y: heroIntroY }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="max-w-4xl text-[clamp(2.25rem,4.8vw,4.55rem)] font-semibold leading-[0.94] tracking-[-0.062em] text-[#f7fbff]">
              Healthcare.
              <br />
              Reimagined.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#d7e4ec]/82 sm:mt-6 sm:text-[1.14rem] sm:leading-8">
              AI Solutions for Modern Care.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-[#d7e4ec]/58 sm:gap-x-4 sm:text-[12px]">
              {["Patient Experience", "Clinical Operations", "Healthcare Intelligence"].map((item, index) => (
                <a
                  key={item}
                  href="#platform"
                  className="group inline-flex items-center gap-4 transition duration-300 hover:text-[#f7fbff]/88"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-100/55 transition-all duration-500 group-hover:w-full" />
                  </span>
                  {index < 2 ? <span className="text-[#d7e4ec]/28">&bull;</span> : null}
                </a>
              ))}
            </div>
          </motion.div>
          <motion.a
            href="#platform"
            aria-label="Scroll to solutions"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[#d7e4ec]/38"
            animate={{ y: [0, 9, 0], opacity: [0.42, 0.78, 0.42] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-9 w-px bg-gradient-to-b from-transparent via-cyan-100/42 to-transparent" />
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
