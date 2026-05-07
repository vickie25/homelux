import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, LayoutGrid, List, Plus, Search, Filter, Package, Edit3, Eye, Trash2, ExternalLink, Archive, Tag, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProducts, type Product } from '../../../hooks/useProducts';
import { productsApi } from '../../../lib/api';

export const ProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const { products, loading, error, refresh, deleteProduct } = useProducts({
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    search: searchQuery || undefined
  });

  useEffect(() => {
    productsApi.categories.list().then(res => {
      setCategories(res.data.results || res.data);
    });
  }, []);

  const formatCurrency = (val: string | number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KSh',
      minimumFractionDigits: 0
    }).format(Number(val));
  };

  const getStatus = (product: Product) => {
    if (product.stock_quantity <= 0) return 'Out of Stock';
    if (product.stock_quantity <= 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-primary tracking-tighter italic uppercase">
            Product <span className="text-accent underline decoration-4 underline-offset-8">Catalog</span>
          </h1>
          <p className="text-xs text-admin-muted font-black tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Managing {products.length} Premium Items
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refresh()}
            className="p-3 glass-card rounded-xl text-admin-muted hover:text-primary transition-all"
          >
            <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
          </button>
          <div className="flex p-1 bg-admin-bg rounded-xl border border-admin-border">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'grid' ? "bg-white text-primary shadow-sm" : "text-admin-muted hover:text-primary"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-admin-muted hover:text-primary"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest",
              selectedCategory === 'All'
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white/50 text-admin-muted hover:bg-white hover:text-primary"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest",
                selectedCategory === cat.slug
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white/50 text-admin-muted hover:bg-white hover:text-primary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 glass-input rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <button className="flex items-center justify-center gap-2 h-11 px-6 glass-card rounded-xl text-[10px] font-black text-admin-navy uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="liquid-glass rounded-[2.5rem] overflow-hidden border border-white/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/30 border-b border-white/40">
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Product</th>
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Category</th>
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Price</th>
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Stock</th>
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Status</th>
                      <th className="px-8 py-6 text-[10px] font-black text-admin-muted uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-white/40 transition-all duration-300 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/60 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform bg-admin-bg flex items-center justify-center">
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <Package className="w-6 h-6 text-admin-muted" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-black text-primary truncate uppercase tracking-tight">{product.name}</p>
                              <p className="text-[10px] text-admin-muted font-black tracking-widest uppercase">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[10px] font-black text-admin-navy uppercase tracking-widest px-3 py-1 bg-admin-bg/50 rounded-lg">
                            {product.category_name}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-black text-primary italic uppercase tracking-tighter">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 w-16 bg-admin-bg rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  product.stock_quantity > 10 ? "bg-green-500" : product.stock_quantity > 0 ? "bg-amber-500" : "bg-red-500"
                                )}
                                style={{ width: `${Math.min(product.stock_quantity * 2, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-admin-muted">{product.stock_quantity}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "premium-badge",
                            getStatus(product) === 'In Stock' && "bg-green-100 text-green-700 border-green-200",
                            getStatus(product) === 'Low Stock' && "bg-amber-100 text-amber-700 border-amber-200",
                            getStatus(product) === 'Out of Stock' && "bg-red-100 text-red-700 border-red-200",
                          )}>
                            {getStatus(product)}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white rounded-lg transition-all group/btn">
                              <Edit3 className="w-4 h-4 text-admin-muted group-hover/btn:text-accent" />
                            </button>
                            <button className="p-2 hover:bg-white rounded-lg transition-all group/btn">
                              <Eye className="w-4 h-4 text-admin-muted group-hover/btn:text-blue-500" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 hover:bg-white rounded-lg transition-all group/btn"
                            >
                              <Trash2 className="w-4 h-4 text-admin-muted group-hover/btn:text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-[2rem] overflow-hidden group border border-white/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-admin-bg flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <Package className="w-12 h-12 text-admin-muted/40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="flex gap-2 w-full">
                        <button className="flex-1 py-2 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">Quick Edit</button>
                        <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white hover:text-primary transition-colors"><ExternalLink className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg",
                        getStatus(product) === 'In Stock' ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      )}>
                        {getStatus(product)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] text-accent font-black uppercase tracking-widest mb-1">{product.category_name}</p>
                    <h3 className="text-sm font-black text-primary uppercase tracking-tight line-clamp-1 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-black text-primary italic uppercase tracking-tighter">{formatCurrency(product.price)}</p>
                      <span className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Stock: {product.stock_quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 0.98 }}
                className="aspect-[4/3] rounded-[2rem] border-4 border-dashed border-admin-border flex flex-col items-center justify-center gap-4 text-admin-muted hover:border-accent hover:text-accent transition-all group bg-admin-bg/30"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add New Item</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-admin-navy p-8 rounded-[2rem] text-white flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1">Low Stock Alerts</p>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">{products.filter(p => p.stock_quantity <= 10).length} <span className="text-xs font-bold text-red-400 font-body">Items</span></h3>
          </div>
          <Archive className="w-10 h-10 text-white/10" />
        </div>
        <div className="bg-accent p-8 rounded-[2rem] text-white flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1">Most Profitable</p>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Living <span className="text-xs font-bold text-primary/60 font-body">Room</span></h3>
          </div>
          <Tag className="w-10 h-10 text-white/10" />
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-admin-muted font-black uppercase tracking-widest mb-1">Total Products</p>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase text-primary">{products.length} <span className="text-xs font-bold text-admin-muted font-body">Active</span></h3>
          </div>
          <BarChart3 className="w-10 h-10 text-admin-bg" />
        </div>
      </div>
    </div>
  );
};

