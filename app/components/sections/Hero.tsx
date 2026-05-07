"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserAdd01Icon,
  TsunamiIcon,
  OfficeChairIcon,
  Sun02Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";

const PERKS = [
  { icon: UserAdd01Icon,   label: "Bring 1 guest for free" },
  { icon: TsunamiIcon,     label: "HydroMassage" },
  { icon: OfficeChairIcon, label: "Massage chair" },
  { icon: Sun02Icon,       label: "Tanning" },
  { icon: GlobalIcon,      label: "Nationwide access" },
];

const ICON_BG: React.CSSProperties = {
  background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
  boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
  borderRadius: "10px",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 }).fromTo(
        "[data-hero]",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "738px", maxHeight: "738px" }}
    >
      {/* Background — desktop */}
      <img
        src="/images/hero-bg.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        draggable={false}
      />

      {/* Background — mobile */}
      <img
        src="/images/heromobile01.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
        draggable={false}
      />

      {/* Gradient overlay — desktop */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(80,20,140,0.82) 0%, rgba(80,20,140,0.60) 38%, rgba(80,20,140,0.10) 65%, transparent 100%)",
        }}
      />


      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center" style={{ minHeight: "738px" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-14 w-full pb-12 md:pb-0 pt-16 md:pt-0">

          {/* Mobile: centered / Desktop: left aligned */}
          <div className="max-w-[520px] mx-auto md:mx-0 text-center md:text-left">

            {/* H1 */}
            <h1
              data-hero
              className="uppercase leading-[1.0] mb-5"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "clamp(2rem, 10vw, 48px)",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              <span className="text-white">TRAIN FOR </span>
              <span style={{ color: "#FFD900" }}>LIFE</span>
              <br />
              <span className="text-white">NO MONTHLY FEES.</span>
              <br />
              <span style={{ color: "#FFD900" }}>NO LIMITS!</span>
            </h1>

            {/* Body */}
            <p
              data-hero
              className="text-white/75 mb-6 leading-relaxed"
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "16px",
                fontWeight: 400,
                maxWidth: "480px",
              }}
            >
              Full gym access for an unbeatable price.
            </p>

            {/* Perks */}
            <ul
              data-hero
              className="mb-7 inline-grid text-left"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
                maxWidth: "420px",
              }}
            >
              {PERKS.map(({ icon, label }, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-white/90"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontSize: "13px",
                    fontWeight: 500,
                    gridColumn:
                      i === PERKS.length - 1 && PERKS.length % 2 !== 0
                        ? "span 2"
                        : undefined,
                  }}
                >
                  <span style={ICON_BG}>
                    <HugeiconsIcon icon={icon} size={15} color="#3D1A00" strokeWidth={1.8} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {/* Price strip */}
            <div data-hero className="flex items-center justify-center md:justify-start gap-3 mb-7">
              <img
                src="/images/just.svg"
                alt="Just"
                style={{ height: "31px", width: "auto" }}
              />
              <span
                className="text-white/50 line-through"
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "18px",
                  letterSpacing: "0.01em",
                }}
              >
                $480,00
              </span>
              <span className="text-white/30 text-lg font-light">|</span>
              <span
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "#FFD900",
                  letterSpacing: "0.01em",
                }}
              >
                $79,90
              </span>
            </div>

            {/* CTA button */}
            <div data-hero className="flex justify-center md:justify-start">
              <a
                href="#memberships"
                className="inline-flex items-center justify-center transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "16px",
                  background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
                  color: "#3D1A00",
                  padding: "16px 44px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
                }}
              >
                Join Now
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
