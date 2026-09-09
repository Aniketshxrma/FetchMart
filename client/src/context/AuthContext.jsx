import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { API_BASE_URL } from '../config/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fetchmart_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile'); // 'profile' | 'orders' | 'addresses' | 'wishlist' | 'notifications'
  const [userOrders, setUserOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const { addToast } = useToast();

  // Keep localStorage active user in sync
  useEffect(() => {
    if (user) {
      localStorage.setItem('fetchmart_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('fetchmart_active_user');
    }
  }, [user]);

  // Fetch fresh profile and orders whenever user is logged in
  const refreshProfile = async () => {
    if (!user || (!user.id && !user._id && !user.email)) return;
    const identifier = user._id || user.id || user.email;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/${encodeURIComponent(identifier)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      }
    } catch (err) {
      console.warn('Could not refresh profile from server', err);
    }
  };

  // Fetch real order history from MongoDB for the logged in user
  const fetchUserOrders = async () => {
    if (!user || !user.email) return;
    setIsLoadingOrders(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/user/${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.orders) {
          setUserOrders(data.orders);
        }
      }
    } catch (err) {
      console.warn('Could not fetch user orders', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchUserOrders();
    } else {
      setUserOrders([]);
    }
  }, [user?.email]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        addToast(`Welcome back, ${data.user.name}! 👋`, 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Login failed', 'error');
        return { success: false, message: data.message };
      }
    } catch (e) {
      addToast('Cannot connect to server. Please check backend is running.', 'error');
      return { success: false, message: e.message };
    }
  };

  const register = async ({ name, email, password, phone, dateOfBirth, gender }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, dateOfBirth, gender }),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        addToast(`Account created! Welcome, ${data.user.name}! 🎉`, 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Registration failed', 'error');
        return { success: false, message: data.message };
      }
    } catch (e) {
      addToast('Cannot connect to server. Please check backend is running.', 'error');
      return { success: false, message: e.message };
    }
  };

  const updateProfile = async (updatedFields) => {
    if (!user) return { success: false };
    const userId = user._id || user.id;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        addToast('Profile updated successfully in MongoDB! ✨', 'success');
        return { success: true, user: data.user };
      } else {
        addToast(data.message || 'Update failed', 'error');
        return { success: false, message: data.message };
      }
    } catch (e) {
      addToast('Error saving profile changes to server.', 'error');
      return { success: false, message: e.message };
    }
  };

  const addAddress = async (addressData) => {
    if (!user) return { success: false };
    const userId = user._id || user.id;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/address/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        addToast('New address saved to your account! 📍', 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Failed to add address', 'error');
        return { success: false };
      }
    } catch (e) {
      addToast('Error saving address', 'error');
      return { success: false };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    if (!user) return { success: false };
    const userId = user._id || user.id;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/address/${userId}/${addressId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        addToast('Address updated successfully! 📍', 'success');
        return { success: true };
      } else {
        addToast(data.message || 'Failed to update address', 'error');
        return { success: false };
      }
    } catch (e) {
      addToast('Error updating address', 'error');
      return { success: false };
    }
  };

  const deleteAddress = async (addressId) => {
    if (!user) return { success: false };
    const userId = user._id || user.id;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/address/${userId}/${addressId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        addToast('Address removed', 'info');
        return { success: true };
      }
    } catch (e) {
      addToast('Error removing address', 'error');
    }
  };

  const logout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setUserOrders([]);
    addToast('Logged out successfully', 'info');
  };

  const openProfileWithTab = (tab = 'profile') => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    setActiveProfileTab(tab);
    setIsProfileOpen(true);
    fetchUserOrders();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isProfileOpen,
        setIsProfileOpen,
        activeProfileTab,
        setActiveProfileTab,
        openProfileWithTab,
        userOrders,
        isLoadingOrders,
        fetchUserOrders,
        login,
        register,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        refreshProfile,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
