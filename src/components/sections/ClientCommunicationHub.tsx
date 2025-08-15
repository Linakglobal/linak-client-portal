"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Paperclip,
  Send,
  Calendar,
  FileText,
  AlertCircle,
  Share2,
  Camera,
  Star,
  Phone,
  CheckCircle2,
  Globe,
  Users,
  Mail,
  Video,
} from "lucide-react";
import { AnimatedSection } from "@/components/animations/AnimatedComponents";

interface Message {
  id: string;
  sender: string;
  senderType: "client" | "company";
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface Agreement {
  id: string;
  title: string;
  description: string;
  status: "signed" | "unsigned";
  signedDate?: string;
  icon: string;
}

interface ConcernFormData {
  concernType: string;
  description: string;
  impact: string;
  desiredResolution: string;
  contactMethod: "email" | "phone" | "video";
}

interface FeedbackFormData {
  satisfaction: number;
  comments: string;
  recommend: "yes" | "no";
}

export function ClientCommunicationHub() {
  const [activeTab, setActiveTab] = useState("messages-tab");
  const [clientName] = useState("John");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "You",
      senderType: "client",
      content:
        "Hello, I have a question about my work permit status. Could you provide an update?",
      timestamp: "July 25, 2025 - 10:23 AM",
    },
    {
      id: "2",
      sender: "Sarah (Case Officer)",
      senderType: "company",
      content:
        "Hi John, your work permit application is currently in the final review stage. We expect to have an update for you by next week. Is there a specific concern you have?",
      timestamp: "July 25, 2025 - 11:05 AM",
    },
    {
      id: "3",
      sender: "You",
      senderType: "client",
      content:
        "Thanks for the quick response. I'm just planning my move and wanted to make sure things are on track.",
      timestamp: "July 25, 2025 - 11:32 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isConcernModalOpen, setIsConcernModalOpen] = useState(false);
  const [concernForm, setConcernForm] = useState<ConcernFormData>({
    concernType: "",
    description: "",
    impact: "",
    desiredResolution: "",
    contactMethod: "email",
  });
  const [feedbackForm, setFeedbackForm] = useState<FeedbackFormData>({
    satisfaction: 5,
    comments: "",
    recommend: "yes",
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const agreements: Agreement[] = [
    {
      id: "1",
      title: "Service Agreement",
      description:
        "The main agreement covering our services, your responsibilities, and terms of engagement.",
      status: "signed",
      signedDate: "July 15, 2025",
      icon: "document",
    },
    {
      id: "2",
      title: "Payment Schedule",
      description:
        "Document outlining the payment schedule and refund policy for your migration services.",
      status: "signed",
      signedDate: "July 15, 2025",
      icon: "calendar",
    },
    {
      id: "3",
      title: "Social Media Guidelines",
      description:
        "Guidelines on sharing information about your migration process on social media and public platforms.",
      status: "unsigned",
      icon: "facebook",
    },
    {
      id: "4",
      title: "Privacy Consent",
      description:
        "Details on how we handle your personal information and data privacy rights.",
      status: "unsigned",
      icon: "globe",
    },
  ];

  const navigationItems = [
    { id: "messages-tab", label: "Messages", icon: MessageCircle },
    { id: "feedback-tab", label: "Provide Feedback", icon: Star },
    { id: "concerns-tab", label: "Report Concerns", icon: AlertCircle },
    { id: "agreements-tab", label: "Agreements", icon: FileText },
    { id: "success-share-tab", label: "Share Success", icon: Users },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        senderType: "client",
        content: newMessage,
        timestamp: new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleConcernSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Concern submitted:", concernForm);
    setIsConcernModalOpen(false);
    setConcernForm({
      concernType: "",
      description: "",
      impact: "",
      desiredResolution: "",
      contactMethod: "email",
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackForm);
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  const getIconForAgreement = (iconType: string) => {
    switch (iconType) {
      case "document":
        return <FileText className="w-6 h-6" />;
      case "calendar":
        return <Calendar className="w-6 h-6" />;
      case "facebook":
        return <Share2 className="w-6 h-6" />;
      case "globe":
        return <Globe className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Client <span className="text-emerald-600">Communication Hub</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your centralized platform for seamless communication, feedback,
              and document management
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AnimatedSection
            animation="fade-right"
            delay={0.2}
            className="lg:col-span-1"
          >
            <Card className="p-6 backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              {/* Client Status */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                  {clientName.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Welcome,{" "}
                  <span className="text-emerald-600">{clientName}</span>
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Active Client</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mb-8">
                <ul className="space-y-2">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            activeTab === item.id
                              ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Help Section */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to assist you with any questions or concerns.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </AnimatedSection>

          {/* Main Content */}
          <AnimatedSection
            animation="fade-left"
            delay={0.3}
            className="lg:col-span-3"
          >
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl overflow-hidden">
              {/* Messages Tab */}
              {activeTab === "messages-tab" && (
                <div className="h-full">
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Message Center
                    </h3>
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      New Message
                    </Button>
                  </div>

                  <div className="h-96 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderType === "client"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-md p-4 rounded-2xl ${
                            message.senderType === "client"
                              ? "bg-gradient-to-br from-blue-500 to-emerald-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">
                              {message.sender}
                            </span>
                            <span
                              className={`text-xs ${
                                message.senderType === "client"
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 resize-none rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleSendMessage} size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback-tab" && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Provide Feedback
                  </h3>

                  {feedbackSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Thank You!
                      </h4>
                      <p className="text-gray-600">
                        We appreciate your feedback!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-8">
                        Your feedback helps us improve our services. Please
                        share your experience with us.
                      </p>

                      <form
                        onSubmit={handleFeedbackSubmit}
                        className="space-y-6"
                      >
                        <div>
                          <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-4">
                              How satisfied are you with our services?
                            </legend>
                            <div className="flex space-x-4">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <label
                                  key={rating}
                                  className="flex flex-col items-center cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="satisfaction"
                                    value={rating}
                                    checked={
                                      feedbackForm.satisfaction === rating
                                    }
                                    onChange={(e) =>
                                      setFeedbackForm((prev) => ({
                                        ...prev,
                                        satisfaction: parseInt(e.target.value),
                                      }))
                                    }
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${
                                      feedbackForm.satisfaction === rating
                                        ? "border-blue-500 bg-blue-50 text-blue-600"
                                        : "border-gray-300 text-gray-500 hover:border-gray-400"
                                    }`}
                                  >
                                    {rating}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {rating === 1 && "Very Dissatisfied"}
                                    {rating === 3 && "Neutral"}
                                    {rating === 5 && "Very Satisfied"}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </fieldset>
                        </div>

                        <div>
                          <label
                            htmlFor="feedback-comments"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Comments
                          </label>
                          <textarea
                            id="feedback-comments"
                            value={feedbackForm.comments}
                            onChange={(e) =>
                              setFeedbackForm((prev) => ({
                                ...prev,
                                comments: e.target.value,
                              }))
                            }
                            rows={4}
                            placeholder="Please share your thoughts on our service..."
                            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <fieldset>
                            <legend className="block text-sm font-medium text-gray-700 mb-4">
                              Would you recommend our services to others?
                            </legend>
                            <div className="flex space-x-6">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="recommend"
                                  value="yes"
                                  checked={feedbackForm.recommend === "yes"}
                                  onChange={(e) =>
                                    setFeedbackForm((prev) => ({
                                      ...prev,
                                      recommend: e.target.value as "yes" | "no",
                                    }))
                                  }
                                  className="mr-2"
                                />{" "}
                                Yes
                              </label>
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="recommend"
                                  value="no"
                                  checked={feedbackForm.recommend === "no"}
                                  onChange={(e) =>
                                    setFeedbackForm((prev) => ({
                                      ...prev,
                                      recommend: e.target.value as "yes" | "no",
                                    }))
                                  }
                                  className="mr-2"
                                />{" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </div>

                        <Button type="submit" className="w-full">
                          Submit Feedback
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Concerns Tab */}
              {activeTab === "concerns-tab" && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Report Concerns
                  </h3>

                  <div className="mb-8">
                    <p className="text-gray-600">
                      If you're experiencing any issues or have concerns about
                      your case, please let us know so we can address them
                      promptly.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Private Consultation
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Schedule a private call with your case manager to
                        discuss any concerns confidentially.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
                    </Card>

                    <Card className="p-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Submit Formal Concern
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Submit a detailed description of your concern for our
                        management team to review.
                      </p>
                      <Dialog
                        open={isConcernModalOpen}
                        onOpenChange={setIsConcernModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Button className="w-full">Submit Concern</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submit Your Concern</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={handleConcernSubmit}
                            className="space-y-6"
                          >
                            <div>
                              <label
                                htmlFor="concern-type"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                Type of Concern
                              </label>
                              <select
                                id="concern-type"
                                value={concernForm.concernType}
                                onChange={(e) =>
                                  setConcernForm((prev) => ({
                                    ...prev,
                                    concernType: e.target.value,
                                  }))
                                }
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                              >
                                <option value="">Select a category</option>
                                <option value="communication">
                                  Communication Issues
                                </option>
                                <option value="process">Process Delays</option>
                                <option value="service">Service Quality</option>
                                <option value="payment">Payment Issues</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="concern-description"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                Describe your concern
                              </label>
                              <textarea
                                id="concern-description"
                                value={concernForm.description}
                                onChange={(e) =>
                                  setConcernForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                                rows={5}
                                placeholder="Please provide details about your concern..."
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="concern-impact"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                How has this impacted you?
                              </label>
                              <textarea
                                id="concern-impact"
                                value={concernForm.impact}
                                onChange={(e) =>
                                  setConcernForm((prev) => ({
                                    ...prev,
                                    impact: e.target.value,
                                  }))
                                }
                                rows={3}
                                placeholder="Please explain how this issue has affected you..."
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="concern-resolution"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                What would resolve this issue for you?
                              </label>
                              <textarea
                                id="concern-resolution"
                                value={concernForm.desiredResolution}
                                onChange={(e) =>
                                  setConcernForm((prev) => ({
                                    ...prev,
                                    desiredResolution: e.target.value,
                                  }))
                                }
                                rows={3}
                                placeholder="What outcome would you like to see?"
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <fieldset>
                                <legend className="block text-sm font-medium text-gray-700 mb-4">
                                  Preferred contact method for this concern:
                                </legend>
                                <div className="flex space-x-6">
                                  {[
                                    {
                                      value: "email",
                                      label: "Email",
                                      icon: Mail,
                                    },
                                    {
                                      value: "phone",
                                      label: "Phone",
                                      icon: Phone,
                                    },
                                    {
                                      value: "video",
                                      label: "Video Call",
                                      icon: Video,
                                    },
                                  ].map(({ value, label, icon: Icon }) => (
                                    <label
                                      key={value}
                                      className="flex items-center cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name="contactMethod"
                                        value={value}
                                        checked={
                                          concernForm.contactMethod === value
                                        }
                                        onChange={(e) =>
                                          setConcernForm((prev) => ({
                                            ...prev,
                                            contactMethod: e.target.value as
                                              | "email"
                                              | "phone"
                                              | "video",
                                          }))
                                        }
                                        className="mr-2"
                                      />
                                      <Icon className="w-4 h-4 mr-1" />
                                      {label}
                                    </label>
                                  ))}
                                </div>
                              </fieldset>
                            </div>

                            <Button type="submit" className="w-full">
                              Submit Concern
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </Card>
                  </div>

                  <Card className="p-6 bg-amber-50 border-amber-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                      <div>
                        <p className="text-amber-800">
                          We take all client concerns seriously and aim to
                          resolve them within 48 hours. Please remember that
                          maintaining professional communication helps us serve
                          you better.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Agreements Tab */}
              {activeTab === "agreements-tab" && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Client Agreements
                  </h3>

                  <div className="mb-8">
                    <p className="text-gray-600">
                      Review and manage your agreements with Linak Migration
                      Service.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {agreements.map((agreement) => (
                      <Card
                        key={agreement.id}
                        className={`p-6 transition-all duration-200 ${
                          agreement.status === "signed"
                            ? "border-green-200 bg-green-50/30"
                            : "border-amber-200 bg-amber-50/30"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-lg ${
                              agreement.status === "signed"
                                ? "bg-green-100 text-green-600"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {getIconForAgreement(agreement.icon)}
                          </div>

                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {agreement.title}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {agreement.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>
                                {agreement.signedDate
                                  ? `Signed on: ${agreement.signedDate}`
                                  : "Pending signature"}
                              </span>
                              <Badge
                                variant={
                                  agreement.status === "signed"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {agreement.status === "signed"
                                  ? "Signed"
                                  : "Unsigned"}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <Button
                              variant={
                                agreement.status === "signed"
                                  ? "outline"
                                  : "default"
                              }
                              size="sm"
                            >
                              {agreement.status === "signed"
                                ? "View"
                                : "Review & Sign"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Share Tab */}
              {activeTab === "success-share-tab" && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Share Your Success
                  </h3>

                  <div className="mb-8">
                    <p className="text-gray-600">
                      We love celebrating your migration successes! Share your
                      story to inspire others on their journey.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold mb-3">
                        Share a Testimonial
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Write a testimonial about your experience with Linak
                        Migration Service.
                      </p>
                      <Button className="w-full">Submit Testimonial</Button>
                    </Card>

                    <Card className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Share2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold mb-3">
                        Share on Social Media
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Share your success on social media using our guidelines.
                      </p>
                      <Button variant="outline" className="w-full">
                        View Guidelines
                      </Button>
                    </Card>

                    <Card className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold mb-3">
                        Record Video Testimony
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm">
                        Record a short video sharing your migration journey.
                      </p>
                      <Button variant="outline" className="w-full">
                        Schedule Recording
                      </Button>
                    </Card>
                  </div>

                  <Card className="p-6 bg-slate-50">
                    <h4 className="text-lg font-semibold mb-4">
                      Content Guidelines
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Do not share confidential information about your
                          application
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Only post content after your visa/permit has been
                          approved
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Always maintain professional language when referencing
                          our services
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          If sharing photos, ensure they represent you and our
                          services positively
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>
                          Tag us using @LinakMigration for better engagement
                        </span>
                      </li>
                    </ul>
                  </Card>
                </div>
              )}
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
