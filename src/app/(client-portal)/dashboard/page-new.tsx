"use client";

import { useEffect } from "react";
import { useClientStore } from "@/hooks/use-client-store";
import { getClientDocuments } from "@/lib/supabase/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  User,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  Globe,
  Shield,
} from "lucide-react";
import Link from "next/link";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";

export default function DashboardPage() {
  const { client, setClient, setDocuments, setLoading } = useClientStore();

  useEffect(() => {
    // Load demo client from localStorage if not already loaded
    if (!client && typeof window !== "undefined") {
      const demoClient = localStorage.getItem("demo-client");
      if (demoClient) {
        const parsedClient = JSON.parse(demoClient);
        setClient(parsedClient);
      }
    }
  }, [client, setClient]);

  useEffect(() => {
    const loadDocuments = async () => {
      if (!client) return;

      try {
        setLoading(true);
        const clientDocuments = await getClientDocuments(client.id);
        setDocuments(clientDocuments);
      } catch (error) {
        console.error("Error loading documents:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [client, setDocuments, setLoading]);

  // Demo data for dashboard metrics
  const dashboardStats = [
    {
      title: "Total Documents",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/10",
    },
    {
      title: "Applications",
      value: "8",
      change: "+3",
      icon: Globe,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-600/10",
    },
    {
      title: "Pending Reviews",
      value: "5",
      change: "-2",
      icon: Clock,
      color: "text-gray-300",
      bgColor: "from-gray-800/20 to-gray-900/10",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-red-400",
      bgColor: "from-red-500/20 to-red-600/10",
    },
  ];

  const recentActivities = [
    {
      action: "Document Uploaded",
      item: "Passport Copy",
      time: "2 hours ago",
      status: "pending",
    },
    {
      action: "Application Submitted",
      item: "Work Permit - Canada",
      time: "1 day ago",
      status: "approved",
    },
    {
      action: "Review Completed",
      item: "Educational Documents",
      time: "2 days ago",
      status: "approved",
    },
    {
      action: "Interview Scheduled",
      item: "Visa Application",
      time: "3 days ago",
      status: "pending",
    },
    {
      action: "Document Requested",
      item: "Bank Statement",
      time: "1 week ago",
      status: "rejected",
    },
  ];

  return (
    <ImmigrationPageWrapper>
      <div className="min-h-screen bg-transparent">
        {/* Dashboard Header */}
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Dashboard
                </h1>
                <p className="text-slate-400">
                  Welcome back! Here's your migration progress overview.
                </p>
              </div>
              <div className="flex space-x-3">
                <Link href="/upload">
                  <Button className="streamit-button">
                    <Upload size={18} className="mr-2" />
                    Upload Document
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Streamit Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="streamit-metric-card group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm ${
                          stat.change.startsWith("+")
                            ? "text-green-400"
                            : stat.change.startsWith("-")
                            ? "text-red-400"
                            : "text-gray-300"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="streamit-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-red-400" />
                    </div>
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-red-500/20 transition-colors duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.status === "approved"
                                ? "bg-green-400"
                                : activity.status === "pending"
                                ? "bg-gray-400"
                                : "bg-red-400"
                            }`}
                          />
                          <div>
                            <p className="text-white font-medium">
                              {activity.action}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {activity.item}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-sm">
                            {activity.time}
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              activity.status === "approved"
                                ? "bg-green-500/10 text-green-400"
                                : activity.status === "pending"
                                ? "bg-gray-800/10 text-gray-300"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card className="streamit-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Link href="/documents" className="block">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-red-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                        <div>
                          <p className="text-white font-medium">
                            View Documents
                          </p>
                          <p className="text-slate-400 text-sm">
                            Manage your files
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/upload" className="block">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-red-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <Upload className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                        <div>
                          <p className="text-white font-medium">Upload Files</p>
                          <p className="text-slate-400 text-sm">
                            Add new documents
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/profile" className="block">
                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-red-500/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                        <div>
                          <p className="text-white font-medium">
                            Update Profile
                          </p>
                          <p className="text-slate-400 text-sm">
                            Personal information
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              {/* Status Overview */}
              <Card className="streamit-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-400" />
                    Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">Approved</span>
                      </div>
                      <span className="text-white font-semibold">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-300" />
                        <span className="text-slate-300">Pending</span>
                      </div>
                      <span className="text-white font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-slate-300">Action Required</span>
                      </div>
                      <span className="text-white font-semibold">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ImmigrationPageWrapper>
  );
}
