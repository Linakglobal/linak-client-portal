"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; dateOfBirth?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; dateOfBirth?: string } = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Date of Birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const selectedDate = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      if (age < 18 || age > 120) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Premium Header with Logo Placeholder */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {/* Logo Placeholder */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
              LINAK CLIENT LOGIN
            </h1>
            <p className="text-slate-600 mt-2 font-medium">Premium Access Portal</p>
          </div>
        </div>

        {/* Luxury Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-8 pt-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Welcome Back</h2>
              <p className="text-slate-600">Please sign in to your account</p>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`h-12 px-4 border-2 transition-all duration-200 ${
                    errors.email 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-slate-200 focus:border-purple-500 focus:ring-purple-200"
                  } rounded-lg bg-white/50 backdrop-blur-sm`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-slate-700 font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    if (errors.dateOfBirth) setErrors(prev => ({ ...prev, dateOfBirth: undefined }));
                  }}
                  className={`h-12 px-4 border-2 transition-all duration-200 ${
                    errors.dateOfBirth 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-slate-200 focus:border-purple-500 focus:ring-purple-200"
                  } rounded-lg bg-white/50 backdrop-blur-sm`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Premium Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In to Account
                  </span>
                )}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="text-center text-sm">
                <Link href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Forgot your credentials?
                </Link>
              </div>
              <div className="text-center text-sm mt-4">
                <span className="text-slate-500">Need access? </span>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Demo Access</h3>
            <p className="text-xs text-purple-700">
              Use any valid email and select any date of birth to access the demo portal
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 transition-colors inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
