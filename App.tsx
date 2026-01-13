
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { POS } from './components/POS';
import { Login } from './components/Login';
import { Masters } from './components/Masters';
import { Config } from './components/Config';
import { AppView } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.MASTERS: return <Masters />;
      case AppView.SALES: return <POS />;
      case AppView.CONFIG: return <Config />;
      case AppView.DELIVERY:
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-500 flex-col gap-4">
            <span className="material-symbols-outlined text-6xl">delivery_dining</span>
            <p className="text-xl font-black uppercase tracking-widest">Módulo en Desarrollo</p>
            <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="text-primary hover:underline font-bold">Volver al Inicio</button>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark animate-in fade-in duration-700">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
