"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ClientStore } from "@/types";

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      client: null,
      documents: [],
      loading: false,
      error: null,

      setClient: (client) => set({ client, error: null }),

      setDocuments: (documents) => set({ documents }),

      addDocument: (document) =>
        set((state) => ({
          documents: [document, ...state.documents],
        })),

      updateDocument: (id, updates) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates } : doc
          ),
        })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      reset: () =>
        set({
          client: null,
          documents: [],
          loading: false,
          error: null,
        }),
    }),
    {
      name: "linak-client-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        client: state.client,
        documents: state.documents,
      }),
    }
  )
);
