"use client";

import { useEffect } from "react";
import { useClientStore } from "@/hooks/use-client-store";
import { getClientDocuments } from "@/lib/supabase/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Upload } from "lucide-react";
import Link from "next/link";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";
import CompactFeatureBadges from "@/components/sections/CompactFeatureBadges";

export default function DocumentsPage() {
  const { client, documents, setDocuments, setLoading } = useClientStore();

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

  const getStatusBadgeClass = (status: string) => {
    if (status === "approved") return "bg-green-500/10 text-green-400 border-green-500/20";
    if (status === "pending") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <ImmigrationPageWrapper>
      <div className="min-h-screen bg-transparent">
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Documents
                </h1>
                <p className="text-slate-400">
                  Manage and view your uploaded documents
                </p>
              </div>
              <Link href="/upload">
                <Button className="streamit-button">
                  <Upload size={18} className="mr-2" />
                  Upload New Document
                </Button>
              </Link>
            </div>

            <CompactFeatureBadges />

            <Card className="streamit-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  Your Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">
                      No Documents Yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Upload your first document to get started
                    </p>
                    <Link href="/upload">
                      <Button className="streamit-button">
                        <Upload size={18} className="mr-2" />
                        Upload Document
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{doc.name}</p>
                            <p className="text-slate-400 text-sm">
                              {doc.type} • Uploaded {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                              doc.status
                            )}`}
                          >
                            {doc.status}
                          </span>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ImmigrationPageWrapper>
  );
}