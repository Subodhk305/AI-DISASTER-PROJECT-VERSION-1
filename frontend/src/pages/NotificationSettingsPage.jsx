import React, { useState } from 'react';
import { Bell, Mail, Phone, MessageCircle, Globe, AlertTriangle, Activity, CloudRain, Waves, Save, Volume2, VolumeX } from 'lucide-react';

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    inAppNotifications: true,
    soundEnabled: true,
    email: 'user@disasterai.com',
    phone: '+91 98765 43210',
    earthquakeThreshold: 4.0,
    rainfallThreshold: 50,
    floodThreshold: 0.6,
    criticalOnly: false,
    dailyDigest: true,
    weeklyReport: true,
  });

  const handleSave = () => {
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Notification Settings</h1>
        <p className="text-gray-400 text-sm">Configure how you receive alerts and notifications</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Bell size={18} /> Notification Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.emailAlerts} onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})} className="w-4 h-4" /><Mail size={16} className="text-gray-400" /><span className="text-white">Email Alerts</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.smsAlerts} onChange={(e) => setSettings({...settings, smsAlerts: e.target.checked})} className="w-4 h-4" /><Phone size={16} className="text-gray-400" /><span className="text-white">SMS Alerts</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.pushNotifications} onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})} className="w-4 h-4" /><MessageCircle size={16} className="text-gray-400" /><span className="text-white">Push Notifications</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.inAppNotifications} onChange={(e) => setSettings({...settings, inAppNotifications: e.target.checked})} className="w-4 h-4" /><Bell size={16} className="text-gray-400" /><span className="text-white">In-App Notifications</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.soundEnabled} onChange={(e) => setSettings({...settings, soundEnabled: e.target.checked})} className="w-4 h-4" />{settings.soundEnabled ? <Volume2 size={16} className="text-gray-400" /> : <VolumeX size={16} className="text-gray-400" />}<span className="text-white">Sound Alerts</span></label>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Mail size={18} /> Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-400 mb-1">Email Address</label><input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Phone Number</label><input type="tel" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Alert Thresholds</h2>
          <div className="space-y-4">
            <div><label className="block text-gray-400 text-sm mb-1">Earthquake Magnitude Threshold</label><input type="range" min="0" max="8" step="0.1" value={settings.earthquakeThreshold} onChange={(e) => setSettings({...settings, earthquakeThreshold: parseFloat(e.target.value)})} className="w-full" /><p className="text-white text-sm mt-1">Alert at M{settings.earthquakeThreshold}+</p></div>
            <div><label className="block text-gray-400 text-sm mb-1">Rainfall Threshold (mm/day)</label><input type="range" min="0" max="200" step="5" value={settings.rainfallThreshold} onChange={(e) => setSettings({...settings, rainfallThreshold: parseInt(e.target.value)})} className="w-full" /><p className="text-white text-sm mt-1">Alert at {settings.rainfallThreshold}mm+</p></div>
            <div><label className="block text-gray-400 text-sm mb-1">Flood Risk Threshold</label><input type="range" min="0" max="1" step="0.05" value={settings.floodThreshold} onChange={(e) => setSettings({...settings, floodThreshold: parseFloat(e.target.value)})} className="w-full" /><p className="text-white text-sm mt-1">Alert at {settings.floodThreshold * 100}%+ risk</p></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Globe size={18} /> Digest Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.criticalOnly} onChange={(e) => setSettings({...settings, criticalOnly: e.target.checked})} className="w-4 h-4" /><span className="text-white">Critical alerts only</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.dailyDigest} onChange={(e) => setSettings({...settings, dailyDigest: e.target.checked})} className="w-4 h-4" /><span className="text-white">Daily summary digest</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={settings.weeklyReport} onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})} className="w-4 h-4" /><span className="text-white">Weekly analytics report</span></label>
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors"><Save size={16} /> Save Settings</button>
      </div>
    </div>
  );
}