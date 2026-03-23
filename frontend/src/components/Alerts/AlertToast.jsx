import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

export default function AlertToast({ alerts, onClose }) {
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 border-red-500 text-red-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500 text-blue-400';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {alerts.slice(0, 3).map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`flex items-center gap-3 p-3 rounded-lg border ${getSeverityStyle(alert.severity)} backdrop-blur-sm min-w-[280px]`}
          >
            <AlertCircle size={18} />
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-70">{new Date(alert.timestamp).toLocaleTimeString()}</p>
            </div>
            <button onClick={() => onClose(alert.id)} className="hover:opacity-70">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}