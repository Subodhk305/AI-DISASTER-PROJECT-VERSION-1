import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, CloudRain, Waves, MapPin, AlertTriangle, 
  Bell, Users, Package, Shield, Calendar, Clock,
  Thermometer, Wind, Droplets, TrendingUp, TrendingDown
} from 'lucide-react';
import WorldMap from '../components/Map/WorldMap';
import { getPredictions } from '../services/api';

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8001/api/predictions/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: location.lat, lng: location.lng, location: location.name })
      });
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Active Alerts', value: '3', change: '+2', color: '#FF3B5C', icon: Bell },
    { label: 'Active Volunteers', value: '156', change: '+12', color: '#00E57A', icon: Users },
    { label: 'Response Teams', value: '24', change: '+3', color: '#00D4FF', icon: Shield },
    { label: 'Resources Deployed', value: '847', change: '+45', color: '#FFB020', icon: Package }
  ];

  const recentAlerts = [
    { id: 1, severity: 'medium', message: 'Minor tremors detected', location: 'Northern Region', time: '5 mins ago' },
    { id: 2, severity: 'high', message: 'Heavy rainfall warning', location: 'Coastal Area', time: '12 mins ago' },
    { id: 3, severity: 'medium', message: 'Water levels rising', location: 'River Basin', time: '23 mins ago' }
  ];

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    pressure: 1012
  };

  const predictionsData = {
    earthquake: predictions?.earthquake || { risk_probability: 0.05, risk_level: 'Low', magnitude_class: 'minor', confidence: 0.85 },
    rainfall: predictions?.rainfall || { rainfall_mm: 12.5, risk_probability: 45, risk_level: 'Medium', confidence: 0.78 },
    flood: predictions?.flood || { risk_probability: 0.08, risk_level: 'Low', severity: 'Low', confidence: 0.82 }
  };

  const IconComponent = ({ name, size, color }) => {
    const icons = {
      Bell: <Bell size={size} style={{ color }} />,
      Users: <Users size={size} style={{ color }} />,
      Shield: <Shield size={size} style={{ color }} />,
      Package: <Package size={size} style={{ color }} />
    };
    return icons[name];
  };

  const PredictionCard = ({ title, icon: Icon, data, color, isRainfall }) => {
    const value = isRainfall 
      ? `${data.rainfall_mm?.toFixed(1) || 0} mm` 
      : `${((data.risk_probability || 0) * 100).toFixed(1)}%`;
    const riskLevel = isRainfall ? data.risk_level : data.risk_level;
    const confidence = data.confidence ? `${(data.confidence * 100).toFixed(1)}%` : 'N/A';

    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
        <div className="p-2 rounded-lg" style={{ background: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{title}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold" style={{ color }}>{value}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              riskLevel === 'High' ? 'bg-[#FF3B5C]/20 text-[#FF3B5C]' :
              riskLevel === 'Medium' ? 'bg-[#FFB020]/20 text-[#FFB020]' :
              'bg-[#00E57A]/20 text-[#00E57A]'
            }`}>{riskLevel}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
            <span>Confidence: {confidence}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Emergency Dashboard</h1>
        <p className="text-gray-400 text-sm">Real-time disaster monitoring and response coordination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <IconComponent name={stat.icon} size={20} color={stat.color} />
              <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/5 rounded-xl overflow-hidden h-[400px]">
          <WorldMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <MapPin size={14} className="text-[#00D4FF]" />
            {selectedLocation ? selectedLocation.name : 'Select a Location'}
          </h3>
          {selectedLocation ? (
            loading ? (
              <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4FF]" /></div>
            ) : (
              <div className="space-y-3">
                <PredictionCard title="Earthquake" icon={Activity} data={predictionsData.earthquake} color="#FF3B5C" />
                <PredictionCard title="Rainfall" icon={CloudRain} data={predictionsData.rainfall} color="#00D4FF" isRainfall />
                <PredictionCard title="Flood" icon={Waves} data={predictionsData.flood} color="#7B2FFF" />
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <MapPin size={32} className="mx-auto text-gray-600 mb-2" />
              <p className="text-gray-500 text-sm">Click on the map to get predictions</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Bell size={14} className="text-[#FFB020]" />
          Recent Alerts
        </h3>
        <div className="space-y-2">
          {recentAlerts.map(alert => (
            <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10">
              <div className={`w-2 h-2 rounded-full ${alert.severity === 'high' ? 'bg-[#FF3B5C]' : alert.severity === 'medium' ? 'bg-[#FFB020]' : 'bg-[#00E57A]'}`} />
              <div className="flex-1">
                <p className="text-white text-sm">{alert.message}</p>
                <p className="text-gray-500 text-xs">{alert.location} • {alert.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${alert.severity === 'high' ? 'bg-[#FF3B5C]/20 text-[#FF3B5C]' : alert.severity === 'medium' ? 'bg-[#FFB020]/20 text-[#FFB020]' : 'bg-[#00E57A]/20 text-[#00E57A]'}`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}