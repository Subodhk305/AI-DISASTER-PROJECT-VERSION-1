import React, { useState } from 'react';
import { Users, Home, Building, Tent, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export default function CapacityManagementPage() {
  const [capacities] = useState([
    { type: 'Container Shelters', total: 185, occupied: 123, available: 62, utilization: 66, trend: '+12' },
    { type: 'Tent Cities', total: 1850, occupied: 1260, available: 590, utilization: 68, trend: '+45' },
    { type: 'Evacuation Centers', total: 1500, occupied: 930, available: 570, utilization: 62, trend: '+28' },
  ]);

  const totalCapacity = capacities.reduce((sum, c) => sum + c.total, 0);
  const totalOccupied = capacities.reduce((sum, c) => sum + c.occupied, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Capacity Management</h1>
        <p className="text-gray-400 text-sm">Track shelter and evacuation center occupancy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{totalCapacity.toLocaleString()}</div><p className="text-gray-400 text-sm">Total Capacity</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{totalOccupied.toLocaleString()}</div><p className="text-gray-400 text-sm">Currently Occupied</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{(totalCapacity - totalOccupied).toLocaleString()}</div><p className="text-gray-400 text-sm">Available Spots</p></div>
      </div>

      <div className="space-y-4">
        {capacities.map(cap => (
          <div key={cap.type} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {cap.type === 'Container Shelters' && <Home size={20} className="text-[#00D4FF]" />}
                {cap.type === 'Tent Cities' && <Tent size={20} className="text-[#00D4FF]" />}
                {cap.type === 'Evacuation Centers' && <Building size={20} className="text-[#00D4FF]" />}
                <h3 className="text-white font-medium">{cap.type}</h3>
              </div>
              <span className="text-xs text-[#00E57A] flex items-center gap-1"><TrendingUp size={10} /> {cap.trend} this week</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-3">
              <div><p className="text-gray-500 text-xs">Total</p><p className="text-white text-lg">{cap.total}</p></div>
              <div><p className="text-gray-500 text-xs">Occupied</p><p className="text-white text-lg">{cap.occupied}</p></div>
              <div><p className="text-gray-500 text-xs">Available</p><p className="text-[#00E57A] text-lg">{cap.available}</p></div>
            </div>
            <div><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Utilization</span><span>{cap.utilization}%</span></div><div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${cap.utilization}%` }} /></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}