import React, { useState } from 'react';
import { Mail, Check, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { subscribeNewsletter } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setIsSubscribed(true);
        addToast(res.message || 'Subscribed successfully! 🎉', 'success');

        // Confetti effect
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#FF6B00', '#2563EB', '#10B981', '#F59E0B']
        });
      }
    } catch (err) {
      setIsSubscribed(true);
      addToast('Subscribed to FetchMart newsletter! 🎉', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{
      padding: '70px 0',
      background: 'linear-gradient(135deg, #061224 0%, #0F172A 100%)',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative Gradient Rings */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-50px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, rgba(255, 107, 0, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Mail Icon Tag */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255, 107, 0, 0.15)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#FF6B00',
          }}>
            <Mail size={26} />
          </div>

          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '12px',
          }}>
            Get offers worth opening
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#94A3B8',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Subscribe to our weekly newsletter for exclusive discounts, new tech launches, flash deal alerts and insider perks.
          </p>

          {isSubscribed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              padding: '14px 28px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '1rem',
            }}>
              <Check size={20} />
              <span>You're on the list! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '9999px',
                padding: '6px 8px 6px 20px',
                maxWidth: '520px',
                margin: '0 auto',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#FFFFFF',
                    width: '100%',
                    fontSize: '0.95rem',
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    padding: '12px 26px',
                    fontSize: '0.92rem',
                    flexShrink: 0,
                  }}
                >
                  {isSubmitting ? 'Joining...' : (
                    <>
                      <span>Subscribe</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div style={{
            fontSize: '0.78rem',
            color: '#64748B',
            marginTop: '16px',
          }}>
            🔒 No spam ever. Unsubscribe with 1-click anytime.
          </div>
        </div>
      </div>
    </section>
  );
};
