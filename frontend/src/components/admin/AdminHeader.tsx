import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronDown,
  Calendar,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, title = "Dashboard" }) => {
  return (
    <header className="h-20 bg-white border-b border-admin-border flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-admin-bg rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-admin-text" />
        </button>
        <div>
          <h1 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase underline decoration-accent decoration-2 underline-offset-4">{title}</h1>
          <p className="text-xs text-admin-muted font-medium mt-0.5">Welcome back, <span className="text-admin-navy font-bold">John 👋</span></p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar - Hidden on small mobile */}
        <div className="hidden sm:flex relative group items-center">
          <Search className="absolute left-3 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-2 bg-admin-bg border border-transparent rounded-xl text-sm w-64 focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
           {/* Date Display */}
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-admin-bg rounded-xl text-xs font-bold text-admin-navy border border-admin-border">
             <Calendar className="w-3.5 h-3.5 text-accent" />
             <span>Apr 17, 2026</span>
           </div>

          {/* Notifications */}
          <button className="relative p-2.5 bg-admin-bg hover:bg-accent/10 rounded-xl transition-all group">
            <Bell className="w-5 h-5 text-admin-navy group-hover:text-accent transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <hr className="h-8 w-px bg-admin-border mx-2" />

          {/* User Profile Dropdown */}
          <button className="flex items-center gap-3 pl-1 pr-2 py-1 hover:bg-admin-bg rounded-2xl transition-all group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
              <img src="https://ui-avatars.com/api/?name=John+Kamau&background=1B3A5C&color=fff" alt="User" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-admin-navy group-hover:text-accent transition-colors">John Kamau</p>
              <p className="text-[10px] text-admin-muted uppercase tracking-widest font-bold">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-admin-muted group-hover:text-admin-navy transition-colors ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};
