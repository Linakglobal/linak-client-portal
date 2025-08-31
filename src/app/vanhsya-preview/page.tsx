"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Zap,
  TrendingUp,
  Users,
  BookOpen,
  MapPin,
  Calculator,
  MessageCircle,
  FileText,
  Trophy,
  DollarSign,
  Star,
  Play,
  Download,
  ArrowRight,
  BarChart3,
  Shield,
  Crown,
  Coins,
  Building,
  GraduationCap,
  Brain,
  Map,
  Plane,
  Camera,
  Bell
} from "lucide-react";

export default function VanhsyaPreview() {
  const [coinPrice, setCoinPrice] = useState(0.5823);

  // Simulate live coin price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinPrice(prev => prev + (Math.random() - 0.5) * 0.01);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
        <div className="flex items-center space-x-6 text-white/90 text-sm">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#coin" className="hover:text-white transition-colors">VHSY Coin</a>
          <a href="#ai-tools" className="hover:text-white transition-colors">AI Tools</a>
          <a href="#countries" className="hover:text-white transition-colors">Countries</a>
          <a href="#offices" className="hover:text-white transition-colors">Offices</a>
          <a href="#education" className="hover:text-white transition-colors">Education</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="text-center z-10 max-w-5xl mx-auto px-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              VANHSYA
            </h1>
            <p className="text-xl text-white/80 font-light tracking-wide">Immigration • Innovation • Intelligence</p>
          </div>

          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Immigration</span>
            <br />is Here
          </h2>

          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing global immigration with AI-powered tools, blockchain technology, 
            and comprehensive support across 195 countries.
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-yellow-400 mb-2">195</div>
              <div className="text-white/80">Countries Supported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-white/80">AI Tools Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl">
              <Play className="mr-2" size={20} />
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl">
              <Globe className="mr-2" size={20} />
              Explore Countries
            </Button>
          </div>
        </div>
      </section>

      {/* VHSY Coin Section */}
      <section id="coin" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">VHSY Coin</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The revolutionary cryptocurrency powering the global immigration ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Live Price Display */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-yellow-400 mb-2">
                  ${coinPrice.toFixed(4)}
                </div>
                <div className="text-green-400 text-lg">
                  +12.5% (24h)
                </div>
              </div>

              {/* Trading Interface Preview */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">Market Cap</span>
                  <span className="text-white font-bold">$2.4B</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">24h Volume</span>
                  <span className="text-white font-bold">$156M</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-white/80">Circulating Supply</span>
                  <span className="text-white font-bold">4.1B VHSY</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                <TrendingUp className="mr-2" size={18} />
                Trade VHSY
              </Button>
            </div>

            {/* Multi-Utility Showcase */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-8">Multi-Utility Token</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                  <CardHeader className="pb-3">
                    <Plane className="text-blue-400 mb-2" size={24} />
                    <CardTitle className="text-lg">Immigration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm">Pay for visa applications, legal services, and processing fees</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                  <CardHeader className="pb-3">
                    <Building className="text-green-400 mb-2" size={24} />
                    <CardTitle className="text-lg">Real Estate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm">Invest in properties worldwide with VHSY tokens</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                  <CardHeader className="pb-3">
                    <GraduationCap className="text-purple-400 mb-2" size={24} />
                    <CardTitle className="text-lg">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm">Access courses, certifications, and learning materials</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                  <CardHeader className="pb-3">
                    <Shield className="text-orange-400 mb-2" size={24} />
                    <CardTitle className="text-lg">Daily Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm">Spend on everyday services and merchant partnerships</p>
                  </CardContent>
                </Card>
              </div>

              {/* Staking Rewards Calculator */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
                <h4 className="text-xl font-bold text-white mb-4">Staking Rewards Calculator</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/80">Annual Yield</span>
                    <span className="text-green-400 font-bold">12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Your Stake: 1,000 VHSY</span>
                    <span className="text-white font-bold">~125 VHSY/year</span>
                  </div>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    <Coins className="mr-2" size={18} />
                    Start Staking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Showcase */}
      <section id="ai-tools" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">AI-Powered Tools</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Over 100 intelligent tools to streamline your immigration journey
            </p>
          </div>

          {/* Interactive Tool Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <Brain className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>Document Wizard</CardTitle>
                <CardDescription className="text-white/70">AI-powered document preparation and review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Generate, review, and optimize all required documents automatically
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Try Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <Calculator className="text-green-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>Eligibility Calculator</CardTitle>
                <CardDescription className="text-white/70">Instant eligibility assessment for any country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Get instant eligibility scores and recommendations
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Calculate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <MessageCircle className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription className="text-white/70">24/7 intelligent immigration support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Get instant answers to all your immigration questions
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Chat Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <FileText className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>Form Filler</CardTitle>
                <CardDescription className="text-white/70">Automated government form completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Auto-fill complex government forms with AI precision
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Start
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <BarChart3 className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>Success Predictor</CardTitle>
                <CardDescription className="text-white/70">AI-driven application success analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Predict your application success rate with 95% accuracy
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Analyze
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
              <CardHeader>
                <Crown className="text-pink-400 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <CardTitle>Premium Suite</CardTitle>
                <CardDescription className="text-white/70">Access to all 100+ AI tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-white/80 mb-4">
                  Unlock the complete AI toolkit for immigration success
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chatbot Interface Preview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">AI Assistant Demo</h3>
            <div className="bg-black/30 rounded-2xl p-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                    Hello! I want to immigrate to Canada. What are my options?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-white/20 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                    Great choice! Canada has several immigration programs. Based on your profile, I recommend the Express Entry system. Would you like me to assess your eligibility?
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <MessageCircle size={16} />
                  <span className="text-sm">AI is typing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Explorer */}
      <section id="countries" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Countries Explorer</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover immigration opportunities across 195 countries
            </p>
          </div>

          {/* Interactive World Map Placeholder */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
            <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <Map className="text-white/30" size={120} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Globe className="mx-auto mb-4 animate-spin" size={48} />
                  <p className="text-lg font-semibold">Interactive World Map</p>
                  <p className="text-white/70">Click on any country to explore opportunities</p>
                </div>
              </div>
              {/* Sample country markers */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Popular Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Canada", flag: "🇨🇦", pathways: 8, time: "6-12 months", success: "94%" },
              { name: "Australia", flag: "🇦🇺", pathways: 12, time: "8-15 months", success: "91%" },
              { name: "United States", flag: "🇺🇸", pathways: 15, time: "12-24 months", success: "87%" },
              { name: "Germany", flag: "🇩🇪", pathways: 6, time: "4-8 months", success: "92%" },
            ].map((country, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{country.flag}</div>
                  <CardTitle className="text-lg">{country.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Pathways</span>
                    <span className="font-semibold">{country.pathways}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Processing Time</span>
                    <span className="font-semibold">{country.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Success Rate</span>
                    <span className="font-semibold text-green-400">{country.success}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 mt-4">
                    Explore Pathways
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section id="offices" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Global Offices</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Local support in major cities worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { city: "New York", country: "USA", address: "Wall Street", team: 25, flag: "🇺🇸" },
              { city: "London", country: "UK", address: "Canary Wharf", team: 18, flag: "🇬🇧" },
              { city: "Toronto", country: "Canada", address: "Financial District", team: 22, flag: "🇨🇦" },
              { city: "Sydney", country: "Australia", address: "CBD", team: 15, flag: "🇦🇺" },
              { city: "Dubai", country: "UAE", address: "Business Bay", team: 20, flag: "🇦🇪" },
              { city: "Singapore", country: "Singapore", address: "Marina Bay", team: 12, flag: "🇸🇬" },
            ].map((office, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/15 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{office.flag}</span>
                        {office.city}
                      </CardTitle>
                      <CardDescription className="text-white/70">{office.country}</CardDescription>
                    </div>
                    <MapPin className="text-blue-400" size={24} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Location</span>
                    <span className="font-semibold">{office.address}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Team Size</span>
                    <span className="font-semibold">{office.team} experts</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 flex-1">
                      <Play className="mr-1" size={14} />
                      Virtual Tour
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 flex-1">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Portal */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Partner Portal</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join our global network of immigration experts and earn substantial commissions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Agent Dashboard Mockup */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Agent Dashboard</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Active Clients</span>
                    <span className="text-2xl font-bold text-blue-400">47</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Monthly Earnings</span>
                    <span className="text-2xl font-bold text-green-400">$12,450</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Success Rate</span>
                    <span className="text-2xl font-bold text-yellow-400">96%</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Partner Level</span>
                    <span className="text-lg font-bold text-purple-400 flex items-center">
                      <Crown className="mr-1" size={16} />
                      Gold Partner
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <DollarSign className="text-green-400 mb-2" size={32} />
                  <CardTitle>Commission Tracking</CardTitle>
                  <CardDescription className="text-white/70">Real-time commission tracking and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm mb-4">
                    Track every commission, bonus, and reward in real-time with detailed analytics
                  </p>
                  <div className="text-sm text-green-400">Up to 25% commission rates</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <FileText className="text-blue-400 mb-2" size={32} />
                  <CardTitle>Marketing Materials</CardTitle>
                  <CardDescription className="text-white/70">Professional marketing assets and tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm mb-4">
                    Access branded brochures, presentations, and digital marketing materials
                  </p>
                  <div className="text-sm text-blue-400">200+ ready-to-use assets</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <BookOpen className="text-purple-400 mb-2" size={32} />
                  <CardTitle>Training Center</CardTitle>
                  <CardDescription className="text-white/70">Comprehensive training and certification</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm mb-4">
                    Master immigration processes with our expert-led training programs
                  </p>
                  <div className="text-sm text-purple-400">50+ training modules</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Hub */}
      <section id="education" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Education Hub</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Master immigration processes with expert-led courses and certifications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Class Booking Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Upcoming Classes</CardTitle>
                  <CardDescription className="text-white/70">Book your next learning session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Canada Express Entry Masterclass", instructor: "Sarah Johnson", date: "Dec 15", time: "2:00 PM EST", spots: 12 },
                    { title: "US Visa Application Workshop", instructor: "Michael Chen", date: "Dec 18", time: "10:00 AM PST", spots: 8 },
                    { title: "Australia PR Pathway", instructor: "Emma Wilson", date: "Dec 20", time: "7:00 PM AEST", spots: 15 },
                  ].map((class_item, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{class_item.title}</h4>
                        <span className="text-xs bg-green-600 px-2 py-1 rounded-full">{class_item.spots} spots left</span>
                      </div>
                      <p className="text-white/70 text-sm mb-2">By {class_item.instructor}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">{class_item.date} at {class_item.time}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Learning Stats */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <Trophy className="text-yellow-400 mb-2" size={32} />
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Courses Completed</span>
                      <span className="font-semibold">12/20</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Certification Progress</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardHeader>
                  <Star className="text-orange-400 mb-2" size={32} />
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Crown size={16} className="text-yellow-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Immigration Expert</p>
                      <p className="text-white/70 text-xs">Completed advanced certification</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Community Leader</p>
                      <p className="text-white/70 text-xs">Helped 50+ students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Webinar Calendar */}
          <div className="mt-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">This Week&apos;s Webinars</CardTitle>
                <CardDescription className="text-white/70">Free educational sessions with immigration experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Latest Immigration Policy Updates", host: "Immigration Law Firm", date: "Mon, Dec 16", attendees: 245 },
                    { title: "Student Visa Success Stories", host: "Education Consultants", date: "Wed, Dec 18", attendees: 189 },
                    { title: "Investment Immigration Opportunities", host: "Financial Advisors", date: "Fri, Dec 20", attendees: 156 },
                  ].map((webinar, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-2">{webinar.title}</h4>
                      <p className="text-white/70 text-sm mb-2">By {webinar.host}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/80">{webinar.date}</span>
                        <span className="text-green-400">{webinar.attendees} registered</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3 border-white/30 text-white hover:bg-white/10">
                        <Play className="mr-1" size={14} />
                        Join Webinar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile App Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Mobile App</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Take VANHSYA with you anywhere. Available on iOS and Android
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* App Screenshots */}
            <div className="relative">
              <div className="flex justify-center space-x-6">
                {/* iPhone Mockup */}
                <div className="bg-gray-900 rounded-3xl p-2 w-64">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl h-96 flex flex-col">
                    <div className="p-4 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold">VANHSYA</h4>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">Application Status</div>
                          <div className="text-sm font-semibold">Canada PR - In Progress</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">Next Step</div>
                          <div className="text-sm font-semibold">Medical Exam</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">AI Assistant</div>
                          <div className="text-sm">Ask me anything...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Android Mockup */}
                <div className="bg-gray-900 rounded-2xl p-2 w-64">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl h-96 flex flex-col">
                    <div className="p-4 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold">VANHSYA</h4>
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">VHSY Balance</div>
                          <div className="text-lg font-bold">1,250.45 VHSY</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">Document Scan</div>
                          <div className="text-sm font-semibold">Tap to scan documents</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-xs mb-1">Quick Actions</div>
                          <div className="flex space-x-2">
                            <div className="w-8 h-8 bg-white/30 rounded"></div>
                            <div className="w-8 h-8 bg-white/30 rounded"></div>
                            <div className="w-8 h-8 bg-white/30 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Features */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Key Features</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Brain size={24} />, title: "AI-Powered Assistance", desc: "Get instant help and guidance" },
                    { icon: <Camera size={24} />, title: "Document Scanner", desc: "Scan and digitize documents instantly" },
                    { icon: <Zap size={24} />, title: "Real-time Updates", desc: "Track your application progress live" },
                    { icon: <Coins size={24} />, title: "VHSY Wallet", desc: "Manage your tokens and payments" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-blue-400 mt-1">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-white/70 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Buttons */}
              <div className="space-y-4">
                <Button className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-xl">
                  <Download className="mr-3" size={24} />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
                <Button className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-xl">
                  <Download className="mr-3" size={24} />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Immigration Journey?</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of successful immigrants who chose VANHSYA for their journey to a new life
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-xl">
              <ArrowRight className="mr-3" size={24} />
              Start Your Journey Today
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-xl">
              <MessageCircle className="mr-3" size={24} />
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">VANHSYA</h3>
              <p className="text-white/70 mb-4">
                Revolutionizing immigration with AI technology and blockchain innovation.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-white/70">
                <li>Immigration Consulting</li>
                <li>AI Tools & Assessment</li>
                <li>Document Processing</li>
                <li>Legal Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">VHSY Coin</h4>
              <ul className="space-y-2 text-white/70">
                <li>Token Economics</li>
                <li>Staking Rewards</li>
                <li>Trading Platform</li>
                <li>Utility Features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Partner Program</li>
                <li>Education Hub</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2024 VANHSYA. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}