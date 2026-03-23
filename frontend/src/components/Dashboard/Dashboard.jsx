import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Bell, Map, Users, Package } from 'lucide-react';
import RiskCard from './RiskCard';
import GaugeChart from './GaugeChart';
import OverallRisk from './OverallRisk';
import { getPredictions, getUserAlerts } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';

export default function Dashboard() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedLocation(loc);
          fetchPredictions(loc.lat, loc.lng);
        },
        () => {
          // Default location
          const defaultLoc = { lat: 20.5937, lng: 78.9629 };
          setSelectedLocation(defaultLoc);
          fetchPredictions(defaultLoc.lat, defaultLoc.lng);
        }
      );
    } else {
      const defaultLoc = { lat: 20.5937, lng: 78.9629 };
      setSelectedLocation(defaultLoc);
      fetchPredictions(defaultLoc.lat, defaultLoc.lng);
    }

    // Fetch user alerts
    fetchUserAlerts();
  }, []);

  useEffect(() => {
    if (lastMessage) {
      // Handle WebSocket alerts
      setAlerts(prev => [lastMessage, ...prev].slice(0, 10));
    }
  }, [lastMessage]);

  const fetchPredictions = async (lat, lng) => {
    setLoading(true);
    try {
      const data = await getPredictions(lat, lng, 'Current Location');
      setPredictions(data);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAlerts = async () => {
    try {
      const data = await getUserAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  const calculateOverallRisk = () => {
    if (!predictions) return 0;
    const risks = [
      predictions.earthquake?.risk_probability || 0,
      predictions.flood?.risk_probability || 0,
      predictions.rainfall?.risk_probability ? predictions.rainfall.risk_probability / 100 : 0
    ];
    return risks.reduce((a, b) => a + b, 0) / 3;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="text-[#00D4FF]">{user?.name}</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Real-time disaster predictions for your location
        </p>
      </div>

      {/* Overall Risk */}
      <OverallRisk risk={calculateOverallRisk()} />

      {/* Three Disaster Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <RiskCard
          title="Earthquake Risk"
          icon={<Activity size={24} />}
          probability={predictions?.earthquake?.risk_probability || 0}
          riskLevel={predictions?.earthquake?.risk_level || 'Low'}
          magnitudeClass={predictions?.earthquake?.magnitude_class}
          confidence={predictions?.earthquake?.confidence}
          color="#FF3B5C"
        />
        <RiskCard
          title="Rainfall Forecast"
          icon={<AlertTriangle size={24} />}
          probability={predictions?.rainfall?.rainfall_mm || 0}
          riskLevel={predictions?.rainfall?.risk_level || 'Low'}
          magnitudeClass={`${predictions?.rainfall?.rainfall_mm || 0} mm/day`}
          confidence={predictions?.rainfall?.confidence}
          color="#00D4FF"
          isRainfall
        />
        <RiskCard
          title="Flood Risk"
          icon={<AlertTriangle size={24} />}
          probability={predictions?.flood?.risk_probability || 0}
          riskLevel={predictions?.flood?.risk_level || 'Low'}
          magnitudeClass={predictions?.flood?.severity}
          confidence={predictions?.flood?.confidence}
          color="#FFB020"
        />
      </div>

      {/* Alerts Section */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-[#00D4FF]" />
          <h2 className="text-lg font-semibold text-white">Recent Alerts</h2>
        </div>
        <AnimatePresence>
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No new alerts</p>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert, idx) => (
                <motion.div
                  key={alert.id || idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-3 rounded-lg border border-[#1A2540] bg-[rgba(14,20,36,0.5)]"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white text-sm">{alert.message}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}