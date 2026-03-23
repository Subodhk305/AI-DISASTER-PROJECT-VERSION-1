import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, X, Mail, Phone } from 'lucide-react';
import { getAlerts, markAlertRead, triggerManualAlert } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function AlertList() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [manualAlert, setManualAlert] = useState({ message: '', severity: 'medium' });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAlertRead(id);
      setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    } catch (error) {
      console.error('Failed to mark alert read:', error);
    }
  };

  const handleManualAlert = async () => {
    try {
      await triggerManualAlert(manualAlert);
      setShowModal(false);
      fetchAlerts();
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={16} />;
      case 'medium': return <AlertTriangle size={16} />;
      default: return <Bell size={16} />;
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00D4FF]" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-[#00D4FF]" />
          <h2 className="text-lg font-semibold text-white">Alerts</h2>
          <span className="px-2 py-0.5 text-xs bg-[rgba(0,212,255,0.1)] text-[#00D4FF] rounded-full">
            {alerts.filter(a => !a.read).length} unread
          </span>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1.5 text-xs bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors"
          >
            + Manual Alert
          </button>
        )}
      </div>

      {/* Alert List */}
      <AnimatePresence>
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={40} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">No alerts yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${!alert.read ? 'border-l-4 border-l-[#00D4FF]' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      {alert.location && <span>📍 {alert.location}</span>}
                    </div>
                  </div>
                  {!alert.read && (
                    <button
                      onClick={() => handleMarkRead(alert.id)}
                      className="text-gray-500 hover:text-[#00D4FF] transition-colors"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Manual Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass rounded-2xl p-6 border border-[#00D4FF]/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">Send Manual Alert</h3>
            <textarea
              value={manualAlert.message}
              onChange={(e) => setManualAlert({ ...manualAlert, message: e.target.value })}
              className="w-full bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] transition-colors"
              rows="3"
              placeholder="Alert message..."
            />
            <select
              value={manualAlert.severity}
              onChange={(e) => setManualAlert({ ...manualAlert, severity: e.target.value })}
              className="w-full mt-3 bg-[rgba(14,20,36,0.8)] border border-[#1A2540] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors"
            >
              <option value="low">Low Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="high">High Severity</option>
            </select>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleManualAlert}
                className="flex-1 py-2 bg-[#00D4FF] text-gray-900 rounded-lg font-medium hover:bg-[#00D4FF]/90 transition-colors"
              >
                Send Alert
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
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