import express from 'express';
import axios from 'axios';
import { Product } from '../models/Product.js';
import { getDbStatus } from '../config/db.js';
import { popularProducts, curatedCatalog, memoryStore } from '../data/seedData.js';

const router = express.Router();

// Category mapping helper for DummyJSON
const mapDummyJsonCategory = (cat, title = '') => {
  const c = (cat || '').toLowerCase();
  const t = (title || '').toLowerCase();

  if (['smartphones', 'laptops', 'tablets', 'mobile-accessories'].includes(c)) {
    return 'Electronics';
  }
  if (['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'tops', 'sunglasses', 'womens-jewellery'].includes(c)) {
    return 'Fashion';
  }
  if (['beauty', 'fragrances', 'skin-care'].includes(c)) {
    return 'Beauty';
  }
  if (['furniture', 'home-decoration', 'kitchen-accessories'].includes(c)) {
    return 'Home';
  }
  if (['sports-accessories'].includes(c)) {
    return 'Fitness';
  }

  // Text-based fallback
  if (/phone|laptop|watch|headphone|earbud|speaker|camera|charger|tablet|tech|device/i.test(t)) return 'Electronics';
  if (/shirt|shoe|dress|bag|sunglass|jewel|hoodie|jacket|jeans|cloth|fashion|wear/i.test(t)) return 'Fashion';
  if (/serum|perfume|cream|lotion|mascara|lipstick|beauty|skin|fragrance/i.test(t)) return 'Beauty';
  if (/chair|table|sofa|kitchen|pan|knife|plate|decor|curtain|lamp|home|bed/i.test(t)) return 'Home';
  if (/gym|yoga|dumbell|fitness|sport|cycling|ball|racket|training/i.test(t)) return 'Fitness';

  return 'Electronics';
};

// Formatter for DummyJSON products
const formatDummyJsonProduct = (p) => {
  const category = mapDummyJsonCategory(p.category, p.title);
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

// Formatter for Platzi products (with strict validation to reject test/broken entries)
const formatPlatziProduct = (p) => {
  if (!p.title || p.title.toLowerCase().includes('cypress') || p.title.toLowerCase().includes('test') || p.title.startsWith('title-')) {
    return null;
  }

  const cleanImages = (p.images || [])
    .map(img => (typeof img === 'string' ? img.replace(/[\[\]"]/g, '').trim() : ''))
    .filter(img => img.startsWith('http') && !img.includes('placeholder') && !img.includes('placeimg') && !img.includes('600x400') && !img.includes('via.placeholder'));

  if (cleanImages.length === 0) return null;

  const priceInINR = Math.round(Number(p.price || 50) * 85);
  const originalPriceInINR = Math.round(priceInINR * 1.35);

  let categoryName = p.category?.name || 'General';
  if (/clothes|clothing|fashion|shoe|apparel/i.test(categoryName)) categoryName = 'Fashion';
  else if (/electronic|device|tech/i.test(categoryName)) categoryName = 'Electronics';
  else if (/furniture|home/i.test(categoryName)) categoryName = 'Home';
  else if (/beauty|cosmetics/i.test(categoryName)) categoryName = 'Beauty';
  else if (/fitness|sport/i.test(categoryName)) categoryName = 'Fitness';
  else categoryName = mapDummyJsonCategory('', p.title);

  return {
    _id: `platzi-${p.id}`,
    id: `platzi-${p.id}`,
    title: p.title,
    price: priceInINR,
    originalPrice: originalPriceInINR,
    discountPercentage: Math.round(((originalPriceInINR - priceInINR) / originalPriceInINR) * 100),
    category: categoryName,
    image: cleanImages[0],
    images: cleanImages,
    rating: {
      rate: Number((4.0 + (p.id % 10) * 0.1).toFixed(1)),
      count: 100 + ((p.id * 37) % 2500)
    },
    description: p.description || 'Premium high-quality product tailored for everyday convenience, durability and elegance.',
    badge: p.id % 3 === 0 ? 'Trending' : '',
    isPopular: false,
    stock: 20 + (p.id % 30)
  };
};

// GET /api/products/popular - Returns the 4 featured popular products
router.get('/popular', async (req, res) => {
  try {
    if (getDbStatus()) {
      const dbPopular = await Product.find({ isPopular: true }).limit(4);
      if (dbPopular && dbPopular.length > 0) {
        return res.json({ success: true, count: dbPopular.length, data: dbPopular });
      }
    }
    return res.json({ success: true, count: popularProducts.length, data: popularProducts });
  } catch (error) {
    console.error('Error fetching popular products:', error.message);
    res.json({ success: true, count: popularProducts.length, data: popularProducts });
  }
});

// GET /api/products - Get all products with filters, search, and DummyJSON integration
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 150, offset = 0 } = req.query;

    let localProducts = [];
    if (getDbStatus()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (search) {
        query.title = { $regex: new RegExp(search, 'i') };
      }
      localProducts = await Product.find(query);
    }

    if (!localProducts || localProducts.length === 0) {
      localProducts = memoryStore.products.filter(p => {
        let matchCat = true;
        let matchSearch = true;
        if (category && category !== 'All') {
          matchCat = p.category.toLowerCase() === category.toLowerCase();
        }
        if (search) {
          const s = search.toLowerCase();
          matchSearch = p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s);
        }
        return matchCat && matchSearch;
      });
    }

    // Fetch from DummyJSON API (100% clean, verified, high-res photos)
    let externalProducts = [];
    try {
      const djRes = await axios.get('https://dummyjson.com/products?limit=0', { timeout: 5000 });
      if (djRes.data && Array.isArray(djRes.data.products)) {
        externalProducts = djRes.data.products
          .map(formatDummyJsonProduct)
          .filter(p => {
            let matchCat = true;
            let matchSearch = true;
            if (category && category !== 'All') {
              matchCat = p.category.toLowerCase() === category.toLowerCase();
            }
            if (search) {
              const s = search.toLowerCase();
              matchSearch = p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s);
            }
            return matchCat && matchSearch;
          });
      }
    } catch (err) {
      console.warn('DummyJSON API warning (using local catalog):', err.message);
    }

    // Combine local curated catalog with DummyJSON items (deduplicated by title)
    const combinedMap = new Map();
    localProducts.forEach(p => combinedMap.set((p._id || p.id).toString(), p));
    externalProducts.forEach(p => {
      if (!combinedMap.has(p.id.toString())) {
        combinedMap.set(p.id.toString(), p);
      }
    });

    const allResults = Array.from(combinedMap.values());
    const paginated = allResults.slice(Number(offset), Number(offset) + Number(limit));

    res.json({
      success: true,
      total: allResults.length,
      count: paginated.length,
      data: paginated
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server error fetching products', error: error.message });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check DB
    if (getDbStatus()) {
      try {
        const dbProduct = await Product.findById(id);
        if (dbProduct) return res.json({ success: true, data: dbProduct });
      } catch (e) {
        // ID might not be a valid MongoDB ObjectId
      }
    }

    // Check memory store
    const local = memoryStore.products.find(p => p._id === id || p.id === id);
    if (local) return res.json({ success: true, data: local });

    // Check DummyJSON if prefixed with 'dj-'
    if (id.startsWith('dj-')) {
      const djId = id.replace('dj-', '');
      try {
        const djRes = await axios.get(`https://dummyjson.com/products/${djId}`, { timeout: 4000 });
        if (djRes.data) {
          return res.json({ success: true, data: formatDummyJsonProduct(djRes.data) });
        }
      } catch (e) {
        // Fallback below
      }
    }

    // Check Platzi if prefixed with 'platzi-'
    if (id.startsWith('platzi-')) {
      const platziId = id.replace('platzi-', '');
      try {
        const platziRes = await axios.get(`https://api.escuelajs.co/api/v1/products/${platziId}`, { timeout: 4000 });
        if (platziRes.data) {
          const formatted = formatPlatziProduct(platziRes.data);
          if (formatted) return res.json({ success: true, data: formatted });
        }
      } catch (e) {
        // Fallback below
      }
    }

    return res.status(404).json({ success: false, message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving product', error: error.message });
  }
});

export default router;
