"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

function AnimatedBackground({ rgb }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#F8FBFD_0%,#EEF5F8_52%,#E8F0F5_100%)]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(120,170,200,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)",
          backgroundSize: "132px 132px",
        }}
      />
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.span
          key={item}
          className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_18px_rgba(var(--project-rgb),0.36)]"
          style={{
            left: `${16 + item * 17}%`,
            top: `${18 + (item % 3) * 21}%`,
            opacity: 0.32,
          }}
          animate={{ y: [0, -18, 0], x: [0, item % 2 ? 12 : -12, 0], opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 8 + item, repeat: Infinity, ease: "easeInOut", delay: item * 0.7 }}
        />
      ))}
      <motion.div
        className="absolute left-[8%] top-[22%] h-px w-[84%] -rotate-6 bg-gradient-to-r from-transparent via-[rgba(var(--project-rgb),0.22)] to-transparent"
        animate={{ x: ["-4%", "4%", "-4%"], opacity: [0.1, 0.24, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute left-1/2 top-20 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `rgba(${rgb},0.12)` }}
      />
    </div>
  );
}

function Section({ label, title, children, id }) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-16%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--project-color)]">{label}</p>
      <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.045em] text-[#1b2430] sm:text-[2.65rem]">{title}</h2>
      <div className="mt-8">{children}</div>
    </motion.section>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-[rgba(var(--project-rgb),0.16)] bg-white/46 p-6 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.84),inset_10px_14px_30px_rgba(255,255,255,0.22),inset_-12px_-18px_34px_rgba(83,112,128,0.08),0_24px_80px_rgba(40,70,88,0.1)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function DemoPanel({ demo }) {
  const isLive = demo?.href;

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--project-color)] to-transparent opacity-60" />
      <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-white/62 bg-white/34 p-8 text-center">
        <span className="mb-5 h-3 w-3 rounded-full bg-[var(--project-color)] shadow-[0_0_26px_rgba(var(--project-rgb),0.55)]" />
        <p className="max-w-md text-base leading-7 text-[#526170]/86">{demo?.note || "Demo asset coming soon."}</p>
        <a
          href={isLive ? demo.href : "#contact"}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--project-rgb),0.28)] bg-white/70 px-5 py-3 text-sm font-medium text-[#1b2430] transition hover:-translate-y-0.5 hover:border-[rgba(var(--project-rgb),0.58)] hover:text-[var(--project-color)]"
        >
          {demo?.cta || "View Prototype"} {isLive ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
        </a>
      </div>
    </GlassCard>
  );
}

function SummaryField({ label, value }) {
  return (
    <GlassCard className="p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--project-color)]">{label}</p>
      <p className="mt-4 text-[15px] leading-7 text-[#526170]/90">{value}</p>
    </GlassCard>
  );
}

export default function ProjectPageTemplate({ project }) {
  const rgb = project.rgb;

  return (
    <main
      className="min-h-screen overflow-hidden text-[#1b2430]"
      style={{
        "--project-color": project.accentColor,
        "--project-rgb": rgb,
      }}
    >
      <AnimatedBackground rgb={rgb} />

      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="/"
          className="rounded-full border border-white/56 bg-white/42 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(8,18,28,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition hover:bg-white/58"
        >
          Wing Yee AI Lab
        </a>
        <a
          href="/#platform"
          className="inline-flex items-center gap-2 rounded-full border border-white/56 bg-white/38 px-4 py-2 text-sm text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_12px_34px_rgba(7,15,28,0.08)] backdrop-blur-2xl transition hover:text-[#1b2430]"
        >
          <ArrowLeft size={14} /> Solutions
        </a>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[68vh] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-left"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--project-color)]">{project.solutionArea}</p>
          <h1 className="mt-5 text-[3rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[#1b2430] sm:text-[4.5rem] lg:text-[5.2rem]">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-[1.12rem] leading-8 text-[#526170]/88">{project.oneLine}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#1b2430] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_44px_rgba(27,36,48,0.16)] transition hover:-translate-y-0.5 hover:bg-[#263343]"
            >
              View Demo <ArrowRight size={14} />
            </a>
            <a
              href="/#platform"
              className="inline-flex items-center gap-2 rounded-full border border-white/64 bg-white/42 px-5 py-3 text-sm font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.74),0_14px_34px_rgba(40,70,88,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-[#1b2430]"
            >
              Back to Solutions
            </a>
          </div>
        </motion.div>

        <motion.div
          className="h-[22rem] w-full rounded-[2.4rem] border border-[rgba(var(--project-rgb),0.16)] bg-white/34 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_28px_90px_rgba(var(--project-rgb),0.14)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/32">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,rgba(var(--project-rgb),0.28),transparent_32%),radial-gradient(circle_at_30%_68%,rgba(255,255,255,0.82),transparent_20%)]" />
            <span className="absolute left-[18%] top-[54%] h-24 w-24 rounded-full border border-[rgba(var(--project-rgb),0.26)] bg-white/34 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_50px_rgba(var(--project-rgb),0.2)]" />
            <span className="absolute left-[30%] right-[14%] top-[42%] h-px bg-gradient-to-r from-transparent via-[var(--project-color)] to-transparent opacity-70" />
            <span className="absolute right-[18%] top-[34%] h-28 w-28 rounded-full border border-[rgba(var(--project-rgb),0.22)] bg-white/24 shadow-[0_0_80px_rgba(var(--project-rgb),0.18)]" />
            <span className="absolute left-[52%] top-[47%] h-3 w-3 rounded-full bg-white shadow-[0_0_26px_rgba(var(--project-rgb),0.5)]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.1rem] border border-white/60 bg-white/44 p-4 backdrop-blur-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--project-color)]">Patient Experience Prototype</p>
              <p className="mt-2 text-sm leading-6 text-[#526170]/88">3D storytelling pattern for fetal development education, immersive explanation and presentation design.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Section label="Project Summary" title="Well-organised product log">
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryField label="Project Name" value={project.title} />
          <SummaryField label="Solution Area" value={project.solutionArea} />
          <SummaryField label="One-line Product Statement" value={project.oneLine} />
        </div>
      </Section>

      <Section label="Problem" title="The Problem">
        <div className="grid gap-4 md:grid-cols-3">
          {project.problem.map((item) => (
            <GlassCard key={item}>
              <p className="text-base leading-7 text-[#526170]/88">{item}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section label="Solution" title="The Solution">
        <GlassCard>
          <div className="grid gap-5 md:grid-cols-2">
            {project.solution.map((item) => (
              <p key={item} className="text-lg leading-8 text-[#526170]/88">
                {item}
              </p>
            ))}
          </div>
        </GlassCard>
      </Section>

      <Section label="Demo" title="Demo" id="demo">
        <DemoPanel demo={project.demo} />
      </Section>

      <Section label="Flow" title="How It Works">
        <div className="grid gap-4 md:grid-cols-4">
          {project.howItWorks.map((step, index) => (
            <GlassCard key={step} className="relative min-h-36">
              <span className="text-sm text-[var(--project-color)]">0{index + 1}</span>
              <p className="mt-8 text-xl font-semibold tracking-[-0.035em]">{step}</p>
              {index < project.howItWorks.length - 1 ? (
                <span className="absolute -right-5 top-1/2 hidden h-px w-10 bg-gradient-to-r from-[var(--project-color)] to-transparent md:block" />
              ) : null}
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section label="Impact" title="Impact">
        <div className="grid gap-4 md:grid-cols-3">
          {project.impact.map((item) => (
            <GlassCard key={item}>
              <CheckCircle2 className="text-[var(--project-color)]" size={22} strokeWidth={1.75} />
              <p className="mt-8 text-xl font-semibold tracking-[-0.035em]">{item}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section label="Tools" title="Tools Used">
        <div className="flex flex-wrap gap-3">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/68 bg-white/44 px-5 py-3 text-sm font-medium text-[#526170] shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_34px_rgba(40,70,88,0.08)] backdrop-blur-xl"
            >
              {tool}
            </span>
          ))}
        </div>
      </Section>

      <Section label="Next" title="Future Direction">
        <GlassCard>
          <p className="max-w-3xl text-lg leading-8 text-[#526170]/88">{project.futureDirection}</p>
        </GlassCard>
        <a
          href="/#platform"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]"
        >
          <ArrowLeft size={15} /> Back to Solutions
        </a>
      </Section>
    </main>
  );
}
