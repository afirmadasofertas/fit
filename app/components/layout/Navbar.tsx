"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled || menuOpen ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="/" aria-label="Planet Fitness">
          <img
            src="https://www.planetfitness.com/remix/images/icons/Logo-Primary.svg"
            alt="Planet Fitness"
            style={{ height: "36px", width: "auto" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Memberships", href: "#memberships" },
            { label: "Locations", href: "#find-a-club" },
            { label: "App", href: "#app" },
            { label: "About", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "14px",
                fontWeight: 600,
                color: scrolled ? "#1A1A2E" : "#FFFFFF",
                letterSpacing: "0.02em",
                transition: "color 0.3s",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#memberships"
          className="hidden md:inline-flex items-center justify-center transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "14px",
            fontWeight: 700,
            background: "#602D91",
            color: "#FFFFFF",
            padding: "10px 22px",
            borderRadius: "999px",
            letterSpacing: "0.01em",
            boxShadow: "0 8px 20px -8px rgba(96,45,145,0.35)",
          }}
        >
          Join Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: scrolled || menuOpen ? "#1A1A2E" : "#FFFFFF",
              transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: scrolled || menuOpen ? "#1A1A2E" : "#FFFFFF",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{
              background: scrolled || menuOpen ? "#1A1A2E" : "#FFFFFF",
              transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "300px" : "0" }}
      >
        <nav className="flex flex-col px-6 pb-6 gap-1 border-t border-gray-100">
          {[
            { label: "Memberships", href: "#memberships" },
            { label: "Locations", href: "#find-a-club" },
            { label: "App", href: "#app" },
            { label: "About", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-gray-100 last:border-0"
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#1A1A2E",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#memberships"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center"
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "15px",
              fontWeight: 700,
              background: "linear-gradient(180deg, #FFD900 0%, #CAB01F 100%)",
              color: "#3D1A00",
              padding: "13px 28px",
              borderRadius: "999px",
              boxShadow: "inset 0 5.96px 7.6px 0 #F7FFB5",
            }}
          >
            Join Now
          </a>
        </nav>
      </div>
    </header>
  );
}
