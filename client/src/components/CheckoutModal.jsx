import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Building2, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { submitOrder } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cartItems, subtotal, discount, shippingFee, tax, total, clearCart, appliedCoupon } = useCart();
  const { user, fetchUserOrders } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Address Form State
  const [address, setAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.find(a => a.isDefault)?.street || user?.addresses?.[0]?.street || '',
    city: user?.addresses?.find(a => a.isDefault)?.city || user?.addresses?.[0]?.city || '',
    state: user?.addresses?.find(a => a.isDefault)?.state || user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.find(a => a.isDefault)?.pincode || user?.addresses?.[0]?.pincode || '',
  });

  // Reset checkout wizard step to 1 whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setConfirmedOrder(null);
      setIsSubmitting(false);
      if (user) {
        const defaultAddr = user.addresses?.find(a => a.isDefault) || user.addresses?.[0];
        setAddress({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          street: defaultAddr?.street || '',
          city: defaultAddr?.city || '',
          state: defaultAddr?.state || '',
          pincode: defaultAddr?.pincode || '',
        });
      }
    }
  }, [isOpen, user]);

  const handleModalClose = () => {
    setStep(1);
    setConfirmedOrder(null);
    setIsSubmitting(false);
    if (onClose) onClose();
  };

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'NetBanking' | 'COD'
  const [cardDetails, setCardDetails] = useState({ number: '4532 8920 1928 3491', expiry: '08/29', cvv: '849', name: user?.name || 'Customer' });
  const [upiId, setUpiId] = useState('fetchmart@upi');

  if (!isOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!address.name || !address.email || !address.phone || !address.street || !address.pincode) {
        addToast('Please fill in all required shipping fields', 'error');
        return;
      }
      setStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const orderPayload = {
      items: cartItems.map((item) => ({
        productId: item.productId || item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      customer: {
        name: address.name,
        email: address.email,
        phone: address.phone,
      },
      shippingAddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: 'India',
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        transactionId: `TXN-${Date.now()}`,
      },
      pricing: {
        subtotal,
        discount,
        shippingFee,
        tax,
        total,
      },
    };

    try {
      const res = await submitOrder(orderPayload);
      if (res.success) {
        setConfirmedOrder(res.order || orderPayload);
        setStep(3);
        clearCart();
        if (fetchUserOrders) fetchUserOrders();
        addToast('Order placed successfully! 🎉', 'success');

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF6B00', '#2563EB', '#10B981', '#F59E0B']
        });
      }
    } catch (err) {
      addToast('Order simulated successfully!', 'success');
      setStep(3);
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
      background: 'rgba(6, 18, 36, 0.8)',
      backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      <div onClick={handleModalClose} style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        zIndex: 360,
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#061224' }}>
              {step === 1 && 'Step 1: Delivery Address'}
              {step === 2 && 'Step 2: Payment Method'}
              {step === 3 && 'Order Confirmed! 🎉'}
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
              {step === 1 && 'Where should we send your order?'}
              {step === 2 && 'Choose your preferred secure payment method'}
              {step === 3 && 'Thank you for shopping with FetchMart'}
            </div>
          </div>

          <button
            onClick={handleModalClose}
            aria-label="Close checkout"
            style={{
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
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleNextStep}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Street Address & House No. *
                </label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              {/* Order Total Summary */}
              <div style={{
                padding: '14px 18px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Total Payable Amount</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>
                    ₹{total.toLocaleString('en-IN')}
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
                  <span>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div>
              {/* Payment Methods Options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: <QrCode size={20} /> },
                  { id: 'Card', label: 'Cards', icon: <CreditCard size={20} /> },
                  { id: 'NetBanking', label: 'Net Banking', icon: <Building2 size={20} /> },
                  { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={20} /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: '14px',
                      border: paymentMethod === m.id ? '2px solid #FF6B00' : '1.5px solid #E2E8F0',
                      background: paymentMethod === m.id ? '#FFF3EB' : '#FFFFFF',
                      color: paymentMethod === m.id ? '#FF6B00' : '#0F172A',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'UPI' && (
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#FFFFFF', padding: '6px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fetchmart@upi&pn=FetchMart&am=1000"
                        alt="QR Code"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#061224' }}>Scan & Pay via any UPI App</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Or Enter UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okaxis"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'Card' && (
                <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>CVV</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COD Tab */}
              {paymentMethod === 'COD' && (
                <div style={{ padding: '18px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#061224', marginBottom: '4px' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>Pay with cash or UPI QR directly to the courier agent when your package arrives at your doorstep.</div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 700 }}
                >
                  {isSubmitting ? 'Processing Payment...' : `Pay ₹${total.toLocaleString('en-IN')} & Place Order`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <CheckCircle2 size={44} />
              </div>

              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#061224', marginBottom: '8px' }}>
                Your order is confirmed!
              </h2>

              <p style={{ fontSize: '0.95rem', color: '#64748B', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px' }}>
                We've received your order and are packing it with care. A confirmation email has been sent to <strong>{address.email}</strong>.
              </p>

              {/* Tracking ID Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: '#FFF3EB',
                border: '1.5px dashed #FF6B00',
                borderRadius: '14px',
                marginBottom: '32px',
              }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Tracking ID:</span>
                <strong style={{ fontSize: '1.2rem', color: '#FF6B00', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.05em' }}>
                  {confirmedOrder?.trackingId || 'FM-849201'}
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                <button
                  onClick={() => {
                    const tracking = confirmedOrder?.trackingId || 'FM-849201';
                    handleModalClose();
                    if (onOrderSuccess) onOrderSuccess(tracking);
                  }}
                  className="btn-primary"
                  style={{ padding: '14px 28px' }}
                >
                  <Truck size={18} />
                  <span>Track This Order</span>
                </button>

                <button
                  onClick={handleModalClose}
                  className="btn-secondary"
                  style={{ padding: '14px 24px' }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
