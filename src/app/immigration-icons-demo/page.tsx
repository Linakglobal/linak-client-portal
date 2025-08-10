"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImmigrationIconSet } from "@/components/icons/ImmigrationIcons";
import { ImmigrationEmojiSet } from "@/components/icons/ImmigrationEmojis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IconShowcase = () => {
  const iconData = [
    {
      name: "New Home",
      component: ImmigrationIconSet.NewHome,
      description: "Finding a new place to call home",
      color: "text-green-500",
    },
    {
      name: "Travel",
      component: ImmigrationIconSet.Travel,
      description: "Journey and global movement",
      color: "text-blue-500",
    },
    {
      name: "Community",
      component: ImmigrationIconSet.Community,
      description: "Belonging and connection",
      color: "text-gray-300",
    },
    {
      name: "Family",
      component: ImmigrationIconSet.Family,
      description: "Family unity and support",
      color: "text-pink-500",
    },
    {
      name: "Paperwork",
      component: ImmigrationIconSet.Paperwork,
      description: "Documentation and legal processes",
      color: "text-purple-500",
    },
    {
      name: "Language",
      component: ImmigrationIconSet.Language,
      description: "Learning and adaptation",
      color: "text-cyan-500",
    },
  ];

  const emojiData = [
    {
      name: "Diverse Handshake",
      component: ImmigrationEmojiSet.DiverseHandshake,
      description: "Unity across cultures",
    },
    {
      name: "Family Together",
      component: ImmigrationEmojiSet.FamilyTogether,
      description: "Families staying united",
    },
    {
      name: "Key Holder",
      component: ImmigrationEmojiSet.KeyHolder,
      description: "Opening new doors",
    },
    {
      name: "Welcome Gesture",
      component: ImmigrationEmojiSet.WelcomeGesture,
      description: "Warm welcome and acceptance",
    },
    {
      name: "Support Network",
      component: ImmigrationEmojiSet.SupportNetwork,
      description: "Community support system",
    },
    {
      name: "New Beginning",
      component: ImmigrationEmojiSet.NewBeginning,
      description: "Fresh starts and hope",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <ImmigrationIconSet.GlobeBird size={96} className="text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Immigration Support Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Welcoming icons and emojis designed to create a positive, supportive
          experience for immigration services
        </p>
      </motion.div>

      {/* Icons Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Welcoming Icon Set
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {iconData.map((icon, index) => {
            const IconComponent = icon.component;
            return (
              <motion.div
                key={icon.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
                  <div className={`flex justify-center mb-4 ${icon.color}`}>
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {icon.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{icon.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Emojis Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Supportive Emoji Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {emojiData.map((emoji, index) => {
            const EmojiComponent = emoji.component;
            return (
              <motion.div
                key={emoji.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0">
                  <div className="flex justify-center mb-4">
                    <EmojiComponent size={64} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {emoji.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{emoji.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Usage Examples */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Real-World Usage Examples
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Example 1: Welcome Message */}
          <Card className="p-6 bg-gradient-to-r from-blue-100 to-green-100 border-0">
            <div className="flex items-center space-x-4 mb-4">
              <ImmigrationEmojiSet.WelcomeGesture size={48} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Welcome to Your New Journey!
                </h3>
                <p className="text-gray-600">
                  We're here to support you every step of the way.
                </p>
              </div>
            </div>
          </Card>

          {/* Example 2: Services Overview */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.NewHome
                  size={24}
                  className="text-green-500"
                />
                <span className="text-sm text-gray-700">Housing Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.Paperwork
                  size={24}
                  className="text-purple-500"
                />
                <span className="text-sm text-gray-700">Document Help</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.Language
                  size={24}
                  className="text-cyan-500"
                />
                <span className="text-sm text-gray-700">Language Classes</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.Community
                  size={24}
                  className="text-gray-300"
                />
                <span className="text-sm text-gray-700">Community Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.Family
                  size={24}
                  className="text-pink-500"
                />
                <span className="text-sm text-gray-700">Family Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImmigrationIconSet.Travel
                  size={24}
                  className="text-blue-500"
                />
                <span className="text-sm text-gray-700">Travel Guidance</span>
              </div>
            </div>
          </Card>

          {/* Example 3: Success Story */}
          <Card className="p-6 bg-gradient-to-r from-gray-800 to-black border-0">
            <div className="flex items-start space-x-4">
              <ImmigrationEmojiSet.NewBeginning size={48} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Success Story
                </h3>
                <p className="text-gray-700 mb-2">
                  "Thanks to this amazing support system, I was able to find a
                  new home, learn the language, and connect with my community.
                  Today marks a new beginning for my family!"
                </p>
                <div className="flex space-x-2">
                  <ImmigrationEmojiSet.FamilyTogether size={24} />
                  <ImmigrationEmojiSet.DiverseHandshake size={24} />
                  <ImmigrationEmojiSet.KeyHolder size={24} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-green-600 text-white border-0">
          <div className="flex justify-center mb-6">
            <ImmigrationEmojiSet.SupportNetwork size={64} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">
            Join our supportive community and begin your journey with
            confidence. We're here to help you every step of the way.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <ImmigrationIconSet.NewHome size={20} className="mr-2" />
            Start Your Journey
          </Button>
        </Card>
      </motion.section>
    </div>
  );
};

export default IconShowcase;
