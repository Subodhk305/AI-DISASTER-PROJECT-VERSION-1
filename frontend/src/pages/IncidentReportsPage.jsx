import React, { useState } from 'react';
import { FileText, AlertTriangle, Search, Calendar, Download, Filter, Eye, TrendingUp, TrendingDown, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function IncidentReportsPage() {
  const [incidents, setIncidents] = useState([
    { id: 1, type: 'earthquake', location: 'Northern Region', date: '2026-03-23', time: '14:30:00', magnitude: 5.2, depth: 10, affected: 150, fatalities: 2, injuries: 45, status: 'resolved', responseTime: 12, resourcesUsed: ['Medical Kits', 'Tents', 'Food Packages'] },
    { id: 2, type: 'flood', location: 'River Basin', date: '2026-03-22', time: '08:15:00', waterLevel: 4.2, affected: 320, fatalities: 1, injuries: 28, status: 'resolved', responseTime: 18, resourcesUsed: ['Water Pumps', 'Sandbags', 'Life Jackets'] },
    { id: 3, type: 'landslide', location: 'Western Hills', date: '2026-03-21', time: '03:45:00', magnitude: 0, affected: 45, fatalities: 3, injuries: 12, status: 'ongoing', responseTime: 8, resourcesUsed: ['Rescue Teams', 'Medical Kits', 'Excavators'] },
    { id: 4, type: 'earthquake', location: 'Eastern Region', date: '2026-03-20', time: '22:10:00', magnitude: 3.8, depth: 8, affected: 28, fatalities: 0, injuries: 5, status: 'resolved', responseTime: 15, resourcesUsed: ['Medical Kits', 'Tents'] },
    { id: 5, type: 'cyclone', location: 'Coastal Area', date: '2026-03-19', time: '11:00:00', windSpeed: 120, affected: 580, fatalities: 4, injuries: 89, status: 'resolved', responseTime: 10, resourcesUsed: ['Evacuation Centers', 'Food Packages', 'Water Bottles'] },
    { id: 6, type: 'flood', location: 'Delta Region', date: '2026-03-18', time: '16:20:00', waterLevel: 3.8, affected: 210, fatalities: 0, injuries: 15, status: 'resolved', responseTime: 14, resourcesUsed: ['Water Pumps', 'Sandbags'] },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch(type) {
      case 'earthquake': return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
      case 'flood': return 'text-[#00D4FF] bg-[#00D4FF]/10';
      case 'landslide': return 'text-[#FFB020] bg-[#FFB020]/10';
      case 'cyclone': return 'text-[#7B2FFF] bg-[#7B2FFF]/10';
      default: return 'text-gray-400 bg-white/10';
    }
  };

  const getStatusColor = (status) => {
    if (status === 'resolved') return 'text-[#00E57A] bg-[#00E57A]/10';
    return 'text-[#FFB020] bg-[#FFB020]/10';
  };

  const stats = {
    total: incidents.length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
    ongoing: incidents.filter(i => i.status === 'ongoing').length,
    totalAffected: incidents.reduce((sum, i) => sum + i.affected, 0),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Incident Reports</h1>
            <p className="text-gray-400 text-sm">Comprehensive incident reporting and analysis</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><FileText size={14} /> Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-sm">Total Incidents</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{stats.resolved}</div><p className="text-gray-400 text-sm">Resolved</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FFB020]">{stats.ongoing}</div><p className="text-gray-400 text-sm">Ongoing</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.totalAffected.toLocaleString()}</div><p className="text-gray-400 text-sm">People Affected</p></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search by location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white" />
        </div>
        <div className="flex gap-2">
          {['all', 'earthquake', 'flood', 'landslide', 'cyclone'].map(type => (
            <button key={type} onClick={() => setFilterType(type)} className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${filterType === type ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/10 text-gray-400 hover:text-white'}`}>{type}</button>
          ))}
        </div>
        <button className="px-3 py-2 bg-white/10 rounded-lg text-gray-400 hover:text-white flex items-center gap-2"><Download size={16} /> Export</button>
      </div>

      <div className="space-y-3">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setSelectedIncident(selectedIncident?.id === incident.id ? null : incident)}>
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="text-[#FF3B5C]" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-medium capitalize">{incident.type} Incident</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(incident.type)}`}>{incident.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(incident.status)}`}>{incident.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{incident.location}</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-gray-500">{incident.date}</p>
                <p className="text-gray-500 text-xs">{incident.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
              {incident.magnitude && <div><span className="text-gray-500">Magnitude:</span> <span className="text-white">{incident.magnitude}</span></div>}
              {incident.waterLevel && <div><span className="text-gray-500">Water Level:</span> <span className="text-white">{incident.waterLevel}m</span></div>}
              {incident.windSpeed && <div><span className="text-gray-500">Wind Speed:</span> <span className="text-white">{incident.windSpeed} km/h</span></div>}
              <div><span className="text-gray-500">Affected:</span> <span className="text-white">{incident.affected}</span></div>
              <div><span className="text-gray-500">Fatalities:</span> <span className="text-[#FF3B5C]">{incident.fatalities}</span></div>
              <div><span className="text-gray-500">Injuries:</span> <span className="text-[#FFB020]">{incident.injuries}</span></div>
              <div><span className="text-gray-500">Response Time:</span> <span className="text-white">{incident.responseTime} min</span></div>
            </div>
            {selectedIncident?.id === incident.id && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">Resources Deployed:</p>
                <div className="flex gap-2 flex-wrap">
                  {incident.resourcesUsed.map(resource => (
                    <span key={resource} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">{resource}</span>
                  ))}
                </div>
                <button className="mt-3 text-xs text-[#00D4FF] hover:underline">View Full Report →</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}