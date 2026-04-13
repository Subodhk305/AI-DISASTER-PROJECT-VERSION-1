import React, { useState } from 'react';
import { Home, Users, MapPin, Thermometer, Battery, Wifi, Droplets, Plus, Edit, Trash2 } from 'lucide-react';

export default function ContainerSheltersPage() {
  const [shelters] = useState([
    { id: 1, name: 'Container Shelter Alpha', capacity: 50, current: 32, location: 'North Zone', status: 'operational', amenities: ['Heating', 'Lighting', 'Water'], manager: 'John Doe' },
    { id: 2, name: 'Container Shelter Beta', capacity: 40, current: 28, location: 'East Zone', status: 'operational', amenities: ['Lighting', 'Water'], manager: 'Jane Smith' },
    { id: 3, name: 'Container Shelter Gamma', capacity: 60, current: 45, location: 'West Zone', status: 'near-capacity', amenities: ['Heating', 'Lighting', 'Water', 'Power'], manager: 'Mike Johnson' },
    { id: 4, name: 'Container Shelter Delta', capacity: 35, current: 18, location: 'South Zone', status: 'operational', amenities: ['Lighting', 'Water', 'Ventilation'], manager: 'Sarah Williams' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Container Shelters</h1><p className="text-gray-400 text-sm">Modular container shelter management</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Shelter</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelters.map(shelter => (
          <div key={shelter.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Home size={20} className="text-[#00D4FF]" /><h3 className="text-white font-medium">{shelter.name}</h3><span className={`text-xs px-2 py-0.5 rounded-full ${shelter.status === 'operational' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{shelter.status}</span></div>
              <div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Capacity:</span><span className="text-white">{shelter.capacity}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Current:</span><span className="text-white">{shelter.current}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{shelter.location}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Manager:</span><span className="text-white">{shelter.manager}</span></div>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(shelter.current / shelter.capacity) * 100}%` }} /></div>
            <div className="mt-2 flex gap-1 flex-wrap">{shelter.amenities.map(amenity => (<span key={amenity} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400 flex items-center gap-1">{amenity === 'Heating' ? <Thermometer size={10} /> : amenity === 'Lighting' ? <Battery size={10} /> : amenity === 'Water' ? <Droplets size={10} /> : amenity === 'Power' ? <Battery size={10} /> : null}{amenity}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}