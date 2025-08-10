"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

export function EnhancedHeroSection() {
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    status: string;
    flag: string;
  } | null>(null);

  const handleCountryClick = (country: {
    name: string;
    status: string;
    flag: string;
  }) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background-gradient)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/30 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-300/20 rounded-full animate-bounce delay-300" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1200" />
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-pink-300/20 rounded-full animate-bounce delay-800" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full border text-sm"
            style={{
              backgroundColor: "var(--background-card)",
              borderColor: "var(--accent-purple-glow)",
              color: "var(--accent-purple-light)",
            }}
          >
            <Shield className="w-4 h-4" />
            Trusted by 1000+ Global Clients
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to right, var(--text-light), var(--accent-purple-light))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                You Believed in Us.
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to right, var(--primary-purple), var(--accent-purple-light))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                We&apos;ll Never Let You Down.
              </span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Thank you for your trust. Every step you&apos;ve taken with LINAK
              matters deeply to us.
              <br className="hidden md:block" />
              We&apos;re committed — not just to results, but to{" "}
              <em
                className="font-medium"
                style={{ color: "var(--accent-purple-light)" }}
              >
                you
              </em>
              .
              <br className="hidden md:block" />
              Your journey, your dreams, and your trust are in the safest hands.
            </p>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="px-8 py-4 rounded-xl group transform hover:scale-105"
                  style={{
                    background: "var(--button-primary)",
                    color: "var(--text-light)",
                    boxShadow: "var(--shadow-soft)",
                    transition: "var(--transition-normal)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--button-hover)";
                    e.currentTarget.style.boxShadow = "var(--glow-effect)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--button-primary)";
                    e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                  }}
                >
                  Access Your Portal
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/destinations">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 rounded-xl group"
                  style={{
                    background: "rgba(39, 174, 96, 0.2)",
                    borderColor: "var(--success)",
                    color: "var(--success)",
                    transition: "var(--transition-normal)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--success)";
                    e.currentTarget.style.color = "var(--text-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(39, 174, 96, 0.2)";
                    e.currentTarget.style.color = "var(--success)";
                  }}
                >
                  🌏 Explore Global Opportunities
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 rounded-xl group"
                style={{
                  background: "var(--background-card)",
                  borderColor: "var(--accent-purple-light)",
                  color: "var(--text-light)",
                  transition: "var(--transition-normal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--accent-purple-light)";
                  e.currentTarget.style.color = "var(--text-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--background-card)";
                  e.currentTarget.style.color = "var(--text-light)";
                }}
              >
                View Dashboard
              </Button>
            </div>

            {/* Secondary Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative inline-flex items-center justify-center"
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full p-1 border border-white/10">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-6 py-3 flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">
                    Join Waitlist
                  </span>
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              {
                id: "years",
                icon: Award,
                number: "10+",
                text: "Years of Excellence",
                color: "text-yellow-400",
              },
              {
                id: "clients",
                icon: Users,
                number: "1000+",
                text: "Satisfied Clients",
                color: "text-blue-400",
              },
              {
                id: "retention",
                icon: Shield,
                number: "99%",
                text: "Client Retention",
                color: "text-green-400",
              },
            ].map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    0.8 +
                    ["years", "clients", "retention"].indexOf(stat.id) * 0.1,
                  duration: 0.6,
                }}
                className="bg-white/5 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer transform hover:scale-105"
              >
                <stat.icon
                  className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-300">{stat.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {[
              {
                id: "secure-access",
                title: "Secure Access",
                description: "Bank-level security for your peace of mind",
              },
              {
                id: "document-hub",
                title: "Document Hub",
                description: "All your important files in one place",
              },
              {
                id: "real-time",
                title: "Real-time Updates",
                description: "Stay informed with instant notifications",
              },
              {
                id: "support",
                title: "24/7 Support",
                description: "We're here whenever you need us",
              },
            ].map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay:
                    1.1 +
                    [
                      "secure-access",
                      "document-hub",
                      "real-time",
                      "support",
                    ].indexOf(feature.id) *
                      0.1,
                  duration: 0.6,
                }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Global Destinations Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-24 max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-4">
                🌍 Your Global Migration Opportunities
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Discover premium destinations with the highest success rates.
                Our expanding global network spans 12+ countries across 4
                continents with proven pathways to your dream life.
              </p>
            </div>

            {/* Premium Countries Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { flag: "🇨🇦", name: "Canada", rate: "97%", status: "active" },
                {
                  flag: "🇦🇺",
                  name: "Australia",
                  rate: "95%",
                  status: "active",
                },
                {
                  flag: "🇸🇬",
                  name: "Singapore",
                  rate: "92%",
                  status: "active",
                },
                { flag: "🇩🇪", name: "Germany", rate: "90%", status: "active" },
                { flag: "🇮🇹", name: "Italy", rate: "88%", status: "active" },
                {
                  flag: "🇪🇸",
                  name: "Spain",
                  rate: "Coming Soon",
                  status: "coming-soon",
                },
                { flag: "🇦🇲", name: "Armenia", rate: "85%", status: "active" },
                {
                  flag: "🇺🇸",
                  name: "USA",
                  rate: "Stay Tuned",
                  status: "stay-tuned",
                },
                {
                  flag: "🇳🇿",
                  name: "New Zealand",
                  rate: "Stay Tuned",
                  status: "stay-tuned",
                },
                {
                  flag: "🇬🇧",
                  name: "UK",
                  rate: "Coming Soon",
                  status: "coming-soon",
                },
                {
                  flag: "🇳🇴",
                  name: "Norway",
                  rate: "Stay Tuned",
                  status: "stay-tuned",
                },
                {
                  flag: "🇸🇪",
                  name: "Sweden",
                  rate: "Coming Soon",
                  status: "coming-soon",
                },
              ].map((country) => {
                const getCardStyle = () => {
                  if (country.status === "active") {
                    return "border-2 hover:shadow-lg";
                  }
                  if (country.status === "coming-soon") {
                    return "border-2 border-yellow-400/30 hover:border-yellow-400/60";
                  }
                  return "border-2 border-blue-400/30 hover:border-blue-400/60";
                };

                const getCardBackground = () => {
                  if (country.status === "active") {
                    return {
                      background: "var(--background-card)",
                      borderColor: "var(--accent-purple-glow)",
                    };
                  }
                  if (country.status === "coming-soon") {
                    return {
                      background: "rgba(243, 156, 18, 0.1)",
                      borderColor: "var(--warning)",
                    };
                  }
                  return {
                    background: "rgba(52, 152, 219, 0.1)",
                    borderColor: "var(--info)",
                  };
                };

                const getTitleColor = () => {
                  if (country.status === "active")
                    return { color: "var(--text-light)" };
                  if (country.status === "coming-soon")
                    return { color: "var(--warning)" };
                  return { color: "var(--info)" };
                };

                const getStatusIndicator = () => {
                  if (country.status === "active") {
                    return (
                      <>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-xs md:text-sm font-medium">
                          {country.rate} Success
                        </span>
                      </>
                    );
                  }
                  if (country.status === "coming-soon") {
                    return (
                      <>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span className="text-yellow-300 text-xs md:text-sm font-medium">
                          🚀 Coming Soon
                        </span>
                      </>
                    );
                  }
                  return (
                    <>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <span className="text-blue-300 text-xs md:text-sm font-medium">
                        ⏳ Stay Tuned
                      </span>
                    </>
                  );
                };

                return (
                  <motion.div
                    key={country.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay:
                        1.6 +
                        [
                          "Canada",
                          "Australia",
                          "Singapore",
                          "Germany",
                          "Italy",
                          "Spain",
                          "Armenia",
                          "USA",
                          "New Zealand",
                          "UK",
                          "Norway",
                          "Sweden",
                        ].indexOf(country.name) *
                          0.08,
                      duration: 0.5,
                    }}
                    className={`backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group cursor-pointer transform hover:scale-105 ${getCardStyle()}`}
                    style={getCardBackground()}
                    onClick={() => handleCountryClick(country)}
                  >
                    <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {country.flag}
                    </div>
                    <h3
                      className="font-semibold text-sm md:text-lg mb-2 transition-colors"
                      style={getTitleColor()}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--accent-purple-light)";
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, getTitleColor());
                      }}
                    >
                      {country.name}
                    </h3>
                    <div className="flex items-center gap-2 justify-center">
                      {getStatusIndicator()}
                    </div>

                    {/* Status Badge for Coming Soon/Stay Tuned */}
                    {country.status !== "active" && (
                      <div
                        className={`mt-2 text-xs px-2 py-1 rounded-full text-center ${
                          country.status === "coming-soon"
                            ? "bg-yellow-400/20 text-yellow-200 border border-yellow-400/30"
                            : "bg-blue-400/20 text-blue-200 border border-blue-400/30"
                        }`}
                      >
                        {country.status === "coming-soon"
                          ? "🎯 Q4 2025"
                          : "📅 2026"}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="text-center"
            >
              <Link href="/destinations">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl group transform hover:scale-105"
                >
                  🚀 Explore Interactive Global Map
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-slate-400 text-sm mt-3">
                Experience our advanced 3D visualization showing global
                migration networks
              </p>
            </motion.div>
          </motion.div>

          {/* Trusted Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mt-24 max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent mb-4">
                🤝 Trusted by Leading Organizations
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Partnered with global leaders to ensure your success. Our
                network includes top corporations, educational institutions, and
                government agencies.
              </p>
            </div>

            {/* Partner Companies Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
              {[
                { name: "Microsoft", logo: "🖥️", industry: "Technology" },
                { name: "Amazon", logo: "📦", industry: "E-commerce" },
                { name: "Google", logo: "🔍", industry: "Technology" },
                { name: "Apple", logo: "🍎", industry: "Technology" },
                { name: "Tesla", logo: "⚡", industry: "Automotive" },
                { name: "Meta", logo: "📘", industry: "Social Media" },
                { name: "Netflix", logo: "🎬", industry: "Entertainment" },
                { name: "Spotify", logo: "🎵", industry: "Music Streaming" },
                { name: "Uber", logo: "🚗", industry: "Transportation" },
                { name: "Airbnb", logo: "🏠", industry: "Hospitality" },
                { name: "Shopify", logo: "🛍️", industry: "E-commerce" },
                { name: "Zoom", logo: "💻", industry: "Communications" },
              ].map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 2.5 + index * 0.05,
                    duration: 0.4,
                  }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group cursor-pointer transform hover:scale-105 text-center"
                >
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-yellow-300 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-slate-400 text-xs">{partner.industry}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                <Star className="inline w-4 h-4 text-yellow-400 mr-1" />
                Join professionals from these leading companies who chose LINAK
                for their global migration journey
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Country Interest Modal */}
      {selectedCountry && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15, 8, 24, 0.9)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="rounded-2xl p-8 max-w-md w-full border"
            style={{
              background: "var(--background-gradient)",
              borderColor: "var(--accent-purple-glow)",
              boxShadow: "var(--glow-effect)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-light)" }}
                >
                  {selectedCountry.name}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {selectedCountry.status === "active" ? (
              /* Active Country Modal */
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
                  <h4 className="text-green-300 font-semibold mb-2">
                    🎯 Are you interested in taking the next steps?
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Ready to start your migration journey to{" "}
                    {selectedCountry.name}? Let's make it happen!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                  <h4 className="text-purple-300 font-semibold mb-2">
                    💰 Worried about pricing?
                  </h4>
                  <p className="text-slate-300 text-sm mb-2">
                    Don't worry! As our valued client, you get:
                  </p>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• 🏆 Priority processing for existing clients</li>
                    <li>• 💎 Exclusive discounted rates</li>
                    <li>• 🎁 Complimentary consultation sessions</li>
                    <li>• 📋 Free document verification</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30">
                  <h4 className="text-blue-300 font-semibold mb-2">
                    ⚡ Don't wait for the next step!
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Enroll today and secure your slot. Limited spots available
                    for priority processing.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Input
                    placeholder="Phone Number"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Textarea
                    placeholder="Tell us about your migration goals..."
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    🚀 Enroll Now - Get Priority Slot!
                  </Button>
                  <p className="text-center text-slate-400 text-xs">
                    Contact:{" "}
                    <a
                      href="mailto:support@linakglobal.com"
                      className="text-blue-400 hover:underline"
                    >
                      support@linakglobal.com
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              /* Coming Soon / Stay Tuned Modal */
              <div className="space-y-6">
                <div
                  className={`rounded-xl p-4 border ${
                    selectedCountry.status === "coming-soon"
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30"
                      : "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-2 ${
                      selectedCountry.status === "coming-soon"
                        ? "text-yellow-300"
                        : "text-blue-300"
                    }`}
                  >
                    {selectedCountry.status === "coming-soon"
                      ? "🚀 Coming Soon!"
                      : "⏳ Stay Tuned!"}
                  </h4>
                  <p className="text-slate-300 text-sm">
                    We're working hard to launch our {selectedCountry.name}{" "}
                    programs.
                    {selectedCountry.status === "coming-soon"
                      ? " Expected launch: Q4 2025"
                      : " Expected launch: 2026"}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                  <h4 className="text-purple-300 font-semibold mb-2">
                    📋 Join our Wishlist!
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Be the first to know when {selectedCountry.name} programs
                    launch. Get early bird discounts and priority access!
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Input
                    placeholder="Phone Number"
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Textarea
                    placeholder={`Why are you interested in migrating to ${selectedCountry.name}?`}
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    className={`w-full ${
                      selectedCountry.status === "coming-soon"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    }`}
                  >
                    {selectedCountry.status === "coming-soon"
                      ? "🎯 Join Wishlist - Q4 2025"
                      : "📅 Join Waitlist - 2026"}
                  </Button>
                  <p className="text-center text-slate-400 text-xs">
                    Questions? Contact:{" "}
                    <a
                      href="mailto:support@linakglobal.com"
                      className="text-blue-400 hover:underline"
                    >
                      support@linakglobal.com
                    </a>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </section>
  );
}

export default EnhancedHeroSection;
