import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { authApi } from '../../../lib/api';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loginStore = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.login({ username: email, password });
      const { access, refresh } = response.data;
      
      await loginStore(access, refresh);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-body">
      {/* Left Panel - Branding (40%) */}
      <div className="hidden lg:flex w-[40%] bg-admin-navy relative overflow-hidden flex-col justify-between p-12">
        {/* Background Overlay Image */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay grayscale transition-transform duration-[10s] hover:scale-110"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-white italic text-3xl shadow-lg shadow-accent/20">H</div>
            <span className="font-heading font-black tracking-tighter text-3xl italic text-white uppercase">Homelux <span className="text-accent underline decoration-4 underline-offset-4">Admin</span></span>
          </div>
          
          <div className="mt-20 max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-heading font-black text-white leading-tight italic uppercase tracking-tighter"
            >
              Power your store. <br />
              <span className="text-accent">Grow your business.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 mt-6 text-lg font-medium leading-relaxed"
            >
              Access the most powerful furniture management engine in East Africa. 
              Control every aspect of your operations from inventory to global logistics.
            </motion.p>
          </div>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-4 text-white/40 text-sm font-black tracking-widest uppercase">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>Enterprise Grade Security</span>
           </div>
           <p className="text-white/30 text-xs mt-8">© 2026 Fairdeal Furniture Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Login Form (60%) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-admin-bg lg:bg-white relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-white italic text-2xl">F</div>
            <span className="font-heading font-black tracking-tighter text-2xl italic text-admin-navy uppercase">Fairdeal <span className="text-accent">Admin</span></span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-heading font-black text-admin-navy tracking-tight italic uppercase">Sign In</h1>
            <p className="text-admin-muted mt-2 font-medium">Please enter your administrative credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted transition-colors group-focus-within:text-accent" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@homelux.co.ke"
                  className="w-full h-14 pl-12 pr-4 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium placeholder:text-admin-muted/50"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-black text-admin-navy uppercase tracking-widest">Password</label>
                <Link to="/admin/forgot-password" title="Recover your password" className="text-xs font-black text-accent hover:underline uppercase tracking-wide">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-admin-muted transition-colors group-focus-within:text-accent" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-muted hover:text-admin-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-1">
              <div 
                onClick={() => setRememberMe(!rememberMe)}
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all",
                  rememberMe ? "bg-accent border-accent" : "border-admin-border bg-white"
                )}
              >
                {rememberMe && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-white rounded-sm" />}
              </div>
              <span className="text-sm font-bold text-admin-navy cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>Remember me for 30 days</span>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-tight shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-admin-muted text-sm font-medium">
            Not an administrator? <Link to="/" className="text-admin-navy font-bold hover:underline">Return to public store</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
