import { User } from "@supabase/auth-helpers-nextjs";

/**
 * Check if a user is an admin based on environment configuration
 * or profile role (if profiles table exists)
 *
 * FUTURE: Implement proper RLS (Row Level Security) for admin routes
 * FUTURE: Consider using a profiles table with role field for better role management
 */
export function isAdmin(user: User | null): boolean {
  if (!user) return false;

  // Check against ADMIN_EMAILS environment variable
  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim()) || [];
  if (adminEmails.includes(user.email || "")) {
    return true;
  }

  // FUTURE: Add profiles table check when implemented
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('role')
  //   .eq('id', user.id)
  //   .single();
  // return profile?.role === 'admin';

  return false;
}

/**
 * Throws an error if user is not an admin
 */
export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error("Forbidden: Admin access required");
  }
}

/**
 * List of default admin emails for development
 */
export const DEFAULT_ADMIN_EMAILS = ["admin@linak.com", "vyshnav@linak.com"];
