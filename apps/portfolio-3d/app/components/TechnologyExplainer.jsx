"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

export default function TechnologyExplainer({ items, accent = "#2f8396" }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [active]);

  return (
    <>
      <div className="flex snap-x gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(item)}
            className="group inline-flex shrink-0 snap-start items-center gap-3 rounded-full border border-white/68 bg-white/44 px-5 py-3 text-sm font-medium text-[#526170]/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_28px_rgba(55,80,95,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/68 focus-visible:outline-none focus-visible:ring-2"
            style={{ "--tw-ring-color": accent }}
            aria-haspopup="dialog"
          >
            {item.name}
            <ArrowRight size={14} style={{ color: accent }} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 grid place-items-center px-5 py-8" role="dialog" aria-modal="true" aria-labelledby="technology-dialog-title">
          <button type="button" className="absolute inset-0 cursor-default bg-[#13202b]/30 backdrop-blur-md" aria-label="Close technology explanation" onClick={() => setActive(null)} />
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-[#f7fafc]/95 p-7 text-left text-[#1b2430] shadow-[0_32px_100px_rgba(20,35,48,0.28)] ring-1 ring-[#1b2430]/5 sm:p-9">
            <button type="button" onClick={() => setActive(null)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[#1b2430]/10 bg-white/70 text-[#526170] transition hover:bg-white" aria-label="Close dialog">
              <X size={18} />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: accent }}>Technology purpose</p>
            <h3 id="technology-dialog-title" className="mt-4 pr-12 text-3xl font-semibold tracking-[-0.045em]">{active.name}</h3>
            <p className="mt-6 text-base leading-8 text-[#526170]">{active.purpose}</p>
            <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[#526170]/18 to-transparent" />
            <p className="mt-5 text-sm text-[#526170]/70">This technology supports the product workflow; human review remains part of the operating model.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
