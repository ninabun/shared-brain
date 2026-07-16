"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HeroMotionBar from "./HeroMotionBar";

export default function HealthcareIntelligencePage({ project }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#F8FBFD_0%,#EEF5F8_52%,#E8F0F5_100%)] text-[#1b2430]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_65%_18%,rgba(139,123,255,0.16),transparent_34%)]" />
      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/" className="rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-2xl">Wing Yee AI Lab</a>
        <a href="/#platform" className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-2 text-sm text-[#526170] backdrop-blur-2xl"><ArrowLeft size={14} /> Healthcare AI</a>
      </header>

      <section className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-5 pb-8 pt-20 text-center sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6d5ce7]">Healthcare Intelligence</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl">{project.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#526170] sm:text-lg">{project.hero}</p>
          <a href="#capabilities" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1b2430] px-5 py-3 text-sm font-medium text-white">Explore capabilities <ArrowRight size={14} /></a>
        </motion.div>
        <HeroMotionBar accent="#8B7BFF" label="Healthcare intelligence" detail="Human-governed AI workflow" />
      </section>

      <section id="capabilities" className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:px-8 md:grid-cols-2 lg:px-12">
        {project.sections.map(([title, body], index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-white/70 bg-white/45 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_70px_rgba(40,70,88,0.1)] backdrop-blur-2xl sm:p-9">
            <span className="text-sm font-semibold text-[#6d5ce7]">0{index + 1}</span>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.045em]">{title}</h2>
            <p className="mt-4 text-base leading-8 text-[#526170]">{body}</p>
          </motion.article>
        ))}
      </section>

      <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12">
        <a href="/#platform" className="inline-flex items-center gap-2 rounded-full border border-[#1b2430]/10 bg-white/60 px-5 py-3 text-sm font-medium"><ArrowLeft size={14} /> Back to Healthcare AI</a>
      </footer>
    </main>
  );
}
