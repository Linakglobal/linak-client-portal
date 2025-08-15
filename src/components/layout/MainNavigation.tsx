"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe, Shield, FileText, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Globe },
    { name: "Services", href: "#services", icon: FileText },
    { name: "Countries", href: "#countries", icon: Globe },
    { name: "Reports", href: "/reports", icon: Shield },
    { name: "Rewards", href: "/rewards", icon: Award },
    { name: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-lg shadow-red-500/30 backdrop-blur-sm border border-red-400/20 flex items-center justify-center p-2">
              <Image
                src="/linak-logo-wings.svg"
                alt="LINAK"
                width={32}
                height={32}
                className="object-contain filter brightness-0 invert"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2ZjQyYzEiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNmY0MmMxIiBvcGFjaXR5PSIwLjYiIHJ4PSI0Ii8+PC9zdmc+"
                priority
              />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">LINAK</div>
              <div className="text-sm text-red-300 -mt-1">Global Migration</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-purple-200 hover:text-white transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login">
              <Button className="tech-button flex items-center space-x-2">
                <Shield size={18} />
                <span>Client Portal</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-300 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-slate-700/50"
          >
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-purple-200 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link href="/login">
                  <Button className="streamit-button w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white">
                    <Shield size={18} />
                    <span>Client Portal</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
