import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  Download,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

import { customersApi } from '../../../lib/api';
import { toast } from 'sonner';

export const CustomersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await customersApi.list({ search: search || undefined });
      // If backend returns paginated results, use results. Otherwise use response.data
      const data = response.data.results || response.data;
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Customer <span className="text-accent underline decoration-4 underline-offset-8">CRM</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Managing {customers.length} Elite Relationships
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 glass-card rounded-xl text-admin-muted hover:text-primary transition-all">
            <Download className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <UserPlus className="w-4 h-4" />
            Add New Client
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Clients', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-500' },
          { label: 'Customer LTV', value: 'KShs 84K', change: '+5%', icon: Star, color: 'text-yellow-500' },
          { label: 'Conversion Rate', value: '24.8%', change: '+2%', icon: ArrowUpRight, color: 'text-green-500' },
          { label: 'Retention', value: '92.4%', change: '+8%', icon: MessageSquare, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-admin-bg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-md">{stat.change}</span>
            </div>
            <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-black text-primary mt-1 uppercase tracking-tight italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm">
        <div className="relative group flex-1 max-w-xl w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-12 pr-4 glass-input rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-11 px-6 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            <span>Segments</span>
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-11 px-6 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>Last Seen</span>
          </button>
        </div>
      </div>

      {/* Customer List */}
      <div className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/40">
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Status/Segment</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Orders</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Total LTV</th>
                <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center">
                    <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-admin-muted font-black uppercase tracking-widest">
                    No customers found
                  </td>
                </tr>
              ) : customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/40 transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-admin-bg border border-white/60 shadow-sm flex items-center justify-center text-xs font-black text-primary italic uppercase">
                        {cust.first_name?.[0]}{cust.last_name?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-primary truncate uppercase tracking-tight">
                          {cust.first_name} {cust.last_name}
                        </p>
                        <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "premium-badge",
                      cust.total_spent > 1000000 ? "bg-yellow-100 text-yellow-700 border-yellow-200" : "bg-blue-100 text-blue-700 border-blue-200"
                    )}>
                      {cust.total_spent > 1000000 ? 'VIP' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-admin-muted uppercase tracking-tight">
                      <MapPin className="w-3 h-3" />
                      {cust.city || 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-primary">{cust.orders_count || 0}</span>
                      <span className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Completed</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-primary italic uppercase tracking-tighter">
                    KShs {new Intl.NumberFormat('en-KE').format(cust.total_spent)}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white rounded-lg transition-all group/btn" title="Send Email">
                        <Mail className="w-4 h-4 text-admin-muted group-hover/btn:text-accent" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-all group/btn" title="View Profile">
                        <Eye className="w-4 h-4 text-admin-muted group-hover/btn:text-blue-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-white/20 border-t border-white/20 flex items-center justify-between">
          <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Showing {customers.length} Clients</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 glass-card rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Previous</button>
            <button className="px-4 py-2 glass-card rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
function useEffect(arg0: () => () => void, arg1: string[]) {
  throw new Error('Function not implemented.');
}

