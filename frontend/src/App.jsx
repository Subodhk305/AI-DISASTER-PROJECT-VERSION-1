import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Sidebar from './components/Layout/Sidebar';
import './index.css';

// Import all 29 pages
import DashboardPage from './pages/DashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import DisasterMapPage from './pages/DisasterMapPage';
import TaskManagementPage from './pages/TaskManagementPage';
import EvacuationRoutesPage from './pages/EvacuationRoutesPage';
import ZonePlanningPage from './pages/ZonePlanningPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import StaffManagementPage from './pages/StaffManagementPage';
import EmergencyTeamsPage from './pages/EmergencyTeamsPage';
import VolunteerListPage from './pages/VolunteerListPage';
import RegisterVolunteerPage from './pages/RegisterVolunteerPage';
import TrainingRecordsPage from './pages/TrainingRecordsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import EquipmentInventoryPage from './pages/EquipmentInventoryPage';
import StorageManagementPage from './pages/StorageManagementPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import WarehouseManagementPage from './pages/WarehouseManagementPage';
import ContainerSheltersPage from './pages/ContainerSheltersPage';
import TentCitiesPage from './pages/TentCitiesPage';
import EvacuationCentersPage from './pages/EvacuationCentersPage';
import CapacityManagementPage from './pages/CapacityManagementPage';
import IncidentReportsPage from './pages/IncidentReportsPage';
import ResourceUtilizationPage from './pages/ResourceUtilizationPage';
import PerformanceMetricsPage from './pages/PerformanceMetricsPage';
import SystemLogsPage from './pages/SystemLogsPage';
import GeneralSettingsPage from './pages/GeneralSettingsPage';
import UserManagementPage from './pages/UserManagementPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import APIIntegrationsPage from './pages/APIIntegrationsPage';
import HelpPage from './pages/HelpPage';
import AdminPanel from './pages/AdminPanel';

// Auth Service
const authService = {
  login: (email, password) => {
    if (email === 'admin@disaster.com' && password === 'admin123') {
      const user = { id: '1', name: 'Admin User', email, role: 'admin' };
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }
    if (email === 'user@example.com' && password === 'user123') {
      const user = { id: '2', name: 'Test User', email, role: 'user' };
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = authService.getCurrentUser();
    setUser(userData);
    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    const result = authService.login(email, password);
    if (result.success) {
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030308] to-[#0f0f1a]">
        <div className="w-12 h-12 border-4 border-white/20 border-t-[#00D4FF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={() => {}} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar user={user} onLogout={handleLogout} />
        <div className="flex-1 overflow-auto">
          <Routes>
            {/* Main Pages */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alerts" element={<NotificationsPage />} />
            <Route path="/map" element={<DisasterMapPage />} />
            <Route path="/tasks" element={<TaskManagementPage />} />
            
            {/* Planning Pages */}
            <Route path="/planning/evacuation" element={<EvacuationRoutesPage />} />
            <Route path="/planning/zones" element={<ZonePlanningPage />} />
            <Route path="/planning/risk" element={<RiskAssessmentPage />} />
            
            {/* Personnel Management Pages */}
            <Route path="/personnel/staff" element={<StaffManagementPage />} />
            <Route path="/personnel/emergency" element={<EmergencyTeamsPage />} />
            
            {/* Volunteer Management Pages */}
            <Route path="/volunteers/list" element={<VolunteerListPage />} />
            <Route path="/volunteers/register" element={<RegisterVolunteerPage />} />
            <Route path="/volunteers/training" element={<TrainingRecordsPage />} />
            <Route path="/volunteers/assignments" element={<AssignmentsPage />} />
            
            {/* Equipment & Inventory Pages */}
            <Route path="/equipment/list" element={<EquipmentInventoryPage />} />
            <Route path="/storage/main" element={<StorageManagementPage />} />
            <Route path="/inventory/food" element={<InventoryManagementPage />} />
            <Route path="/warehouse" element={<WarehouseManagementPage />} />
            
            {/* Shelter Management Pages */}
            <Route path="/shelters/containers" element={<ContainerSheltersPage />} />
            <Route path="/shelters/tent-cities" element={<TentCitiesPage />} />
            <Route path="/shelters/evacuation" element={<EvacuationCentersPage />} />
            <Route path="/shelters/capacity" element={<CapacityManagementPage />} />
            
            {/* Reports & Analytics Pages */}
            <Route path="/reports/incidents" element={<IncidentReportsPage />} />
            <Route path="/reports/resource" element={<ResourceUtilizationPage />} />
            <Route path="/reports/performance" element={<PerformanceMetricsPage />} />
            <Route path="/reports/logs" element={<SystemLogsPage />} />
            
            {/* Settings Pages */}
            <Route path="/settings/general" element={<GeneralSettingsPage />} />
            <Route path="/settings/users" element={<UserManagementPage />} />
            <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
            <Route path="/settings/integrations" element={<APIIntegrationsPage />} />
            
            {/* Additional Pages */}
            <Route path="/help" element={<HelpPage />} />
            <Route path="/admin" element={<AdminPanel user={user} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;