// frontend/src/pages/SystemLogsPage.jsx
import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Trash2, Info, AlertCircle, CheckCircle, Activity, User, Settings, MapPin, Bell, Package } from 'lucide-react';

export default function SystemLogsPage() {
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '2026-03-24 10:30:00', level: 'info', user: 'system', action: 'Earthquake prediction updated', details: 'Magnitude 5.2 detected in Northern Region', category: 'prediction' },
    { id: 2, timestamp: '2026-03-24 09:15:00', level: 'warning', user: 'admin@disasterai.com', action: 'Low stock alert', details: 'Medical kits below threshold (75 remaining)', category: 'inventory' },
    { id: 3, timestamp: '2026-03-24 08:00:00', level: 'error', user: 'system', action: 'API connection failed', details: 'Rainfall API timeout after 10 seconds', category: 'api' },
    { id: 4, timestamp: '2026-03-23 22:30:00', level: 'info', user: 'user@example.com', action: 'Location selected', details: 'User selected location: Northern Region', category: 'user' },
    { id: 5, timestamp: '2026-03-23 18:45:00', level: 'success', user: 'admin@disasterai.com', action: 'Alert sent', details: 'High risk alert sent to 1,247 users', category: 'alert' },
    { id: 6, timestamp: '2026-03-23 14:20:00', level: 'info', user: 'system', action: 'Data sync completed', details: 'USGS data synchronized successfully', category: 'sync' },
    { id: 7, timestamp: '2026-03-23 10:00:00', level: 'warning', user: 'system', action: 'High system load', details: 'CPU usage reached 85%', category: 'performance' },
    { id: 8, timestamp: '2026-03-23 08:30:00', level: 'info', user: 'volunteer@example.com', action: 'Volunteer registered', details: 'New volunteer registered: Priya Patel', category: 'user' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelIcon = (level) => {
    switch(level) {
      case 'info': return <Info size={14} className="text-[#00D4FF]" />;
      case 'warning': return <AlertCircle size={14} className="text-[#FFB020]" />;
      case 'error': return <AlertCircle size={14} className="text-[#FF3B5C]" />;
      case 'success': return <CheckCircle size={14} className="text-[#00E57A]" />;
      default: return <Activity size={14} className="text-gray-500" />;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'info': return 'text-[#00D4FF] bg-[#00D4FF]/10';
      case 'warning': return 'text-[#FFB020] bg-[#FFB020]/10';
      case 'error': return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
      case 'success': return 'text-[#00E57A] bg-[#00E57A]/10';
      default: return 'text-gray-500 bg-white/10';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'prediction': return <Activity size={12} />;
      case 'inventory': return <Package size={12} />;
      case 'api': return <Settings size={12} />;
      case 'user': return <User size={12} />;
      case 'alert': return <Bell size={12} />;
      default: return <FileText size={12} />;
    }
  };

  const stats = {
    total: logs.length,
    info: logs.filter(l => l.level === 'info').length,
    warning: logs.filter(l => l.level === 'warning').length,
    error: logs.filter(l => l.level === 'error').length,
    success: logs.filter(l => l.level === 'success').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">System Logs</h1>
            <p className="text-gray-400 text-sm">Comprehensive system activity and event logs</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white/10 rounded-lg text-gray-400 hover:text-white flex items-center gap-2"><Download size={14} /> Export</button>
            <button className="px-3 py-1.5 bg-white/10 rounded-lg text-gray-400 hover:text-red-400 flex items-center gap-2"><Trash2 size={14} /> Clear</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-3 text-center"><div className="text-xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-xs">Total Logs</p></div>
        <div className="bg-white/5 rounded-xl p-3 text-center"><div className="text-xl font-bold text-[#00D4FF]">{stats.info}</div><p className="text-gray-400 text-xs">Info</p></div>
        <div className="bg-white/5 rounded-xl p-3 text-center"><div className="text-xl font-bold text-[#FFB020]">{stats.warning}</div><p className="text-gray-400 text-xs">Warnings</p></div>
        <div className="bg-white/5 rounded-xl p-3 text-center"><div className="text-xl font-bold text-[#FF3B5C]">{stats.error}</div><p className="text-gray-400 text-xs">Errors</p></div>
        <div className="bg-white/5 rounded-xl p-3 text-center"><div className="text-xl font-bold text-[#00E57A]">{stats.success}</div><p className="text-gray-400 text-xs">Success</p></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white" 
          />
        </div>
        <div className="flex gap-2">
          {['all', 'info', 'warning', 'error', 'success'].map(level => (
            <button 
              key={level} 
              onClick={() => setFilterLevel(level)} 
              className={`px-3 py-2 rounded-lg text-sm capitalize ${filterLevel === level ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400 hover:text-white'}`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all', 'prediction', 'inventory', 'api', 'user', 'alert'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilterCategory(cat)} 
              className={`px-3 py-2 rounded-lg text-sm capitalize ${filterCategory === cat ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredLogs.map(log => (
          <div key={log.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getLevelIcon(log.level)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-medium">{log.action}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(log.level)}`}>{log.level.toUpperCase()}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">{getCategoryIcon(log.category)} {log.category}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">{log.details}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>User: {log.user}</span>
                  <span>Time: {log.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}