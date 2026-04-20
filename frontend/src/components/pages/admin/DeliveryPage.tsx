import React from 'react';
import { Truck } from 'lucide-react';

export const DeliveryPage: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-2xl font-heading font-black text-admin-navy tracking-tight uppercase">Logistics & Delivery</h1>
    <div className="bg-white p-20 rounded-[2rem] border border-admin-border text-center">
      <div className="w-20 h-20 bg-admin-bg rounded-full flex items-center justify-center mx-auto mb-6">
        <Truck className="w-10 h-10 text-admin-muted" />
      </div>
      <h2 className="text-xl font-heading font-black text-admin-navy uppercase">Fulfillment Tracking</h2>
      <p className="text-admin-muted font-bold mt-2">Oversee delivery status, routes, and schedules.</p>
    </div>
  </div>
);
