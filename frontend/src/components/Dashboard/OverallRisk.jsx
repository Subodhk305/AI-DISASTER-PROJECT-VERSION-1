import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function OverallRisk({ risk }) {
  const percentage = risk * 100;
  
  const getRiskLevel = () => {
    if (percentage >= 60) return { level: 'Critical', color: '#FF3B5C', icon: AlertTriangle };
    if (percentage >= 30) return { level: 'Moderate', color: '#FFB020', icon: AlertTriangle };
    return { level: 'Safe', color: '#00E57A', icon: CheckCircle };
  };

  const riskInfo = getRiskLevel();
  const Icon = riskInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-6 mb-8 border border-[#1A2540]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full" style={{ background: `${riskInfo.color}20` }}>
            <Icon size={24} style={{ color: riskInfo.color }} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Risk Score</p>
            <h2 className="text-3xl font-bold text-white">
              {percentage.toFixed(1)}%
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Risk Level</p>
          <p className="text-xl font-bold" style={{ color: riskInfo.color }}>
            {riskInfo.level}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 bg-[#1A2540] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${riskInfo.color}, ${riskInfo.color}80)` }}
        />
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Based on earthquake, rainfall, and flood predictions
      </p>
    </motion.div>
  );
}