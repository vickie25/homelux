import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Layers,
  MapPin,
  Gift,
  Truck,
  CircleDollarSign,
  Store,
  Star,
  PieChart,
  UserCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard', roles: ['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT', 'DISPATCHER', 'FUNDI', 'DRIVER', 'INVENTORY_MANAGER', 'ACCOUNTANT'] },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/admin/orders', roles: ['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT', 'DISPATCHER'] },
  { id: 'products', label: 'Products', icon: Package, path: '/admin/products', roles: ['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT', 'INVENTORY_MANAGER'] },
  { id: 'categories', label: 'Categories', icon: Layers, path: '/admin/categories', roles: ['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER'] },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers', roles: ['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT'] },
  { id: 'inventory', label: 'Inventory', icon: MapPin, path: '/admin/inventory', roles: ['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER'] },
  { id: 'promotions', label: 'Promotions', icon: Gift, path: '/admin/promotions', roles: ['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER'] },
  { id: 'delivery', label: 'Delivery', icon: Truck, path: '/admin/delivery', roles: ['SUPER_ADMIN', 'MANAGER', 'DISPATCHER', 'DRIVER'] },
  { id: 'financials', label: 'Financials', icon: CircleDollarSign, path: '/admin/financials', roles: ['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT'] },
  { id: 'showrooms', label: 'Showrooms', icon: Store, path: '/admin/showrooms', roles: ['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER'] },
  { id: 'reviews', label: 'Reviews', icon: Star, path: '/admin/reviews', roles: ['SUPER_ADMIN', 'MANAGER'] },
  { id: 'reports', label: 'Reports', icon: PieChart, path: '/admin/reports', roles: ['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT'] },
  { id: 'staff', label: 'Staff', icon: UserCircle, path: '/admin/staff', roles: ['SUPER_ADMIN'] },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const filteredNavItems = NAV_ITEMS.filter(item =>
    !item.roles || (user && item.roles.includes(user.role))
  );

  const SidebarContent = (
    <div className="flex flex-col h-full bg-admin-navy text-white overflow-hidden py-6">
      {/* Logo Section */}
      <div className={cn(
        "px-6 mb-8 flex items-center transition-all duration-300",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-white">H</div>
              <span className="font-heading font-black tracking-tight text-xl uppercase">Homelux <span className="text-accent underline decoration-2 underline-offset-4">Admin</span></span>
            </motion.div>
          ) : (
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-white text-xl">H</div>
          )}
        </AnimatePresence>
      </div>

      <hr className="border-white/10 mx-6 mb-6" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-white/10 text-white font-bold"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-accent rounded-r-full"
                />
              )}
              <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-accent" : "group-hover:text-accent")} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      <hr className="border-white/10 mx-6 my-6" />

      {/* Quick Settings & Profile */}
      <div className="px-4 space-y-1">
        <Link
          to="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-white/60 hover:bg-white/5 hover:text-white group",
            location.pathname === '/admin/settings' && "bg-white/10 text-white"
          )}
        >
          <Settings className="w-5 h-5 group-hover:text-accent" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </Link>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className={cn(
            "flex items-center gap-4 px-3 transition-all duration-300",
            isCollapsed ? "justify-center" : ""
          )}>
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-accent/20 flex-shrink-0 border-2 border-accent">
              <img src={`https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=E8A020&color=fff`} alt="Avatar" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">{user?.role.replace('_', ' ')}</p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={logout}
                className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 border-r border-white/10",
          isCollapsed ? "w-[80px]" : "w-[260px]"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-admin-navy transition-transform duration-300 lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {SidebarContent}
      </aside>
    </>
  );
};
