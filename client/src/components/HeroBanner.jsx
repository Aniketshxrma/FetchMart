import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';

export const HeroBanner = ({ onShopNowClick }) => {
  return (
    <section style={{
      position: 'relative',
      padding: '40px 0 60px',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
    }}>
      {/* Subtle Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, rgba(255, 107, 0, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          alignItems: 'center',
          gap: '48px',
        }} className="hero-grid">
          
          {/* Left Column: Headline & CTA */}
          <div style={{ zIndex: 2 }}>
            {/* Pill Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: '#FFF3EB',
              border: '1px solid #FFE4D3',
              color: '#FF6B00',
              fontWeight: 700,
              fontSize: '0.82rem',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(255, 107, 0, 0.08)',
            }}>
              <Sparkles size={15} />
              <span>Smart shopping, made simple</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: '3.6rem',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#061224',
              marginBottom: '20px',
            }} className="hero-headline">
              Find it. Love it. <br />
              <span style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Fetch it.
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#475569',
              marginBottom: '36px',
              maxWidth: '480px',
              fontWeight: 400,
            }}>
              Quality products, great prices and effortless delivery right at your doorstep across India.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onShopNowClick}
                className="btn-primary"
                style={{
                  padding: '16px 36px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                }}
              >
                <span>Shop now</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onShopNowClick}
                className="btn-secondary"
                style={{
                  padding: '15px 28px',
                  fontSize: '1rem',
                }}
              >
                Explore Trending
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div style={{
              marginTop: '40px',
              paddingTop: '28px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }} className="hero-stats">
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>50k+</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>Happy Shoppers</div>
              </div>
              <div style={{ width: '1px', height: '32px', background: '#E2E8F0' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>4.9/5</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>Customer Rating</div>
              </div>
              <div style={{ width: '1px', height: '32px', background: '#E2E8F0' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>24-48h</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>Fast Shipping</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlays */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(6, 18, 36, 0.18)',
              border: '4px solid #FFFFFF',
              background: '#F1F5F9',
            }}>
              <img
                src="/assets/hero_banner.jpg"
                alt="FetchMart Smart Shopping"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  transform: 'scale(1.01)',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>

            {/* Floating Pill Badge 1: 100% Genuine */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '-10px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              padding: '12px 18px',
              borderRadius: '16px',
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 3,
              animation: 'pulseSubtle 4s ease-in-out infinite',
            }} className="hero-floating-badge">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>100% Genuine</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Verified Brands Only</div>
              </div>
            </div>

            {/* Floating Pill Badge 2: Fast Express Dispatch */}
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '-10px',
              background: 'rgba(6, 18, 36, 0.92)',
              backdropFilter: 'blur(12px)',
              padding: '10px 16px',
              borderRadius: '16px',
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#FFFFFF',
              zIndex: 3,
            }} className="hero-floating-badge">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#FF6B00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Zap size={18} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Express Delivery</div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Dispatch in 24 hrs</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
