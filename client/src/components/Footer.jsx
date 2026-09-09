import React from 'react';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = ({ onSelectCategory, onOpenTracking, onOpenContact, onOpenPolicy }) => {
  return (
    <footer style={{
      background: '#061224',
      color: '#CBD5E1',
      paddingTop: '70px',
      paddingBottom: '30px',
      borderTop: '1px solid #0F172A',
    }}>
      <div className="container">
        
        {/* Main Footer Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
        }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(255, 107, 0, 0.3)',
              }}>
                <ShoppingBag size={22} />
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                Fetch<span style={{ color: '#FF6B00' }}>Mart</span>
              </span>
            </div>
            
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
              India's premier digital department store. Bringing curated global trends, authentic electronics, designer fashion, and lifestyle essentials to your doorstep with guaranteed fast delivery.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
                { icon: <TwitterIcon />, label: 'Twitter', href: '#' },
                { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
                { icon: <LinkedinIcon />, label: 'LinkedIn', href: '#' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94A3B8',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FF6B00';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>
              Shop By Category
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['All Products', 'Electronics', 'Fashion', 'Beauty & Personal Care', 'Home & Living', 'Sports & Fitness'].map((cat) => {
                const targetCat = cat === 'All Products' ? 'All' :
                                  cat === 'Beauty & Personal Care' ? 'Beauty' :
                                  cat === 'Home & Living' ? 'Home' :
                                  cat === 'Sports & Fitness' ? 'Fitness' : cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => onSelectCategory(targetCat)}
                      style={{
                        color: '#94A3B8',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <button
                  onClick={onOpenTracking}
                  style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  📦 Track Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  💬 Help & Support Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('shipping')}
                  style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  🚚 Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('returns')}
                  style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  🔄 7 Days Return Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                  style={{ color: '#94A3B8', fontSize: '0.9rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                >
                  🛡️ Privacy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '20px' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} color="#FF6B00" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Kangra, Himachal Pradesh, India - 176001</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} color="#FF6B00" style={{ flexShrink: 0 }} />
                <a href="tel:+919876543210" style={{ color: '#CBD5E1' }}>+91 98765 43210</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} color="#FF6B00" style={{ flexShrink: 0 }} />
                <a href="mailto:support@fetchmart.in" style={{ color: '#CBD5E1' }}>support@fetchmart.in</a>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '4px' }}>Customer Support Hours:</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>Mon - Sat: 9:00 AM - 9:00 PM IST</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#64748B',
        }}>
          <div>
            © {new Date().getFullYear()} FetchMart India Private Limited. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>100% Safe Payments:</span>
            <span style={{ color: '#94A3B8', fontWeight: 600 }}>UPI • RuPay • Visa • Mastercard • NetBanking • COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
