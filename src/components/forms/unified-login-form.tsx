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

interface LoginFormProps {
  readonly variant?: "default" | "compact" | "premium";
  readonly showDemo?: boolean;
}

export function LoginForm({
  variant = "default",
  showDemo = true,
}: LoginFormProps) {
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

  const getLogoConfig = () => {
    switch (variant) {
      case "compact":
        return { width: 64, height: 64, containerSize: "w-16 h-16" };
      case "premium":
        return { width: 80, height: 80, containerSize: "w-20 h-20" };
      default:
        return { width: 72, height: 72, containerSize: "w-18 h-18" };
    }
  };

  const logo = getLogoConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects - Hidden from screen readers */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-royal/10 to-accent/10 animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-royal/20 to-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-accent/20 to-royal/20 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-royal/10 to-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      </div>

      <main className="w-full max-w-md mx-auto">
        <Card
          className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl relative overflow-hidden"
          aria-labelledby="login-form-title"
        >
          ;{/* Card Header Gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal via-accent to-royal"
            aria-hidden="true"
          ></div>
          <CardHeader className="space-y-4 pb-6">
            {/* Logo */}
            <div
              className={`mx-auto ${logo.containerSize} bg-gradient-to-br from-royal/20 to-accent/20 rounded-2xl shadow-lg flex items-center justify-center p-3`}
            >
              <Image
                src="/linak-logo.svg"
                alt="LINAK Global Immigration Services Logo"
                width={logo.width}
                height={logo.height}
                className={`${logo.containerSize} object-contain`}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2ZjQyYzEiIG9wYWNpdHk9IjAuMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNmY0MmMxIiBvcGFjaXR5PSIwLjYiIHJ4PSI0Ii8+PC9zdmc+"
                priority
              />
            </div>

            <div className="text-center">
              <CardTitle
                id="login-form-title"
                className="text-2xl font-bold bg-gradient-to-r from-royal to-accent bg-clip-text text-transparent"
              >
                LINAK Global
              </CardTitle>
              <CardDescription className="text-slate-600 mt-2">
                Immigration Services Portal
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            ;
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
              aria-describedby="form-instructions"
            >
              <p id="form-instructions" className="sr-only">
                Please enter your email address and date of birth to access the
                client portal. Use MM/DD/YYYY or YYYY-MM-DD format for the date.
              </p>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-royal" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-slate-300 focus:border-royal focus:ring-royal/20 bg-white/90"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-4 h-4 text-red-500">⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-royal" />
                  Date of Birth
                </label>
                <Input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  className="border-slate-300 focus:border-royal focus:ring-royal/20 bg-white/90"
                  {...register("dob")}
                />
                {errors.dob && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="w-4 h-4 text-red-500">⚠</span>
                    {errors.dob.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-royal to-accent hover:from-royal/90 hover:to-accent/90 text-white font-semibold py-3 shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Access Portal
                  </>
                )}
              </Button>

              {/* Demo Credentials */}
              {showDemo && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDemoCredentials}
                  className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
                >
                  Use Demo Credentials
                </Button>
              )}
            </form>
            {/* Status Messages */}
            {message && (
              <Alert
                className={
                  message.type === "error"
                    ? "border-red-500"
                    : "border-green-500"
                }
              >
                <AlertDescription
                  className={
                    message.type === "error" ? "text-red-700" : "text-green-700"
                  }
                >
                  {message.text}
                </AlertDescription>
              </Alert>
            )}
            {/* Security Notice */}
            <div className="text-xs text-slate-500 text-center space-y-2 pt-4 border-t border-slate-200">
              <p className="flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Secure authentication with industry-standard encryption
              </p>
              <p>© 2025 LINAK Global Immigration Services</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// Export for backward compatibility
export { LoginForm as ImmigrationLoginForm };
