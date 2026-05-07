"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  Facebook01Icon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/planetfitness" },
  { icon: Facebook01Icon, label: "Facebook", href: "https://facebook.com/planetfitness" },
  { icon: NewTwitterIcon, label: "X", href: "https://x.com/planetfitness" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com/planetfitness" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#602D91" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">

        {/* Logo */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
          <img
            src="https://www.planetfitness.com/remix/images/small-logo.svg"
            alt="Planet Fitness"
            style={{ height: "48px", width: "auto" }}
          />

          {/* Socials */}
          <div className="flex gap-3">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <HugeiconsIcon icon={icon} size={16} color="#FFFFFF" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}>
            © {new Date().getFullYear()} Planet Fitness. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms of Use", "Privacy Policy", "Cookie Settings"].map((t) => (
              <a
                key={t}
                href="#"
                className="transition-opacity hover:opacity-100"
                style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", color: "rgba(255,255,255,0.60)" }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
