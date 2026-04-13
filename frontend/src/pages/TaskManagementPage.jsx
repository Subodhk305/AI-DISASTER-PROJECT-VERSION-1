import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, Users, MapPin, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Evacuation Planning - Northern Region', priority: 'high', status: 'in-progress', location: 'Northern Region', deadline: '2026-03-25', assignedTo: 'Emergency Team A', progress: 65, description: 'Plan and coordinate evacuation of 5000 residents' },
    { id: 2, title: 'Resource Allocation - Coastal Area', priority: 'medium', status: 'pending', location: 'Coastal Area', deadline: '2026-03-26', assignedTo: 'Logistics Team', progress: 30, description: 'Allocate food, water, and medical supplies' },
    { id: 3, title: 'Team Coordination - Command Center', priority: 'low', status: 'completed', location: 'Central Command', deadline: '2026-03-23', assignedTo: 'All Teams', progress: 100, description: 'Coordinate response teams and communication' },
    { id: 4, title: 'Shelter Setup - East District', priority: 'high', status: 'in-progress', location: 'East District', deadline: '2026-03-24', assignedTo: 'Shelter Management', progress: 80, description: 'Set up temporary shelters for 2000 people' },
    { id: 5, title: 'Medical Camp Setup - North Zone', priority: 'medium', status: 'pending', location: 'North Zone', deadline: '2026-03-27', assignedTo: 'Medical Team', progress: 20, description: 'Establish medical camps with 50 beds each' },
    { id: 6, title: 'Search & Rescue Operations', priority: 'high', status: 'in-progress', location: 'Western Hills', deadline: '2026-03-24', assignedTo: 'Rescue Team', progress: 45, description: 'Search for missing persons in affected areas' },
  ]);

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
    if (priority === 'medium') return 'text-[#FFB020] bg-[#FFB020]/10';
    return 'text-[#00E57A] bg-[#00E57A]/10';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle size={16} className="text-[#00E57A]" />;
    if (status === 'in-progress') return <Clock size={16} className="text-[#FFB020]" />;
    return <AlertTriangle size={16} className="text-[#FF3B5C]" />;
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Task Management</h1>
            <p className="text-gray-400 text-sm">Manage and track disaster response tasks</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00D4FF] text-gray-900 rounded-lg text-sm"><Plus size={14} /> Create Task</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-white">{stats.total}</div><p className="text-gray-400 text-sm">Total Tasks</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#00E57A]">{stats.completed}</div><p className="text-gray-400 text-sm">Completed</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FFB020]">{stats.inProgress}</div><p className="text-gray-400 text-sm">In Progress</p></div>
        <div className="bg-white/5 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-[#FF3B5C]">{stats.pending}</div><p className="text-gray-400 text-sm">Pending</p></div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}
                <h3 className="text-white font-medium">{task.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>{task.priority.toUpperCase()}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-gray-400 hover:text-[#00D4FF]"><Edit size={14} /></button>
                <button className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">{task.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-500" /><span className="text-gray-400">Location:</span><span className="text-white">{task.location}</span></div>
              <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-500" /><span className="text-gray-400">Deadline:</span><span className="text-white">{task.deadline}</span></div>
              <div className="flex items-center gap-2"><Users size={14} className="text-gray-500" /><span className="text-gray-400">Assigned:</span><span className="text-white">{task.assignedTo}</span></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{task.progress}%</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#00D4FF] rounded-full" style={{ width: `${task.progress}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}