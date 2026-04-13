import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Star, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

export default function StaffManagementPage() {
  const [staff] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Medical Director', department: 'Medical', phone: '+91 98765 43210', email: 'sarah@disasterai.com', location: 'Central Hospital', status: 'available', skills: ['Emergency Medicine', 'Triage', 'Critical Care'], rating: 4.8, experience: '12 years', joinDate: '2020-01-15' },
    { id: 2, name: 'Capt. Michael Chen', role: 'Rescue Team Lead', department: 'Rescue', phone: '+91 98765 43211', email: 'michael@disasterai.com', location: 'North Base', status: 'on-duty', skills: ['Search & Rescue', 'First Aid', 'High Angle Rescue'], rating: 4.9, experience: '8 years', joinDate: '2018-06-20' },
    { id: 3, name: 'Lisa Rodriguez', role: 'Logistics Coordinator', department: 'Logistics', phone: '+91 98765 43212', email: 'lisa@disasterai.com', location: 'Central Warehouse', status: 'available', skills: ['Supply Chain', 'Transportation', 'Inventory Management'], rating: 4.7, experience: '6 years', joinDate: '2019-03-10' },
    { id: 4, name: 'Dr. Amit Patel', role: 'Emergency Physician', department: 'Medical', phone: '+91 98765 43213', email: 'amit@disasterai.com', location: 'Field Hospital', status: 'on-duty', skills: ['Trauma Care', 'Emergency Medicine', 'Field Surgery'], rating: 4.9, experience: '10 years', joinDate: '2017-08-05' },
    { id: 5, name: 'James Wilson', role: 'Communications Officer', department: 'Communications', phone: '+91 98765 43214', email: 'james@disasterai.com', location: 'Command Center', status: 'available', skills: ['Radio Operations', 'Data Analysis', 'Public Relations'], rating: 4.6, experience: '5 years', joinDate: '2020-11-12' },
  ]);

  const departments = ['All', 'Medical', 'Rescue', 'Logistics', 'Communications'];
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredStaff = selectedDept === 'All' ? staff : staff.filter(s => s.department === selectedDept);
  const availableCount = staff.filter(s => s.status === 'available').length;
  const onDutyCount = staff.filter(s => s.status === 'on-duty').length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Staff Management</h1>
        <p className="text-gray-400 text-sm">Manage emergency response personnel and their assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{staff.length}</div><p className="text-gray-400 text-sm">Total Staff</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{availableCount}</div><p className="text-gray-400 text-sm">Available</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FFB020]">{onDutyCount}</div><p className="text-gray-400 text-sm">On Duty</p></div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {departments.map(dept => (
          <button key={dept} onClick={() => setSelectedDept(dept)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedDept === dept ? 'bg-[#00D4FF] text-gray-900' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{dept}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStaff.map(member => (
          <div key={member.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center"><Users size={24} className="text-white" /></div>
                <div><h3 className="text-white font-medium">{member.name}</h3><p className="text-gray-400 text-sm">{member.role}</p></div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'available' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FFB020] bg-[#FFB020]/10'}`}>{member.status === 'available' ? 'Available' : 'On Duty'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="flex items-center gap-2"><Phone size={12} className="text-gray-500" /><span className="text-gray-400">{member.phone}</span></div>
              <div className="flex items-center gap-2"><Mail size={12} className="text-gray-500" /><span className="text-gray-400">{member.email}</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-gray-500" /><span className="text-gray-400">{member.location}</span></div>
              <div className="flex items-center gap-2"><Star size={12} className="text-yellow-500" /><span className="text-gray-400">Rating: {member.rating}</span></div>
              <div className="flex items-center gap-2"><Calendar size={12} className="text-gray-500" /><span className="text-gray-400">Joined: {member.joinDate}</span></div>
              <div className="flex items-center gap-2"><Award size={12} className="text-gray-500" /><span className="text-gray-400">Exp: {member.experience}</span></div>
            </div>
            <div className="mt-2 flex gap-1 flex-wrap">{member.skills.map(skill => (<span key={skill} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{skill}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}