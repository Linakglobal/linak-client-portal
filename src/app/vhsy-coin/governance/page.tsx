"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VHSYGovernancePage() {
  const proposals = [
    { id: 1, title: "Increase Staking Rewards", status: "Active", votesFor: 125000, votesAgainst: 25000 },
    { id: 2, title: "Add New Trading Pair", status: "Passed", votesFor: 200000, votesAgainst: 15000 },
    { id: 3, title: "Partnership with PayPal", status: "Active", votesFor: 95000, votesAgainst: 45000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/vhsy-coin" className="flex items-center">
                <h1 className="text-2xl font-bold text-slate-900">VHSY</h1>
                <span className="ml-2 text-sm text-slate-600">Governance</span>
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
          <div className="text-6xl mb-6">🗳️</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent mb-4">
            VHSY Governance
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Participate in DAO voting, submit proposals, and shape the future of the VHSY ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">150K+</CardTitle>
              <CardDescription>Total Voters</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">25</CardTitle>
              <CardDescription>Active Proposals</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">85%</CardTitle>
              <CardDescription>Avg. Participation</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Active Proposals</h2>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-800">{proposal.title}</CardTitle>
                      <CardDescription>Proposal #{proposal.id}</CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      proposal.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {proposal.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="font-semibold text-green-600">
                        For: {proposal.votesFor.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-red-600">
                        Against: {proposal.votesAgainst.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  {proposal.status === 'Active' && (
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">Vote For</Button>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Vote Against
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit a Proposal</h2>
          <p className="text-gray-600 mb-6">
            Have an idea to improve the VHSY ecosystem? Submit your proposal for community voting.
          </p>
          <Button className="bg-slate-700 hover:bg-slate-800">
            Submit Proposal
          </Button>
        </div>
      </main>
    </div>
  );
}