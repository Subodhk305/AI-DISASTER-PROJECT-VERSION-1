import React, { useState } from 'react';
import { FileText, Download, BarChart3, PieChart, TrendingUp, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ReportsPage() {
  const [reports] = useState([
    { id: 1, title: 'Monthly Incident Report', date: 'March 2026', type: 'incident', incidents: 12, resolved: 10, status: 'available', description: 'Comprehensive incident analysis for March 2026' },
    { id: 2, title: 'Resource Utilization Report', date: 'Q1 2026', type: 'resource', efficiency: 87, totalResources: 2045, used: 1780, status: 'available', description: 'Resource allocation and efficiency metrics' },
    { id: 3, title: 'Response Time Analysis', date: 'February 2026', type: 'performance', avgResponseTime: 4.2, targetTime: 5, status: 'available', description: 'Emergency response time metrics' },
    { id: 4, title: 'Volunteer Performance Report', date: 'January 2026', type: 'volunteer', activeVolunteers: 156, hoursServed: 1240, status: 'available', description: 'Volunteer contribution analysis' },
    { id: 5, title: 'Shelter Occupancy Report', date: 'March 2026', type: 'shelter', totalCapacity: 750, currentOccupancy: 248, status: 'available', description: 'Shelter capacity and usage statistics' },
  ]);

  const downloadReport = (report) => {
    alert(`Downloading ${report.title}...`);
  };

  const stats = {
    totalReports: reports.length,
    incidentReports: reports.filter(r => r.type === 'incident').length,
    resourceReports: reports.filter(r => r.type === 'resource').length,
    performanceReports: reports.filter(r => r.type === 'performance').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-gray-400 text-sm">Comprehensive disaster management reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.totalReports}</div><p className="text-gray-400 text-sm">Total Reports</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FF3B5C]">{stats.incidentReports}</div><p className="text-gray-400 text-sm">Incident Reports</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00D4FF]">{stats.resourceReports}</div><p className="text-gray-400 text-sm">Resource Reports</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#7B2FFF]">{stats.performanceReports}</div><p className="text-gray-400 text-sm">Performance Reports</p></div>
      </div>

      <div className="space-y-3">
        {reports.map(report => (
          <div key={report.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-[#00D4FF]" />
                <div><h3 className="text-white font-medium">{report.title}</h3><p className="text-gray-500 text-sm">{report.description}</p></div>
              </div>
              <button onClick={() => downloadReport(report)} className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF]/20 text-[#00D4FF] rounded-lg text-sm hover:bg-[#00D4FF]/30 transition-colors"><Download size={14} /> Download</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
              <div className="flex items-center gap-2"><Calendar size={12} className="text-gray-500" /><span className="text-gray-400">Period:</span><span className="text-white">{report.date}</span></div>
              {report.incidents && <div className="flex items-center gap-2"><AlertTriangle size={12} className="text-[#FF3B5C]" /><span className="text-gray-400">Incidents:</span><span className="text-white">{report.incidents}</span></div>}
              {report.resolved && <div className="flex items-center gap-2"><CheckCircle size={12} className="text-[#00E57A]" /><span className="text-gray-400">Resolved:</span><span className="text-white">{report.resolved}</span></div>}
              {report.efficiency && <div className="flex items-center gap-2"><TrendingUp size={12} className="text-[#00D4FF]" /><span className="text-gray-400">Efficiency:</span><span className="text-white">{report.efficiency}%</span></div>}
              {report.avgResponseTime && <div className="flex items-center gap-2"><Clock size={12} className="text-[#FFB020]" /><span className="text-gray-400">Response:</span><span className="text-white">{report.avgResponseTime} min</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}