"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VHSYMerchant } from "@/types/vhsy";

export default function VHSYDailyUsePage() {
  const [monthlySpending, setMonthlySpending] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const merchants: VHSYMerchant[] = [
    {
      id: "1",
      name: "Starbucks",
      category: "Food & Beverage",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 5,
      rating: 4.8,
      description: "Coffee, tea, and light meals with 5% VHSY cashback",
    },
    {
      id: "2",
      name: "Amazon",
      category: "E-commerce",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 3,
      rating: 4.9,
      description: "Online shopping with 3% VHSY cashback on all purchases",
    },
    {
      id: "3",
      name: "Uber",
      category: "Transportation",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 4,
      rating: 4.7,
      description: "Ride-sharing and food delivery with 4% VHSY cashback",
    },
    {
      id: "4",
      name: "Shell",
      category: "Gas & Fuel",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 6,
      rating: 4.5,
      description: "Fuel and convenience store purchases with 6% VHSY cashback",
    },
    {
      id: "5",
      name: "McDonald's",
      category: "Food & Beverage",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 5,
      rating: 4.3,
      description: "Fast food with 5% VHSY cashback and mobile ordering",
    },
    {
      id: "6",
      name: "Walmart",
      category: "Retail",
      location: "Global",
      acceptsVHSY: true,
      cashbackRate: 2,
      rating: 4.6,
      description: "Grocery and retail shopping with 2% VHSY cashback",
    },
  ];

  const categories = [
    { name: "All", value: "all", icon: "🛍️" },
    { name: "Food & Beverage", value: "food", icon: "🍔" },
    { name: "E-commerce", value: "ecommerce", icon: "📦" },
    { name: "Transportation", value: "transport", icon: "🚗" },
    { name: "Gas & Fuel", value: "fuel", icon: "⛽" },
    { name: "Retail", value: "retail", icon: "🏪" },
  ];

  const calculateCashback = (spending: number) => {
    const avgCashbackRate = 4; // 4% average
    const monthlyRewards = spending * (avgCashbackRate / 100);
    const yearlyRewards = monthlyRewards * 12;
    return { monthlyRewards, yearlyRewards };
  };

  const filteredMerchants = selectedCategory === "all" 
    ? merchants 
    : merchants.filter(m => m.category.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-orange-900">VHSY</h1>
                <span className="ml-2 text-sm text-orange-600">Daily Use</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/vhsy-coin">
                <Button variant="outline" size="sm">
                  Back to Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">💳</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent mb-4">
            VHSY Daily Use
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your daily spending into crypto rewards with 10,000+ merchants accepting VHSY payments worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">10K+</div>
              <div className="text-gray-600 text-sm">Merchants</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-amber-700">4%</div>
              <div className="text-gray-600 text-sm">Avg. Cashback</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-yellow-700">150+</div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>

        {/* Cashback Calculator */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-orange-800">Daily Expenses Calculator</CardTitle>
              <CardDescription>
                Calculate your potential VHSY cashback rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="spending">Monthly Spending (USD)</Label>
                <Input
                  id="spending"
                  type="number"
                  placeholder="Enter your monthly spending"
                  value={monthlySpending || ""}
                  onChange={(e) => setMonthlySpending(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              
              {monthlySpending > 0 && (
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Monthly Rewards</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {calculateCashback(monthlySpending).monthlyRewards.toFixed(0)} VHSY
                      </div>
                      <div className="text-sm text-gray-600">
                        ${calculateCashback(monthlySpending).monthlyRewards.toFixed(2)} value
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Annual Rewards</div>
                      <div className="text-2xl font-bold text-amber-600">
                        {calculateCashback(monthlySpending).yearlyRewards.toFixed(0)} VHSY
                      </div>
                      <div className="text-sm text-gray-600">
                        ${calculateCashback(monthlySpending).yearlyRewards.toFixed(2)} value
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Merchant Directory */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Merchant Directory</h2>
          <p className="text-center text-gray-600 mb-12">
            Popular merchants accepting VHSY payments with instant cashback
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants.map((merchant) => (
              <Card key={merchant.id} className="bg-white/60 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-orange-800">{merchant.name}</CardTitle>
                      <CardDescription>{merchant.category}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Cashback</div>
                      <div className="text-lg font-bold text-green-600">{merchant.cashbackRate}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{merchant.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">{merchant.rating}</span>
                      <span className="text-yellow-500">⭐</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{merchant.description}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-green-500 rounded" 
                        style={{ width: `${merchant.cashbackRate * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{merchant.cashbackRate}% back</span>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Pay with VHSY
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Payment Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Mobile Integration</h3>
              <p className="text-gray-600">
                Seamless mobile payments with QR codes and NFC technology
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Instant Rewards</h3>
              <p className="text-gray-600">
                Receive VHSY cashback instantly after every purchase
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Bank-level security with blockchain verification for all payments
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}