import { supabase } from "./client";

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

// Upload file to Supabase Storage
export async function uploadFile(
  file: File,
  clientId: string,
  folder: string = "documents"
): Promise<UploadResult> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File upload simulated");
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        filePath: `demo/${folder}/${clientId}/${file.name}`,
      };
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const filePath = `${folder}/${clientId}/${fileName}`;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from("client-documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return {
      success: true,
      filePath: data.path,
    };
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload file";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Download file from Supabase Storage
export async function downloadFile(filePath: string): Promise<Blob | null> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File download simulated");
      return new Blob(["Demo file content"], { type: "application/pdf" });
    }

    const { data, error } = await supabase.storage
      .from("client-documents")
      .download(filePath);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Download error:", error);
    return null;
  }
}

// Get signed URL for file access
export async function getFileUrl(
  filePath: string,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File URL simulated");
      return `https://demo.supabase.co/storage/v1/object/public/client-documents/${filePath}`;
    }

    const { data, error } = await supabase.storage
      .from("client-documents")
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Get URL error:", error);
    return null;
  }
}

// Delete file from storage
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File deletion simulated");
      return true;
    }

    const { error } = await supabase.storage
      .from("client-documents")
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

// List files in a directory
export async function listFiles(
  clientId: string,
  folder: string = "documents"
): Promise<string[]> {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File listing simulated");
      return [
        `${folder}/${clientId}/demo_document_1.pdf`,
        `${folder}/${clientId}/demo_document_2.pdf`,
        `${folder}/${clientId}/demo_image.jpg`,
      ];
    }

    const { data, error } = await supabase.storage
      .from("client-documents")
      .list(`${folder}/${clientId}`, {
        limit: 100,
        offset: 0,
      });

    if (error) {
      throw error;
    }

    return data.map((file) => `${folder}/${clientId}/${file.name}`);
  } catch (error) {
    console.error("List files error:", error);
    return [];
  }
}

// Get file size and metadata
export async function getFileInfo(filePath: string) {
  try {
    // Check if using placeholder credentials
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co"
    ) {
      console.warn("⚠️ Demo mode: File info simulated");
      return {
        size: 1024000, // 1MB
        lastModified: new Date().toISOString(),
        contentType: "application/pdf",
      };
    }

    const { data, error } = await supabase.storage
      .from("client-documents")
      .list(filePath.split("/").slice(0, -1).join("/"), {
        limit: 1,
        search: filePath.split("/").pop(),
      });

    if (error || !data || data.length === 0) {
      throw new Error("File not found");
    }

    const fileData = data[0];
    return {
      size: fileData.metadata?.size || 0,
      lastModified: fileData.updated_at || fileData.created_at,
      contentType: fileData.metadata?.mimetype || "application/octet-stream",
    };
  } catch (error) {
    console.error("Get file info error:", error);
    return null;
  }
}
