import React from 'react';
import { Store } from 'lucide-react';

export const AdminShowroomsPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Showroom Management</h1>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <Store className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Physical Locations</h2>
      <p className="text-admin-muted font-bold mt-2">Manage settings and stock for all of your luxury showrooms.</p>
    </div>
  </div>
);
