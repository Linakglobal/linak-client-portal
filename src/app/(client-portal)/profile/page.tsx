"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import ImmigrationPageWrapper from "@/components/layout/ImmigrationPageWrapper";
import CompactFeatureBadges from "@/components/sections/CompactFeatureBadges";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Demo User",
    email: "demo@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, Country",
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <ImmigrationPageWrapper>
      <div className="min-h-screen bg-transparent">
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Profile
                </h1>
                <p className="text-slate-400">
                  Manage your personal information and preferences
                </p>
              </div>
            </div>

            <CompactFeatureBadges tone="light" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Form */}
              <div className="lg:col-span-2">
                <Card className="streamit-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-300">
                          Full Name
                        </Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-slate-300">
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-slate-300">
                          Phone Number
                        </Label>
                        <div className="relative mt-2">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-slate-300">
                          Address
                        </Label>
                        <div className="relative mt-2">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="address"
                            value={profile.address}
                            onChange={(e) =>
                              setProfile({ ...profile, address: e.target.value })
                            }
                            disabled={!isEditing}
                            className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="streamit-button"
                        >
                          Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button onClick={handleSave} className="streamit-button">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Summary */}
              <div className="space-y-6">
                <Card className="streamit-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">
                      Account Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Account Type</span>
                        <span className="text-white font-medium">Premium</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Member Since</span>
                        <span className="text-white font-medium">Jan 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Status</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                          Active
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ImmigrationPageWrapper>
  );
}