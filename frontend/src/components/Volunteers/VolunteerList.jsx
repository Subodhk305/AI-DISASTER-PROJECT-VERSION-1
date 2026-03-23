import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Phone, Mail, Star, CheckCircle } from 'lucide-react';
import { getVolunteers, assignVolunteer } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function VolunteerList() {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data);
    } catch (error) {
      console.error('Failed to fetch volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (volunteerId, task) => {
    try {
      await assignVolunteer(volunteerId, task);
      fetchVolunteers();
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  const filteredVolunteers = filter === 'all' 
    ? volunteers 
    : volunteers.filter(v => v.status === filter);

  const stats = {
    total: volunteers.length,
    available: volunteers.filter(v => v.status === 'available').length,
    assigned: volunteers.filter(v => v.status === 'assigned').length
  };

  if (loading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00D4FF]" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-[#00D4FF]" />
          <h2 className="text-lg font-semibold text-white">Volunteer Network</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#00E57A]">{stats.available}</p>
          <p className="text-xs text-gray-500">Available</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#FFB020]">{stats.assigned}</p>
          <p className="text-xs text-gray-500">Assigned</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'available', 'assigned'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              filter === status
                ? 'bg-[#00D4FF] text-gray-900'
                : 'bg-[rgba(14,20,36,0.8)] text-gray-400 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Volunteer Cards */}
      <div className="space-y-3">
        {filteredVolunteers.map((volunteer) => (
          <motion.div
            key={volunteer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{volunteer.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    volunteer.status === 'available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {volunteer.status}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    <span>{volunteer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} />
                    <span>{volunteer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} />
                    <span>{volunteer.email}</span>
                  </div>
                  {volunteer.skills && (
                    <div className="flex items-center gap-2">
                      <Star size={12} />
                      <span>Skills: {volunteer.skills.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
              {user?.role === 'emergency_provider' && volunteer.status === 'available' && (
                <button
                  onClick={() => handleAssign(volunteer.id, 'Disaster Response')}
                  className="px-3 py-1.5 text-xs bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors"
                >
                  Assign
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}