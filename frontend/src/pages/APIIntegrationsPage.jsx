// frontend/src/pages/APIIntegrationsPage.jsx
import React, { useState } from 'react';
import { Globe, Key, RefreshCw, CheckCircle, XCircle, Edit, Save, Activity, Cloud, Waves, Database, Wifi, Shield, AlertCircle } from 'lucide-react';

export default function APIIntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'USGS Earthquake API', status: 'connected', lastSync: '2026-03-24 10:30:00', endpoint: 'https://earthquake.usgs.gov/fdsnws/event/1/', apiKey: '••••••••••••••••', type: 'earthquake' },
    { id: 2, name: 'IRIS Waveform API', status: 'connected', lastSync: '2026-03-24 09:45:00', endpoint: 'https://service.iris.edu/fdsnws/dataselect/1/', apiKey: '••••••••••••••••', type: 'waveform' },
    { id: 3, name: 'Open-Meteo Weather API', status: 'connected', lastSync: '2026-03-24 10:15:00', endpoint: 'https://api.open-meteo.com/v1/forecast', apiKey: '••••••••••••••••', type: 'weather' },
    { id: 4, name: 'NOAA Flood API', status: 'error', lastSync: '2026-03-23 14:20:00', endpoint: 'https://api.weather.gov/alerts', apiKey: '••••••••••••••••', type: 'flood', error: 'Connection timeout' },
    { id: 5, name: 'Google Maps API', status: 'connected', lastSync: '2026-03-24 10:00:00', endpoint: 'https://maps.googleapis.com/maps/api', apiKey: 'AIzaSyCxEPlv9QT80tJOyVkLebg50lt0jjLsFms', type: 'map' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editKey, setEditKey] = useState('');

  const handleTestConnection = (id) => {
    alert(`Testing connection for API ${id}...`);
  };

  const handleSync = (id) => {
    alert(`Syncing data from API ${id}...`);
  };

  const handleSaveKey = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, apiKey: editKey } : i));
    setEditingId(null);
    setEditKey('');
    alert('API key saved successfully!');
  };

  const getStatusIcon = (status) => {
    if (status === 'connected') return <CheckCircle size={16} className="text-[#00E57A]" />;
    if (status === 'error') return <XCircle size={16} className="text-[#FF3B5C]" />;
    return <AlertCircle size={16} className="text-[#FFB020]" />;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'earthquake': return <Activity size={18} className="text-[#FF3B5C]" />;
      case 'weather': return <Cloud size={18} className="text-[#00D4FF]" />;
      case 'flood': return <Waves size={18} className="text-[#7B2FFF]" />;
      case 'map': return <Globe size={18} className="text-[#FFB020]" />;
      default: return <Database size={18} className="text-gray-400" />;
    }
  };

  const stats = {
    total: integrations.length,
    connected: integrations.filter(i => i.status === 'connected').length,
    error: integrations.filter(i => i.status === 'error').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">API Integrations</h1>
        <p className="text-gray-400 text-sm">Manage external API connections and data sources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-sm">Total APIs</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{stats.connected}</div><p className="text-gray-400 text-sm">Connected</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FF3B5C]">{stats.error}</div><p className="text-gray-400 text-sm">Errors</p></div>
      </div>

      <div className="space-y-4">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                {getTypeIcon(integration.type)}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-medium">{integration.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${integration.status === 'connected' ? 'text-[#00E57A] bg-[#00E57A]/10' : 'text-[#FF3B5C] bg-[#FF3B5C]/10'}`}>
                      {getStatusIcon(integration.status)} {integration.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Endpoint: {integration.endpoint}</p>
                  <p className="text-gray-500 text-xs">Last Sync: {integration.lastSync}</p>
                  {integration.error && <p className="text-[#FF3B5C] text-xs mt-1">Error: {integration.error}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleTestConnection(integration.id)} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400 hover:text-white"><Wifi size={12} /> Test</button>
                <button onClick={() => handleSync(integration.id)} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400 hover:text-white"><RefreshCw size={12} /> Sync</button>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key size={14} className="text-gray-500" />
                  <span className="text-gray-400 text-sm">API Key:</span>
                  {editingId === integration.id ? (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={editKey} 
                        onChange={(e) => setEditKey(e.target.value)} 
                        className="bg-white/10 border border-white/10 rounded px-2 py-1 text-white text-sm" 
                        placeholder="Enter API key" 
                      />
                      <button onClick={() => handleSaveKey(integration.id)} className="text-[#00E57A] text-xs"><Save size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <span className="text-white text-sm font-mono">{integration.apiKey}</span>
                      <button onClick={() => { setEditingId(integration.id); setEditKey(integration.apiKey); }} className="text-gray-400 hover:text-[#00D4FF]"><Edit size={12} /></button>
                    </>
                  )}
                </div>
                <button className="text-xs text-[#00D4FF] hover:underline">View Documentation</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white/5 rounded-xl p-4">
        <h3 className="text-white font-medium mb-2">Add New Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="text" placeholder="API Name" className="bg-white/10 border border-white/10 rounded-lg p-2 text-white" />
          <input type="text" placeholder="Endpoint URL" className="bg-white/10 border border-white/10 rounded-lg p-2 text-white" />
          <input type="text" placeholder="API Key" className="bg-white/10 border border-white/10 rounded-lg p-2 text-white" />
        </div>
        <button className="mt-3 px-4 py-2 bg-[#00D4FF] text-gray-900 rounded-lg text-sm">Add Integration</button>
      </div>
    </div>
  );
}
