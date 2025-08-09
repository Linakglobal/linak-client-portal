import { Clock, MessageSquare, Eye, Crown, FileText, Settings } from "lucide-react";

interface CompactFeatureBadgesProps {
  tone?: "dark" | "light";
}

export default function CompactFeatureBadges({ tone = "dark" }: Readonly<CompactFeatureBadgesProps>) {
  const features = [
    {
      title: "24×7 Support",
      description: "Real-time assistance",
      icon: Clock,
      color: "purple",
    },
    {
      title: "Live Updates",
      description: "Email & SMS alerts",
      icon: MessageSquare,
      color: "blue",
    },
    {
      title: "Transparency",
      description: "Stage tracking",
      icon: Eye,
      color: "pink",
    },
    {
      title: "VIP Priority",
      description: "Expert handling",
      icon: Crown,
      color: "green",
    },
    {
      title: "Documents",
      description: "Secure access",
      icon: FileText,
      color: "yellow",
    },
    {
      title: "Custom Requests",
      description: "Personal requirements",
      icon: Settings,
      color: "cyan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {features.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <div
            key={feature.title}
            className={`
              relative p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5
              ${tone === "dark" 
                ? "bg-slate-800/30 border-slate-700/30 hover:border-red-500/30" 
                : "bg-white/10 border-white/20 hover:border-white/40"
              }
              backdrop-blur-sm group cursor-pointer
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${tone === "dark" 
                  ? "bg-gradient-to-br from-slate-700 to-slate-800" 
                  : "bg-white/20"
                }
              `}>
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {feature.title}
                </p>
                <p className={`text-xs ${tone === "dark" ? "text-slate-400" : "text-slate-300"}`}>
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}