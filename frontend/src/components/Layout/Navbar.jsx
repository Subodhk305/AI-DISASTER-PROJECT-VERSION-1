import { useState, useEffect } from 'react';
import { Bell, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();
  const { isConnected, lastMessage } = useWebSocket();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (lastMessage) {
      setNotifications(prev => [lastMessage, ...prev].slice(0, 5));
    }
  }, [lastMessage]);

  return (
    <header className="h-16 bg-[rgba(11,15,25,0.9)] backdrop-blur-md border-b border-[#1A2540] flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search location..."
            className="w-64 bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#00E57A] animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-xs text-gray-500 hidden sm:block">
            {isConnected ? 'Live' : 'Connecting...'}
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3B5C] rounded-full" />
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 glass rounded-xl border border-[#1A2540] shadow-xl z-50">
              <div className="p-3 border-b border-[#1A2540]">
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-6">No new notifications</p>
                ) : (
                  notifications.map((notif, idx) => (
                    <div key={idx} className="p-3 border-b border-[#1A2540] last:border-0 hover:bg-[rgba(14,20,36,0.5)]">
                      <p className="text-sm text-white">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(notif.timestamp).toLocaleTimeString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
              <User size={16} className="text-[#00D4FF]" />
            </div>
            <span className="text-sm hidden sm:block">{user?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown size={14} />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-10 w-48 glass rounded-xl border border-[#1A2540] shadow-xl z-50">
              <div className="p-3 border-b border-[#1A2540]">
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button className="w-full text-left p-3 text-sm text-gray-400 hover:text-white hover:bg-[rgba(14,20,36,0.5)] transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left p-3 text-sm text-red-400 hover:bg-[rgba(14,20,36,0.5)] transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}