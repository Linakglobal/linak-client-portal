"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VHSYEducationPage() {
  const universities = [
    { name: "Harvard University", country: "USA", tuition: 50000, vhsyTuition: 40000 },
    { name: "Oxford University", country: "UK", tuition: 45000, vhsyTuition: 36000 },
    { name: "MIT", country: "USA", tuition: 52000, vhsyTuition: 41600 },
    { name: "Stanford University", country: "USA", tuition: 51000, vhsyTuition: 40800 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-violet-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-violet-900">VHSY</h1>
                <span className="ml-2 text-sm text-violet-600">Education</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/vhsy-coin">
                <Button variant="outline" size="sm">Back to Hub</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent mb-4">
            VHSY Education
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Pay tuition fees with VHSY at 500+ partner universities worldwide with 20% savings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {universities.map((uni, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-violet-200">
              <CardHeader>
                <CardTitle className="text-xl text-violet-800">{uni.name}</CardTitle>
                <CardDescription>{uni.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Traditional Tuition:</span>
                    <span className="font-semibold text-red-600">${uni.tuition.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VHSY Tuition:</span>
                    <span className="font-semibold text-green-600">{uni.vhsyTuition.toLocaleString()} VHSY</span>
                  </div>
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 mt-4">
                    Apply with VHSY
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}