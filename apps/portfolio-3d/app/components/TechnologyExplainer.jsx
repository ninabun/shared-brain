"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function TechnologyExplainer({ items, accent = "#2f8396" }) {
  const [active, setActive] = useState(null);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="mb-5 flex min-h-44 items-center justify-center sm:min-h-40">
        <div
          id="technology-usage"
          role="status"
          aria-live="polite"
          className={`w-full max-w-2xl rounded-[1.75rem] border px-6 py-5 text-center transition duration-300 sm:px-8 ${active ? "translate-y-0 border-white/80 bg-white/72 opacity-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_22px_60px_rgba(35,60,76,0.13)]" : "translate-y-1 border-transparent bg-transparent opacity-65"}`}
        >
          {active ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: accent }}>Technology purpose</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#1b2430]">{active.name}</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#526170] sm:text-base sm:leading-7">{active.purpose}</p>
            </>
          ) : (
            <p className="text-sm text-[#526170]/68">Hover over or focus a technology to see how it supports this product.</p>
          )}
        </div>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onMouseEnter={() => setActive(item)}
            onFocus={() => setActive(item)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(item)}
            className="group inline-flex shrink-0 snap-start items-center gap-3 rounded-full border border-white/68 bg-white/44 px-5 py-3 text-sm font-medium text-[#526170]/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_12px_28px_rgba(55,80,95,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/68 focus-visible:outline-none focus-visible:ring-2"
            style={{ "--tw-ring-color": accent }}
            aria-controls="technology-usage"
            aria-expanded={active?.name === item.name}
          >
            {item.name}
            <ArrowRight size={14} style={{ color: accent }} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
