"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Check, X, Shield, Clock, Users, Zap } from "lucide-react";

export default function ExtendedHomeSections() {
  return (
    <>
      {/* 1. Style Transformer Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE525]/10 border border-[#FFE525]/20 text-[#FFE525] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artistic AI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Style Transformer
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Transform any photo into iconic artistic styles with neural painterly realism.
            </p>
          </div>
          <Link
            href="/styles/photo-to-ghibli"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFE525] hover:text-[#42FF41] transition-colors"
          >
            <span>Explore all 20+ style models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "Oil Painting", img: "/showcase/after-turn-into-painting.webp", href: "/styles/photo-to-oil-painting" },
            { name: "Studio Ghibli", img: "/showcase/after-photo-to-ghibli.webp", href: "/styles/photo-to-ghibli" },
            { name: "Anime Art", img: "/showcase/after-photo-to-anime.webp", href: "/styles/photo-to-anime" },
            { name: "Watercolor", img: "/showcase/after-photo-to-watercolor.webp", href: "/styles/photo-to-watercolor" },
            { name: "Vintage 35mm", img: "/showcase/after-photo-to-vintage.webp", href: "/styles/photo-to-vintage" },
          ].map((style) => (
            <Link
              key={style.name}
              href={style.href}
              className="group relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/10 hover:border-[#FFE525]/50 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-black/40">
                <img
                  src={style.img}
                  alt={style.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center bg-[#13131A]">
                <span className="text-xs font-bold text-white group-hover:text-[#FFE525] transition-colors">
                  {style.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Restore Old, Scratched, Damaged Photos Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE525]/10 border border-[#FFE525]/20 text-[#FFE525] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage Restoration</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Restore Old, Scratched, Damaged Photos
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Recover precious family memories. Fix scratches, tears, water stains and colorize historical pictures.
            </p>
          </div>
          <Link
            href="/photo-restoration"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFE525] hover:text-[#42FF41] transition-colors"
          >
            <span>All restoration tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Full Restoration", img: "/showcases/photo-restoration.webp", href: "/photo-restoration" },
            { name: "Fix Scratches", img: "/showcases/scrathed-photo.webp", href: "/aitools/fix-scratched-photos" },
            { name: "Unblur Old Photos", img: "/showcases/unblur-oldphoto.webp", href: "/unblur-image" },
            { name: "Low-Res Fix", img: "/showcases/restoration-old-photo-low-resolution.webp", href: "/aitools/photo-upscaler" },
            { name: "Water Damaged", img: "/showcases/restoration-old-photo-water-damaged.webp", href: "/aitools/fix-water-damaged-photos" },
            { name: "Color Fade Fix", img: "/showcases/restoration-old-photo-fade.webp", href: "/aitools/fix-yellowed-photos" },
          ].map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative rounded-2xl overflow-hidden bg-[#13131A] border border-white/10 hover:border-[#FFE525]/50 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="aspect-square w-full overflow-hidden bg-black/40">
                <img
                  src={tool.img}
                  alt={tool.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5 text-center bg-[#13131A]">
                <span className="text-xs font-bold text-white group-hover:text-[#FFE525] transition-colors">
                  {tool.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. 3-Way Comparison Table (SeedPix vs Traditional vs Typical AI) */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            SeedPix vs Traditional Editors vs AI Apps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">
            Why creators and professionals switch to SeedPix&apos;s natural language workspace.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#13131A] p-2 sm:p-6 shadow-2xl">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium w-[25%]">Feature</th>
                <th className="p-4 text-center text-[#FFE525] font-black text-base bg-[#FFE525]/10 rounded-t-xl">
                  SeedPix.org
                </th>
                <th className="p-4 text-center text-white/80 font-medium">Photoshop & Traditional</th>
                <th className="p-4 text-center text-white/80 font-medium">Typical AI Photo Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 text-white font-semibold">Learning curve</td>
                <td className="p-4 text-center font-bold text-white bg-[#FFE525]/5 text-[#FFE525]">
                  Just type what you want
                </td>
                <td className="p-4 text-center text-white/60">Steep — layers, masks, pen tools</td>
                <td className="p-4 text-center text-white/60">Moderate</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-semibold">Tool coverage</td>
                <td className="p-4 text-center font-bold text-white bg-[#FFE525]/5 text-[#FFE525]">
                  100+ tools in one place
                </td>
                <td className="p-4 text-center text-white/60">Comprehensive but complex</td>
                <td className="p-4 text-center text-white/60">Usually single feature only</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-semibold">Batch processing</td>
                <td className="p-4 text-center font-bold text-white bg-[#FFE525]/5 text-[#FFE525]">
                  Yes — Batch HD Upscaler
                </td>
                <td className="p-4 text-center text-white/60">Requires manual scripting/actions</td>
                <td className="p-4 text-center text-white/60">Rarely supported</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-semibold">Works on</td>
                <td className="p-4 text-center font-bold text-white bg-[#FFE525]/5 text-[#FFE525]">
                  Any browser, no install
                </td>
                <td className="p-4 text-center text-white/60">Heavy desktop installation</td>
                <td className="p-4 text-center text-white/60">Mobile app download required</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-semibold">Pricing transparency</td>
                <td className="p-4 text-center font-bold text-white bg-[#FFE525]/5 text-[#FFE525]">
                  Free to start, no traps
                </td>
                <td className="p-4 text-center text-white/60">Expensive monthly subscription</td>
                <td className="p-4 text-center text-white/60">Auto-recurring weekly subscriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Who uses SeedPix? Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Who Uses SeedPix?
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Over 800,000+ creators, professionals, and everyday photographers edit with SeedPix every month.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: "Creators & Influencers",
              desc: "Create aesthetic thumbnails, convert gaming moments into DSLR photography, and generate viral anime avatars in seconds.",
            },
            {
              role: "Job Seekers & Executives",
              desc: "Get studio corporate LinkedIn headshots without booking expensive photographers or renting blazers.",
            },
            {
              role: "E-commerce Sellers",
              desc: "Remove cluttered backgrounds, erase unwanted watermarks, and upscale product catalog images to 4K resolution.",
            },
            {
              role: "Everyday Photographers",
              desc: "Erase accidental photobombers, fix blinking closed eyes, and restore damaged childhood family heirloom photographs.",
            },
          ].map((persona) => (
            <div
              key={persona.role}
              className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-[#FFE525]/40 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#FFE525]/15 text-[#FFE525] flex items-center justify-center font-black mb-4">
                  ✦
                </div>
                <h3 className="text-base font-bold text-white mb-2">{persona.role}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{persona.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
