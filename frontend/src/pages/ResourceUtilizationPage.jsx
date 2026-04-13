import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Package, Truck, Warehouse, Calendar, Download, Filter } from 'lucide-react';

export default function ResourceUtilizationPage() {
  const [timeframe, setTimeframe] = useState('week');
  
  const utilizationData = [
    { resource: 'Tents', total: 150, used: 98, utilization: 65, trend: '+8%', location: 'Central Warehouse' },
    { resource: 'Food Packages', total: 500, used: 312, utilization: 62, trend: '+15%', location: 'North Storage' },
    { resource: 'Medical Kits', total: 75, used: 58, utilization: 77, trend: '+22%', location: 'Medical Unit' },
    { resource: 'Water Bottles', total: 1000, used: 620, utilization: 62, trend: '+10%', location: 'East Warehouse' },
    { resource: 'Blankets', total: 300, used: 175, utilization: 58, trend: '+5%', location: 'Central Warehouse' },
    { resource: 'Generators', total: 25, used: 18, utilization: 72, trend: '+3%', location: 'Power Station' },
    { resource: 'Stretchers', total: 120, used: 85, utilization: 71, trend: '+12%', location: 'Medical Unit' },
    { resource: 'Communication Radios', total: 50, used: 32, utilization: 64, trend: '+18%', location: 'Command Center' },
  ];

  const categoryUtilization = [
    { category: 'Shelter', total: 450, used: 273, utilization: 61 },
    { category: 'Supplies', total: 1500, used: 932, utilization: 62 },
    { category: 'Medical', total: 195, used: 143, utilization: 73 },
    { category: 'Equipment', total: 75, used: 50, utilization: 67 },
  ];

  const getUtilizationColor = (utilization) => {
    if (utilization >= 70) return 'text-[#FFB020]';
    if (utilization >= 50) return 'text-[#00E57A]';
    return 'text-[#00D4FF]';
  };

  const getProgressColor = (utilization) => {
    if (utilization >= 70) return 'bg-[#FFB020]';
    if (utilization >= 50) return 'bg-[#00E57A]';
    return 'bg-[#00D4FF]';
  };

  const overallUtilization = utilizationData.reduce((sum, r) => sum + r.utilization, 0) / utilizationData.length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Resource Utilization</h1>
            <p className="text-gray-400 text-sm">Track resource allocation and efficiency metrics</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTimeframe('week')} className={`px-3 py-1.5 rounded-lg text-sm ${timeframe === 'week' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}>Week</button>
            <button onClick={() => setTimeframe('month')} className={`px-3 py-1.5 rounded-lg text-sm ${timeframe === 'month' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}>Month</button>
            <button onClick={() => setTimeframe('year')} className={`px-3 py-1.5 rounded-lg text-sm ${timeframe === 'year' ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400'}`}>Year</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{overallUtilization.toFixed(1)}%</div><p className="text-gray-400 text-sm">Overall Utilization</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">8</div><p className="text-gray-400 text-sm">Resource Types</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">2,715</div><p className="text-gray-400 text-sm">Total Units</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">1,761</div><p className="text-gray-400 text-sm">Units Deployed</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 size={18} /> Resource Utilization by Category</h2>
          <div className="space-y-4">
            {categoryUtilization.map(cat => (
              <div key={cat.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">{cat.category}</span>
                  <span className={getUtilizationColor(cat.utilization)}>{cat.utilization}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getProgressColor(cat.utilization)}`} style={{ width: `${cat.utilization}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{cat.used} / {cat.total} units used</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp size={18} /> Efficiency Metrics</h2>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-400">Response Efficiency</span><span className="text-white">94%</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Distribution Speed</span><span className="text-white">2.4 min/unit</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Waste Reduction</span><span className="text-[#00E57A]">+12%</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Cost Efficiency</span><span className="text-white">87%</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Package size={18} /> Detailed Resource Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10"><th className="text-left py-3 text-gray-400">Resource</th><th className="text-left py-3 text-gray-400">Total</th><th className="text-left py-3 text-gray-400">Deployed</th><th className="text-left py-3 text-gray-400">Available</th><th className="text-left py-3 text-gray-400">Utilization</th><th className="text-left py-3 text-gray-400">Trend</th><th className="text-left py-3 text-gray-400">Location</th></tr></thead>
            <tbody>
              {utilizationData.map(item => (
                <tr key={item.resource} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 text-white">{item.resource}</td>
                  <td className="py-3 text-white">{item.total}</td>
                  <td className="py-3 text-white">{item.used}</td>
                  <td className="py-3 text-green-400">{item.total - item.used}</td>
                  <td className="py-3"><span className={getUtilizationColor(item.utilization)}>{item.utilization}%</span></td>
                  <td className="py-3 text-[#00E57A]">{item.trend}</td>
                  <td className="py-3 text-gray-400">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}