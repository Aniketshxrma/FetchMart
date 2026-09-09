import React, { useState, useEffect } from 'react';
import './App.css';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import { ToastContainer } from './components/ToastContainer';
import { Navbar } from './components/Navbar';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { PopularProducts } from './components/PopularProducts';
import { FeaturesBar } from './components/FeaturesBar';
import { ExtendedCatalog } from './components/ExtendedCatalog';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals and Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PolicyModal } from './components/PolicyModal';

// API Services
import { fetchPopularProducts, fetchProducts } from './services/api';

function MainApp() {
  const [popularProductsList, setPopularProductsList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState('shipping');

  // Load initial popular products and full catalog
  useEffect(() => {
    const loadData = async () => {
      try {
        const [popular, all] = await Promise.all([
          fetchPopularProducts(),
          fetchProducts({ category: 'All' }),
        ]);
        setPopularProductsList(popular);
        setAllProductsList(all);
      } catch (err) {
        console.error('Error loading initial data', err);
      } finally {
        setIsLoadingCatalog(false);
      }
    };

    loadData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setGlobalSearchQuery(''); // clear search when browsing by category
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query) => {
    setGlobalSearchQuery(query);
    setSelectedCategory('All'); // search across all categories
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    const popularElem = document.getElementById('popular-section');
    if (popularElem) {
      popularElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllProducts = () => {
    setSelectedCategory('All');
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTrackingWithId = (trackingId) => {
    setActiveTrackingId(trackingId);
    setIsTrackingOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
      <Navbar
        onSelectCategory={handleCategorySelect}
        onSearch={handleSearch}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Flash Sale Banner with Ticking Countdown */}
      <FlashSaleBanner onShopSale={handleShopNow} />

      {/* Hero Showcase Banner */}
      <HeroBanner onShopNowClick={handleShopNow} />

      {/* Curated 5 Category Cards */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Popular Right Now (Exact 4 Reference Products) */}
      <PopularProducts
        products={popularProductsList}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onViewAllClick={handleViewAllProducts}
      />

      {/* Benefits Trust Bar */}
      <FeaturesBar
        onOpenPolicy={(tab) => {
          setActivePolicyTab(tab);
          setIsPolicyOpen(true);
        }}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Extended Catalog with Live Platzi Fake Store API Integration & Filters */}
      <ExtendedCatalog
        products={allProductsList}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => { setSelectedCategory(cat); setGlobalSearchQuery(''); }}
        onSelectProduct={(p) => setSelectedProduct(p)}
        isLoading={isLoadingCatalog}
        globalSearchQuery={globalSearchQuery}
        onClearSearch={() => setGlobalSearchQuery('')}
      />

      {/* Newsletter Subscription Box */}
      <Newsletter />

      {/* Footer with Contact Details & Links */}
      <Footer
        onSelectCategory={handleCategorySelect}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenPolicy={(tab) => {
          setActivePolicyTab(tab);
          setIsPolicyOpen(true);
        }}
      />

      {/* Drawers and Modals */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistDrawer />
      
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={() => setIsCheckoutOpen(true)}
        />
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(trkId) => handleOpenTrackingWithId(trkId)}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialTrackingId={activeTrackingId}
      />

      <AuthModal />
      <UserProfileModal />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        initialTab={activePolicyTab}
        onOpenTracking={() => {
          setIsPolicyOpen(false);
          setIsTrackingOpen(true);
        }}
        onOpenContact={() => {
          setIsPolicyOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* Toast Alert Renderer */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainApp />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
