import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export const FeaturesBar = ({ onOpenPolicy, onOpenContact }) => {
  const features = [
    {
      id: 'shipping',
      icon: <Truck size={24} color="#FF6B00" />,
      title: 'Free Delivery',
      description: 'On all orders above ₹499 across India',
      action: () => onOpenPolicy && onOpenPolicy('shipping'),
    },
    {
      id: 'returns',
      icon: <RotateCcw size={24} color="#FF6B00" />,
      title: 'Easy Returns',
      description: 'Hassle-free 7 days return & refund',
      action: () => onOpenPolicy && onOpenPolicy('returns'),
    },
    {
      id: 'privacy',
      icon: <ShieldCheck size={24} color="#FF6B00" />,
      title: '100% Secure Checkout',
      description: 'UPI, Cards, EMI & COD with 256-bit SSL',
      action: () => onOpenPolicy && onOpenPolicy('privacy'),
    },
    {
      id: 'support',
      icon: <Headphones size={24} color="#FF6B00" />,
      title: '24/7 Dedicated Support',
      description: 'Call or chat anytime for order help',
      action: () => onOpenContact && onOpenContact(),
    },
  ];

  return (
    <section style={{
      padding: '40px 0',
      background: '#FFFFFF',
      borderTop: '1px solid #F1F5F9',
      borderBottom: '1px solid #F1F5F9',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }} className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={f.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                background: '#F8FAFC',
                border: '1px solid #F1F5F9',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#FFE4D3';
                e.currentTarget.style.background = '#FFFDFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#F1F5F9';
                e.currentTarget.style.background = '#F8FAFC';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: '#FFF3EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#061224', marginBottom: '2px' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.4 }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
