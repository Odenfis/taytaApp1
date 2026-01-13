
import { Order, Product, Customer, Supplier, Employee } from '../types';

/**
 * IMPORTANTE: Para Render, usamos import.meta.env.VITE_API_URL.
 * Asegúrate de configurar esta variable en el panel de Render.
 */
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

class DataService {
  /**
   * Verifica si la API está respondiendo (Endpoint de salud)
   */
  async checkHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const res = await fetch(`${API_BASE_URL}/health`, { 
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch (e) {
      console.warn("API Offline o no configurada:", API_BASE_URL);
      return false;
    }
  }

  /**
   * Login Mapeado a Usuarios de Azure
   */
  async login(usuario: string, clave: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });
      
      if (!response.ok) return { success: false, error: 'Credenciales inválidas' };
      return await response.json();
    } catch (e) {
      // Fallback para desarrollo local
      if (usuario === 'admin' && clave === 'admin') {
        return { success: true, user: { nombre: 'Admin Tayta (Local)', rol: 'ADMIN' } };
      }
      return { success: false, error: 'No se pudo conectar con la API de Render' };
    }
  }

  // Mapeos de datos optimizados para las tablas de SQL Server proporcionadas
  async getProductos(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/productos`);
      const data = await res.json();
      return data.map((p: any) => ({
        id: p.CodPro?.trim() || 'N/A',
        name: p.Nombre?.trim() || 'Sin Nombre',
        category: p.Clinea?.toString() || 'General',
        price: p.PventaMa || 0,
        stock: p.Stock || 0,
        unit: p.Unimed?.toString() || '1',
        image: `https://picsum.photos/seed/${p.CodPro}/400`,
      }));
    } catch { return []; }
  }

  async getClientes(): Promise<Customer[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/clientes`);
      const data = await res.json();
      return data.map((c: any) => ({
        id: c.Codclie?.toString(),
        name: c.Razon?.trim(),
        document: c.Documento?.trim(),
        email: c.Email?.trim(),
        phone: c.Telefono1?.trim(),
        address: c.Direccion?.trim()
      }));
    } catch { return []; }
  }

  async getProveedores(): Promise<Supplier[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/proveedores`);
      const data = await res.json();
      return data.map((p: any) => ({
        id: p.CodProv?.trim(),
        name: p.Razon?.trim(),
        document: p.Documento?.trim(),
        contact: p.Atencion?.trim(),
        phone: p.Telefono1?.trim(),
        email: p.Email?.trim()
      }));
    } catch { return []; }
  }

  async getEmpleados(): Promise<Employee[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/empleados`);
      const data = await res.json();
      return data.map((e: any) => ({
        id: e.Codemp?.toString(),
        name: e.Nombre?.trim(),
        document: e.Documento?.trim(),
        role: e.Tipo === 1 ? 'ADMIN' : 'PERSONAL',
        phone: e.Celular?.trim()
      }));
    } catch { return []; }
  }
}

export const dataService = new DataService();
