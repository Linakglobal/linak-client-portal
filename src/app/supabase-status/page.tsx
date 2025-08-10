"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  CheckCircle,
  AlertCircle,
  Wifi,
  Shield,
  HardDrive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

interface ConnectionStatus {
  isConnected: boolean;
  isDemoMode: boolean;
  url: string;
  hasAuth: boolean;
  hasStorage: boolean;
  error?: string;
}

export default function SupabaseStatusPage() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSupabaseConnection = async () => {
    setIsLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const isDemoMode =
        !supabaseUrl ||
        supabaseUrl.includes("placeholder") ||
        supabaseUrl.includes("your-project-ref");

      if (isDemoMode) {
        setStatus({
          isConnected: true,
          isDemoMode: true,
          url: "Demo Mode - Mock Data",
          hasAuth: true,
          hasStorage: false,
        });
        setIsLoading(false);
        return;
      }

      // Test basic connection
      const { error: dbError } = await supabase
        .from("clients")
        .select("count", { count: "exact", head: true });

      // Test auth
      const { error: authError } = await supabase.auth.getSession();

      // Test storage
      const { error: storageError } = await supabase.storage.listBuckets();

      setStatus({
        isConnected: !dbError,
        isDemoMode: false,
        url: supabaseUrl,
        hasAuth: !authError,
        hasStorage: !storageError,
        error: dbError?.message,
      });
    } catch (error) {
      setStatus({
        isConnected: false,
        isDemoMode: false,
        url: "Connection Failed",
        hasAuth: false,
        hasStorage: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_theme(colors.purple.600/20),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_theme(colors.blue.600/20),_transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Database className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h1 className="text-4xl font-bold text-white mb-2">
              Supabase Connection Status
            </h1>
            <p className="text-gray-300">
              LINAK Client Portal Database & Authentication
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Connection Status */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wifi className="w-5 h-5" />
                  Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge
                      variant={status?.isConnected ? "default" : "destructive"}
                      className={
                        status?.isConnected ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {status?.isConnected ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Disconnected
                        </>
                      )}
                    </Badge>
                    <p className="text-gray-300 text-sm">
                      {status?.isDemoMode ? "Demo Mode Active" : status?.url}
                    </p>
                    {status?.error && (
                      <p className="text-red-400 text-xs mt-2">
                        {status.error}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge
                      variant={status?.hasAuth ? "default" : "destructive"}
                      className={
                        status?.hasAuth ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {status?.hasAuth ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ready
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Error
                        </>
                      )}
                    </Badge>
                    <p className="text-gray-300 text-sm">
                      {status?.isDemoMode
                        ? "Demo authentication enabled"
                        : "Supabase Auth service"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Storage */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <HardDrive className="w-5 h-5" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge
                      variant={status?.hasStorage ? "default" : "secondary"}
                      className={
                        status?.hasStorage ? "bg-green-600" : "bg-gray-600"
                      }
                    >
                      {status?.hasStorage ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Available
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Not Configured
                        </>
                      )}
                    </Badge>
                    <p className="text-gray-300 text-sm">
                      {status?.isDemoMode
                        ? "Mock file storage"
                        : status?.hasStorage
                        ? "Document storage ready"
                        : "Storage not configured"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Demo Credentials */}
          {status?.isDemoMode && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg mb-8">
              <CardHeader>
                <CardTitle className="text-white">Demo Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 mb-4">
                  Use these credentials to test the authentication system:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-2">
                      John Anderson
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Email: john.anderson@linakglobal.com
                    </p>
                    <p className="text-gray-300 text-sm">DOB: 03/15/1985</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-2">
                      Sarah Wilson
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Email: sarah.wilson@linakglobal.com
                    </p>
                    <p className="text-gray-300 text-sm">DOB: 07/22/1990</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={checkSupabaseConnection}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Testing..." : "Test Connection"}
            </Button>
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Test Authentication
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
