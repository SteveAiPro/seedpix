"use client";

import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  /** before 图 URL（真实图，优先） */
  beforeImage?: string;
  /** after 图 URL（真实图，优先） */
  afterImage?: string;
  /** 兼容字段：单图 + CSS filter（未提供 afterImage 时使用） */
  image?: string;
  beforeFilter?: string;
  afterFilter?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
  description: string;
  aspect?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  image,
  beforeFilter = "",
  afterFilter = "",
  beforeLabel = "Before",
  afterLabel = "After",
  title,
  description,
  aspect = "4 / 3",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeSrc = beforeImage || image || "";
  const afterSrc = afterImage || image || "";

  function handleMove(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full cursor-ew-resize select-none"
        style={{ aspectRatio: aspect }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          handleMove(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) handleMove(e.clientX);
        }}
        onPointerUp={(e) => handleMove(e.clientX)}
      >
        {/* After */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterSrc}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: afterFilter }}
          draggable={false}
        />
        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            style={{ maxWidth: "none", filter: beforeFilter }}
          />
        </div>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171717"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded bg-blue-600/90 px-2 py-0.5 text-[11px] font-medium text-white">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
