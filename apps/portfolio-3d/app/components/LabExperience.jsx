"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, BrainCircuit, Menu, Network, Sparkles, Workflow, X } from "lucide-react";
import { useState } from "react";
import content from "../data/lab.json";
import HeroBackground from "./HeroBackground";

const iconMap = [Activity, BrainCircuit, Network, Workflow, Sparkles];
const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Lab", href: "#ai-lab" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 mx-auto min-h-[88vh] w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12 ${className}`}
      initial={{ opacity: 0.82, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? <p className="mb-5 text-xs uppercase tracking-[0.32em] text-sky-100/55">{eyebrow}</p> : null}
      {title ? <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">{title}</h2> : null}
      {children}
    </motion.section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/8 bg-[#05070b]/55 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="text-sm font-medium tracking-[0.24em] text-white/85">
          Wing Yee AI Lab
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/58 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-[#05070b]/92 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/72"
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

function ProjectCard({ project, index }) {
  const featured = index === 0;

  return (
    <motion.article
      className={`group flex min-h-[280px] flex-col justify-between border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-sky-200/35 hover:bg-white/[0.075] ${
        featured ? "md:col-span-2 xl:col-span-2 xl:min-h-[360px] xl:p-8" : ""
      }`}
      initial={{ opacity: 0.82, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div>
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-sky-100/45">{project.category}</p>
        <h3 className={`${featured ? "max-w-xl text-4xl" : "text-2xl"} font-medium tracking-[-0.035em] text-white`}>
          {project.title}
        </h3>
        <p className={`${featured ? "max-w-2xl text-xl leading-8" : "leading-7"} mt-4 text-white/62`}>{project.statement}</p>
      </div>
      <div className="mt-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/52">
              {tool}
            </span>
          ))}
        </div>
        <a href={project.href} className="inline-flex items-center gap-2 text-sm text-white/78 transition group-hover:text-white">
          Open project <ArrowRight size={15} />
        </a>
      </div>
    </motion.article>
  );
}

function Ecosystem() {
  return (
    <div className="relative mt-16 grid gap-3 md:grid-cols-5">
      <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-sky-100/35 to-transparent md:block" />
      {content.ecosystem.map((item, index) => {
        const Icon = iconMap[index] || Sparkles;
        return (
          <motion.div
            key={item}
            className="relative overflow-hidden border border-white/10 bg-[#061018]/55 p-5 shadow-[0_0_44px_rgba(125,210,255,0.08)] backdrop-blur-xl"
            initial={{ opacity: 0.82, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-full border border-sky-100/15 bg-sky-100/[0.04]">
              <Icon className="text-sky-100/70" size={21} />
            </div>
            <p className="text-sm leading-6 text-white/72">{item}</p>
            {index < content.ecosystem.length - 1 ? (
              <div className="absolute right-4 top-8 hidden h-px w-12 bg-gradient-to-r from-sky-100/55 to-transparent md:block" />
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}

function LabSignalPanel() {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {content.labSignals.map((signal, index) => (
        <motion.div
          key={signal}
          className="border border-white/10 bg-black/20 p-5 backdrop-blur-xl"
          initial={{ opacity: 0.82, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.06 }}
        >
          <div className="mb-10 h-px w-full bg-gradient-to-r from-sky-100/60 to-transparent" />
          <p className="text-sm leading-6 text-white/68">{signal}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function LabExperience() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.42]);
  const { site, projects, research } = content;

  return (
    <main className="min-h-screen overflow-hidden bg-[#04060a] text-white">
      <HeroBackground />
      <div className="fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(130,190,255,0.08),transparent_34%),radial-gradient(circle_at_12%_38%,rgba(158,240,255,0.035),transparent_28%),linear-gradient(180deg,transparent,#04060a_94%)]" />
      <Header />

      <motion.section
        id="home"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8 lg:px-12"
      >
        <div
          className="relative z-10"
          style={{ textShadow: "0 2px 32px rgba(0,0,0,0.88), 0 1px 8px rgba(0,0,0,0.72)" }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.34em] text-sky-100/60">{site.name}</p>
          <h1 className="max-w-5xl text-[clamp(3.15rem,16vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white sm:text-[clamp(4rem,11vw,8rem)]">
            {site.person}
          </h1>
          <div className="mt-8 max-w-3xl">
            <p className="text-[clamp(1.35rem,7vw,2.1rem)] leading-tight tracking-[-0.03em] text-white/88 sm:text-[clamp(1.5rem,3vw,2.5rem)]">{site.role}</p>
            <p className="mt-5 text-lg leading-8 text-white/58 sm:text-xl">{site.identity}</p>
            <p className="mt-5 text-xl leading-9 text-white/72 sm:text-2xl">{site.tagline}</p>
          </div>
          <a
            href="#projects"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white shadow-[0_0_50px_rgba(155,220,255,0.15)] backdrop-blur-xl transition hover:border-white/35 hover:bg-white/16"
          >
            Explore Projects <ArrowRight size={16} />
          </a>
          <p className="mt-12 text-xs uppercase tracking-[0.28em] text-white/38">Scroll to explore the lab</p>
        </div>
      </motion.section>

      <Section id="projects" eyebrow="Selected Work" title="Clinical systems, autonomous workflows and immersive communication.">
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Section>

      <Section id="ai-lab" eyebrow="AI Ecosystem" title="A clean system for moving from care knowledge to intelligent experience.">
        <Ecosystem />
        <LabSignalPanel />
      </Section>

      <Section id="featured-demo" eyebrow="Featured Demo" title="A living prototype space for AI-powered clinical operations.">
        <div className="mt-12 overflow-hidden border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-3xl font-medium tracking-[-0.04em] text-white sm:text-5xl">Clinical Flow Console</p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
                A calm interface concept where staffing, patient flow, automation signals and creative communication
                become one intelligent operating layer.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Roster fairness", "Agent briefing", "Experience layer"].map((item, index) => (
                <div key={item} className="flex min-h-52 flex-col justify-between border border-white/10 bg-black/20 p-4">
                  <span className="text-xs text-sky-100/40">0{index + 1}</span>
                  <p className="text-sm text-white/66">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="mission" eyebrow="Clinical Mission" title="Design AI that feels useful, trusted and beautifully integrated into care.">
        <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
          Wing Yee AI Lab exists to translate clinical insight into intelligent systems: less friction, clearer workflows,
          richer communication and better digital experiences for people who care for others.
        </p>
      </Section>

      <Section id="about" eyebrow="About" title="Healthcare practice meets computer science fluency.">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <p className="max-w-3xl text-2xl leading-[1.45] tracking-[-0.035em] text-white/75 sm:text-4xl">
            Wing Yee Lee combines healthcare, computer science and AI to design practical digital solutions that improve
            clinical workflows and user experience.
          </p>
          <div className="grid gap-3 text-sm text-white/62">
            {["Registered Nurse and Midwife", "Bachelor in Tourism Management", "Master in Computer Science", "Master in Nursing"].map(
              (item) => (
                <div key={item} className="border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      <Section id="research" eyebrow="Research" title="Exploring agentic healthcare tools and spatial AI interfaces.">
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {research.map((item, index) => (
            <motion.div
              key={item}
              className="min-h-44 border border-white/10 bg-gradient-to-b from-white/[0.075] to-white/[0.025] p-5 backdrop-blur-2xl"
              initial={{ opacity: 0.82, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className="text-xs text-sky-100/45">0{index + 1}</span>
              <p className="mt-16 text-lg tracking-[-0.03em] text-white/82">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Build the next clinical AI experience.">
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-lg leading-8 text-white/62">
            Available for AI workflow design, healthcare automation, immersive web prototypes and creative AI systems.
          </p>
          <a
            href="#projects"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-sky-100"
          >
            Explore collaboration areas <ArrowRight size={16} />
          </a>
        </div>
      </Section>
    </main>
  );
}
