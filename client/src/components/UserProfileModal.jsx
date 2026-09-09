import React, { useState, useRef } from 'react';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Bell,
  LogOut,
  Edit3,
  Home,
  Plus,
  Trash2,
  CheckCircle,
  X,
  Calendar,
  Phone,
  Mail,
  Shield,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Tag,
  ArrowLeft,
  Camera,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const UserProfileModal = () => {
  const {
    user,
    isProfileOpen,
    setIsProfileOpen,
    activeProfileTab,
    setActiveProfileTab,
    userOrders,
    isLoadingOrders,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    logout
  } = useAuth();

  const { wishlistItems, toggleWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  // Edit Profile Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    avatar: '',
  });

  // Add/Edit Address Form State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  const fileInputRef = useRef(null);

  if (!isProfileOpen || !user) return null;

  const defaultAddress = user.addresses?.find(a => a.isDefault) || user.addresses?.[0];

  const handleOpenEditProfile = () => {
    setEditForm({
      name: user.name || '',
      phone: user.phone || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || 'Male',
      avatar: user.avatar || '',
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(editForm);
    setIsEditingProfile(false);
  };

  // Image Upload handler (Resizes & converts file to crisp Base64 data URL)
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High quality canvas avatar compression (max 400x400)
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);

        setEditForm((prev) => ({ ...prev, avatar: compressedBase64 }));

        // Save immediately to MongoDB Atlas for this user
        updateProfile({ avatar: compressedBase64 });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);

    // Reset input so same image can be reselected if desired
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    await addAddress(addressForm);
    setIsAddressModalOpen(false);
    setAddressForm({
      label: 'Home',
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    });
  };

  const handleSetDefaultAddress = async (addrId) => {
    await updateAddress(addrId, { isDefault: true });
  };

  // User initials for avatar if no image
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: '#F8FAFC',
      overflowY: 'auto',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Top Sticky Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
            <button
              onClick={() => setIsProfileOpen(false)}
              style={{
                color: '#64748B',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
            >
              <ArrowLeft size={16} /> Home
            </button>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>My Account</span>
          </div>

          {/* Close / Return to Store button */}
          <button
            onClick={() => setIsProfileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: '#F1F5F9',
              color: '#334155',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <X size={16} />
            <span>Close Account</span>
          </button>
        </div>
      </div>

      {/* Main Account Content Container */}
      <div className="container" style={{ padding: '32px 16px 64px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '28px',
          alignItems: 'start'
        }} className="profile-layout-grid">

          {/* LEFT SIDEBAR */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* User Avatar & Name Banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()} title="Click to change profile picture">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #FF881A',
                      boxShadow: '0 4px 12px rgba(255, 107, 0, 0.15)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)'
                  }}>
                    {getInitials(user.name)}
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF'
                }}>
                  <Camera size={11} />
                </div>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h2 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.name}
                </h2>
                <p style={{
                  fontSize: '0.82rem',
                  color: '#64748B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.email}
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FF6B00',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <Upload size={10} /> Change Photo
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* My Profile */}
              <button
                onClick={() => setActiveProfileTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: activeProfileTab === 'profile' ? '#FF6B00' : '#475569',
                  background: activeProfileTab === 'profile' ? '#FFF5ED' : 'transparent',
                  border: activeProfileTab === 'profile' ? '1.5px solid #FFD8BF' : '1.5px solid transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <UserIcon size={18} color={activeProfileTab === 'profile' ? '#FF6B00' : '#64748B'} />
                <span>My Profile</span>
              </button>

              {/* My Orders */}
              <button
                onClick={() => setActiveProfileTab('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: activeProfileTab === 'orders' ? '#FF6B00' : '#475569',
                  background: activeProfileTab === 'orders' ? '#FFF5ED' : 'transparent',
                  border: activeProfileTab === 'orders' ? '1.5px solid #FFD8BF' : '1.5px solid transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <Package size={18} color={activeProfileTab === 'orders' ? '#FF6B00' : '#64748B'} />
                <span>My Orders</span>
              </button>

              {/* Saved Addresses */}
              <button
                onClick={() => setActiveProfileTab('addresses')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: activeProfileTab === 'addresses' ? '#FF6B00' : '#475569',
                  background: activeProfileTab === 'addresses' ? '#FFF5ED' : 'transparent',
                  border: activeProfileTab === 'addresses' ? '1.5px solid #FFD8BF' : '1.5px solid transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <MapPin size={18} color={activeProfileTab === 'addresses' ? '#FF6B00' : '#64748B'} />
                <span>Saved Addresses</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setActiveProfileTab('wishlist')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: activeProfileTab === 'wishlist' ? '#FF6B00' : '#475569',
                  background: activeProfileTab === 'wishlist' ? '#FFF5ED' : 'transparent',
                  border: activeProfileTab === 'wishlist' ? '1.5px solid #FFD8BF' : '1.5px solid transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <Heart size={18} color={activeProfileTab === 'wishlist' ? '#FF6B00' : '#64748B'} />
                <span>Wishlist ({wishlistItems.length})</span>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setActiveProfileTab('notifications')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: activeProfileTab === 'notifications' ? '#FF6B00' : '#475569',
                  background: activeProfileTab === 'notifications' ? '#FFF5ED' : 'transparent',
                  border: activeProfileTab === 'notifications' ? '1.5px solid #FFD8BF' : '1.5px solid transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <Bell size={18} color={activeProfileTab === 'notifications' ? '#FF6B00' : '#64748B'} />
                <span>Notifications</span>
              </button>
            </div>

            {/* Logout Option */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: '#EF4444',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.2s ease',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <LogOut size={18} color="#EF4444" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* 1. TOP SUMMARY METRIC CARDS - LIVE REAL DATA ONLY */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }} className="profile-stats-grid">
              {/* Orders Stat */}
              <div
                onClick={() => setActiveProfileTab('orders')}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 18px -2px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px -2px rgba(0,0,0,0.03)'; }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#FFF3EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF6B00'
                }}>
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Orders</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                    {userOrders.length}
                  </div>
                </div>
              </div>

              {/* Wishlist Stat */}
              <div
                onClick={() => setActiveProfileTab('wishlist')}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 18px -2px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px -2px rgba(0,0,0,0.03)'; }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#FFF3EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF6B00'
                }}>
                  <Heart size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Wishlist</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                    {wishlistItems.length}
                  </div>
                </div>
              </div>

              {/* Coupons Stat */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 18px -2px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#FFF3EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF6B00'
                }}>
                  <Tag size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Coupons</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                    {user.coupons?.length || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: MY PROFILE */}
            {activeProfileTab === 'profile' && (
              <>
                {/* Personal Information Card */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '28px',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Personal Information</h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>Manage your personal details</p>
                    </div>

                    <button
                      onClick={handleOpenEditProfile}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 18px',
                        borderRadius: '12px',
                        border: '1.5px solid #FF881A',
                        color: '#FF6B00',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        background: '#FFFFFF',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FFF3EB'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
                    >
                      <Edit3 size={16} />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  {/* 2-Column Info Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px 32px'
                  }} className="profile-details-grid">
                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#64748B' }}>Full Name</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                        {user.name}
                      </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#64748B' }}>Email Address</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                        {user.email}
                      </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#64748B' }}>Phone Number</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                        {user.phone || 'Not provided'}
                      </div>
                    </div>

                    <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#64748B' }}>Date of Birth</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                        {user.dateOfBirth || 'Not provided'}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#64748B' }}>Gender</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                        {user.gender || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Default Address Card */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px 32px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569'
                      }}>
                        <Home size={20} />
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>Default Address</h4>
                    </div>

                    <button
                      onClick={() => setActiveProfileTab('addresses')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#334155',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                    >
                      Manage Addresses <ChevronRight size={16} />
                    </button>
                  </div>

                  <div style={{ paddingLeft: '56px' }}>
                    {defaultAddress ? (
                      <>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>
                          {defaultAddress.label || 'Home'}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '0.88rem', marginTop: '4px', lineHeight: 1.5 }}>
                          {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}, {defaultAddress.country || 'India'}
                        </div>
                      </>
                    ) : (
                      <div style={{ color: '#64748B', fontSize: '0.88rem' }}>
                        No delivery address added yet. Click <strong style={{ color: '#FF6B00', cursor: 'pointer' }} onClick={() => setIsAddressModalOpen(true)}>Add Address</strong> to save your address.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* TAB CONTENT: MY ORDERS */}
            {activeProfileTab === 'orders' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Order History ({userOrders.length})</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>Track and manage your orders</p>
                </div>

                {isLoadingOrders ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading your orders...</div>
                ) : userOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Package size={48} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontWeight: 700, color: '#0F172A' }}>No orders placed yet</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>When you purchase products, they will appear here with tracking status.</p>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="btn-primary"
                      style={{ marginTop: '16px', padding: '10px 24px' }}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {userOrders.map((ord) => (
                      <div
                        key={ord._id || ord.trackingId}
                        style={{
                          border: '1px solid #E2E8F0',
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <span style={{ fontWeight: 700, color: '#0F172A' }}>Order #{ord.trackingId}</span>
                            <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: '10px' }}>
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <div style={{
                            background: '#FFF5ED',
                            color: '#FF6B00',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            padding: '4px 12px',
                            borderRadius: '9999px'
                          }}>
                            {ord.status || 'Order Placed'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {ord.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#334155' }}>
                              <span>{item.title} × {item.quantity}</span>
                              <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Total Amount:</span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                            ₹{ord.pricing?.total?.toLocaleString('en-IN') || '0'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SAVED ADDRESSES */}
            {activeProfileTab === 'addresses' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Saved Delivery Addresses</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>Manage delivery locations for one-click checkout</p>
                  </div>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                  >
                    <Plus size={16} /> Add Address
                  </button>
                </div>

                {(!user.addresses || user.addresses.length === 0) ? (
                  <div style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                    <MapPin size={40} color="#CBD5E1" style={{ margin: '0 auto 8px' }} />
                    <p>No addresses saved yet.</p>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="btn-secondary"
                      style={{ marginTop: '12px', padding: '8px 18px', fontSize: '0.88rem' }}
                    >
                      + Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                    {user.addresses.map((addr) => (
                      <div
                        key={addr._id || addr.id}
                        style={{
                          border: addr.isDefault ? '2px solid #FF6B00' : '1px solid #E2E8F0',
                          background: addr.isDefault ? '#FFFBF8' : '#FFFFFF',
                          borderRadius: '16px',
                          padding: '20px',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '14px'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              color: '#0F172A',
                              background: '#F1F5F9',
                              padding: '4px 10px',
                              borderRadius: '8px'
                            }}>
                              {addr.label || 'Home'}
                            </span>
                            {addr.isDefault && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF6B00', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle size={14} /> Default
                              </span>
                            )}
                          </div>

                          <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                            <div>{addr.street}</div>
                            <div>{addr.city}, {addr.state} - {addr.pincode}</div>
                            <div>{addr.country || 'India'}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                          {!addr.isDefault ? (
                            <button
                              onClick={() => handleSetDefaultAddress(addr._id || addr.id)}
                              style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FF6B00', background: 'transparent' }}
                            >
                              Set as Default
                            </button>
                          ) : <div />}

                          <button
                            onClick={() => deleteAddress(addr._id || addr.id)}
                            style={{ color: '#EF4444', background: 'transparent', padding: '4px' }}
                            title="Delete address"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: WISHLIST */}
            {activeProfileTab === 'wishlist' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>My Saved Wishlist ({wishlistItems.length})</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>Items saved in your account</p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Heart size={48} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontWeight: 700, color: '#0F172A' }}>Your wishlist is empty</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>Explore products and tap the heart icon to save them here.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {wishlistItems.map((prod) => (
                      <div
                        key={prod._id || prod.id}
                        style={{
                          border: '1px solid #E2E8F0',
                          borderRadius: '16px',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <img
                            src={prod.image}
                            alt={prod.title}
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', background: '#F8FAFC' }}
                          />
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {prod.title}
                          </div>
                          <div style={{ color: '#FF6B00', fontWeight: 800, fontSize: '1.05rem', marginTop: '4px' }}>
                            ₹{prod.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                          <button
                            onClick={() => moveToCart(prod)}
                            className="btn-primary"
                            style={{ flex: 1, padding: '8px', fontSize: '0.82rem' }}
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(prod)}
                            style={{ padding: '8px', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#EF4444' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: NOTIFICATIONS */}
            {activeProfileTab === 'notifications' && (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Notifications</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>Latest updates regarding your account</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '16px', borderRadius: '14px', background: '#FFF5ED', border: '1px solid #FFD8BF' }}>
                    <div style={{ fontWeight: 700, color: '#FF6B00', fontSize: '0.95rem' }}>✨ Welcome Discount Available</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>Use code <strong>FETCH10</strong> at checkout for 10% instant discount.</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          background: 'rgba(6, 18, 36, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '480px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Edit Personal Details</h3>
              <button onClick={() => setIsEditingProfile(false)} style={{ color: '#64748B', background: 'transparent' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Photo selector in edit modal */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Profile Photo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {editForm.avatar ? (
                    <img src={editForm.avatar} alt="Preview" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#FF6B00', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {getInitials(editForm.name)}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                  >
                    <Upload size={14} /> Upload New Photo
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Date of Birth</label>
                <input
                  type="text"
                  placeholder="e.g. 14 May 2005"
                  value={editForm.dateOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Gender</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          background: 'rgba(6, 18, 36, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '480px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Add Delivery Address</h3>
              <button onClick={() => setIsAddressModalOpen(false)} style={{ color: '#64748B', background: 'transparent' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveAddress} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Address Label</label>
                <select
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Flat / House No / Street *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123, Green Park Avenue, Malviya Nagar"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="110017"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Country</label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', background: '#F8FAFC' }}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#FF6B00' }}
                />
                Set as default delivery address
              </label>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
