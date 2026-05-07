"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  UserAdd01Icon, TsunamiIcon, OfficeChairIcon, Sun02Icon,
  GlobalIcon, Coupon01Icon, CrownIcon, Dumbbell01Icon,
  Wifi01Icon, SmartPhone01Icon, Cardiogram01Icon, MoneyBag01Icon, CheckListIcon, StarIcon,
} from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

const BLACK_PERKS = [
  { icon: GlobalIcon,      label: "Access to any location" },
  { icon: UserAdd01Icon,   label: "Bring 1 guest for free" },
  { icon: TsunamiIcon,     label: "HydroMassage®" },
  { icon: OfficeChairIcon, label: "Massage chair" },
  { icon: Sun02Icon,       label: "Tanning" },
  { icon: Coupon01Icon,    label: "Exclusive discounts" },
  { icon: CrownIcon,       label: "Premium Black Card® benefits" },
];

const CLASSIC_PERKS = [
  { icon: MoneyBag01Icon,   label: "Lowest price in the network" },
  { icon: Dumbbell01Icon,   label: "Full equipment access" },
  { icon: Cardiogram01Icon, label: "Cardio & strength area" },
  { icon: Wifi01Icon,       label: "Free Wi-Fi" },
  { icon: SmartPhone01Icon, label: "Planet Fitness App" },
  { icon: CheckListIcon,    label: "Basic training included" },
];

function PerkItem({ icon, label, dark }: {
  icon: IconSvgElement;
  label: string;
  dark: boolean;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
        style={{ background: dark ? "#4A2080" : "#602D91" }}
      >
        <HugeiconsIcon icon={icon} size={13} color={dark ? "#FFD900" : "#FFFFFF"} strokeWidth={1.8} />
      </span>
      <span style={{
        fontFamily: "var(--font-barlow)",
        fontSize: "13px",
        fontWeight: 500,
        color: dark ? "#FFFFFF" : "#4B4B6B",
      }}>
        {label}
      </span>
    </li>
  );
}

export default function Memberships() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mem-header > *", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".mem-header", start: "top 80%" },
      });
      gsap.fromTo(".mem-card", { y: 36, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".mem-cards", start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="memberships" className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mem-header text-center mb-12">
          <span className="inline-block mb-3 tracking-[0.28em] uppercase text-pf-purple"
            style={{ fontFamily: "var(--font-barlow)", fontSize: "11px", fontWeight: 600 }}>
            Memberships
          </span>
          <h2 className="uppercase leading-[1.05] mb-4 text-pf-text"
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700 }}>
            Find the plan that fits you
          </h2>
          <p className="mx-auto"
            style={{ fontFamily: "var(--font-barlow)", fontSize: "15px", fontWeight: 400, color: "#6B6B8A", maxWidth: "460px", lineHeight: 1.6 }}>
            All memberships include access to our Judgment Free Zone®
            and tons of cardio &amp; strength equipment.
          </p>
        </div>

        {/* Cards */}
        <div className="mem-cards grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-stretch" style={{ paddingTop: "56px" }}>

          {/* BLACK CARD */}
          <div className="mem-card relative rounded-2xl flex flex-col"
            style={{
              background: "linear-gradient(145deg, #3A1266 0%, #602D91 55%, #7B35B8 100%)",
              boxShadow: "0 20px 48px -12px rgba(96,45,145,0.40)",
            }}>
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />

            <div className="relative z-10 p-7 flex flex-col flex-1">
              {/* Card image */}
              <div className="mb-5" style={{ marginTop: "-56px" }}>
                <img
                  src="/images/BLACK CARD.png"
                  alt="PF Black Card"
                  className="w-[155px] md:w-[210px]"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}
                />
              </div>

              {/* Badge */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: "#FFD900", fontFamily: "var(--font-barlow)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3A1266" }}>
                  <HugeiconsIcon icon={StarIcon} size={11} color="#3A1266" strokeWidth={2} />
                  Most popular
                </span>
              </div>

              {/* Plan name */}
              <h3 className="uppercase leading-none mb-5"
                style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>
                PF BLACK CARD®
                <br />
                <span style={{ color: "#FFD900" }}>LIFETIME</span>
              </h3>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "11px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "0.03em" }}>FROM</span>
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", textDecoration: "line-through", textDecorationColor: "#FFFFFF", letterSpacing: "0.02em" }}>$1,999</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "14px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "0.03em" }}>NOW</span>
                  <span style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, color: "#FFD900", lineHeight: 1, letterSpacing: "-0.01em" }}>
                    $147
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-5"
                style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.55, maxWidth: "300px" }}>
                Train for life with a one-time payment.
                More freedom, more comfort, and premium access across the entire network.
              </p>

              <div className="mb-4 h-px" style={{ background: "#5A2E8A" }} />

              {/* Notice */}
              <p className="mb-3" style={{ fontFamily: "var(--font-barlow)", fontSize: "12px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "0.01em" }}>
                Everything in CLASSIC ANNUAL +
              </p>

              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {BLACK_PERKS.map((p) => <PerkItem key={p.label} icon={p.icon} label={p.label} dark />)}
              </ul>

              <a href="#"
                className="flex items-center justify-center w-full transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-barlow)", fontSize: "14px", fontWeight: 700,
                  background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
                  boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
                  color: "#3A1266", padding: "13px 28px", borderRadius: "999px", letterSpacing: "0.02em",
                }}>
                Join Now
              </a>
            </div>
          </div>

          {/* CLASSIC ANNUAL */}
          <div className="mem-card rounded-2xl flex flex-col"
            style={{ background: "#FFFFFF", border: "1.5px solid #EBEBF5", boxShadow: "0 16px 48px -16px rgba(96,45,145,0.10)" }}>

            <div className="p-7 flex flex-col flex-1">
              {/* Card image */}
              <div className="mb-5" style={{ marginTop: "-56px" }}>
                <img
                  src="/images/CLASSIC CARD.png"
                  alt="Classic Card"
                  className="w-[155px] md:w-[210px]"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }}
                />
              </div>

              {/* Plan name */}
              <h3 className="uppercase leading-none mb-5"
                style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#1A1A2E", lineHeight: 1.1 }}>
                CLASSIC
                <br />
                <span style={{ color: "#602D91" }}>ANNUAL</span>
              </h3>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "11px", fontWeight: 600, color: "#AEAEC2", letterSpacing: "0.03em" }}>FROM</span>
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 600, color: "#AEAEC2", textDecoration: "line-through", textDecorationColor: "#AEAEC2", letterSpacing: "0.02em" }}>$480</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "14px", fontWeight: 600, color: "#1A1A2E", letterSpacing: "0.03em" }}>NOW</span>
                  <span style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, color: "#602D91", lineHeight: 1, letterSpacing: "-0.01em" }}>
                    $79.90
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-5"
                style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 500, color: "#4B4B6B", lineHeight: 1.55, maxWidth: "300px" }}>
                Perfect for those who want to save and train at their home club.
                Full access to weights, cardio, Wi-Fi, the app, and basic training.
              </p>

              <div className="mb-5 h-px" style={{ background: "#EBEBF5" }} />

              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {CLASSIC_PERKS.map((p) => <PerkItem key={p.label} icon={p.icon} label={p.label} dark={false} />)}
              </ul>

              <a href="#"
                className="flex items-center justify-center w-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-barlow)", fontSize: "14px", fontWeight: 700,
                  background: "#602D91", color: "#FFFFFF",
                  padding: "13px 28px", borderRadius: "999px", letterSpacing: "0.02em",
                  boxShadow: "0 8px 20px -8px rgba(96,45,145,0.35)",
                }}>
                Join Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
