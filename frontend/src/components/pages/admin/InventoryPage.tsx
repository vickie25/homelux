import React, { useState, useEffect } from 'react';
import { 
  Box, 
  MapPin, 
  History, 
  AlertTriangle, 
  ArrowRight, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Plus,
  RefreshCcw,
  Warehouse
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { inventoryApi } from '../../../lib/api';
import { toast } from 'sonner';

export const InventoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSkus: 0,
    lowStock: 0,
    warehouseCapacity: 0
  });

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await inventoryApi.list({ search: search || undefined });
      const data = response.data.results || response.data;
      setInventory(data);
      
      // Calculate simple stats
      setStats({
        totalSkus: data.length,
        lowStock: data.filter((i: any) => i.stock_quantity <= i.low_stock_threshold).length,
        warehouseCapacity: 84 // Mocked for now or can be derived
      });
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
      toast.error('Failed to load inventory data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInventory();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const STOCK_MOVEMENTS = [
    { id: 'MOV-101', type: 'Incoming', item: 'Finch Bed', qty: 10, from: 'Factory', to: 'Central', date: '10 mins ago' },
    { id: 'MOV-102', type: 'Outgoing', item: 'Hollyann Sofa', qty: 1, from: 'Central', to: 'Customer #4521', date: '25 mins ago' },
    { id: 'MOV-103', type: 'Transfer', item: 'Mesh Chair', qty: 5, from: 'Central', to: 'Westlands', date: '1 hr ago' },
  ];
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Inventory <span className="text-accent underline decoration-4 underline-offset-8">& Stock</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Monitoring {stats.totalSkus} Total SKUs
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 glass-card rounded-xl text-admin-muted hover:text-primary transition-all">
            <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            Inventory Audit
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-admin-bg rounded-2xl flex items-center justify-center">
              <Warehouse className="w-8 h-8 text-primary" />
           </div>
           <div>
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Main Warehouse</p>
              <h3 className="text-2xl font-black text-primary italic uppercase tracking-tighter">84% <span className="text-xs font-bold font-body text-admin-muted">Full</span></h3>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
           </div>
            <div>
              <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Low Stock Alerts</p>
              <h3 className="text-2xl font-black text-primary italic uppercase tracking-tighter">{stats.lowStock} <span className="text-xs font-bold font-body text-red-500">Urgent</span></h3>
            </div>
        </div>
        <div className="bg-admin-navy p-8 rounded-[2rem] text-white flex items-center gap-6">
           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <History className="w-8 h-8 text-accent" />
           </div>
           <div>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Transfers Today</p>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">24 <span className="text-xs font-bold font-body text-accent">Active</span></h3>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40">
             <div className="relative group flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 glass-input rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
             </div>
             <button className="flex items-center gap-2 h-11 px-6 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest ml-4">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
             </button>
          </div>

          <div className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/30 border-b border-white/40">
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Item / SKU</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Location</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Stock Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Available</th>
                    <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center">
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : inventory.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-admin-muted font-black uppercase tracking-widest">
                        No inventory items found
                      </td>
                    </tr>
                  ) : inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-white/40 transition-all duration-300 group cursor-pointer">
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-primary uppercase tracking-tight">{item.product_name}</p>
                        <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{item.product_sku}</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2 text-xs font-bold text-admin-muted uppercase">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.showroom_name}
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={cn(
                           "premium-badge",
                           item.stock_quantity > item.low_stock_threshold ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200",
                         )}>
                           {item.stock_quantity > item.low_stock_threshold ? 'Stable' : 'Low Stock'}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-primary">{item.stock_quantity} <span className="text-[10px] text-admin-muted font-black">Units</span></span>
                            <div className="w-16 h-1 bg-admin-bg rounded-full mt-1 overflow-hidden">
                               <div 
                                 className={cn(
                                   "h-full",
                                   item.stock_quantity > item.low_stock_threshold ? "bg-primary" : "bg-red-500"
                                 )} 
                                 style={{ width: `${Math.min((item.stock_quantity / 50) * 100, 100)}%` }}
                               />
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-primary italic uppercase tracking-tighter">
                        KShs {new Intl.NumberFormat('en-KE').format(item.product_price || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Movement Logs */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-sm">
              <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase mb-6 flex items-center justify-between">
                 Stock Feed
                 <History className="w-5 h-5 text-accent" />
              </h2>
              <div className="space-y-8">
                 {STOCK_MOVEMENTS.map((mov) => (
                    <div key={mov.id} className="relative pl-8 border-l-2 border-dashed border-admin-border pb-2 last:pb-0">
                       <div className={cn(
                         "absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg",
                         mov.type === 'Incoming' && "bg-green-500",
                         mov.type === 'Outgoing' && "bg-red-500",
                         mov.type === 'Transfer' && "bg-blue-500",
                       )}>
                          {mov.type === 'Incoming' ? <ArrowDownLeft className="w-3 h-3" /> : mov.type === 'Outgoing' ? <ArrowUpRight className="w-3 h-3" /> : <RefreshCcw className="w-3 h-3" />}
                       </div>
                       <div>
                          <p className="text-xs font-black text-primary uppercase tracking-tight">{mov.item}</p>
                          <p className="text-[10px] text-admin-muted font-bold mt-1">
                             <span className="font-black text-primary">{mov.qty} Units</span> • {mov.from} › {mov.to}
                          </p>
                          <p className="text-[9px] text-admin-muted font-black uppercase tracking-widest mt-2">{mov.date}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 bg-admin-bg rounded-xl text-[10px] font-black text-admin-navy hover:bg-admin-navy hover:text-white transition-all uppercase tracking-widest">
                 View All Movements
              </button>
           </div>

           <div className="bg-accent p-8 rounded-[2rem] shadow-xl text-white overflow-hidden relative group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-2">Inventory Health</p>
                 <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">92.4%</h3>
                 <p className="text-xs font-bold leading-relaxed text-white/80">Your stock turnover is 12% higher than last quarter. Keep it up!</p>
                 <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                    Run Report <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
