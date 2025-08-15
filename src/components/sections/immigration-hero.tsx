"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ImmigrationIconSet } from "@/components/icons/ImmigrationIcons";
import { ImmigrationEmojiSet } from "@/components/icons/ImmigrationEmojis";

export function ImmigrationHeroSection() {
  const services = [
    {
      icon: ImmigrationIconSet.NewHome,
      title: "New Home Support",
      description: "Find housing and settle into your new community",
      color: "text-green-500",
    },
    {
      icon: ImmigrationIconSet.Paperwork,
      title: "Document Assistance",
      description: "Help with forms, applications, and legal documents",
      color: "text-purple-500",
    },
    {
      icon: ImmigrationIconSet.Language,
      title: "Language Classes",
      description: "Learn the local language and improve communication",
      color: "text-cyan-500",
    },
    {
      icon: ImmigrationIconSet.Community,
      title: "Community Connection",
      description: "Join local groups and build lasting friendships",
      color: "text-amber-500",
    },
    {
      icon: ImmigrationIconSet.Family,
      title: "Family Services",
      description: "Support for families navigating their journey together",
      color: "text-pink-500",
    },
    {
      icon: ImmigrationIconSet.Travel,
      title: "Travel Guidance",
      description: "Navigate travel requirements and documentation",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Tech Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Floating welcome elements */}
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ImmigrationEmojiSet.WelcomeGesture size={32} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/3"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <ImmigrationEmojiSet.DiverseHandshake size={28} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3"
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          <ImmigrationEmojiSet.SupportNetwork size={24} />
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-1/4"
          animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
        >
          <ImmigrationEmojiSet.NewBeginning size={30} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl shadow-purple-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <ImmigrationIconSet.GlobeBird size={48} className="text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            IT Solutions For A{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
              Digital-First World
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Empower your business with cutting-edge technology solutions
            tailored to meet your unique needs from cloud computing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="tech-button px-8 py-4 text-lg">
              <ImmigrationIconSet.NewHome size={24} className="mr-2" />
              BOOK A FREE CONSULTATION
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/immigration-icons-demo">
              <Button
                variant="outline"
                size="lg"
                className="neon-border px-8 py-4 text-lg text-white hover:bg-purple-500/20"
              >
                <ImmigrationEmojiSet.WelcomeGesture
                  size={24}
                  className="mr-2"
                />
                Explore Services
              </Button>
            </Link>
          </motion.div>

          {/* Welcome Message with Emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">90k</div>
              <div className="text-purple-200 text-sm">Happy Client</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">650+</div>
              <div className="text-purple-200 text-sm">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">85+</div>
              <div className="text-purple-200 text-sm">Work Together</div>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Premium Tech Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="futuristic-card p-6 h-full">
                    <div
                      className={`flex justify-center mb-4 ${service.color}`}
                    >
                      <IconComponent size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {service.title}
                    </h3>
                    <p className="text-purple-200 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Success Story Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 text-center"
        >
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-100 to-blue-100 border-0">
            <div className="flex justify-center mb-6">
              <ImmigrationEmojiSet.FamilyTogether size={64} />
            </div>
            <blockquote className="text-xl text-gray-700 italic mb-4">
              "This support system helped our family not just survive, but truly
              thrive in our new home. From finding housing to learning the
              language, every step was guided with care and understanding."
            </blockquote>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex space-x-1">
                <ImmigrationEmojiSet.NewBeginning size={24} />
                <ImmigrationEmojiSet.KeyHolder size={24} />
                <ImmigrationEmojiSet.SupportNetwork size={24} />
              </div>
              <div className="text-gray-600">
                - Maria & Carlos, New Citizens
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ImmigrationHeroSection;
