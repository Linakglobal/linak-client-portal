"use client";

import { motion } from "framer-motion";
import { Globe, Users, Award, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const publicServices = [
  {
    icon: Globe,
    title: "Immigration Consultation",
    description: "Expert guidance for your migration journey",
  },
  {
    icon: Shield,
    title: "Visa Processing",
    description: "Professional assistance with visa applications",
  },
  {
    icon: Users,
    title: "Family Reunification",
    description: "Helping families stay together globally",
  },
  {
    icon: Award,
    title: "Corporate Immigration",
    description: "Enterprise solutions for global mobility",
  },
];

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
              <Image
                src="/linak-logo-wings.svg"
                alt="LINAK"
                width={32}
                height={32}
                className="filter brightness-0 invert animate-glow"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2ZjQyYzEiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNmY0MmMxIiBvcGFjaXR5PSIwLjYiIHJ4PSI0Ii8+PC9zdmc+"
                priority
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
            <h1 className="text-5xl md:text-7xl font-bold text-gradient glow-text mb-6">
              Your Immigration
              <br />
              <span className="text-accent animate-shimmer">
                Journey Starts Here
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
              We've Already Made Progress
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's what we've achieved so far, and we're just getting started.
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
              We know your expectations. And we know your pain. But we haven't
              run — we're standing right here with you. Our mission is to make
              every promise right — no matter what happened before.
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
              "We've heard the pain. We've seen the messages. We don't hide from
              the truth. But the real truth is — we are still here. Building.
              Serving. Evolving.
              <br />
              <span className="text-white font-medium">
                Stay strong. Stay connected. Stay with LINAK.
              </span>
              "
            </p>
          </motion.div>
        </div>
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
