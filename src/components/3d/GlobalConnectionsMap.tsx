"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Globe, TrendingUp, Clock, Award } from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedComponents";

interface CountryData {
  id: string;
  name: string;
  position: { top: string; left: string };
  successRate: string;
  processing: string;
  visaTypes: number;
  flag: string;
  programs: {
    name: string;
    status: "success" | "warning" | "info";
  }[];
  active?: boolean;
}

const countriesData: CountryData[] = [
  {
    id: "canada",
    name: "Canada",
    position: { top: "27%", left: "19%" },
    successRate: "95%",
    processing: "6 months",
    visaTypes: 8,
    flag: "🇨🇦",
    active: true,
    programs: [
      { name: "Express Entry", status: "success" },
      { name: "Provincial Nominee", status: "success" },
      { name: "Study Permit", status: "success" },
      { name: "Start-up Visa", status: "info" },
    ],
  },
  {
    id: "usa",
    name: "USA",
    position: { top: "38%", left: "15%" },
    successRate: "87%",
    processing: "12 months",
    visaTypes: 6,
    flag: "🇺🇸",
    programs: [
      { name: "EB-1 Visa", status: "warning" },
      { name: "H-1B Visa", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "O-1 Visa", status: "info" },
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    position: { top: "32%", left: "45%" },
    successRate: "92%",
    processing: "8 months",
    visaTypes: 7,
    flag: "🇬🇧",
    programs: [
      { name: "Skilled Worker", status: "success" },
      { name: "Global Talent", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "Innovator Founder", status: "info" },
    ],
  },
  {
    id: "australia",
    name: "Australia",
    position: { top: "69%", left: "85%" },
    successRate: "93%",
    processing: "10 months",
    visaTypes: 9,
    flag: "🇦🇺",
    programs: [
      { name: "SkillSelect", status: "success" },
      { name: "Business Innovation", status: "warning" },
      { name: "Student Visa", status: "success" },
      { name: "Global Talent", status: "info" },
    ],
  },
  {
    id: "germany",
    name: "Germany",
    position: { top: "33%", left: "51%" },
    successRate: "89%",
    processing: "9 months",
    visaTypes: 5,
    flag: "🇩🇪",
    programs: [
      { name: "EU Blue Card", status: "success" },
      { name: "Job Seeker Visa", status: "info" },
      { name: "Study Visa", status: "success" },
      { name: "Skilled Immigration Act", status: "warning" },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    position: { top: "47%", left: "77%" },
    successRate: "91%",
    processing: "4 months",
    visaTypes: 4,
    flag: "🇸🇬",
    programs: [
      { name: "Tech.Pass", status: "success" },
      { name: "Employment Pass", status: "success" },
      { name: "Student Pass", status: "success" },
      { name: "ONE Pass", status: "info" },
    ],
  },
  {
    id: "france",
    name: "France",
    position: { top: "36%", left: "47%" },
    successRate: "88%",
    processing: "7 months",
    visaTypes: 6,
    flag: "🇫🇷",
    programs: [
      { name: "Talent Passport", status: "success" },
      { name: "EU Blue Card", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "Tech Visa", status: "info" },
    ],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    position: { top: "31%", left: "50%" },
    successRate: "90%",
    processing: "5 months",
    visaTypes: 5,
    flag: "🇳🇱",
    programs: [
      { name: "Highly Skilled Migrant", status: "success" },
      { name: "EU Blue Card", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "Orientation Year", status: "info" },
    ],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    position: { top: "35%", left: "52%" },
    successRate: "85%",
    processing: "11 months",
    visaTypes: 4,
    flag: "🇨🇭",
    programs: [
      { name: "L Permit", status: "warning" },
      { name: "B Permit", status: "success" },
      { name: "Student Permit", status: "success" },
      { name: "C Permit", status: "info" },
    ],
  },
  {
    id: "japan",
    name: "Japan",
    position: { top: "40%", left: "85%" },
    successRate: "82%",
    processing: "8 months",
    visaTypes: 7,
    flag: "🇯🇵",
    programs: [
      { name: "Specified Skilled Worker", status: "success" },
      { name: "Engineer/Humanities", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "Working Holiday", status: "info" },
    ],
  },
  {
    id: "newzealand",
    name: "New Zealand",
    position: { top: "72%", left: "92%" },
    successRate: "94%",
    processing: "9 months",
    visaTypes: 6,
    flag: "🇳🇿",
    programs: [
      { name: "Skilled Migrant", status: "success" },
      { name: "Work to Residence", status: "success" },
      { name: "Student Visa", status: "success" },
      { name: "Working Holiday", status: "info" },
    ],
  },
];

const legendItems = [
  { type: "skilled", label: "Skilled Migration", color: "var(--success)" },
  {
    type: "unskilled",
    label: "Unskilled Opportunities",
    color: "var(--warning)",
  },
  {
    type: "student",
    label: "Student Pathways",
    color: "var(--primary-purple)",
  },
  {
    type: "business",
    label: "Business Migration",
    color: "var(--accent-purple-light)",
  },
];

export function GlobalConnectionsMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(
    null
  );
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pulseCountries, setPulseCountries] = useState<string[]>([]);

  // Auto-cycle through regions for demonstration
  useEffect(() => {
    const regions = ["north-america", "europe", "asia-pacific", "oceania"];
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
      setHighlightedRegion(regions[animationPhase]);
    }, 8000);

    return () => clearInterval(interval);
  }, [animationPhase]);

  // Pulse high-success countries
  useEffect(() => {
    const highSuccessCountries = countriesData
      .filter((country) => parseInt(country.successRate) >= 90)
      .map((country) => country.id);

    setPulseCountries(highSuccessCountries);
  }, []);

  const handleCountryClick = (country: CountryData) => {
    setSelectedCountry(country);
    setHighlightedRegion(getCountryRegion(country.id));
  };

  const closeDetails = () => {
    setSelectedCountry(null);
    setHighlightedRegion(null);
  };

  const getCountryRegion = (countryId: string) => {
    const regions = {
      "north-america": ["canada", "usa"],
      europe: ["uk", "germany", "france", "netherlands", "switzerland"],
      "asia-pacific": ["singapore", "japan"],
      oceania: ["australia", "newzealand"],
    };

    for (const [region, countries] of Object.entries(regions)) {
      if (countries.includes(countryId)) return region;
    }
    return null;
  };

  const getSuccessLevel = (successRate: string) => {
    const rate = parseInt(successRate);
    if (rate >= 90) return "high";
    if (rate >= 85) return "medium";
    return "standard";
  };

  const getNodeBackgroundColor = (
    isHighlighted: boolean,
    isActive: boolean
  ) => {
    if (isHighlighted) return "var(--accent-purple-light)";
    if (isActive) return "var(--accent-purple-light)";
    return "var(--primary-purple)";
  };

  const getNodeBoxShadow = (isHighlighted: boolean, isActive: boolean) => {
    if (isHighlighted) return "0 0 30px var(--accent-purple-glow)";
    if (isActive) return "0 0 20px var(--accent-purple-glow)";
    return "0 0 10px var(--primary-purple)";
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default";
      case "warning":
        return "secondary";
      case "info":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "var(--success)";
      case "warning":
        return "var(--warning)";
      case "info":
        return "var(--primary-purple)";
      default:
        return "var(--text-muted)";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "success":
        return "High Success";
      case "warning":
        return "Moderate";
      case "info":
        return "Available";
      default:
        return "Available";
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: "var(--text-light)" }}>Global </span>
            <span style={{ color: "var(--accent-purple-light)" }}>
              Connections
            </span>
          </h2>
          <p className="text-xl" style={{ color: "var(--text-muted)" }}>
            Our extensive network spans across key migration destinations
            worldwide
          </p>
        </AnimatedSection>

        <AnimatedSection animation="zoom-in" delay={0.3}>
          <div
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 overflow-hidden animate-map-reveal"
            style={{
              minHeight: "500px",
              background: "var(--background-card)",
              border: "1px solid var(--accent-purple-glow)",
              backgroundImage: `radial-gradient(circle at 20% 30%, var(--accent-purple-glow) 0%, transparent 50%), 
                               radial-gradient(circle at 80% 70%, var(--primary-purple) 0%, transparent 50%)`,
            }}
          >
            {/* World Map Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23ffffff' d='M158 206c-4-1-8-2-12-2-15 0-28 12-28 27s13 27 28 27c4 0 8-1 12-2l8 16c-6 2-13 3-20 3-24 0-44-20-44-44s20-44 44-44c7 0 14 1 20 3l-8 16z'/%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />

            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, index) => {
                const particleId = `particle-${index}-${Math.random()
                  .toString(36)
                  .substring(2, 9)}`;
                return (
                  <div
                    key={particleId}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-floating"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Country Nodes */}
            {countriesData.map((country) => {
              const isHighlighted = Boolean(
                highlightedRegion &&
                  getCountryRegion(country.id) === highlightedRegion
              );
              const isPulse = pulseCountries.includes(country.id);
              const successLevel = getSuccessLevel(country.successRate);
              const nodeBackgroundColor = getNodeBackgroundColor(
                isHighlighted,
                Boolean(country.active)
              );
              const nodeBoxShadow = getNodeBoxShadow(
                isHighlighted,
                Boolean(country.active)
              );

              return (
                <button
                  key={country.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group bg-transparent border-0 p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 country-node ${
                    isHighlighted ? "highlighted" : ""
                  } ${isPulse ? "pulse-success" : ""} ${
                    hoveredCountry === country.id ? "spotlight" : ""
                  }`}
                  style={{
                    top: country.position.top,
                    left: country.position.left,
                  }}
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  aria-label={`View details for ${country.name}`}
                  data-country-name={country.name}
                >
                  {/* Success Rate Indicator */}
                  <div className={`success-indicator ${successLevel}`} />

                  {/* Node Pulse Animation */}
                  <div
                    className={`absolute inset-0 rounded-full ${
                      country.active || isHighlighted
                        ? "animate-pulse-glow"
                        : "animate-pulse"
                    }`}
                    style={{
                      backgroundColor: nodeBackgroundColor,
                      opacity: isHighlighted ? 0.6 : 0.3,
                      width: isHighlighted ? "50px" : "40px",
                      height: isHighlighted ? "50px" : "40px",
                      transform: "translate(-50%, -50%)",
                      transition: "all 0.5s ease-in-out",
                    }}
                  />

                  {/* Main Node */}
                  <div
                    className="relative w-6 h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: nodeBackgroundColor,
                      borderColor: isHighlighted
                        ? "var(--warning)"
                        : "var(--text-light)",
                      borderWidth: isHighlighted ? "3px" : "2px",
                      boxShadow: nodeBoxShadow,
                      transform: isHighlighted ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    {/* Country Flag */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {country.flag}
                    </div>
                  </div>

                  {/* Enhanced Country Tooltip */}
                  <div
                    className={`absolute top-8 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 country-tooltip-enhanced ${
                      hoveredCountry === country.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      backgroundColor: "var(--background-card)",
                      color: "var(--text-light)",
                      border: "1px solid var(--accent-purple-glow)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      minWidth: "120px",
                    }}
                  >
                    <div className="text-center">
                      <div className="font-semibold">
                        {country.name} {country.flag}
                      </div>
                      <div className="text-green-400 text-[10px] mt-1">
                        {country.successRate} Success Rate
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines - simplified version */}
                  {country.active && (
                    <div className="absolute inset-0">
                      <div
                        className="absolute w-32 h-0.5 bg-gradient-to-r opacity-60 animate-pulse"
                        style={{
                          backgroundColor: "var(--accent-purple-light)",
                          top: "50%",
                          left: "100%",
                          transform: "translateY(-50%) rotate(15deg)",
                          transformOrigin: "left center",
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Animated Network Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <defs>
                <linearGradient
                  id="connectionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "var(--accent-purple-light)",
                      stopOpacity: 0,
                    }}
                  />
                  <stop
                    offset="50%"
                    style={{
                      stopColor: "var(--accent-purple-light)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: "var(--accent-purple-light)",
                      stopOpacity: 0,
                    }}
                  />
                </linearGradient>
              </defs>

              {/* Canada to UK */}
              <path
                d="M 19% 27% Q 32% 15% 45% 32%"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                className="animate-data-flow"
                style={{ animationDelay: "0s" }}
              />

              {/* UK to Germany */}
              <path
                d="M 45% 32% L 51% 33%"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                className="animate-data-flow"
                style={{ animationDelay: "1s" }}
              />

              {/* Singapore to Australia */}
              <path
                d="M 77% 47% Q 80% 55% 85% 69%"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                className="animate-data-flow"
                style={{ animationDelay: "2s" }}
              />

              {/* Canada to Australia (long connection) */}
              <path
                d="M 19% 27% Q 50% 10% 85% 69%"
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="0.5"
                className="animate-data-flow"
                style={{ animationDelay: "3s" }}
              />
            </svg>

            {/* Floating Statistics */}
            <div className="absolute top-4 right-4 space-y-3">
              <div
                className="px-3 py-2 rounded-lg backdrop-blur-sm animate-floating"
                style={{
                  backgroundColor: "rgba(var(--background-card-rgb), 0.8)",
                  border: "1px solid var(--accent-purple-glow)",
                }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Globe
                    className="h-4 w-4"
                    style={{ color: "var(--accent-purple-light)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    {countriesData.length} Countries
                  </span>
                </div>
              </div>

              <div
                className="px-3 py-2 rounded-lg backdrop-blur-sm animate-floating"
                style={{
                  backgroundColor: "rgba(var(--background-card-rgb), 0.8)",
                  border: "1px solid var(--success)",
                  animationDelay: "0.5s",
                }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp
                    className="h-4 w-4"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    92% Avg Success
                  </span>
                </div>
              </div>

              <div
                className="px-3 py-2 rounded-lg backdrop-blur-sm animate-floating"
                style={{
                  backgroundColor: "rgba(var(--background-card-rgb), 0.8)",
                  border: "1px solid var(--warning)",
                  animationDelay: "1s",
                }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <Clock
                    className="h-4 w-4"
                    style={{ color: "var(--warning)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    8mo Avg Processing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Country Details Modal */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-slide-in">
            <AnimatedSection
              animation="zoom-in"
              className="relative animate-modal-slide-in"
            >
              <div
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                style={{
                  backgroundColor: "var(--background-card)",
                  border: "1px solid var(--accent-purple-glow)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={closeDetails}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "var(--accent-purple-light)",
                    color: "var(--text-light)",
                  }}
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Country Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">{selectedCountry.flag}</div>
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: "var(--text-light)" }}
                    >
                      {selectedCountry.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Migration Destination
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp
                        className="h-4 w-4"
                        style={{ color: "var(--success)" }}
                      />
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: "var(--text-light)" }}
                    >
                      {selectedCountry.successRate}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock
                        className="h-4 w-4"
                        style={{ color: "var(--warning)" }}
                      />
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: "var(--text-light)" }}
                    >
                      {selectedCountry.processing}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Avg. Processing
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award
                        className="h-4 w-4"
                        style={{ color: "var(--primary-purple)" }}
                      />
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: "var(--text-light)" }}
                    >
                      {selectedCountry.visaTypes}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Visa Types
                    </div>
                  </div>
                </div>

                {/* Visa Programs */}
                <div className="mb-6">
                  <h4
                    className="text-sm font-semibold mb-3"
                    style={{ color: "var(--text-light)" }}
                  >
                    Available Programs
                  </h4>
                  <div className="space-y-2">
                    {selectedCountry.programs.map((program) => (
                      <div
                        key={`${selectedCountry.id}-${program.name}`}
                        className="flex items-center justify-between p-2 rounded-lg"
                        style={{
                          backgroundColor:
                            "rgba(var(--accent-purple-light-rgb), 0.1)",
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-light)" }}
                        >
                          {program.name}
                        </span>
                        <Badge
                          variant={getStatusBadgeVariant(program.status) as any}
                          style={{
                            backgroundColor: `${getStatusColor(
                              program.status
                            )}20`,
                            color: getStatusColor(program.status),
                            border: `1px solid ${getStatusColor(
                              program.status
                            )}40`,
                          }}
                        >
                          {getStatusLabel(program.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    style={{
                      borderColor: "var(--accent-purple-light)",
                      color: "var(--accent-purple-light)",
                    }}
                  >
                    View Programs
                  </Button>
                  <Button
                    className="flex-1"
                    style={{
                      backgroundColor: "var(--primary-purple)",
                      color: "var(--text-light)",
                    }}
                  >
                    Free Consultation
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* Legend */}
        <AnimatedSection animation="fade-up" delay={0.5} className="mt-12">
          <div
            className="p-6 rounded-xl border backdrop-blur-sm"
            style={{
              backgroundColor: "var(--background-card)",
              borderColor: "var(--accent-purple-glow)",
            }}
          >
            <h4
              className="text-lg font-semibold mb-4 text-center"
              style={{ color: "var(--text-light)" }}
            >
              Migration Destination Types
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {legendItems.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
