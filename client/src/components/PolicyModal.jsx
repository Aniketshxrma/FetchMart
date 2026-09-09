import React, { useState, useEffect } from 'react';
import {
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Lock,
  FileText,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export const PolicyModal = ({ isOpen, onClose, initialTab = 'shipping', onOpenTracking, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 380,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(6, 18, 36, 0.82)',
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      {/* Backdrop click */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0 }} />

      {/* Modal Container */}
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        zIndex: 390,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Modal Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC',
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#FF6B00',
              marginBottom: '2px'
            }}>
              FetchMart Trust & Customer Care
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#061224', margin: 0 }}>
              Customer Policies & Guarantees
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close policies"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.background = '#F1F5F9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = '#FFFFFF'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          background: '#FFFFFF',
          padding: '0 28px',
          overflowX: 'auto',
          gap: '8px',
        }}>
          <button
            onClick={() => setActiveTab('shipping')}
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'shipping' ? '3px solid #FF6B00' : '3px solid transparent',
              color: activeTab === 'shipping' ? '#FF6B00' : '#64748B',
              background: 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <Truck size={18} />
            <span>Shipping & Delivery</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'returns' ? '3px solid #FF6B00' : '3px solid transparent',
              color: activeTab === 'returns' ? '#FF6B00' : '#64748B',
              background: 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <RotateCcw size={18} />
            <span>7 Days Return Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'privacy' ? '3px solid #FF6B00' : '3px solid transparent',
              color: activeTab === 'privacy' ? '#FF6B00' : '#64748B',
              background: 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <ShieldCheck size={18} />
            <span>Privacy & Terms</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{
          padding: '28px',
          overflowY: 'auto',
          flex: 1,
          lineHeight: 1.6,
          color: '#334155',
        }}>

          {/* TAB 1: SHIPPING & DELIVERY */}
          {activeTab === 'shipping' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.2s ease-out' }}>
              {/* Highlight Hero Card */}
              <div style={{
                background: 'linear-gradient(135deg, #FFF5ED 0%, #FFE9D9 100%)',
                border: '1.5px solid #FFD5B8',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#FF6B00',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Truck size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9A3412', margin: '0 0 4px 0' }}>
                    Express All-India Fast Shipping
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#7C2D12' }}>
                    Free delivery on orders above ₹499. Orders are packed with tamper-proof security seals and dispatched within 24 hours.
                  </p>
                </div>
              </div>

              {/* Delivery Timelines Grid */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} color="#FF6B00" /> Estimated Delivery Schedules
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '14px',
                }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Metro Cities</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>2 to 3 Business Days</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata</div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Tier 2 & 3 Cities</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>3 to 5 Business Days</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>State capitals, Kangra, HP, Chandigarh, Jaipur, Pune, etc.</div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Remote & NE Regions</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '4px 0' }}>5 to 7 Business Days</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Island territories & hilly high-altitude zones</div>
                  </div>
                </div>
              </div>

              {/* Shipping Charges & Courier Partners */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                    📦 Shipping Charges
                  </h5>
                  <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Orders ₹499 and above:</strong> FREE delivery nationwide.</li>
                    <li><strong>Orders under ₹499:</strong> Standard delivery fee of ₹49.</li>
                    <li><strong>Cash on Delivery (COD):</strong> Available at ₹0 extra charge.</li>
                  </ul>
                </div>

                <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                    🚚 Trusted Logistics Partners
                  </h5>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', marginBottom: '10px' }}>
                    We partner with India's top courier services for live GPS tracking:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['BlueDart', 'Delhivery', 'Shadowfax', 'XpressBees', 'DTDC'].map(partner => (
                      <span key={partner} style={{ background: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Tracking CTA */}
              <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>Want to check where your order is?</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Enter your FM-XXXXXX tracking ID for real-time courier updates.</div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenTracking) onOpenTracking();
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  <Truck size={16} /> Track Order
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 7 DAYS RETURN POLICY */}
          {activeTab === 'returns' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.2s ease-out' }}>
              {/* Highlight Hero Card */}
              <div style={{
                background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                border: '1.5px solid #A7F3D0',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <RotateCcw size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065F46', margin: '0 0 4px 0' }}>
                    100% Worry-Free 7-Day Returns & Replacements
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#047857' }}>
                    If you're not fully satisfied with your purchase, return or exchange it within 7 days of delivery. Free doorstep pickup!
                  </p>
                </div>
              </div>

              {/* 3 Step Return Process */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                  How to Initiate a Return in 3 Easy Steps
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FF6B00', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px' }}>1</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Request Return</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Go to My Account &gt; Order History and click "Return / Replace Item".</div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FF6B00', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px' }}>2</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Doorstep Pickup</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Our courier executive will inspect the item & pick it up from your address.</div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FF6B00', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px' }}>3</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Instant Refund</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Refund is processed directly to your original payment mode or UPI in 24-48 hrs.</div>
                  </div>
                </div>
              </div>

              {/* Conditions & Guidelines */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                  Return Guidelines & Eligibility
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontSize: '0.88rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#10B981', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} /> Eligible for Return
                    </div>
                    <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>Damaged or defective products upon delivery</li>
                      <li>Wrong item, size, or color received</li>
                      <li>Unopened items with brand packaging & original tags</li>
                      <li>Technical malfunction within 7 days</li>
                    </ul>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={16} /> Non-Returnable Items
                    </div>
                    <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li>Personal hygiene & intimate wear items</li>
                      <li>Used cosmetics & skincare products</li>
                      <li>Items without original barcodes / serial numbers</li>
                      <li>Requests initiated past the 7-day window</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Support CTA */}
              <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>Need assistance with a replacement?</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Our support team is available 6 days a week to help with returns.</div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenContact) onOpenContact();
                  }}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  <HelpCircle size={16} /> Contact Support
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY & TERMS */}
          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.2s ease-out' }}>
              {/* Highlight Hero Card */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                border: '1.5px solid #BFDBFE',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Lock size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E40AF', margin: '0 0 4px 0' }}>
                    Bank-Grade Security & 100% Privacy Commitment
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#1E3A8A' }}>
                    Your personal data, saved addresses, and payment information are protected with 256-bit AES encryption. We never sell your data.
                  </p>
                </div>
              </div>

              {/* Privacy Highlights */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                  Privacy Principles
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={16} color="#2563EB" /> 256-bit SSL Protection
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                      All data in transit between your browser, server, and MongoDB is encrypted end-to-end.
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CreditCard size={16} color="#2563EB" /> PCI-DSS Compliant
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                      Payment details are handled via secure RBI-approved gateways. We never store card CVVs or net banking passwords.
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} color="#2563EB" /> Zero Data Selling
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                      Your email, phone number, and location are used exclusively to process and deliver your FetchMart orders.
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms of Service Summary */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <h5 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  Terms of Service & Usage
                </h5>
                <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Account Registration:</strong> Users must provide accurate contact and shipping info to ensure smooth courier delivery.</li>
                  <li><strong>Order Cancellation:</strong> You can cancel any order free of charge before the package has been dispatched from the hub.</li>
                  <li><strong>Pricing & Taxes:</strong> All prices listed on FetchMart include applicable GST. Promotional coupons apply at checkout.</li>
                  <li><strong>Grievance Redressal:</strong> In compliance with the Information Technology Act, our Grievance Officer can be contacted at <code>support@fetchmart.in</code>.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
            FetchMart India • Reg. Office: Kangra, HP - 176001
          </span>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
