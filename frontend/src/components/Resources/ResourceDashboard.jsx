import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { getResources, allocateResources, updateResource } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function ResourceDashboard() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({ name: '', quantity: 0, region: '' });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocate = async (resourceId, quantity) => {
    try {
      await allocateResources(resourceId, quantity);
      fetchResources();
    } catch (error) {
      console.error('Allocation failed:', error);
    }
  };

  const handleAddResource = async () => {
    try {
      await updateResource(newResource);
      setShowAddModal(false);
      fetchResources();
      setNewResource({ name: '', quantity: 0, region: '' });
    } catch (error) {
      console.error('Failed to add resource:', error);
    }
  };

  const regions = ['all', ...new Set(resources.map(r => r.region))];
  const filteredResources = selectedRegion === 'all' ? resources : resources.filter(r => r.region === selectedRegion);

  const totalResources = filteredResources.reduce((sum, r) => sum + r.quantity, 0);
  const criticalResources = filteredResources.filter(r => r.quantity < r.threshold).length;

  if (loading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00D4FF]" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-[#00D4FF]" />
          <h2 className="text-lg font-semibold text-white">Resource Management</h2>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 text-xs bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors flex items-center gap-1"
          >
            <Plus size={14} /> Add Resource
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4">
          <p className="text-gray-500 text-xs mb-1">Total Resources</p>
          <p className="text-2xl font-bold text-white">{totalResources}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-gray-500 text-xs mb-1">Critical Items</p>
          <p className="text-2xl font-bold text-[#FF3B5C]">{criticalResources}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-gray-500 text-xs mb-1">Regions Covered</p>
          <p className="text-2xl font-bold text-white">{regions.length - 1}</p>
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex gap-2 flex-wrap">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              selectedRegion === region
                ? 'bg-[#00D4FF] text-gray-900'
                : 'bg-[rgba(14,20,36,0.8)] text-gray-400 hover:text-white'
            }`}
          >
            {region === 'all' ? 'All Regions' : region}
          </button>
        ))}
      </div>

      {/* Resource Table */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[rgba(14,20,36,0.8)] border-b border-[#1A2540]">
            <tr>
              <th className="px-4 py-3 text-left text-gray-500 font-mono text-xs">Resource</th>
              <th className="px-4 py-3 text-left text-gray-500 font-mono text-xs">Region</th>
              <th className="px-4 py-3 text-left text-gray-500 font-mono text-xs">Available</th>
              <th className="px-4 py-3 text-left text-gray-500 font-mono text-xs">Status</th>
              {user?.role === 'emergency_provider' && <th className="px-4 py-3 text-left text-gray-500 font-mono text-xs">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <motion.tr
                key={resource.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-[#1A2540] last:border-0"
              >
                <td className="px-4 py-3 text-white">{resource.name}</td>
                <td className="px-4 py-3 text-gray-400">{resource.region}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono ${resource.quantity < resource.threshold ? 'text-[#FF3B5C]' : 'text-[#00E57A]'}`}>
                    {resource.quantity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {resource.quantity < resource.threshold ? (
                    <span className="flex items-center gap-1 text-[#FF3B5C] text-xs">
                      <AlertCircle size={12} /> Critical
                    </span>
                  ) : (
                    <span className="text-[#00E57A] text-xs">Adequate</span>
                  )}
                </td>
                {user?.role === 'emergency_provider' && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleAllocate(resource.id, Math.min(resource.quantity, 10))}
                      className="text-xs text-[#00D4FF] hover:underline"
                    >
                      Allocate
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass rounded-2xl p-6 border border-[#00D4FF]/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">Add New Resource</h3>
            <input
              type="text"
              placeholder="Resource Name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="w-full mb-3 bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newResource.quantity}
              onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value) })}
              className="w-full mb-3 bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
            />
            <input
              type="text"
              placeholder="Region"
              value={newResource.region}
              onChange={(e) => setNewResource({ ...newResource, region: e.target.value })}
              className="w-full mb-3 bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAddResource}
                className="flex-1 py-2 bg-[#00D4FF] text-gray-900 rounded-lg font-medium hover:bg-[#00D4FF]/90"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}