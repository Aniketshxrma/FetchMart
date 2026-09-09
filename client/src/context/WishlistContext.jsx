import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config/api.js';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, setIsAuthModalOpen, setAuthMode } = useAuth();
  const userKey = user ? `fetchmart_wishlist_${user.email || user.id}` : 'fetchmart_wishlist_guest';

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const activeUser = localStorage.getItem('fetchmart_active_user');
      const parsedUser = activeUser ? JSON.parse(activeUser) : null;
      if (!parsedUser) return [];
      const key = `fetchmart_wishlist_${parsedUser.email || parsedUser.id}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      if (parsedUser && parsedUser.wishlist && parsedUser.wishlist.length > 0) return parsedUser.wishlist;
      return [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { addToast } = useToast();
  const { addToCart } = useCart();

  // Switch wishlist when logged in user changes
  useEffect(() => {
    if (user) {
      const userStorageKey = `fetchmart_wishlist_${user.email || user.id || user._id}`;
      const saved = localStorage.getItem(userStorageKey);
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      } else if (user.wishlist && user.wishlist.length > 0) {
        setWishlistItems(user.wishlist);
      } else {
        setWishlistItems([]);
      }
    } else {
      setWishlistItems([]);
    }
  }, [user?.email, user?._id, user?.id]);

  // Persist wishlist to localStorage and MongoDB
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(userKey, JSON.stringify(wishlistItems));

      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        fetch(`${API_BASE_URL}/auth/sync-wishlist/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist: wishlistItems }),
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlistItems, userKey, user]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => (item._id || item.id) === productId);
  };

  const toggleWishlist = (product) => {
    // Require login to bookmark/wishlist
    if (!user) {
      addToast('Please sign in or create an account to save items to your wishlist! 🔒', 'info');
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return false;
    }

    const id = product._id || product.id;
    if (isInWishlist(id)) {
      setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
      addToast(`Removed "${product.title}" from Wishlist`, 'info');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      addToast(`Saved "${product.title}" to Wishlist! ❤️`, 'success');
    }
    return true;
  };

  const moveToCart = (product) => {
    if (!user) {
      addToast('Please sign in first 🔒', 'info');
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    const added = addToCart(product, 1);
    if (added) {
      const id = product._id || product.id;
      setWishlistItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
    }
  };

  const moveAllToCart = () => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((product) => {
      addToCart(product, 1);
    });
    setWishlistItems([]);
    addToast('Moved all wishlist items to cart! 🛒', 'success');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
        toggleWishlist,
        moveToCart,
        moveAllToCart,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
