"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VHSYCoin, VHSYStats } from "@/types/vhsy";

export default function VHSYCoinPage() {
  const [coinData, setCoinData] = useState<VHSYCoin>({
    symbol: "VHSY",
    name: "VANHSYA COIN",
    currentPrice: 1.25,
    priceChange24h: 5.67,
    marketCap: 125000000,
    volume24h: 2500000,
    circulatingSupply: 100000000,
    totalSupply: 1000000000,
  });

  const [stats, setStats] = useState<VHSYStats>({
    totalUsers: 125000,
    totalTransactions: 2500000,
    totalValueLocked: 50000000,
    countriesSupported: 195,
    merchantPartners: 10000,
    educationPartners: 500,
    charityPartners: 250,
  });

  const utilities = [
    {
      title: "Immigration",
      description: "Pay visa fees in 195 countries with VHSY",
      icon: "🌍",
      href: "/vhsy-coin/immigration",
      stats: "195 Countries",
    },
    {
      title: "Real Estate",
      description: "Global property marketplace accepting VHSY",
      icon: "🏠",
      href: "/vhsy-coin/real-estate",
      stats: "10K+ Properties",
    },
    {
      title: "Daily Use",
      description: "Pay for daily expenses with VHSY rewards",
      icon: "💳",
      href: "/vhsy-coin/daily-use",
      stats: "10K+ Merchants",
    },
    {
      title: "Charity",
      description: "Transparent donations with blockchain tracking",
      icon: "❤️",
      href: "/vhsy-coin/charity",
      stats: "250+ Charities",
    },
    {
      title: "Education",
      description: "Pay tuition fees with VHSY at partner universities",
      icon: "🎓",
      href: "/vhsy-coin/education",
      stats: "500+ Universities",
    },
  ];

  const features = [
    {
      title: "Staking",
      description: "Earn rewards by staking VHSY tokens",
      icon: "💰",
      href: "/vhsy-coin/staking",
    },
    {
      title: "Trading",
      description: "Trade VHSY on integrated DEX",
      icon: "📈",
      href: "/vhsy-coin/trading",
    },
    {
      title: "Wallet",
      description: "Secure multi-signature wallet",
      icon: "🔐",
      href: "/vhsy-coin/wallet",
    },
    {
      title: "Governance",
      description: "Participate in DAO voting",
      icon: "🗳️",
      href: "/vhsy-coin/governance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-purple-900">LINAK</h1>
                <span className="ml-2 text-sm text-purple-600">Client Portal</span>
              </Link>
              <div className="ml-8 text-2xl">•</div>
              <div className="ml-8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  VHSY COIN
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-3xl">V</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-4">
              VANHSYA COIN (VHSY)
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The world&apos;s first multi-utility cryptocurrency for Immigration, Real Estate, Daily Use, Charity, and Education
            </p>
          </div>

          {/* Price Display */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl border border-purple-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  ${coinData.currentPrice.toFixed(2)}
                </div>
                <div className="text-gray-600">Current Price</div>
                <div className={`text-sm mt-1 ${coinData.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {coinData.priceChange24h >= 0 ? '+' : ''}{coinData.priceChange24h.toFixed(2)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  ${(coinData.marketCap / 1000000).toFixed(0)}M
                </div>
                <div className="text-gray-600">Market Cap</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-700 mb-2">
                  ${(coinData.volume24h / 1000000).toFixed(1)}M
                </div>
                <div className="text-gray-600">24h Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  {(coinData.circulatingSupply / 1000000).toFixed(0)}M
                </div>
                <div className="text-gray-600">Circulating Supply</div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Sectors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Multi-Utility Ecosystem</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            VHSY powers real-world utility across five major sectors, making cryptocurrency practical for everyday life
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {utilities.map((utility, index) => (
              <Link key={index} href={utility.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/60 backdrop-blur-sm border-purple-200">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{utility.icon}</div>
                    <CardTitle className="text-xl text-purple-800">{utility.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {utility.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="bg-purple-100 rounded-lg p-3">
                      <div className="font-semibold text-purple-700">{utility.stats}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm border-purple-200">
                  <CardHeader className="text-center">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <CardTitle className="text-lg text-purple-800">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Global Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Global Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-700 mb-2">
                {(stats.totalUsers / 1000).toFixed(0)}K+
              </div>
              <div className="text-gray-600 text-sm">Total Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700 mb-2">
                {(stats.totalTransactions / 1000000).toFixed(1)}M+
              </div>
              <div className="text-gray-600 text-sm">Transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-700 mb-2">
                ${(stats.totalValueLocked / 1000000).toFixed(0)}M
              </div>
              <div className="text-gray-600 text-sm">Value Locked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700 mb-2">
                {stats.countriesSupported}
              </div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700 mb-2">
                {(stats.merchantPartners / 1000).toFixed(0)}K+
              </div>
              <div className="text-gray-600 text-sm">Merchants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-700 mb-2">
                {stats.educationPartners}+
              </div>
              <div className="text-gray-600 text-sm">Universities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700 mb-2">
                {stats.charityPartners}+
              </div>
              <div className="text-gray-600 text-sm">Charities</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}