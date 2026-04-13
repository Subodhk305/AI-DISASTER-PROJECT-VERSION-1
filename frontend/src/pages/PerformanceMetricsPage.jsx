import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Target, Award, Activity, AlertCircle, CheckCircle, Users, Zap } from 'lucide-react';

export default function PerformanceMetricsPage() {
  const [metrics] = useState([
    { name: 'Response Time', value: 4.2, target: 5.0, unit: 'minutes', trend: '+0.8', status: 'good', description: 'Average time from alert to first responder arrival' },
    { name: 'Incident Resolution', value: 87, target: 85, unit: '%', trend: '+2', status: 'good', description: 'Percentage of incidents resolved within target time' },
    { name: 'Resource Efficiency', value: 92, target: 90, unit: '%', trend: '+3', status: 'good', description: 'Resource allocation efficiency rating' },
    { name: 'Volunteer Utilization', value: 78, target: 80, unit: '%', trend: '-2', status: 'warning', description: 'Volunteer deployment effectiveness' },
    { name: 'Communication Reliability', value: 99.2, target: 99, unit: '%', trend: '+0.5', status: 'good', description: 'System uptime and communication success rate' },
    { name: 'Evacuation Success', value: 94, target: 90, unit: '%', trend: '+4', status: 'good', description: 'Successful evacuation rate during emergencies' },
  ]);

  const weeklyData = [
    { day: 'Mon', responseTime: 4.5, incidents: 8 },
    { day: 'Tue', responseTime: 4.2, incidents: 6 },
    { day: 'Wed', responseTime: 3.8, incidents: 5 },
    { day: 'Thu', responseTime: 4.0, incidents: 7 },
    { day: 'Fri', responseTime: 4.3, incidents: 9 },
    { day: 'Sat', responseTime: 4.1, incidents: 4 },
    { day: 'Sun', responseTime: 3.9, incidents: 3 },
  ];

  const getStatusColor = (status) => {
    if (status === 'good') return 'text-[#00E57A] bg-[#00E57A]/10';
    return 'text-[#FFB020] bg-[#FFB020]/10';
  };

  const getTrendIcon = (trend) => {
    if (trend.startsWith('+')) return <TrendingUp size={14} className="text-[#00E57A]" />;
    return <TrendingDown size={14} className="text-[#FF3B5C]" />;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Performance Metrics</h1>
        <p className="text-gray-400 text-sm">Key performance indicators and system efficiency metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">4.2 min</div><p className="text-gray-400 text-sm">Avg Response Time</p><span className="text-xs text-[#00E57A]">↓ 0.3 from last week</span></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">94.7%</div><p className="text-gray-400 text-sm">Prediction Accuracy</p><span className="text-xs text-[#00E57A]">↑ 2.1%</span></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">1,247</div><p className="text-gray-400 text-sm">Lives Saved</p><span className="text-xs text-[#00E57A]">+156 this month</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Clock size={18} /> Response Time Trend</h2>
          <div className="space-y-2">
            {weeklyData.map(day => (
              <div key={day.day}>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">{day.day}</span><span className="text-white">{day.responseTime} min</span></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(day.responseTime / 6) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Activity size={18} /> Incident Volume</h2>
          <div className="space-y-2">
            {weeklyData.map(day => (
              <div key={day.day}>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">{day.day}</span><span className="text-white">{day.incidents} incidents</span></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#7B2FFF] rounded-full" style={{ width: `${(day.incidents / 10) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map(metric => (
          <div key={metric.name} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {metric.name === 'Response Time' && <Clock size={18} className="text-[#00D4FF]" />}
                {metric.name === 'Incident Resolution' && <Target size={18} className="text-[#00E57A]" />}
                {metric.name === 'Resource Efficiency' && <Zap size={18} className="text-[#FFB020]" />}
                {metric.name === 'Volunteer Utilization' && <Users size={18} className="text-[#7B2FFF]" />}
                <h3 className="text-white font-medium">{metric.name}</h3>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(metric.status)}`}>{metric.status.toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-2xl font-bold text-white">{metric.value}{metric.unit}</p>
                <p className="text-xs text-gray-500">Target: {metric.target}{metric.unit}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className={metric.trend.startsWith('+') ? 'text-[#00E57A]' : 'text-[#FF3B5C]'}>{metric.trend}{metric.unit === '%' ? '%' : ''}</span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(metric.value / metric.target) * 100}%`, background: metric.status === 'good' ? '#00E57A' : '#FFB020' }} /></div>
            <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}