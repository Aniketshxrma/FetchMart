import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetailModal = ({ product, onClose, onBuyNow }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Sync state when selected product opens
  React.useEffect(() => {
    if (product) {
      const imgs = (product.images && product.images.length > 0) ? product.images : [product.image];
      setActiveImage(imgs[0]);
      setSelectedColor(product.colors ? product.colors[0] : null);
      setSelectedSize(product.sizes ? product.sizes[0] : null);
      setQuantity(1);
      setActiveTab('description');
    }
  }, [product]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product._id || product.id);
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];
  const displayImage = activeImage || images[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, { selectedColor, selectedSize });
  };

  const handleBuyNowClick = () => {
    addToCart(product, quantity, { selectedColor, selectedSize });
    onClose();
    if (onBuyNow) onBuyNow();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(6, 18, 36, 0.75)',
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      {/* Click outside backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0 }} />

      {/* Modal Container */}
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '960px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
        zIndex: 310,
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Body */}
        <div style={{ padding: '36px 32px 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '36px',
          }} className="product-modal-grid">
            
            {/* Left: Product Images Gallery */}
            <div>
              {/* Main Image Frame */}
              <div style={{
                width: '100%',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#F8FAFC',
                border: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '16px',
              }}>
                <img
                  src={displayImage}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                />

                {product.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#061224',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                  }}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: displayImage === img ? '2px solid #FF6B00' : '1px solid #E2E8F0',
                        background: '#F8FAFC',
                        flexShrink: 0,
                        padding: '4px',
                      }}
                    >
                      <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div>
              {/* Category & Title */}
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6B00', textTransform: 'uppercase', marginBottom: '6px' }}>
                {product.category}
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#061224', lineHeight: 1.25, marginBottom: '12px' }}>
                {product.title}
              </h2>

              {/* Rating & Stock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#FEF3C7',
                  color: '#B45309',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}>
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>{product.rating?.rate || 4.4}</span>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  {(product.rating?.count || 1200).toLocaleString('en-IN')} Customer Reviews
                </span>
                <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} /> In Stock ({product.stock || 25} units left)
                </span>
              </div>

              {/* Price & Savings */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '24px',
                padding: '16px',
                background: '#FFF9F5',
                borderRadius: '14px',
                border: '1px solid #FFE4D3',
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage && (
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#DC2626',
                    background: '#FEE2E2',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}>
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#061224', marginBottom: '8px' }}>
                    Select Color: <span style={{ color: '#FF6B00', fontWeight: 600 }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.colors.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: selectedColor === col ? '2px solid #FF6B00' : '1px solid #CBD5E1',
                          background: selectedColor === col ? '#FFF3EB' : '#FFFFFF',
                          color: selectedColor === col ? '#FF6B00' : '#0F172A',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#061224', marginBottom: '8px' }}>
                    Select Size: <span style={{ color: '#FF6B00', fontWeight: 600 }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: selectedSize === sz ? '2px solid #FF6B00' : '1px solid #CBD5E1',
                          background: selectedSize === sz ? '#FFF3EB' : '#FFFFFF',
                          color: selectedSize === sz ? '#FF6B00' : '#0F172A',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Picker & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  gap: '12px',
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', width: '24px', height: '24px' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', width: '24px', height: '24px' }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    padding: '13px',
                    fontSize: '0.95rem',
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNowClick}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '13px',
                    fontSize: '0.95rem',
                  }}
                >
                  <Zap size={18} />
                  <span>Buy Now</span>
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isWishlisted ? '#EF4444' : '#64748B',
                    background: isWishlisted ? '#FEF2F2' : '#FFFFFF',
                  }}
                >
                  <Heart size={20} fill={isWishlisted ? '#EF4444' : 'none'} />
                </button>
              </div>

              {/* Delivery Perks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#475569' }}>
                  <Truck size={15} color="#FF6B00" />
                  <span>Free Delivery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#475569' }}>
                  <RotateCcw size={15} color="#FF6B00" />
                  <span>7 Days Return</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#475569' }}>
                  <ShieldCheck size={15} color="#FF6B00" />
                  <span>100% Genuine</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs (Description, Specifications, Reviews) */}
          <div style={{ marginTop: '36px', borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '16px' }}>
              {[
                { id: 'description', label: 'Description & Features' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: 'Customer Reviews (4.4★)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? '#FF6B00' : '#64748B',
                    borderBottom: activeTab === tab.id ? '2px solid #FF6B00' : 'none',
                    paddingBottom: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '16px' }}>
                  {product.description}
                </p>
                {product.features && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {product.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#334155' }}>
                        <Check size={16} color="#10B981" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {product.specs ? (
                  Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#64748B', fontWeight: 600 }}>{key}: </span>
                      <span style={{ color: '#0F172A', fontWeight: 700 }}>{val}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#64748B', fontSize: '0.88rem' }}>Standard manufacturer grade specifications apply.</div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>Rohan Mehta</span>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>• Verified Buyer</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    "Outstanding quality! Exceeded my expectations. Packaging was super secure and delivered to Kangra in just 2 days."
                  </p>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>Pooja Sharma</span>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>• Verified Buyer</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                    "Genuine product at an unbeatable price. FetchMart is now my go-to store!"
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
