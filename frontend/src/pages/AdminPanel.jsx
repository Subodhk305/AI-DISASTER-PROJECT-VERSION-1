import React, { useState, useEffect } from 'react';
import { 
  Users, Package, Home, FileText, Bell, Settings, 
  Plus, Edit, Trash2, Eye, CheckCircle, XCircle,
  AlertTriangle, CloudRain, Waves, MapPin, Calendar,
  Clock, Phone, Mail, User, Shield, Truck, Warehouse,
  Tent, Droplets, Thermometer, Wind, Activity
} from 'lucide-react';

// Admin Panel Component
export default function AdminPanel({ user }) {
  const [activeSection, setActiveSection] = useState('resources');
  const [resources, setResources] = useState([
    { id: 1, name: 'Tents', quantity: 150, allocated: 45, threshold: 50, location: 'Central Warehouse', status: 'available' },
    { id: 2, name: 'Food Packages', quantity: 500, allocated: 120, threshold: 200, location: 'North Storage', status: 'available' },
    { id: 3, name: 'Medical Kits', quantity: 75, allocated: 30, threshold: 30, location: 'Medical Unit', status: 'low' },
    { id: 4, name: 'Water Bottles', quantity: 1000, allocated: 250, threshold: 300, location: 'East Warehouse', status: 'available' },
    { id: 5, name: 'Blankets', quantity: 300, allocated: 80, threshold: 100, location: 'Central Warehouse', status: 'available' },
  ]);

  const [shelters, setShelters] = useState([
    { id: 1, name: 'Central Shelter', capacity: 200, current: 45, location: 'Downtown', status: 'open', amenities: ['Electricity', 'Water', 'Medical'] },
    { id: 2, name: 'North Shelter', capacity: 150, current: 32, location: 'North District', status: 'open', amenities: ['Electricity', 'Water'] },
    { id: 3, name: 'East Shelter', capacity: 100, current: 28, location: 'East District', status: 'near_capacity', amenities: ['Electricity', 'Water', 'Food'] },
  ]);

  const [volunteers, setVolunteers] = useState([
    { id: 1, name: 'Amit Sharma', role: 'Medical Response', phone: '+91 98765 43210', email: 'amit@example.com', location: 'Downtown', status: 'available', skills: ['First Aid', 'CPR'] },
    { id: 2, name: 'Priya Patel', role: 'Rescue Operations', phone: '+91 98765 43211', email: 'priya@example.com', location: 'North District', status: 'available', skills: ['Rescue', 'Swimming'] },
    { id: 3, name: 'Rajesh Kumar', role: 'Logistics', phone: '+91 98765 43212', email: 'rajesh@example.com', location: 'East District', status: 'assigned', skills: ['Driving', 'Organization'] },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'earthquake', severity: 'high', location: 'Northern Region', message: 'Magnitude 5.2 detected', time: '2026-03-24T10:30:00', status: 'active' },
    { id: 2, type: 'rainfall', severity: 'medium', location: 'Coastal Area', message: '45mm expected', time: '2026-03-24T09:00:00', status: 'active' },
    { id: 3, type: 'flood', severity: 'medium', location: 'River Basin', message: 'Water levels rising', time: '2026-03-24T08:00:00', status: 'active' },
  ]);

  const [incidents, setIncidents] = useState([
    { id: 1, type: 'earthquake', location: 'Northern Region', date: '2026-03-23', magnitude: 5.2, affected: 150, status: 'resolved' },
    { id: 2, type: 'flood', location: 'River Basin', date: '2026-03-22', affected: 320, status: 'resolved' },
    { id: 3, type: 'landslide', location: 'Hill Area', date: '2026-03-21', affected: 45, status: 'ongoing' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAdd = (section) => {
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeSection === 'resources') setResources(resources.filter(r => r.id !== id));
      if (activeSection === 'shelters') setShelters(shelters.filter(s => s.id !== id));
      if (activeSection === 'volunteers') setVolunteers(volunteers.filter(v => v.id !== id));
      if (activeSection === 'alerts') setAlerts(alerts.filter(a => a.id !== id));
      if (activeSection === 'incidents') setIncidents(incidents.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing
      if (activeSection === 'resources') setResources(resources.map(r => r.id === editingItem.id ? { ...formData, id: r.id } : r));
      if (activeSection === 'shelters') setShelters(shelters.map(s => s.id === editingItem.id ? { ...formData, id: s.id } : s));
      if (activeSection === 'volunteers') setVolunteers(volunteers.map(v => v.id === editingItem.id ? { ...formData, id: v.id } : v));
      if (activeSection === 'alerts') setAlerts(alerts.map(a => a.id === editingItem.id ? { ...formData, id: a.id } : a));
      if (activeSection === 'incidents') setIncidents(incidents.map(i => i.id === editingItem.id ? { ...formData, id: i.id } : i));
    } else {
      // Add new
      const newId = Math.max(...(activeSection === 'resources' ? resources : activeSection === 'shelters' ? shelters : activeSection === 'volunteers' ? volunteers : activeSection === 'alerts' ? alerts : incidents).map(i => i.id), 0) + 1;
      const newItem = { ...formData, id: newId };
      if (activeSection === 'resources') setResources([...resources, newItem]);
      if (activeSection === 'shelters') setShelters([...shelters, newItem]);
      if (activeSection === 'volunteers') setVolunteers([...volunteers, newItem]);
      if (activeSection === 'alerts') setAlerts([...alerts, newItem]);
      if (activeSection === 'incidents') setIncidents([...incidents, newItem]);
    }
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    if (status === 'available' || status === 'open' || status === 'active') return 'text-green-400 bg-green-400/10';
    if (status === 'low' || status === 'near_capacity' || status === 'assigned') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const sections = [
    { id: 'resources', label: 'Resources', icon: Package, color: '#00D4FF' },
    { id: 'shelters', label: 'Shelters', icon: Home, color: '#7B2FFF' },
    { id: 'volunteers', label: 'Volunteers', icon: Users, color: '#00E57A' },
    { id: 'alerts', label: 'Alerts', icon: Bell, color: '#FFB020' },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle, color: '#FF3B5C' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">Manage resources, shelters, volunteers, alerts and incidents</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto pb-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeSection === section.id
                ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <section.icon size={18} style={{ color: section.color }} />
            <span className="text-sm">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white capitalize">{activeSection} Management</h2>
        <button
          onClick={() => handleAdd(activeSection)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm hover:bg-[#00D4FF]/90"
        >
          <Plus size={14} /> Add {activeSection.slice(0, -1)}
        </button>
      </div>

      {/* Resources Section */}
      {activeSection === 'resources' && (
        <div className="grid gap-4">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-[#00D4FF]" />
                  <h3 className="text-white font-medium">{resource.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(resource)} className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(resource.id)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><span className="text-gray-500">Quantity:</span> <span className="text-white">{resource.quantity}</span></div>
                <div><span className="text-gray-500">Allocated:</span> <span className="text-white">{resource.allocated}</span></div>
                <div><span className="text-gray-500">Available:</span> <span className="text-green-400">{resource.quantity - resource.allocated}</span></div>
                <div><span className="text-gray-500">Location:</span> <span className="text-white">{resource.location}</span></div>
              </div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${(resource.allocated / resource.quantity) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shelters Section */}
      {activeSection === 'shelters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shelters.map(shelter => (
            <div key={shelter.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Home size={20} className="text-[#7B2FFF]" />
                  <h3 className="text-white font-medium">{shelter.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(shelter.status)}`}>
                    {shelter.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(shelter)} className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(shelter.id)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Capacity:</span> <span className="text-white">{shelter.capacity}</span></div>
                <div><span className="text-gray-500">Occupancy:</span> <span className="text-white">{shelter.current}</span></div>
                <div><span className="text-gray-500">Available:</span> <span className="text-green-400">{shelter.capacity - shelter.current}</span></div>
                <div><span className="text-gray-500">Location:</span> <span className="text-white">{shelter.location}</span></div>
              </div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#7B2FFF] rounded-full" style={{ width: `${(shelter.current / shelter.capacity) * 100}%` }} />
              </div>
              <div className="mt-2 flex gap-1 flex-wrap">
                {shelter.amenities?.map(amenity => (
                  <span key={amenity} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{amenity}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteers Section */}
      {activeSection === 'volunteers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {volunteers.map(volunteer => (
            <div key={volunteer.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[#00E57A]" />
                  <h3 className="text-white font-medium">{volunteer.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(volunteer.status)}`}>
                    {volunteer.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(volunteer)} className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(volunteer.id)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Role:</span> <span className="text-white">{volunteer.role}</span></div>
                <div><span className="text-gray-500">Location:</span> <span className="text-white">{volunteer.location}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="text-white">{volunteer.phone}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="text-white">{volunteer.email}</span></div>
              </div>
              <div className="mt-2 flex gap-1 flex-wrap">
                {volunteer.skills?.map(skill => (
                  <span key={skill} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts Section */}
      {activeSection === 'alerts' && (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`bg-white/5 rounded-xl p-4 border-l-4 ${alert.severity === 'high' ? 'border-[#FF3B5C]' : alert.severity === 'medium' ? 'border-[#FFB020]' : 'border-[#00E57A]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {alert.type === 'earthquake' && <Activity size={20} className="text-[#FF3B5C]" />}
                  {alert.type === 'rainfall' && <CloudRain size={20} className="text-[#00D4FF]" />}
                  {alert.type === 'flood' && <Waves size={20} className="text-[#7B2FFF]" />}
                  <div>
                    <h3 className="text-white font-medium">{alert.message}</h3>
                    <p className="text-gray-500 text-sm">{alert.location} • {new Date(alert.time).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(alert)} className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(alert.id)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Incidents Section */}
      {activeSection === 'incidents' && (
        <div className="grid gap-4">
          {incidents.map(incident => (
            <div key={incident.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-[#FF3B5C]" />
                  <h3 className="text-white font-medium capitalize">{incident.type} Incident</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${incident.status === 'resolved' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                    {incident.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(incident)} className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(incident.id)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><span className="text-gray-500">Location:</span> <span className="text-white">{incident.location}</span></div>
                <div><span className="text-gray-500">Date:</span> <span className="text-white">{incident.date}</span></div>
                <div><span className="text-gray-500">Magnitude:</span> <span className="text-white">{incident.magnitude || 'N/A'}</span></div>
                <div><span className="text-gray-500">Affected:</span> <span className="text-white">{incident.affected} people</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? 'Edit' : 'Add'} {activeSection.slice(0, -1)}</h3>
            <div className="space-y-3">
              {activeSection === 'resources' && (
                <>
                  <input type="text" placeholder="Resource Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input type="number" placeholder="Quantity" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.quantity || ''} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })} />
                  <input type="text" placeholder="Location" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.status || 'available'} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="available">Available</option>
                    <option value="low">Low Stock</option>
                    <option value="critical">Critical</option>
                  </select>
                </>
              )}
              {activeSection === 'shelters' && (
                <>
                  <input type="text" placeholder="Shelter Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input type="number" placeholder="Capacity" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.capacity || ''} onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })} />
                  <input type="text" placeholder="Location" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                </>
              )}
              {activeSection === 'volunteers' && (
                <>
                  <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input type="text" placeholder="Role" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                  <input type="text" placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2 bg-[#00D4FF] text-gray-900 rounded-lg">Save</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gray-800 text-gray-300 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}