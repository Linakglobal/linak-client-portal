"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Award,
  Shield,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Eye,
  Crown,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const trustServices = [
  {
    title: "We're Still Here",
    description:
      "Even if others failed you, even if trust was broken — we are not giving up. LINAK is not disappearing. We are here for the long game.",
    gradient: "from-black via-slate-900 to-indigo-900",
    border: "border-purple-700",
    titleColor: "text-purple-400",
  },
  {
    title: "Miscommunication Ends Now",
    description:
      "Previous employees may have misled or ignored you — that ends today. We're building a system where every client is heard, respected, and updated clearly.",
    gradient: "from-black via-gray-900 to-purple-900",
    border: "border-pink-700",
    titleColor: "text-pink-400",
  },
  {
    title: "BELIEVE IN LINAK",
    description:
      "If you trusted us once — hold on. We promise to make things right. Your belief is not wasted. We're rebuilding everything with power and precision.",
    gradient: "from-black via-gray-900 to-blue-900",
    border: "border-indigo-700",
    titleColor: "text-indigo-400",
  },
];

const premiumFeatures = [
  {
    title: "24×7 Response Support",
    description: [
      "Dedicated real-time assistance",
      "Human support every hour",
      "No delays — no silence",
    ],
    gradient: "from-purple-900/50 via-purple-800/30 to-purple-900/50",
    glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.4)] border-purple-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:border-purple-400",
    titleColor: "text-purple-100",
    icon: Clock,
  },
  {
    title: "Live Mail & SMS Updates",
    description: [
      "Automatic email alerts",
      "Status notifications",
      "Stage-wise message updates",
    ],
    gradient: "from-blue-900/50 via-blue-800/30 to-blue-900/50",
    glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.4)] border-blue-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:border-blue-400",
    titleColor: "text-blue-100",
    icon: MessageSquare,
  },
  {
    title: "Program Stage Transparency",
    description: [
      "Know your exact file position",
      "View pending + completed stages",
      "Raise ticket if delay found",
    ],
    gradient: "from-pink-900/50 via-pink-800/30 to-pink-900/50",
    glowColor: "shadow-[0_0_30px_rgba(236,72,153,0.4)] border-pink-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:border-pink-400",
    titleColor: "text-pink-100",
    icon: Eye,
  },
  {
    title: "VIP Priority File Handling",
    description: [
      "Assigned expert consultant",
      "Weekly review by management",
      "Faster approval escalations",
    ],
    gradient: "from-green-900/50 via-green-800/30 to-green-900/50",
    glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.4)] border-green-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] hover:border-green-400",
    titleColor: "text-green-100",
    icon: Crown,
  },
  {
    title: "All Documents Accessible",
    description: [
      "Uploaded receipts + contracts",
      "Digital download anytime",
      "Secure cloud access",
    ],
    gradient: "from-yellow-900/50 via-yellow-800/30 to-yellow-900/50",
    glowColor: "shadow-[0_0_30px_rgba(234,179,8,0.4)] border-yellow-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:border-yellow-400",
    titleColor: "text-yellow-100",
    icon: FileText,
  },
  {
    title: "Custom Requests",
    description: [
      "Ask any clarification instantly",
      "Submit personal requirement",
      "Immediate human response",
    ],
    gradient: "from-cyan-900/50 via-cyan-800/30 to-cyan-900/50",
    glowColor: "shadow-[0_0_30px_rgba(6,182,212,0.4)] border-cyan-400/50",
    hoverGlow:
      "hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:border-cyan-400",
    titleColor: "text-cyan-100",
    icon: Settings,
  },
];

const stats = [
  { label: "Clients Helped So Far", value: "100+", icon: Users },
  { label: "Countries Supported", value: "50+", icon: Globe },
  { label: "Case Recovery Success Rate", value: "95%", icon: Award },
  { label: "Years of Industry Insight", value: "7+", icon: Shield },
];

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-velvet relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-royal opacity-10 animate-pulse-slow" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img
                src="/linak-logo-wings.svg"
                alt="LINAK"
                className="w-8 h-8 filter brightness-0 invert animate-glow"
              />
              <span className="text-xl font-bold text-gradient glow-text">
                LINAK
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button className="neon-button">Client Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-display-xl text-gradient-royal text-shadow-royal mb-6 tracking-ultra-tight">
              Your Immigration
              <br />
              <span className="text-accent animate-shimmer font-display">
                Journey Starts Here
              </span>
            </h1>
            <p className="text-body-xl text-muted-foreground max-w-3xl mx-auto leading-premium text-smooth">
              Expert immigration consulting services with cutting-edge
              technology and personalized solutions for your global mobility
              needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button className="neon-button text-lg px-8 py-4">
              Start Your Journey
            </Button>
            <Button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              We&apos;ve Already Made Progress
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here&apos;s what we&apos;ve achieved so far, and we&apos;re just
              getting started.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="tech-card p-6 text-center"
                >
                  <IconComponent className="w-8 h-8 text-accent mx-auto mb-3 animate-float" />
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-tech-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-center bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight mb-4">
              Our Vision — Built on Trust
            </h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto text-lg">
              We know your expectations. And we know your pain. But we
              haven&apos;t run — we&apos;re standing right here with you. Our
              mission is to make every promise right — no matter what happened
              before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {trustServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl ${service.border} bg-gradient-to-br ${service.gradient} p-6 text-white shadow-xl`}
              >
                <h3
                  className={`text-xl font-semibold ${service.titleColor} mb-2`}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Promise Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <p className="text-muted-foreground text-md max-w-2xl mx-auto italic">
              &ldquo;We&apos;ve heard the pain. We&apos;ve seen the messages. We
              don&apos;t hide from the truth. But the real truth is — we are
              still here. Building. Serving. Evolving.
              <br />
              <span className="text-white font-medium">
                Stay strong. Stay connected. Stay with LINAK.
              </span>
              &rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-6 md:px-10 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0014] via-[#0b0c1e] to-[#0a0014]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="text-center text-display-lg text-gradient-royal text-shadow-glow mb-6 tracking-tight">
            What You Now Get With LINAK
          </h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-body-lg mb-16 font-medium text-smooth leading-premium">
            Enhanced features. Real support. Transparent progress. Designed for
            trust.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`
                    relative backdrop-blur-xl bg-gradient-to-br ${feature.gradient} 
                    border-2 ${feature.glowColor} ${feature.hoverGlow}
                    rounded-2xl p-8 flex flex-col gap-6 
                    transition-all duration-500 ease-out
                    hover:scale-[1.03] hover:-translate-y-2
                    group cursor-pointer
                  `}
                >
                  {/* Icon with Glow */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold ${feature.titleColor} group-hover:text-white transition-colors duration-300 drop-shadow-md`}
                  >
                    {feature.title}
                  </h3>

                  {/* Features List */}
                  <div className="space-y-3">
                    {feature.description.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-white to-gray-300 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <p className="text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium mb-8">
              You asked for clarity. We built it. <br />
              <span className="text-white font-semibold">
                Experience LINAK like never before.
              </span>
            </p>

            <Link href="/login">
              <Button className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/20 backdrop-blur-sm hover:scale-110 transition-all duration-500 ease-out animate-pulse hover:animate-none shadow-lg">
                <span className="flex items-center gap-2">
                  View My Portal Now →
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="tech-card p-12"
          >
            <h2 className="text-4xl font-bold text-gradient glow-text mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful clients who have achieved their
              immigration dreams with our expert guidance and cutting-edge
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="neon-button text-lg px-8 py-4">
                  Access Client Portal
                </Button>
              </Link>
              <Button className="btn-secondary text-lg px-8 py-4">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-morphism border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <span className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@linak.com
            </span>
            <span className="text-muted-foreground flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (555) 123-4567
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 LINAK Immigration Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
