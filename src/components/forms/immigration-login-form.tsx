"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmail } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Calendar, Loader2, Shield } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "Please enter a valid email address",
    }),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (date) => {
        const mmddyyyyPattern =
          /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        const yyyymmddPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return mmddyyyyPattern.test(date) || yyyymmddPattern.test(date);
      },
      {
        message: "Please enter date in MM/DD/YYYY or YYYY-MM-DD format",
      }
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const fillDemoCredentials = () => {
    setValue("email", "user@linak.com");
    setValue("dob", "01/15/1985");
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await signInWithEmail(data.email, data.dob);
      if (!response.success) {
        setMessage({
          type: "error",
          text: "Authentication failed. Please check your credentials.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Check your email for the magic link!",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-velvet relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-royal opacity-10 animate-pulse-slow" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-royal/20 to-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <Button
          className="btn-secondary"
          onClick={() => (window.location.href = "/")}
        >
          ← Back to Home
        </Button>
      </div>

      <div className="w-full max-w-lg mx-auto relative z-10">
        <Card className="tech-card border-2 shadow-glow animate-glow">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-royal/20 to-secondary/10 rounded-2xl shadow-neon backdrop-blur-sm border border-royal/15 animate-float">
              <Image
                src="/linak-logo.svg"
                alt="LINAK Logo"
                width={72}
                height={72}
                className="animate-glow"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEJG RkY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIyNSUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MzY2RjE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4QjVDRjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI3NSUiIHN0eWxlPSJzdG9wLWNvbG9yOiNBODU1Rjc7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRUM0ODk5O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNnKSIgLz48L3N2Zz4="
                priority
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gradient glow-text mb-3">
                Welcome to LINAK
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                Sign in to your exclusive Client Portal
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent animate-glow" />
                    <Input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email address"
                      className="form-input pl-10 h-12"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1 animate-pulse">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent animate-glow" />
                    <Input
                      id="dob"
                      {...register("dob")}
                      type="text"
                      placeholder="MM/DD/YYYY or YYYY-MM-DD"
                      className="form-input pl-10 h-12"
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-destructive text-sm mt-1 animate-pulse">
                      {errors.dob.message}
                    </p>
                  )}
                </div>
              </div>

              {message && (
                <Alert
                  className={`${
                    message.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  } backdrop-blur-sm animate-pulse`}
                >
                  <AlertDescription className="text-sm">
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="neon-button w-full h-12 text-base font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Sign In to Portal
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={fillDemoCredentials}
                className="w-full text-sm text-accent hover:text-accent/80 transition-colors animate-pulse"
              >
                Use Demo Credentials (user@linak.com)
              </button>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="text-center">
                  <span className="flex items-center justify-center text-2xl">
                    🛡️
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Secure
                  </span>
                </div>
                <div className="text-center">
                  <span className="flex items-center justify-center text-2xl">
                    ⚡
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Fast
                  </span>
                </div>
                <div className="text-center">
                  <span className="flex items-center justify-center text-2xl">
                    🌍
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Global
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
