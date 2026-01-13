
import { Product, Table, AppView, Supplier, Employee, Customer } from './types';

export const PRODUCTS: Product[] = [
  { id: 'AL001', name: 'Alitas Acevichadas', category: '1', price: 24.90, unit: '1', stock: 100, image: 'https://picsum.photos/seed/wings1/400' },
  { id: 'AL002', name: 'Alitas BBQ Ahumadas', category: '1', price: 22.90, unit: '1', stock: 100, image: 'https://picsum.photos/seed/wings2/400' },
  { id: 'PL001', name: 'Lomo Saltado', category: '2', price: 45.00, unit: '1', stock: 50, image: 'https://picsum.photos/seed/lomo/400' },
  { id: 'PL002', name: 'Ceviche Clásico', category: '2', price: 38.00, unit: '1', stock: 40, image: 'https://picsum.photos/seed/ceviche/400' },
];

export const SUPPLIERS: Supplier[] = [
  { id: 'P001', name: 'Distribuidora Avícola San Juan', contact: 'Juan Perez', phone: '987654321', document: '20123456789', email: 'ventas@sanjuan.pe' },
  { id: 'P002', name: 'Frutas y Verduras El Valle', contact: 'Maria Lopez', phone: '912345678', document: '20987654321', email: 'contacto@elvalle.com' },
];

export const EMPLOYEES: Employee[] = [
  { id: '101', name: 'Carlos Mendoza', role: 'MESERO', phone: '944556677', document: '44556677' },
  { id: '102', name: 'Ana Belén', role: 'COCINA', phone: '933221100', document: '11223344' },
];

export const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Roberto Gomez', document: '44556677', email: 'roberto@email.com', phone: '900111222', address: 'Av. Las Flores 123' },
  { id: '2', name: 'Lucia Ferreyra', document: '20556677881', email: 'lucia@corporativo.com', phone: '999888777', address: 'Calle Los Robles 456' },
];

export const TABLES: Table[] = [
  { id: 'T1', number: '01', status: 'LIBRE', capacity: 2 },
  { id: 'T2', number: '02', status: 'OCUPADA', capacity: 4, currentGuests: 4, occupationTime: '1h 20m' },
  { id: 'T3', number: '03', status: 'PENDIENTE', capacity: 2 },
  { id: 'T4', number: '04', status: 'LIBRE', capacity: 4 },
];

export const SIDEBAR_NAV = [
  { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
  { id: AppView.MASTERS, label: 'Maestros', icon: 'database' },
  { id: AppView.SALES, label: 'Ventas (POS)', icon: 'storefront' },
  { id: AppView.DELIVERY, label: 'Delivery', icon: 'delivery_dining' },
  { id: AppView.TABLES, label: 'Mapa de Mesas', icon: 'grid_view' },
  { id: AppView.INVENTORY, label: 'Inventario', icon: 'inventory_2' },
  { id: AppView.REPORTS, label: 'Estadísticas', icon: 'monitoring' },
  { id: AppView.CONFIG, label: 'Configuración', icon: 'settings' },
];
