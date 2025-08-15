import { supabase } from "./client";
import { Client, Document } from "@/types";
import { getDemoDocumentsForClient, demoClients } from "@/lib/demo-data";

// Client operations
export async function getClientByEmail(email: string): Promise<Client | null> {
  try {
    // Check if using placeholder credentials - use demo data
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.log("🔧 Demo mode: Getting client from demo data");
      const client = demoClients.find(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );
      return client || null;
    }

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting client:", error);
    return null;
  }
}

export async function updateClient(
  clientId: string,
  updates: Partial<Client>
): Promise<Client | null> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      // Return demo update success for development
      console.log("👤 Demo mode: Client update simulated for:", clientId);
      return {
        id: clientId,
        user_id: "demo-user",
        email: "demo@example.com",
        name: "Demo Client",
        dob: "1990-01-01",
        created_at: new Date().toISOString(),
        ...updates,
      };
    }

    const { data, error } = await supabase
      .from("clients")
      .update(updates)
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
}

// Document operations
export async function getClientDocuments(
  clientId: string
): Promise<Document[]> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.log("🔧 Demo mode: Getting documents from demo data");
      return getDemoDocumentsForClient(clientId);
    }

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("client_id", clientId)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting client documents:", error);
    return [];
  }
}

export async function uploadDocument(
  clientId: string,
  file: File,
  description: string
): Promise<Document | null> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      // Return demo upload success for development
      console.log("📁 Demo mode: File upload simulated for:", file.name);
      return {
        id: `demo-upload-${Date.now()}`,
        client_id: clientId,
        file_name: file.name,
        description,
        status: "pending" as const,
        file_path: `demo/${file.name}`,
        file_size: file.size,
        mime_type: file.type,
        uploaded_at: new Date().toISOString(),
      };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${clientId}/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("client-documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data, error } = await supabase
      .from("documents")
      .insert({
        client_id: clientId,
        file_name: file.name,
        description,
        status: "pending",
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}

export async function getDocumentDownloadUrl(
  filePath: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from("client-documents")
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null;
  }
}

export async function deleteDocument(
  documentId: string,
  filePath: string
): Promise<boolean> {
  try {
    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from("client-documents")
      .remove([filePath]);

    if (storageError) throw storageError;

    // Delete document record
    const { error: dbError } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (dbError) throw dbError;
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
}
