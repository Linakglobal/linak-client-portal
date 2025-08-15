'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useClientStore } from '@/hooks/use-client-store';
import { formatDateTime, getFileIcon, getStatusColor } from '@/lib/utils/helpers';
import { FileText, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export function DocumentList() {
  const { documents } = useClientStore();

  // Show only the most recent 5 documents
  const recentDocuments = documents.slice(0, 5);

  if (documents.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Recent Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No documents uploaded yet</p>
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upload Your First Document
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Recent Documents
        </CardTitle>
        <Link href="/documents">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {recentDocuments.map((document) => (
            <div key={document.id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getFileIcon(document.mime_type || '')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {document.file_name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {document.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Uploaded {formatDateTime(document.uploaded_at)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(document.status)}
                  >
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {document.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {documents.length > 5 && (
          <div className="p-6 bg-gray-50/50 border-t">
            <Link href="/documents">
              <Button variant="outline" className="w-full">
                View All {documents.length} Documents
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
