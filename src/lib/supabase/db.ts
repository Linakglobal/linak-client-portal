// Mock database functions for demo purposes

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  uploadedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getClientDocuments(_clientId: string): Promise<Document[]> {
  // Mock documents for demo - clientId parameter available for future use
  const mockDocuments: Document[] = [
    {
      id: "1",
      name: "Passport Copy",
      type: "Identity",
      status: "approved",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2", 
      name: "Educational Certificate",
      type: "Education",
      status: "pending",
      uploadedAt: "2024-01-20",
    },
    {
      id: "3",
      name: "Work Experience Letter",
      type: "Employment",
      status: "approved", 
      uploadedAt: "2024-01-25",
    },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockDocuments;
}

export async function uploadDocument(clientId: string, file: File): Promise<Document> {
  // Mock upload for demo
  const mockDoc: Document = {
    id: Date.now().toString(),
    name: file.name,
    type: "Document",
    status: "pending",
    uploadedAt: new Date().toISOString().split("T")[0],
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockDoc;
}