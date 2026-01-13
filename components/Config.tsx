
import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

export const Config: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setApiStatus('checking');
    const isUp = await dataService.checkHealth();
    setApiStatus(isUp ? 'online' : 'offline');
  };

  return (
    <div className="p-8 space-y-8 h-full overflow-y-auto custom-scrollbar bg-background-dark animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Configuración Monorepo</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">1 Repositorio GitHub -> 2 Servicios Render</p>
        </div>
        <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
          apiStatus === 'online' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
        }`}>
          <span className={`size-3 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-xs font-black uppercase tracking-widest">Estado API: {apiStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Configuración del Servicio de Backend */}
        <div className="bg-card-dark border-2 border-border-dark p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-primary transition-colors">
          <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[12rem]">dns</span>
          </div>
          <h3 className="text-primary font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">settings_ethernet</span> Servicio 1: Backend (Web Service)
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
              <p className="text-white text-xs font-bold mb-2">Configuración en Render:</p>
              <ul className="text-[11px] text-slate-400 space-y-2 font-medium">
                <li>• <strong className="text-slate-200">Environment:</strong> Node</li>
                <li>• <strong className="text-slate-200">Build Command:</strong> <code className="bg-black px-1 rounded text-primary">npm install</code></li>
                <li>• <strong className="text-slate-200">Start Command:</strong> <code className="bg-black px-1 rounded text-primary">node server.js</code></li>
              </ul>
            </div>
            <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20">
              <p className="text-primary text-[10px] font-black uppercase mb-1">Variable de Entorno Obligatoria:</p>
              <code className="text-[11px] text-white break-all">DB_URL = mssql://usuario:pass@servidor.database.windows.net/DB</code>
            </div>
          </div>
        </div>

        {/* Configuración del Servicio de Frontend */}
        <div className="bg-card-dark border-2 border-border-dark p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500 transition-colors">
          <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[12rem]">web</span>
          </div>
          <h3 className="text-blue-500 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">browser_updated</span> Servicio 2: Frontend (Static Site)
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
              <p className="text-white text-xs font-bold mb-2">Configuración en Render:</p>
              <ul className="text-[11px] text-slate-400 space-y-2 font-medium">
                <li>• <strong className="text-slate-200">Build Command:</strong> <code className="bg-black px-1 rounded text-blue-400">npm run build</code></li>
                <li>• <strong className="text-slate-200">Publish Directory:</strong> <code className="bg-black px-1 rounded text-blue-400">dist</code></li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
              <p className="text-blue-400 text-[10px] font-black uppercase mb-1">Variable de Entorno Obligatoria:</p>
              <code className="text-[11px] text-white break-all">VITE_API_URL = https://tu-backend-tayta.onrender.com/api</code>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-dark border-2 border-border-dark p-8 rounded-[2.5rem]">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shield_lock</span> 
          Recordatorio de Seguridad Azure
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Para que el <strong>Servicio 1 (Backend)</strong> pueda hablar con Azure, debes ir al Portal de Azure e incluir la IP de salida de Render en el Firewall. 
          <br/><br/>
          <span className="bg-white/5 px-2 py-1 rounded text-primary font-bold">Tip:</span> Como las IPs de Render cambian, la forma más sencilla es activar la opción <strong className="text-white">"Allow Azure services and resources to access this server"</strong> en la configuración de Redes de tu SQL Database.
        </p>
      </div>
    </div>
  );
};
