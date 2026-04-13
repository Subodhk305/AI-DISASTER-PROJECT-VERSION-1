import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Plus, Edit, Trash2 } from 'lucide-react';

export default function InventoryManagementPage() {
  const [inventory] = useState([
    { id: 1, name: 'Food Supplies', current: 500, min: 200, max: 1000, reorderPoint: 250, status: 'good', trend: 'stable', unit: 'packages' },
    { id: 2, name: 'Water Bottles', current: 1000, min: 300, max: 2000, reorderPoint: 400, status: 'good', trend: 'decreasing', unit: 'bottles' },
    { id: 3, name: 'Medical Kits', current: 75, min: 50, max: 150, reorderPoint: 60, status: 'warning', trend: 'decreasing', unit: 'kits' },
    { id: 4, name: 'Tents', current: 150, min: 80, max: 300, reorderPoint: 100, status: 'good', trend: 'stable', unit: 'units' },
    { id: 5, name: 'Blankets', current: 300, min: 150, max: 500, reorderPoint: 180, status: 'good', trend: 'increasing', unit: 'pieces' },
    { id: 6, name: 'Generators', current: 25, min: 15, max: 40, reorderPoint: 20, status: 'warning', trend: 'decreasing', unit: 'units' },
  ]);

  const getStatusColor = (status) => {
    if (status === 'good') return 'text-[#00E57A] bg-[#00E57A]/10';
    if (status === 'warning') return 'text-[#FFB020] bg-[#FFB020]/10';
    return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'increasing') return <TrendingUp size={12} className="text-[#00E57A]" />;
    if (trend === 'decreasing') return <TrendingDown size={12} className="text-[#FF3B5C]" />;
    return null;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-white">Inventory Management</h1><p className="text-gray-400 text-sm">Track and manage inventory levels</p></div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Add Item</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-white/10"><th className="text-left py-3 text-gray-400">Item</th><th className="text-left py-3 text-gray-400">Current Stock</th><th className="text-left py-3 text-gray-400">Min Level</th><th className="text-left py-3 text-gray-400">Max Level</th><th className="text-left py-3 text-gray-400">Reorder Point</th><th className="text-left py-3 text-gray-400">Status</th><th className="text-left py-3 text-gray-400">Trend</th><th className="text-left py-3 text-gray-400">Actions</th></tr></thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 text-white">{item.name}</td>
                <td className="py-3 text-white">{item.current} {item.unit}</td>
                <td className="py-3 text-gray-400">{item.min} {item.unit}</td>
                <td className="py-3 text-gray-400">{item.max} {item.unit}</td>
                <td className="py-3 text-gray-400">{item.reorderPoint} {item.unit}</td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>{item.status.toUpperCase()}</span></td>
                <td className="py-3 flex items-center gap-1">{getTrendIcon(item.trend)}<span className="text-gray-400">{item.trend}</span></td>
                <td className="py-3"><div className="flex gap-2"><button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button><button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}