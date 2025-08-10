"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  AlertTriangle,
  Loader2,
  Upload,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import Papa from 'papaparse';
import {
  listClients,
  createClient,
  updateClient,
  deleteClient,
} from "./actions";
import type { Client } from "@/types/client";

interface ClientsPageProps {
  isAdmin?: boolean;
}

export default function AdminClientsPage({ isAdmin = true }: ClientsPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // CSV Import states
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Form data states
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    dob: "",
    company: "",
    phone: "",
    address: "",
    account_status: "active" as const,
    payment_amount: "",
    currency: "USD",
    payment_status: "pending" as const,
    contract_type: "",
    start_date: "",
    end_date: "",
  });

  const pageSize = 10;

  // Load clients data
  const loadClients = useCallback(
    async (page = 1, query = "") => {
      try {
        setLoading(true);
        const result = await listClients(query, page, pageSize);
        setClients(result.data);
        setTotalPages(result.totalPages);
        setTotalCount(result.count);
        setCurrentPage(result.page);
      } catch (error) {
        console.error("Error loading clients:", error);
        if (error instanceof Error && error.message.includes("Forbidden")) {
          router.push("/dashboard?error=access-denied");
          return;
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Initial load
  useEffect(() => {
    loadClients(1, searchQuery);
  }, [loadClients, searchQuery]);

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    loadClients(1, query);
  };

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadClients(page, searchQuery);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      dob: "",
      company: "",
      phone: "",
      address: "",
      account_status: "active",
      payment_amount: "",
      currency: "USD",
      payment_status: "pending",
      contract_type: "",
      start_date: "",
      end_date: "",
    });
  };

  // Create client handler
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const data = {
          ...formData,
          payment_amount: formData.payment_amount
            ? parseFloat(formData.payment_amount)
            : undefined,
        };
        const result = await createClient(data);
        if (result.success) {
          setShowCreateDialog(false);
          resetForm();
          loadClients(currentPage, searchQuery);
          alert("Client created successfully!");
        } else {
          alert(result.error || "Failed to create client");
        }
      } catch (error) {
        console.error("Error creating client:", error);
        alert("Failed to create client");
      }
    });
  };

  // Edit client handler
  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    startTransition(async () => {
      try {
        const data = {
          ...formData,
          id: selectedClient.id,
          payment_amount: formData.payment_amount
            ? parseFloat(formData.payment_amount)
            : undefined,
        };
        const result = await updateClient(data);
        if (result.success) {
          setShowEditDialog(false);
          setSelectedClient(null);
          resetForm();
          loadClients(currentPage, searchQuery);
          alert("Client updated successfully!");
        } else {
          alert(result.error || "Failed to update client");
        }
      } catch (error) {
        console.error("Error updating client:", error);
        alert("Failed to update client");
      }
    });
  };

  // Delete client handler
  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    startTransition(async () => {
      try {
        const result = await deleteClient(selectedClient.id);
        if (result.success) {
          setShowDeleteDialog(false);
          setSelectedClient(null);
          loadClients(currentPage, searchQuery);
          alert("Client deleted successfully!");
        } else {
          alert(result.error || "Failed to delete client");
        }
      } catch (error) {
        console.error("Error deleting client:", error);
        alert("Failed to delete client");
      }
    });
  };

  // Open edit dialog
  const openEditDialog = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      email: client.email,
      name: client.name,
      dob: client.dob,
      company: client.company || "",
      phone: client.phone || "",
      address: client.address || "",
      account_status: client.account_status || "active",
      payment_amount: client.payment_amount?.toString() || "",
      currency: client.currency || "USD",
      payment_status: client.payment_status || "pending",
      contract_type: client.contract_type || "",
      start_date: client.start_date || "",
      end_date: client.end_date || "",
    });
    setShowEditDialog(true);
  };

  // Open delete dialog
  const openDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteDialog(true);
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetForm();
    setShowCreateDialog(true);
  };

  // CSV Import handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setImportResults(null);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleCsvImport = async () => {
    if (!csvFile) return;

    setIsImporting(true);
    setImportResults(null);

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const errors: string[] = [];
        let successCount = 0;

        // Process each row
        for (let i = 0; i < results.data.length; i++) {
          const row = results.data[i] as any;
          
          try {
            // Validate required fields
            if (!row.name || !row.email || !row.dob) {
              errors.push(`Row ${i + 1}: Missing required fields (name, email, dob)`);
              continue;
            }

            // Create client data
            const clientData = {
              name: row.name,
              email: row.email,
              dob: row.dob,
              company: row.company || '',
              phone: row.phone || '',
              address: row.address || '',
              account_status: (row.account_status as 'active' | 'inactive' | 'suspended') || 'active',
              payment_amount: row.payment_amount ? parseFloat(row.payment_amount) : undefined,
              currency: row.currency || 'USD',
              payment_status: (row.payment_status as 'completed' | 'pending' | 'overdue') || 'pending',
              contract_type: row.contract_type || '',
              start_date: row.start_date || '',
              end_date: row.end_date || '',
            };

            // Attempt to create client
            const result = await createClient(clientData);
            if (result.success) {
              successCount++;
            } else {
              errors.push(`Row ${i + 1} (${row.name}): ${result.error || 'Failed to create client'}`);
            }
          } catch (error) {
            errors.push(`Row ${i + 1} (${row.name || 'Unknown'}): ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        setImportResults({ success: successCount, errors });
        setIsImporting(false);
        
        // Refresh the clients list
        if (successCount > 0) {
          loadClients(currentPage, searchQuery);
        }
      },
      error: (error) => {
        setImportResults({ success: 0, errors: [`CSV parsing error: ${error.message}`] });
        setIsImporting(false);
      }
    });
  };

  const downloadSampleCsv = () => {
    const csvContent = `name,email,dob,company,phone,address,account_status,payment_amount,currency,payment_status,contract_type,start_date,end_date
John Doe,john@example.com,1985-01-15,Example Corp,+1234567890,123 Main St,active,5000.00,USD,completed,Premium,2024-01-01,2024-12-31
Jane Smith,jane@example.com,1990-05-20,Tech Solutions,+1987654321,456 Oak Ave,active,3000.00,USD,pending,Standard,2024-02-01,2024-11-30`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clients-sample.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Access denied state
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-white/70">
              You don&apos;t have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.back()}
              className="w-full"
              variant="outline"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Helper function to render form
  const renderForm = (
    onSubmit: (e: React.FormEvent) => void,
    submitText: string
  ) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Date of Birth *
          </label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Phone
          </label>
          <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Company
        </label>
        <Input
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Address
        </label>
        <Input
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Status
          </label>
          <select
            value={formData.account_status}
            onChange={(e) =>
              setFormData({
                ...formData,
                account_status: e.target.value as
                  | "active"
                  | "inactive"
                  | "suspended",
              })
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Payment Status
          </label>
          <select
            value={formData.payment_status}
            onChange={(e) =>
              setFormData({
                ...formData,
                payment_status: e.target.value as
                  | "completed"
                  | "pending"
                  | "overdue",
              })
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Payment Amount
          </label>
          <Input
            type="number"
            step="0.01"
            value={formData.payment_amount}
            onChange={(e) =>
              setFormData({ ...formData, payment_amount: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Start Date
          </label>
          <Input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            End Date
          </label>
          <Input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Contract Type
        </label>
        <Input
          value={formData.contract_type}
          onChange={(e) =>
            setFormData({ ...formData, contract_type: e.target.value })
          }
          placeholder="e.g., Premium Enterprise, Standard Business"
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setShowCreateDialog(false);
            setShowEditDialog(false);
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {submitText}...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Client Management
              </h1>
              <p className="text-white/70">
                Manage clients, view details, and handle documents
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              {totalCount} total client{totalCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Actions Bar */}
        <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowImportDialog(true)}
                  variant="outline"
                  className="border-white/20 text-white/80 hover:bg-white/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
                <Button
                  onClick={openCreateDialog}
                  className="shrink-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Client
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No clients found</p>
                <p className="text-sm text-white/40">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/80">Name</TableHead>
                      <TableHead className="text-white/80">Email</TableHead>
                      <TableHead className="text-white/80">Company</TableHead>
                      <TableHead className="text-white/80">Status</TableHead>
                      <TableHead className="text-white/80">Payment</TableHead>
                      <TableHead className="text-white/80">
                        Contract Period
                      </TableHead>
                      <TableHead className="text-white/80 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => {
                      const statusVariant =
                        client.account_status === "active"
                          ? "default"
                          : client.account_status === "suspended"
                          ? "destructive"
                          : "secondary";
                      const statusClassName =
                        client.account_status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : client.account_status === "suspended"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30";
                      const paymentClassName =
                        client.payment_status === "completed"
                          ? "border-green-500/30 text-green-400"
                          : client.payment_status === "overdue"
                          ? "border-red-500/30 text-red-400"
                          : "border-yellow-500/30 text-yellow-400";

                      return (
                        <TableRow
                          key={client.id}
                          className="border-white/20 hover:bg-white/5"
                        >
                          <TableCell>
                            <div>
                              <p className="text-white font-medium">
                                {client.name}
                              </p>
                              <p className="text-xs text-white/60">
                                {client.dob}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/80">
                            {client.email}
                          </TableCell>
                          <TableCell className="text-white/80">
                            {client.company || "-"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={statusVariant}
                              className={statusClassName}
                            >
                              {client.account_status || "active"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              {client.payment_amount && (
                                <p className="text-white font-medium">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: client.currency || "USD",
                                  }).format(client.payment_amount)}
                                </p>
                              )}
                              <Badge
                                variant="outline"
                                className={paymentClassName}
                              >
                                {client.payment_status || "pending"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {client.start_date && (
                                <p className="text-white/80">
                                  {new Date(
                                    client.start_date
                                  ).toLocaleDateString()}
                                </p>
                              )}
                              {client.end_date && (
                                <p className="text-white/60">
                                  to{" "}
                                  {new Date(
                                    client.end_date
                                  ).toLocaleDateString()}
                                </p>
                              )}
                              {client.contract_type && (
                                <p className="text-xs text-white/50 mt-1">
                                  {client.contract_type}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEditDialog(client)}
                                className="border-white/20 text-white/80 hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openDeleteDialog(client)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="border-white/20 text-white/80 hover:bg-white/10"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                    className={
                      page === currentPage
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-white/20 text-white/80 hover:bg-white/10"
                    }
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="border-white/20 text-white/80 hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        )}

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Client
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Add a new client to the system with their details.
              </DialogDescription>
            </DialogHeader>
            {renderForm(handleCreateClient, "Create Client")}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Client</DialogTitle>
              <DialogDescription className="text-white/70">
                Update client information and settings.
              </DialogDescription>
            </DialogHeader>
            {renderForm(handleEditClient, "Update Client")}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Delete Client
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Are you sure you want to delete{" "}
                <strong className="text-white">{selectedClient?.name}</strong>?
                This action cannot be undone and will permanently remove all
                client data.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteClient}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Client"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* CSV Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-green-400" />
                Import Clients from CSV
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Upload a CSV file to bulk import client data. Download the sample template to see the required format.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* File Upload Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Upload CSV File</h3>
                  <Button
                    onClick={downloadSampleCsv}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white/80 hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                  <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <div>
                    <label htmlFor="csvFile" className="cursor-pointer">
                      <span className="text-white font-medium hover:text-blue-400 transition-colors">
                        Click to select CSV file
                      </span>
                      <input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    <p className="text-slate-400 text-sm mt-2">
                      Only CSV files are supported
                    </p>
                  </div>
                  {csvFile && (
                    <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                      <p className="text-white text-sm">
                        Selected: {csvFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Import Results */}
              {importResults && (
                <div className="space-y-3">
                  <h3 className="text-white font-medium">Import Results</h3>
                  
                  {importResults.success > 0 && (
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        ✅ Successfully imported {importResults.success} client{importResults.success !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                  
                  {importResults.errors.length > 0 && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm font-medium mb-2">
                        ❌ {importResults.errors.length} error{importResults.errors.length !== 1 ? 's' : ''} occurred:
                      </p>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {importResults.errors.map((error, index) => (
                          <p key={index} className="text-red-400 text-xs">
                            {error}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowImportDialog(false);
                    setCsvFile(null);
                    setImportResults(null);
                  }}
                  disabled={isImporting}
                >
                  {importResults ? 'Close' : 'Cancel'}
                </Button>
                <Button 
                  onClick={handleCsvImport}
                  disabled={!csvFile || isImporting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Import Clients
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
