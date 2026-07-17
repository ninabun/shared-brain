"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AudioLines, CheckCircle2, Disc3, Sparkles, Waves } from "lucide-react";

const navItems = [
  { label: "Solutions", href: "/#platform" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
const demos = [
  {
    title: "Breastfeeding Education",
    language: "Chinese",
    useCase: "Patient education (Breastfeeding)",
    mood: "Warm, human, reassuring",
  },
  {
    title: "Newborn Baby Support",
    language: "Chinese",
    useCase: "Emotional support (Newborn baby)",
    mood: "Warm, human, reassuring",
  },
  {
    title: "Stay Healthy Education I",
    language: "English",
    useCase: "Patient education (Stay Healthy)",
    mood: "Warm, human, reassuring",
  },
  {
    title: "Stay Healthy Education II",
    language: "English",
    useCase: "Patient education (Stay Healthy)",
    mood: "Warm, human, reassuring",
  },
  {
    title: "Labour Room Pain Relief",
    language: "Pure Instrumental",
    useCase: "Pain relief (Labour room)",
    mood: "Warm, calm",
  },
  {
    title: "Projection Mapping Cinematic",
    language: "Pure Instrumental",
    useCase: "Projection Mapping, Exhibition",
    mood: "Cinematic",
  },
  {
    title: "Projection Mapping Immersive",
    language: "Pure Instrumental",
    useCase: "Projection Mapping, Exhibition",
    mood: "Immersive",
  },
];

const applications = [
  ["Patient Education", "Turning complex healthcare information into simple, memorable audio stories."],
  ["Waiting Area Experience", "Using calming AI music to improve the emotional atmosphere in clinical spaces."],
  ["Staff Training & Presentation", "Combining AI music, voice and projection mapping to make healthcare presentations more engaging."],
  ["Health Promotion Campaigns", "Creating multilingual songs and audio messages for public health education."],
];

const flow = [
  ["Input", "Healthcare topic, audience, language, tone and emotional goal"],
  ["AI / Logic", "SUNO generates music, lyrics, voice and instrumental soundscape"],
  ["Output", "Audio demo for education, campaign, presentation or projection mapping"],
  ["Human Review", "Clinical content, tone and appropriateness are reviewed before use"],
];

const impact = [
  ["Time", "Speeds up creation of communication materials"],
  ["Workflow", "Supports rapid prototyping of health education content"],
  ["Communication", "Makes messages easier to understand and remember"],
  ["User Experience", "Creates a calmer and more human experience"],
];

const tools = ["SUNO", "Voice recording", "CapCut", "Projection mapping", "React", "Next.js"];

function AudioBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f9fb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(47,131,150,0.09),transparent_32%),radial-gradient(circle_at_78%_34%,rgba(139,123,255,0.08),transparent_28%),linear-gradient(180deg,#F7FAFC_0%,#EEF4F8_54%,#E6EEF5_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,rgba(120,170,200,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(120,170,200,0.035)_1px,transparent_1px)] [background-size:132px_132px]" />
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <motion.span
          key={item}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#527f8d] shadow-[0_0_18px_rgba(47,131,150,0.2)]"
          style={{
            left: `${12 + item * 15}%`,
            top: `${20 + (item % 3) * 19}%`,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.1, 0.32, 0.1], scale: [0.9, 1.25, 0.9] }}
          transition={{ duration: 7 + item, repeat: Infinity, ease: "easeInOut", delay: item * 0.45 }}
        />
      ))}
      <motion.div
        className="absolute left-[10%] top-[28%] h-px w-[80%] -rotate-6 bg-gradient-to-r from-transparent via-[#6ca8bd]/20 to-transparent"
        animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-20 mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-[#1b2430] sm:px-8 lg:px-12">
      <a
        href="/"
        className="rounded-full border border-white/50 bg-white/34 px-4 py-2 text-sm font-semibold tracking-[-0.03em] text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_40px_rgba(8,18,28,0.14)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl transition hover:bg-white/50"
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
    </header>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-white/78 bg-white/42 p-6 text-[#1b2430] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_12px_12px_26px_rgba(255,255,255,0.3),inset_-14px_-18px_34px_rgba(82,105,116,0.1),0_22px_70px_rgba(58,84,98,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function Section({ eyebrow, title, children }) {
  return (
    <motion.section
      className="relative z-10 mx-auto max-w-7xl px-5 py-16 text-[#1b2430] sm:px-8 sm:py-20 lg:px-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-16%" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#2f8396]/78 sm:text-base">{eyebrow}</p>
      {title ? <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#1b2430] sm:text-5xl">{title}</h2> : null}
      <div className={title ? "mt-9" : "mt-6"}>{children}</div>
    </motion.section>
  );
}

function WaveVisual() {
  return (
    <div className="relative mx-auto mt-6 h-36 w-full max-w-4xl overflow-hidden rounded-[2.25rem] border border-white/78 bg-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),inset_-12px_-18px_34px_rgba(82,105,116,0.09),0_30px_90px_rgba(65,120,150,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(47,131,150,0.12),transparent_44%)]" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-2">
        {Array.from({ length: 34 }).map((_, index) => (
          <motion.span
            key={index}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#2f8396]/45 to-[#a8bdc4] shadow-[0_0_13px_rgba(47,131,150,0.2)]"
            animate={{ height: [20, 72 + (index % 7) * 8, 24] }}
            transition={{ duration: 2.4 + (index % 5) * 0.25, repeat: Infinity, ease: "easeInOut", delay: index * 0.04 }}
          />
        ))}
      </div>
    </div>
  );
}

function DemoCard({ demo }) {
  return (
    <GlassCard className="group transition duration-500 hover:-translate-y-1 hover:border-[#63E6D8]/28 hover:bg-white/56 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_12px_12px_26px_rgba(255,255,255,0.34),inset_-14px_-18px_34px_rgba(82,105,116,0.1),0_24px_78px_rgba(99,230,216,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-semibold tracking-[-0.035em] text-[#1b2430]">{demo.title}</p>
          <p className="mt-2 text-sm text-[#2f8396]/72">{demo.mood}</p>
        </div>
        <span className="rounded-full border border-[#63E6D8]/24 bg-white/44 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#2f8396]/78">
          {demo.language}
        </span>
      </div>
      <div className="mt-7 rounded-[1.4rem] border border-white/78 bg-white/48 p-4 text-sm text-[#526170]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        Audio preview pending an approved source file.
      </div>
      <p className="mt-6 text-sm uppercase tracking-[0.16em] text-[#526170]/58">Use case</p>
      <p className="mt-3 text-base leading-7 text-[#526170]/82">{demo.useCase}</p>
    </GlassCard>
  );
}

export default function AIAudioProjectPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fb] text-[#1b2430]">
      <AudioBackground />
      <Header />

      <section className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#2f8396]/78">Patient Experience / AI Audio</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#1b2430] sm:text-6xl lg:text-7xl">
            AI Audio Experience for Patient-Centred Care
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#526170]/82 sm:text-lg">
            Using AI-generated music, voice and immersive sound design to improve healthcare communication, emotional support and presentation experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Patient Experience", "Health Education", "Projection Mapping"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/70 bg-white/42 px-4 py-2 text-sm text-[#526170]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl">
                {tag}
              </span>
          ))}
          </div>
        </motion.div>
        <WaveVisual />
        <div className="mt-10 flex justify-center gap-3">
          <a href="#demo-gallery" className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/42 px-5 py-3 text-sm font-medium text-[#1b2430]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/58 hover:text-[#1b2430]">
            View Demo Gallery <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Section eyebrow="Why This Matters" title="Sound can make care communication easier to feel and remember.">
        <GlassCard className="max-w-5xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[#2f8396]/62">Solution Area</p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#1b2430]">
            Patient Experience / Health Communication / AI-generated Audio
          </p>
          <p className="mt-7 max-w-4xl text-lg leading-8 text-[#526170]/82">
            An AI-powered audio experience that turns healthcare messages into emotionally engaging songs, voice content and immersive soundscapes.
          </p>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#526170]/82">
            Healthcare communication is often complex, stressful and text-heavy. AI-generated music and voice can transform clinical information into a more human, memorable and emotionally supportive experience.
          </p>
        </GlassCard>
      </Section>

      <Section eyebrow="Demo Gallery">
        <div id="demo-gallery" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {demos.map((demo) => (
            <DemoCard key={demo.title} demo={demo} />
        ))}
        </div>
      </Section>

      <Section eyebrow="How It Works" title="From healthcare topic to reviewed audio experience.">
        <div className="grid gap-4 lg:grid-cols-4">
          {flow.map(([title, body], index) => (
            <GlassCard key={title} className="relative min-h-48">
              <span className="text-sm text-[#2f8396]/62">0{index + 1}</span>
              <p className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-[#1b2430]">{title}</p>
              <p className="mt-4 text-base leading-7 text-[#526170]/78">{body}</p>
              {index < flow.length - 1 ? <span className="absolute -right-5 top-1/2 hidden h-px w-10 bg-gradient-to-r from-[#63E6D8]/70 to-transparent lg:block" /> : null}
            </GlassCard>
        ))}
        </div>
      </Section>

      <Section eyebrow="Impact" title="Practical value for care communication.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impact.map(([title, body]) => (
            <GlassCard key={title}>
              <CheckCircle2 className="text-[#2f8396]" size={22} strokeWidth={1.75} />
              <p className="mt-7 text-xl font-semibold tracking-[-0.035em] text-[#1b2430]">{title}</p>
              <p className="mt-3 text-base leading-7 text-[#526170]/78">{body}</p>
            </GlassCard>
        ))}
        </div>
      </Section>

      <Section eyebrow="Applications" title="Where AI audio can support healthcare experience.">
        <div className="grid gap-5 md:grid-cols-2">
          {applications.map(([title, body], index) => {
            const Icon = [Sparkles, Waves, AudioLines, Disc3][index];
            return (
              <GlassCard key={title}>
                <Icon className="text-[#2f8396]" size={24} strokeWidth={1.6} />
                <p className="mt-7 text-2xl font-semibold tracking-[-0.04em] text-[#1b2430]">{title}</p>
                <p className="mt-4 text-base leading-7 text-[#526170]/78">{body}</p>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Tools Used" title="Built with AI audio and product storytelling tools.">
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full border border-white/70 bg-white/42 px-5 py-3 text-sm font-medium text-[#526170]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl">
              {tool}
            </span>
        ))}
        </div>
      </Section>

      <Section eyebrow="Future Vision" title="From AI Song Demo to Healthcare Communication System">
        <GlassCard>
          <p className="max-w-4xl text-lg leading-8 text-[#526170]/82">
            The long-term vision is to build a clinically reviewed AI audio workflow where healthcare teams can rapidly generate multilingual, patient-friendly audio content for education, reassurance, campaign delivery and immersive experience design.
          </p>
        </GlassCard>
        <a href="/#platform" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#1b2430] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#263343]">
          <ArrowLeft size={15} /> Back to AI Lab
        </a>
      </Section>
    </main>
  );
}
