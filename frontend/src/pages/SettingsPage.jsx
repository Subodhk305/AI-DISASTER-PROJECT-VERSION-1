import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, User, Mail, Phone, MapPin, Save } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@disasterai.com',
    phone: '+91 98765 43210',
    location: 'Emergency Operations Center',
    role: 'Administrator',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    criticalAlertsOnly: false,
  });

  const [alertThresholds, setAlertThresholds] = useState({
    earthquake: 4.0,
    rainfall: 50,
    flood: 0.6,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm">Configure system settings and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4"><User size={20} className="text-[#00D4FF]" /><h2 className="text-lg font-semibold text-white">Profile Settings</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-gray-400 text-sm mb-1">Full Name</label><input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="block text-gray-400 text-sm mb-1">Email</label><input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="block text-gray-400 text-sm mb-1">Phone</label><input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
            <div><label className="block text-gray-400 text-sm mb-1">Location</label><input type="text" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white" /></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4"><Bell size={20} className="text-[#FFB020]" /><h2 className="text-lg font-semibold text-white">Notification Preferences</h2></div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={notifications.emailAlerts} onChange={e => setNotifications({ ...notifications, emailAlerts: e.target.checked })} className="w-4 h-4" /><span className="text-white">Email Alerts</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={notifications.smsAlerts} onChange={e => setNotifications({ ...notifications, smsAlerts: e.target.checked })} className="w-4 h-4" /><span className="text-white">SMS Alerts</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={notifications.pushNotifications} onChange={e => setNotifications({ ...notifications, pushNotifications: e.target.checked })} className="w-4 h-4" /><span className="text-white">Push Notifications</span></label>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={notifications.criticalAlertsOnly} onChange={e => setNotifications({ ...notifications, criticalAlertsOnly: e.target.checked })} className="w-4 h-4" /><span className="text-white">Critical Alerts Only</span></label>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4"><Shield size={20} className="text-[#7B2FFF]" /><h2 className="text-lg font-semibold text-white">Alert Thresholds</h2></div>
          <div className="space-y-4">
            <div><label className="block text-gray-400 text-sm mb-1">Earthquake Magnitude Threshold</label><input type="range" min="0" max="8" step="0.1" value={alertThresholds.earthquake} onChange={e => setAlertThresholds({ ...alertThresholds, earthquake: parseFloat(e.target.value) })} className="w-full" /><p className="text-white text-sm mt-1">Alert at M{alertThresholds.earthquake}+</p></div>
            <div><label className="block text-gray-400 text-sm mb-1">Rainfall Threshold (mm/day)</label><input type="range" min="0" max="200" step="5" value={alertThresholds.rainfall} onChange={e => setAlertThresholds({ ...alertThresholds, rainfall: parseInt(e.target.value) })} className="w-full" /><p className="text-white text-sm mt-1">Alert at {alertThresholds.rainfall}mm+</p></div>
            <div><label className="block text-gray-400 text-sm mb-1">Flood Risk Threshold</label><input type="range" min="0" max="1" step="0.05" value={alertThresholds.flood} onChange={e => setAlertThresholds({ ...alertThresholds, flood: parseFloat(e.target.value) })} className="w-full" /><p className="text-white text-sm mt-1">Alert at {alertThresholds.flood * 100}%+ risk</p></div>
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors"><Save size={16} /> Save All Settings</button>
      </div>
    </div>
  );
}