import React from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Orders Management</h1>
          <p className="text-sm text-admin-muted font-bold mt-1">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-white border border-admin-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-admin-border rounded-xl text-sm font-bold text-admin-navy hover:bg-admin-bg transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-admin-border shadow-admin overflow-hidden">
        <div className="p-8 border-b border-admin-border flex items-center justify-between">
          <div className="flex gap-4">
            {['All Orders', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((tab) => (
              <button 
                key={tab}
                className={`text-sm font-black px-4 py-2 rounded-xl transition-all ${
                  tab === 'All Orders' ? 'bg-admin-navy text-white' : 'text-admin-muted hover:text-admin-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="p-20 text-center">
          <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-admin-muted" />
          </div>
          <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Order Data Loading</h2>
          <p className="text-admin-muted font-bold mt-2">Connecting to the live database...</p>
        </div>
      </div>
    </div>
  );
};
