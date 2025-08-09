'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmail } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Calendar, Loader2, Sparkles } from 'lucide-react';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: 'Please enter a valid email address',
    }),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      date => {
        // Accept MM/DD/YYYY or YYYY-MM-DD formats
        const mmddyyyyPattern =
          /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        const yyyymmddPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        return mmddyyyyPattern.test(date) || yyyymmddPattern.test(date);
      },
      {
        message: 'Please enter date in MM/DD/YYYY or YYYY-MM-DD format',
      }
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setMessage(null);

      const result = await signInWithEmail(data.email, data.dob);

      if (result.client) {
        // Demo mode - redirect directly to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);

        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting to your dashboard...',
        });
      } else {
        setMessage({
          type: 'success',
          text: 'Magic link sent! Please check your email and click the link to sign in.',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.';
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, () => {
            const id = `particle-${Date.now()}-${Math.random()
              .toString(36)
              .substring(2, 11)}`;
            return (
              <div
                key={id}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse floating"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            );
          })}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-2 0c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Enhanced Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl shadow-2xl shadow-purple-500/30 backdrop-blur-sm border border-white/20 animate-pulse-glow">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-tight">
              LINAK
            </h1>
            <p className="text-xl text-purple-200/90 font-light tracking-wide mb-2">
              Client Portal
            </p>
            <p className="text-sm text-purple-300/70">
              Premium Migration Services
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mx-auto mt-4 rounded-full shimmer-effect"></div>
          </div>

          {/* Enhanced Login Card */}
          <Card className="enhanced-card bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-900/30">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                <span>Welcome Back</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </CardTitle>
              <CardDescription className="text-purple-200/80 text-base">
                Enter your credentials to access your premium portal
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-purple-100 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-purple-300" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-purple-300/60 group-focus-within:text-purple-300 transition-all duration-300 group-hover:scale-110" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-purple-200/50 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-purple-300/50 focus:shadow-lg focus:shadow-purple-500/25"
                      {...register('email')}
                    />
                    {/* Premium gradient overlay on hover */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Subtle glow effect on focus */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-300 flex items-center gap-1 mt-1 animate-pulse">
                      <span className="inline-block w-1 h-1 bg-red-300 rounded-full"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="dob"
                    className="text-sm font-medium text-purple-100 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-purple-300" />
                    Date of Birth
                  </label>

                  {/* Easy Manual Entry with Dropdowns */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Month Dropdown */}
                    <div className="relative group">
                      <select
                        value={selectedMonth}
                        onChange={e => {
                          setSelectedMonth(e.target.value);
                          // Auto-update the hidden dob field
                          if (e.target.value && selectedDay && selectedYear) {
                            const dobValue = `${e.target.value.padStart(
                              2,
                              '0'
                            )}/${selectedDay.padStart(2, '0')}/${selectedYear}`;
                            const dobInput = document.getElementById(
                              'dob'
                            ) as HTMLInputElement;
                            if (dobInput) {
                              dobInput.value = dobValue;
                              dobInput.dispatchEvent(
                                new Event('input', { bubbles: true })
                              );
                            }
                          }
                        }}
                        className="w-full h-12 pl-3 pr-8 bg-white/10 border border-white/20 text-white rounded-lg focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-purple-300/50 focus:shadow-lg focus:shadow-purple-500/25 appearance-none font-medium"
                      >
                        <option value="" className="bg-gray-900 text-gray-300">
                          Month
                        </option>
                        <option value="1" className="bg-gray-900 text-white">
                          01 - January
                        </option>
                        <option value="2" className="bg-gray-900 text-white">
                          02 - February
                        </option>
                        <option value="3" className="bg-gray-900 text-white">
                          03 - March
                        </option>
                        <option value="4" className="bg-gray-900 text-white">
                          04 - April
                        </option>
                        <option value="5" className="bg-gray-900 text-white">
                          05 - May
                        </option>
                        <option value="6" className="bg-gray-900 text-white">
                          06 - June
                        </option>
                        <option value="7" className="bg-gray-900 text-white">
                          07 - July
                        </option>
                        <option value="8" className="bg-gray-900 text-white">
                          08 - August
                        </option>
                        <option value="9" className="bg-gray-900 text-white">
                          09 - September
                        </option>
                        <option value="10" className="bg-gray-900 text-white">
                          10 - October
                        </option>
                        <option value="11" className="bg-gray-900 text-white">
                          11 - November
                        </option>
                        <option value="12" className="bg-gray-900 text-white">
                          12 - December
                        </option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Day Dropdown */}
                    <div className="relative group">
                      <select
                        value={selectedDay}
                        onChange={e => {
                          setSelectedDay(e.target.value);
                          // Auto-update the hidden dob field
                          if (selectedMonth && e.target.value && selectedYear) {
                            const dobValue = `${selectedMonth.padStart(
                              2,
                              '0'
                            )}/${e.target.value.padStart(
                              2,
                              '0'
                            )}/${selectedYear}`;
                            const dobInput = document.getElementById(
                              'dob'
                            ) as HTMLInputElement;
                            if (dobInput) {
                              dobInput.value = dobValue;
                              dobInput.dispatchEvent(
                                new Event('input', { bubbles: true })
                              );
                            }
                          }
                        }}
                        className="w-full h-12 pl-3 pr-8 bg-white/10 border border-white/20 text-white rounded-lg focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-purple-300/50 focus:shadow-lg focus:shadow-purple-500/25 appearance-none font-medium"
                      >
                        <option value="" className="bg-gray-900 text-gray-300">
                          Day
                        </option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          day => (
                            <option
                              key={day}
                              value={day}
                              className="bg-gray-900 text-white"
                            >
                              {day.toString().padStart(2, '0')}
                            </option>
                          )
                        )}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative group">
                      <select
                        value={selectedYear}
                        onChange={e => {
                          setSelectedYear(e.target.value);
                          // Auto-update the hidden dob field
                          if (selectedMonth && selectedDay && e.target.value) {
                            const dobValue = `${selectedMonth.padStart(
                              2,
                              '0'
                            )}/${selectedDay.padStart(2, '0')}/${
                              e.target.value
                            }`;
                            const dobInput = document.getElementById(
                              'dob'
                            ) as HTMLInputElement;
                            if (dobInput) {
                              dobInput.value = dobValue;
                              dobInput.dispatchEvent(
                                new Event('input', { bubbles: true })
                              );
                            }
                          }
                        }}
                        className="w-full h-12 pl-3 pr-8 bg-white/10 border border-white/20 text-white rounded-lg focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-purple-300/50 focus:shadow-lg focus:shadow-purple-500/25 appearance-none font-medium"
                      >
                        <option value="" className="bg-gray-900 text-gray-300">
                          Year
                        </option>
                        {Array.from({ length: 80 }, (_, i) => 2025 - i).map(
                          year => (
                            <option
                              key={year}
                              value={year}
                              className="bg-gray-900 text-white"
                            >
                              {year}
                            </option>
                          )
                        )}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-purple-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hidden input for form validation */}
                  <input type="hidden" id="dob" {...register('dob')} />

                  {/* Quick Demo Fill Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMonth('3');
                        setSelectedDay('15');
                        setSelectedYear('1985');
                        const dobInput = document.getElementById(
                          'dob'
                        ) as HTMLInputElement;
                        const emailInput = document.getElementById(
                          'email'
                        ) as HTMLInputElement;
                        if (dobInput && emailInput) {
                          dobInput.value = '03/15/1985';
                          emailInput.value = 'john.anderson@linakglobal.com';
                          dobInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                          emailInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                        }
                      }}
                      className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs rounded border border-blue-400/30 transition-colors"
                    >
                      John (Mar 15, 1985)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMonth('7');
                        setSelectedDay('22');
                        setSelectedYear('1990');
                        const dobInput = document.getElementById(
                          'dob'
                        ) as HTMLInputElement;
                        const emailInput = document.getElementById(
                          'email'
                        ) as HTMLInputElement;
                        if (dobInput && emailInput) {
                          dobInput.value = '07/22/1990';
                          emailInput.value = 'sarah.wilson@linakglobal.com';
                          dobInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                          emailInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                        }
                      }}
                      className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-200 text-xs rounded border border-green-400/30 transition-colors"
                    >
                      Sarah (Jul 22, 1990)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMonth('11');
                        setSelectedDay('8');
                        setSelectedYear('1982');
                        const dobInput = document.getElementById(
                          'dob'
                        ) as HTMLInputElement;
                        const emailInput = document.getElementById(
                          'email'
                        ) as HTMLInputElement;
                        if (dobInput && emailInput) {
                          dobInput.value = '11/08/1982';
                          emailInput.value = 'michael.chen@linakglobal.com';
                          dobInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                          emailInput.dispatchEvent(
                            new Event('input', { bubbles: true })
                          );
                        }
                      }}
                      className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs rounded border border-purple-400/30 transition-colors"
                    >
                      Michael (Nov 8, 1982)
                    </button>
                  </div>

                  {/* Enhanced helpful hint text */}
                  <div className="text-xs text-purple-200/50 mt-2 space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-purple-300/50 rounded-full" />{' '}
                      Select your birth date using the dropdowns above
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-blue-300/50 rounded-full" />{' '}
                      Or click a demo button to auto-fill
                    </p>
                  </div>

                  {errors.dob && (
                    <p className="text-sm text-red-300 flex items-center gap-1 mt-1 animate-pulse">
                      <span className="inline-block w-1 h-1 bg-red-300 rounded-full"></span>
                      {errors.dob.message}
                    </p>
                  )}
                </div>

                {message && (
                  <Alert
                    className={`border-0 backdrop-blur-sm ${
                      message.type === 'error'
                        ? 'bg-red-500/20 text-red-200'
                        : 'bg-green-500/20 text-green-200'
                    }`}
                  >
                    <AlertDescription className="text-sm">
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-semibold text-base shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending Magic Link...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5" />
                      <span>Access Portal</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-purple-200/60 leading-relaxed">
                  For demo purposes, use the quick-fill buttons above
                  <br />
                  <span className="text-purple-300/80">
                    Or manually select your date from the dropdowns
                  </span>
                </p>

                {/* Simplified Demo Info */}
                <div className="mt-6 p-3 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-lg border border-blue-400/20 backdrop-blur-sm">
                  <p className="text-xs text-blue-200 font-semibold mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Demo Mode Active
                  </p>
                  <p className="text-xs text-blue-100/80">
                    Click any demo button above to instantly test the portal
                    with sample credentials
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-purple-300/50">
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>Secure</span>
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>Encrypted</span>
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>Protected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-purple-300/40">
              © 2025 LINAK. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
