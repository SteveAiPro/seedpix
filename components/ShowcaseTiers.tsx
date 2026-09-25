"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  useReactCompareSliderContext,
} from "react-compare-slider";
import { SHOWCASE_TIERS, getCasesForTier, ShowcaseCase, ShowcaseTier } from "@/lib/showcaseData";

// AutoSlider that slides before and after automatically back and forth
function AutoSlider({
  min = 10,
  max = 90,
  stepPercent = 0.8,
  intervalMs = 25,
}: {
  min?: number;
  max?: number;
  stepPercent?: number;
  intervalMs?: number;
}) {
  const context = useReactCompareSliderContext();
  const directionRef = useRef(1);

  useEffect(() => {
    if (!context) return;
    const interval = setInterval(() => {
      if (context.isDragging) return;
      const currentPos = context.position.current ?? 50;
      let nextPos = currentPos + directionRef.current * stepPercent;
      if (nextPos >= max) {
        nextPos = max;
        directionRef.current = -1;
      } else if (nextPos <= min) {
        nextPos = min;
        directionRef.current = 1;
      }
      context.setPosition(nextPos);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [context, min, max, stepPercent, intervalMs]);

  return null;
}

// Carousel horizontal scroller with ‹ and › arrow controls
function CarouselScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/carousel">
      {/* Left Edge Fade */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-[#0A0A0F] to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Right Edge Fade */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-[#0A0A0F] to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Left Scroll Button */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] backdrop-blur-2xl text-white transition-all hover:bg-white/[0.14] ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span aria-hidden="true" className="text-xl leading-none">‹</span>
      </button>

      {/* Right Scroll Button */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] backdrop-blur-2xl text-white transition-all hover:bg-white/[0.14] ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span aria-hidden="true" className="text-xl leading-none">›</span>
      </button>

      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}

// Single Showcase Item Card
function ShowcaseCard({
  item,
  variant,
  aspectClass = "aspect-[3/4]",
  widthClass = "w-[260px] sm:w-[280px]",
}: {
  item: ShowcaseCase;
  variant: "slider" | "pip" | "single" | "hover";
  aspectClass?: string;
  widthClass?: string;
}) {
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);

  const hasBefore = !!item.beforeImage && !beforeError;
  const hasAfter = !!item.afterImage && !afterError;
  const hasBoth = hasBefore && hasAfter;
  const hasAny = hasBefore || hasAfter;

  return (
    <div className={`shrink-0 snap-start flex flex-col items-center ${widthClass}`}>
      <Link
        href={item.href}
        className={`group relative w-full overflow-hidden ${aspectClass} rounded-3xl bg-white/[0.04] backdrop-blur-2xl transition-colors cursor-pointer border border-white/5 block`}
        title={item.title}
      >
        {/* Variant 1: Interactive Slider with Auto-slide Animation */}
        {variant === "slider" && hasBoth && (
          <div className="w-full h-full relative select-none">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={item.afterImage!}
                  alt={`${item.title} — after`}
                  style={{ objectFit: "cover" }}
                  onError={() => setAfterError(true)}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={item.beforeImage!}
                  alt={`${item.title} — before`}
                  style={{ objectFit: "cover" }}
                  onError={() => setBeforeError(true)}
                />
              }
              defaultPosition={5}
              transition="30ms linear"
              handle={
                <div className="h-full relative flex items-center justify-center">
                  <AutoSlider min={5} max={95} stepPercent={0.5} intervalMs={30} />
                  <div
                    aria-hidden="true"
                    style={{
                      width: 2,
                      height: "100%",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div className="absolute w-7 h-7 rounded-full bg-black/70 border border-white/40 shadow-xl flex items-center justify-center backdrop-blur-md">
                    <span className="text-[10px] text-white select-none">‹ ›</span>
                  </div>
                </div>
              }
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        {/* Variant 2: Picture in Picture (PIP) */}
        {variant === "pip" && hasAny && (
          <div className="w-full h-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(hasAfter ? item.afterImage : item.beforeImage)!}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => (hasAfter ? setAfterError(true) : setBeforeError(true))}
            />
            {hasBoth && (
              <div
                className="absolute bottom-3 right-3 w-[30%] aspect-[3/4] rounded-xl overflow-hidden ring-2 ring-white/40 shadow-2xl shadow-black/80"
                title="Original photo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.beforeImage!}
                  alt={`${item.title} — original`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setBeforeError(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* Variant 3: Hover Reveal */}
        {variant === "hover" && hasAny && (
          <div className="w-full h-full relative">
            {hasBefore && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.beforeImage!}
                alt={`${item.title} — before`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={() => setBeforeError(true)}
              />
            )}
            {hasAfter && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.afterImage!}
                alt={`${item.title} — after`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
                loading="lazy"
                onError={() => setAfterError(true)}
              />
            )}
          </div>
        )}

        {/* Variant 4: Single Image */}
        {variant === "single" && hasAny && (
          <div className="w-full h-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(hasAfter ? item.afterImage : item.beforeImage)!}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => (hasAfter ? setAfterError(true) : setBeforeError(true))}
            />
          </div>
        )}

        {/* Fallback Gradient if images are loading or missing */}
        {!hasAny && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent flex items-center justify-center p-4 text-center"
          >
            <span className="text-xs font-semibold text-white/40">{item.title}</span>
          </div>
        )}
      </Link>

      {/* Text Info */}
      <Link
        href={item.href}
        className="mt-4 px-2 text-center block w-full hover:opacity-80 transition-opacity"
      >
        <h3 className="text-[16px] font-bold text-white leading-tight">{item.title}</h3>
        {item.subtitle && (
          <p className="mt-1.5 text-[14px] text-white/70 leading-snug line-clamp-2">
            {item.subtitle}
          </p>
        )}
      </Link>
    </div>
  );
}

// Main Showcase Tiers Component
export default function ShowcaseTiers() {
  return (
    <div className="space-y-16 pb-16">
      {SHOWCASE_TIERS.map((tier) => {
        const cases = getCasesForTier(tier.id);
        if (cases.length === 0) return null;

        return (
          <section key={tier.id} id={`tier-${tier.id}`} className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-2">
                {tier.title}
              </h2>
              <p className="text-[16px] font-bold text-white/70 max-w-2xl mx-auto leading-relaxed">
                {tier.subtitle}
              </p>
            </div>

            {/* Layout: Carousel vs Grid */}
            {tier.layout === "carousel" ? (
              <CarouselScroller>
                {cases.map((c) => (
                  <ShowcaseCard
                    key={c.id}
                    item={c}
                    variant={tier.cardVariant}
                    aspectClass={tier.cardAspect || "aspect-[3/4]"}
                  />
                ))}
              </CarouselScroller>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((c) => (
                  <ShowcaseCard
                    key={c.id}
                    item={c}
                    variant={tier.cardVariant}
                    aspectClass={tier.cardAspect || "aspect-[2/1]"}
                    widthClass="w-full"
                  />
                ))}

                {/* More Card if defined */}
                {tier.more && (
                  <Link
                    href={tier.more.href}
                    className={`flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.03] border border-dashed border-white/10 hover:border-[#FFE525]/40 hover:bg-white/[0.06] transition group text-center ${
                      tier.more.fullWidth ? "sm:col-span-2 lg:col-span-3 min-h-[140px]" : "aspect-[2/1]"
                    }`}
                  >
                    <span className="text-lg font-bold text-white group-hover:text-[#FFE525] transition-colors">
                      {tier.more.title} →
                    </span>
                    <span className="text-sm text-white/60 mt-1">{tier.more.subtitle}</span>
                  </Link>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
