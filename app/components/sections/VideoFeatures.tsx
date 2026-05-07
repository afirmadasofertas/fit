"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoFeatures() {
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
    <section ref={sectionRef} className="bg-white pt-8 pb-12 md:pt-12 md:pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2
          className="text-center mx-auto mb-12 transition-all duration-700 ease-out"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 700,
            color: "#0D0D1A",
            lineHeight: 1.05,
            textTransform: "uppercase",
            maxWidth: "640px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
          }}
        >
          A place where{" "}
          <span style={{ color: "#602D91" }}>everyone</span>{" "}
          feels welcome
        </h2>

        {/* Video */}
        <div
          className="w-full overflow-hidden transition-all duration-700 ease-out delay-100"
          style={{
            borderRadius: "20px",
            aspectRatio: "16/7",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
          }}
        >
          <video
            src="/images/PROMO_Strongest_Self_May_ENG_2026_Doormat_(720p_No_Audio).mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center md:hidden">
          <a
            href="#memberships"
            className="inline-flex items-center justify-center transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "15px",
              fontWeight: 700,
              background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
              color: "#3D1A00",
              padding: "13px 32px",
              borderRadius: "999px",
              letterSpacing: "0.01em",
              boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
            }}
          >
            Join Now
          </a>
        </div>

      </div>
    </section>
  );
}
