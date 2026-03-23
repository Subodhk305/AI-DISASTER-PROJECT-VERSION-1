import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { registerVolunteer } from '../../services/api';

export default function VolunteerRegister({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    availability: 'available'
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await registerVolunteer(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
      setFormData({ name: '', email: '', phone: '', location: '', skills: [], availability: 'available' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-6 border border-[#1A2540]">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus size={18} className="text-[#00D4FF]" />
        <h3 className="text-sm font-semibold text-white">Register as Volunteer</h3>
      </div>

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          ✅ Successfully registered! You're now part of the volunteer network.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] text-sm"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] text-sm"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Phone</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] text-sm"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Location (City)</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] text-sm"
              placeholder="Mumbai, India"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Skills</label>
          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] text-sm"
                placeholder="First Aid, Rescue, Logistics..."
              />
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-1 bg-[#00D4FF] text-gray-900 rounded-lg text-xs hover:bg-[#00D4FF]/90"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.skills.map(skill => (
              <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[rgba(0,212,255,0.1)] text-[#00D4FF] rounded-full text-xs">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-red-400">×</button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#00D4FF] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#00D4FF]/90 transition-all disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register as Volunteer'}
        </button>
      </form>
    </div>
  );
}