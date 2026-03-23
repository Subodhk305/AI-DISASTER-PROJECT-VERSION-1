import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Map, Bell, Package, Users, 
  Settings, LogOut, Activity, CloudRain, Waves 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/map', icon: Map, label: 'Disaster Map' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/resources', icon: Package, label: 'Resources' },
    { path: '/volunteers', icon: Users, label: 'Volunteers' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', icon: Settings, label: 'Admin Panel' });
  }

  return (
    <aside className="w-64 bg-[rgba(11,15,25,0.8)] backdrop-blur-md border-r border-[#1A2540] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1A2540]">
        <div className="flex items-center gap-2">
          <Activity size={24} className="text-[#00D4FF]" />
          <div>
            <h1 className="text-lg font-bold text-white">DisasterAI</h1>
            <p className="text-[10px] text-gray-500">Unified Response System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-[rgba(0,212,255,0.1)] text-[#00D4FF] border border-[rgba(0,212,255,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(14,20,36,0.6)]'
              }`
            }
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-[#1A2540]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
            <span className="text-[#00D4FF] text-sm font-bold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[rgba(14,20,36,0.6)] transition-colors text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}