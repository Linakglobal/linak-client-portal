"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Upload,
  CheckCircle,
  Star,
  DollarSign,
  Target,
  ChevronRight,
  Gift,
  Zap,
  Ban,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  ParallaxSection,
  TiltCard,
} from "@/components/animations/AnimatedComponents";
import { getReportStats } from "@/lib/supabase/reports";
import DarkPageLayout from "@/components/layout/DarkPageLayout";

interface FormData {
  name: string;
  email: string;
  clientId: string;
  postLink: string;
  screenshot: File | null;
  explanation: string;
}

interface StatsData {
  totalReports: number;
  verifiedReports: number;
  totalRewardsDistributed: number;
  successRate: number;
}

const rewardPrograms = [
  {
    icon: Shield,
    title: "Report False Claims",
    description: "Help us identify and eliminate fraudulent immigration claims",
    reward: "₹5,000",
    color: "var(--success)",
    bgColor: "var(--background-card)",
  },
  {
    icon: Zap,
    title: "Fast Track Reports",
    description: "Priority processing for urgent defamation cases",
    reward: "₹3,000",
    color: "var(--accent-purple-light)",
    bgColor: "var(--background-card)",
  },
  {
    icon: Ban,
    title: "Prevent Scams",
    description: "Report suspicious immigration service providers",
    reward: "₹4,000",
    color: "var(--primary-purple)",
    bgColor: "var(--background-card)",
  },
];

const stats = [
  { label: "Reports Processed", value: "2,847", icon: CheckCircle },
  { label: "Rewards Distributed", value: "₹4.2L", icon: DollarSign },
  { label: "Success Rate", value: "94%", icon: Target },
  { label: "Flight Winners", value: "12", icon: Star },
];

export default function RewardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    clientId: "",
    postLink: "",
    screenshot: null,
    explanation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [realStats, setRealStats] = useState<StatsData | null>(null);

  // Load real stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/reports/stats");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setRealStats(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
        // Fallback to client-side stats if API fails
        const { data } = await getReportStats();
        if (data) {
          setRealStats(data);
        }
      }
    };
    loadStats();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, screenshot: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create FormData for API submission
      const apiFormData = new FormData();
      apiFormData.append("name", formData.name);
      apiFormData.append("email", formData.email);
      apiFormData.append("clientId", formData.clientId || formData.email);
      apiFormData.append("postLink", formData.postLink);
      apiFormData.append("explanation", formData.explanation);

      if (formData.screenshot) {
        apiFormData.append("screenshot", formData.screenshot);
      }

      // Submit to API route
      const response = await fetch("/api/reports/submit", {
        method: "POST",
        body: apiFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || "Failed to submit report");
        return;
      }

      // Show success message
      alert(
        `Report submitted successfully! Report ID: ${result.reportId}. Our team will review it within 24 hours and you'll receive email updates.`
      );
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        clientId: "",
        postLink: "",
        screenshot: null,
        explanation: "",
      });

      // Refresh stats
      try {
        const response = await fetch("/api/reports/stats");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setRealStats(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to refresh stats:", error);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setSubmitError(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use real stats if available, fallback to default stats
  const displayStats = realStats
    ? [
        {
          label: "Reports Processed",
          value: realStats.totalReports.toLocaleString(),
          icon: CheckCircle,
        },
        {
          label: "Rewards Distributed",
          value: `₹${(realStats.totalRewardsDistributed / 10000).toFixed(1)}L`,
          icon: DollarSign,
        },
        {
          label: "Success Rate",
          value: `${realStats.successRate}%`,
          icon: Target,
        },
        {
          label: "Flight Winners",
          value:
            realStats.verifiedReports > 100
              ? "12"
              : Math.floor(realStats.verifiedReports / 10).toString(),
          icon: Star,
        },
      ]
    : stats;

  return (
    <DarkPageLayout title="LINAK Global Rewards">
      {/* Dark Background Elements */}
      <ParallaxSection speed={0.3} className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600 to-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </ParallaxSection>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* LINAK Trust Badge */}
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="landing-card inline-flex items-center gap-3 backdrop-blur-sm px-6 py-3 text-sm">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold tracking-wider uppercase">
                  Global Migration Rewards Platform
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              </div>
            </AnimatedSection>

            {/* Enhanced LINAK Title */}
            <AnimatedSection animation="fade-up" delay={0.2}>
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="landing-text-gradient">
                    LINAK GLOBAL REWARDS
                  </span>
                </h1>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.4}>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 font-light">
                Report fraud • Earn rewards • Protect the community
              </p>
              <div className="mt-4 flex justify-center">
                <div className="text-sm text-blue-400 font-mono bg-black/50 px-4 py-2 rounded border border-blue-400/30">
                  [SYSTEM STATUS: ACTIVE] • [REPORTS VERIFIED: 2,847] • [SUCCESS
                  RATE: 94%]
                </div>
              </div>
            </AnimatedSection>

            {/* Cyber CTA Button */}
            <AnimatedSection animation="fade-up" delay={0.6}>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <button className="neon-button cyber-pulse group relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">INITIATE THREAT REPORT</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                </DialogTrigger>
              </Dialog>

              {/* Secondary Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Real-time processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span>AI verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span>Instant rewards</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI-Enhanced Cyber Security Stats */}
      <AnimatedSection animation="fade-up" delay={0}>
        <section className="py-20 relative overflow-hidden matrix-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Cyber Section Header */}
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 relative cyber-glow">
                  <span className="text-cyan-400">THREAT ANALYTICS</span>
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 rounded-lg opacity-30 blur-2xl cyber-pulse"></div>
                </h2>
              </div>
              <p className="text-lg max-w-2xl mx-auto text-gray-300 font-mono">
                AI-powered real-time security metrics • Live threat detection •
                Quantum processing
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 bg-black/50 px-4 py-2 rounded border border-cyan-400/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-mono">NEURAL NETWORK: ONLINE</span>
              </div>
            </div>

            {/* Cyber Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <AnimatedSection
                    key={stat.label}
                    animation="fade-up"
                    delay={index * 0.1}
                  >
                    <TiltCard className="text-center group">
                      <div
                        className="relative rounded-xl border p-8 h-full overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                        style={{
                          backgroundColor: "var(--background-card)",
                          borderColor: "var(--accent-purple-glow)",
                        }}
                      >
                        {/* Floating Background Elements */}
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-float"></div>
                        <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-float-delayed"></div>

                        {/* Icon with Enhanced Effects */}
                        <div className="relative mb-6">
                          <div className="relative inline-block">
                            <IconComponent
                              className="h-12 w-12 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                              style={{ color: "var(--primary-purple)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                          </div>
                        </div>

                        {/* Enhanced Value Display */}
                        <div className="relative mb-4">
                          <div
                            className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-500 group-hover:scale-110"
                            style={{
                              color: "var(--text-light)",
                              textShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                            }}
                          >
                            {stat.value}
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-3">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                              style={{
                                width: (() => {
                                  switch (index) {
                                    case 0:
                                      return "85%";
                                    case 1:
                                      return "92%";
                                    case 2:
                                      return "94%";
                                    default:
                                      return "78%";
                                  }
                                })(),
                                animation: `expand-${index} 2s ease-out`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Enhanced Label */}
                        <div
                          className="text-sm font-medium transition-colors duration-500 group-hover:text-purple-300"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {stat.label}
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    </TiltCard>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Additional Visual Enhancement - Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`floating-particle-${i}`}
                  className={`absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-float-particles`}
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 30}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Lucky Draw & Flight Tickets Section */}
      <AnimatedSection animation="fade-up" delay={0.1}>
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="relative inline-block mb-4">
                <h2
                  className="text-3xl md:text-4xl font-bold relative"
                  style={{ color: "var(--text-light)" }}
                >
                  🎰 Lucky Draw Program
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg opacity-20 blur-2xl animate-pulse"></div>
                </h2>
              </div>
              <p
                className="text-lg max-w-3xl mx-auto mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                Every verified report enters you into our monthly lottery! Win
                amazing prizes including flight tickets, cash rewards, and
                exclusive benefits.
              </p>
            </div>

            {/* Lottery Prizes Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Flight Tickets Prize */}
              <TiltCard className="group">
                <div
                  className="relative rounded-xl border p-8 h-full overflow-hidden transition-all duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--background-card)",
                    borderColor: "var(--accent-purple-glow)",
                  }}
                >
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-float"></div>

                  <div className="text-center">
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="text-6xl mb-4">✈️</div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "var(--text-light)" }}
                    >
                      Flight Tickets
                    </h3>

                    <p
                      className="text-lg mb-4"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Win round-trip tickets to popular destinations
                    </p>

                    <div
                      className="text-3xl font-bold mb-4"
                      style={{
                        color: "var(--primary-purple)",
                        textShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                      }}
                    >
                      2 Winners/Month
                    </div>

                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Cash Prize */}
              <TiltCard className="group">
                <div
                  className="relative rounded-xl border p-8 h-full overflow-hidden transition-all duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--background-card)",
                    borderColor: "var(--accent-purple-glow)",
                  }}
                >
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-float-delayed"></div>

                  <div className="text-center">
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="text-6xl mb-4">💰</div>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "var(--text-light)" }}
                    >
                      Cash Rewards
                    </h3>

                    <p
                      className="text-lg mb-4"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Special bonus cash prizes for lucky participants
                    </p>

                    <div
                      className="text-3xl font-bold mb-4"
                      style={{
                        color: "var(--primary-purple)",
                        textShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                      }}
                    >
                      ₹50,000
                    </div>

                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-4/5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* VIP Benefits */}
              <TiltCard className="group">
                <div
                  className="relative rounded-xl border p-8 h-full overflow-hidden transition-all duration-500 group-hover:scale-105"
                  style={{
                    backgroundColor: "var(--background-card)",
                    borderColor: "var(--accent-purple-glow)",
                  }}
                >
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-float"></div>

                  <div className="text-center">
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <div className="text-6xl mb-4">👑</div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "var(--text-light)" }}
                    >
                      VIP Benefits
                    </h3>

                    <p
                      className="text-lg mb-4"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Exclusive access & priority support services
                    </p>

                    <div
                      className="text-3xl font-bold mb-4"
                      style={{
                        color: "var(--primary-purple)",
                        textShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                      }}
                    >
                      5 Winners/Month
                    </div>

                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* How to Enter Section */}
            <div
              className="text-center p-8 rounded-2xl border"
              style={{
                backgroundColor: "var(--background-card)",
                borderColor: "var(--accent-purple-glow)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--text-light)" }}
              >
                🎲 How to Enter the Lucky Draw
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Submit Report
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Submit any verified defamation report
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Get Verified
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Wait for admin verification process
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "var(--text-light)" }}
                  >
                    Enter Lottery
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Automatic entry into monthly draw
                  </p>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-lg"
                style={{ backgroundColor: "rgba(142, 68, 173, 0.1)" }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--accent-purple-light)" }}
                >
                  💡 Pro Tip: More verified reports = More chances to win! Each
                  report gives you one lottery entry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Reward Programs Section */}
      <AnimatedSection animation="fade-up" delay={0.2}>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-light)" }}
              >
                Reward Programs
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Choose from our comprehensive reward programs and help maintain
                integrity in immigration services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {rewardPrograms.map((program) => {
                const IconComponent = program.icon;
                return (
                  <TiltCard key={program.title}>
                    <Card
                      className="h-full border"
                      style={{
                        backgroundColor: program.bgColor,
                        borderColor: "var(--accent-purple-glow)",
                      }}
                    >
                      <CardHeader className="text-center pb-4">
                        <div
                          className="mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center"
                          style={{
                            backgroundColor: "var(--accent-purple-glow)",
                          }}
                        >
                          <IconComponent
                            className="h-8 w-8"
                            style={{ color: program.color }}
                          />
                        </div>
                        <CardTitle style={{ color: "var(--text-light)" }}>
                          {program.title}
                        </CardTitle>
                        <CardDescription style={{ color: "var(--text-muted)" }}>
                          {program.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div
                          className="text-2xl font-bold mb-4"
                          style={{ color: program.color }}
                        >
                          {program.reward}
                        </div>
                        <Badge
                          variant="outline"
                          className="px-3 py-1"
                          style={{
                            borderColor: "var(--accent-purple-glow)",
                            color: "var(--accent-purple-light)",
                          }}
                        >
                          Per Verified Report
                        </Badge>
                      </CardContent>
                    </Card>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection animation="fade-up" delay={0.4}>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-light)" }}
              >
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: "var(--success)",
                      color: "var(--text-light)",
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--text-light)" }}
                    >
                      Submit Your Report
                    </h3>
                    <p style={{ color: "var(--text-muted)" }}>
                      Provide detailed information about fraudulent claims or
                      suspicious activities
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: "var(--primary-purple)",
                      color: "var(--text-light)",
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--text-light)" }}
                    >
                      Verification Process
                    </h3>
                    <p style={{ color: "var(--text-muted)" }}>
                      Our expert team reviews and verifies your report within
                      24-48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: "var(--accent-purple-light)",
                      color: "var(--text-light)",
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--text-light)" }}
                    >
                      Receive Your Reward
                    </h3>
                    <p style={{ color: "var(--text-muted)" }}>
                      Get your reward transferred directly to your bank account
                      upon verification
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    24/7 Support Available
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    Secure & Confidential Process
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle
                    className="h-6 w-6"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    Fast Payment Processing
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <XCircle className="h-6 w-6 text-red-400" />
                  <span style={{ color: "var(--text-muted)" }}>
                    No False Reports Accepted
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Gift
                    className="h-6 w-6"
                    style={{ color: "var(--accent-purple-light)" }}
                  />
                  <span style={{ color: "var(--text-light)" }}>
                    Bonus Rewards for Quality Reports
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fade-up" delay={0.6}>
        <section
          className="py-16 border-t"
          style={{ borderColor: "var(--accent-purple-glow)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--text-light)" }}
            >
              Ready to Make a Difference?
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
              Join our community of responsible reporters and help maintain
              integrity in immigration services
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="text-lg px-8 py-4"
                  style={{
                    backgroundColor: "var(--success)",
                    color: "var(--text-light)",
                  }}
                >
                  Submit Your First Report
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </section>
      </AnimatedSection>

      {/* Report Submission Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{
            backgroundColor: "var(--background-card)",
            borderColor: "var(--accent-purple-glow)",
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: "var(--text-light)" }}>
              Submit Defamation Report
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
                {submitError}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" style={{ color: "var(--text-light)" }}>
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="mt-1"
                  style={{
                    backgroundColor: "var(--background-secondary)",
                    borderColor: "var(--accent-purple-glow)",
                    color: "var(--text-light)",
                  }}
                />
              </div>
              <div>
                <Label htmlFor="email" style={{ color: "var(--text-light)" }}>
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                  style={{
                    backgroundColor: "var(--background-secondary)",
                    borderColor: "var(--accent-purple-glow)",
                    color: "var(--text-light)",
                  }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientId" style={{ color: "var(--text-light)" }}>
                Client ID
              </Label>
              <Input
                id="clientId"
                value={formData.clientId}
                onChange={(e) => handleInputChange("clientId", e.target.value)}
                className="mt-1"
                style={{
                  backgroundColor: "var(--background-secondary)",
                  borderColor: "var(--accent-purple-glow)",
                  color: "var(--text-light)",
                }}
              />
            </div>

            <div>
              <Label htmlFor="postLink" style={{ color: "var(--text-light)" }}>
                Post/Content Link *
              </Label>
              <Input
                id="postLink"
                type="url"
                value={formData.postLink}
                onChange={(e) => handleInputChange("postLink", e.target.value)}
                required
                className="mt-1"
                style={{
                  backgroundColor: "var(--background-secondary)",
                  borderColor: "var(--accent-purple-glow)",
                  color: "var(--text-light)",
                }}
              />
            </div>

            <div>
              <Label
                htmlFor="screenshot"
                style={{ color: "var(--text-light)" }}
              >
                Screenshot Evidence
              </Label>
              <div className="mt-1 flex items-center space-x-4">
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium"
                  style={{
                    backgroundColor: "var(--background-secondary)",
                    borderColor: "var(--accent-purple-glow)",
                    color: "var(--text-light)",
                  }}
                />
                <Upload
                  className="h-5 w-5"
                  style={{ color: "var(--text-muted)" }}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="explanation"
                style={{ color: "var(--text-light)" }}
              >
                Detailed Explanation *
              </Label>
              <Textarea
                id="explanation"
                value={formData.explanation}
                onChange={(e) =>
                  handleInputChange("explanation", e.target.value)
                }
                required
                rows={5}
                placeholder="Please provide a detailed explanation of the defamatory content and its impact..."
                className="mt-1"
                style={{
                  backgroundColor: "var(--background-secondary)",
                  borderColor: "var(--accent-purple-glow)",
                  color: "var(--text-light)",
                }}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                style={{
                  borderColor: "var(--accent-purple-glow)",
                  color: "var(--text-muted)",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "var(--primary-purple)",
                  color: "var(--text-light)",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DarkPageLayout>
  );
}
