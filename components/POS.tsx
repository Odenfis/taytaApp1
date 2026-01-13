
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product, OrderItem } from '../types';

export const POS: React.FC = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [category, setCategory] = useState('Todas');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const categories = ['Todas', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = category === 'Todas' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="flex h-full overflow-hidden animate-in slide-in-from-right duration-300">
      <div className="flex-1 flex flex-col bg-background-dark">
        <header className="p-6 border-b border-border-dark flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight uppercase">Terminal de Venta</h2>
          <div className="flex bg-surface-dark rounded-xl p-1 gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  category === cat ? 'bg-primary text-background-dark' : 'text-slate-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-card-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary transition-all cursor-pointer group active:scale-95"
            >
              <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
              <div className="p-3">
                <p className="text-xs font-black text-primary uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="text-sm font-bold text-white line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-base font-black text-white">S/ {product.price.toFixed(2)}</span>
                  <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-96 bg-surface-dark border-l border-border-dark flex flex-col">
        <div className="p-6 border-b border-border-dark">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-white uppercase tracking-widest">Orden Actual</h3>
            <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-slate-500">MESA 08</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-primary text-background-dark text-[10px] font-black uppercase rounded-lg">Para Comer</button>
            <button className="flex-1 py-2 border border-border-dark text-slate-400 text-[10px] font-black uppercase rounded-lg">Para Llevar</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-4xl mb-2">shopping_basket</span>
              <p className="text-xs font-bold">Carrito vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-white/5 border border-white/5 p-3 rounded-xl">
                <div className="flex justify-between mb-2">
                  <h4 className="text-xs font-bold text-white">{item.product.name}</h4>
                  <span className="text-xs font-black">S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="size-6 flex items-center justify-center bg-border-dark rounded text-white">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="size-6 flex items-center justify-center bg-border-dark rounded text-white">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 material-symbols-outlined text-sm">delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-background-dark border-t border-border-dark">
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>S/ {(total * 0.82).toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-500"><span>IGV (18%)</span><span>S/ {(total * 0.18).toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-black text-white pt-2 border-t border-dashed border-border-dark">
              <span>TOTAL</span>
              <span className="text-primary">S/ {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCart([])}
              className="py-4 bg-red-500/10 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">delete</span>
              Cancelar
            </button>
            <button className="py-4 bg-primary text-background-dark font-black rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">payments</span>
              Cobrar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
