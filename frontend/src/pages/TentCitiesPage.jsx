// frontend/src/pages/TentCitiesPage.jsx
import React, { useState } from 'react';
import { Home, Users, MapPin, Tent, Droplets, Activity, Plus, Edit, Trash2 } from 'lucide-react';


export default function TentCitiesPage() {
  const [tentCities] = useState([
    { id: 1, name: 'North Tent City', capacity: 500, current: 320, location: 'North District', status: 'operational', facilities: ['Water Point', 'Sanitation', 'Medical Tent', 'Food Distribution'], manager: 'John Doe' },
    { id: 2, name: 'East Relief Camp', capacity: 400, current: 280, location: 'East District', status: 'operational', facilities: ['Water Point', 'Sanitation', 'Food Distribution'], manager: 'Jane Smith' },
    { id: 3, name: 'West Emergency Village', capacity: 600, current: 450, location: 'West District', status: 'near-capacity', facilities: ['Water Point', 'Sanitation', 'Medical Tent', 'Food Distribution', 'School Tent'], manager: 'Mike Johnson' },
    { id: 4, name: 'South Displacement Camp', capacity: 350, current: 210, location: 'South District', status: 'operational', facilities: ['Water Point', 'Sanitation', 'Medical Tent'], manager: 'Sarah Williams' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Tent Cities</h1><p className="text-gray-400 text-sm">Emergency tent city management</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Camp</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tentCities.map(camp => (
          <div key={camp.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Tent size={20} className="text-[#00D4FF]" /><h3 className="text-white font-medium">{camp.name}</h3><span className={`text-xs px-2 py-0.5 rounded-full ${camp.status === 'operational' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{camp.status}</span></div>
              <div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Capacity:</span><span className="text-white">{camp.capacity}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Current:</span><span className="text-white">{camp.current}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{camp.location}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Manager:</span><span className="text-white">{camp.manager}</span></div>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(camp.current / camp.capacity) * 100}%` }} /></div>
            <div className="mt-2 flex gap-1 flex-wrap">{camp.facilities.map(facility => (<span key={facility} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400 flex items-center gap-1">{facility === 'Water Point' ? <Droplets size={10} /> : facility === 'Medical Tent' ? <Activity size={10} /> : null}{facility}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}