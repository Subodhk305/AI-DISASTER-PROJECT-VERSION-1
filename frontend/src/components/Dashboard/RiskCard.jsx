import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import GaugeChart from './GaugeChart';

export default function RiskCard({ title, icon, probability, riskLevel, magnitudeClass, confidence, color, isRainfall = false }) {
  const getRiskColor = () => {
    switch (riskLevel?.toLowerCase()) {
      case 'high': return '#FF3B5C';
      case 'medium': return '#FFB020';
      case 'low': return '#00E57A';
      default: return '#00D4FF';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel?.toLowerCase()) {
      case 'high': return <TrendingUp size={16} />;
      case 'medium': return <AlertTriangle size={16} />;
      default: return <TrendingDown size={16} />;
    }
  };

  const displayValue = isRainfall ? probability : probability * 100;
  const unit = isRainfall ? 'mm/day' : '%';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-[#1A2540] hover:border-[#00D4FF]/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: `${color}20`, color }}>
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: getRiskColor() }}>
          {getRiskIcon()}
          <span className="font-mono">{riskLevel || 'Unknown'}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <GaugeChart value={displayValue} max={isRainfall ? 200 : 100} color={color} unit={unit} />
      </div>

      <div className="space-y-2 text-center">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Estimate</span>
          <span className="text-white font-mono">{magnitudeClass || 'N/A'}</span>
        </div>
        {confidence && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Confidence</span>
            <span className="text-white font-mono">{(confidence * 100).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}