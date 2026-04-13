import React, { useState } from 'react';
import WorldMap from '../components/Map/WorldMap';

export default function DisasterMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeLayers, setActiveLayers] = useState(['earthquake', 'rainfall', 'flood']);

  const toggleLayer = (layer) => {
    setActiveLayers(prev => prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]);
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Disaster Map</h1>
        <p className="text-gray-400 text-sm">Interactive map showing disaster-prone areas, real-time alerts, and risk zones</p>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex gap-2">
          <button onClick={() => toggleLayer('earthquake')} className={`px-3 py-1 rounded-lg text-sm ${activeLayers.includes('earthquake') ? 'bg-[#FF3B5C] text-white' : 'bg-white/10 text-gray-400'}`}>Earthquake</button>
          <button onClick={() => toggleLayer('rainfall')} className={`px-3 py-1 rounded-lg text-sm ${activeLayers.includes('rainfall') ? 'bg-[#00D4FF] text-white' : 'bg-white/10 text-gray-400'}`}>Rainfall</button>
          <button onClick={() => toggleLayer('flood')} className={`px-3 py-1 rounded-lg text-sm ${activeLayers.includes('flood') ? 'bg-[#7B2FFF] text-white' : 'bg-white/10 text-gray-400'}`}>Flood</button>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl overflow-hidden h-[calc(100vh-180px)]">
        <WorldMap onLocationSelect={setSelectedLocation} selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}