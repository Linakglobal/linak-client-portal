import { supabase } from "./client";
import { Client } from "@/types";
import { getDemoClientByCredentials } from "@/lib/demo-data";

export async function signInWithEmail(email: string, dob: string) {
  try {
    // Check if using placeholder credentials (demo mode)
    const isPlaceholderMode =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-id") ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY.includes("placeholder");

    if (isPlaceholderMode) {
      console.log("🔧 Demo mode: Using demo client authentication");

      // Convert date format from MM/DD/YYYY to YYYY-MM-DD if needed
      let formattedDob = dob;
      if (dob.includes("/")) {
        const [month, day, year] = dob.split("/");
        formattedDob = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
      }

      // Check if the email/dob combination exists in demo data
      const demoClient = getDemoClientByCredentials(email, formattedDob);
      if (!demoClient) {
        throw new Error(
          "Invalid email or date of birth. Please check your credentials and try again."
        );
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store demo client in localStorage for demo purposes
      localStorage.setItem("demo-client", JSON.stringify(demoClient));

      return { success: true, client: demoClient };
    }

    // First, check if client exists with this email and DOB
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .eq("dob", dob)
      .single();

    if (clientError && clientError.code !== "PGRST116") {
      throw clientError;
    }

    if (!clientData) {
      throw new Error("Invalid email or date of birth");
    }

    // Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      // Return a demo user for development
      return null; // Will redirect to login page
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getCurrentClient(): Promise<Client | null> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      // Return demo client data for development
      return {
        id: "demo-client-id",
        user_id: "demo-user-id",
        email: "demo@linak.com",
        name: "Demo Client",
        dob: "1990-01-01",
        created_at: "2024-01-01T00:00:00Z",
      };
    }

    const user = await getCurrentUser();
    if (!user) return null;

    const { data: client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error getting current client:", error);
      return null;
    }

    return client;
  } catch (error) {
    console.error("Error getting current client:", error);
    return null;
  }
}
