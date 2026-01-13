
import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { Product, Customer, Supplier, Employee } from '../types';

type MasterTab = 'clientes' | 'productos' | 'proveedores' | 'empleados';

export const Masters: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MasterTab>('clientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estados para datos reales
  const [data, setData] = useState<{
    clientes: Customer[],
    productos: Product[],
    proveedores: Supplier[],
    empleados: Employee[]
  }>({
    clientes: [],
    productos: [],
    proveedores: [],
    empleados: []
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'clientes') {
        const res = await dataService.getClientes();
        setData(prev => ({ ...prev, clientes: res }));
      } else if (activeTab === 'productos') {
        const res = await dataService.getProductos();
        setData(prev => ({ ...prev, productos: res }));
      } else if (activeTab === 'proveedores') {
        const res = await dataService.getProveedores();
        setData(prev => ({ ...prev, proveedores: res }));
      } else if (activeTab === 'empleados') {
        const res = await dataService.getEmpleados();
        setData(prev => ({ ...prev, empleados: res }));
      }
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: MasterTab; label: string; icon: string }[] = [
    { id: 'clientes', label: 'Clientes', icon: 'groups' },
    { id: 'productos', label: 'Productos', icon: 'fastfood' },
    { id: 'proveedores', label: 'Proveedores', icon: 'local_shipping' },
    { id: 'empleados', label: 'Empleados', icon: 'badge' },
  ];

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Consultando Azure SQL...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'clientes':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border-dark">
                <th className="px-6 py-4">Razón Social</th>
                <th className="px-6 py-4">Documento</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Dirección</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {data.clientes.map(c => (
                <tr key={c.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{c.document}</td>
                  <td className="px-6 py-4">
                    <p className="text-white text-xs">{c.phone}</p>
                    <p className="text-slate-500 text-[10px]">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs truncate max-w-[200px]">{c.address}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="material-symbols-outlined text-slate-500 hover:text-white transition-colors mr-2">edit</button>
                    <button className="material-symbols-outlined text-red-500/50 hover:text-red-500 transition-colors">delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'productos':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border-dark">
                <th className="px-6 py-4">Código / Nombre</th>
                <th className="px-6 py-4">Línea</th>
                <th className="px-6 py-4">P. Venta</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {data.productos.map(p => (
                <tr key={p.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-background-dark border border-border-dark overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover opacity-50" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-primary leading-none mb-1">{p.id}</p>
                      <p className="font-bold text-white leading-tight">{p.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs uppercase tracking-tighter">Línea {p.category}</td>
                  <td className="px-6 py-4 font-black text-white">S/ {Number(p.price).toFixed(2)}</td>
                  <td className="px-6 py-4 font-bold text-green-500">{p.stock}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="material-symbols-outlined text-slate-500 hover:text-white transition-colors mr-2">edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'proveedores':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border-dark">
                <th className="px-6 py-4">Razón Social</th>
                <th className="px-6 py-4">Documento</th>
                <th className="px-6 py-4">Atención</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {data.proveedores.map(s => (
                <tr key={s.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-slate-500 text-[10px]">{s.email}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{s.document}</td>
                  <td className="px-6 py-4">
                    <p className="text-white text-xs">{s.contact}</p>
                    <p className="text-slate-500 text-[10px]">{s.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="material-symbols-outlined text-slate-500 hover:text-white transition-colors mr-2">edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'empleados':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-border-dark">
                <th className="px-6 py-4">Empleado</th>
                <th className="px-6 py-4">Documento</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {data.empleados.map(e => (
                <tr key={e.id} className="text-sm hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{e.name}</p>
                    <p className="text-slate-500 text-[10px]">{e.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{e.document}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-slate-300">
                      {e.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="material-symbols-outlined text-slate-500 hover:text-white transition-colors mr-2">edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="p-8 space-y-6 h-full overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Catálogos Maestros</h2>
          <p className="text-slate-500 font-medium text-sm">Sincronizado con Esquema SQL Server.</p>
        </div>
        <button 
          onClick={loadData}
          className="px-6 py-3 bg-primary text-background-dark rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
        >
          <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>sync</span> 
          Sincronizar Azure
        </button>
      </div>

      <div className="flex bg-surface-dark border border-border-dark p-1 rounded-2xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === tab.id ? 'bg-primary text-background-dark shadow-lg shadow-primary/10' : 'text-slate-500 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-card-dark border border-border-dark rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-border-dark flex items-center gap-4 bg-white/[0.02]">
          <div className="relative flex-1 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">search</span>
            <input
              type="text"
              placeholder={`Buscar en ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background-dark border-border-dark border-2 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderTable()}
        </div>
        
        <div className="p-4 border-t border-border-dark bg-white/[0.01] flex justify-between items-center px-8">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            {loading ? 'Consultando Azure SQL...' : `Total de registros: ${
              activeTab === 'clientes' ? data.clientes.length : 
              activeTab === 'productos' ? data.productos.length :
              activeTab === 'proveedores' ? data.proveedores.length : data.empleados.length
            }`}
          </p>
          <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-[9px] font-black text-slate-500 uppercase">Live DB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
