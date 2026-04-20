import React from 'react';
import { PieChart } from 'lucide-react';

export const ReportsPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Analytics Reports</h1>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <PieChart className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Business Intelligence</h2>
      <p className="text-admin-muted font-bold mt-2">Generate and export deep dives into your sales data.</p>
    </div>
  </div>
);
