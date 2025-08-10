"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_theme(colors.purple.600/20),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_theme(colors.blue.600/20),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,_theme(colors.red.600/10),_transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Logo Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600/30 to-purple-800/20 rounded-3xl shadow-lg shadow-purple-500/40 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center p-4">
              <Image
                src="/linak-logo-wings.svg"
                alt="LINAK"
                width={64}
                height={64}
                className="w-16 h-16 filter brightness-0 invert"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2ZjQyYzEiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNmY0MmMxIiBvcGFjaXR5PSIwLjYiIHJ4PSI0Ii8+PC9zdmc+"
                priority
              />
            </div>
          </motion.div>

          {/* 404 Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text mb-4">
              404
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
              <Search className="w-6 h-6 text-purple-400" />
              <div className="h-1 w-12 bg-gradient-to-l from-purple-500 to-transparent rounded-full" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have disappeared into the
              digital void. Let&apos;s get you back to familiar territory.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-purple-500/30 border border-purple-400/20 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-3 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" />
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link
                    href="/login"
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-200 text-sm font-medium hover:underline"
                  >
                    Client Login
                  </Link>
                  <Link
                    href="/migration-service"
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-200 text-sm font-medium hover:underline"
                  >
                    Migration Services
                  </Link>
                  <Link
                    href="/rewards"
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-200 text-sm font-medium hover:underline"
                  >
                    Rewards Program
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center text-gray-400 text-sm"
          >
            <p>© 2025 LINAK Global Immigration Services</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
