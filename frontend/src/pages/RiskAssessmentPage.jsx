import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, CloudRain, Waves } from 'lucide-react';

export default function RiskAssessmentPage() {
  const [risks] = useState([
    { type: 'Earthquake', probability: 0.32, severity: 0.45, riskScore: 0.38, trend: 'stable', color: '#FF3B5C', icon: Activity },
    { type: 'Rainfall', probability: 0.78, severity: 0.62, riskScore: 0.70, trend: 'increasing', color: '#00D4FF', icon: CloudRain },
    { type: 'Flood', probability: 0.45, severity: 0.68, riskScore: 0.56, trend: 'decreasing', color: '#7B2FFF', icon: Waves },
    { type: 'Landslide', probability: 0.28, severity: 0.52, riskScore: 0.40, trend: 'stable', color: '#FFB020', icon: AlertTriangle },
    { type: 'Cyclone', probability: 0.15, severity: 0.85, riskScore: 0.50, trend: 'increasing', color: '#FF6B3C', icon: AlertTriangle },
  ]);

  const getTrendIcon = (trend) => {
    if (trend === 'increasing') return <TrendingUp size={14} className="text-[#FF3B5C]" />;
    if (trend === 'decreasing') return <TrendingDown size={14} className="text-[#00E57A]" />;
    return null;
  };

  const overallRisk = risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Risk Assessment</h1>
        <p className="text-gray-400 text-sm">Comprehensive disaster risk analysis and assessment</p>
      </div>

      <div className="bg-gradient-to-r from-[#FF3B5C]/20 to-[#00D4FF]/20 rounded-xl p-6 mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Overall Risk Score</p>
          <p className="text-4xl font-bold text-white">{(overallRisk * 100).toFixed(1)}%</p>
          <p className="text-gray-500 text-xs mt-2">Based on probability × severity analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {risks.map(risk => (
          <div key={risk.type} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <risk.icon size={20} style={{ color: risk.color }} />
                <h3 className="text-white font-medium">{risk.type}</h3>
                {getTrendIcon(risk.trend)}
              </div>
              <span className="text-sm font-bold" style={{ color: risk.color }}>{(risk.riskScore * 100).toFixed(1)}% Risk</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-xs">Probability</p><p className="text-white text-lg">{(risk.probability * 100).toFixed(1)}%</p></div>
              <div><p className="text-gray-500 text-xs">Severity</p><p className="text-white text-lg">{(risk.severity * 100).toFixed(1)}%</p></div>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${risk.riskScore * 100}%`, background: risk.color }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}