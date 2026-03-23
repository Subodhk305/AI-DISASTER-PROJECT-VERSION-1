import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function AllocationPanel({ allocations, onConfirm }) {
  const [selected, setSelected] = useState(null);

  const handleConfirm = (allocation) => {
    setSelected(allocation.id);
    onConfirm(allocation);
    setTimeout(() => setSelected(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Truck size={18} className="text-[#00D4FF]" />
        <h3 className="text-sm font-semibold text-white">Pending Allocations</h3>
      </div>

      {allocations.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">No pending allocations</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allocations.map((allocation) => (
            <motion.div
              key={allocation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[#FF3B5C]" />
                    <span className="text-white text-sm font-medium">{allocation.region}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400">
                      <span className="text-white">Resources:</span> {allocation.resources.join(', ')}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      Priority: {allocation.priority}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleConfirm(allocation)}
                  disabled={selected === allocation.id}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    selected === allocation.id
                      ? 'bg-green-500 text-white'
                      : 'bg-[#00D4FF] text-gray-900 hover:bg-[#00D4FF]/90'
                  }`}
                >
                  {selected === allocation.id ? 'Confirmed' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}