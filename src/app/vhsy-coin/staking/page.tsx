"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VHSYStakingPool } from "@/types/vhsy";

export default function VHSYStakingPage() {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [selectedPool, setSelectedPool] = useState<string>("");

  const stakingPools: VHSYStakingPool[] = [
    {
      id: "1",
      name: "Flexible Staking",
      apy: 8.5,
      lockPeriod: 0,
      minStake: 100,
      totalStaked: 5000000,
      isActive: true,
    },
    {
      id: "2", 
      name: "30-Day Lock",
      apy: 12.0,
      lockPeriod: 30,
      minStake: 500,
      totalStaked: 8500000,
      isActive: true,
    },
    {
      id: "3",
      name: "90-Day Lock", 
      apy: 18.5,
      lockPeriod: 90,
      minStake: 1000,
      totalStaked: 12000000,
      isActive: true,
    },
    {
      id: "4",
      name: "1-Year Lock",
      apy: 25.0,
      lockPeriod: 365,
      minStake: 5000,
      totalStaked: 15000000,
      isActive: true,
    },
  ];

  const calculateRewards = (amount: number, apy: number, days: number = 365) => {
    const annualReward = amount * (apy / 100);
    const dailyReward = annualReward / 365;
    const periodReward = dailyReward * days;
    return { annualReward, dailyReward, periodReward };
  };

  const getSelectedPoolData = () => {
    return stakingPools.find(pool => pool.id === selectedPool);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-900">VHSY</h1>
                <span className="ml-2 text-sm text-indigo-600">Staking</span>
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
          <div className="text-6xl mb-6">💰</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            VHSY Staking
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Earn passive income by staking VHSY tokens with flexible terms and competitive APY rates up to 25%
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-700">40.5M</div>
              <div className="text-gray-600 text-sm">Total Staked</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-purple-700">25%</div>
              <div className="text-gray-600 text-sm">Max APY</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-blue-700">4</div>
              <div className="text-gray-600 text-sm">Pool Options</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-700">15K+</div>
              <div className="text-gray-600 text-sm">Stakers</div>
            </div>
          </div>
        </div>

        {/* Staking Calculator */}
        <div className="mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-indigo-200 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-indigo-800">Staking Rewards Calculator</CardTitle>
              <CardDescription>
                Calculate your potential rewards from VHSY staking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="amount">Stake Amount (VHSY)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount to stake"
                    value={stakeAmount || ""}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="pool">Select Staking Pool</Label>
                  <select
                    id="pool"
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Choose a pool</option>
                    {stakingPools.map((pool) => (
                      <option key={pool.id} value={pool.id}>
                        {pool.name} - {pool.apy}% APY
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {stakeAmount > 0 && selectedPool && (
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Daily Rewards</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {calculateRewards(stakeAmount, getSelectedPoolData()?.apy || 0).dailyReward.toFixed(2)} VHSY
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Monthly Rewards</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {(calculateRewards(stakeAmount, getSelectedPoolData()?.apy || 0).dailyReward * 30).toFixed(2)} VHSY
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-700">Annual Rewards</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {calculateRewards(stakeAmount, getSelectedPoolData()?.apy || 0).annualReward.toFixed(2)} VHSY
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Staking Pools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Staking Pools</h2>
          <p className="text-center text-gray-600 mb-12">
            Choose from flexible staking options with varying lock periods and APY rates
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakingPools.map((pool) => (
              <Card key={pool.id} className="bg-white/60 backdrop-blur-sm border-indigo-200 relative overflow-hidden">
                {pool.apy >= 20 && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    POPULAR
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-indigo-800">{pool.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-700">{pool.apy}%</div>
                  <CardDescription>Annual Percentage Yield</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lock Period:</span>
                      <span className="font-semibold">
                        {pool.lockPeriod === 0 ? "Flexible" : `${pool.lockPeriod} days`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min. Stake:</span>
                      <span className="font-semibold">{pool.minStake.toLocaleString()} VHSY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Staked:</span>
                      <span className="font-semibold">{(pool.totalStaked / 1000000).toFixed(1)}M VHSY</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((pool.totalStaked / 20000000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    disabled={!pool.isActive}
                  >
                    {pool.isActive ? "Stake Now" : "Pool Full"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Governance & Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Staking Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Governance Rights</h3>
              <p className="text-gray-600">
                Staked VHSY tokens grant voting power in ecosystem governance decisions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Compound Rewards</h3>
              <p className="text-gray-600">
                Automatically compound your staking rewards for maximum growth
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Secure Smart Contracts</h3>
              <p className="text-gray-600">
                Audited smart contracts ensure the security of your staked tokens
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}