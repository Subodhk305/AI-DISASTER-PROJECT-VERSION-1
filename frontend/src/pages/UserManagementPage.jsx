import React, { useState } from 'react';
import { Users, UserPlus, Edit, Trash2, Shield, User, Mail, Phone, Calendar, CheckCircle, XCircle, MoreVertical, Search } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@disasterai.com', role: 'admin', status: 'active', lastLogin: '2026-03-24 08:30:00', phone: '+91 98765 43210', createdAt: '2025-01-01' },
    { id: 2, name: 'Test User', email: 'user@example.com', role: 'user', status: 'active', lastLogin: '2026-03-23 14:20:00', phone: '+91 98765 43211', createdAt: '2025-02-15' },
    { id: 3, name: 'John Volunteer', email: 'john@volunteer.com', role: 'volunteer', status: 'active', lastLogin: '2026-03-22 10:15:00', phone: '+91 98765 43212', createdAt: '2025-03-10' },
    { id: 4, name: 'Emergency Provider', email: 'emergency@provider.com', role: 'emergency_provider', status: 'inactive', lastLogin: '2026-03-20 16:45:00', phone: '+91 98765 43213', createdAt: '2025-04-20' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
      case 'user': return 'text-[#00D4FF] bg-[#00D4FF]/10';
      case 'volunteer': return 'text-[#00E57A] bg-[#00E57A]/10';
      case 'emergency_provider': return 'text-[#FFB020] bg-[#FFB020]/10';
      default: return 'text-gray-400 bg-white/10';
    }
  };

  const getRoleIcon = (role) => {
    if (role === 'admin') return <Shield size={14} />;
    if (role === 'volunteer') return <Users size={14} />;
    return <User size={14} />;
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 text-sm">Manage system users and their roles</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><UserPlus size={14} /> Add User</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-sm">Total Users</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{stats.active}</div><p className="text-gray-400 text-sm">Active</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FFB020]">{stats.inactive}</div><p className="text-gray-400 text-sm">Inactive</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FF3B5C]">{stats.admins}</div><p className="text-gray-400 text-sm">Administrators</p></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white" /></div>
        <div className="flex gap-2">{['all', 'admin', 'user', 'volunteer', 'emergency_provider'].map(role => (<button key={role} onClick={() => setFilterRole(role)} className={`px-3 py-2 rounded-lg text-sm capitalize ${filterRole === role ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400 hover:text-white'}`}>{role.replace('_', ' ')}</button>))}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-white/10"><th className="text-left py-3 text-gray-400">User</th><th className="text-left py-3 text-gray-400">Role</th><th className="text-left py-3 text-gray-400">Status</th><th className="text-left py-3 text-gray-400">Last Login</th><th className="text-left py-3 text-gray-400">Phone</th><th className="text-left py-3 text-gray-400">Actions</th> </tr></thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3"><div><p className="text-white font-medium">{user.name}</p><p className="text-gray-500 text-xs">{user.email}</p></div> </td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${getRoleColor(user.role)}`}>{getRoleIcon(user.role)} {user.role.replace('_', ' ')}</span> </td>
                <td className="py-3">{user.status === 'active' ? <span className="flex items-center gap-1 text-[#00E57A]"><CheckCircle size={12} /> Active</span> : <span className="flex items-center gap-1 text-[#FFB020]"><XCircle size={12} /> Inactive</span>} </td>
                <td className="py-3 text-gray-400 text-sm">{user.lastLogin} </td>
                <td className="py-3 text-gray-400 text-sm">{user.phone} </td>
                <td className="py-3"><div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button></div> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}