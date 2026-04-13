import React, { useState } from 'react';
import { Activity, CloudRain, Waves, Bell, Shield, TrendingUp, LogOut, Menu, X, User } from 'lucide-react';
import RiskCard from './RiskCard';
import OverallRisk from './OverallRisk';

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Earthquake Risk', value: 'Low', probability: 12, icon: Activity, color: '#FF3B5C', bg: 'bg-[#FF3B5C]/20' },
    { title: 'Rainfall Forecast', value: '12 mm', probability: 45, icon: CloudRain, color: '#00D4FF', bg: 'bg-[#00D4FF]/20' },
    { title: 'Flood Risk', value: 'Low', probability: 8, icon: Waves, color: '#7B2FFF', bg: 'bg-[#7B2FFF]/20' },
  ];

  const alerts = [
    { message: '✅ No active alerts', type: 'success', time: 'Just now' },
    { message: '🌧️ Light rainfall expected in your area', type: 'info', time: '2 mins ago' },
  ];

  const overallRisk = 22; // 22% overall risk

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030308] to-[#0f0f1a]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-lg text-white"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed lg:relative z-40 w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} h-full`}>
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity size={24} className="text-[#00D4FF]" />
              <div>
                <h1 className="text-lg font-bold text-white">DisasterAI</h1>
                <p className="text-[10px] text-gray-500">Unified Response System</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {['dashboard', 'map', 'alerts', 'resources', 'volunteers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
                <User size={16} className="text-[#00D4FF]" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, <span className="gradient-text">{user?.name}</span>
              </h1>
              <p className="text-gray-400 mt-1">Real-time disaster predictions for your location</p>
            </div>

            {/* Overall Risk */}
            <OverallRisk risk={overallRisk / 100} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <RiskCard
                  key={i}
                  title={stat.title}
                  probability={stat.probability}
                  riskLevel={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Alerts */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-[#00D4FF]" />
                <h2 className="text-lg font-semibold text-white">Recent Alerts</h2>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-[#00D4FF]" />
                <h2 className="text-lg font-semibold text-white">System Status</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><p className="text-gray-400 text-sm">Accuracy</p><p className="text-2xl font-bold text-[#00D4FF]">94.7%</p></div>
                <div><p className="text-gray-400 text-sm">Response</p><p className="text-2xl font-bold text-[#00D4FF]">&lt;100ms</p></div>
                <div><p className="text-gray-400 text-sm">Active Users</p><p className="text-2xl font-bold text-[#00D4FF]">1,234</p></div>
                <div><p className="text-gray-400 text-sm">Alerts Sent</p><p className="text-2xl font-bold text-[#00D4FF]">567</p></div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-600 pt-4">
              <p>Powered by AI/ML | Real-time predictions | 24/7 Monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}