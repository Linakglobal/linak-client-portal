// Demo data for LINAK Client Portal
import { Client, Document } from "@/types";

export const demoClients: Client[] = [
  {
    id: "1",
    user_id: "demo-user-1",
    email: "john.anderson@linakglobal.com",
    name: "John Anderson",
    dob: "1985-03-15",
    company: "Anderson Manufacturing Ltd.",
    phone: "+1 (555) 123-4567",
    address: "123 Industrial Ave, Manufacturing District, NY 10001",
    account_status: "active",
    payment_amount: 125000,
    currency: "USD",
    payment_status: "completed",
    contract_type: "Premium Enterprise",
    start_date: "2024-01-15",
    end_date: "2025-01-14",
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    user_id: "demo-user-2",
    email: "sarah.wilson@linakglobal.com",
    name: "Sarah Wilson",
    dob: "1990-07-22",
    company: "Wilson Automation Systems",
    phone: "+1 (555) 987-6543",
    address: "456 Tech Boulevard, Innovation Park, CA 94105",
    account_status: "active",
    payment_amount: 75000,
    currency: "USD",
    payment_status: "completed",
    contract_type: "Standard Business",
    start_date: "2024-03-01",
    end_date: "2025-02-28",
    created_at: "2024-02-25T00:00:00Z",
  },
  {
    id: "3",
    user_id: "demo-user-3",
    email: "michael.chen@linakglobal.com",
    name: "Michael Chen",
    dob: "1982-11-08",
    company: "Chen Industrial Solutions",
    phone: "+1 (555) 456-7890",
    address: "789 Corporate Drive, Business Center, TX 75001",
    account_status: "active",
    payment_amount: 200000,
    currency: "USD",
    payment_status: "completed",
    contract_type: "Platinum Elite",
    start_date: "2023-12-01",
    end_date: "2024-11-30",
    created_at: "2023-11-20T00:00:00Z",
  },
];

export const demoDocuments: Document[] = [
  // Documents for John Anderson
  {
    id: "1",
    client_id: "1",
    file_name: "Contract_Anderson_Manufacturing_2024.pdf",
    description:
      "Main service contract for Anderson Manufacturing Ltd. - Premium Enterprise package including automation systems and maintenance.",
    status: "approved",
    file_path: "demo/documents/1/Contract_Anderson_Manufacturing_2024.pdf",
    file_size: 2456789,
    mime_type: "application/pdf",
    uploaded_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    client_id: "1",
    file_name: "Technical_Specifications_v2.1.pdf",
    description:
      "Detailed technical specifications for the linear actuator systems deployment.",
    status: "approved",
    file_path: "demo/documents/1/Technical_Specifications_v2.1.pdf",
    file_size: 1832456,
    mime_type: "application/pdf",
    uploaded_at: "2024-02-05T14:20:00Z",
  },
  {
    id: "3",
    client_id: "1",
    file_name: "Payment_Receipt_Q1_2024.pdf",
    description:
      "Payment receipt for Q1 2024 services - $31,250 quarterly payment.",
    status: "approved",
    file_path: "demo/documents/1/Payment_Receipt_Q1_2024.pdf",
    file_size: 456789,
    mime_type: "application/pdf",
    uploaded_at: "2024-03-31T16:45:00Z",
  },

  // Documents for Sarah Wilson
  {
    id: "4",
    client_id: "2",
    file_name: "Service_Agreement_Wilson_Automation.pdf",
    description:
      "Standard Business service agreement for Wilson Automation Systems including basic support and maintenance.",
    status: "approved",
    file_path: "demo/documents/2/Service_Agreement_Wilson_Automation.pdf",
    file_size: 1567890,
    mime_type: "application/pdf",
    uploaded_at: "2024-03-01T09:15:00Z",
  },
  {
    id: "5",
    client_id: "2",
    file_name: "Installation_Photos_March_2024.zip",
    description:
      "Installation documentation and photos from the March 2024 deployment at Wilson Automation facility.",
    status: "approved",
    file_path: "demo/documents/2/Installation_Photos_March_2024.zip",
    file_size: 15678901,
    mime_type: "application/zip",
    uploaded_at: "2024-03-15T13:30:00Z",
  },
  {
    id: "6",
    client_id: "2",
    file_name: "Warranty_Certificate.pdf",
    description:
      "5-year warranty certificate for all installed linear actuator systems.",
    status: "pending",
    file_path: "demo/documents/2/Warranty_Certificate.pdf",
    file_size: 789012,
    mime_type: "application/pdf",
    uploaded_at: "2024-07-20T11:00:00Z",
  },

  // Documents for Michael Chen
  {
    id: "7",
    client_id: "3",
    file_name: "Platinum_Elite_Agreement_2023.pdf",
    description:
      "Comprehensive Platinum Elite service agreement for Chen Industrial Solutions including premium support, custom solutions, and priority maintenance.",
    status: "approved",
    file_path: "demo/documents/3/Platinum_Elite_Agreement_2023.pdf",
    file_size: 3456789,
    mime_type: "application/pdf",
    uploaded_at: "2023-12-01T08:00:00Z",
  },
  {
    id: "8",
    client_id: "3",
    file_name: "Custom_Solution_Blueprint.dwg",
    description:
      "CAD blueprints for custom linear actuator solution designed specifically for Chen Industrial's production line.",
    status: "approved",
    file_path: "demo/documents/3/Custom_Solution_Blueprint.dwg",
    file_size: 8901234,
    mime_type: "application/dwg",
    uploaded_at: "2024-01-10T12:45:00Z",
  },
  {
    id: "9",
    client_id: "3",
    file_name: "Maintenance_Schedule_2024.xlsx",
    description:
      "Detailed maintenance schedule for all installed systems throughout 2024.",
    status: "approved",
    file_path: "demo/documents/3/Maintenance_Schedule_2024.xlsx",
    file_size: 567890,
    mime_type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploaded_at: "2024-02-01T15:20:00Z",
  },
  {
    id: "10",
    client_id: "3",
    file_name: "Performance_Report_Q2_2024.pdf",
    description:
      "Quarterly performance report showing system efficiency and uptime statistics.",
    status: "approved",
    file_path: "demo/documents/3/Performance_Report_Q2_2024.pdf",
    file_size: 1234567,
    mime_type: "application/pdf",
    uploaded_at: "2024-06-30T17:30:00Z",
  },
];

// Get demo client by email and dob (for login)
export function getDemoClientByCredentials(
  email: string,
  dob: string
): Client | null {
  return (
    demoClients.find(
      (client) =>
        client.email.toLowerCase() === email.toLowerCase() && client.dob === dob
    ) || null
  );
}

// Get documents for a specific client
export function getDemoDocumentsForClient(clientId: string): Document[] {
  return demoDocuments.filter((doc) => doc.client_id === clientId);
}

// Format currency
export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// Format file size
export function formatFileSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}
