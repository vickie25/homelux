import React from 'react';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface OrderFiltersProps {
  onSearch: (query: string) => void;
  onStatusChange: (status: string) => void;
  currentStatus: string;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({ 
  onSearch, 
  onStatusChange, 
  currentStatus 
}) => {
  const statuses = [
    { id: 'ALL', label: 'All Orders' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-widest",
              currentStatus === status.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white/50 text-admin-muted hover:bg-white hover:text-primary"
            )}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <div className="relative group flex-1 sm:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search by ID or Customer..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-11 pl-12 pr-4 glass-input rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        
        <button className="flex items-center justify-center gap-2 h-11 px-6 glass-card rounded-xl text-xs font-black text-admin-navy uppercase tracking-widest">
          <Calendar className="w-4 h-4" />
          <span>Date Range</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        
        <button className="flex items-center justify-center gap-2 h-11 px-6 glass-card rounded-xl text-xs font-black text-admin-navy uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};
