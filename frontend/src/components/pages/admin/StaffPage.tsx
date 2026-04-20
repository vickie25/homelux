import React from 'react';
import { UserCircle } from 'lucide-react';

export const StaffPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Staff Management</h1>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <UserCircle className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Team Access</h2>
      <p className="text-admin-muted font-bold mt-2">Manage employee roles and permissions for the dashboard.</p>
    </div>
  </div>
);
