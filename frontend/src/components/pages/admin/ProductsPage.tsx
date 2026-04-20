import React from 'react';
import { Package, Plus, Search } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Products Catalog</h1>
          <p className="text-sm text-admin-muted font-bold mt-1">Manage your inventory and product listings</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-black uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-accent/20">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-admin-border shadow-admin">
        <div className="p-8 border-b border-admin-border flex items-center justify-between">
           <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 bg-admin-bg/50 border border-admin-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-full"
            />
          </div>
        </div>
        <div className="p-20 text-center">
          <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-admin-muted" />
          </div>
          <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Syncing Catalog</h2>
          <p className="text-admin-muted font-bold mt-2">Fetching your luxury collection...</p>
        </div>
      </div>
    </div>
  );
};
