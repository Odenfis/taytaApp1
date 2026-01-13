
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
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Configuración de Despliegue</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Resolución de errores 404 y Conexión</p>
        </div>
        <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
          apiStatus === 'online' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'
        }`}>
          <span className={`size-3 rounded-full ${apiStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-xs font-black uppercase tracking-widest">Estado API: {apiStatus}</span>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-3xl mb-8">
        <h3 className="text-red-500 font-black flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined">warning</span> ¿VES UN ERROR "NOT FOUND" (404)?
        </h3>
        <p className="text-sm text-slate-300">
          Esto ocurre porque Render está buscando tus archivos en una carpeta llamada <strong>dist</strong> que no existe.
          <br/><br/>
          <strong>SOLUCIÓN:</strong> En el Dashboard de Render, ve a <strong>Settings</strong> de tu "Static Site" y cambia:
          <ul className="mt-2 space-y-1 font-mono text-xs text-primary">
            <li>• Publish Directory: <span className="bg-black px-2 py-0.5 rounded">.</span> (un solo punto)</li>
          </ul>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-card-dark border-2 border-border-dark p-8 rounded-[2.5rem] relative overflow-hidden group">
          <h3 className="text-primary font-black uppercase tracking-widest text-sm mb-6">Backend (Web Service)</h3>
          <div className="space-y-4">
            <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5 text-[11px] text-slate-400">
              <p>Build Command: <code className="text-primary">npm install</code></p>
              <p>Start Command: <code className="text-primary">node server.js</code></p>
            </div>
          </div>
        </div>

        <div className="bg-card-dark border-2 border-border-dark p-8 rounded-[2.5rem] relative overflow-hidden group">
          <h3 className="text-blue-500 font-black uppercase tracking-widest text-sm mb-6">Frontend (Static Site)</h3>
          <div className="space-y-4 text-[11px] text-slate-400">
             <div className="bg-background-dark/50 p-4 rounded-2xl border border-white/5">
                <p className="text-red-400 font-bold mb-2 underline">¡IMPORTANTE PARA EVITAR 404!</p>
                <p>Build Command: <code className="text-blue-400">npm install</code> (o déjalo vacío)</p>
                <p>Publish Directory: <code className="text-white bg-blue-600 px-2 rounded">.</code> (¡Asegúrate que sea un punto!)</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
