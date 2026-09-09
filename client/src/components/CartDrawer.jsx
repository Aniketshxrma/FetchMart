import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(6, 18, 36, 0.65)',
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      {/* Backdrop Click */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Slide Drawer Content */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        background: '#FFFFFF',
        boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 210,
        animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#FF6B00" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061224' }}>
              Your Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
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

        {/* Free Shipping Progress Meter */}
        <div style={{
          padding: '12px 24px',
          background: '#FFF8F3',
          borderBottom: '1px solid #FFE4D3',
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#061224', marginBottom: '6px' }}>
            {amountNeededForFreeShipping > 0 ? (
              <span>Add <strong style={{ color: '#FF6B00' }}>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery</strong> 🚚</span>
            ) : (
              <span style={{ color: '#10B981', fontWeight: 700 }}>🎉 You've unlocked FREE Express Delivery!</span>
            )}
          </div>
          <div style={{ width: '100%', height: '6px', background: '#FFE0CC', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF6B00 0%, #10B981 100%)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#061224', marginBottom: '8px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
                Explore popular deals and fetch what you love!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1px solid #F1F5F9',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      background: '#F8FAFC',
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#061224',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '180px',
                        }}>
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label="Remove item"
                          style={{ color: '#94A3B8', padding: '2px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedColor && item.selectedSize && ' • '}
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <div style={{ fontWeight: 800, color: '#061224', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>

                      {/* Quantity Stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#F1F5F9',
                        borderRadius: '8px',
                        padding: '3px 6px',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
          }}>
            {/* Coupon Code Input */}
            <div style={{ marginBottom: '16px' }}>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  padding: '8px 12px',
                  borderRadius: '10px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#065F46', fontWeight: 600 }}>
                    <Tag size={15} color="#10B981" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount})</span>
                  </div>
                  <button onClick={removeCoupon} style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: 700 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (couponCode) applyCoupon(couponCode);
                  }}
                  style={{ display: 'flex', gap: '8px' }}
                >
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. FETCH10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#061224',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Fee</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#10B981' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Taxes (5% GST)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#061224',
                paddingTop: '8px',
                borderTop: '1px dashed #CBD5E1',
                fontFamily: "'Outfit', sans-serif",
              }}>
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onProceedToCheckout) onProceedToCheckout();
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#94A3B8', marginTop: '10px' }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Safe & Secure 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
