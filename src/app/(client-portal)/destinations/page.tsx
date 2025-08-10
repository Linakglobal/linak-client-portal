"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Globe,
  Star,
  Users,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
} from "lucide-react";
import MolecularNetworkVisualization from "@/components/3d/MolecularNetworkVisualization";
import Advanced3DBackground from "@/components/3d/Advanced3DBackground";

// Country data with success programs
const countries = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Premium PR & Work Programs - Highest Success Rate",
    programs: [
      "Express Entry PR",
      "PNP Programs",
      "Work Permits",
      "Study Permits",
    ],
    successRate: "97%",
    clientsPlaced: "250+",
    avgSalary: "CAD 65,000+",
    processingTime: "8-14 months",
    currentOffer: "Free IELTS prep with PR applications",
    highlights: [
      "No job offer required for PR",
      "Free healthcare",
      "Path to citizenship in 3 years",
    ],
    testimonial: "Got my Canada PR in 11 months with LINAK. Amazing support!",
    clientName: "Rajesh K., Software Engineer",
    bgGradient: "from-red-500/20 to-white/20",
    isPopular: true,
    status: "High Demand - Book Now",
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Skilled Migration & Work Visas - Fast Processing",
    programs: [
      "Skilled Independent",
      "State Nomination",
      "Work Visas",
      "Partner Visas",
    ],
    successRate: "94%",
    clientsPlaced: "180+",
    avgSalary: "AUD 70,000+",
    processingTime: "10-16 months",
    currentOffer: "Skill assessment fee waived this month",
    highlights: [
      "Points-based system",
      "High quality of life",
      "Strong job market",
    ],
    testimonial:
      "Living my dream in Melbourne thanks to LINAK's expert guidance!",
    clientName: "Priya S., Healthcare Professional",
    bgGradient: "from-green-500/20 to-yellow-500/20",
    isPopular: true,
    status: "Fast Track Available",
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    tagline: "Work Permits & PR - Gateway to Asia",
    programs: ["Employment Pass", "S Pass", "Tech.Pass", "PR Applications"],
    successRate: "91%",
    clientsPlaced: "120+",
    avgSalary: "SGD 55,000+",
    processingTime: "3-6 months",
    currentOffer: "Job placement guarantee with work permit",
    highlights: [
      "No income tax for first 3 years",
      "Strategic Asian location",
      "English speaking",
    ],
    testimonial: "Singapore work permit approved in just 4 months!",
    clientName: "Amit M., Finance Manager",
    bgGradient: "from-red-600/20 to-white/20",
    isPopular: false,
    status: "Limited Slots - Apply Soon",
  },
  {
    id: "hungary",
    name: "Hungary",
    flag: "🇭🇺",
    tagline: "Factory & Industrial Work - Low Rejection Rate",
    programs: [
      "Work Permit + VFS",
      "Factory Jobs",
      "Warehouse Work",
      "Agriculture",
    ],
    successRate: "92%",
    clientsPlaced: "150+",
    avgSalary: "EUR 18,000+",
    processingTime: "2-4 months",
    currentOffer: "Easier embassy process than Poland/Czech",
    highlights: [
      "Low living costs",
      "Easy settlement process",
      "Rising demand for Indian labor",
    ],
    testimonial: "Hungary work permit approved faster than expected!",
    clientName: "Suresh P., Factory Worker",
    bgGradient: "from-green-600/20 to-red-600/20",
    isPopular: true,
    status: "High Approval Rate",
  },
  {
    id: "lithuania",
    name: "Lithuania",
    flag: "🇱🇹",
    tagline: "Warehouse & Packaging Work - Less Saturated Market",
    programs: ["Work Visa", "Warehouse Jobs", "Packaging Work", "Caregiving"],
    successRate: "89%",
    clientsPlaced: "85+",
    avgSalary: "EUR 16,000+",
    processingTime: "3-5 months",
    currentOffer: "Fewer embassy queues, faster processing",
    highlights: [
      "Lesser known destination",
      "Rising EU outsourcing hub",
      "Smooth embassy process",
    ],
    testimonial: "Lithuania opened new opportunities for me!",
    clientName: "Ravi K., Warehouse Supervisor",
    bgGradient: "from-yellow-600/20 to-green-600/20",
    isPopular: false,
    status: "Emerging Destination",
  },
  {
    id: "croatia",
    name: "Croatia",
    flag: "🇭🇷",
    tagline: "Tourism & Construction Work - EU Member Benefits",
    programs: [
      "Work Visa + VFS",
      "Tourism Jobs",
      "Construction Work",
      "Farm Workers",
    ],
    successRate: "87%",
    clientsPlaced: "70+",
    avgSalary: "EUR 20,000+",
    processingTime: "4-6 months",
    currentOffer: "Non-Schengen but EU benefits",
    highlights: [
      "Easier bilateral ties with India",
      "Lower rejection rates",
      "Beautiful Mediterranean coast",
    ],
    testimonial: "Croatia work visa approved! Beautiful country to work in.",
    clientName: "Marko S., Construction Worker",
    bgGradient: "from-blue-600/20 to-red-600/20",
    isPopular: false,
    status: "EU Member - Non Schengen",
  },
  {
    id: "romania",
    name: "Romania",
    flag: "🇷🇴",
    tagline: "Construction & Hospitality - Large Work Permit Quotas",
    programs: [
      "Work Permits",
      "Construction Jobs",
      "Hospitality Work",
      "Caregiving",
    ],
    successRate: "94%",
    clientsPlaced: "200+",
    avgSalary: "EUR 22,000+",
    processingTime: "2-4 months",
    currentOffer: "Actively issuing large work permits for Indians",
    highlights: [
      "Smooth embassy process",
      "High demand for workers",
      "EU access benefits",
    ],
    testimonial: "Romania work permit process was surprisingly smooth!",
    clientName: "Andrei M., Hospitality Manager",
    bgGradient: "from-red-600/20 to-yellow-600/20",
    isPopular: true,
    status: "High Quota Available",
  },
  {
    id: "latvia",
    name: "Latvia",
    flag: "🇱🇻",
    tagline: "Industrial & Cold Storage Work - Fast Processing",
    programs: [
      "Work Visa + VFS",
      "Cold Storage Jobs",
      "Warehouse Work",
      "Industrial Cleaning",
    ],
    successRate: "88%",
    clientsPlaced: "60+",
    avgSalary: "EUR 17,000+",
    processingTime: "3-4 months",
    currentOffer: "Fast processing with valid employer documents",
    highlights: [
      "Not overpopulated with Indians",
      "Clean immigration record helps",
      "Baltic region opportunities",
    ],
    testimonial: "Latvia visa processed quickly with proper documents!",
    clientName: "Juris L., Industrial Worker",
    bgGradient: "from-red-800/20 to-white/20",
    isPopular: false,
    status: "Fast Processing",
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "EU Blue Card & Job Seeker Visas - Strong Economy",
    programs: [
      "EU Blue Card",
      "Job Seeker Visa",
      "Work Permits",
      "Family Reunification",
    ],
    successRate: "89%",
    clientsPlaced: "95+",
    avgSalary: "EUR 45,000+",
    processingTime: "4-8 months",
    currentOffer: "German language classes included",
    highlights: [
      "Access to entire EU",
      "Strong social benefits",
      "Job security",
    ],
    testimonial: "Blue Card approved! LINAK made the complex process simple.",
    clientName: "Vikash P., IT Consultant",
    bgGradient: "from-black/20 to-red-500/20",
    isPopular: false,
    status: "High Success Rate",
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    tagline: "Seasonal Jobs & Skilled Work - Easy Family Migration",
    programs: [
      "Seasonal Work",
      "Decreto Flussi",
      "Self-Employment",
      "Family Visas",
    ],
    successRate: "96%",
    clientsPlaced: "200+",
    avgSalary: "EUR 25,000+",
    processingTime: "2-4 months",
    currentOffer: "20% off processing fees for August applications",
    highlights: [
      "Fast visa processing",
      "Family-friendly policies",
      "EU access",
    ],
    testimonial: "Whole family migrated to Italy smoothly with LINAK!",
    clientName: "Suresh R., Restaurant Manager",
    bgGradient: "from-green-500/20 to-red-500/20",
    isPopular: true,
    status: "Special August Offer",
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    tagline: "Work & Residency Programs - Beautiful Lifestyle",
    programs: [
      "Work Permits",
      "Golden Visa",
      "Non-Lucrative Visa",
      "Student Visas",
    ],
    successRate: "88%",
    clientsPlaced: "75+",
    avgSalary: "EUR 28,000+",
    processingTime: "3-6 months",
    currentOffer: "Free Spanish language course with application",
    highlights: [
      "Great climate",
      "Low cost of living",
      "Path to EU citizenship",
    ],
    testimonial: "Spain work permit approved! Great lifestyle upgrade.",
    clientName: "Maria D., Teacher",
    bgGradient: "from-red-600/20 to-yellow-500/20",
    isPopular: false,
    status: "Growing Opportunities",
  },
  {
    id: "georgia",
    name: "Georgia",
    flag: "��",
    tagline: "Visa-Free Entry - Gateway & Backup Option",
    programs: [
      "Visa-Free (90 days)",
      "Work Permits",
      "Hospitality Jobs",
      "Warehouse Work",
    ],
    successRate: "95%",
    clientsPlaced: "80+",
    avgSalary: "USD 15,000+",
    processingTime: "Immediate entry, 1-3 months for permits",
    currentOffer: "Good backup for Poland rejections",
    highlights: [
      "Visa-free for 90 days",
      "Easy business setup",
      "Strategic location",
    ],
    testimonial: "Georgia gave me a fresh start after Poland rejection!",
    clientName: "George T., Hotel Staff",
    bgGradient: "from-white/20 to-red-500/20",
    isPopular: true,
    status: "Visa-Free Entry",
  },
  {
    id: "serbia",
    name: "Serbia",
    flag: "🇷🇸",
    tagline: "Visa-Free Entry - Stepping Stone to Europe",
    programs: [
      "Visa-Free (90 days)",
      "Work Extensions",
      "Hotel Jobs",
      "Packaging Work",
    ],
    successRate: "90%",
    clientsPlaced: "45+",
    avgSalary: "EUR 12,000+",
    processingTime: "Immediate entry",
    currentOffer: "Often used as stepping-stone country",
    highlights: [
      "Visa-free for Indians",
      "Gateway to Europe",
      "Low living costs",
    ],
    testimonial: "Serbia was my entry point to European opportunities!",
    clientName: "Stefan P., Hotel Worker",
    bgGradient: "from-blue-600/20 to-red-600/20",
    isPopular: false,
    status: "Gateway Country",
  },
  {
    id: "armenia",
    name: "Armenia",
    flag: "��",
    tagline: "Quick Entry Visas - Low Investment Required",
    programs: [
      "Work Permits",
      "Business Visas",
      "Residency Programs",
      "Investment Visas",
    ],
    successRate: "100%",
    clientsPlaced: "45+",
    avgSalary: "USD 18,000+",
    processingTime: "1-2 months",
    currentOffer: "Guaranteed approval or full refund",
    highlights: [
      "Fast processing",
      "Low investment threshold",
      "Growing economy",
    ],
    testimonial: "Armenia visa in just 6 weeks! Incredible service.",
    clientName: "Armen K., Businessman",
    bgGradient: "from-red-500/20 to-blue-500/20",
    isPopular: false,
    status: "100% Success Rate",
  },
  {
    id: "russia",
    name: "Russia",
    flag: "🇷🇺",
    tagline: "Work Permits & Business Visas - Vast Opportunities",
    programs: [
      "Work Permits",
      "Business Visas",
      "Highly Skilled Specialist",
      "Investment",
    ],
    successRate: "85%",
    clientsPlaced: "60+",
    avgSalary: "USD 25,000+",
    processingTime: "2-4 months",
    currentOffer: "Document preparation support included",
    highlights: [
      "Large job market",
      "Natural resources sector",
      "Growing tech industry",
    ],
    testimonial: "Russia work permit success! Great opportunities here.",
    clientName: "Dmitri I., Engineer",
    bgGradient: "from-blue-600/20 to-red-600/20",
    isPopular: false,
    status: "Specialized Programs",
  },
];

const stats = [
  { icon: Globe, number: "15+", text: "Countries", color: "text-blue-400" },
  {
    icon: Users,
    number: "100+",
    text: "Expert Consultations",
    color: "text-green-400",
  },
  {
    icon: Star,
    number: "94%",
    text: "Average Success Rate",
    color: "text-gray-300",
  },
  {
    icon: Clock,
    number: "7+",
    text: "Years Experience",
    color: "text-red-400",
  },
];

export default function DestinationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getStatusBadgeClass = (country: (typeof countries)[0]) => {
    if (country.status.includes("100%")) {
      return "bg-green-500/20 text-green-300";
    }
    if (country.isPopular) {
      return "bg-yellow-500/20 text-yellow-300";
    }
    return "bg-blue-500/20 text-blue-300";
  };

  const filteredCountries = countries.filter((country) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "popular") return country.isPopular;
    if (selectedFilter === "fast") return parseInt(country.processingTime) <= 6;
    if (selectedFilter === "high-success")
      return parseInt(country.successRate) >= 95;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0e4a] via-[#4b2a82] to-[#0e1e4a] relative overflow-hidden">
      {/* Advanced 3D Background */}
      <Advanced3DBackground />

      {/* Header Section */}
      {/* Coming Soon - Premium Destinations */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              🎯 Premium Destinations
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 ml-3">
                Coming Soon
              </span>
            </h2>
            <p className="text-xl text-white/70">
              Unskilled & Student Visa Programs - Stay Tuned!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { name: "USA", flag: "🇺🇸", type: "Student & Work Visas" },
              { name: "UK", flag: "🇬🇧", type: "Student & Skilled Work" },
              { name: "Canada", flag: "🇨🇦", type: "Unskilled Programs" },
              { name: "Australia", flag: "🇦🇺", type: "Student & Work Visas" },
              { name: "Singapore", flag: "🇸🇬", type: "Unskilled Work Permits" },
            ].map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Card className="streamit-card premium-glow border-2 border-red-900/30 bg-black/60 hover:bg-red-950/20 coming-soon-pulse text-center p-6">
                  <div className="text-4xl mb-3">{destination.flag}</div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{destination.type}</p>
                  <Badge className="mt-3 bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse">
                    Coming Soon
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Visa-Free & eVisa Countries */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              ✈️ Visa-Free & Easy Entry Countries
            </h2>
            <p className="text-xl text-white/70">
              Backup & Transit Route Options for Indians
            </p>
          </div>

          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full streamit-card premium-glow border-2 border-red-900/30 bg-black/60 rounded-xl overflow-hidden animated-table animated-border"
            >
              <thead className="bg-red-900/20 border-b border-red-800/30">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-800/20">
                {[
                  {
                    country: "Serbia 🇷🇸",
                    duration: "90 days",
                    type: "Visa-Free",
                    use: "Stepping-stone to EU",
                  },
                  {
                    country: "Georgia 🇬🇪",
                    duration: "90 days",
                    type: "Visa-Free",
                    use: "Work opportunities",
                  },
                  {
                    country: "Albania 🇦🇱",
                    duration: "90 days",
                    type: "Visa-Free (seasonal)",
                    use: "Tourism work",
                  },
                  {
                    country: "Armenia 🇦🇲",
                    duration: "120 days",
                    type: "Visa on Arrival",
                    use: "Business setup",
                  },
                  {
                    country: "Bosnia 🇧🇦",
                    duration: "30 days",
                    type: "Visa-Free",
                    use: "Transit route",
                  },
                  {
                    country: "Montenegro 🇲🇪",
                    duration: "90 days",
                    type: "Visa-Free",
                    use: "Tourism sector",
                  },
                ].map((row, index) => (
                  <motion.tr
                    key={row.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="hover:bg-red-900/10 premium-table-row"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {row.country}
                    </td>
                    <td className="px-6 py-4 text-green-400">{row.duration}</td>
                    <td className="px-6 py-4 text-blue-400">{row.type}</td>
                    <td className="px-6 py-4 text-gray-300">{row.use}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block streamit-card premium-glow border-2 border-red-900/30 bg-black/60 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                ❌ Currently Saturated (Avoid for Now)
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { country: "Poland 🇵🇱", reason: "High rejection rate" },
                  { country: "Czech Republic 🇨🇿", reason: "Saturated market" },
                  { country: "Slovakia 🇸🇰", reason: "Limited quotas" },
                  { country: "Malta 🇲🇹", reason: "Blocked for Indians" },
                ].map((item) => (
                  <div
                    key={item.country}
                    className="bg-red-900/20 border border-red-800/30 rounded-lg p-3"
                  >
                    <div className="text-white font-medium">{item.country}</div>
                    <div className="text-red-400 text-xs">{item.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="py-20 px-6 bg-gradient-to-r from-red-900/20 to-black/20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              100% Legal & Trusted Programs
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              🌏 Unlock Your{" "}
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                Global Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Choose from our <strong>proven success programs</strong> across 9
              countries. Over 1,000 clients have already started their new life
              abroad with LINAK.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Expert Now
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <stat.icon
                  className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-300">{stat.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Network Visualization */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="px-4 mb-16"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🔗 Our Global Migration Network
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Explore our interconnected network of migration programs. Each
              connection represents a proven pathway to your new life abroad.{" "}
              <strong>Click any country to see detailed information.</strong>
            </p>
          </motion.div>

          {/* 3D Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <MolecularNetworkVisualization
              onCountrySelect={(countryId) => {
                // Scroll to country card
                const countryElement = document.getElementById(
                  `country-${countryId}`
                );
                if (countryElement) {
                  countryElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  // Temporarily highlight the card
                  countryElement.classList.add("ring-4", "ring-yellow-400/50");
                  setTimeout(() => {
                    countryElement.classList.remove(
                      "ring-4",
                      "ring-yellow-400/50"
                    );
                  }, 2000);
                }
              }}
              selectedCountry={
                selectedFilter === "all" ? undefined : selectedFilter
              }
              className="h-[600px] mx-auto"
            />
          </motion.div>

          {/* Network Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">9</p>
              <p className="text-sm text-slate-300">Connected Countries</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">15+</p>
              <p className="text-sm text-slate-300">Migration Pathways</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">94%</p>
              <p className="text-sm text-slate-300">Network Success Rate</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-4 mb-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { key: "all", label: "All Countries", icon: Globe },
              { key: "popular", label: "Most Popular", icon: TrendingUp },
              { key: "fast", label: "Fast Processing", icon: Clock },
              { key: "high-success", label: "95%+ Success", icon: Star },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                <filter.icon className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Countries Grid */}
      <motion.section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country.id}
                id={`country-${country.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 country-card-hover animated-border overflow-hidden">
                  <CardHeader className="relative pb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${country.bgGradient} opacity-50`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{country.flag}</span>
                          <div>
                            <CardTitle className="text-white text-xl font-bold">
                              {country.name}
                            </CardTitle>
                            <Badge
                              className={`mt-1 ${getStatusBadgeClass(country)}`}
                            >
                              {country.status}
                            </Badge>
                          </div>
                        </div>
                        {country.isPopular && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>

                      <CardDescription className="text-white/90 font-medium text-base">
                        {country.tagline}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <p className="text-2xl font-bold text-green-400">
                            {country.successRate}
                          </p>
                          <p className="text-xs text-slate-300">Success Rate</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <p className="text-2xl font-bold text-blue-400">
                            {country.clientsPlaced}
                          </p>
                          <p className="text-xs text-slate-300">
                            Clients Placed
                          </p>
                        </div>
                      </div>

                      {/* Programs */}
                      <div>
                        <h4 className="text-white font-semibold mb-2 text-sm">
                          Available Programs:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {country.programs.slice(0, 3).map((program) => (
                            <Badge
                              key={program}
                              variant="secondary"
                              className="text-xs bg-white/10 text-white/80"
                            >
                              {program}
                            </Badge>
                          ))}
                          {country.programs.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-white/10 text-white/60"
                            >
                              +{country.programs.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Current Offer */}
                      {country.currentOffer && (
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg border border-green-500/20">
                          <p className="text-green-300 text-sm font-medium">
                            🎉 {country.currentOffer}
                          </p>
                        </div>
                      )}

                      {/* Key Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Avg Salary:</span>
                          <span className="text-white font-semibold">
                            {country.avgSalary}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Processing:</span>
                          <span className="text-white font-semibold">
                            {country.processingTime}
                          </span>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-white/90 text-sm italic mb-2">
                          "{country.testimonial}"
                        </p>
                        <p className="text-slate-400 text-xs">
                          - {country.clientName}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold"
                          size="sm"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join our premium migration services with 100+ expert consultations
              and 7+ years of proven experience.
              <br />
              <strong>Your future abroad is just one call away.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="w-6 h-6 mr-3" />
                Call +91-XXXX-XXXX-XX
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Free Assessment
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% Legal Process</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Licensed & Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-red-400" />
                <span>7+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
