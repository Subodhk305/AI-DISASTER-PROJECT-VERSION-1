import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Users, Home, Building } from 'lucide-react';

export default function ZonePlanningPage() {
  const [zones] = useState([
    { id: 1, name: 'North Zone', risk: 'high', population: 45000, shelters: 3, evacuationPoints: 5, hospitals: 2, schools: 8, status: 'active' },
    { id: 2, name: 'South Zone', risk: 'medium', population: 52000, shelters: 4, evacuationPoints: 6, hospitals: 3, schools: 10, status: 'active' },
    { id: 3, name: 'East Zone', risk: 'low', population: 38000, shelters: 2, evacuationPoints: 4, hospitals: 1, schools: 6, status: 'active' },
    { id: 4, name: 'West Zone', risk: 'medium', population: 41000, shelters: 3, evacuationPoints: 5, hospitals: 2, schools: 7, status: 'active' },
    { id: 5, name: 'Central Zone', risk: 'high', population: 68000, shelters: 5, evacuationPoints: 8, hospitals: 4, schools: 12, status: 'active' },
  ]);

  const getRiskColor = (risk) => {
    if (risk === 'high') return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
    if (risk === 'medium') return 'text-[#FFB020] bg-[#FFB020]/10';
    return 'text-[#00E57A] bg-[#00E57A]/10';
  };

  const totalPopulation = zones.reduce((sum, z) => sum + z.population, 0);
  const totalShelters = zones.reduce((sum, z) => sum + z.shelters, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Zone Planning</h1>
        <p className="text-gray-400 text-sm">Disaster risk zones and resource allocation planning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-white">{zones.length}</div><p className="text-gray-400 text-sm">Total Zones</p></div>
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-white">{totalPopulation.toLocaleString()}</div><p className="text-gray-400 text-sm">Total Population</p></div>
        <div className="bg-white/5 rounded-xl p-4"><div className="text-2xl font-bold text-white">{totalShelters}</div><p className="text-gray-400 text-sm">Total Shelters</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map(zone => (
          <div key={zone.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#00D4FF]" />
                <h3 className="text-white font-medium">{zone.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(zone.risk)}`}>{zone.risk.toUpperCase()} RISK</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div><span className="text-gray-400">Population:</span> <span className="text-white">{zone.population.toLocaleString()}</span></div>
              <div><span className="text-gray-400">Shelters:</span> <span className="text-white">{zone.shelters}</span></div>
              <div><span className="text-gray-400">Evac Points:</span> <span className="text-white">{zone.evacuationPoints}</span></div>
              <div><span className="text-gray-400">Hospitals:</span> <span className="text-white">{zone.hospitals}</span></div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1"><Building size={10} /> {zone.schools} Schools</span>
              <span className="flex items-center gap-1"><CheckCircle size={10} /> Status: {zone.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}