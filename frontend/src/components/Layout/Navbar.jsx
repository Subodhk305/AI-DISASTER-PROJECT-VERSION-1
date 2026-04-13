import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="h-16 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
      <h2 className="text-white font-medium">Dashboard</h2>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
            <User size={16} className="text-[#00D4FF]" />
          </div>
          <span className="text-sm text-white">User</span>
        </div>
      </div>
    </header>
  );
}