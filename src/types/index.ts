export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'admin' | 'user' | 'manager';
  accountType: 'basic' | 'premium' | 'enterprise';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  orderDate: Date;
  estimatedDelivery?: Date;
  shippingAddress: Address;
  billingAddress: Address;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  specifications: ProductSpecification[];
  images: string[];
  price: number;
  currency: string;
  availability: 'in-stock' | 'out-of-stock' | 'discontinued';
  dataSheet?: string;
  manualUrl?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  company?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'order';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  attachments?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface DashboardStats {
  activeOrders: number;
  totalProducts: number;
  supportTickets: number;
  accountStatus: string;
}
