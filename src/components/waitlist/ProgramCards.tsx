"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

interface ProgramCardsProps {
  readonly title?: string;
  readonly subtitle?: string;
}

export function ProgramCards({ title, subtitle }: ProgramCardsProps) {
  const programs = [
    {
      id: 1,
      title: "Express Entry Program",
      description:
        "Fast-track immigration to Canada through federal skilled worker program",
      duration: "6-12 months",
      participants: "150,000+ annually",
      rating: 4.8,
      status: "Available",
      features: [
        "No job offer required",
        "Points-based system",
        "Permanent residence",
      ],
      comingSoon: false,
    },
    {
      id: 2,
      title: "Provincial Nominee Program",
      description:
        "Province-specific immigration programs with targeted occupations",
      duration: "12-18 months",
      participants: "80,000+ annually",
      rating: 4.6,
      status: "Coming Soon",
      features: [
        "Province-specific",
        "Job offer advantage",
        "Faster processing",
      ],
      comingSoon: true,
    },
    {
      id: 3,
      title: "Australian Skilled Migration",
      description: "Points-based skilled migration program for Australia",
      duration: "8-16 months",
      participants: "160,000+ annually",
      rating: 4.7,
      status: "Available",
      features: [
        "Skills assessment",
        "English proficiency",
        "Age requirements",
      ],
      comingSoon: false,
    },
    {
      id: 4,
      title: "New Zealand Skilled Migrant",
      description: "Expression of Interest system for skilled workers",
      duration: "6-12 months",
      participants: "45,000+ annually",
      rating: 4.5,
      status: "Coming Soon",
      features: ["Job offer bonus", "Work-to-residence", "Partner included"],
      comingSoon: true,
    },
  ];

  return (
    <section className="py-12">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card
            key={program.id}
            className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              program.comingSoon
                ? "border-dashed border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50"
                : "border border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-3">
                    {program.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={program.comingSoon ? "secondary" : "default"}
                  className={
                    program.comingSoon
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : "bg-green-100 text-green-800 border-green-300"
                  }
                >
                  {program.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-green-500" />
                  <span>{program.participants}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                  <span>{program.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {program.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full ${
                  program.comingSoon
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
                disabled={program.comingSoon}
              >
                {program.comingSoon ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon - Join Waitlist
                  </>
                ) : (
                  <>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
