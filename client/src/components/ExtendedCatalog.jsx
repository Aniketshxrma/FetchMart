import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Star, ShoppingBag, Heart, Eye, ArrowUpDown, RefreshCw, X as XIcon, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Category-specific fallback images for broken/missing images
const FALLBACK_IMAGES = {
  Fashion: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  Electronics: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
  Home: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
  Fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=80',
  General: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
};

export const ExtendedCatalog = ({ products, activeCategory, onSelectCategory, onSelectProduct, isLoading, globalSearchQuery = '', onClearSearch }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [localSearch, setLocalSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(16);

  // Reset display count whenever filters change
  useEffect(() => { setDisplayCount(16); }, [activeCategory, globalSearchQuery, localSearch, maxPrice]);

  const categories = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home', 'Fitness'];

  // Active search: global query takes priority, then local search
  const activeSearch = globalSearchQuery.trim() || localSearch.trim();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase());
    }

    // Search filter — searches title, description, and category
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter((p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return result;
  }, [products, activeCategory, activeSearch, maxPrice, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayCount);

  return (
    <section style={{ padding: '60px 0 80px', background: '#F8FAFC' }} id="catalog-section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#FF6B00',
            marginBottom: '6px',
          }}>
            Explore Complete Store
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <h2 style={{
                fontSize: '2.1rem',
                fontWeight: 800,
                color: '#061224',
                letterSpacing: '-0.02em',
              }}>
                {activeSearch
                  ? `Search results for "${activeSearch}"`
                  : activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
              </h2>
              {/* Active search pill */}
              {globalSearchQuery && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: '#FFF3EB', color: '#FF6B00', border: '1px solid #FFE4D3',
                    padding: '4px 12px', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600,
                  }}>
                    <Search size={13} />
                    {globalSearchQuery}
                    <button onClick={onClearSearch} style={{ color: '#FF6B00', display: 'flex', alignItems: 'center' }}>
                      <XIcon size={13} />
                    </button>
                  </span>
                </div>
              )}
            </div>
            <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
              Showing {visibleProducts.length} of {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Filters & Control Bar */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.04)',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => {
              const isActive = (activeCategory || 'All') === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    background: isActive ? '#061224' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#475569',
                    border: 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort & Search Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Inline catalog search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '7px 12px', borderRadius: '10px', border: '1px solid #E2E8F0', minWidth: '180px' }}>
              <Search size={14} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.84rem', fontWeight: 500, color: '#0F172A', width: '100%' }}
              />
              {localSearch && (
                <button onClick={() => setLocalSearch('')} style={{ color: '#94A3B8', display: 'flex' }}>
                  <XIcon size={13} />
                </button>
              )}
            </div>

            {/* Price Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
              <span>Max: ₹{maxPrice.toLocaleString('en-IN')}</span>
              <input
                type="range"
                min="500"
                max="200000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: '#FF6B00', cursor: 'pointer', width: '90px' }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '6px 12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <ArrowUpDown size={15} color="#64748B" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discounts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#FF6B00', fontWeight: 600 }}>
              <RefreshCw className="animate-spin" size={24} />
              <span>Loading premium catalog...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '60px 20px',
            textAlign: 'center',
            border: '1px dashed #CBD5E1',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛍️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#061224', marginBottom: '8px' }}>
              No products found
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>
              Try adjusting your category filter, price range, or search term.
            </p>
            <button
              onClick={() => { onSelectCategory('All'); setMaxPrice(150000); setLocalSearch(''); if (onClearSearch) onClearSearch(); }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {visibleProducts.map((product) => {
            const isWishlisted = isInWishlist(product._id || product.id);

            return (
              <div
                key={product._id || product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '210px',
                  background: '#F8FAFC',
                  overflow: 'hidden',
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

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#DC2626',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}>
                      {product.discountPercentage}% OFF
                    </span>
                  )}

                  {/* Actions */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}>
                    <button
                      onClick={() => toggleWishlist(product)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isWishlisted ? '#EF4444' : '#64748B',
                      }}
                    >
                      <Heart size={16} fill={isWishlisted ? '#EF4444' : 'none'} />
                    </button>
                    <button
                      onClick={() => onSelectProduct(product)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748B',
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                      {product.category}
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      style={{
                        fontSize: '0.96rem',
                        fontWeight: 700,
                        color: '#061224',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.title}
                    </h3>

                    {/* Star Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                        {product.rating?.rate || 4.2}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                        ({product.rating?.count || 120})
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061224', fontFamily: "'Outfit', sans-serif" }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      style={{
                        width: '100%',
                        padding: '9px',
                        borderRadius: '10px',
                        background: '#F1F5F9',
                        color: '#0F172A',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FF6B00';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F1F5F9';
                        e.currentTarget.style.color = '#0F172A';
                      }}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleProducts.length < filteredProducts.length && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="btn-secondary"
              style={{ padding: '14px 32px', fontSize: '0.95rem' }}
            >
              Load More Products ({filteredProducts.length - visibleProducts.length} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
