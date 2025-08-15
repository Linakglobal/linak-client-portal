"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Heart,
  MessageCircle,
  Star,
  CheckCircle2,
  AlertCircle,
  Users,
  Eye,
  Phone,
  FileText,
  X,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedComponents";

interface ClientFeedback {
  id: string;
  clientId: string;
  satisfaction: number;
  comments: string;
  timestamp: string;
  status: "new" | "reviewed" | "resolved";
}

interface ClientAlert {
  id: string;
  clientId: string;
  clientName: string;
  reason:
    | "low_satisfaction"
    | "communication_delay"
    | "concern_reported"
    | "pattern_detected";
  details: string;
  priority: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "pending" | "investigating" | "resolved";
}

interface ClientSentiment {
  clientId: string;
  clientName: string;
  overallScore: number;
  recentFeedback: ClientFeedback[];
  lastContact: string;
  riskLevel: "low" | "medium" | "high";
  communicationFrequency: number;
}

export function ClientReputationManagement() {
  const [activeClients, setActiveClients] = useState<ClientSentiment[]>([]);
  const [alerts, setAlerts] = useState<ClientAlert[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientSentiment | null>(
    null
  );
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<ClientAlert | null>(null);

  // Initialize system data
  useEffect(() => {
    loadClientSentimentData();
    initializeEarlyWarningSystem();
  }, []);

  const loadClientSentimentData = useCallback(() => {
    // Mock data - in production, this would fetch from your backend
    const mockClients: ClientSentiment[] = [
      {
        clientId: "client_001",
        clientName: "Sarah Johnson",
        overallScore: 4.2,
        lastContact: "2025-08-05",
        riskLevel: "low",
        communicationFrequency: 3,
        recentFeedback: [
          {
            id: "fb_001",
            clientId: "client_001",
            satisfaction: 4,
            comments: "Great service so far, very responsive team!",
            timestamp: "2025-08-05T10:30:00Z",
            status: "reviewed",
          },
        ],
      },
      {
        clientId: "client_002",
        clientName: "Michael Chen",
        overallScore: 2.8,
        lastContact: "2025-07-28",
        riskLevel: "high",
        communicationFrequency: 1,
        recentFeedback: [
          {
            id: "fb_002",
            clientId: "client_002",
            satisfaction: 2,
            comments:
              "Feeling frustrated with the delays in my application process.",
            timestamp: "2025-07-28T14:20:00Z",
            status: "new",
          },
        ],
      },
      {
        clientId: "client_003",
        clientName: "Emma Rodriguez",
        overallScore: 4.8,
        lastContact: "2025-08-06",
        riskLevel: "low",
        communicationFrequency: 5,
        recentFeedback: [
          {
            id: "fb_003",
            clientId: "client_003",
            satisfaction: 5,
            comments:
              "Excellent service! My visa was approved faster than expected.",
            timestamp: "2025-08-06T09:15:00Z",
            status: "reviewed",
          },
        ],
      },
      {
        clientId: "client_004",
        clientName: "David Kumar",
        overallScore: 3.5,
        lastContact: "2025-08-01",
        riskLevel: "medium",
        communicationFrequency: 2,
        recentFeedback: [
          {
            id: "fb_004",
            clientId: "client_004",
            satisfaction: 3,
            comments: "Process is taking longer than initially discussed.",
            timestamp: "2025-08-01T16:45:00Z",
            status: "new",
          },
        ],
      },
    ];

    setActiveClients(mockClients);
    generateAlertsFromClientData(mockClients);
  }, []);

  const generateAlertsFromClientData = (clients: ClientSentiment[]) => {
    const generatedAlerts: ClientAlert[] = [];

    clients.forEach((client) => {
      // Check for low satisfaction
      if (client.overallScore < 3.0) {
        generatedAlerts.push({
          id: `alert_${client.clientId}_satisfaction`,
          clientId: client.clientId,
          clientName: client.clientName,
          reason: "low_satisfaction",
          details: `Client satisfaction score is ${client.overallScore}/5.0`,
          priority: client.overallScore < 2.5 ? "critical" : "high",
          timestamp: new Date().toISOString(),
          status: "pending",
        });
      }

      // Check for communication delays
      const daysSinceLastContact = getDaysSince(client.lastContact);
      if (daysSinceLastContact > 14) {
        generatedAlerts.push({
          id: `alert_${client.clientId}_communication`,
          clientId: client.clientId,
          clientName: client.clientName,
          reason: "communication_delay",
          details: `No contact for ${daysSinceLastContact} days`,
          priority: daysSinceLastContact > 30 ? "high" : "medium",
          timestamp: new Date().toISOString(),
          status: "pending",
        });
      }

      // Check recent feedback for concerning patterns
      client.recentFeedback.forEach((feedback) => {
        if (feedback.satisfaction <= 2 && feedback.status === "new") {
          generatedAlerts.push({
            id: `alert_${feedback.id}`,
            clientId: client.clientId,
            clientName: client.clientName,
            reason: "concern_reported",
            details: feedback.comments,
            priority: "high",
            timestamp: feedback.timestamp,
            status: "pending",
          });
        }
      });
    });

    setAlerts(generatedAlerts);
  };

  const initializeEarlyWarningSystem = () => {
    // Set up periodic checks for warning patterns
    const checkInterval = setInterval(() => {
      checkForWarningPatterns();
    }, 24 * 60 * 60 * 1000); // Daily check

    return () => clearInterval(checkInterval);
  };

  const checkForWarningPatterns = () => {
    console.log("Checking for warning patterns in client communications");
    // In production, this would analyze communication patterns, sentiment, and timing
  };

  const getDaysSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "var(--success)";
      case "medium":
        return "var(--warning)";
      case "high":
        return "var(--error)";
      default:
        return "var(--text-muted)";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "var(--info)";
      case "medium":
        return "var(--warning)";
      case "high":
        return "var(--error)";
      case "critical":
        return "#dc2626";
      default:
        return "var(--text-muted)";
    }
  };

  const handleClientSelect = (client: ClientSentiment) => {
    setSelectedClient(client);
  };

  const handleShowFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleShowConcernModal = (alert: ClientAlert) => {
    setSelectedAlert(alert);
    setShowConcernModal(true);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" as const } : alert
      )
    );
  };

  const renderFeedbackModal = () => {
    if (!showFeedbackModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white rounded-2xl p-8 max-w-md w-full"
          style={{
            background: "var(--background-card)",
            border: "1px solid var(--accent-purple-glow)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--text-light)" }}
            >
              Client Feedback
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFeedbackModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="satisfaction-rating"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-light)" }}
              >
                Satisfaction Level
              </label>
              <div className="flex gap-2" id="satisfaction-rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="p-2 rounded-lg border transition-colors"
                    style={{ borderColor: "var(--accent-purple-glow)" }}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="feedback-comments"
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-light)" }}
              >
                Comments
              </label>
              <textarea
                id="feedback-comments"
                className="w-full p-3 rounded-lg border resize-none"
                style={{
                  backgroundColor: "var(--background-card)",
                  borderColor: "var(--accent-purple-glow)",
                  color: "var(--text-light)",
                }}
                rows={4}
                placeholder="Share your thoughts about our service..."
              />
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                style={{
                  backgroundColor: "var(--primary-purple)",
                  color: "white",
                }}
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderConcernModal = () => {
    if (!showConcernModal || !selectedAlert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white rounded-2xl p-8 max-w-lg w-full"
          style={{
            background: "var(--background-card)",
            border: "1px solid var(--accent-purple-glow)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--text-light)" }}
            >
              Client Concern Details
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConcernModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <p
                className="font-semibold"
                style={{ color: "var(--text-light)" }}
              >
                Client: {selectedAlert.clientName}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {selectedAlert.details}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                style={{
                  backgroundColor: getPriorityColor(selectedAlert.priority),
                  color: "white",
                }}
              >
                {selectedAlert.priority.toUpperCase()} PRIORITY
              </Badge>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(selectedAlert.timestamp).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleResolveAlert(selectedAlert.id)}
                style={{
                  backgroundColor: "var(--success)",
                  color: "white",
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Resolved
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Client
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: "var(--text-light)" }}>Client </span>
            <span style={{ color: "var(--accent-purple-light)" }}>
              Reputation Management
            </span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Advanced system for monitoring client satisfaction, identifying
            concerns early, and maintaining exceptional service standards.
          </p>
        </AnimatedSection>

        {/* Overview Statistics */}
        <AnimatedSection animation="zoom-in" delay={0.2}>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                id: "active-clients",
                label: "Active Clients",
                value: activeClients.length.toString(),
                icon: <Users className="h-6 w-6" />,
                color: "var(--info)",
              },
              {
                id: "avg-satisfaction",
                label: "Avg Satisfaction",
                value: (
                  activeClients.reduce(
                    (acc, client) => acc + client.overallScore,
                    0
                  ) / activeClients.length || 0
                ).toFixed(1),
                icon: <Star className="h-6 w-6" />,
                color: "var(--success)",
              },
              {
                id: "active-alerts",
                label: "Active Alerts",
                value: alerts
                  .filter((alert) => alert.status === "pending")
                  .length.toString(),
                icon: <AlertTriangle className="h-6 w-6" />,
                color: "var(--warning)",
              },
              {
                id: "high-risk",
                label: "High Risk Clients",
                value: activeClients
                  .filter((client) => client.riskLevel === "high")
                  .length.toString(),
                icon: <AlertCircle className="h-6 w-6" />,
                color: "var(--error)",
              },
            ].map((stat) => (
              <Card
                key={stat.id}
                className="p-6 text-center"
                style={{
                  background: "var(--background-card)",
                  border: "1px solid var(--accent-purple-glow)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: stat.color, opacity: 0.2 }}
                >
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "var(--text-light)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Client Sentiment Dashboard */}
        <AnimatedSection animation="fade-up" delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Client List */}
            <Card
              className="p-6"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--accent-purple-glow)",
              }}
            >
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: "var(--text-light)" }}
              >
                Client Sentiment Overview
              </h3>

              <div className="space-y-4">
                {activeClients.map((client) => (
                  <button
                    key={client.clientId}
                    className="w-full p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] text-left"
                    style={{
                      borderColor: "var(--accent-purple-glow)",
                      backgroundColor:
                        selectedClient?.clientId === client.clientId
                          ? "var(--accent-purple-glow)"
                          : "transparent",
                    }}
                    onClick={() => handleClientSelect(client)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className="font-semibold"
                        style={{ color: "var(--text-light)" }}
                      >
                        {client.clientName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4"
                              style={{
                                color:
                                  star <= Math.round(client.overallScore)
                                    ? "var(--warning)"
                                    : "var(--text-muted)",
                              }}
                              fill={
                                star <= Math.round(client.overallScore)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          ({client.overallScore})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span style={{ color: "var(--text-muted)" }}>
                          Risk Level:
                        </span>
                        <Badge
                          style={{
                            backgroundColor: getRiskLevelColor(
                              client.riskLevel
                            ),
                            color: "white",
                          }}
                        >
                          {client.riskLevel.toUpperCase()}
                        </Badge>
                      </div>

                      <span style={{ color: "var(--text-muted)" }}>
                        Last Contact: {getDaysSince(client.lastContact)} days
                        ago
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Active Alerts */}
            <Card
              className="p-6"
              style={{
                background: "var(--background-card)",
                border: "1px solid var(--accent-purple-glow)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--text-light)" }}
                >
                  Active Alerts
                </h3>
                <Button
                  onClick={handleShowFeedbackModal}
                  style={{
                    backgroundColor: "var(--primary-purple)",
                    color: "white",
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request Feedback
                </Button>
              </div>

              <div className="space-y-3">
                {alerts
                  .filter((alert) => alert.status === "pending")
                  .map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-lg border"
                      style={{
                        borderColor: getPriorityColor(alert.priority),
                        backgroundColor: `${getPriorityColor(
                          alert.priority
                        )}10`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className="h-4 w-4"
                            style={{ color: getPriorityColor(alert.priority) }}
                          />
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "var(--text-light)" }}
                          >
                            {alert.clientName}
                          </span>
                        </div>
                        <Badge
                          style={{
                            backgroundColor: getPriorityColor(alert.priority),
                            color: "white",
                          }}
                        >
                          {alert.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <p
                        className="text-sm mb-3"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {alert.details}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShowConcernModal(alert)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                          style={{
                            backgroundColor: "var(--success)",
                            color: "white",
                          }}
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </AnimatedSection>

        {/* Action Buttons */}
        <AnimatedSection animation="fade-up" delay={0.6}>
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleShowFeedbackModal}
                style={{
                  backgroundColor: "var(--primary-purple)",
                  color: "white",
                }}
              >
                <Heart className="h-4 w-4 mr-2" />
                Collect Client Feedback
              </Button>

              <Button
                variant="outline"
                style={{
                  borderColor: "var(--accent-purple-light)",
                  color: "var(--text-light)",
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Modals */}
        {renderFeedbackModal()}
        {renderConcernModal()}
      </div>
    </section>
  );
}
