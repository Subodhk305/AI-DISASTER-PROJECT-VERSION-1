import React, { useState } from 'react';
import { Bell, AlertTriangle, CloudRain, Waves, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'earthquake', severity: 'high', title: 'High Risk Earthquake Alert', message: 'Magnitude 5.2 earthquake detected in Northern Region', location: 'Northern Region', time: '2026-03-24T10:30:00', status: 'unread', magnitude: 5.2, depth: 10 },
    { id: 2, type: 'rainfall', severity: 'medium', title: 'Heavy Rainfall Warning', message: '45mm rainfall expected in Coastal Area', location: 'Coastal Area', time: '2026-03-24T09:00:00', status: 'unread', rainfall: 45 },
    { id: 3, type: 'flood', severity: 'medium', title: 'Flood Alert', message: 'Water levels rising in River Basin', location: 'River Basin', time: '2026-03-24T08:00:00', status: 'unread', waterLevel: 3.2 },
    { id: 4, type: 'earthquake', severity: 'low', title: 'Minor Tremors', message: 'Light tremors reported in Eastern Region', location: 'Eastern Region', time: '2026-03-23T18:30:00', status: 'read', magnitude: 2.8 },
    { id: 5, type: 'rainfall', severity: 'low', title: 'Light Rainfall Expected', message: '12mm rainfall expected in Western Ghats', location: 'Western Ghats', time: '2026-03-23T14:00:00', status: 'read', rainfall: 12 },
    { id: 6, type: 'flood', severity: 'high', title: 'Flood Warning', message: 'Severe flooding expected in low-lying areas', location: 'Delta Region', time: '2026-03-23T10:00:00', status: 'read', waterLevel: 4.5 },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'read' } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'earthquake': return <AlertTriangle size={20} className="text-[#FF3B5C]" />;
      case 'rainfall': return <CloudRain size={20} className="text-[#00D4FF]" />;
      case 'flood': return <Waves size={20} className="text-[#7B2FFF]" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'border-[#FF3B5C] bg-[#FF3B5C]/10';
      case 'medium': return 'border-[#FFB020] bg-[#FFB020]/10';
      default: return 'border-[#00E57A] bg-[#00E57A]/10';
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-gray-400 text-sm">Real-time alerts and notifications</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#FF3B5C]/20 px-3 py-1 rounded-full">
              <span className="text-[#FF3B5C] text-sm font-bold">{unreadCount}</span>
              <span className="text-gray-400 text-sm ml-1">Unread</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className={`bg-white/5 rounded-xl p-4 border-l-4 ${notification.severity === 'high' ? 'border-[#FF3B5C]' : notification.severity === 'medium' ? 'border-[#FFB020]' : 'border-[#00E57A]'} ${notification.status === 'unread' ? 'bg-white/10' : 'opacity-70'}`}>
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                {getTypeIcon(notification.type)}
                <div>
                  <h3 className="text-white font-medium">{notification.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {notification.location}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {new Date(notification.time).toLocaleString()}</span>
                    {notification.magnitude && <span>Magnitude: {notification.magnitude}</span>}
                    {notification.rainfall && <span>Rainfall: {notification.rainfall}mm</span>}
                    {notification.waterLevel && <span>Water Level: {notification.waterLevel}m</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {notification.status === 'unread' && (
                  <button onClick={() => markAsRead(notification.id)} className="px-2 py-1 text-xs bg-[#00D4FF]/20 text-[#00D4FF] rounded">Mark Read</button>
                )}
                <button onClick={() => deleteNotification(notification.id)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}