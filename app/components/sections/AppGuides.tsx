"use client";

import { useEffect, useRef, useState } from "react";

export default function AppGuides() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(105deg, #602D91 0%, #7B35B8 38%, #C8820A 72%, #D4920C 100%)" }}
    >
      <div className="relative h-full px-6 pt-16 md:mx-auto md:max-w-[42.9rem] md:pt-16 lg:flex lg:max-w-[75.3rem] lg:flex-col lg:items-start lg:justify-center lg:pl-8 lg:pr-[44%] lg:pt-0 lg:min-h-[560px]">

        {/* Headline */}
        <h2
          className="mb-4 transition-all duration-700 ease-out"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
          }}
        >
          Bring the{" "}
          <span style={{ color: "#FFD900" }}>Judgement Free Zone®</span>{" "}
          anywhere
        </h2>

        {/* Body */}
        <p
          className="transition-all duration-700 ease-out delay-100"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "18px",
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.5,
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
          }}
        >
          The PF App has it all – pick the best time to visit your club with the
          Crowd Meter, track your activities, access hundreds of digital
          on-demand workouts, and more! Ready to get movin'?
        </p>

        {/* Join Now button */}
        <a
          href="#memberships"
          className="inline-flex items-center justify-center mb-10 transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "15px",
            fontWeight: 700,
            background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
            color: "#3D1A00",
            padding: "14px 36px",
            borderRadius: "999px",
            letterSpacing: "0.01em",
            boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.25s, transform 0.2s, filter 0.2s",
          }}
        >
          Join Now
        </a>

        {/* Phone image — mobile: inline centered; lg: absolute bottom right */}
        <picture>
          <source
            type="image/avif"
            media="(max-width: 640px)"
            srcSet="https://images.ctfassets.net/473zoc40547p/7rsxO8cq7eek5fz5ONsJCb/d18336823a356e16b0975370b9d2f41c/phone.webp?fm=avif&w=640&fit=fill"
          />
          <source
            type="image/avif"
            media="(max-width: 1280px)"
            srcSet="https://images.ctfassets.net/473zoc40547p/7rsxO8cq7eek5fz5ONsJCb/d18336823a356e16b0975370b9d2f41c/phone.webp?fm=avif&w=1280&fit=fill"
          />
          <source
            type="image/avif"
            media="(min-width: 1280px)"
            srcSet="https://images.ctfassets.net/473zoc40547p/7rsxO8cq7eek5fz5ONsJCb/d18336823a356e16b0975370b9d2f41c/phone.webp?fm=avif&w=2560&fit=fill"
          />
          <img
            src="https://images.ctfassets.net/473zoc40547p/7rsxO8cq7eek5fz5ONsJCb/d18336823a356e16b0975370b9d2f41c/phone.webp?fm=webp"
            alt="Mobile app Main screen"
            className="ml-[50%] aspect-square w-[21rem] translate-x-[-49%] md:w-[35.6rem] md:translate-x-[-47.7%] lg:absolute lg:bottom-0 lg:right-0 lg:ml-0 lg:w-[37rem] lg:translate-x-[0]"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease-out 0.2s",
            }}
          />
        </picture>

      </div>
    </section>
  );
}
