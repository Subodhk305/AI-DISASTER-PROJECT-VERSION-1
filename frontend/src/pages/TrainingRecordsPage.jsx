import React, { useState } from 'react';
import { BookOpen, Award, Calendar, Clock, CheckCircle, Users, Video, FileText } from 'lucide-react';

export default function TrainingRecordsPage() {
  const [trainings] = useState([
    { id: 1, title: 'First Aid & CPR Certification', date: '2026-02-15', duration: '8 hours', trainer: 'Dr. Sarah Johnson', participants: 45, status: 'completed', type: 'Certification' },
    { id: 2, title: 'Search & Rescue Techniques', date: '2026-02-20', duration: '16 hours', trainer: 'Capt. Michael Chen', participants: 32, status: 'completed', type: 'Advanced' },
    { id: 3, title: 'Disaster Management Workshop', date: '2026-03-01', duration: '12 hours', trainer: 'Lisa Rodriguez', participants: 28, status: 'in-progress', type: 'Workshop' },
    { id: 4, title: 'Emergency Communication Protocols', date: '2026-03-10', duration: '6 hours', trainer: 'James Wilson', participants: 20, status: 'upcoming', type: 'Training' },
    { id: 5, title: 'Hazmat Response Training', date: '2026-03-18', duration: '20 hours', trainer: 'Mike Johnson', participants: 15, status: 'upcoming', type: 'Specialized' },
  ]);

  const [certificates] = useState([
    { id: 1, name: 'Basic Life Support', issued: '2025-12-10', expiry: '2027-12-10', holder: 'Amit Sharma' },
    { id: 2, name: 'Advanced First Aid', issued: '2025-11-15', expiry: '2027-11-15', holder: 'Priya Patel' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Training Records</h1>
        <p className="text-gray-400 text-sm">Training programs and certification records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Upcoming & Ongoing Trainings</h2>
          {trainings.map(training => (
            <div key={training.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <BookOpen size={20} className="text-[#00D4FF]" />
                  <div><h3 className="text-white font-medium">{training.title}</h3><p className="text-gray-400 text-sm">Trainer: {training.trainer}</p></div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${training.status === 'completed' ? 'text-[#00E57A] bg-[#00E57A]/10' : training.status === 'in-progress' ? 'text-[#FFB020] bg-[#FFB020]/10' : 'text-[#00D4FF] bg-[#00D4FF]/10'}`}>{training.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="flex items-center gap-2"><Calendar size={12} /><span className="text-gray-400">Date:</span><span className="text-white">{training.date}</span></div>
                <div className="flex items-center gap-2"><Clock size={12} /><span className="text-gray-400">Duration:</span><span className="text-white">{training.duration}</span></div>
                <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Participants:</span><span className="text-white">{training.participants}</span></div>
                <div className="flex items-center gap-2"><FileText size={12} /><span className="text-gray-400">Type:</span><span className="text-white">{training.type}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Certifications</h2>
          {certificates.map(cert => (
            <div key={cert.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Award size={20} className="text-[#FFB020]" />
                <h3 className="text-white font-medium">{cert.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">Holder: {cert.holder}</p>
              <p className="text-gray-500 text-xs mt-2">Issued: {cert.issued} • Expires: {cert.expiry}</p>
              <div className="mt-2 text-xs text-[#00E57A] flex items-center gap-1"><CheckCircle size={10} /> Valid</div>
            </div>
          ))}
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Video size={32} className="mx-auto text-gray-600 mb-2" />
            <p className="text-gray-500 text-sm">Online training modules available</p>
            <button className="mt-2 px-3 py-1 bg-[#00D4FF]/20 text-[#00D4FF] rounded-lg text-sm">Browse Courses</button>
          </div>
        </div>
      </div>
    </div>
  );
}