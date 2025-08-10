"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Users,
  Award,
  Shield,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";
import { ImmigrationIconSet } from "@/components/icons/ImmigrationIcons";
import { RefundAlternativesSection } from "@/components/sections/RefundAlternativesSection";
import Image from "next/image";

const countries = [
  {
    name: "United States",
    flag: "🇺🇸",
    description:
      "Leading destination for global talent and business opportunities",
    visaTypes: ["H-1B", "L-1", "EB-5", "O-1"],
    icon: ImmigrationIconSet.NewHome,
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    description:
      "Express Entry, Provincial Nominee Programs, and family sponsorship",
    visaTypes: ["Express Entry", "PNP", "Family Sponsorship"],
    icon: ImmigrationIconSet.Family,
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    description: "Points-based immigration system with excellent opportunities",
    visaTypes: ["Skilled Independent", "Employer Sponsored", "Business"],
    icon: ImmigrationIconSet.Travel,
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "Post-Brexit immigration pathways and global talent visas",
    visaTypes: ["Global Talent", "Skilled Worker", "Investor"],
    icon: ImmigrationIconSet.Language,
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    description: "EU Blue Card and skilled worker opportunities",
    visaTypes: ["EU Blue Card", "Job Seeker", "Skilled Worker"],
    icon: ImmigrationIconSet.Paperwork,
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    description: "Gateway to Asia with excellent business opportunities",
    visaTypes: ["Employment Pass", "Tech.Pass", "Investor"],
    icon: ImmigrationIconSet.Community,
  },
];

const services = [
  {
    icon: ImmigrationIconSet.Paperwork,
    title: "Visa & Immigration Consulting",
    description: "Expert guidance through complex immigration processes",
    features: ["Document Preparation", "Application Filing", "Status Tracking"],
    badge: "Special Offers",
    isNew: false,
  },
  {
    icon: ImmigrationIconSet.Language,
    title: "Global Relocation Services",
    description: "Comprehensive support for your international move",
    features: [
      "Housing Assistance",
      "School Enrollment",
      "Cultural Integration",
    ],
    badge: null,
    isNew: true,
  },
  {
    icon: ImmigrationIconSet.Community,
    title: "Business Immigration",
    description: "Specialized services for entrepreneurs and investors",
    features: ["Investment Visas", "Startup Programs", "Business Setup"],
    badge: null,
    isNew: false,
  },
  {
    icon: ImmigrationIconSet.Travel,
    title: "Corporate Solutions",
    description: "Enterprise-level immigration support for businesses",
    features: [
      "Employee Transfers",
      "Compliance Management",
      "Global Mobility",
    ],
    badge: "Upgraded",
    isNew: false,
  },
];

const exclusiveBenefits = [
  {
    icon: Shield,
    title: "Free Country Eligibility Check",
    description: "Complimentary assessment",
  },
  {
    icon: Users,
    title: "Priority Appointment Booking",
    description: "Skip the waiting list",
  },
  {
    icon: Globe,
    title: "AI-Powered Case Tracking",
    description: "Real-time updates",
  },
  {
    icon: Award,
    title: "Referral Rewards Program",
    description: "Earn while you refer",
  },
  {
    icon: MapPin,
    title: "Monthly Lucky Draw",
    description: "Service discounts",
  },
];

const upcomingCountries = [
  "Japan 🇯🇵",
  "Canada 🇨🇦",
  "Germany 🇩🇪",
  "Italy 🇮🇹",
  "France 🇫🇷",
  "Netherlands 🇳🇱",
  "Switzerland 🇨🇭",
  "New Zealand 🇳🇿",
  "Sweden 🇸🇪",
  "Norway 🇳🇴",
];

export default function HomePage() {
  return (
    <ImmigrationPageWrapper>
      <div className="relative">
        {/* Hero Section with Dark Theme */}
        <section className="landing-hero-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl shadow-2xl shadow-blue-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center p-4">
                <Image
                  src="/linak-logo-wings.svg"
                  alt="LINAK"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain filter brightness-0 invert"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2ZjQyYzEiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNmY0MmMxIiBvcGFjaXR5PSIwLjYiIHJ4PSI0Ii8+PC9zdmc+"
                  priority
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="landing-text-gradient">
                LINAK Global Migration
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Your trusted partner for global immigration solutions. Navigate
              complex immigration processes with confidence and expert guidance
              to your new future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button className="landing-button-primary px-12 py-6 text-xl">
                <Globe size={28} className="mr-3" />
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Link href="/login">
                <Button className="landing-button-secondary px-12 py-6 text-xl">
                  <Shield size={28} className="mr-3" />
                  Client Portal
                </Button>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="landing-stats-card text-center">
                <div className="text-4xl font-bold text-white mb-2">15K+</div>
                <div className="text-blue-200 text-lg">Successful Cases</div>
              </div>
              <div className="landing-stats-card text-center">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-200 text-lg">Countries Served</div>
              </div>
              <div className="landing-stats-card text-center">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-red-200 text-lg">Success Rate</div>
              </div>
              <div className="landing-stats-card text-center">
                <div className="text-4xl font-bold text-white mb-2">20+</div>
                <div className="text-red-200 text-lg">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="landing-section-bg py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Global Destinations
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                We help you navigate immigration to the world's most desirable
                destinations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="landing-card h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <span className="text-6xl mr-4">{country.flag}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {country.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-blue-200 mb-6 leading-relaxed">
                        {country.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white mb-3">
                          Popular Visa Types:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {country.visaTypes.map((visa) => (
                            <span
                              key={visa}
                              className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30"
                            >
                              {visa}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Luxury Services Section */}
        <section className="landing-section-bg py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Our Services
              </h2>
              <p className="text-2xl text-blue-200 mb-4 font-medium">
                Because you deserve a migration experience that's different.
              </p>
              <p className="text-sm text-gray-400 italic">
                Unlock exclusive benefits, world-first offers, and surprises —
                only at LINAK.
              </p>
            </motion.div>

            {/* Luxury Animated Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 4 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="relative group"
                  >
                    {/* Special Offers Badge */}
                    {service.badge && (
                      <div className="absolute -top-2 -left-2 z-20">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                          {service.badge}
                        </div>
                      </div>
                    )}

                    {/* New Badge */}
                    {service.isNew && (
                      <div className="absolute -top-2 -right-2 z-20">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          New
                        </div>
                      </div>
                    )}

                    <Card className="futuristic-card h-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:via-pink-500/50 group-hover:to-blue-500/50">
                      {/* Glowing border effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start space-x-4 mb-6">
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30"
                            whileHover={{
                              rotate: 360,
                              scale: 1.1,
                              transition: { duration: 0.6, ease: "easeInOut" },
                            }}
                          >
                            <IconComponent size={32} className="text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                              {service.title}
                            </h3>
                            <p className="text-purple-200 leading-relaxed group-hover:text-purple-100 transition-colors duration-300">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div
                              key={feature}
                              className="flex items-center space-x-3"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: featureIndex * 0.1,
                              }}
                            >
                              <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-pink-400 transition-colors duration-300"></div>
                              <span className="text-purple-100 group-hover:text-white transition-colors duration-300">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Coming Soon Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative group"
              >
                {/* Stay Tuned Ribbon */}
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    Stay Tuned
                  </div>
                </div>

                <Card className="futuristic-card h-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-gray-500/30 transition-all duration-500 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-gray-800/50 group-hover:via-gray-900/50 group-hover:to-black/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 via-gray-900/10 to-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  <CardContent className="p-8 relative z-10">
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-lg shadow-gray-500/30 mx-auto mb-6"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 2, repeat: Infinity },
                        }}
                      >
                        <Globe size={32} className="text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-4">
                        New Countries & Special Programs
                      </h3>
                      <p className="text-purple-200 mb-6 leading-relaxed">
                        We're expanding to more countries and launching
                        exclusive offers. Stay tuned for surprise benefits!
                      </p>

                      {/* Animated Rolling Countries */}
                      <div className="bg-black/20 rounded-lg p-4 mb-6 overflow-hidden">
                        <motion.div
                          animate={{ x: [0, -200] }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="flex space-x-6 text-sm text-purple-200 whitespace-nowrap"
                        >
                          {upcomingCountries.map((country) => (
                            <span key={country} className="font-medium">
                              {country}
                            </span>
                          ))}
                          {upcomingCountries.map((country) => (
                            <span
                              key={`repeat-${country}`}
                              className="font-medium"
                            >
                              {country}
                            </span>
                          ))}
                        </motion.div>
                      </div>

                      <Button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:shadow-gray-500/30 transition-all duration-300">
                        <Mail size={20} className="mr-2" />
                        Notify Me
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Exclusive Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <Card className="futuristic-card bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-pink-900/50 border-2 border-purple-500/30">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-white text-center mb-8">
                    🎯 Exclusive Benefits Only at LINAK
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {exclusiveBenefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-center group cursor-pointer"
                        >
                          <motion.div
                            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent size={20} className="text-white" />
                          </motion.div>
                          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-purple-200 transition-colors duration-300">
                            {benefit.title}
                          </h4>
                          <p className="text-xs text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                            {benefit.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* VIP Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-purple-300 text-sm mb-4 italic">
                💎 Check back regularly — we launch new programs every month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="neon-border text-white hover:bg-purple-500/20 px-6 py-3"
                >
                  <Phone size={18} className="mr-2" />
                  Be the first to know about new offers!
                </Button>
                <Button className="tech-button px-6 py-3">
                  <Mail size={18} className="mr-2" />
                  Subscribe to VIP Updates
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Refund/Alternatives Section - Ultra Premium */}
        <RefundAlternativesSection />

        {/* Contact Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Begin?
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
                Schedule a consultation with our immigration experts and take
                the first step towards your new future.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button size="lg" className="tech-button px-12 py-6 text-xl">
                  <Phone size={28} className="mr-3" />
                  Book Consultation
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="neon-border px-12 py-6 text-xl text-white hover:bg-purple-500/20"
                >
                  <Mail size={28} className="mr-3" />
                  Contact Us
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="futuristic-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Global Offices
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Offices in 15+ countries to serve you locally
                    </p>
                  </CardContent>
                </Card>
                <Card className="futuristic-card">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Expert Team
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Licensed immigration lawyers and consultants
                    </p>
                  </CardContent>
                </Card>
                <Card className="futuristic-card">
                  <CardContent className="p-6 text-center">
                    <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Proven Results
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Industry-leading success rates and client satisfaction
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ImmigrationPageWrapper>
  );
}
