
import React from 'react';
import { AppView } from '../types';
import { SIDEBAR_NAV } from '../constants';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  return (
    <aside className="w-64 bg-surface-dark border-r border-border-dark flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-background-dark font-black">
          <span className="material-symbols-outlined font-bold">restaurant</span>
        </div>
        <div>
          <h1 className="text-white text-lg font-bold leading-tight tracking-tight">EL TAYTA</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Gestión Integral</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1">
        {SIDEBAR_NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as AppView)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              currentView === item.id ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${currentView === item.id ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border-dark">
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
          <img 
            src="https://picsum.photos/seed/user1/100" 
            className="size-10 rounded-full border-2 border-primary/50"
            alt="Profile"
          />
          <div className="flex flex-col">
            <p className="text-xs font-bold text-white">Admin Tayta</p>
            <p className="text-[10px] text-slate-500">Superusuario</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 mt-4 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-semibold">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
