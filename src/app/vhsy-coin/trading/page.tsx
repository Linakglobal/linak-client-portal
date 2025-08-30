"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VHSYTradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-emerald-900">VHSY</h1>
                <span className="ml-2 text-sm text-emerald-600">Trading</span>
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
          <div className="text-6xl mb-6">📈</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-4">
            VHSY Trading
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trade VHSY on integrated DEX with advanced charts, liquidity pools, and cross-chain support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">📊</div>
              <CardTitle className="text-xl text-emerald-800">Advanced Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Professional trading tools and real-time market data</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">💧</div>
              <CardTitle className="text-xl text-emerald-800">Liquidity Pools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Provide liquidity and earn trading fees</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🌐</div>
              <CardTitle className="text-xl text-emerald-800">Cross-Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Trade across multiple blockchain networks</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trading Pairs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="font-bold">VHSY/USDT</div>
              <div className="text-green-600">$1.25 (+5.67%)</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="font-bold">VHSY/ETH</div>
              <div className="text-green-600">0.0005 (+3.21%)</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="font-bold">VHSY/BTC</div>
              <div className="text-green-600">0.000025 (+2.14%)</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="font-bold">VHSY/BNB</div>
              <div className="text-green-600">0.002 (+4.56%)</div>
            </div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 mt-6">
            Start Trading
          </Button>
        </div>
      </main>
    </div>
  );
}