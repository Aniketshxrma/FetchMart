import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const WishlistDrawer = () => {
  const {
    wishlistItems,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveToCart,
    moveAllToCart,
  } = useWishlist();

  if (!isWishlistOpen) return null;

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
      <div
        onClick={() => setIsWishlistOpen(false)}
        style={{ position: 'absolute', inset: 0 }}
      />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
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
            <Heart size={22} color="#EF4444" fill="#EF4444" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061224' }}>
              Your Wishlist ({wishlistItems.length})
            </h3>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
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

        {/* Wishlist Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❤️</div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#061224', marginBottom: '8px' }}>
                Your wishlist is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
                Tap the heart icon on any product to save it for later!
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {wishlistItems.map((product) => (
                <div
                  key={product._id || product.id}
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
                    src={product.image}
                    alt={product.title}
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
                          {product.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          aria-label="Remove from wishlist"
                          style={{ color: '#94A3B8', padding: '2px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                        {product.category}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <div style={{ fontWeight: 800, color: '#061224', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>

                      <button
                        onClick={() => moveToCart(product)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: '#FFF3EB',
                          color: '#FF6B00',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
          }}>
            <button
              onClick={moveAllToCart}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
              }}
            >
              <span>Move All to Cart ({wishlistItems.length} items)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
