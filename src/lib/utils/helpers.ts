export function formatFileSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.includes("pdf")) return "📄";
  if (mimeType.includes("image")) return "🖼️";
  if (mimeType.includes("video")) return "🎥";
  if (mimeType.includes("audio")) return "🎵";
  if (mimeType.includes("word") || mimeType.includes("document")) return "📝";
  if (mimeType.includes("excel") || mimeType.includes("spreadsheet"))
    return "📊";
  if (mimeType.includes("powerpoint") || mimeType.includes("presentation"))
    return "📈";
  return "📁";
}

export function validateDateOfBirth(dob: string): boolean {
  const date = new Date(dob);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age >= 16 && age <= 120;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-gray-800 text-gray-100 border-gray-700";
    case "processing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
