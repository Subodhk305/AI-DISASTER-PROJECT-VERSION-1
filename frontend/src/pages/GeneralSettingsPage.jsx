import React, { useState } from 'react';
import { Settings, Globe, Bell, Shield, Database, RefreshCw, Save, Moon, Sun, Monitor, Activity, Clock } from 'lucide-react';

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    systemName: 'DisasterAI',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'English',
    darkMode: 'dark',
    autoRefresh: true,
    refreshInterval: 30,
    dataRetention: 90,
    backupEnabled: true,
    backupSchedule: 'daily',
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">General Settings</h1>
        <p className="text-gray-400 text-sm">Configure system-wide settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Settings size={18} /> System Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-400 mb-1">System Name</label><input type="text" value={settings.systemName} onChange={(e) => setSettings({...settings, systemName: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Timezone</label><select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white"><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option></select></div>
            <div><label className="block text-sm text-gray-400 mb-1">Date Format</label><select value={settings.dateFormat} onChange={(e) => setSettings({...settings, dateFormat: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
            <div><label className="block text-sm text-gray-400 mb-1">Language</label><select value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white"><option>English</option><option>Hindi</option><option>Spanish</option></select></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Moon size={18} /> Appearance</h2>
          <div className="flex gap-3"><button onClick={() => setSettings({...settings, darkMode: 'light'})} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${settings.darkMode === 'light' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}><Sun size={16} /> Light</button><button onClick={() => setSettings({...settings, darkMode: 'dark'})} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${settings.darkMode === 'dark' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}><Moon size={16} /> Dark</button><button onClick={() => setSettings({...settings, darkMode: 'system'})} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${settings.darkMode === 'system' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}><Monitor size={16} /> System</button></div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><RefreshCw size={18} /> Data & Refresh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={settings.autoRefresh} onChange={(e) => setSettings({...settings, autoRefresh: e.target.checked})} className="w-4 h-4" /><span className="text-white">Auto-refresh predictions</span></label></div>
            <div><label className="block text-sm text-gray-400 mb-1">Refresh Interval (seconds)</label><input type="number" value={settings.refreshInterval} onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" disabled={!settings.autoRefresh} /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Data Retention (days)</label><input type="number" value={settings.dataRetention} onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={settings.backupEnabled} onChange={(e) => setSettings({...settings, backupEnabled: e.target.checked})} className="w-4 h-4" /><span className="text-white">Enable Automatic Backups</span></label></div>
            {settings.backupEnabled && <div><label className="block text-sm text-gray-400 mb-1">Backup Schedule</label><select value={settings.backupSchedule} onChange={(e) => setSettings({...settings, backupSchedule: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white"><option>daily</option><option>weekly</option><option>monthly</option></select></div>}
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors"><Save size={16} /> Save All Settings</button>
      </div>
    </div>
  );
}