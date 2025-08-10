"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/hooks/use-client-store";
import { getCurrentUser } from "@/lib/supabase/auth";
import { Navigation } from "@/components/layout/navigation";

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { client, setClient, setLoading, setError } = useClientStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // Set demo client data (replace with actual user data when Supabase is configured)
        setClient({
          id: user.id,
          user_id: user.id,
          name: user.email?.split("@")[0] || "Client",
          email: user.email || "",
          dob: "1990-01-01",
          created_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError("Failed to authenticate");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    // Only run if client is not already loaded
    if (!client) {
      initializeAuth();
    }
  }, [client, router, setClient, setLoading, setError]);

  return <Navigation>{children}</Navigation>;
}
