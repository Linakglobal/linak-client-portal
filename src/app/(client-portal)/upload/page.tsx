"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";
import CompactFeatureBadges from "@/components/sections/CompactFeatureBadges";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFile(null);
      alert("Document uploaded successfully!");
    }, 2000);
  };

  return (
    <ImmigrationPageWrapper>
      <div className="min-h-screen bg-transparent">
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Upload Documents
                </h1>
                <p className="text-slate-400">
                  Securely upload your documents to your LINAK portal
                </p>
              </div>
            </div>

            <CompactFeatureBadges tone="light" />

            <Card className="streamit-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-green-400" />
                  </div>
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-white font-medium mb-2">
                      Choose a file to upload
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      PDF, JPG, PNG up to 10MB
                    </p>
                    <label>
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button className="streamit-button">
                        Select File
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{selectedFile.name}</p>
                          <p className="text-slate-400 text-sm">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedFile && (
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="streamit-button flex-1"
                    >
                      {isUploading ? "Uploading..." : "Upload Document"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedFile(null)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </Button>
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