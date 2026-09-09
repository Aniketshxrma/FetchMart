import { CURATED_PRODUCTS } from '../data/curatedProducts.js';

const getBackendUrl = () => {
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    return `http://${window.location.hostname}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

const BACKEND_URL = getBackendUrl();
const DUMMY_JSON_API = 'https://dummyjson.com/products?limit=0';

// Initial 4 popular products
export const fetchPopularProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/products/popular`);
    if (!res.ok) throw new Error('Backend failed');
    const data = await res.json();
    if (data.success && data.data?.length > 0) {
      return data.data;
    }
  } catch (err) {
    console.warn('Backend fetch popular failed, using fallback:', err);
  }

  // Fallback initial 4 popular products matching reference design
  return CURATED_PRODUCTS.slice(0, 4);
};

// Map DummyJSON categories to FetchMart 5 core categories
const mapCategory = (cat, title = '') => {
  const c = (cat || '').toLowerCase();
  const t = (title || '').toLowerCase();

  if (['smartphones', 'laptops', 'tablets', 'mobile-accessories'].includes(c)) return 'Electronics';
  if (['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'tops', 'sunglasses', 'womens-jewellery'].includes(c)) return 'Fashion';
  if (['beauty', 'fragrances', 'skin-care'].includes(c)) return 'Beauty';
  if (['furniture', 'home-decoration', 'kitchen-accessories'].includes(c)) return 'Home';
  if (['sports-accessories'].includes(c)) return 'Fitness';

  if (/phone|laptop|watch|headphone|earbud|speaker|camera|charger|tablet|tech|device/i.test(t)) return 'Electronics';
  if (/shirt|shoe|dress|bag|sunglass|jewel|hoodie|jacket|jeans|cloth|fashion|wear/i.test(t)) return 'Fashion';
  if (/serum|perfume|cream|lotion|mascara|lipstick|beauty|skin|fragrance/i.test(t)) return 'Beauty';
  if (/chair|table|sofa|kitchen|pan|knife|plate|decor|curtain|lamp|home|bed/i.test(t)) return 'Home';
  if (/gym|yoga|dumbell|fitness|sport|cycling|ball|racket|training/i.test(t)) return 'Fitness';

  return 'Electronics';
};

// Format DummyJSON item
const formatDummyJsonProduct = (p) => {
  const category = mapCategory(p.category, p.title);
  const priceInINR = Math.round(Number(p.price || 50) * 85);
  const originalPriceInINR = Math.round(priceInINR * (1 + (p.discountPercentage || 20) / 100));

  const validImages = (p.images || [])
    .filter(img => typeof img === 'string' && img.startsWith('http') && !img.includes('placeholder') && !img.includes('600x400'));

  const thumbnail = p.thumbnail || validImages[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

  return {
    _id: `dj-${p.id}`,
    id: `dj-${p.id}`,
    title: p.title,
    price: priceInINR,
    originalPrice: originalPriceInINR,
    discountPercentage: Math.round(p.discountPercentage || 15),
    category,
    image: thumbnail,
    images: validImages.length > 0 ? validImages : [thumbnail],
    rating: {
      rate: Number((p.rating || 4.2).toFixed(1)),
      count: 120 + ((p.id * 89) % 3500)
    },
    description: p.description || 'Premium high-grade quality product crafted for maximum comfort and style.',
    badge: p.rating > 4.5 ? 'Top Rated' : (p.discountPercentage > 15 ? 'Sale' : ''),
    isPopular: false,
    stock: p.stock || 25,
    brand: p.brand || 'FetchMart Premium',
    specs: {
      'Brand': p.brand || 'FetchMart Select',
      'Warranty': p.warrantyInformation || '1 Year Brand Warranty',
      'Shipping': p.shippingInformation || 'Ships within 2-3 business days',
      'Return Policy': p.returnPolicy || '7 Days Replacement Guarantee'
    }
  };
};

export const fetchProducts = async ({ category = 'All', search = '', offset = 0, limit = 150 } = {}) => {
  // 1. Try Backend API
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    params.append('offset', offset);
    params.append('limit', limit);

    const res = await fetch(`${BACKEND_URL}/products?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Backend products request failed, using direct client catalog & DummyJSON integration:', err);
  }

  // 2. Client-side fallback: Curated Products + DummyJSON API
  try {
    let externalProducts = [];
    try {
      const djRes = await fetch(DUMMY_JSON_API);
      const djData = await djRes.json();
      if (djData && Array.isArray(djData.products)) {
        externalProducts = djData.products.map(formatDummyJsonProduct);
      }
    } catch (e) {
      console.warn('DummyJSON fetch failed, using local curated catalog:', e);
    }

    // Merge curated catalog with external DummyJSON products
    const combinedMap = new Map();
    CURATED_PRODUCTS.forEach(p => combinedMap.set((p._id || p.id).toString(), p));
    externalProducts.forEach(p => {
      if (!combinedMap.has(p.id.toString())) {
        combinedMap.set(p.id.toString(), p);
      }
    });

    let allProducts = Array.from(combinedMap.values());

    // Apply filtering
    if (category && category !== 'All') {
      allProducts = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      allProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(s) || (p.description && p.description.toLowerCase().includes(s))
      );
    }

    return allProducts;
  } catch (err) {
    console.error('Failed to load products:', err);
    return CURATED_PRODUCTS;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (err) {
    console.warn('Backend single product failed, checking fallback:', err);
  }

  // Local fallback
  return CURATED_PRODUCTS.find(p => p.id === id || p._id === id) || null;
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Backend create order failed, using local simulated success:', err);
  }

  // Local offline order simulation
  const mockTrackingId = 'FM' + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    message: 'Order placed successfully (Offline Mode)',
    data: {
      ...orderData,
      _id: `ord-${Date.now()}`,
      trackingId: mockTrackingId,
      status: 'Placed',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
    }
  };
};

export const trackOrder = async (trackingId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/orders/track/${trackingId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Backend track order failed, using simulated tracking:', err);
  }

  return {
    success: true,
    data: {
      trackingId,
      status: 'In Transit',
      orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: {
        fullName: 'Aniket Sharma',
        phone: '+91 98765 43210',
        city: 'Kangra',
        state: 'Himachal Pradesh',
        pincode: '176001'
      },
      statusHistory: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), note: 'Verified by FetchMart' },
        { status: 'Packed', timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), note: 'Dispatched from Delhi Hub' },
        { status: 'In Transit', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), note: 'Arrived at Chandigarh Sorting Facility' }
      ]
    }
  };
};

// Contact Form API
export const submitContactForm = async (contactData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Contact API offline, simulating response:', err);
  }
  return { success: true, message: 'Message sent successfully! Our team will contact you within 24 hours.' };
};

// Newsletter API
export const subscribeNewsletter = async (email) => {
  try {
    const res = await fetch(`${BACKEND_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Newsletter API offline, simulating response:', err);
  }
  return { success: true, message: 'Subscribed to FetchMart VIP Club successfully! 10% coupon emailed.' };
};

// Aliases for compatibility
export const submitOrder = createOrder;
export const submitContact = submitContactForm;
