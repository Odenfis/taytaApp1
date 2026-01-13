
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '11:00', sales: 1200 },
  { name: '13:00', sales: 4800 },
  { name: '15:00', sales: 3100 },
  { name: '17:00', sales: 2900 },
  { name: '19:00', sales: 10200 },
  { name: '21:00', sales: 11100 },
  { name: '23:00', sales: 3800 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">Bienvenido, Tayta</h2>
          <p className="text-slate-500 font-medium">Resumen operativo de hoy, 24 de Mayo.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-border-dark text-white rounded-lg text-sm font-bold">Ver Histórico</button>
          <button className="px-4 py-2 bg-primary text-background-dark rounded-lg text-sm font-bold shadow-lg shadow-primary/20">Descargar Reporte</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Ventas de Hoy', value: 'S/ 2,450.00', trend: 12, icon: 'payments' },
          { title: 'Mesas Activas', value: '12 / 20', trend: 5, icon: 'table_restaurant' },
          { title: 'Pedidos Delivery', value: '8', trend: -2, icon: 'moped' },
          { title: 'Ticket Promedio', value: 'S/ 65.50', trend: 1.2, icon: 'receipt' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-card-dark border border-border-dark p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <span className="text-slate-500 text-xs font-black uppercase tracking-widest">{kpi.title}</span>
              <span className="material-symbols-outlined text-primary">{kpi.icon}</span>
            </div>
            <div className="flex items-end justify-between">
              <h4 className="text-2xl font-black text-white">{kpi.value}</h4>
              <span className={`text-xs font-bold ${kpi.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card-dark border border-border-dark p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white">Tráfico por Horas</h3>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Pico: 19:00 - 21:00</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3427" vertical={false} />
                <XAxis dataKey="name" stroke="#554d3a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#554d3a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1811', border: '1px solid #3a3427', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5a606' }}
                />
                <Bar dataKey="sales" fill="#e5a606" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-8xl text-primary">lightbulb</span>
            </div>
            <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">auto_awesome</span> Tayta AI Insights
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "La demanda de Alitas Acevichadas subirá un 25% este fin de semana. Asegura 20kg extra de limón."
            </p>
          </div>

          <div className="bg-card-dark border border-border-dark p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-4">Stock Crítico</h3>
            <div className="space-y-4">
              {[
                { name: 'Lomo Fino', stock: '1.5kg', min: '5kg', color: 'bg-red-500' },
                { name: 'Papa Amarilla', stock: '12kg', min: '10kg', color: 'bg-yellow-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`size-2 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-500">Actual: {item.stock} / Mín: {item.min}</p>
                  </div>
                  <button className="text-[10px] font-black uppercase text-primary border border-primary/20 px-2 py-1 rounded">Abastecer</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
