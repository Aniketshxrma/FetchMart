import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Package, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onSelectCategory, onSearch, onSelectProduct, onOpenTracking, onOpenContact }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, setIsAuthModalOpen, setAuthMode, openProfileWithTab, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const categories = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Fitness'];

  // Handle Search Input
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const debounce = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchTerm)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.data || []);
        }
      } catch (err) {
        console.warn('Search autocomplete fallback');
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearching(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    setIsSearching(false);
  };

  const handleCategoryClick = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      transition: 'all 0.25s ease'
    }}>
      {/* Top Notification Bar */}
      <div style={{
        background: '#061224',
        color: '#94A3B8',
        fontSize: '0.78rem',
        padding: '6px 0',
        fontWeight: 500,
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#FF881A' }}>✨ Special Offer:</span>
            <span style={{ color: '#FFFFFF' }}>Use code <strong style={{ color: '#FF6B00' }}>FETCH10</strong> for 10% instant discount!</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="nav-top-links">
            <button 
              onClick={onOpenTracking} 
              style={{ color: '#CBD5E1', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent' }}
            >
              <Package size={13} color="#FF6B00" /> Track Order
            </button>
            <button 
              onClick={onOpenContact} 
              style={{ color: '#CBD5E1', fontSize: '0.78rem', background: 'transparent' }}
            >
              24/7 Help & Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => { if (onSelectCategory) onSelectCategory('All'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px -4px rgba(255, 107, 0, 0.4)',
            color: '#FFFFFF',
            transform: 'rotate(-4deg)',
            transition: 'transform 0.2s ease',
          }}>
            <ShoppingBag size={22} strokeWidth={2.4} />
          </div>
          <div>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.65rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#061224'
            }}>
              Fetch<span style={{ color: '#FF6B00' }}>Mart</span>
            </span>
          </div>
        </div>

        {/* Categories Dropdown Button (Desktop) */}
        <div style={{ position: 'relative' }} className="desktop-only">
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '9999px',
              background: isCategoryMenuOpen ? '#FFF3EB' : '#F1F5F9',
              color: isCategoryMenuOpen ? '#FF6B00' : '#0F172A',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
            }}
          >
            Categories <ChevronDown size={16} style={{ transform: isCategoryMenuOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
          </button>

          {isCategoryMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '200px',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #E2E8F0',
              padding: '8px',
              zIndex: 150,
              animation: 'fadeIn 0.2s ease-out',
            }}>
              <div
                onClick={() => handleCategoryClick('All')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#0F172A',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FFF3EB'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ✨ All Categories
              </div>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: '#334155',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.color = '#FF6B00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#334155';
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Search Bar */}
        <div ref={searchRef} style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F1F5F9',
              borderRadius: '9999px',
              padding: '6px 8px 6px 16px',
              border: isSearching ? '1.5px solid #FF6B00' : '1.5px solid transparent',
              transition: 'all 0.2s ease',
              boxShadow: isSearching ? '0 0 0 4px rgba(255, 107, 0, 0.1)' : 'none',
            }}>
              <Search size={18} color="#94A3B8" style={{ marginRight: '8px', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search products, electronics, sneakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearching(true)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.92rem',
                  color: '#0F172A',
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setSearchResults([]); }}
                  style={{ padding: '4px', color: '#94A3B8', marginRight: '4px' }}
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF881A 100%)',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)',
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 48px -10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #E2E8F0',
              padding: '10px',
              zIndex: 150,
              animation: 'fadeIn 0.2s ease-out',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', padding: '4px 10px 8px', textTransform: 'uppercase' }}>
                Instant Matches
              </div>
              {searchResults.map((product) => (
                <div
                  key={product._id || product.id}
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(product);
                    setIsSearching(false);
                    setSearchTerm('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '8px', background: '#F1F5F9' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{product.category}</span>
                      <span>•</span>
                      <strong style={{ color: '#FF6B00' }}>₹{product.price.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                  <ArrowRight size={16} color="#CBD5E1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls (Wishlist, Cart, User Profile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            className="btn-icon"
            style={{ position: 'relative' }}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="btn-icon"
            style={{
              position: 'relative',
              background: totalItemCount > 0 ? '#FFF3EB' : '#FFFFFF',
              borderColor: totalItemCount > 0 ? '#FFD8BF' : '#E2E8F0',
              color: totalItemCount > 0 ? '#FF6B00' : '#0F172A',
            }}
          >
            <ShoppingBag size={20} />
            {totalItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#FF6B00',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: '19px',
                height: '19px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
                boxShadow: '0 2px 6px rgba(255, 107, 0, 0.4)',
              }}>
                {totalItemCount}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          <div ref={userMenuRef} style={{ position: 'relative' }}>
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px 6px 6px',
                  borderRadius: '9999px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }} className="desktop-only">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} color="#64748B" />
              </button>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <UserIcon size={16} />
                <span>Sign In</span>
              </button>
            )}

            {/* User Dropdown */}
            {isUserMenuOpen && user && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '240px',
                background: '#FFFFFF',
                borderRadius: '18px',
                boxShadow: '0 20px 48px -10px rgba(0, 0, 0, 0.18)',
                border: '1px solid #E2E8F0',
                padding: '12px',
                zIndex: 150,
                animation: 'fadeIn 0.2s ease-out',
              }}>
                <div 
                  onClick={() => { openProfileWithTab('profile'); setIsUserMenuOpen(false); }}
                  style={{ padding: '8px 10px 12px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0F172A' }}>{user.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  <div style={{ fontSize: '0.75rem', color: '#FF6B00', fontWeight: 600, marginTop: '4px' }}>View My Account →</div>
                </div>

                <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button
                    onClick={() => { openProfileWithTab('profile'); setIsUserMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      width: '100%',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#334155',
                      textAlign: 'left',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <UserIcon size={16} color="#FF6B00" />
                    Personal Profile
                  </button>

                  <button
                    onClick={() => { openProfileWithTab('orders'); setIsUserMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      width: '100%',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#334155',
                      textAlign: 'left',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Package size={16} color="#FF6B00" />
                    My Orders
                  </button>

                  <button
                    onClick={() => { openProfileWithTab('addresses'); setIsUserMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      width: '100%',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#334155',
                      textAlign: 'left',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <MapPin size={16} color="#FF6B00" />
                    Saved Addresses
                  </button>

                  <button
                    onClick={() => { openProfileWithTab('wishlist'); setIsUserMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      width: '100%',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#334155',
                      textAlign: 'left',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Heart size={16} color="#EF4444" />
                    Saved Wishlist
                  </button>

                  <button
                    onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      width: '100%',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#EF4444',
                      textAlign: 'left',
                      marginTop: '4px',
                      borderTop: '1px solid #F1F5F9',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-only"
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              display: 'none',
              background: '#FFFFFF'
            }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {user ? (
            <div 
              onClick={() => { openProfileWithTab('profile'); setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px',
                background: '#FFF3EB',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#FF6B00', fontWeight: 600 }}>Open My Account →</div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <UserIcon size={16} /> Sign In / Register
            </button>
          )}

          <div style={{ fontWeight: 700, color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '4px' }}>
            Categories
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <button
              onClick={() => handleCategoryClick('All')}
              style={{ padding: '10px', borderRadius: '8px', background: '#FFF3EB', color: '#FF6B00', fontWeight: 600, textAlign: 'left', fontSize: '0.88rem' }}
            >
              ✨ All Items
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                style={{ padding: '10px', borderRadius: '8px', background: '#F8FAFC', color: '#0F172A', fontWeight: 500, textAlign: 'left', fontSize: '0.88rem' }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => { onOpenTracking(); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent' }}>
              <Package size={16} color="#FF6B00" /> Track Live Order
            </button>
            <button onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, color: '#334155', background: 'transparent' }}>
              📞 Contact Customer Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
