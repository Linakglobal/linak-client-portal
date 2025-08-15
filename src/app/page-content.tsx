"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Award,
  Shield,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: Globe,
    title: "Global Immigration",
    description: "Expert guidance for your migration journey worldwide",
    color: "from-[#ff0080] to-[#8000ff]",
  },
  {
    icon: Shield,
    title: "Visa Processing",
    description: "Professional assistance with visa applications",
    color: "from-[#8000ff] to-[#00ffff]",
  },
  {
    icon: Users,
    title: "Family Reunification",
    description: "Helping families stay together across borders",
    color: "from-[#00ffff] to-[#ff0080]",
  },
  {
    icon: Award,
    title: "Corporate Solutions",
    description: "Enterprise immigration and global mobility",
    color: "from-[#ff0080] to-[#00ffff]",
  },
];

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0080]/10 to-[#00ffff]/10 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Image
              src="/linak-logo.svg"
              alt="LINAK"
              width={150}
              height={60}
              className="mx-auto mb-6"
            />
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#ff0080] via-[#8000ff] to-[#00ffff] bg-clip-text text-transparent">
            Your Gateway to Global Opportunities
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Premium immigration services with cutting-edge technology and
            personalized guidance
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#ff0080] to-[#8000ff] hover:from-[#8000ff] hover:to-[#00ffff] transition-all duration-300"
            >
              <Link href="/login">
                Client Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive immigration solutions powered by advanced technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-[#00ffff]/50 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 rounded-lg bg-gradient-to-r ${service.color} transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <service.icon className="h-12 w-12 text-[#00ffff] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-300 mb-8">
              Contact our expert team for personalized immigration guidance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-[#00ffff]">
                <Mail className="h-5 w-5" />
                <span>contact@linak.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#00ffff]">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
