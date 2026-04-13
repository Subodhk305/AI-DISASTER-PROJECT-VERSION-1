import React, { useState } from 'react';
import { ClipboardList, MapPin, Calendar, Clock, Users, CheckCircle, AlertCircle, UserCheck } from 'lucide-react';

export default function AssignmentsPage() {
  const [assignments] = useState([
    { id: 1, task: 'Evacuation Center Setup', location: 'Central Shelter', assignedTo: 'Amit Sharma', deadline: '2026-03-25', status: 'in-progress', priority: 'high', volunteers: 5 },
    { id: 2, task: 'Medical Camp Operations', location: 'North Zone', assignedTo: 'Priya Patel', deadline: '2026-03-26', status: 'pending', priority: 'medium', volunteers: 8 },
    { id: 3, task: 'Resource Distribution', location: 'East District', assignedTo: 'Rajesh Kumar', deadline: '2026-03-24', status: 'completed', priority: 'high', volunteers: 3 },
    { id: 4, task: 'Search & Rescue', location: 'Western Hills', assignedTo: 'Vikram Singh', deadline: '2026-03-27', status: 'in-progress', priority: 'critical', volunteers: 12 },
    { id: 5, task: 'Communication Setup', location: 'Command Center', assignedTo: 'Sunita Reddy', deadline: '2026-03-23', status: 'completed', priority: 'medium', volunteers: 2 },
  ]);

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return 'text-[#FF3B5C] bg-[#FF3B5C]/10';
    if (priority === 'high') return 'text-[#FFB020] bg-[#FFB020]/10';
    return 'text-[#00E57A] bg-[#00E57A]/10';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Assignments</h1>
        <p className="text-gray-400 text-sm">Task assignments and volunteer deployment</p>
      </div>

      <div className="space-y-3">
        {assignments.map(assignment => (
          <div key={assignment.id} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <ClipboardList size={20} className="text-[#00D4FF]" />
                <div><h3 className="text-white font-medium">{assignment.task}</h3><p className="text-gray-400 text-sm">Assigned to: {assignment.assignedTo}</p></div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(assignment.priority)}`}>{assignment.priority.toUpperCase()}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${assignment.status === 'completed' ? 'text-[#00E57A] bg-[#00E57A]/10' : assignment.status === 'in-progress' ? 'text-[#FFB020] bg-[#FFB020]/10' : 'text-[#FF3B5C] bg-[#FF3B5C]/10'}`}>{assignment.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-sm">
              <div className="flex items-center gap-2"><MapPin size={12} /><span className="text-gray-400">Location:</span><span className="text-white">{assignment.location}</span></div>
              <div className="flex items-center gap-2"><Calendar size={12} /><span className="text-gray-400">Deadline:</span><span className="text-white">{assignment.deadline}</span></div>
              <div className="flex items-center gap-2"><Users size={12} /><span className="text-gray-400">Volunteers:</span><span className="text-white">{assignment.volunteers}</span></div>
              <div className="flex items-center gap-2"><UserCheck size={12} /><span className="text-gray-400">Lead:</span><span className="text-white">{assignment.assignedTo}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}