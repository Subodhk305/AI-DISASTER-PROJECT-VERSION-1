import React, { useState } from 'react';
import { Warehouse, Package, MapPin, Users, Calendar, Truck, Plus, Edit, Trash2 } from 'lucide-react';

export default function WarehouseManagementPage() {
  const [warehouses] = useState([
    { id: 1, name: 'Central Distribution Center', capacity: 10000, utilization: 68, location: 'Downtown', manager: 'John Doe', staff: 12, lastAudit: '2026-03-15', status: 'active' },
    { id: 2, name: 'North Regional Hub', capacity: 6000, utilization: 45, location: 'North District', manager: 'Jane Smith', staff: 8, lastAudit: '2026-03-10', status: 'active' },
    { id: 3, name: 'East Logistics Center', capacity: 4000, utilization: 82, location: 'East District', manager: 'Mike Johnson', staff: 6, lastAudit: '2026-03-05', status: 'active' },
    { id: 4, name: 'Medical Supplies Warehouse', capacity: 2000, utilization: 39, location: 'Medical Complex', manager: 'Dr. Sarah', staff: 5, lastAudit: '2026-03-12', status: 'active' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Warehouse Management</h1><p className="text-gray-400 text-sm">Manage warehouse operations and logistics</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Warehouse</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warehouses.map(warehouse => (
          <div key={warehouse.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><Warehouse size={20} className="text-[#00D4FF]" /><h3 className="text-white font-medium">{warehouse.name}</h3><span className="text-xs text-[#00E57A] bg-[#00E57A]/10 px-2 py-0.5 rounded-full">{warehouse.status}</span></div>
              <div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{warehouse.location}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Manager:</span><span className="text-white">{warehouse.manager}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Staff:</span><span className="text-white">{warehouse.staff}</span></div>
              <div className="flex items-center gap-2"><Calendar size={12} /><span className="text-gray-400">Last Audit:</span><span className="text-white">{warehouse.lastAudit}</span></div>
            </div>
            <div><div className="flex justify-between text-xs text-gray-500 mb-1"><span>Capacity Utilization</span><span>{warehouse.utilization}%</span></div><div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${warehouse.utilization}%` }} /></div><p className="text-xs text-gray-500 mt-1">{warehouse.utilization}% of {warehouse.capacity.toLocaleString()} sq ft used</p></div>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10"><span className="text-xs text-gray-500 flex items-center gap-1"><Truck size={10} /> Daily shipments: 12-15</span><span className="text-xs text-gray-500">Efficiency: 94%</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}