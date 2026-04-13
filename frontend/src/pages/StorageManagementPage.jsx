// frontend/src/pages/StorageManagementPage.jsx
import React, { useState } from 'react';
import { Warehouse, MapPin, Package, Truck, Home, Users, Plus, Edit, Trash2 } from 'lucide-react';

export default function StorageManagementPage() {
  const [storage] = useState([
    { id: 1, name: 'Central Warehouse', capacity: 5000, current: 3240, location: 'Downtown', type: 'Main', manager: 'John Doe', status: 'operational', items: ['Tents', 'Food', 'Water', 'Blankets'] },
    { id: 2, name: 'North Storage', capacity: 3000, current: 1850, location: 'North District', type: 'Regional', manager: 'Jane Smith', status: 'operational', items: ['Food', 'Water', 'Medical'] },
    { id: 3, name: 'East Warehouse', capacity: 2500, current: 2100, location: 'East District', type: 'Regional', manager: 'Mike Johnson', status: 'near-capacity', items: ['Tents', 'Blankets', 'Clothing'] },
    { id: 4, name: 'Medical Unit Storage', capacity: 1000, current: 780, location: 'Medical Complex', type: 'Specialized', manager: 'Dr. Sarah', status: 'operational', items: ['Medical Kits', 'Equipment', 'Medicines'] },
    { id: 5, name: 'Mobile Storage Unit', capacity: 500, current: 320, location: 'Mobile', type: 'Mobile', manager: 'Lisa Rodriguez', status: 'operational', items: ['Emergency Supplies'] },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Storage Management</h1><p className="text-gray-400 text-sm">Manage warehouse and storage facilities</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Storage</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storage.map(facility => (
          <div key={facility.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Warehouse size={20} className="text-[#00D4FF]" /><h3 className="text-white font-medium">{facility.name}</h3><span className={`text-xs px-2 py-0.5 rounded-full ${facility.status === 'operational' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{facility.status}</span></div>
              <div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{facility.location}</span></div>
              <div className="flex items-center gap-2"><Package size={12} /><span className="text-gray-400">Type:</span><span className="text-white">{facility.type}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Manager:</span><span className="text-white">{facility.manager}</span></div>
            </div>
            <div><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Capacity Usage</span><span>{Math.round((facility.current / facility.capacity) * 100)}%</span></div><div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(facility.current / facility.capacity) * 100}%` }} /></div><p className="text-xs text-gray-500 mt-1">{facility.current} / {facility.capacity} units used</p></div>
            <div className="mt-2 flex gap-1 flex-wrap">{facility.items.map(item => (<span key={item} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{item}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}