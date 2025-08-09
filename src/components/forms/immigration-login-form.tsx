"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ImmigrationLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - in a real app this would authenticate with your backend
    setTimeout(() => {
      // Store demo user data
      const demoUser = {
        id: "demo-user-1",
        email: email,
        name: "Demo User",
        role: "client"
      };
      localStorage.setItem("demo-client", JSON.stringify(demoUser));
      
      // Redirect to dashboard
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <Card className="streamit-card border border-slate-700/50">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/linak-logo-wings.svg"
            alt="LINAK"
            className="w-12 h-12 filter brightness-0 invert"
          />
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-400">
          Sign in to your LINAK client portal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full streamit-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center">
          <Link href="/forgot-password" className="text-sm text-slate-400 hover:text-white">
            Forgot your password?
          </Link>
        </div>
        <div className="text-center text-sm text-slate-500">
          <p>Demo credentials: Any email and password will work</p>
        </div>
      </CardContent>
    </Card>
  );
}