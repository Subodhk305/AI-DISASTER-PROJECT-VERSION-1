import React, { useState } from 'react';
import { Building, Users, MapPin, Phone, Clock, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

export default function EvacuationCentersPage() {
  const [centers] = useState([
    { id: 1, name: 'City Hall Evacuation Center', capacity: 300, current: 180, location: 'Downtown', contact: '+91 98765 43210', status: 'open', operatingHours: '24/7', manager: 'John Doe' },
    { id: 2, name: 'North Community Center', capacity: 200, current: 120, location: 'North District', contact: '+91 98765 43211', status: 'open', operatingHours: '6am-10pm', manager: 'Jane Smith' },
    { id: 3, name: 'East School Gymnasium', capacity: 250, current: 200, location: 'East District', contact: '+91 98765 43212', status: 'near-capacity', operatingHours: '24/7', manager: 'Mike Johnson' },
    { id: 4, name: 'West Sports Complex', capacity: 400, current: 280, location: 'West District', contact: '+91 98765 43213', status: 'open', operatingHours: '24/7', manager: 'Sarah Williams' },
    { id: 5, name: 'South Convention Hall', capacity: 350, current: 150, location: 'South District', contact: '+91 98765 43214', status: 'open', operatingHours: '8am-8pm', manager: 'David Brown' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Evacuation Centers</h1><p className="text-gray-400 text-sm">Official evacuation centers and shelters</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Center</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centers.map(center => (
          <div key={center.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Building size={20} className="text-[#00D4FF]" /><h3 className="text-white font-medium">{center.name}</h3><span className={`text-xs px-2 py-0.5 rounded-full ${center.status === 'open' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{center.status}</span></div>
              <div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Capacity:</span><span className="text-white">{center.capacity}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Current:</span><span className="text-white">{center.current}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{center.location}</span></div>
              <div className="flex items-center gap-2"><Phone size={12} /><span className="text-gray-400">Contact:</span><span className="text-white">{center.contact}</span></div>
              <div className="flex items-center gap-2"><Clock size={12} /><span className="text-gray-400">Hours:</span><span className="text-white">{center.operatingHours}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Manager:</span><span className="text-white">{center.manager}</span></div>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(center.current / center.capacity) * 100}%` }} /></div>
            <p className="text-xs text-gray-500 mt-2">{center.capacity - center.current} spots available</p>
          </div>
        ))}
      </div>
    </div>
  );
}