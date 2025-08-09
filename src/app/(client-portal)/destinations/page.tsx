import CompactFeatureBadges from "@/components/sections/CompactFeatureBadges";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Destinations
          </h1>
          <p className="text-slate-400 mb-8">
            Explore immigration destinations and requirements.
          </p>
          <CompactFeatureBadges />
          <div className="mt-8 text-center text-white">
            Destination guides coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}