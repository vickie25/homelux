import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { dashboardApi } from '../../../lib/api';

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-admin-border shadow-admin hover:shadow-admin-hover transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <button className="text-admin-muted hover:text-admin-navy">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
    <div>
      <p className="text-sm font-bold text-admin-muted mb-1">{label}</p>
      <h3 className="text-2xl font-black text-admin-navy tracking-tight">{value}</h3>
      <div className="flex items-center gap-1.5 mt-2">
        <div className={cn(
          "flex items-center gap-0.5 text-xs font-black px-1.5 py-0.5 rounded-md",
          trend >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        )}>
          {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
        <span className="text-[10px] text-admin-muted font-bold uppercase tracking-widest">vs last month</span>
      </div>
    </div>
  </motion.div>
);

export const AdminDashboardHome: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [activity, setActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartsRes, productsRes, activityRes] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getCharts(),
          dashboardApi.getTopProducts(),
          dashboardApi.getActivityFeed()
        ]);

        setStats(statsRes.data);
        setCharts(chartsRes.data);
        setProducts(productsRes.data);
        setActivity(activityRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-admin-muted font-bold text-sm uppercase tracking-widest">Aggregating store performance data...</p>
      </div>
    );
  }

  const kpis = stats?.kpis || {};
  const trends = kpis.trends || {};
  const statusDist = stats?.order_status || {};
  
  const orderStatusData = [
    { name: 'Delivered', value: statusDist.DELIVERED || 0, color: '#10B981' },
    { name: 'Processing', value: statusDist.PROCESSING || 0, color: '#3B82F6' },
    { name: 'Pending', value: statusDist.PENDING || 0, color: '#F59E0B' },
    { name: 'Cancelled', value: statusDist.CANCELLED || 0, color: '#EF4444' },
  ].filter(item => item.value > 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={formatCurrency(kpis.total_revenue || 0)} 
          trend={trends.revenue_pct_change_30d || 0} 
          trendValue={`${Math.abs(trends.revenue_pct_change_30d || 0).toFixed(1)}%`} 
          icon={DollarSign} 
          color="bg-admin-navy"
        />
        <StatCard 
          label="Total Orders" 
          value={kpis.total_orders || 0} 
          trend={trends.orders_pct_change_30d || 0} 
          trendValue={`${Math.abs(trends.orders_pct_change_30d || 0).toFixed(1)}%`} 
          icon={ShoppingCart} 
          color="bg-accent"
        />
        <StatCard 
          label="New Customers" 
          value={kpis.new_customers || 0} 
          trend={trends.new_customers_pct_change_30d || 0} 
          trendValue={`${Math.abs(trends.new_customers_pct_change_30d || 0).toFixed(1)}%`} 
          icon={Users} 
          color="bg-blue-500"
        />
        <StatCard 
          label="Avg Order Value" 
          value={formatCurrency(kpis.avg_order_value || 0)} 
          trend={trends.avg_order_value_pct_change_30d || 0} 
          trendValue={`${Math.abs(trends.avg_order_value_pct_change_30d || 0).toFixed(1)}%`} 
          icon={Activity} 
          color="bg-purple-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-admin-border shadow-admin">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase">Revenue Over Time</h2>
              <p className="text-xs text-admin-muted font-bold mt-1">Comparison between <span className="text-accent underline">Online</span> and <span className="text-admin-navy underline">In-Store</span> performance</p>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '1Y'].map((t) => (
                <button key={t} className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                  t === '1M' ? "bg-admin-navy text-white shadow-lg" : "bg-admin-bg text-admin-muted hover:text-admin-navy"
                )}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[350px] w-full min-w-0">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={charts?.revenue_over_time || []}>
                <defs>
                  <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F99D1C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F99D1C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOffline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B3A5C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1B3A5C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#718096', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#718096', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter',
                    fontWeight: 700
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="online" 
                  stroke="#F99D1C" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOnline)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="offline" 
                  stroke="#1B3A5C" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOffline)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-admin">
          <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase mb-2">Order Status</h2>
          <p className="text-xs text-admin-muted font-bold mb-8">Performance breakdown by fulfillment</p>
          
          <div className="h-[250px] w-full relative min-w-0">
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-3xl font-black text-admin-navy tracking-tighter uppercase">100%</span>
               <span className="text-[10px] text-admin-muted font-black uppercase tracking-widest">Efficiency</span>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {orderStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-admin-text">{item.name}</span>
                </div>
                <span className="text-xs font-black text-admin-navy uppercase tracking-widest">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-admin-border shadow-admin overflow-hidden">
          <div className="p-8 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs font-black text-accent hover:underline flex items-center gap-1 uppercase tracking-widest decoration-2 decoration-accent underline-offset-4">
              View All Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-admin-bg/50 border-y border-admin-border">
                <tr>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-admin-muted uppercase tracking-widest">Order ID</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-admin-muted uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-admin-muted uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-admin-muted uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-admin-muted uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {(activity?.recent_orders || []).map((order: any) => (
                  <tr key={order.id} className="hover:bg-admin-bg/30 transition-colors group cursor-pointer">
                    <td className="px-8 py-5 font-black text-sm text-admin-navy group-hover:text-accent">{order.order_id}</td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-admin-bg border border-admin-border flex items-center justify-center text-[10px] font-black text-admin-navy">
                           {order.order_id.substring(0, 2)}
                         </div>
                         <span className="text-sm font-bold text-admin-text">Order #{order.order_id}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 font-black text-sm text-admin-navy">{formatCurrency(order.total_amount)}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                        order.status === 'DELIVERED' && "bg-green-100 text-green-700",
                        order.status === 'PROCESSING' && "bg-blue-100 text-blue-700",
                        order.status === 'PENDING' && "bg-yellow-100 text-yellow-700",
                        order.status === 'CANCELLED' && "bg-red-100 text-red-700",
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-admin-muted font-bold">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products / Stock Alerts */}
        <div className="space-y-8">
           {/* Top Selling */}
           <div className="bg-white p-8 rounded-[2rem] border border-admin-border shadow-admin">
             <h2 className="text-xl font-heading font-black text-admin-navy tracking-tight uppercase mb-6">Top Selling</h2>
             <div className="space-y-6">
                {(products || []).map((product: any) => (
                  <div key={product.product_id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-admin-bg border border-admin-border flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-all ring-accent/0 group-hover:ring-4 ring-offset-2">
                       <Package className="w-6 h-6 text-admin-navy group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-admin-navy truncate uppercase tracking-tight">{product.name}</p>
                      <p className="text-[10px] text-admin-muted font-bold tracking-widest uppercase">SKU: {product.sku}</p>
                      <div className="flex items-center justify-between mt-2">
                         <span className="text-xs font-black text-admin-text">{formatCurrency(product.revenue)}</span>
                         <span className="text-[10px] font-black text-accent">{product.sold} sold</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-3 border-2 border-dashed border-admin-border rounded-2xl text-xs font-black text-admin-navy hover:border-accent hover:text-accent transition-all uppercase tracking-widest group">
               View Performance Analysis <ArrowUpRight className="inline-block ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </button>
           </div>

           {/* Quick Activity Feed */}
           <div className="bg-admin-navy p-8 rounded-[2rem] shadow-xl text-white">
              <h2 className="text-xl font-heading font-black text-white tracking-tight uppercase mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                Live Feed
              </h2>
              <div className="space-y-6">
                {(activity?.recent_orders || []).slice(0, 2).map((order: any) => (
                  <div key={order.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">New Order <span className="text-accent">#{order.order_id}</span> received</p>
                      <p className="text-[10px] text-white/40 font-black mt-1 uppercase tracking-widest">{new Date(order.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                
                {(activity?.low_stock_alerts || []).slice(0, 2).map((alert: any) => (
                  <div key={alert.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Low stock for <span className="text-yellow-400">"{alert.product__name}"</span> at {alert.showroom__name}</p>
                      <p className="text-[10px] text-white/40 font-black mt-1 uppercase tracking-widest">{alert.stock_quantity} left</p>
                    </div>
                  </div>
                ))}

                {(activity?.recent_customers || []).slice(0, 2).map((cust: any) => (
                  <div key={cust.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">New customer <span className="text-blue-400">"{cust.first_name} {cust.last_name}"</span> joined</p>
                      <p className="text-[10px] text-white/40 font-black mt-1 uppercase tracking-widest">{new Date(cust.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

