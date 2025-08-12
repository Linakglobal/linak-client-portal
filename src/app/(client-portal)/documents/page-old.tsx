"use client";

import { useEffect, useState } from "react";
import { useClientStore } from "@/hooks/use-client-store";
import {
  getClientDocuments,
  getDocumentDownloadUrl,
  deleteDocument,
} from "@/lib/supabase/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatDateTime,
  formatFileSize,
  getFileIcon,
  getStatusColor,
  truncateText,
} from "@/lib/utils/helpers";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Trash2,
  Upload,
  Calendar,
  File,
  Loader2,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";
import { Document } from "@/types";

export default function DocumentsPage() {
  const { client, documents, setDocuments, setLoading } = useClientStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Filter documents based on search term and status
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = async (document: Document) => {
    try {
      const downloadUrl = await getDocumentDownloadUrl(document.file_path);
      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleDelete = async (document: Document) => {
    try {
      setIsDeleting(true);
      const success = await deleteDocument(document.id, document.file_path);
      if (success) {
        setDocuments(documents.filter((doc) => doc.id !== document.id));
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">
            Manage and view all your uploaded documents
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No documents yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start by uploading your first document to get started
            </p>
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">
            {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
            uploaded
          </p>
        </div>
        <Link href="/upload">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Status:{" "}
                  {statusFilter === "all"
                    ? "All"
                    : statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="rounded-none border-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-none border-0 border-l"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Display */}
      {filteredDocuments.length === 0 ? (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">
              No documents found matching your criteria
            </p>
          </CardContent>
        </Card>
      ) : null}

      {/* Molecular Table View */}
      {filteredDocuments.length > 0 && viewMode === "table" && (
        <>
          <div className="molecular-connections"></div>
          <table className="molecular-table table-responsive-stack">
            <thead>
              <tr>
                <th>Document</th>
                <th>Status</th>
                <th>Upload Date</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => {
                const getStatusIndicatorClass = () => {
                  if (document.status === "completed") return "status-active";
                  if (document.status === "processing") return "status-pending";
                  return "status-inactive";
                };

                return (
                  <tr key={document.id}>
                    <td data-label="Document">
                      <div className="flex items-center gap-3">
                        {getFileIcon(document.file_name)}
                        <div>
                          <div className="font-medium text-white">
                            {truncateText(document.file_name, 30)}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {truncateText(document.description, 50)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Status">
                      <div className="flex items-center gap-2">
                        <span
                          className={`status-indicator ${getStatusIndicatorClass()}`}
                        ></span>
                        <Badge
                          variant={
                            getStatusColor(document.status) as
                              | "default"
                              | "secondary"
                              | "destructive"
                              | "outline"
                          }
                          className="capitalize"
                        >
                          {document.status}
                        </Badge>
                      </div>
                    </td>
                    <td data-label="Upload Date">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateTime(document.uploaded_at)}
                      </div>
                    </td>
                    <td data-label="Size">
                      {document.file_size
                        ? formatFileSize(document.file_size)
                        : "N/A"}
                    </td>
                    <td data-label="Actions">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedDocument(document)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {document.status === "completed" && (
                            <DropdownMenuItem
                              onClick={() => handleDownload(document)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => setSelectedDocument(document)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {/* Cards View */}
      {filteredDocuments.length > 0 && viewMode === "cards" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <Card
              key={document.id}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {getFileIcon(document.mime_type || "")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {document.file_name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(document.status)} text-xs`}
                      >
                        {document.status.charAt(0).toUpperCase() +
                          document.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedDocument(document)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {document.status === "completed" && (
                        <DropdownMenuItem
                          onClick={() => handleDownload(document)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => setSelectedDocument(document)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">
                  {truncateText(document.description, 100)}
                </p>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDateTime(document.uploaded_at)}
                  </div>
                  {document.file_size && (
                    <div className="flex items-center">
                      <File className="mr-1 h-3 w-3" />
                      {formatFileSize(document.file_size)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Document Details Dialog */}
      <Dialog
        open={!!selectedDocument}
        onOpenChange={() => setSelectedDocument(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span className="text-2xl">
                {getFileIcon(selectedDocument?.mime_type || "")}
              </span>
              <span>{selectedDocument?.file_name}</span>
            </DialogTitle>
            <DialogDescription>Document details and actions</DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Status
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      selectedDocument.status
                    )} mt-1`}
                  >
                    {selectedDocument.status.charAt(0).toUpperCase() +
                      selectedDocument.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    File Size
                  </div>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedDocument.file_size
                      ? formatFileSize(selectedDocument.file_size)
                      : "Unknown"}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Upload Date
                  </div>
                  <p className="text-sm text-gray-900 mt-1">
                    {formatDateTime(selectedDocument.uploaded_at)}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    File Type
                  </div>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedDocument.mime_type || "Unknown"}
                  </p>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700">
                  Description
                </div>
                <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedDocument.description}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            {selectedDocument?.status === "completed" && (
              <Button
                onClick={() =>
                  selectedDocument && handleDownload(selectedDocument)
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() => selectedDocument && handleDelete(selectedDocument)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setSelectedDocument(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
