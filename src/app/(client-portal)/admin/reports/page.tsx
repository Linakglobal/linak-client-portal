"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ExternalLink,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Report {
  id: string;
  client_name: string;
  client_email: string;
  client_id: string;
  post_link: string;
  screenshot_url?: string;
  explanation: string;
  status: "pending" | "verified" | "rejected" | "resolved";
  reward_amount: number;
  reward_status: "pending" | "approved" | "paid";
  created_at: string;
  verified_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      // Fetch from API - this would connect to your database
      const response = await fetch("/api/admin/reports");
      if (!response.ok) {
        // Fallback to mock data for development
        const mockReports: Report[] = [
          {
            id: "1",
            client_name: "Priya Sharma",
            client_email: "priya.sharma@email.com",
            client_id: "LNK-2025-001234",
            post_link: "https://fakereviews.com/linak-scam-alert",
            screenshot_url: "https://example.com/screenshot1.png",
            explanation:
              "This post contains completely false information about LINAK charging hidden fees and having poor success rates. The author claims we charged ₹50,000 extra fees which never happened.",
            status: "pending",
            reward_amount: 25000,
            reward_status: "pending",
            created_at: "2025-08-07T10:30:00Z",
          },
          {
            id: "2",
            client_name: "Rajesh Kumar",
            client_email: "rajesh.k@gmail.com",
            client_id: "LNK-2025-001235",
            post_link: "https://socialmedia.com/linak-fraud-warning",
            screenshot_url: "https://example.com/screenshot2.png",
            explanation:
              "This social media post is spreading false rumors about LINAK being involved in visa fraud. The claims are completely baseless and damaging our reputation.",
            status: "verified",
            reward_amount: 25000,
            reward_status: "approved",
            created_at: "2025-08-06T14:20:00Z",
            verified_at: "2025-08-06T16:45:00Z",
            notes:
              "Verified as legitimate defamatory content. Reward approved.",
          },
          {
            id: "3",
            client_name: "Anita Patel",
            client_email: "anita.patel@yahoo.com",
            client_id: "LNK-2025-001236",
            post_link: "https://reviewsite.com/linak-terrible-service",
            explanation:
              "This review claims LINAK never responds to clients and has 0% success rate. This is factually incorrect as we have documented success rates and response times.",
            status: "rejected",
            reward_amount: 25000,
            reward_status: "pending",
            created_at: "2025-08-05T09:15:00Z",
            verified_at: "2025-08-05T11:30:00Z",
            notes:
              "While negative, this appears to be a genuine customer complaint rather than defamatory content.",
          },
        ];
        setReports(mockReports);
      } else {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Error loading reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    status: "verified" | "rejected",
    notes: string
  ) => {
    try {
      const response = await fetch("/api/admin/reports/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update report");
      }

      // Update local state
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status,
                notes,
                verified_at: new Date().toISOString(),
                reward_status: status === "verified" ? "approved" : "pending",
              }
            : report
        )
      );

      toast.success(`Report ${status} successfully`);
      setSelectedReport(null);
      setReviewNotes("");
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "verified":
        return (
          <Badge
            variant="default"
            className="bg-green-500/20 text-green-300 border-green-500/30"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="destructive"
            className="bg-red-500/20 text-red-300 border-red-500/30"
          >
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/20 text-blue-300 border-blue-500/30"
          >
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filterReportsByStatus = (status?: string) => {
    if (!status || status === "all") return reports;
    return reports.filter((report) => report.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full bg-repeat bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-8 h-8 text-purple-400" />
                  <h1 className="text-3xl font-bold text-white">
                    Defamation Reports
                  </h1>
                </div>
                <p className="text-slate-400">
                  Review and manage client-submitted defamation reports
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Admin Panel</p>
              <p className="text-white font-medium">LINAK Migration Service</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Total Reports
                </CardTitle>
                <Clock className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {reports.length}
                </div>
                <p className="text-xs text-slate-400">All time submissions</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Pending Review
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {reports.filter((r) => r.status === "pending").length}
                </div>
                <p className="text-xs text-slate-400">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Verified Reports
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {reports.filter((r) => r.status === "verified").length}
                </div>
                <p className="text-xs text-slate-400">Rewards approved</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Total Rewards
                </CardTitle>
                <div className="text-green-400 font-bold">₹</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  ₹
                  {(
                    reports.filter((r) => r.status === "verified").length *
                    25000
                  ).toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">Approved payouts</p>
              </CardContent>
            </Card>
          </div>

          {/* Reports Table */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="bg-slate-800/50 backdrop-blur border border-slate-700/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-600"
              >
                All Reports ({reports.length})
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-yellow-600"
              >
                Pending ({reports.filter((r) => r.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="data-[state=active]:bg-green-600"
              >
                Verified (
                {reports.filter((r) => r.status === "verified").length})
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-red-600"
              >
                Rejected (
                {reports.filter((r) => r.status === "rejected").length})
              </TabsTrigger>
            </TabsList>

            {["all", "pending", "verified", "rejected"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>
                <Card className="bg-slate-800/50 backdrop-blur border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {tabValue === "all"
                        ? "All Reports"
                        : tabValue === "pending"
                        ? "Pending Reports"
                        : tabValue === "verified"
                        ? "Verified Reports"
                        : "Rejected Reports"}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {tabValue === "all"
                        ? "Complete list of defamation reports submitted by clients"
                        : tabValue === "pending"
                        ? "Reports waiting for review and verification"
                        : tabValue === "verified"
                        ? "Reports that have been verified and rewards approved"
                        : "Reports that have been reviewed and rejected"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-200">
                            Client
                          </TableHead>
                          <TableHead className="text-slate-200">
                            Post Link
                          </TableHead>
                          <TableHead className="text-slate-200">
                            Status
                          </TableHead>
                          <TableHead className="text-slate-200">
                            Reward
                          </TableHead>
                          <TableHead className="text-slate-200">
                            Submitted
                          </TableHead>
                          <TableHead className="text-slate-200">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterReportsByStatus(tabValue).map((report) => (
                          <TableRow
                            key={report.id}
                            className="border-slate-700 hover:bg-slate-700/30"
                          >
                            <TableCell className="text-slate-200">
                              <div>
                                <div className="font-medium">
                                  {report.client_name}
                                </div>
                                <div className="text-sm text-slate-400">
                                  {report.client_id}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {report.client_email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-200 max-w-xs">
                              <a
                                href={report.post_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-400 hover:text-blue-300 text-sm truncate"
                              >
                                <span className="truncate">
                                  {report.post_link}
                                </span>
                                <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                              </a>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(report.status)}
                            </TableCell>
                            <TableCell className="text-slate-200">
                              ₹{report.reward_amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-slate-400">
                              <div className="text-sm">
                                {new Date(
                                  report.created_at
                                ).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(
                                  report.created_at
                                ).toLocaleTimeString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedReport(report)}
                                    className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600"
                                  >
                                    <Eye className="w-3 h-3 mr-1" />
                                    Review
                                  </Button>
                                </DialogTrigger>

                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800/95 backdrop-blur border-slate-700">
                                  <DialogHeader>
                                    <DialogTitle className="text-white flex items-center space-x-2">
                                      <Shield className="w-5 h-5 text-purple-400" />
                                      <span>
                                        Review Report -{" "}
                                        {selectedReport?.client_id}
                                      </span>
                                    </DialogTitle>
                                  </DialogHeader>

                                  {selectedReport && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                              <span>Client Information</span>
                                            </h4>
                                            <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg space-y-3 border border-slate-700/50">
                                              <p className="text-slate-200">
                                                <strong className="text-white">
                                                  Name:
                                                </strong>{" "}
                                                {selectedReport.client_name}
                                              </p>
                                              <p className="text-slate-200">
                                                <strong className="text-white">
                                                  Email:
                                                </strong>{" "}
                                                {selectedReport.client_email}
                                              </p>
                                              <p className="text-slate-200">
                                                <strong className="text-white">
                                                  Client ID:
                                                </strong>{" "}
                                                {selectedReport.client_id}
                                              </p>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                              <span>Report Status</span>
                                            </h4>
                                            <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg space-y-3 border border-slate-700/50">
                                              <div className="flex items-center space-x-2">
                                                <strong className="text-white">
                                                  Status:
                                                </strong>
                                                {getStatusBadge(
                                                  selectedReport.status
                                                )}
                                              </div>
                                              <p className="text-slate-200">
                                                <strong className="text-white">
                                                  Reward Amount:
                                                </strong>{" "}
                                                ₹
                                                {selectedReport.reward_amount.toLocaleString()}
                                              </p>
                                              <p className="text-slate-200">
                                                <strong className="text-white">
                                                  Submitted:
                                                </strong>{" "}
                                                {new Date(
                                                  selectedReport.created_at
                                                ).toLocaleString()}
                                              </p>
                                              {selectedReport.verified_at && (
                                                <p className="text-slate-200">
                                                  <strong className="text-white">
                                                    Reviewed:
                                                  </strong>{" "}
                                                  {new Date(
                                                    selectedReport.verified_at
                                                  ).toLocaleString()}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                              <span>Reported Content</span>
                                            </h4>
                                            <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg border border-slate-700/50">
                                              <a
                                                href={selectedReport.post_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 break-all text-sm flex items-start space-x-2"
                                              >
                                                <span className="flex-1">
                                                  {selectedReport.post_link}
                                                </span>
                                                <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                              </a>
                                            </div>
                                          </div>

                                          {selectedReport.screenshot_url && (
                                            <div>
                                              <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <span>Screenshot Evidence</span>
                                              </h4>
                                              <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg border border-slate-700/50">
                                                <a
                                                  href={
                                                    selectedReport.screenshot_url
                                                  }
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                                                >
                                                  <span>
                                                    View Screenshot Evidence
                                                  </span>
                                                  <ExternalLink className="w-4 h-4" />
                                                </a>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                          <span>
                                            Client&apos;s Detailed Explanation
                                          </span>
                                        </h4>
                                        <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg border border-slate-700/50">
                                          <p className="text-slate-200 leading-relaxed">
                                            {selectedReport.explanation}
                                          </p>
                                        </div>
                                      </div>

                                      {selectedReport.status === "pending" && (
                                        <div className="space-y-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                                          <div>
                                            <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                              <span>Admin Review Notes</span>
                                            </h4>
                                            <Textarea
                                              value={reviewNotes}
                                              onChange={(e) =>
                                                setReviewNotes(e.target.value)
                                              }
                                              placeholder="Add your review notes here..."
                                              className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-purple-500"
                                              rows={4}
                                            />
                                          </div>

                                          <div className="flex space-x-4">
                                            <Button
                                              onClick={() =>
                                                updateReportStatus(
                                                  selectedReport.id,
                                                  "verified",
                                                  reviewNotes
                                                )
                                              }
                                              className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                            >
                                              <CheckCircle className="w-4 h-4 mr-2" />
                                              Verify & Approve ₹
                                              {selectedReport.reward_amount.toLocaleString()}{" "}
                                              Reward
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                updateReportStatus(
                                                  selectedReport.id,
                                                  "rejected",
                                                  reviewNotes
                                                )
                                              }
                                              variant="destructive"
                                              className="flex-1"
                                            >
                                              <XCircle className="w-4 h-4 mr-2" />
                                              Reject Report
                                            </Button>
                                          </div>
                                        </div>
                                      )}

                                      {selectedReport.notes && (
                                        <div>
                                          <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                            <span>Admin Review Notes</span>
                                          </h4>
                                          <div className="bg-slate-900/50 backdrop-blur p-4 rounded-lg border border-slate-700/50">
                                            <p className="text-slate-200 leading-relaxed italic">
                                              &ldquo;{selectedReport.notes}
                                              &rdquo;
                                            </p>
                                            {selectedReport.verified_at && (
                                              <p className="text-slate-400 text-sm mt-2">
                                                — Reviewed on{" "}
                                                {new Date(
                                                  selectedReport.verified_at
                                                ).toLocaleString()}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filterReportsByStatus(tabValue).length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-slate-400 mb-2">
                          {tabValue === "all"
                            ? "No reports found"
                            : `No ${tabValue} reports found`}
                        </div>
                        <p className="text-slate-500 text-sm">
                          {tabValue === "pending"
                            ? "All reports have been reviewed"
                            : tabValue === "verified"
                            ? "No reports have been verified yet"
                            : tabValue === "rejected"
                            ? "No reports have been rejected yet"
                            : "Reports will appear here when submitted"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
