
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MASTERS = 'MASTERS',
  SALES = 'SALES',
  INVENTORY = 'INVENTORY',
  DELIVERY = 'DELIVERY',
  TABLES = 'TABLES',
  REPORTS = 'REPORTS',
  CONFIG = 'CONFIG',
  VOUCHER = 'VOUCHER'
}

export interface Product {
  id: string; // Mapeado de CodPro
  name: string; // Mapeado de Nombre
  category: string; // Mapeado de Clinea
  price: number; // Mapeado de PventaMa
  image: string; // Mapeado de ImagenUrl
  stock: number; // Mapeado de Stock
  unit: string; // Mapeado de Unimed
  cost?: number; // Costo
}

export interface Supplier {
  id: string; // CodProv
  name: string; // Razon
  document: string; // Documento
  contact: string; // Atencion
  phone: string; // Telefono1
  email: string; // Email
}

export interface Employee {
  id: string; // Codemp
  name: string; // Nombre
  document: string; // Documento
  role: string; // Tipo (Mapeado a etiqueta)
  phone: string; // Celular
  salary?: number; // Sueldo
}

export interface Customer {
  id: string; // Codclie
  name: string; // Razon
  document: string; // Documento
  email: string; // Email
  phone: string; // Telefono1
  address: string; // Direccion
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minLevel: number;
  unit: string;
  status: 'SUFICIENTE' | 'STOCK BAJO' | 'AGOTADO';
}

export interface OrderItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  address?: string;
  items: OrderItem[];
  total: number;
  status: 'NUEVO' | 'PREPARANDO' | 'REPARTO' | 'ENTREGADO' | 'PAGADO';
  timestamp: Date;
  type: 'LOCAL' | 'DELIVERY' | 'WEB';
  tableId?: string;
}

export interface Table {
  id: string;
  number: string;
  status: 'LIBRE' | 'OCUPADA' | 'PENDIENTE';
  capacity: number;
  currentGuests?: number;
  occupationTime?: string;
}

export interface KPI {
  title: string;
  value: string;
  trend: number;
  icon: string;
  unit: string;
}
