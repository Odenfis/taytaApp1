
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
    <div className="p-8 space-y-8 h-full overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Configuración y Despliegue</h2>
          <p className="text-slate-500">Gestión de conexión GitHub -> Render -> Azure SQL</p>
        </div>
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
          apiStatus === 'online' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 
          apiStatus === 'offline' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-white/5 border-white/10 text-slate-500'
        }`}>
          <span className={`size-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-slate-500'}`}></span>
          <span className="text-[10px] font-black uppercase tracking-widest">API Render: {apiStatus}</span>
          <button onClick={checkConnection} className="material-symbols-outlined text-sm ml-2 hover:rotate-180 transition-transform">refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guía de Pasos */}
        <div className="space-y-6">
          <div className="bg-card-dark border border-border-dark p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-9xl">terminal</span>
            </div>
            <h3 className="text-primary font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">rocket_launch</span> Guía de Lanzamiento
            </h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-primary text-background-dark flex items-center justify-center font-black shrink-0">1</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Vincular GitHub</h4>
                  <p className="text-slate-500 text-xs mt-1">Sube este código a un repositorio. Render se sincronizará automáticamente con cada 'push'.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-primary text-background-dark flex items-center justify-center font-black shrink-0">2</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Crear Web Service (Backend)</h4>
                  <p className="text-slate-500 text-xs mt-1">En Render, crea un 'Web Service'. Este contendrá tu API Node.js que se conecta a Azure SQL.</p>
                  <div className="mt-2 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px] text-slate-400">
                    Environment Variable:<br/>
                    <span className="text-primary">DB_CONNECTION_STRING</span> = mssql://user:pass@server...
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-primary text-background-dark flex items-center justify-center font-black shrink-0">3</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Desplegar Static Site (Frontend)</h4>
                  <p className="text-slate-500 text-xs mt-1">Crea un 'Static Site' en Render para esta App. Conéctala al mismo repo de GitHub.</p>
                  <div className="mt-2 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-[10px] text-slate-400">
                    Environment Variable:<br/>
                    <span className="text-primary">API_URL</span> = https://tu-backend.onrender.com/api
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Snippet de Backend Sugerido */}
        <div className="bg-surface-dark border border-border-dark p-8 rounded-[2rem] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Ejemplo Backend (server.js)</h3>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Node.js + mssql</span>
          </div>
          <div className="flex-1 bg-black/60 rounded-xl p-4 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed custom-scrollbar">
            <pre>{`const express = require('express');
const sql = require('mssql');
const app = express();

const config = process.env.DB_URL;

app.get('/api/productos', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .query('SELECT * FROM Productos WHERE Eliminado = 0');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001);`}</pre>
          </div>
          <p className="text-[10px] text-slate-600 italic">Este código debe vivir en tu repositorio de Backend para hablar con Azure SQL.</p>
        </div>
      </div>
    </div>
  );
};
