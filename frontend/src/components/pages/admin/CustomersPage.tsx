import React from 'react';
import { Users, UserPlus } from 'lucide-react';

export const CustomersPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Customer CRM</h1>
        <p className="text-sm text-admin-muted font-bold mt-1">Manage relationships and view profiles</p>
      </div>
      <button className="flex items-center gap-2 px-6 py-3 bg-admin-navy text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all hover:bg-admin-navy/90">
        <UserPlus className="w-5 h-5" /> Add Customer
      </button>
    </div>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <Users className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Loading Customer Database</h2>
      <p className="text-admin-muted font-bold mt-2">Accessing your high-value client list...</p>
    </div>
  </div>
);
