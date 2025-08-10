'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useClientStore } from '@/hooks/use-client-store';
import { formatDate } from '@/lib/utils/helpers';
import { User, Calendar, Mail, FileText } from 'lucide-react';

export function ClientSummary() {
  const { client, documents } = useClientStore();

  if (!client) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading client information...</div>
        </CardContent>
      </Card>
    );
  }

  const documentStats = {
    total: documents.length,
    pending: documents.filter(doc => doc.status === 'pending').length,
    processing: documents.filter(doc => doc.status === 'processing').length,
    completed: documents.filter(doc => doc.status === 'completed').length,
    rejected: documents.filter(doc => doc.status === 'rejected').length,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Client Info Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-blue-900">
            <User className="mr-2 h-5 w-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-blue-800">
            <User className="mr-2 h-4 w-4" />
            <span className="font-medium">{client.name}</span>
          </div>
          <div className="flex items-center text-blue-700">
            <Mail className="mr-2 h-4 w-4" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center text-blue-700">
            <Calendar className="mr-2 h-4 w-4" />
            <span>DOB: {formatDate(client.dob)}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Member since: {formatDate(client.created_at)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-purple-900">
            <FileText className="mr-2 h-5 w-5" />
            Total Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900">{documentStats.total}</div>
          <p className="text-purple-700 text-sm">Uploaded documents</p>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-900">Document Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Completed</span>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              {documentStats.completed}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Processing</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              {documentStats.processing}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Pending</span>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              {documentStats.pending}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
