import { create } from "zustand";

interface Client {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  uploadedAt: string;
}

interface ClientStore {
  client: Client | null;
  documents: Document[];
  loading: boolean;
  setClient: (client: Client | null) => void;
  setDocuments: (documents: Document[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  client: null,
  documents: [],
  loading: false,
  setClient: (client) => set({ client }),
  setDocuments: (documents) => set({ documents }),
  setLoading: (loading) => set({ loading }),
}));