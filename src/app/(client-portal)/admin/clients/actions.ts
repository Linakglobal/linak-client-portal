'use server'

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/roles';
import type { Client, CreateClientInput, UpdateClientInput, ClientListResponse } from '@/types/client';

// Validation schemas
const CreateClientSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  account_status: z.enum(['active', 'inactive', 'suspended']).default('active'),
  payment_amount: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  payment_status: z.enum(['completed', 'pending', 'overdue']).default('pending'),
  contract_type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

const UpdateClientSchema = CreateClientSchema.partial().extend({
  id: z.string().min(1, 'Client ID is required'),
});

/**
 * List clients with optional search and pagination
 */
export async function listClients(
  query?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ClientListResponse> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    // Get current user and check admin permissions
    const { data: { session } } = await supabase.auth.getSession();
    requireAdmin(session?.user || null);

    const offset = (page - 1) * pageSize;

    let queryBuilder = supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    // Apply search filter if provided
    if (query && query.trim()) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%`
      );
    }

    const { data, error, count } = await queryBuilder;

    if (error) {
      console.error('Error listing clients:', error);
      throw new Error('Failed to fetch clients');
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return {
      data: data as Client[] || [],
      count: count || 0,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Error in listClients:', error);
    if (error instanceof Error && error.message === 'Forbidden: Admin access required') {
      throw error;
    }
    throw new Error('Failed to list clients');
  }
}

/**
 * Create a new client
 */
export async function createClient(input: CreateClientInput): Promise<{ success: boolean; client?: Client; error?: string }> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    // Get current user and check admin permissions
    const { data: { session } } = await supabase.auth.getSession();
    requireAdmin(session?.user || null);

    // Validate input
    const validatedInput = CreateClientSchema.parse(input);

    // Check if email already exists
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id')
      .eq('email', validatedInput.email)
      .single();

    if (existingClient) {
      return { success: false, error: 'A client with this email already exists' };
    }

    // Create the client
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...validatedInput,
        user_id: `client_${Date.now()}`, // Generate a simple user_id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating client:', error);
      return { success: false, error: 'Failed to create client' };
    }

    return { success: true, client: data as Client };
  } catch (error) {
    console.error('Error in createClient:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues.map((e) => e.message).join(', ') };
    }
    if (error instanceof Error && error.message === 'Forbidden: Admin access required') {
      throw error;
    }
    return { success: false, error: 'Failed to create client' };
  }
}

/**
 * Update an existing client
 */
export async function updateClient(input: UpdateClientInput): Promise<{ success: boolean; client?: Client; error?: string }> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    // Get current user and check admin permissions
    const { data: { session } } = await supabase.auth.getSession();
    requireAdmin(session?.user || null);

    // Validate input
    const validatedInput = UpdateClientSchema.parse(input);
    const { id, ...updateData } = validatedInput;

    // Check if email is being changed and if it already exists
    if (updateData.email) {
      const { data: existingClient } = await supabase
        .from('clients')
        .select('id')
        .eq('email', updateData.email)
        .neq('id', id)
        .single();

      if (existingClient) {
        return { success: false, error: 'A client with this email already exists' };
      }
    }

    // Update the client
    const { data, error } = await supabase
      .from('clients')
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating client:', error);
      return { success: false, error: 'Failed to update client' };
    }

    if (!data) {
      return { success: false, error: 'Client not found' };
    }

    return { success: true, client: data as Client };
  } catch (error) {
    console.error('Error in updateClient:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues.map((e) => e.message).join(', ') };
    }
    if (error instanceof Error && error.message === 'Forbidden: Admin access required') {
      throw error;
    }
    return { success: false, error: 'Failed to update client' };
  }
}

/**
 * Delete a client
 */
export async function deleteClient(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    // Get current user and check admin permissions
    const { data: { session } } = await supabase.auth.getSession();
    requireAdmin(session?.user || null);

    if (!id || id.trim() === '') {
      return { success: false, error: 'Client ID is required' };
    }

    // Check if client has documents (optional: prevent deletion if has documents)
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('id')
      .eq('client_id', id)
      .limit(1);

    if (docsError) {
      console.error('Error checking client documents:', docsError);
    }

    if (documents && documents.length > 0) {
      return { 
        success: false, 
        error: 'Cannot delete client with existing documents. Please delete documents first.' 
      };
    }

    // Delete the client
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return { success: false, error: 'Failed to delete client' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteClient:', error);
    if (error instanceof Error && error.message === 'Forbidden: Admin access required') {
      throw error;
    }
    return { success: false, error: 'Failed to delete client' };
  }
}
