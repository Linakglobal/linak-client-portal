"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VHSYWalletPage() {
  const [walletBalance] = useState(125000);
  const [stakedBalance] = useState(75000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-teal-900">VHSY</h1>
                <span className="ml-2 text-sm text-teal-600">Wallet</span>
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
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4">
            VHSY Wallet
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Secure multi-signature wallet with hardware integration, mobile support, and advanced security features
          </p>
        </div>

        {/* Wallet Balance */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-teal-800">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-4xl font-bold text-teal-700">
                    {walletBalance.toLocaleString()} VHSY
                  </div>
                  <div className="text-gray-600">Available Balance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-700">
                    {stakedBalance.toLocaleString()} VHSY
                  </div>
                  <div className="text-gray-600">Staked Balance</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Button className="bg-teal-600 hover:bg-teal-700">Send</Button>
                  <Button variant="outline">Receive</Button>
                  <Button variant="outline">Stake</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🔒</div>
              <CardTitle className="text-xl text-teal-800">Multi-Signature</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Enhanced security with multi-signature authentication</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">💾</div>
              <CardTitle className="text-xl text-teal-800">Hardware Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Compatible with Ledger and Trezor hardware wallets</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-teal-200 text-center">
            <CardHeader>
              <div className="text-4xl mb-4">📱</div>
              <CardTitle className="text-xl text-teal-800">Mobile App</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Full-featured mobile wallet for iOS and Android</p>
            </CardContent>
          </Card>
        </div>

        {/* Download Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-teal-200 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Download VHSY Wallet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🖥️</div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Desktop</h3>
              <p className="text-gray-600 mb-4">Windows, macOS, Linux</p>
              <Button className="bg-teal-600 hover:bg-teal-700">Download</Button>
            </div>
            <div>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Mobile</h3>
              <p className="text-gray-600 mb-4">iOS and Android</p>
              <Button className="bg-teal-600 hover:bg-teal-700">Get App</Button>
            </div>
            <div>
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Web Wallet</h3>
              <p className="text-gray-600 mb-4">Browser-based access</p>
              <Button className="bg-teal-600 hover:bg-teal-700">Launch</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}