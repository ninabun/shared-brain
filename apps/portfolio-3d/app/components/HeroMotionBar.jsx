"use client";

import { motion } from "framer-motion";

const bars = [24, 42, 66, 38, 76, 50, 92, 58, 34, 70, 46, 84, 54, 30, 64, 44, 78, 52, 36, 68, 48, 86, 56, 40];

export default function HeroMotionBar({ accent = "#4F8BFF", label = "Live workflow signal", detail = "Motion rhythm for demo storytelling" }) {
  return (
    <motion.div
      className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_12px_12px_28px_rgba(255,255,255,0.24),inset_-14px_-18px_34px_rgba(80,100,120,0.09),0_24px_74px_rgba(40,70,88,0.12)] ring-1 ring-[#1b2430]/5 backdrop-blur-2xl sm:p-5"
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#526170]/70">{label}</p>
          <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[#1b2430] sm:text-2xl">{detail}</p>
        </div>
        <div className="flex h-24 flex-1 items-center justify-end gap-1.5 rounded-[1.4rem] border border-white/62 bg-white/34 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)] sm:max-w-xl">
          {bars.map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="w-1.5 rounded-full sm:w-2"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.92), ${accent})`,
                boxShadow: `0 0 18px ${accent}44`,
              }}
              animate={{ height: [height * 0.45, height, height * 0.58], opacity: [0.5, 1, 0.62] }}
              transition={{ duration: 1.6 + (index % 6) * 0.18, repeat: Infinity, ease: "easeInOut", delay: index * 0.045 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}