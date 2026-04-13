import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import GaugeChart from './GaugeChart';

export default function RiskCard({ title, probability, riskLevel, icon: Icon, color }) {
  const getRiskColor = () => {
    if (riskLevel === 'High') return '#FF3B5C';
    if (riskLevel === 'Medium') return '#FFB020';
    return '#00E57A';
  };

  const getRiskIcon = () => {
    if (riskLevel === 'High') return <TrendingUp size={16} />;
    if (riskLevel === 'Medium') return <AlertTriangle size={16} />;
    return <TrendingDown size={16} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center`}>
          <Icon size={24} style={{ color }} />
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: getRiskColor() }}>
          {getRiskIcon()}
          <span className="font-mono">{riskLevel}</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{probability}%</p>
      <div className="mt-4">
        <GaugeChart value={probability} color={color} />
      </div>
    </motion.div>
  );
}