import React, { useState } from 'react';
import { UserPlus, Mail, Phone, MapPin, Briefcase, Plus, X, CheckCircle } from 'lucide-react';

export default function RegisterVolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    skills: [],
    availability: 'weekends'
  });
  const [skillInput, setSkillInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const roles = ['Medical Response', 'Rescue Operations', 'Logistics', 'Communications', 'Shelter Management', 'Food Distribution'];

  const handleAddSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', location: '', role: '', skills: [], availability: 'weekends' });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Register Volunteer</h1>
        <p className="text-gray-400 text-sm">Join our volunteer network to help during emergencies</p>
      </div>

      {submitted && (
        <div className="mb-4 p-4 bg-[#00E57A]/10 border border-[#00E57A]/30 rounded-xl flex items-center gap-2">
          <CheckCircle size={20} className="text-[#00E57A]" />
          <p className="text-[#00E57A]">Registration successful! You're now part of the volunteer network.</p>
        </div>
      )}

      <div className="bg-white/5 rounded-xl p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2.5 text-white" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white" placeholder="john@example.com" required /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
            <div className="relative"><Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white" placeholder="+91 98765 43210" required /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Location (City)</label>
            <div className="relative"><MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white" placeholder="Mumbai, India" required /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2.5 text-white" required>
              <option value="">Select a role</option>
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
            <div className="flex gap-2"><div className="relative flex-1"><Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())} className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white" placeholder="First Aid, Rescue, Logistics..." /></div><button type="button" onClick={handleAddSkill} className="px-3 py-2 bg-[#00D4FF] text-gray-900 rounded-lg"><Plus size={16} /></button></div>
            <div className="flex flex-wrap gap-1 mt-2">{formData.skills.map(skill => (<span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[rgba(0,212,255,0.1)] text-[#00D4FF] rounded-full text-xs">{skill}<button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-red-400">×</button></span>))}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Availability</label>
            <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="w-full bg-white/10 border border-white/10 rounded-lg p-2.5 text-white">
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="full-time">Full Time</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#00D4FF] text-gray-900 rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-all">Register as Volunteer</button>
        </form>
      </div>
    </div>
  );
}