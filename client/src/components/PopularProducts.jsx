import React from 'react';
import { Star, ShoppingBag, Heart, Eye, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const FALLBACK_IMAGES = {
  Fashion: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  Electronics: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
  Home: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
  Fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80',
  General: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
};

export const PopularProducts = ({ products, onSelectProduct, onViewAllClick }) => {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section style={{ padding: '40px 0 60px' }} id="popular-section">
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px',
        }}>
          <div>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#FF6B00',
              marginBottom: '6px',
            }}>
              Customer Favorites
            </div>
            <h2 style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              color: '#061224',
              letterSpacing: '-0.02em',
            }}>
              Popular right now
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FF6B00',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <span>View all products</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }} className="products-grid">
          {products.map((product) => {
            const isWishlisted = isInWishlist(product._id || product.id);
            const inCart = cartItems.some((item) => item.productId === (product._id || product.id));

            return (
              <div
                key={product._id || product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid #F1F5F9',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 18px 40px -8px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#F1F5F9';
                }}
              >
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  background: '#F8FAFC',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGES[product.category] || FALLBACK_IMAGES.General;
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(6, 18, 36, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      letterSpacing: '0.03em',
                    }}>
                      {product.badge}
                    </span>
                  )}

                  {/* Top Action Buttons (Wishlist & Quick View) */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    zIndex: 2,
                  }}>
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      aria-label="Save to wishlist"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        color: isWishlisted ? '#EF4444' : '#64748B',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      aria-label="Quick View"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        color: '#64748B',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Details Container */}
                <div style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                  <div>
                    {/* Category */}
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '4px',
                    }}>
                      {product.category}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#061224',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B00'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#061224'}
                    >
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#FEF3C7',
                        color: '#B45309',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                      }}>
                        <Star size={13} fill="#F59E0B" color="#F59E0B" />
                        <span>{product.rating?.rate || 4.4}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 500 }}>
                        ({(product.rating?.count || 1200).toLocaleString('en-IN')})
                      </span>
                    </div>
                  </div>

                  {/* Price and Add to Cart Button */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                      <span style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#061224',
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      {product.originalPrice && (
                        <span style={{
                          fontSize: '0.88rem',
                          color: '#94A3B8',
                          textDecoration: 'line-through',
                          fontWeight: 500,
                        }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}

                      {product.discountPercentage && (
                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#DC2626',
                          background: '#FEE2E2',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}>
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      onClick={() => addToCart(product, 1)}
                      style={{
                        width: '100%',
                        padding: '11px',
                        borderRadius: '12px',
                        background: inCart ? '#061224' : 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: inCart ? 'none' : '0 4px 14px rgba(255, 107, 0, 0.25)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!inCart) e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {inCart ? (
                        <>
                          <Check size={16} color="#10B981" />
                          <span>In Cart • Add More</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
