"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileText,
  Users,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Download,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedComponents";

interface PolicyItem {
  id: string;
  title: string;
  description: string;
  status: "active" | "updated" | "important";
  lastUpdated: string;
  icon: React.ReactNode;
}

const policiesData: PolicyItem[] = [
  {
    id: "client-agreement",
    title: "Client Service Agreement",
    description:
      "Comprehensive terms and conditions governing our professional migration services and client relationships.",
    status: "active",
    lastUpdated: "2024-01-15",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "privacy-policy",
    title: "Privacy & Data Protection",
    description:
      "How we collect, use, protect and manage your personal information in compliance with global privacy laws.",
    status: "updated",
    lastUpdated: "2024-01-20",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: "social-media",
    title: "Social Media Guidelines",
    description:
      "Professional guidelines for client interactions on social platforms and public communications.",
    status: "important",
    lastUpdated: "2024-01-10",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: "code-of-conduct",
    title: "Client Code of Conduct",
    description:
      "Expected standards of behavior and communication throughout the migration process.",
    status: "active",
    lastUpdated: "2024-01-05",
    icon: <Users className="h-5 w-5" />,
  },
];

export function ClientPolicies() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "updated":
        return "secondary";
      case "important":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "var(--success)";
      case "updated":
        return "var(--info)";
      case "important":
        return "var(--warning)";
      default:
        return "var(--text-muted)";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: "var(--text-light)" }}>Client </span>
            <span style={{ color: "var(--accent-purple-light)" }}>
              Policies & Guidelines
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Essential policies and guidelines to ensure transparent,
            professional, and successful migration services for all our clients.
          </p>
        </AnimatedSection>

        {/* Policies Grid */}
        <AnimatedSection animation="zoom-in" delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {policiesData.map((policy) => (
              <Card
                key={policy.id}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 group"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--accent-purple-glow)",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: getStatusColor(policy.status),
                      color: "white",
                    }}
                  >
                    {policy.icon}
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(policy.status)}
                    className="text-xs"
                  >
                    {policy.status.toUpperCase()}
                  </Badge>
                </div>

                <h3
                  className="font-semibold mb-2 text-sm group-hover:text-purple-300 transition-colors"
                  style={{ color: "var(--text-light)" }}
                >
                  {policy.title}
                </h3>

                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  {policy.description}
                </p>

                <div className="text-xs opacity-60">
                  Updated: {formatDate(policy.lastUpdated)}
                </div>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Key Highlights */}
        <AnimatedSection animation="fade-up" delay={0.4}>
          <div
            className="rounded-2xl p-8 mb-12"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--accent-purple-glow)",
              backgroundImage:
                "radial-gradient(circle at 20% 30%, var(--accent-purple-glow) 0%, transparent 50%)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--text-light)" }}
            >
              Key Policy Highlights
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--success)", opacity: 0.2 }}
                >
                  <CheckCircle
                    className="h-8 w-8"
                    style={{ color: "var(--success)" }}
                  />
                </div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--text-light)" }}
                >
                  100% Transparency
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Clear communication about all processes, fees, and timelines
                  with no hidden charges.
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--info)", opacity: 0.2 }}
                >
                  <Shield
                    className="h-8 w-8"
                    style={{ color: "var(--info)" }}
                  />
                </div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--text-light)" }}
                >
                  Data Security
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Bank-level encryption and strict confidentiality protocols
                  protect your sensitive information.
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--warning)", opacity: 0.2 }}
                >
                  <AlertTriangle
                    className="h-8 w-8"
                    style={{ color: "var(--warning)" }}
                  />
                </div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--text-light)" }}
                >
                  Compliance First
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  All services adhere to international migration laws and
                  regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Action Buttons */}
        <AnimatedSection animation="fade-up" delay={0.6}>
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                style={{
                  borderColor: "var(--accent-purple-light)",
                  color: "var(--text-light)",
                }}
              >
                <Download className="h-4 w-4" />
                Download All Policies
              </Button>

              <Button
                className="flex items-center gap-2"
                style={{
                  backgroundColor: "var(--primary-purple)",
                  color: "white",
                }}
              >
                <ExternalLink className="h-4 w-4" />
                View Legal Center
              </Button>
            </div>

            <p
              className="text-sm max-w-2xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              By engaging our services, you acknowledge that you have read,
              understood, and agree to comply with all applicable policies and
              guidelines. For questions or clarifications, please contact our
              compliance team.
            </p>
          </div>
        </AnimatedSection>

        {/* Policy Detail Modal */}
        {selectedPolicy && (
          <dialog
            open
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 border-0"
            aria-labelledby="policy-modal-title"
            onClose={() => setSelectedPolicy(null)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--accent-purple-glow)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: getStatusColor(selectedPolicy.status),
                      color: "white",
                    }}
                  >
                    {selectedPolicy.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "var(--text-light)" }}
                    >
                      {selectedPolicy.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Last updated: {formatDate(selectedPolicy.lastUpdated)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPolicy(null)}
                >
                  ✕
                </Button>
              </div>

              <div
                className="prose prose-invert max-w-none"
                style={{ color: "var(--text-light)" }}
              >
                <p className="text-base mb-6">{selectedPolicy.description}</p>

                <div
                  className="space-y-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <p>
                    This is a comprehensive policy document that outlines the
                    specific terms, conditions, and guidelines related to{" "}
                    {selectedPolicy.title.toLowerCase()}. Our policies are
                    designed to protect both clients and our organization while
                    ensuring the highest standards of professional service
                    delivery.
                  </p>

                  <p>
                    For the complete policy document with detailed terms and
                    conditions, please download the full document or contact our
                    legal department for specific inquiries and clarifications.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{
                    borderColor: "var(--accent-purple-light)",
                    color: "var(--text-light)",
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>

                <Button
                  style={{
                    backgroundColor: "var(--primary-purple)",
                    color: "white",
                  }}
                >
                  I Understand
                </Button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
}
