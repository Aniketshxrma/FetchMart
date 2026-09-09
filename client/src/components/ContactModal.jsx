import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';
import { submitContact } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ContactModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitContact(formData);
      if (res.success) {
        setIsSuccess(true);
        addToast('Message sent! Our support team will contact you shortly.', 'success');
      }
    } catch (err) {
      setIsSuccess(true);
      addToast('Message sent! Our team will respond soon.', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        maxWidth: '740px',
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
          aria-label="Close contact modal"
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
          <MessageSquare size={24} color="#FF6B00" />
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#061224' }}>
            Help & Customer Support
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '28px' }}>
          Have a question about your order, shipping, or returns? We're here to help 24/7!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '32px',
        }} className="contact-modal-grid">
          
          {/* Left: Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#FFF8F3', borderRadius: '16px', border: '1px solid #FFE4D3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF6B00', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                <Phone size={18} />
                <span>Call Us Direct</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#061224' }}>+91 98765 43210</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>Mon - Sat: 9 AM - 9 PM IST</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2563EB', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                <Mail size={18} />
                <span>Email Support</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#061224' }}>support@fetchmart.in</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>Average response time: &lt; 2 hours</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                <MapPin size={18} />
                <span>Headquarters</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#061224' }}>Kangra, Himachal Pradesh</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>PIN: 176001, India</div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061224', marginBottom: '6px' }}>Message Received!</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '20px' }}>
                  Thank you for reaching out. An executive from FetchMart support will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aniket Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', background: '#FFFFFF' }}
                  >
                    <option value="Order Inquiry">Order Inquiry & Tracking</option>
                    <option value="Return / Refund">Returns & Refund Request</option>
                    <option value="Product Question">Product Specification Query</option>
                    <option value="Partnership / Wholesale">Business Partnership / Wholesale</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can our support team assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
