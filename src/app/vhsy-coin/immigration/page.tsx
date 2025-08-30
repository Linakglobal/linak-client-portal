"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VHSYImmigration } from "@/types/vhsy";

export default function VHSYImmigrationPage() {
  const [calculatorAmount, setCalculatorAmount] = useState<number>(0);

  const immigrationData: VHSYImmigration[] = [
    {
      id: "1",
      country: "United States",
      visaType: "B1/B2 Tourist",
      fee: 185,
      feeInVHSY: 148,
      processingTime: "2-3 weeks",
      requirements: ["Valid passport", "DS-160 form", "Interview"],
      acceptsVHSY: true,
    },
    {
      id: "2",
      country: "Canada",
      visaType: "Visitor Visa",
      fee: 100,
      feeInVHSY: 80,
      processingTime: "2-4 weeks",
      requirements: ["Valid passport", "Application form", "Supporting documents"],
      acceptsVHSY: true,
    },
    {
      id: "3",
      country: "United Kingdom",
      visaType: "Standard Visitor",
      fee: 115,
      feeInVHSY: 92,
      processingTime: "3 weeks",
      requirements: ["Valid passport", "Online application", "Biometrics"],
      acceptsVHSY: true,
    },
    {
      id: "4",
      country: "Australia",
      visaType: "Tourist eVisitor",
      fee: 20,
      feeInVHSY: 16,
      processingTime: "1-2 weeks",
      requirements: ["Valid passport", "Online application"],
      acceptsVHSY: true,
    },
    {
      id: "5",
      country: "Germany",
      visaType: "Schengen Visa",
      fee: 80,
      feeInVHSY: 64,
      processingTime: "2-3 weeks",
      requirements: ["Valid passport", "Application form", "Travel insurance"],
      acceptsVHSY: true,
    },
    {
      id: "6",
      country: "Japan",
      visaType: "Tourist Visa",
      fee: 35,
      feeInVHSY: 28,
      processingTime: "1 week",
      requirements: ["Valid passport", "Application form", "Photo"],
      acceptsVHSY: true,
    },
  ];

  const successStories = [
    {
      name: "Sarah M.",
      country: "Canada",
      savings: "20%",
      story: "Saved $20 on visa fees using VHSY and got instant confirmation.",
    },
    {
      name: "Ahmed K.",
      country: "Germany",
      savings: "15%",
      story: "Used VHSY for my Schengen visa application. Process was seamless!",
    },
    {
      name: "Maria L.",
      country: "Australia",
      savings: "25%",
      story: "VHSY made my visa payment so much easier than traditional methods.",
    },
  ];

  const countryStats = [
    { region: "North America", countries: 23, adoption: "89%" },
    { region: "Europe", countries: 44, adoption: "92%" },
    { region: "Asia-Pacific", countries: 41, adoption: "87%" },
    { region: "Middle East", countries: 18, adoption: "78%" },
    { region: "Africa", countries: 54, adoption: "71%" },
    { region: "South America", countries: 15, adoption: "83%" },
  ];

  const calculateVHSYSavings = (usdAmount: number) => {
    const vhsyAmount = usdAmount * 0.8; // 20% savings
    const savings = usdAmount - vhsyAmount;
    return { vhsyAmount, savings };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-900">VHSY</h1>
                <span className="ml-2 text-sm text-blue-600">Immigration</span>
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
          <div className="text-6xl mb-6">🌍</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            VHSY Immigration
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Pay visa fees in 195 countries worldwide with VHSY and enjoy instant processing, reduced fees, and government partnerships
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">195</div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-indigo-700">85%</div>
              <div className="text-gray-600 text-sm">Avg. Adoption</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-purple-700">20%</div>
              <div className="text-gray-600 text-sm">Fee Savings</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">24h</div>
              <div className="text-gray-600 text-sm">Processing</div>
            </div>
          </div>
        </div>

        {/* Immigration Cost Calculator */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-800">Immigration Cost Calculator</CardTitle>
              <CardDescription>
                Calculate your savings when paying visa fees with VHSY
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="amount">Visa Fee Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter visa fee amount"
                  value={calculatorAmount || ""}
                  onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              
              {calculatorAmount > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Traditional Payment</div>
                      <div className="text-2xl font-bold text-red-600">${calculatorAmount}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">With VHSY</div>
                      <div className="text-2xl font-bold text-green-600">
                        {calculateVHSYSavings(calculatorAmount).vhsyAmount.toFixed(0)} VHSY
                      </div>
                      <div className="text-sm text-gray-600">
                        (${calculateVHSYSavings(calculatorAmount).vhsyAmount.toFixed(2)})
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Your Savings</div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${calculateVHSYSavings(calculatorAmount).savings.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">20% saved!</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-center text-gray-600 mb-12">
            Top visa destinations accepting VHSY payments
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {immigrationData.map((item) => (
              <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">{item.country}</CardTitle>
                  <CardDescription>{item.visaType}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Traditional Fee:</span>
                    <span className="font-semibold text-red-600">${item.fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">VHSY Fee:</span>
                    <span className="font-semibold text-green-600">{item.feeInVHSY} VHSY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing:</span>
                    <span className="font-semibold">{item.processingTime}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Requirements:</div>
                    <ul className="text-sm space-y-1">
                      {item.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Pay with VHSY
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Country-Specific Adoption Rates */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Global Adoption Rates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryStats.map((stat, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-blue-200 text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">{stat.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-700 mb-2">{stat.countries}</div>
                  <div className="text-gray-600 mb-4">Countries</div>
                  <div className="text-2xl font-bold text-green-600">{stat.adoption}</div>
                  <div className="text-gray-600">VHSY Adoption</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-white/40 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">{story.name}</CardTitle>
                  <CardDescription>{story.country} Visa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">{story.savings} Saved</div>
                  <p className="text-gray-600 text-sm italic">&quot;{story.story}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}