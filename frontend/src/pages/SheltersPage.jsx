import React, { useState } from 'react';
import { Home, Users, MapPin, Battery, Wifi, Droplets, Thermometer, Plus } from 'lucide-react';

export default function SheltersPage() {
  const [shelters] = useState([
    { id: 1, name: 'Central Shelter', capacity: 200, current: 45, location: 'Downtown', status: 'open', amenities: ['Electricity', 'Water', 'Medical', 'Food'], contact: '+91 98765 43210', manager: 'John Doe' },
    { id: 2, name: 'North Shelter', capacity: 150, current: 32, location: 'North District', status: 'open', amenities: ['Electricity', 'Water', 'Blankets'], contact: '+91 98765 43211', manager: 'Jane Smith' },
    { id: 3, name: 'East Shelter', capacity: 100, current: 28, location: 'East District', status: 'near_capacity', amenities: ['Electricity', 'Water', 'Food'], contact: '+91 98765 43212', manager: 'Mike Johnson' },
    { id: 4, name: 'West Shelter', capacity: 120, current: 45, location: 'West District', status: 'open', amenities: ['Electricity', 'Water', 'Medical'], contact: '+91 98765 43213', manager: 'Sarah Williams' },
    { id: 5, name: 'South Shelter', capacity: 180, current: 98, location: 'South District', status: 'near_capacity', amenities: ['Electricity', 'Water', 'Food', 'Blankets'], contact: '+91 98765 43214', manager: 'David Brown' },
  ]);

  const totalCapacity = shelters.reduce((sum, s) => sum + s.capacity, 0);
  const totalOccupancy = shelters.reduce((sum, s) => sum + s.current, 0);
  const availableSpots = totalCapacity - totalOccupancy;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Shelter Management</h1>
        <p className="text-gray-400 text-sm">Manage emergency shelters and capacity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{shelters.length}</div><p className="text-gray-400 text-sm">Active Shelters</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{totalCapacity}</div><p className="text-gray-400 text-sm">Total Capacity</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{totalOccupancy}</div><p className="text-gray-400 text-sm">Current Occupancy</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{availableSpots}</div><p className="text-gray-400 text-sm">Available Spots</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shelters.map(shelter => (
          <div key={shelter.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Home size={20} className="text-[#7B2FFF]" /><h3 className="text-white font-medium">{shelter.name}</h3></div>
              <span className={`text-xs px-2 py-1 rounded-full ${shelter.status === 'open' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{shelter.status === 'open' ? 'Open' : 'Near Capacity'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><Users size={12} className="text-gray-500" /><span className="text-gray-400">Capacity:</span><span className="text-white">{shelter.capacity}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-500" /><span className="text-gray-400">Location:</span><span className="text-white">{shelter.location}</span></div>
              <div className="flex items-center gap-2"><Users size={12} className="text-gray-500" /><span className="text-gray-400">Occupancy:</span><span className="text-white">{shelter.current}</span></div>
              <div className="flex items-center gap-2"><Users size={12} className="text-gray-500" /><span className="text-gray-400">Available:</span><span className="text-green-400">{shelter.capacity - shelter.current}</span></div>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#7B2FFF] rounded-full" style={{ width: `${(shelter.current / shelter.capacity) * 100}%` }} /></div>
            <div className="mt-3 flex gap-1 flex-wrap">{shelter.amenities.map(amenity => (<span key={amenity} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400 flex items-center gap-1">{amenity === 'Electricity' ? <Battery size={10} /> : amenity === 'Water' ? <Droplets size={10} /> : amenity === 'Medical' ? <Plus size={10} /> : null}{amenity}</span>))}</div>
            <div className="mt-2 text-xs text-gray-500">Manager: {shelter.manager} • Contact: {shelter.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}