"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Eye,
  Upload,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";
import Link from "next/link";

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Demo documents data
  const documents = [
    {
      id: "DOC-001",
      name: "passport_copy.pdf",
      type: "Identity Document",
      status: "approved",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      description: "Valid passport for international travel",
    },
    {
      id: "DOC-002",
      name: "diploma_certificate.pdf",
      type: "Educational Document",
      status: "pending",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      description: "Bachelor's degree certificate",
    },
    {
      id: "DOC-003",
      name: "bank_statement.pdf",
      type: "Financial Document",
      status: "rejected",
      uploadDate: "2024-01-13",
      size: "3.2 MB",
      description: "Bank statement showing financial stability",
    },
    {
      id: "DOC-004",
      name: "employment_letter.pdf",
      type: "Employment Document",
      status: "approved",
      uploadDate: "2024-01-12",
      size: "1.1 MB",
      description: "Employment verification letter",
    },
    {
      id: "DOC-005",
      name: "medical_certificate.pdf",
      type: "Medical Document",
      status: "pending",
      uploadDate: "2024-01-11",
      size: "2.7 MB",
      description: "Medical examination results",
    },
    {
      id: "DOC-006",
      name: "language_test.pdf",
      type: "Language Certificate",
      status: "approved",
      uploadDate: "2024-01-10",
      size: "1.5 MB",
      description: "IELTS test results",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-gray-800/10 text-gray-300 border-gray-800/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ImmigrationPageWrapper>
      <div className="min-h-screen bg-transparent">
        {/* Header */}
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Documents
                </h1>
                <p className="text-slate-400">
                  Manage your immigration documents and track their status
                </p>
              </div>
              <Link href="/upload">
                <Button className="streamit-button">
                  <Upload size={18} className="mr-2" />
                  Upload New Document
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search */}
          <Card className="streamit-card mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="streamit-input pl-10"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="streamit-input min-w-[120px]"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card className="streamit-data-table">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                Your Documents ({filteredDocuments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-700/40 text-slate-400 text-sm font-medium">
                <div className="col-span-3">Document</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Upload Date</div>
                <div className="col-span-1">Size</div>
                <div className="col-span-2">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-700/40">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="grid grid-cols-12 gap-4 p-6 hover:bg-slate-800/20 transition-colors duration-200"
                  >
                    {/* Document Name & Description */}
                    <div className="col-span-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">
                            {doc.name}
                          </p>
                          <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Document Type */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-slate-300">{doc.type}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <Badge
                        className={`${getStatusColor(
                          doc.status
                        )} border flex items-center gap-1.5`}
                      >
                        {getStatusIcon(doc.status)}
                        <span className="capitalize">{doc.status}</span>
                      </Badge>
                    </div>

                    {/* Upload Date */}
                    <div className="col-span-2 flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>

                    {/* File Size */}
                    <div className="col-span-1 flex items-center text-slate-300">
                      {doc.size}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-300"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            Edit Description
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            Replace File
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-300 mb-2">
                    No documents found
                  </h3>
                  <p className="text-slate-400 mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Upload your first document to get started"}
                  </p>
                  <Link href="/upload">
                    <Button className="streamit-button">
                      <Upload size={18} className="mr-2" />
                      Upload Document
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ImmigrationPageWrapper>
  );
}
