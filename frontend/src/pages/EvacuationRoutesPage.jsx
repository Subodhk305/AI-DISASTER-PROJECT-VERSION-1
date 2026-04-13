import React, { useState } from 'react';
import { Navigation, MapPin, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

export default function EvacuationRoutesPage() {
  const [routes] = useState([
    { id: 1, name: 'Northern Corridor', status: 'open', capacity: 5000, currentLoad: 1200, distance: 25, estimatedTime: 45, startPoint: 'North District', endPoint: 'Central Shelter', alternateRoutes: 2 },
    { id: 2, name: 'Eastern Bypass', status: 'congested', capacity: 3000, currentLoad: 2800, distance: 18, estimatedTime: 60, startPoint: 'East District', endPoint: 'East Shelter', alternateRoutes: 1 },
    { id: 3, name: 'Western Highway', status: 'closed', capacity: 4000, currentLoad: 0, distance: 32, estimatedTime: 0, startPoint: 'West District', endPoint: 'West Shelter', alternateRoutes: 1 },
    { id: 4, name: 'Southern Expressway', status: 'open', capacity: 6000, currentLoad: 3400, distance: 28, estimatedTime: 40, startPoint: 'South District', endPoint: 'South Shelter', alternateRoutes: 2 },
    { id: 5, name: 'Central Ring Road', status: 'open', capacity: 8000, currentLoad: 2100, distance: 15, estimatedTime: 25, startPoint: 'City Center', endPoint: 'Central Shelter', alternateRoutes: 3 },
  ]);

  const getStatusColor = (status) => {
    if (status === 'open') return 'text-[#00E57A] bg-[#00E57A]/10';
    if (status === 'congested') return 'text-[#FFB020] bg-[#FFB020]/10';
    return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
  };

  const getStatusIcon = (status) => {
    if (status === 'open') return <CheckCircle size={14} />;
    if (status === 'congested') return <Clock size={14} />;
    return <AlertTriangle size={14} />;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Evacuation Routes</h1>
        <p className="text-gray-400 text-sm">Real-time evacuation route status and capacity information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-white">{routes.filter(r => r.status === 'open').length}</div><p className="text-gray-400 text-sm">Open Routes</p></div>
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-[#FFB020]">{routes.filter(r => r.status === 'congested').length}</div><p className="text-gray-400 text-sm">Congested Routes</p></div>
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-[#FF3B5C]">{routes.filter(r => r.status === 'closed').length}</div><p className="text-gray-400 text-sm">Closed Routes</p></div>
      </div>

      <div className="space-y-3">
        {routes.map(route => (
          <div key={route.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Navigation size={20} className="text-[#00D4FF]" />
                <h3 className="text-white font-medium">{route.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(route.status)}`}>{getStatusIcon(route.status)} {route.status.toUpperCase()}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">From:</span><span className="text-white">{route.startPoint}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">To:</span><span className="text-white">{route.endPoint}</span></div>
              <div className="flex items-center gap-2"><Navigation size={12} /><span className="text-gray-400">Distance:</span><span className="text-white">{route.distance} km</span></div>
              <div className="flex items-center gap-2"><Clock size={12} /><span className="text-gray-400">Est. Time:</span><span className="text-white">{route.estimatedTime} min</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Capacity Usage</span><span>{Math.round((route.currentLoad / route.capacity) * 100)}%</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(route.currentLoad / route.capacity) * 100}%` }} /></div>
              <p className="text-xs text-gray-500 mt-1">{route.currentLoad} / {route.capacity} people • {route.alternateRoutes} alternate routes available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}