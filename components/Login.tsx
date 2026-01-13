
import React, { useState } from 'react';
import { dataService } from '../services/dataService';

interface LoginProps {
  onLoginSuccess: (userData: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const result = await dataService.login(username, password);
    
    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setErrorMsg(result.error || 'Acceso denegado');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background-dark p-4 relative overflow-hidden font-display">
      {/* Fondo Ambientado */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md bg-surface-dark border border-border-dark p-10 rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-500 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="size-20 bg-primary rounded-2xl flex items-center justify-center text-background-dark mb-6 shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined text-5xl font-bold">restaurant_menu</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">EL TAYTA</h1>
          <div className="h-1 w-12 bg-primary rounded-full mb-4"></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Acceso Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Usuario del Sistema</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-primary transition-colors">person</span>
              <input
                type="text"
                disabled={isLoading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background-dark/50 border-border-dark border-2 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700 disabled:opacity-50"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Contraseña de Seguridad</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-primary transition-colors">lock</span>
              <input
                type="password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background-dark/50 border-border-dark border-2 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700 disabled:opacity-50"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-500 text-xs font-bold uppercase tracking-wider">
                {errorMsg}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-background-dark py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 mt-4 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                <span>Conectando...</span>
              </>
            ) : (
              <>
                <span>Ingresar al Sistema</span>
                <span className="material-symbols-outlined">login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Conexión Azure SQL establecida
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Ayuda</span>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Recuperar Acceso</span>
          </div>
        </div>
      </div>
      
      <p className="absolute bottom-8 text-slate-800 text-[10px] font-black uppercase tracking-[0.4em]">
        Azure Database • Render Deployment • v1.0.4
      </p>
    </div>
  );
};
