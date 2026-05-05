import React, { useState, useEffect } from 'react';
import {
  UserCircle,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Shield,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Key,
  Users
} from 'lucide-react';
import { staffApi } from '../../../lib/api';
import { toast } from 'sonner';

const ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'SALES_AGENT', label: 'Sales Agent' },
  { value: 'DISPATCHER', label: 'Dispatcher' },
  { value: 'FUNDI', label: 'Fundi' },
  { value: 'DRIVER', label: 'Driver' },
  { value: 'INVENTORY_MANAGER', label: 'Inventory Manager' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
];

export const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: 'SALES_AGENT',
    phone_number: '',
    password: '',
    is_active: true
  });

  const [passwordData, setPasswordData] = useState({
    password: ''
  });

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const response = await staffApi.list();
      setStaff(response.data);
    } catch (error) {
      toast.error('Failed to fetch staff list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUser && !isPasswordModalOpen) {
        await staffApi.update(selectedUser.id, formData);
        toast.success('Staff updated successfully');
      } else {
        await staffApi.create(formData);
        toast.success('Staff created successfully');
      }
      setIsModalOpen(false);
      setSelectedUser(null);
      fetchStaff();
    } catch (error: any) {
      toast.error(error.response?.data?.email?.[0] || 'Operation failed');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await staffApi.resetPassword(selectedUser.id, passwordData);
      toast.success('Password reset successfully');
      setIsPasswordModalOpen(false);
      setSelectedUser(null);
      setPasswordData({ password: '' });
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await staffApi.delete(id);
        toast.success('Staff deleted successfully');
        fetchStaff();
      } catch (error) {
        toast.error('Failed to delete staff');
      }
    }
  };

  const filteredStaff = staff.filter(user =>
    `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black text-admin-navy tracking-tight uppercase italic">Staff Management</h1>
          <p className="text-admin-muted font-bold mt-1">Manage your team's access and roles.</p>
        </div>
        <button
          onClick={() => {
            setSelectedUser(null);
            setFormData({
              email: '',
              first_name: '',
              last_name: '',
              role: 'SALES_AGENT',
              phone_number: '',
              password: '',
              is_active: true
            });
            setIsModalOpen(true);
          }}
          className="h-12 px-6 bg-accent text-white rounded-2xl font-black uppercase tracking-tight flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
        >
          <Plus className="w-5 h-5" />
          Add New Staff
        </button>
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-4 rounded-[2rem] border border-admin-border flex items-center px-6">
          <Search className="w-5 h-5 text-admin-muted mr-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="flex-1 h-10 outline-none font-bold text-admin-navy placeholder:text-admin-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="bg-admin-navy p-6 rounded-[2rem] text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-white/40">Total Staff</p>
            <h3 className="text-3xl font-heading font-black italic">{staff.length}</h3>
          </div>
          <Users className="w-10 h-10 text-accent opacity-50" />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-[2.5rem] border border-admin-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-admin-bg/50 border-b border-admin-border">
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-admin-navy">Staff Member</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-admin-navy">Role</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-admin-navy">Last Login</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-admin-navy">Status</th>
                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-admin-navy text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center">
                    <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-admin-muted font-bold">
                    No staff members found matching your search.
                  </td>
                </tr>
              ) : filteredStaff.map((user) => (
                <tr key={user.id} className="hover:bg-admin-bg/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-admin-bg rounded-2xl flex items-center justify-center font-black text-admin-navy text-xl shadow-inner border border-admin-border">
                        {user.first_name[0]}{user.last_name[0]}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-admin-navy italic text-lg uppercase leading-none">{user.first_name} {user.last_name}</h4>
                        <p className="text-admin-muted font-bold text-sm mt-1 flex items-center gap-2">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-admin-navy/5 text-admin-navy rounded-full text-xs font-black uppercase tracking-wider border border-admin-navy/10 flex items-center gap-2 w-fit">
                      <Shield className="w-3 h-3 text-accent" />
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-admin-muted">
                    {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-8 py-6">
                    {user.is_active ? (
                      <span className="flex items-center gap-1.5 text-green-600 text-xs font-black uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-black uppercase tracking-wider">
                        <XCircle className="w-4 h-4" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setFormData({
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            role: user.role,
                            phone_number: user.phone_number || '',
                            password: '',
                            is_active: user.is_active
                          });
                          setIsModalOpen(true);
                        }}
                        className="p-3 hover:bg-accent hover:text-white rounded-xl transition-all text-admin-muted group"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsPasswordModalOpen(true);
                        }}
                        className="p-3 hover:bg-admin-navy hover:text-white rounded-xl transition-all text-admin-muted group"
                      >
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-3 hover:bg-red-500 hover:text-white rounded-xl transition-all text-admin-muted group"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-admin-navy/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <h2 className="text-3xl font-heading font-black text-admin-navy uppercase italic mb-8">
                {selectedUser ? 'Edit Staff Member' : 'Add New Staff'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                      value={formData.first_name}
                      onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text"
                      required
                      className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                      value={formData.last_name}
                      onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Assign Role</label>
                    <select
                      className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold appearance-none"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      {ROLES.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Phone Number</label>
                    <input
                      type="text"
                      className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                      value={formData.phone_number}
                      onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                    />
                  </div>
                </div>

                {!selectedUser && (
                  <div className="space-y-2">
                    <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">Password</label>
                    <input
                      type="password"
                      required
                      className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.is_active ? 'bg-green-500' : 'bg-admin-muted'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
                  </button>
                  <span className="text-sm font-black text-admin-navy uppercase">Account Active</span>
                </div>

                <div className="flex justify-end gap-4 mt-10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="h-14 px-8 rounded-2xl font-black uppercase tracking-tight text-admin-navy hover:bg-admin-bg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-14 px-10 bg-accent text-white rounded-2xl font-black uppercase tracking-tight shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    {selectedUser ? 'Save Changes' : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-admin-navy/40 backdrop-blur-md" onClick={() => setIsPasswordModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <h2 className="text-2xl font-heading font-black text-admin-navy uppercase italic mb-2">Reset Password</h2>
              <p className="text-admin-muted font-bold mb-8">Set a new password for {selectedUser?.first_name}.</p>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-admin-navy uppercase tracking-widest ml-1">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full h-14 px-6 bg-admin-bg border border-transparent rounded-2xl focus:bg-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none font-bold"
                    value={passwordData.password}
                    onChange={e => setPasswordData({ password: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="h-12 px-6 rounded-2xl font-black uppercase tracking-tight text-admin-navy hover:bg-admin-bg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-12 px-8 bg-admin-navy text-white rounded-2xl font-black uppercase tracking-tight shadow-lg shadow-admin-navy/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
