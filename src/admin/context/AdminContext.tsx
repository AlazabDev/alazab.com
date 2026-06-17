import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Dashboard, NotificationAlert, AdminUser } from '../types/index';

interface AdminContextType {
  currentUser: AdminUser | null;
  dashboard: Dashboard | null;
  notifications: NotificationAlert[];
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  
  // Actions
  setCurrentUser: (user: AdminUser | null) => void;
  setDashboard: (dashboard: Dashboard) => void;
  addNotification: (notification: NotificationAlert) => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
  refreshDashboard: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminState {
  currentUser: AdminUser | null;
  dashboard: Dashboard | null;
  notifications: NotificationAlert[];
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
}

type AdminAction = 
  | { type: 'SET_CURRENT_USER'; payload: AdminUser | null }
  | { type: 'SET_DASHBOARD'; payload: Dashboard }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationAlert }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLEAR_NOTIFICATIONS' };

const initialState: AdminState = {
  currentUser: null,
  dashboard: null,
  notifications: [],
  loading: false,
  error: null,
  sidebarOpen: true,
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_DASHBOARD':
      return { ...state, dashboard: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const setCurrentUser = (user: AdminUser | null) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const setDashboard = (dashboard: Dashboard) => {
    dispatch({ type: 'SET_DASHBOARD', payload: dashboard });
  };

  const addNotification = (notification: NotificationAlert) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    
    // Auto-remove after 5 seconds
    if (notification.type !== 'error') {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      // TODO: Fetch dashboard data from API
      // const response = await fetch('/api/v1/admin/dashboard');
      // const data = await response.json();
      // setDashboard(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh dashboard');
    } finally {
      setLoading(false);
    }
  };

  const value: AdminContextType = {
    ...state,
    setCurrentUser,
    setDashboard,
    addNotification,
    removeNotification,
    setLoading,
    setError,
    toggleSidebar,
    refreshDashboard,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
