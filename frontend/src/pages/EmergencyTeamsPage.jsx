import React, { useState } from 'react';
import { Shield, Users, MapPin, Phone, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function EmergencyTeamsPage() {
  const [teams] = useState([
    { id: 1, name: 'Alpha Rescue Team', lead: 'Capt. Michael Chen', members: 12, location: 'North Base', status: 'active', specialization: 'Mountain Rescue', responseTime: '5 min', rating: 4.9, available: 8 },
    { id: 2, name: 'Bravo Medical Unit', lead: 'Dr. Sarah Johnson', members: 15, location: 'Central Hospital', status: 'active', specialization: 'Emergency Medical', responseTime: '3 min', rating: 4.8, available: 10 },
    { id: 3, name: 'Charlie Logistics', lead: 'Lisa Rodriguez', members: 8, location: 'Central Warehouse', status: 'active', specialization: 'Supply Chain', responseTime: '10 min', rating: 4.7, available: 5 },
    { id: 4, name: 'Delta Communications', lead: 'James Wilson', members: 6, location: 'Command Center', status: 'standby', specialization: 'Communication', responseTime: '2 min', rating: 4.6, available: 4 },
    { id: 5, name: 'Echo Rapid Response', lead: 'Mike Johnson', members: 20, location: 'South Base', status: 'active', specialization: 'Urban Search & Rescue', responseTime: '4 min', rating: 4.9, available: 15 },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Emergency Teams</h1>
        <p className="text-gray-400 text-sm">Specialized emergency response teams and capabilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[#00D4FF]" />
                <h3 className="text-white font-medium">{team.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${team.status === 'active' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{team.status.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /><span className="text-white text-sm">{team.rating}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div><span className="text-gray-400">Team Lead:</span> <span className="text-white">{team.lead}</span></div>
              <div><span className="text-gray-400">Members:</span> <span className="text-white">{team.members}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-500" /><span className="text-gray-400">Location:</span><span className="text-white">{team.location}</span></div>
              <div className="flex items-center gap-2"><Clock size={12} className="text-gray-500" /><span className="text-gray-400">Response:</span><span className="text-white">{team.responseTime}</span></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-gray-500">Specialization: {team.specialization}</span>
              <span className="text-xs text-[#00E57A]">{team.available} members available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}