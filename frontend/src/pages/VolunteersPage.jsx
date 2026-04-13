import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Star, Award, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function VolunteersPage() {
  const [volunteers] = useState([
    { id: 1, name: 'Amit Sharma', role: 'Medical Response', phone: '+91 98765 43210', email: 'amit@example.com', location: 'Downtown', status: 'available', skills: ['First Aid', 'CPR', 'Emergency Medicine'], joined: '2025-01-15', hours: 120, rating: 4.8 },
    { id: 2, name: 'Priya Patel', role: 'Rescue Operations', phone: '+91 98765 43211', email: 'priya@example.com', location: 'North District', status: 'available', skills: ['Search & Rescue', 'Swimming', 'Climbing'], joined: '2025-02-10', hours: 85, rating: 4.9 },
    { id: 3, name: 'Rajesh Kumar', role: 'Logistics', phone: '+91 98765 43212', email: 'rajesh@example.com', location: 'East District', status: 'assigned', skills: ['Supply Chain', 'Transportation', 'Inventory'], joined: '2024-11-20', hours: 200, rating: 4.7 },
    { id: 4, name: 'Sunita Reddy', role: 'Communications', phone: '+91 98765 43213', email: 'sunita@example.com', location: 'Command Center', status: 'available', skills: ['Radio Operations', 'Data Analysis', 'Public Relations'], joined: '2025-01-05', hours: 95, rating: 4.9 },
    { id: 5, name: 'Vikram Singh', role: 'Medical Response', phone: '+91 98765 43214', email: 'vikram@example.com', location: 'South District', status: 'assigned', skills: ['First Aid', 'Trauma Care', 'Patient Transport'], joined: '2024-12-01', hours: 150, rating: 4.8 },
  ]);

  const stats = {
    total: volunteers.length,
    available: volunteers.filter(v => v.status === 'available').length,
    assigned: volunteers.filter(v => v.status === 'assigned').length,
    totalHours: volunteers.reduce((sum, v) => sum + v.hours, 0),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Volunteer Management</h1>
        <p className="text-gray-400 text-sm">Manage volunteers and their assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-sm">Total Volunteers</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{stats.available}</div><p className="text-gray-400 text-sm">Available</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FFB020]">{stats.assigned}</div><p className="text-gray-400 text-sm">Assigned</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00D4FF]">{stats.totalHours}</div><p className="text-gray-400 text-sm">Total Hours</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {volunteers.map(volunteer => (
          <div key={volunteer.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center"><Users size={24} className="text-white" /></div><div><h3 className="text-white font-medium">{volunteer.name}</h3><p className="text-gray-400 text-sm">{volunteer.role}</p></div></div>
              <span className={`text-xs px-2 py-1 rounded-full ${volunteer.status === 'available' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{volunteer.status === 'available' ? 'Available' : 'Assigned'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="flex items-center gap-2"><Phone size={12} className="text-gray-500" /><span className="text-gray-400">{volunteer.phone}</span></div>
              <div className="flex items-center gap-2"><Mail size={12} className="text-gray-500" /><span className="text-gray-400">{volunteer.email}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-500" /><span className="text-gray-400">{volunteer.location}</span></div>
              <div className="flex items-center gap-2"><Calendar size={12} className="text-gray-500" /><span className="text-gray-400">Joined: {volunteer.joined}</span></div>
              <div className="flex items-center gap-2"><Clock size={12} className="text-gray-500" /><span className="text-gray-400">{volunteer.hours} hours</span></div>
              <div className="flex items-center gap-2"><Star size={12} className="text-yellow-500" /><span className="text-gray-400">Rating: {volunteer.rating}</span></div>
            </div>
            <div className="mt-2 flex gap-1 flex-wrap">{volunteer.skills.map(skill => (<span key={skill} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{skill}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}