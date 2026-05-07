"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Location01Icon, MapsIcon } from "@hugeicons/core-free-icons";

interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface Club {
  id: number;
  name: string;
  lat: number;
  lon: number;
  address: string;
  distance?: number;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatAddress(tags: Record<string, string>) {
  const parts = [
    tags["addr:housenumber"] && tags["addr:street"]
      ? `${tags["addr:housenumber"]} ${tags["addr:street"]}`
      : tags["addr:street"],
    tags["addr:city"],
    tags["addr:state"],
    tags["addr:postcode"],
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "Address not available";
}

export default function FindAClub() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Scroll reveal ── */
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

  /* ── Close suggestions on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Autocomplete via Nominatim ── */
  const fetchSuggestions = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 3) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&countrycodes=us&limit=5&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: Suggestion[] = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch { /* silent */ }
    }, 350);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // ZIP mask: only digits → XX-XXXXX or XXXXX
    const isZip = /^\d+$/.test(val.replace("-", ""));
    let masked = val;
    if (isZip && val.replace(/\D/g, "").length <= 8) {
      const digits = val.replace(/\D/g, "");
      masked = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5, 9)}` : digits;
    }
    setQuery(masked);
    fetchSuggestions(masked);
  };

  /* ── Search clubs via Overpass ── */
  const searchClubs = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setSearched(true);
    setShowSuggestions(false);
    try {
      const radius = 40000; // 40 km
      const overpassQuery = `
        [out:json][timeout:15];
        (
          node["name"="Planet Fitness"](around:${radius},${lat},${lon});
          way["name"="Planet Fitness"](around:${radius},${lat},${lon});
        );
        out center tags;
      `;
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      });
      const data = await res.json();
      const results: Club[] = (data.elements ?? []).map((el: Record<string, unknown>) => {
        const elLat = typeof el.lat === "number" ? el.lat : (el.center as Record<string, number>)?.lat ?? 0;
        const elLon = typeof el.lon === "number" ? el.lon : (el.center as Record<string, number>)?.lon ?? 0;
        const tags = (el.tags as Record<string, string>) ?? {};
        return {
          id: el.id as number,
          name: tags.name ?? "Planet Fitness",
          lat: elLat,
          lon: elLon,
          address: formatAddress(tags),
          distance: haversine(lat, lon, elLat, elLon),
        };
      });
      results.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
      setClubs(results.slice(0, 6));
    } catch { setClubs([]); }
    setLoading(false);
  }, []);

  const handleSelect = (s: Suggestion) => {
    setQuery(s.display_name.split(",")[0]);
    setSelectedLabel(s.display_name.split(",").slice(0, 3).join(","));
    setShowSuggestions(false);
    searchClubs(parseFloat(s.lat), parseFloat(s.lon));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=us&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data: Suggestion[] = await res.json();
      if (data[0]) {
        setSelectedLabel(data[0].display_name.split(",").slice(0, 3).join(","));
        searchClubs(parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        setClubs([]);
        setLoading(false);
      }
    } catch { setClubs([]); setLoading(false); }
  };

  return (
    <section ref={sectionRef} className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block mb-3 transition-all duration-700 ease-out"
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#602D91",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(10px)",
            }}
          >
            Locations
          </span>
          <h2
            className="transition-all duration-700 ease-out delay-100"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#0D0D1A",
              lineHeight: 1.05,
              textTransform: "uppercase",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
            }}
          >
            Get Started <span style={{ color: "#602D91" }}>Today</span>
          </h2>
        </div>

        {/* Search form */}
        <div
          ref={wrapperRef}
          className="relative transition-all duration-700 ease-out delay-200 mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)" }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #DEDEED",
              borderRadius: "999px",
              padding: "6px 6px 6px 24px",
              boxShadow: "0 4px 24px -8px rgba(96,45,145,0.12)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search by address, city, or ZIP code"
              className="flex-1 bg-transparent outline-none"
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "15px",
                color: "#1A1A2E",
              }}
              autoComplete="off"
            />
            <button
              type="submit"
              className="flex items-center gap-2 shrink-0 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
              style={{
                background: "#602D91",
                color: "#FFFFFF",
                borderRadius: "999px",
                padding: "12px 22px",
                fontFamily: "var(--font-barlow)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              <HugeiconsIcon icon={Search01Icon} size={16} color="#FFFFFF" strokeWidth={2} />
              <span className="hidden md:inline">Find a Club</span>
            </button>
          </form>

          {/* Autocomplete dropdown */}
          {showSuggestions && (
            <ul
              className="absolute left-0 right-0 top-full mt-2 overflow-hidden z-50"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #EBEBF5",
                borderRadius: "16px",
                boxShadow: "0 12px 40px -12px rgba(96,45,145,0.18)",
              }}
            >
              {suggestions.map((s) => (
                <li key={s.place_id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s)}
                    className="w-full text-left px-5 py-3 flex items-center gap-3 transition-colors hover:bg-[#F5F0FC]"
                  >
                    <HugeiconsIcon icon={Location01Icon} size={15} color="#602D91" strokeWidth={1.8} />
                    <span style={{ fontFamily: "var(--font-barlow)", fontSize: "14px", color: "#1A1A2E" }}>
                      {s.display_name.split(",").slice(0, 3).join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Results */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 rounded-full border-2 border-[#602D91] border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && searched && clubs.length === 0 && (
          <p className="text-center" style={{ fontFamily: "var(--font-barlow)", fontSize: "15px", color: "#8888A8" }}>
            No Planet Fitness locations found nearby. Try a different address.
          </p>
        )}

        {!loading && clubs.length > 0 && (
          <>
            <p className="mb-5" style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", color: "#8888A8", letterSpacing: "0.05em" }}>
              {clubs.length} location{clubs.length !== 1 ? "s" : ""} near <strong style={{ color: "#1A1A2E" }}>{selectedLabel}</strong>
            </p>
            <ul className="flex flex-col gap-3">
              {clubs.map((club) => (
                <li
                  key={club.id}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #EBEBF5",
                    borderRadius: "14px",
                    boxShadow: "0 4px 16px -8px rgba(96,45,145,0.08)",
                  }}
                >
                  <span
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#EDE4F8" }}
                  >
                    <HugeiconsIcon icon={MapsIcon} size={18} color="#602D91" strokeWidth={1.8} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "16px", fontWeight: 700, color: "#0D0D1A" }}>
                      {club.name}
                    </p>
                    <p className="truncate" style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", color: "#6B6B8A" }}>
                      {club.address}
                    </p>
                  </div>
                  {club.distance !== undefined && (
                    <span
                      className="shrink-0"
                      style={{ fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 600, color: "#602D91" }}
                    >
                      {club.distance.toFixed(1)} mi
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </section>
  );
}
