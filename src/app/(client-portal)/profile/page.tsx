"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClientStore } from "@/hooks/use-client-store";
import { updateClient } from "@/lib/supabase/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Save, Loader2, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils/helpers";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  dob: z.string().min(1, "Date of birth is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { client, setClient } = useClientStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      dob: client?.dob || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!client) return;

    try {
      setIsUpdating(true);
      setError(null);

      const updatedClient = await updateClient(client.id, {
        name: data.name,
        email: data.email,
        dob: data.dob,
      });

      if (updatedClient) {
        setClient(updatedClient);
        setUpdateSuccess(true);
        reset(data); // Reset form with new values to clear isDirty state

        // Hide success message after 3 seconds
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while updating your profile";
      setError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!client) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Loading your profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 lg:col-span-1">
          <CardHeader className="text-center pb-6">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {client.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{client.name}</CardTitle>
            <p className="text-gray-600">{client.email}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Member Since
              </span>
              <span className="text-sm text-gray-600">
                {formatDate(client.created_at)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Date of Birth
              </span>
              <span className="text-sm text-gray-600">
                {formatDate(client.dob)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Edit Form */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Edit Profile Information
            </CardTitle>
            <p className="text-gray-600">
              Update your personal information below
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <label
                  htmlFor="dob"
                  className="text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dob"
                    type="date"
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    {...register("dob")}
                  />
                </div>
                {errors.dob && (
                  <p className="text-sm text-red-600">{errors.dob.message}</p>
                )}
              </div>

              {/* Success Message */}
              {updateSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Profile updated successfully!
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isUpdating || !isDirty}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>

              {!isDirty && (
                <p className="text-sm text-gray-500 text-center">
                  Make changes to enable the save button
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <p className="text-gray-600">
            Important details about your account and security
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Security</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Your account uses secure email-based authentication with date
                  of birth verification.
                </p>
                <p className="text-sm text-gray-600">
                  No password is required - access is granted through magic
                  links sent to your email.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Data Privacy</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Your personal information and documents are securely encrypted
                  and stored.
                </p>
                <p className="text-sm text-gray-600">
                  Access to your data is restricted to authorized personnel
                  only.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
