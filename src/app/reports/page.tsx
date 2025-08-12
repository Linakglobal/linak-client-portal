"use client";

import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  FileText,
  Eye,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DarkPageLayout from "@/components/layout/DarkPageLayout";

const reportCategories = [
  {
    icon: AlertTriangle,
    title: "Fraud Prevention",
    description:
      "Report suspicious immigration services or fraudulent practices",
    color: "text-red-400",
    bgColor: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30",
  },
  {
    icon: Shield,
    title: "Service Quality",
    description: "Share feedback about immigration service providers",
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Users,
    title: "Community Safety",
    description: "Report issues affecting the immigration community",
    color: "text-green-400",
    bgColor: "from-green-500/20 to-teal-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: FileText,
    title: "Documentation Issues",
    description: "Report problems with immigration documentation processes",
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-indigo-500/20",
    borderColor: "border-purple-500/30",
  },
];

const stats = [
  { label: "Reports Submitted", value: "2,847", icon: FileText },
  { label: "Cases Resolved", value: "2,651", icon: Shield },
  { label: "Fraud Prevented", value: "196", icon: AlertTriangle },
  { label: "Community Members", value: "15,000+", icon: Users },
];

export default function ReportsPage() {
  return (
    <DarkPageLayout title="Community Reports">
      <div className="relative">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl shadow-2xl shadow-blue-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-8">
                <Shield size={48} className="text-white" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="landing-text-gradient">
                  LINAK Community Reports
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Help us maintain the highest standards in immigration services.
                Your reports help protect the community and improve service
                quality worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="landing-button-primary px-8 py-4 text-lg">
                  <AlertTriangle size={24} className="mr-3" />
                  Submit Report
                </Button>
                <Link href="/rewards">
                  <Button className="landing-button-secondary px-8 py-4 text-lg">
                    <Award size={24} className="mr-3" />
                    View Rewards
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={stat.label}
                    className="landing-stats-card text-center"
                  >
                    <CardContent className="p-6">
                      <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>

            {/* Report Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
                Report Categories
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card
                        className={`futuristic-card h-full hover:shadow-2xl transition-all duration-300 ${category.borderColor}`}
                      >
                        <CardHeader>
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-16 h-16 bg-gradient-to-br ${category.bgColor} rounded-2xl flex items-center justify-center border ${category.borderColor}`}
                            >
                              <IconComponent
                                size={32}
                                className={category.color}
                              />
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-white mb-2">
                                {category.title}
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-purple-200 leading-relaxed mb-6">
                            {category.description}
                          </p>
                          <Button className={`tech-button w-full`}>
                            <FileText size={20} className="mr-2" />
                            Submit Report
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Safety Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <Card className="futuristic-card max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <Eye className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Community Safety First
                  </h3>
                  <p className="text-purple-200 leading-relaxed mb-6">
                    All reports are reviewed by our expert team and handled with
                    complete confidentiality. Your safety and privacy are our
                    top priorities. Together, we can create a safer environment
                    for all members of the immigration community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="neon-border text-white hover:bg-purple-500/20"
                    >
                      <Shield size={20} className="mr-2" />
                      Safety Guidelines
                    </Button>
                    <Button
                      variant="outline"
                      className="neon-border text-white hover:bg-purple-500/20"
                    >
                      <FileText size={20} className="mr-2" />
                      Privacy Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </DarkPageLayout>
  );
}
