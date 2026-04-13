// frontend/src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bell, Map, ClipboardList, 
  AlertTriangle, Calendar, Settings, LogOut, 
  ChevronDown, ChevronRight, Truck, Warehouse, 
  Home, FileText, BarChart3, PieChart, Shield, UserCheck,
  Activity, CloudRain, Waves, Navigation, Compass, 
  HardHat, Building, Globe, MapPin, Users, Package,
  Tent, TrendingUp, Database
} from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const [openMenus, setOpenMenus] = useState({
    planning: false,
    personnel: false,
    volunteer: false,
    equipment: false,
    shelter: false,
    reports: false,
    settings: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Main Navigation Items
  const mainNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#00D4FF' },
    { path: '/alerts', icon: Bell, label: 'Notifications', color: '#FFB020', badge: 3 },
    { path: '/map', icon: Map, label: 'Disaster Map', color: '#7B2FFF' },
    { path: '/tasks', icon: ClipboardList, label: 'Task Management', color: '#00E57A' },
  ];

  // Add Admin Panel if user is admin
  if (user?.role === 'admin') {
    mainNavItems.push({ path: '/admin', icon: Settings, label: 'Admin Panel', color: '#FF3B5C' });
  }

  // Planning Section
  const planningItems = [
    { path: '/planning/evacuation', icon: Navigation, label: 'Evacuation Routes', color: '#00D4FF' },
    { path: '/planning/zones', icon: Compass, label: 'Zone Planning', color: '#7B2FFF' },
    { path: '/planning/risk', icon: AlertTriangle, label: 'Risk Assessment', color: '#FF3B5C' }
  ];

  // Personnel Management
  const personnelItems = [
    { path: '/personnel/staff', icon: Users, label: 'Staff Management', color: '#00D4FF' },
    { path: '/personnel/emergency', icon: HardHat, label: 'Emergency Teams', color: '#FFB020' }
  ];

  // Volunteer Management
  const volunteerItems = [
    { path: '/volunteers/list', icon: Users, label: 'Volunteer List', color: '#00E57A' },
    { path: '/volunteers/register', icon: UserCheck, label: 'Register Volunteer', color: '#00D4FF' },
    { path: '/volunteers/training', icon: Activity, label: 'Training Records', color: '#7B2FFF' },
    { path: '/volunteers/assignments', icon: ClipboardList, label: 'Assignments', color: '#FFB020' }
  ];

  // Equipment & Inventory
  const equipmentItems = [
    { path: '/equipment/list', icon: Package, label: 'Equipment Inventory', color: '#00D4FF' },
    { path: '/storage/main', icon: Building, label: 'Storage Management', color: '#7B2FFF' },
    { path: '/inventory/food', icon: Package, label: 'Inventory Management', color: '#00E57A' },
    { path: '/warehouse', icon: Warehouse, label: 'Warehouse Management', color: '#FFB020' }
  ];

  // Shelter Management
  const shelterItems = [
    { path: '/shelters/containers', icon: Home, label: 'Container Shelters', color: '#00D4FF' },
    { path: '/shelters/tent-cities', icon: Tent, label: 'Tent Cities', color: '#FFB020' },
    { path: '/shelters/evacuation', icon: MapPin, label: 'Evacuation Centers', color: '#00E57A' },
    { path: '/shelters/capacity', icon: Users, label: 'Capacity Management', color: '#7B2FFF' }
  ];

  // Reports & Analytics
  const reportsItems = [
    { path: '/reports/incidents', icon: AlertTriangle, label: 'Incident Reports', color: '#FF3B5C' },
    { path: '/reports/resource', icon: BarChart3, label: 'Resource Utilization', color: '#00D4FF' },
    { path: '/reports/performance', icon: TrendingUp, label: 'Performance Metrics', color: '#7B2FFF' },
    { path: '/reports/logs', icon: FileText, label: 'System Logs', color: '#FFB020' }
  ];

  // Settings
  const settingsItems = [
    { path: '/settings/general', icon: Settings, label: 'General Settings', color: '#00D4FF' },
    { path: '/settings/users', icon: Users, label: 'User Management', color: '#7B2FFF' },
    { path: '/settings/notifications', icon: Bell, label: 'Notification Settings', color: '#FFB020' },
    { path: '/settings/integrations', icon: Database, label: 'API Integrations', color: '#00E57A' },
    { path: '/help', icon: Activity, label: 'Help & Support', color: '#FF3B5C' }
  ];

  const SidebarSection = ({ title, icon: Icon, items, menuKey }) => {
    const isOpen = openMenus[menuKey];

    return (
      <div className="mb-4">
        <button
          onClick={() => toggleMenu(menuKey)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-[#00D4FF] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon size={12} />
            <span>{title}</span>
          </div>
          {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1"
            >
              {items.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-8 py-2 rounded-lg transition-all text-sm ${
                      isActive
                        ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={14} style={{ color: item.color || '#00D4FF' }} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const MenuItem = ({ item }) => {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
            isActive
              ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`
        }
      >
        <item.icon size={18} style={{ color: item.color || '#00D4FF' }} />
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-[#FF3B5C] text-white rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="fixed lg:relative z-40 w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-white/10 sticky top-0 bg-white/5 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Activity size={24} className="text-[#00D4FF]" />
          <div>
            <h1 className="text-lg font-bold text-white">DisasterAI</h1>
            <p className="text-[10px] text-gray-500">Unified Response System</p>
          </div>
        </div>
      </div>

      {/* Navigation - Add padding bottom to make space for user info */}
      <nav className="p-4 pb-32 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>

        {/* Planning Section */}
        <SidebarSection title="Planning" icon={Compass} items={planningItems} menuKey="planning" />

        {/* Personnel Section */}
        <SidebarSection title="Personnel Management" icon={Users} items={personnelItems} menuKey="personnel" />

        {/* Volunteer Section */}
        <SidebarSection title="Volunteer Management" icon={UserCheck} items={volunteerItems} menuKey="volunteer" />

        {/* Equipment & Inventory Section */}
        <SidebarSection title="Equipment & Inventory" icon={Package} items={equipmentItems} menuKey="equipment" />

        {/* Shelter Management Section */}
        <SidebarSection title="Shelter Management" icon={Home} items={shelterItems} menuKey="shelter" />

        {/* Reports Section */}
        <SidebarSection title="Reports & Analytics" icon={FileText} items={reportsItems} menuKey="reports" />

        {/* Settings Section */}
        <SidebarSection title="Settings" icon={Settings} items={settingsItems} menuKey="settings" />
      </nav>

      {/* User Info & Logout - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center">
            <span className="text-white text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
            <p className="text-[10px] text-gray-600">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}