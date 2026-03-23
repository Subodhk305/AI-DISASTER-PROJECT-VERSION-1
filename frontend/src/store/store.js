import { create } from 'zustand';

export const useStore = create((set) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Alerts state
  alerts: [],
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 20) })),
  clearAlerts: () => set({ alerts: [] }),
  
  // Predictions state
  predictions: null,
  setPredictions: (predictions) => set({ predictions }),
  
  // Map state
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  
  // UI state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  // Loading state
  loading: false,
  setLoading: (loading) => set({ loading }),
}));