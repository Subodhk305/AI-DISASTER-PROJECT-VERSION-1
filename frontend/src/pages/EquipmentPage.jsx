import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, Truck, Warehouse, MapPin } from 'lucide-react';

export default function EquipmentPage() {
  const [equipment] = useState([
    { id: 1, name: 'Emergency Tents', quantity: 150, allocated: 45, threshold: 50, location: 'Central Warehouse', status: 'available', category: 'Shelter', lastUpdated: '2026-03-24' },
    { id: 2, name: 'Food Packages', quantity: 500, allocated: 120, threshold: 200, location: 'North Storage', status: 'available', category: 'Supplies', lastUpdated: '2026-03-24' },
    { id: 3, name: 'Medical Kits', quantity: 75, allocated: 30, threshold: 30, location: 'Medical Unit', status: 'low', category: 'Medical', lastUpdated: '2026-03-23' },
    { id: 4, name: 'Water Bottles', quantity: 1000, allocated: 250, threshold: 300, location: 'East Warehouse', status: 'available', category: 'Supplies', lastUpdated: '2026-03-24' },
    { id: 5, name: 'Blankets', quantity: 300, allocated: 80, threshold: 100, location: 'Central Warehouse', status: 'available', category: 'Shelter', lastUpdated: '2026-03-24' },
    { id: 6, name: 'Portable Generators', quantity: 25, allocated: 8, threshold: 10, location: 'Power Station', status: 'low', category: 'Equipment', lastUpdated: '2026-03-22' },
  ]);

  const categories = ['All', 'Shelter', 'Supplies', 'Medical', 'Equipment'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEquipment = selectedCategory === 'All' ? equipment : equipment.filter(e => e.category === selectedCategory);
  const totalItems = equipment.reduce((sum, e) => sum + e.quantity, 0);
  const lowStockItems = equipment.filter(e => e.status === 'low').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Equipment Inventory</h1>
        <p className="text-gray-400 text-sm">Manage emergency equipment and supplies inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{equipment.length}</div><p className="text-gray-400 text-sm">Item Types</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{totalItems}</div><p className="text-gray-400 text-sm">Total Units</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FF3B5C]">{lowStockItems}</div><p className="text-gray-400 text-sm">Low Stock Items</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{equipment.filter(e => e.status === 'available').length}</div><p className="text-gray-400 text-sm">Available Items</p></div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedCategory === cat ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{cat}</button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-white/10"><th className="text-left py-3 text-gray-400">Item</th><th className="text-left py-3 text-gray-400">Category</th><th className="text-left py-3 text-gray-400">Quantity</th><th className="text-left py-3 text-gray-400">Allocated</th><th className="text-left py-3 text-gray-400">Available</th><th className="text-left py-3 text-gray-400">Location</th><th className="text-left py-3 text-gray-400">Status</th></tr></thead>
          <tbody>
            {filteredEquipment.map(item => (
              <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 text-white">{item.name}</td><td className="py-3 text-gray-400">{item.category}</td>
                <td className="py-3 text-white">{item.quantity}</td><td className="py-3 text-white">{item.allocated}</td>
                <td className="py-3 text-green-400">{item.quantity - item.allocated}</td>
                <td className="py-3 text-gray-400 flex items-center gap-1"><MapPin size={12} />{item.location}</td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${item.status === 'available' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FF3B5C] bg-[#FF3B5C]/10'}`}>{item.status === 'available' ? 'Available' : 'Low Stock'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}