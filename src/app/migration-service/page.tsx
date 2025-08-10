"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Phone,
  Mail,
  MapPin,
  Star,
  Globe,
  Building2,
  ChevronUp,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";
import MolecularNetworkVisualization from "@/components/3d/MolecularNetworkVisualization";
import { GlobalConnectionsMap } from "@/components/3d/GlobalConnectionsMap";
import { ProgramCards } from "@/components/waitlist/ProgramCards";
import { ClientPolicies } from "@/components/sections/ClientPolicies";
import { ClientReputationManagement } from "@/components/sections/ClientReputationManagement";
import { ClientCommunicationHub } from "@/components/sections/ClientCommunicationHub";
import {
  AnimatedSection,
  ParallaxSection,
  TiltCard,
  StaggeredList,
  FloatingElement,
} from "@/components/animations/AnimatedComponents";

const migrationData = [
  {
    stage: "1. Assessment",
    process:
      "Evaluate eligibility based on education, work experience, and language proficiency",
    timeline: "1-2 weeks",
    documents: "Resume, Education certificates",
    status: "active",
    countries: ["🇨🇦 Canada", "🇦🇺 Australia", "🇳🇿 New Zealand"],
    priority: "high",
  },
  {
    stage: "2. Strategy",
    process: "Customize immigration pathway based on assessment results",
    timeline: "1 week",
    documents: "Assessment report",
    status: "active",
    countries: ["🇺🇸 USA", "🇬🇧 UK", "🇩🇪 Germany"],
    priority: "high",
  },
  {
    stage: "3. Documentation",
    process: "Prepare and review all required application documents",
    timeline: "2-4 weeks",
    documents: "ID, certificates, financials",
    status: "active",
    countries: ["🇫🇷 France", "🇳🇱 Netherlands", "🇸🇬 Singapore"],
    priority: "medium",
  },
  {
    stage: "4. Submission",
    process: "Submit application to immigration authorities",
    timeline: "1 week",
    documents: "Completed application",
    status: "active",
    countries: ["🇨🇭 Switzerland", "🇯🇵 Japan"],
    priority: "high",
  },
  {
    stage: "5. Processing",
    process: "Monitor application progress and respond to requests",
    timeline: "3-12 months",
    documents: "Additional documents as requested",
    status: "pending",
    countries: ["All Countries"],
    priority: "medium",
  },
  {
    stage: "6. Approval",
    process: "Receive visa/permit approval and prepare for relocation",
    timeline: "2-4 weeks",
    documents: "Visa/Permit documents",
    status: "pending",
    countries: ["Selected Country"],
    priority: "high",
  },
  {
    stage: "7. Relocation",
    process: "Support with settling in new country",
    timeline: "Ongoing",
    documents: "Travel documents",
    status: "active",
  },
];

const destinations = [
  {
    id: "canada",
    name: "Canada",
    description:
      "High quality of life with Express Entry and Provincial Nominee Programs.",
    rating: 5,
    featured: true,
    image: "🇨🇦",
  },
  {
    id: "australia",
    name: "Australia",
    description:
      "Skilled migration pathways with points-based selection system.",
    rating: 4.5,
    featured: false,
    image: "🇦🇺",
  },
  {
    id: "uk",
    name: "United Kingdom",
    description:
      "Work, study, and family visa options with pathway to settlement.",
    rating: 4,
    featured: false,
    image: "🇬🇧",
  },
];

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Visa Application",
    description:
      "Expert guidance through complex visa processes with high approval rates",
    highlight: "98% Success Rate",
    color: "var(--success)",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Immigration Consulting",
    description:
      "Personalized immigration strategies based on your profile and goals",
    highlight: "Certified Advisors",
    color: "var(--primary-purple)",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Relocation Services",
    description:
      "Comprehensive support for housing, education, and settling in your new country",
    highlight: "End-to-End Support",
    color: "var(--accent-purple-light)",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Network",
    description:
      "Connections in major countries to facilitate your international transition",
    highlight: "50+ Countries",
    color: "var(--warning)",
  },
];

export default function MigrationServicePage() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="landing-hero-bg min-h-screen">
      {/* Back to Home Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <Button
          className="landing-button-primary"
          onClick={() => (window.location.href = "/")}
        >
          ← Back to Home
        </Button>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600 to-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-gray-700/30 bg-gray-900/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">
                LINAK Migration Service
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {["Destinations", "Services", "Process", "About", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--accent-purple-light)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "var(--text-light)" }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-4 border-t"
              style={{ borderColor: "var(--accent-purple-glow)" }}
            >
              {["Destinations", "Services", "Process", "About", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 lg:py-32 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <ParallaxSection speed={0.3} className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </ParallaxSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* Enhanced Title with Sparkle Effect */}
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span style={{ color: "var(--text-light)" }}>
                    Global Migration{" "}
                  </span>
                  <span
                    className="relative inline-block"
                    style={{ color: "var(--accent-purple-light)" }}
                  >
                    Simplified
                    <FloatingElement amplitude={5} speed={0.02}>
                      <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
                    </FloatingElement>
                  </span>
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl -z-10"></div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.2}>
              <p
                className="text-xl md:text-2xl max-w-3xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Expert guidance for your international journey with premium
                support and guaranteed results
              </p>
            </AnimatedSection>

            {/* Stats Row */}
            <AnimatedSection animation="fade-up" delay={0.4}>
              <div className="flex justify-center gap-8 mb-8">
                {[
                  {
                    number: "98%",
                    label: "Success Rate",
                    icon: <TrendingUp className="h-4 w-4" />,
                  },
                  {
                    number: "50+",
                    label: "Countries",
                    icon: <Globe className="h-4 w-4" />,
                  },
                  {
                    number: "10k+",
                    label: "Happy Clients",
                    icon: <CheckCircle className="h-4 w-4" />,
                  },
                ].map((stat) => (
                  <TiltCard key={stat.label} className="text-center">
                    <div
                      className="flex items-center justify-center gap-1 text-2xl font-bold"
                      style={{ color: "var(--accent-purple-light)" }}
                    >
                      {stat.icon}
                      {stat.number}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.label}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </AnimatedSection>

            {/* Enhanced Search Module */}
            <AnimatedSection animation="zoom-in" delay={0.6}>
              <div
                className="max-w-4xl mx-auto p-8 rounded-2xl border backdrop-blur-md shadow-2xl relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(var(--background-card-rgb), 0.8)",
                  borderColor: "var(--accent-purple-glow)",
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 pointer-events-none"></div>

                <div className="relative z-10">
                  <h3
                    className="text-xl font-semibold mb-6 flex items-center justify-center gap-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    Find Your Perfect Migration Path
                  </h3>

                  <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="destination"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--text-light)" }}
                      >
                        Destination
                      </label>
                      <select
                        id="destination"
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        style={{
                          backgroundColor: "var(--background-card)",
                          borderColor: "var(--accent-purple-glow)",
                          color: "var(--text-light)",
                        }}
                      >
                        <option value="">Select Destination</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="eu">European Union</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--text-light)" }}
                      >
                        Service
                      </label>
                      <select
                        id="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        style={{
                          backgroundColor: "var(--background-card)",
                          borderColor: "var(--accent-purple-glow)",
                          color: "var(--text-light)",
                        }}
                      >
                        <option value="">Select Service</option>
                        <option value="work">Work Visa</option>
                        <option value="study">Study Visa</option>
                        <option value="business">Business Immigration</option>
                        <option value="family">Family Sponsorship</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        type="submit"
                        className="w-full h-12"
                        style={{
                          backgroundColor: "var(--primary-purple)",
                          color: "var(--text-light)",
                        }}
                      >
                        Search Options →
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "var(--text-light)" }}>Our Migration </span>
              <span style={{ color: "var(--accent-purple-light)" }}>
                Services
              </span>
            </h2>
          </AnimatedSection>

          <StaggeredList
            staggerDelay={0.2}
            keyPrefix="feature"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature) => (
              <TiltCard
                key={feature.title}
                className="group relative p-6 rounded-xl border backdrop-blur-sm hover:scale-105 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{
                  backgroundColor: "var(--background-card)",
                  borderColor: "var(--accent-purple-glow)",
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                    backdropFilter: "blur(10px)",
                  }}
                />

                {/* Icon with animated background */}
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div style={{ color: "var(--text-light)" }}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Feature highlight badge */}
                  <Badge
                    className="mb-3 text-xs"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                      border: `1px solid ${feature.color}40`,
                    }}
                  >
                    {feature.highlight}
                  </Badge>

                  <h3
                    className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300"
                    style={{ color: "var(--text-light)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="group-hover:text-gray-200 transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {feature.description}
                  </p>

                  {/* Learn more arrow - appears on hover */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: feature.color }}
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* Molecular Network Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "var(--text-light)" }}>Our Global </span>
              <span style={{ color: "var(--accent-purple-light)" }}>
                Network
              </span>
            </h2>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              Explore our international connections across key migration
              destinations
            </p>
          </div>

          <div className="h-96 rounded-xl overflow-hidden">
            <MolecularNetworkVisualization
              onCountrySelect={(countryId: string) =>
                console.log("Selected country:", countryId)
              }
            />
          </div>

          <div className="flex justify-center gap-8 mt-8">
            {[
              {
                id: "migration-hub",
                color: "var(--primary-purple)",
                label: "Migration Hub",
              },
              {
                id: "partner-office",
                color: "var(--accent-purple-light)",
                label: "Partner Office",
              },
              {
                id: "featured-destination",
                color: "var(--success)",
                label: "Featured Destination",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "var(--text-light)" }}>Popular </span>
              <span style={{ color: "var(--accent-purple-light)" }}>
                Destinations
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group relative overflow-hidden rounded-xl border backdrop-blur-sm hover:scale-105 transition-all duration-500"
                style={{
                  backgroundColor: "var(--background-card)",
                  borderColor: "var(--accent-purple-glow)",
                }}
              >
                {destination.featured && (
                  <Badge
                    className="absolute top-4 left-4 z-10"
                    style={{
                      backgroundColor: "var(--success)",
                      color: "var(--text-light)",
                    }}
                  >
                    Featured
                  </Badge>
                )}

                <div className="h-48 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center text-6xl">
                  {destination.image}
                </div>

                <div className="p-6">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "var(--text-light)" }}
                  >
                    {destination.name}
                  </h3>
                  <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      style={{
                        borderColor: "var(--accent-purple-light)",
                        color: "var(--accent-purple-light)",
                      }}
                    >
                      Explore Options
                    </Button>

                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(destination.rating))].map(
                        (_, i) => (
                          <Star
                            key={`star-${destination.id}-${i}`}
                            className="h-4 w-4 fill-current"
                            style={{ color: "var(--warning)" }}
                          />
                        )
                      )}
                      {destination.rating % 1 !== 0 && (
                        <Star
                          className="h-4 w-4 fill-current opacity-50"
                          style={{ color: "var(--warning)" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Connections Map Section */}
      <GlobalConnectionsMap />

      {/* Migration Process Section */}
      <section id="process" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span style={{ color: "var(--text-light)" }}>Migration </span>
              <span style={{ color: "var(--accent-purple-light)" }}>
                Process
              </span>
            </h2>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              Our streamlined approach to your successful migration journey
            </p>
          </div>

          <div className="molecular-connections mb-8"></div>

          <div
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--accent-purple-glow)" }}
          >
            <table className="molecular-table table-responsive-stack">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Process</th>
                  <th>Timeline</th>
                  <th>Documents</th>
                  <th>Priority Countries</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {migrationData.map((row, index) => (
                  <tr
                    key={row.stage}
                    className={`migration-row ${
                      row.priority === "high"
                        ? "high-priority"
                        : "medium-priority"
                    }`}
                    style={{
                      background:
                        row.priority === "high"
                          ? "linear-gradient(90deg, rgba(142, 68, 173, 0.1) 0%, transparent 100%)"
                          : "rgba(30, 18, 41, 0.3)",
                      borderLeft: `4px solid ${
                        row.priority === "high"
                          ? "var(--accent-purple-light)"
                          : "var(--info)"
                      }`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <td data-label="Stage">
                      <div className="flex items-center gap-2">
                        <div
                          className={`stage-indicator ${
                            row.priority === "high"
                              ? "high-priority"
                              : "medium-priority"
                          }`}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor:
                              row.priority === "high"
                                ? "var(--accent-purple-light)"
                                : "var(--info)",
                          }}
                        />
                        <strong>{row.stage}</strong>
                      </div>
                    </td>
                    <td data-label="Process">{row.process}</td>
                    <td data-label="Timeline">
                      <Badge
                        variant={
                          row.priority === "high" ? "default" : "outline"
                        }
                        className="whitespace-nowrap"
                      >
                        {row.timeline}
                      </Badge>
                    </td>
                    <td data-label="Documents">{row.documents}</td>
                    <td data-label="Priority Countries">
                      <div className="flex flex-wrap gap-1">
                        {row.countries?.map((country, countryIndex) => (
                          <span
                            key={`${index}-${countryIndex}`}
                            className="country-highlight-badge"
                            style={{
                              padding: "2px 6px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              backgroundColor: "var(--accent-purple-glow)",
                              color: "var(--text-light)",
                              border: "1px solid var(--accent-purple-light)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td data-label="Status">
                      <div className="flex items-center gap-2">
                        <span
                          className={`status-indicator ${
                            row.status === "active"
                              ? "status-active"
                              : "status-pending"
                          }`}
                        ></span>
                        <span className="capitalize">
                          {row.status === "active" ? "Available" : "Varies"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="molecular-connections mt-8"></div>

          <div className="text-center mt-12">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-light)" }}
            >
              Ready to begin your migration journey?
            </h3>
            <Button
              size="lg"
              style={{
                backgroundColor: "var(--primary-purple)",
                color: "var(--text-light)",
              }}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Limited Availability Programs Section */}
      <ProgramCards
        title="Exclusive Waitlist Programs"
        subtitle="Limited spots available for our premium migration programs with guaranteed success rates"
      />

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span style={{ color: "var(--text-light)" }}>Get in </span>
                <span style={{ color: "var(--accent-purple-light)" }}>
                  Touch
                </span>
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                Our migration experts are ready to help you start your
                international journey.
              </p>

              <div className="space-y-6">
                {[
                  {
                    id: "phone",
                    icon: <Phone className="h-5 w-5" />,
                    title: "Phone",
                    value: "+1 (555) 123-4567",
                  },
                  {
                    id: "email",
                    icon: <Mail className="h-5 w-5" />,
                    title: "Email",
                    value: "info@linakmigration.com",
                  },
                  {
                    id: "address",
                    icon: <MapPin className="h-5 w-5" />,
                    title: "Address",
                    value:
                      "123 Migration Street, Suite 456\nNew York, NY 10001",
                  },
                ].map((contact) => (
                  <div key={contact.id} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--primary-purple)" }}
                    >
                      <div style={{ color: "var(--text-light)" }}>
                        {contact.icon}
                      </div>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "var(--text-light)" }}
                      >
                        {contact.title}
                      </h4>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {contact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="p-8 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: "var(--background-card)",
                borderColor: "var(--accent-purple-glow)",
              }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                      color: "var(--text-light)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                      color: "var(--text-light)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                      color: "var(--text-light)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="service-interest"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Service of Interest
                  </label>
                  <select
                    id="service-interest"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                      color: "var(--text-light)",
                    }}
                  >
                    <option value="">Select a service</option>
                    <option value="work-visa">Work Visa</option>
                    <option value="study-visa">Study Visa</option>
                    <option value="business">Business Immigration</option>
                    <option value="family">Family Sponsorship</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                      color: "var(--text-light)",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  style={{
                    backgroundColor: "var(--primary-purple)",
                    color: "var(--text-light)",
                  }}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Client Policies Section */}
      <ClientPolicies />

      {/* Client Reputation Management System */}
      <ClientReputationManagement />

      {/* Client Communication Hub */}
      <ClientCommunicationHub />

      {/* Footer */}
      <footer
        className="border-t py-12"
        style={{
          borderColor: "var(--accent-purple-glow)",
          backgroundColor: "var(--background-card)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Globe
                  className="h-8 w-8"
                  style={{ color: "var(--primary-purple)" }}
                />
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--text-light)" }}
                >
                  LINAK Migration Service
                </span>
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                Expert migration services for global mobility
              </p>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-light)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  "Destinations",
                  "Services",
                  "Process",
                  "About",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--accent-purple-light)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-light)" }}
              >
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  "Visa Applications",
                  "Immigration Consulting",
                  "Relocation Support",
                  "Document Preparation",
                ].map((service) => (
                  <li key={service}>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-8 pt-8 border-t text-center"
            style={{ borderColor: "var(--accent-purple-glow)" }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              &copy; 2025 LINAK Migration Service LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-50"
          style={{
            backgroundColor: "var(--primary-purple)",
            color: "var(--text-light)",
          }}
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6 mx-auto" />
        </button>
      )}
    </div>
  );
}
