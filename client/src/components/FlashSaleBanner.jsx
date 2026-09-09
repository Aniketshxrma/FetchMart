import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight } from 'lucide-react';

export const FlashSaleBanner = ({ onShopSale }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n) => String(n).padStart(2, '0');

  return (
    <section style={{
      padding: '24px 0',
      background: 'linear-gradient(135deg, #FF6B00 0%, #E55B00 100%)',
      color: '#FFFFFF',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Left: Banner Callout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
            }}>
              <Zap size={24} fill="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.01em', fontFamily: "'Outfit', sans-serif" }}>
                ⚡ Super Deals of the Day — Flat up to 60% OFF
              </div>
              <div style={{ fontSize: '0.85rem', color: '#FFE0CC' }}>
                Exclusive limited-time flash discount on smart wearables, wireless audio & sneakers.
              </div>
            </div>
          </div>

          {/* Right: Countdown & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Timer Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="#FFE0CC" style={{ marginRight: '2px' }} />
              <div style={{ background: '#061224', padding: '6px 10px', borderRadius: '8px', fontWeight: 800, fontSize: '0.95rem' }}>
                {formatNum(timeLeft.hours)}h
              </div>
              <span style={{ fontWeight: 800 }}>:</span>
              <div style={{ background: '#061224', padding: '6px 10px', borderRadius: '8px', fontWeight: 800, fontSize: '0.95rem' }}>
                {formatNum(timeLeft.minutes)}m
              </div>
              <span style={{ fontWeight: 800 }}>:</span>
              <div style={{ background: '#061224', padding: '6px 10px', borderRadius: '8px', fontWeight: 800, fontSize: '0.95rem' }}>
                {formatNum(timeLeft.seconds)}s
              </div>
            </div>

            {/* Shop Now Button */}
            <button
              onClick={onShopSale}
              style={{
                background: '#FFFFFF',
                color: '#FF6B00',
                padding: '10px 22px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span>Grab Deals</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
