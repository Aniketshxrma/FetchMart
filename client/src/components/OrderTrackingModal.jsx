import React, { useState, useEffect } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, Home, MapPin } from 'lucide-react';
import { trackOrder } from '../services/api';

export const OrderTrackingModal = ({ isOpen, onClose, initialTrackingId }) => {
  const [trackingId, setTrackingId] = useState(initialTrackingId || 'FM-849201');
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const idToSearch = initialTrackingId || trackingId || 'FM-849201';
      setTrackingId(idToSearch);
      fetchTracking(idToSearch);
    }
  }, [isOpen, initialTrackingId]);

  const fetchTracking = async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await trackOrder(id);
      if (res.success && res.order) {
        setOrderData(res.order);
      }
    } catch (err) {
      console.warn('Tracking query error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTracking(trackingId);
  };

  if (!isOpen) return null;

  const stages = [
    { title: 'Order Placed', desc: 'Order verified & recorded', icon: <Package size={16} />, completed: true },
    { title: 'Confirmed & Packed', desc: 'Securely packaged at warehouse', icon: <CheckCircle2 size={16} />, completed: true },
    { title: 'Shipped / In Transit', desc: 'Dispatched via Express Courier', icon: <Truck size={16} />, completed: true },
    { title: 'Out for Delivery', desc: 'Delivery partner is en route', icon: <MapPin size={16} />, completed: true },
    { title: 'Delivered', desc: 'Package delivered at doorstep', icon: <Home size={16} />, completed: false },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 350,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(6, 18, 36, 0.75)',
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '640px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
        zIndex: 360,
        padding: '32px',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close tracking"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
          }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Truck size={24} color="#FF6B00" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061224' }}>
            Live Order Tracking
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
          Enter your FetchMart order tracking ID to check real-time courier status.
        </p>

        {/* Tracking Search Input */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          <input
            type="text"
            placeholder="e.g. FM-849201"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '12px 22px', fontSize: '0.9rem', flexShrink: 0 }}
          >
            <Search size={16} />
            <span>Track</span>
          </button>
        </form>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#FF6B00', fontWeight: 600 }}>
            Fetching live shipment location...
          </div>
        ) : (
          <div>
            {/* Status Highlight Card */}
            <div style={{
              padding: '18px 20px',
              background: '#FFF8F3',
              border: '1.5px solid #FFE4D3',
              borderRadius: '16px',
              marginBottom: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', marginBottom: '2px' }}>
                  Current Status
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061224' }}>
                  {orderData?.status || 'Out for Delivery'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                  Destination: {orderData?.shippingAddress?.city || 'Kangra, HP'}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Estimated Arrival</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10B981' }}>
                  Today, before 7:00 PM
                </div>
              </div>
            </div>

            {/* Visual 5-Stage Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '8px' }}>
              {stages.map((stg, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                  
                  {/* Icon Node */}
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: stg.completed ? '#10B981' : '#E2E8F0',
                    color: stg.completed ? '#FFFFFF' : '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 2,
                    boxShadow: stg.completed ? '0 0 0 4px #D1FAE5' : 'none',
                  }}>
                    {stg.completed ? <CheckCircle2 size={18} /> : <Clock size={16} />}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: stg.completed ? '#061224' : '#94A3B8',
                    }}>
                      {stg.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                      {stg.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
