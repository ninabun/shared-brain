"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, BrainCircuit, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import content from "../data/lab.json";
import { getProjectSlug } from "../data/projects";

const HERO_CRYSTAL_FRAME_COUNT = 300;
const HERO_CRYSTAL_FRAME_PATH = "/animations/healthcare-crystal-loop/webp/frame-";
const HERO_CRYSTAL_FRAME_EXT = ".webp";
const HERO_CRYSTAL_LOOP_MS = 25000;
const HERO_CRYSTAL_THEME_MS = 5000;
const HERO_CRYSTAL_THEMES = [
  { color: "#63E6D8", rgb: "99,230,216" },
  { color: "#4F8BFF", rgb: "79,139,255" },
  { color: "#8B7BFF", rgb: "139,123,255" },
];

const navItems = [
  { label: "Solutions", href: "#platform" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const iconMap = {
  "Care Experience": Sparkles,
  "Clinical Operations": Activity,
  "Healthcare Intelligence": BrainCircuit,
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

function CollapsibleSection({ id, label, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  return (
    <section id={id} className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-5 sm:scroll-mt-28 sm:px-8 lg:px-12">
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-6 border-t border-[#1b2430]/10 py-5 text-left sm:py-6"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1b2430]/72 sm:text-base">{label}</span>
        <span className="flex items-center text-[#526170]/62">
          <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      <div id={`${id}-content`} className={`grid transition-[grid-template-rows,opacity] duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="pb-12 pt-3 sm:pb-16">{children}</div>
        </div>
      </div>
    </section>
  );
}

function HeroCrystalLoop() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const loadedRef = useRef([]);
  const lastFrameRef = useRef(0);
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const size = 720;
    canvas.width = size;
    canvas.height = size;

    let cancelled = false;
    let animationFrame;
    const startedAt = performance.now();
    const frameDuration = HERO_CRYSTAL_LOOP_MS / HERO_CRYSTAL_FRAME_COUNT;

    function drawFrame(index) {
      const image = framesRef.current[index] || framesRef.current[lastFrameRef.current];
      if (!image) return;

      context.clearRect(0, 0, size, size);
      context.drawImage(image, 0, 0, size, size);
      lastFrameRef.current = index;
    }

    for (let index = 0; index < HERO_CRYSTAL_FRAME_COUNT; index += 1) {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (cancelled) return;
        loadedRef.current[index] = true;
        framesRef.current[index] = image;
        if (index === 0) drawFrame(0);
      };
      image.src = `${HERO_CRYSTAL_FRAME_PATH}${String(index + 1).padStart(3, "0")}${HERO_CRYSTAL_FRAME_EXT}`;
    }

    function tick(now) {
      const elapsed = (now - startedAt) % HERO_CRYSTAL_LOOP_MS;
      const targetFrame = Math.min(HERO_CRYSTAL_FRAME_COUNT - 1, Math.floor(elapsed / frameDuration));

      if (loadedRef.current[targetFrame]) {
        drawFrame(targetFrame);
      } else {
        for (let offset = 1; offset < HERO_CRYSTAL_FRAME_COUNT; offset += 1) {
          const fallbackFrame = (targetFrame - offset + HERO_CRYSTAL_FRAME_COUNT) % HERO_CRYSTAL_FRAME_COUNT;
          if (loadedRef.current[fallbackFrame]) {
            drawFrame(fallbackFrame);
            break;
          }
        }
      }

      animationFrame = requestAnimationFrame(tick);
    }

    animationFrame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const themeTimer = window.setInterval(() => {
      setThemeIndex((current) => (current + 1) % HERO_CRYSTAL_THEMES.length);
    }, HERO_CRYSTAL_THEME_MS);

    return () => window.clearInterval(themeTimer);
  }, []);

  const theme = HERO_CRYSTAL_THEMES[themeIndex];

  return (
    <motion.div
      className="pointer-events-none relative aspect-square w-[min(78vw,380px)] sm:w-[min(50vw,490px)] lg:w-[min(40vw,560px)]"
      style={{ "--crystal-color": theme.color, "--crystal-rgb": theme.rgb }}
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-[8%] rounded-full bg-[rgba(var(--crystal-rgb),0.13)] blur-3xl"
        animate={{ opacity: [0.38, 0.7, 0.38], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-[7%] rounded-full border border-[rgba(var(--crystal-rgb),0.22)] shadow-[0_0_52px_rgba(var(--crystal-rgb),0.2),inset_0_0_38px_rgba(var(--crystal-rgb),0.1)] transition-[border-color,box-shadow] duration-[1500ms]" />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Healthcare Reimagined crystal sphere animation"
        className="relative z-10 h-full w-full object-contain transition-[filter] duration-[1500ms]"
        style={{
          filter: `drop-shadow(0 0 22px rgba(${theme.rgb},0.32)) drop-shadow(0 18px 54px rgba(${theme.rgb},0.16))`,
        }}
      />
    </motion.div>
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

function PlatformArchitecture({ modules, onActivateArea }) {
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
        const visibleProjects = area.projects;
        const theme = areaThemes[area.title] || areaThemes["Care Experience"];

        return (
          <motion.div
            key={area.title}
            className="group relative flex min-h-full flex-col overflow-hidden rounded-[2.1rem] border border-[rgba(var(--area-rgb),0.2)] bg-[linear-gradient(145deg,rgba(255,255,255,0.44),rgba(230,241,246,0.34)_54%,rgba(190,210,222,0.2))] p-6 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),inset_8px_10px_24px_rgba(255,255,255,0.22),inset_-12px_-18px_34px_rgba(83,112,128,0.09),0_24px_80px_rgba(40,70,88,0.11)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-700 hover:-translate-y-2 hover:border-[rgba(var(--area-rgb),0.55)] hover:bg-white/52 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_10px_12px_26px_rgba(255,255,255,0.3),inset_-14px_-20px_36px_rgba(83,112,128,0.1),0_38px_110px_rgba(var(--area-rgb),0.24)] sm:p-7"
            style={{ "--area-color": theme.color, "--area-rgb": theme.rgb }}
            onHoverStart={() => onActivateArea?.(area.title)}
            onFocus={() => onActivateArea?.(area.title)}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            onViewportEnter={() => onActivateArea?.(area.title)}
            viewport={{ once: true, margin: "-14%" }}
            transition={{ duration: 0.9, delay: areaIndex * 0.08, ease: "easeInOut" }}
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-50" />
            <div className="absolute inset-x-8 top-4 h-10 rounded-full bg-white/22 blur-xl transition duration-700 group-hover:bg-[rgba(var(--area-rgb),0.16)]" />
            <div className="absolute inset-x-10 top-2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-700 group-hover:opacity-90" />
            <motion.div
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(var(--area-rgb),0.16)] blur-3xl transition duration-700 group-hover:bg-[rgba(var(--area-rgb),0.24)]"
              animate={{ opacity: [0.42, 0.7, 0.42], scale: areaIndex === 1 ? [1, 1.04, 1] : [0.96, 1.06, 0.96] }}
              transition={{ duration: areaIndex === 1 ? 5 : 6.5, repeat: Infinity, ease: "easeInOut", delay: areaIndex * 0.7 }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
              <span className="absolute left-8 right-10 top-10 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-50" />
              <span className="absolute bottom-10 left-10 right-16 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-35" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(var(--area-rgb),0.24)] bg-white/76 text-[var(--area-color)] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(var(--area-rgb),0.1)] transition duration-500 group-hover:border-[rgba(var(--area-rgb),0.46)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_34px_rgba(var(--area-rgb),0.24)]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <span className="h-px flex-1 bg-gradient-to-r from-[rgba(var(--area-rgb),0.32)] to-transparent" />
              </div>
              <h3 className="text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#1b2430] transition duration-500 group-hover:text-[var(--area-color)]">{area.title}</h3>
              <p className="mt-5 min-h-20 text-[15px] leading-7 text-[#334155]/82">{area.description}</p>
              <div className="mt-8 border-t border-[#1b2430]/10 pt-6">
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#526170]/72">Projects</p>
                <div className="mt-4 grid grid-cols-1 gap-2.5">
                  {visibleProjects.map((project) => {
                    const slug = getProjectSlug(project.name);
                    const hasProjectPage = slug !== "#contact";
                    const Component = hasProjectPage ? "a" : "div";

                    return (
                      <Component
                        key={project.name}
                        {...(hasProjectPage ? { href: `/projects/${slug}` } : {})}
                        className={`relative overflow-hidden rounded-full border border-white/78 bg-white/38 px-5 py-3.5 text-[15px] font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_10px_10px_24px_rgba(255,255,255,0.28),inset_-12px_-16px_28px_rgba(82,105,116,0.1),0_16px_36px_rgba(58,84,98,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition duration-500 ${hasProjectPage ? "hover:-translate-y-0.5 hover:border-[rgba(var(--area-rgb),0.26)] hover:bg-white/54 hover:text-[#1b2430] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_10px_10px_24px_rgba(255,255,255,0.28),inset_-12px_-16px_28px_rgba(82,105,116,0.1),0_18px_42px_rgba(var(--area-rgb),0.14)]" : "cursor-default opacity-72"}`}
                        onMouseEnter={() => onActivateArea?.(area.title)}
                      >
                        <span className="pointer-events-none absolute left-7 right-10 top-1.5 h-3 rounded-full bg-white/42 blur-sm" />
                        <span className="pointer-events-none absolute bottom-0 left-8 right-12 h-px bg-gradient-to-r from-transparent via-[var(--area-color)] to-transparent opacity-0 transition duration-500 group-hover:opacity-35" />
                        <span className="relative z-10 flex items-center justify-between gap-3">
                          <span>{project.name}</span>
                          {hasProjectPage ? <ArrowRight size={13} /> : null}
                        </span>
                      </Component>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}

export default function LabExperience() {
  const [activeArea, setActiveArea] = useState("Healthcare Intelligence");
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.975]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);
  const heroIntroY = useTransform(scrollYProgress, [0, 0.13], [0, -8]);
  const { modules, roadmap } = content;
  const futureRoadmap = roadmap.slice(3);
  const activeTheme = areaThemes[activeArea] || areaThemes["Healthcare Intelligence"];

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]"
      style={{
        "--active-color": activeTheme.color,
        "--active-rgb": activeTheme.rgb,
      }}
    >
      <Header />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-white/12 via-white/6 to-transparent backdrop-blur-[1px]" />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 isolate mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start overflow-hidden px-5 pb-8 pt-18 text-center sm:px-8 lg:px-12"
      >
        <div className="absolute left-1/2 top-0 z-0 h-full w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_50%_38%,rgba(120,170,210,0.12),transparent_34%),radial-gradient(circle_at_50%_42%,rgba(var(--active-rgb),0.08),transparent_36%),linear-gradient(180deg,#F7FAFC_0%,#EEF4F8_54%,#E6EEF5_100%)] transition-colors duration-[1800ms]" />
        <div className="absolute left-1/2 top-0 z-[2] h-full w-screen -translate-x-1/2 opacity-35 [background-image:linear-gradient(90deg,rgba(120,170,200,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)] [background-size:132px_132px]" />
        <motion.div
          className="absolute left-[12%] top-[22%] z-[2] h-px w-[76%] rotate-[-6deg] bg-gradient-to-r from-transparent via-[rgba(120,170,200,0.18)] to-transparent"
          animate={{ x: ["-4%", "5%", "-4%"], opacity: [0.025, 0.075, 0.025] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex min-h-[calc(100vh-3.5rem)] w-full -translate-y-8 flex-col items-center justify-center gap-4 pt-4 sm:-translate-y-10 sm:gap-5 sm:pt-6">
          <HeroCrystalLoop />
          <motion.div
            className="flex max-w-5xl flex-col items-center px-5 py-1 sm:px-8"
            style={{ y: heroIntroY }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="max-w-2xl text-base leading-7 text-[#526170]/90 sm:text-[1.18rem] sm:leading-8">
              AI Solutions for Modern Care.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-[#526170]/68 sm:gap-x-4 sm:text-[12px]">
              {[
                { label: "Care Experience", area: "Care Experience" },
                { label: "Clinical Operations", area: "Clinical Operations" },
                { label: "Healthcare Intelligence", area: "Healthcare Intelligence" },
              ].map((item, index) => (
                <a
                  key={item.label}
                  href="#platform"
                  className="group inline-flex items-center gap-4 transition duration-300 hover:text-[#1b2430]"
                  onMouseEnter={() => setActiveArea(item.area)}
                  onFocus={() => setActiveArea(item.area)}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--active-color)] transition-all duration-500 group-hover:w-full" />
                  </span>
                  {index < 2 ? <span className="h-px w-5 bg-[#526170]/22" /> : null}
                </a>
              ))}
            </div>
          </motion.div>
          <motion.a
            href="#platform"
            aria-label="Scroll to solutions"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[#526170]/42"
            animate={{ y: [0, 9, 0], opacity: [0.42, 0.78, 0.42] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-9 w-px bg-gradient-to-b from-transparent via-[#526170]/32 to-transparent" />
            <span className="text-[13px] uppercase tracking-[0.24em]">Scroll</span>
          </motion.a>
        </div>
      </motion.section>

      <Section id="platform" eyebrow="Solution Areas">
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526170]/82">
          Three areas where AI creates meaningful impact across modern healthcare.
        </p>
        <PlatformArchitecture modules={modules} onActivateArea={setActiveArea} />
      </Section>

      <CollapsibleSection id="how" label="How I Think">
        <ThinkingFramework />
      </CollapsibleSection>

      <CollapsibleSection id="about" label="About">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-2xl space-y-3 text-lg leading-8 tracking-[-0.005em] text-[#526170]/82">
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
      </CollapsibleSection>

      <CollapsibleSection id="mission" label="Mission">
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#526170]/82">
          AI should reduce repetitive work, improve communication, and create better healthcare experiences.
        </p>
      </CollapsibleSection>

      <CollapsibleSection id="roadmap" label="Roadmap">
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
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
      </CollapsibleSection>

      <CollapsibleSection id="contact" label="Contact">
        <div className="mt-3 flex flex-col gap-5 border-t border-[#1b2430]/10 pt-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
          <p className="max-w-2xl text-base leading-8 text-[#526170]/78">
            Bring a healthcare workflow problem, patient experience idea, or AI automation concept into the lab.
          </p>
          <a
            href="https://wa.me/85251395439?text=Hi%2C%20there.%20I%20want%20to%20know%20more%20about%20Wing%20Yee%20AI%20Lab."
            target="_blank"
            rel="noreferrer"
            aria-label="Start a WhatsApp conversation with Wing Yee AI Lab"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#263343]"
          >
            Start conversation <ArrowRight size={16} />
          </a>
        </div>
      </CollapsibleSection>

    </main>
  );
}
