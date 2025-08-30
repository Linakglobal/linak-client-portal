"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VHSYCharity } from "@/types/vhsy";

export default function VHSYCharityPage() {
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const charities: VHSYCharity[] = [
    {
      id: "1",
      name: "World Health Organization",
      description: "Global health initiatives and emergency medical aid",
      totalDonated: 2500000,
      donorsCount: 15000,
      category: "Health",
      isVerified: true,
      impact: "Provided medical aid to 500K+ people worldwide",
    },
    {
      id: "2",
      name: "UNICEF",
      description: "Children's emergency fund for education and healthcare",
      totalDonated: 3200000,
      donorsCount: 22000,
      category: "Children",
      isVerified: true,
      impact: "Supported 1M+ children's education and health",
    },
    {
      id: "3",
      name: "Red Cross International",
      description: "Disaster relief and humanitarian aid worldwide",
      totalDonated: 1800000,
      donorsCount: 12000,
      category: "Emergency",
      isVerified: true,
      impact: "Emergency relief to 300K+ disaster victims",
    },
    {
      id: "4",
      name: "Ocean Cleanup Foundation",
      description: "Ocean plastic removal and environmental protection",
      totalDonated: 850000,
      donorsCount: 8500,
      category: "Environment",
      isVerified: true,
      impact: "Removed 50+ tons of plastic from oceans",
    },
  ];

  const calculateTaxBenefit = (amount: number) => {
    const taxSavings = amount * 0.25; // 25% tax deduction
    return taxSavings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-rose-900">VHSY</h1>
                <span className="ml-2 text-sm text-rose-600">Charity</span>
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
          <div className="text-6xl mb-6">❤️</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-700 to-pink-700 bg-clip-text text-transparent mb-4">
            VHSY Charity
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Make transparent charitable donations with blockchain tracking, impact measurement, and tax benefits
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-rose-200">
              <div className="text-2xl font-bold text-rose-700">250+</div>
              <div className="text-gray-600 text-sm">Charities</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-rose-200">
              <div className="text-2xl font-bold text-pink-700">$8.3M</div>
              <div className="text-gray-600 text-sm">Total Donated</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-rose-200">
              <div className="text-2xl font-bold text-red-700">57K+</div>
              <div className="text-gray-600 text-sm">Donors</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-rose-200">
              <div className="text-2xl font-bold text-rose-700">100%</div>
              <div className="text-gray-600 text-sm">Transparent</div>
            </div>
          </div>
        </div>

        {/* Tax Benefits Calculator */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-rose-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-rose-800">Tax Benefits Calculator</CardTitle>
              <CardDescription>
                Calculate your tax savings from charitable donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="donation">Donation Amount (USD)</Label>
                <Input
                  id="donation"
                  type="number"
                  placeholder="Enter donation amount"
                  value={donationAmount || ""}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              
              {donationAmount > 0 && (
                <div className="bg-rose-50 rounded-lg p-6 border border-rose-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Your Donation</div>
                      <div className="text-2xl font-bold text-rose-600">
                        ${donationAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Making a difference</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Tax Savings</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${calculateTaxBenefit(donationAmount).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">25% tax deduction</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Featured Charities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Global Charity Partners</h2>
          <p className="text-center text-gray-600 mb-12">
            Verified charitable organizations with transparent impact tracking
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charities.map((charity) => (
              <Card key={charity.id} className="bg-white/60 backdrop-blur-sm border-rose-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-rose-800 flex items-center">
                        {charity.name}
                        {charity.isVerified && <span className="ml-2 text-green-600">✓</span>}
                      </CardTitle>
                      <CardDescription>{charity.description}</CardDescription>
                    </div>
                    <div className="bg-rose-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-rose-700">{charity.category}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-rose-700">
                        ${(charity.totalDonated / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-600">Total Donated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-pink-700">
                        {(charity.donorsCount / 1000).toFixed(0)}K+
                      </div>
                      <div className="text-sm text-gray-600">Donors</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-gray-700 mb-1">Impact Achieved:</div>
                    <div className="text-sm text-gray-600">{charity.impact}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      View Impact
                    </Button>
                    <Button className="bg-rose-600 hover:bg-rose-700" size="sm">
                      Donate VHSY
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blockchain Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-rose-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Transparent Giving</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Blockchain Tracking</h3>
              <p className="text-gray-600">
                Every donation is recorded on the blockchain for complete transparency
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Impact Measurement</h3>
              <p className="text-gray-600">
                Real-time tracking of how your donations create positive impact
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Community Voting</h3>
              <p className="text-gray-600">
                Vote on which charities should receive priority funding
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}