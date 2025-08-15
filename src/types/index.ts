export interface Client {
  id: string;
  user_id: string;
  email: string;
  name: string;
  dob: string;
  company?: string;
  phone?: string;
  address?: string;
  account_status?: "active" | "inactive" | "suspended";
  payment_amount?: number;
  currency?: string;
  payment_status?: "completed" | "pending" | "overdue";
  contract_type?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface Document {
  id: string;
  client_id: string;
  file_name: string;
  description: string;
  status: "pending" | "processing" | "completed" | "rejected" | "approved";
  file_path: string;
  file_size?: number;
  mime_type?: string;
  uploaded_at: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  client: Client | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ClientStore {
  client: Client | null;
  documents: Document[];
  loading: boolean;
  error: string | null;
  setClient: (client: Client | null) => void;
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export interface LoginFormData {
  email: string;
  dob: string;
}

export interface UploadFormData {
  file: File;
  description: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  dob: string;
}
