"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    img: "https://images.ctfassets.net/473zoc40547p/2MmRL0qUaxUrlYJWqoZvaM/ad63e193da416422ff19dddaecb262a8/PF_Web_HP_Content_Block_USA_Today_Award.png?fm=avif&w=2560&fit=fill",
    label: "Award-Winning",
    title: "Award-Winning",
    highlight: "Member Support",
    body: "We're proud to be recognized on America's Best Customer Service list, a reflection of our team's commitment to creating a friendly environment where everyone feels accepted and respected.",
  },
  {
    img: "https://images.ctfassets.net/473zoc40547p/1AEd1AlUbTcDdkQ2KGzuiK/c934313c28dd62a1540080b384b533ba/BCGuest.webp?fm=avif&w=2560&fit=fill",
    label: "Community",
    title: "Welcome to",
    highlight: "Planet Fitness",
    body: "We've created a comfortable, safe and energetic environment for everyone. A space where you can go at your own pace, and do your own thing without ever having to worry about being judged.",
  },
  {
    img: "https://images.ctfassets.net/473zoc40547p/nbA3yYXOooLBSxki5vgyc/5a7c156d367565c5c785ff03faf211bb/07.12.24_Web_Re-Design_Virtual_Tour_Update.jpg?fm=avif&w=2560&fit=fill",
    label: "Virtual Tour",
    title: "Take a",
    highlight: "Virtual Club Tour!",
    body: "Join us on a virtual club tour around a Planet Fitness. You'll learn all about the different areas of the club and how to get the most out of a membership and where you can start your fitness journey.",
  },
];

export default function ContentCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLUListElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const dragStateRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });

  /* ── Intersection reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Parallax ── */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      document.querySelectorAll<HTMLElement>("[data-parallax-img]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = Math.max(-28, Math.min(28, center * -0.05));
        el.style.setProperty("--py", `${offset}px`);
      });
    };
    const queue = () => { if (frame) return; frame = requestAnimationFrame(() => { update(); frame = 0; }); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, []);

  /* ── Drag ── */
  const onDown = (x: number) => { const s = sliderRef.current; if (!s) return; dragStateRef.current = { isDragging: true, startX: x, startScrollLeft: s.scrollLeft }; };
  const onMove = (x: number) => { const s = sliderRef.current; if (!s || !dragStateRef.current.isDragging) return; s.scrollLeft = dragStateRef.current.startScrollLeft - (x - dragStateRef.current.startX); };
  const onUp   = () => { dragStateRef.current.isDragging = false; };

  return (
    <section ref={sectionRef} className="bg-white pt-8 pb-12 md:pt-12 md:pb-20 overflow-hidden">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <p
          className="transition-all duration-700 ease-out"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#602D91",
            marginBottom: "14px",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateY(10px)",
          }}
        >
          Why Planet Fitness
        </p>
        <h2
          className="transition-all duration-700 ease-out delay-100 mx-auto"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "#0D0D1A",
            lineHeight: 1.05,
            textTransform: "uppercase",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "none" : "translateY(16px)",
          }}
        >
          A gym built for{" "}
          <span style={{ color: "#602D91" }}>everyone</span>
        </h2>
        <p
          className="transition-all duration-700 ease-out delay-200"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "13px",
            color: "#8888A8",
            marginTop: "6px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: titleVisible ? 1 : 0,
          }}
        >
          Drag to explore
        </p>
      </div>

      {/* Slider */}
      <ul
        ref={sliderRef}
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onUp}
        className="flex gap-5 overflow-x-auto px-[8vw] md:px-[12vw] select-none md:cursor-grab md:active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SLIDES.map((slide, i) => (
          <li
            key={slide.label}
            className="flex-none"
            style={{ width: "clamp(260px, 72vw, 400px)" }}
          >
            <article
              className="relative overflow-hidden"
              style={{ height: "clamp(340px, 55vw, 540px)", borderRadius: "20px" }}
            >
              {/* Image with parallax */}
              <div
                data-parallax-img
                className="absolute inset-0 will-change-transform"
                style={{ transform: "translate3d(0, var(--py, 0px), 0) scale(1.08)" }}
              >
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" draggable={false} />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.72) 100%)" }} />

              {/* Label pill */}
              <div className="absolute top-5 left-5">
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                    fontFamily: "var(--font-barlow)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pf-yellow" />
                  {slide.label}
                </span>
              </div>

              {/* Headline + body at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="uppercase leading-none mb-3"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.05,
                  }}
                >
                  {slide.title}{" "}
                  <span style={{ color: "#FFD900" }}>{slide.highlight}</span>
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    lineHeight: 1.55,
                  }}
                >
                  {slide.body}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* Mobile CTA */}
      <div className="mt-6 flex justify-center md:hidden px-6">
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

    </section>
  );
}
