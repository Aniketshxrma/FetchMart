import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config/api.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setIsAuthModalOpen, setAuthMode } = useAuth();
  const { addToast } = useToast();

  const userKey = user?.email ? `fetchmart_cart_${user.email}` : 'fetchmart_cart_guest';

  // Load cart from MongoDB / localStorage
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync cart when user changes
  useEffect(() => {
    if (user && user.cart && Array.isArray(user.cart) && user.cart.length > 0) {
      setCartItems(user.cart);
    } else {
      try {
        const saved = localStorage.getItem(userKey);
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch {
        setCartItems([]);
      }
    }
  }, [user?.email, user?._id, user?.id]);

  // Persist cart to localStorage & sync to MongoDB
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(userKey, JSON.stringify(cartItems));

      // Sync to MongoDB
      if (user && (user._id || user.id)) {
        const userId = user._id || user.id;
        fetch(`${API_BASE_URL}/auth/sync-cart/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartItems }),
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cartItems, userKey, user]);

  const addToCart = (product, quantity = 1, options = {}) => {
    // Check if user is logged in
    if (!user) {
      addToast('Please sign in or create an account to add items to your cart! 🔒', 'info');
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return false;
    }

    setCartItems((prevItems) => {
      const itemId = options.selectedSize || options.selectedColor
        ? `${product._id || product.id}-${options.selectedSize || ''}-${options.selectedColor || ''}`
        : `${product._id || product.id}`;

      const existingIndex = prevItems.findIndex((item) => item.cartItemId === itemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            cartItemId: itemId,
            productId: product._id || product.id,
            quantity,
            selectedColor: options.selectedColor || (product.colors && product.colors[0]) || null,
            selectedSize: options.selectedSize || (product.sizes && product.sizes[0]) || null,
          },
        ];
      }
    });

    addToast(`Added "${product.title}" to cart! 🛒`, 'success');
    return true;
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cartItems.find((i) => i.cartItemId === cartItemId);
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.title}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FETCH10') {
      setAppliedCoupon({ code: 'FETCH10', discountPercent: 10, description: '10% Off on entire order' });
      addToast('Coupon FETCH10 applied successfully! 🎉 (10% Off)', 'success');
      return true;
    } else if (clean === 'SUPER60') {
      setAppliedCoupon({ code: 'SUPER60', discountPercent: 60, description: '60% Flash Sale Discount' });
      addToast('Coupon SUPER60 applied! 🎉 (60% Off)', 'success');
      return true;
    } else if (clean === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', flatDiscount: 500, description: '₹500 Welcome Discount' });
      addToast('Coupon WELCOME50 applied! 🎉 (₹500 Off)', 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try FETCH10 or SUPER60', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed', 'info');
  };

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discount = Math.min(appliedCoupon.flatDiscount, subtotal);
    }
  }

  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = Math.max(0, subtotal - discount + shippingFee + tax);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
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
        totalItemCount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
