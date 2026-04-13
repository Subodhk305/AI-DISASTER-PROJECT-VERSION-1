// frontend/src/components/Dashboard/UnifiedDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, CloudRain, Waves, MapPin, AlertTriangle, 
  Bell, Users, Package, Shield, Calendar, Clock,
  Thermometer, Wind, Droplets, ChevronDown, LayoutDashboard,
  FileText, Settings, HelpCircle, Menu, X, TrendingUp, TrendingDown,
  User, Home
} from 'lucide-react';
import WorldMap from '../Map/WorldMap';
import { getPredictions } from '../../services/api';

export default function UnifiedDashboard({ user, onLogout }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setLoading(true);
    try {
      const data = await getPredictions(location.lat, location.lng, location.name);
      setPredictions(data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high': return '#FF3B5C';
      case 'medium': return '#FFB020';
      default: return '#00E57A';
    }
  };

  const formatProbability = (prob) => {
    if (prob === undefined) return '0%';
    return `${(prob * 100).toFixed(1)}%`;
  };

  const predictionsData = {
    earthquake: predictions?.earthquake || { risk_probability: 0.05, risk_level: 'Low', magnitude_class: 'minor', confidence: 0.85 },
    rainfall: predictions?.rainfall || { rainfall_mm: 12.5, risk_probability: 45, risk_level: 'Medium', confidence: 0.78 },
    flood: predictions?.flood || { risk_probability: 0.08, risk_level: 'Low', severity: 'Low', confidence: 0.82 }
  };

  const stats = [
    { label: 'Active Alerts', value: '3', change: '+2', color: '#FF3B5C', icon: Bell },
    { label: 'Active Volunteers', value: '156', change: '+12', color: '#00E57A', icon: Users },
    { label: 'Response Teams', value: '24', change: '+3', color: '#00D4FF', icon: Shield },
    { label: 'Resources Deployed', value: '847', change: '+45', color: '#FFB020', icon: Package }
  ];

  const recentAlerts = [
    { id: 1, type: 'earthquake', location: 'Northern Region', severity: 'medium', message: 'Minor tremors detected', time: '5 mins ago' },
    { id: 2, type: 'rainfall', location: 'Coastal Area', severity: 'high', message: 'Heavy rainfall warning', time: '12 mins ago' },
    { id: 3, type: 'flood', location: 'River Basin', severity: 'medium', message: 'Water levels rising', time: '23 mins ago' }
  ];

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    pressure: 1012,
    condition: 'Partly Cloudy'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030308] to-[#0f0f1a]">
      {/* Top Navigation Bar */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <Activity size={28} className="text-[#00D4FF]" />
            <div>
              <h1 className="text-xl font-bold text-white">DisasterAI</h1>
              <p className="text-[10px] text-gray-500">Unified Emergency Management System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Date & Time */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={14} />
            <span>{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <Clock size={14} className="ml-2" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>

          {/* Weather Widget */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-lg">
            <Thermometer size={14} className="text-[#FFB020]" />
            <span className="text-white text-sm">{weatherData.temperature}°C</span>
            <Wind size={14} className="text-[#00D4FF]" />
            <span className="text-white text-sm">{weatherData.windSpeed} km/h</span>
            <Droplets size={14} className="text-[#00E57A]" />
            <span className="text-white text-sm">{weatherData.humidity}%</span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm hidden sm:block">{user?.name?.split(' ')[0] || 'User'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:relative z-30 w-72 bg-white/5 backdrop-blur-sm border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} h-[calc(100vh-64px)] overflow-y-auto`}>
          <nav className="p-4 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <stat.icon size={14} style={{ color: stat.color }} />
                    <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                  </div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1">
              <NavItem icon={LayoutDashboard} label="Dashboard" active path="/dashboard" />
              <NavItem icon={Bell} label="Notifications" badge="3" path="/alerts" />
              <NavItem icon={MapPin} label="Disaster Map" path="/map" />
              <NavItem icon={Users} label="Personnel" hasSubmenu />
              <NavItem icon={Package} label="Resources" hasSubmenu />
              <NavItem icon={Home} label="Shelters" hasSubmenu />
              <NavItem icon={FileText} label="Reports" path="/reports" />
              <NavItem icon={Settings} label="Settings" path="/settings" />
              <NavItem icon={HelpCircle} label="Help & Support" path="/help" />
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Emergency Dashboard</h1>
            <p className="text-gray-400 text-sm">Real-time disaster monitoring and response coordination</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10 mb-6">
            {['overview', 'predictions', 'resources', 'response'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm capitalize transition-all ${
                  activeTab === tab
                    ? 'text-[#00D4FF] border-b-2 border-[#00D4FF]'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon size={20} style={{ color: stat.color }} />
                      <span className={`text-xs font-mono ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map & Predictions Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Map */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden h-[400px]">
                  <WorldMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
                </div>

                {/* Selected Location Predictions */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin size={14} className="text-[#00D4FF]" />
                    {selectedLocation ? selectedLocation.name : 'Select a Location'}
                  </h3>
                  {selectedLocation ? (
                    loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4FF]" />
                      </div>
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

              {/* Recent Alerts */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Bell size={14} className="text-[#FFB020]" />
                    Recent Alerts
                  </h3>
                  <button className="text-xs text-[#00D4FF] hover:underline">View All</button>
                </div>
                <div className="space-y-2">
                  {recentAlerts.map(alert => (
                    <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// Helper Components
function NavItem({ icon: Icon, label, badge, active, path, hasSubmenu }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (hasSubmenu) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="text-sm">{label}</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="ml-6 mt-1 space-y-1">
            <div className="px-3 py-2 text-xs text-gray-500">Coming soon...</div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <a href={path} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
      active
        ? 'bg-[#00D4FF]/10 text-[#00D4FF]'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
      <Icon size={18} />
      <span>{label}</span>
      {badge && <span className="ml-auto px-1.5 py-0.5 text-[9px] bg-[#FF3B5C] text-white rounded-full">{badge}</span>}
    </a>
  );
}

function PredictionCard({ title, icon: Icon, data, color, isRainfall }) {
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
          }`}>
            {riskLevel}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
          <span>Confidence: {confidence}</span>
          {isRainfall && <span>Intensity: {data.risk_level}</span>}
        </div>
      </div>
    </div>
  );
}