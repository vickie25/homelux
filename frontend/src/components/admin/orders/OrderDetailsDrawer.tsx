import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CreditCard, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Order } from '../../../hooks/useOrders';

interface OrderDetailsDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
}

export const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({ 
  order, 
  isOpen, 
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  const steps = [
    { id: 'PENDING', label: 'Order Placed', icon: Clock },
    { id: 'PROCESSING', label: 'Processing', icon: Package },
    { id: 'SHIPPED', label: 'Shipped', icon: Truck },
    { id: 'DELIVERED', label: 'Delivered', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === order.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#FAFAF9] shadow-2xl z-[70] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-admin-border p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-heading font-black text-primary tracking-tighter uppercase">Order Details</h2>
                <p className="text-xs text-admin-muted font-black tracking-widest mt-1 uppercase">{order.order_id}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-admin-bg rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-admin-muted" />
              </button>
            </div>

            <div className="p-8 space-y-8 pb-32">
              {/* Timeline */}
              <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest">Order Progress</h3>
                  <span className={cn(
                    "premium-badge",
                    order.status === 'DELIVERED' ? "bg-green-100 text-green-700 border-green-200" : "bg-accent/10 text-accent border-accent/20"
                  )}>
                    {order.status}
                  </span>
                </div>
                
                <div className="relative flex justify-between">
                  <div className="absolute top-5 left-0 w-full h-1 bg-admin-bg z-0" />
                  <div 
                    className="absolute top-5 left-0 h-1 bg-accent transition-all duration-1000 z-0" 
                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                  />
                  
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= currentStepIndex;
                    return (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                          isActive ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-white border-2 border-admin-border text-admin-muted"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          isActive ? "text-primary" : "text-admin-muted"
                        )}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-accent" />
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest">Customer</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Name</p>
                      <p className="text-sm font-bold text-primary">{order.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Email</p>
                      <p className="text-sm font-bold text-primary">{order.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Phone</p>
                      <p className="text-sm font-bold text-primary">+254 700 000 000</p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest">Payment</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Method</p>
                      <p className="text-sm font-bold text-primary uppercase">{order.payment_method}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Status</p>
                      <span className="premium-badge bg-green-100 text-green-700 border-green-200">Paid</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Amount</p>
                      <p className="text-lg font-black text-primary italic uppercase tracking-tight">KShs {order.total_amount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl border border-admin-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-admin-border flex items-center gap-3">
                  <Package className="w-5 h-5 text-accent" />
                  <h3 className="text-sm font-black text-primary uppercase tracking-widest">Order Items</h3>
                </div>
                <div className="divide-y divide-admin-border">
                  {order.items?.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-admin-bg/30 transition-colors">
                      <div className="w-16 h-16 bg-admin-bg rounded-xl flex items-center justify-center flex-shrink-0">
                        {item.product_image ? (
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Package className="w-6 h-6 text-admin-muted" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-primary uppercase tracking-tight truncate">{item.product_name}</p>
                        <p className="text-xs text-admin-muted font-bold">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-primary italic">KShs {item.unit_price}</p>
                        <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Per unit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-xl border-t border-admin-border flex gap-4">
              <select 
                className="flex-1 h-12 glass-input rounded-xl px-4 text-sm font-black uppercase tracking-widest"
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
              >
                {steps.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                <option value="CANCELLED">Cancel Order</option>
                <option value="REFUNDED">Refund Order</option>
              </select>
              <button className="px-8 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Print Invoice
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
