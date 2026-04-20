import React from 'react';
import { MapPin, Box } from 'lucide-react';

export const InventoryPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Inventory & Stock</h1>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <Box className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Stock Management</h2>
      <p className="text-admin-muted font-bold mt-2">Oversee inventory levels across all showrooms.</p>
    </div>
  </div>
);
