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

export interface CreateClientInput {
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
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
  id: string;
}

export interface ClientListResponse {
  data: Client[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
