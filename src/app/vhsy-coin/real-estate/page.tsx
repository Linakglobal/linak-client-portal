"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VHSYProperty } from "@/types/vhsy";

export default function VHSYRealEstatePage() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const properties: VHSYProperty[] = [
    {
      id: "1",
      title: "Luxury Condo in Downtown Miami",
      location: "Miami, FL, USA",
      price: 750000,
      priceInVHSY: 600000,
      type: "residential",
      status: "available",
      images: ["/property1.jpg"],
      features: ["3 Bedrooms", "2 Bathrooms", "Ocean View", "Pool"],
    },
    {
      id: "2",
      title: "Modern Office Building",
      location: "London, UK",
      price: 2500000,
      priceInVHSY: 2000000,
      type: "commercial",
      status: "available",
      images: ["/property2.jpg"],
      features: ["10 Floors", "Modern Design", "Prime Location", "Parking"],
    },
    {
      id: "3",
      title: "Beachfront Villa",
      location: "Bali, Indonesia",
      price: 450000,
      priceInVHSY: 360000,
      type: "residential",
      status: "available",
      images: ["/property3.jpg"],
      features: ["4 Bedrooms", "Private Beach", "Garden", "Pool"],
    },
    {
      id: "4",
      title: "Commercial Land Plot",
      location: "Dubai, UAE",
      price: 1200000,
      priceInVHSY: 960000,
      type: "land",
      status: "available",
      images: ["/property4.jpg"],
      features: ["5000 sqm", "Commercial Zone", "Prime Location", "Development Ready"],
    },
    {
      id: "5",
      title: "Mountain Cabin Retreat",
      location: "Colorado, USA",
      price: 320000,
      priceInVHSY: 256000,
      type: "residential",
      status: "available",
      images: ["/property5.jpg"],
      features: ["2 Bedrooms", "Mountain View", "Ski Access", "Fireplace"],
    },
    {
      id: "6",
      title: "Shopping Center",
      location: "Sydney, Australia",
      price: 3200000,
      priceInVHSY: 2560000,
      type: "commercial",
      status: "available",
      images: ["/property6.jpg"],
      features: ["50 Shops", "Food Court", "Parking", "High Traffic"],
    },
  ];

  const partnerships = [
    {
      name: "RE/MAX Global",
      logo: "🏢",
      properties: "25,000+",
      countries: "110",
    },
    {
      name: "Coldwell Banker",
      logo: "🏘️",
      properties: "15,000+",
      countries: "45",
    },
    {
      name: "Sotheby's Realty",
      logo: "🏛️",
      properties: "8,500+",
      countries: "70",
    },
    {
      name: "Century 21",
      logo: "🏠",
      properties: "30,000+",
      countries: "85",
    },
  ];

  const calculateROI = (investmentAmount: number) => {
    const annualReturn = investmentAmount * 0.12; // 12% annual return
    const monthlyReturn = annualReturn / 12;
    return { annualReturn, monthlyReturn };
  };

  const filteredProperties = selectedLocation === "all" 
    ? properties 
    : properties.filter(p => p.location.toLowerCase().includes(selectedLocation.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-green-900">VHSY</h1>
                <span className="ml-2 text-sm text-green-600">Real Estate</span>
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
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
            VHSY Real Estate
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Global property marketplace with tokenization, cross-border transactions, and investment opportunities powered by VHSY
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-700">10K+</div>
              <div className="text-gray-600 text-sm">Properties</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-emerald-700">85</div>
              <div className="text-gray-600 text-sm">Countries</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-teal-700">$2.5B</div>
              <div className="text-gray-600 text-sm">Total Value</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-700">12%</div>
              <div className="text-gray-600 text-sm">Avg. ROI</div>
            </div>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-green-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Property Investment Calculator</CardTitle>
              <CardDescription>
                Calculate potential returns on VHSY real estate investments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="investment">Investment Amount (VHSY)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="Enter investment amount"
                  value={investmentAmount || ""}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              
              {investmentAmount > 0 && (
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Annual Return</div>
                      <div className="text-2xl font-bold text-green-600">
                        {calculateROI(investmentAmount).annualReturn.toLocaleString()} VHSY
                      </div>
                      <div className="text-sm text-gray-600">12% APY</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Monthly Return</div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {calculateROI(investmentAmount).monthlyReturn.toLocaleString()} VHSY
                      </div>
                      <div className="text-sm text-gray-600">1% per month</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Property Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={selectedLocation === "all" ? "default" : "outline"}
              onClick={() => setSelectedLocation("all")}
              className="bg-green-600 hover:bg-green-700"
            >
              All Properties
            </Button>
            <Button
              variant={selectedLocation === "usa" ? "default" : "outline"}
              onClick={() => setSelectedLocation("usa")}
            >
              USA
            </Button>
            <Button
              variant={selectedLocation === "uk" ? "default" : "outline"}
              onClick={() => setSelectedLocation("uk")}
            >
              UK
            </Button>
            <Button
              variant={selectedLocation === "uae" ? "default" : "outline"}
              onClick={() => setSelectedLocation("uae")}
            >
              UAE
            </Button>
            <Button
              variant={selectedLocation === "australia" ? "default" : "outline"}
              onClick={() => setSelectedLocation("australia")}
            >
              Australia
            </Button>
          </div>
        </div>

        {/* Property Listings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-center text-gray-600 mb-12">
            Premium properties available for purchase with VHSY tokens
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="bg-white/60 backdrop-blur-sm border-green-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center">
                  <div className="text-4xl">🏠</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    📍 {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">USD Price:</span>
                    <span className="font-semibold text-red-600">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">VHSY Price:</span>
                    <span className="font-semibold text-green-600">{property.priceInVHSY.toLocaleString()} VHSY</span>
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    Save {((property.price - property.priceInVHSY * 1.25) / property.price * 100).toFixed(0)}% with VHSY
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Features:</div>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700" size="sm">
                      Buy with VHSY
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">International Partnerships</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-green-200 text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{partner.logo}</div>
                  <CardTitle className="text-lg text-green-800">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xl font-bold text-emerald-700">{partner.properties}</div>
                      <div className="text-gray-600 text-sm">Properties</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-teal-700">{partner.countries}</div>
                      <div className="text-gray-600 text-sm">Countries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tokenization Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Property Tokenization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Fractional Ownership</h3>
              <p className="text-gray-600">
                Own fractions of premium properties through blockchain tokenization
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Cross-Border Transactions</h3>
              <p className="text-gray-600">
                Seamless international property transactions without traditional banking delays
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Smart Contracts</h3>
              <p className="text-gray-600">
                Automated rental distribution and property management through smart contracts
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}