
import { Order, Product, Customer, Supplier, Employee } from '../types';

/**
 * IMPORTANTE: Para Render, usamos import.meta.env.VITE_API_URL.
 */
const getBaseUrl = () => {
  // Intentamos obtener la variable de Vite, si no, usamos el fallback
  const rawUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:10000/api';
  // Limpiamos barras diagonales duplicadas al final
  return rawUrl.replace(/\/+$/, '');
};

const API_BASE_URL = getBaseUrl();

class DataService {
  /**
   * Verifica si la API está respondiendo
   */
  async checkHealth(): Promise<boolean> {
    try {
      console.log(`🔍 Verificando salud en: ${API_BASE_URL}/health`);
      const res = await fetch(`${API_BASE_URL}/health`, { 
        headers: { 'Accept': 'application/json' }
      });
      return res.ok;
    } catch (e) {
      console.error("❌ Error de conexión con API:", e);
      return false;
    }
  }

  /**
   * Login Mapeado a Usuarios de Azure
   */
  async login(usuario: string, clave: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      console.log(`🔐 Intentando login en: ${API_BASE_URL}/auth/login`);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });
      
      const data = await response.json();
      if (!response.ok) return { success: false, error: data.error || 'Credenciales inválidas' };
      return data;
    } catch (e: any) {
      console.error("❌ Error en Login Fetch:", e);
      
      // Fallback para desarrollo local si la API no está configurada
      if (usuario === 'admin' && clave === 'admin' && API_BASE_URL.includes('localhost')) {
        return { success: true, user: { nombre: 'Admin Local', rol: 'ADMIN' } };
      }
      
      return { 
        success: false, 
        error: `Error de red: ${e.message}. Verifica que el Backend esté encendido en Render.` 
      };
    }
  }

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
