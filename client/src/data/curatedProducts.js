// FetchMart Premium Product Catalog (120+ Curated Products across 5 Categories)
export const CURATED_PRODUCTS = [
  // ==========================================
  //             ELECTRONICS (24)
  // ==========================================
  {
    id: 'e-1', _id: 'e-1', title: 'boAt Wave Flex Smartwatch', price: 2499, originalPrice: 4999, discountPercentage: 50,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.4, count: 12345 }, description: '1.83" HD Display, Bluetooth Calling, 100+ Sports Modes, 7-Day Battery Life & IP68 Water Resistance.',
    badge: 'Trending', stock: 28, colors: ['Midnight Black', 'Metallic Silver', 'Deep Blue']
  },
  {
    id: 'e-2', _id: 'e-2', title: 'realme Buds T310 ANC Earbuds', price: 1799, originalPrice: 2999, discountPercentage: 40,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.3, count: 8765 }, description: '46dB Hybrid Active Noise Cancellation, 360° Spatial Audio, 12.4mm Dynamic Bass Drivers and 40 Hours playback.',
    badge: 'Top Rated', stock: 42, colors: ['Monet Purple', 'Vibrant Black', 'Agile White']
  },
  {
    id: 'e-3', _id: 'e-3', title: 'Sony WH-1000XM5 Wireless ANC Headphones', price: 26990, originalPrice: 34990, discountPercentage: 23,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 4200 }, description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    badge: 'Flagship', stock: 22, colors: ['Silver', 'Black', 'Midnight Blue']
  },
  {
    id: 'e-4', _id: 'e-4', title: 'Apple MacBook Air M2 13.6-inch', price: 99900, originalPrice: 114900, discountPercentage: 13,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 8750 }, description: 'Strikingly thin design with M2 chip, 13.6-inch Liquid Retina display, 1080p FaceTime HD camera, 18-hour battery.',
    badge: 'Premium', stock: 12, colors: ['Midnight', 'Starlight', 'Space Grey']
  },
  {
    id: 'e-5', _id: 'e-5', title: 'Samsung Galaxy S24 Ultra 5G', price: 119999, originalPrice: 134999, discountPercentage: 11,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 6520 }, description: 'Galaxy AI with 200MP camera, built-in S Pen, Snapdragon 8 Gen 3, Titanium frame with Gorilla Armor glass.',
    badge: 'Top Pick', stock: 15, colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet']
  },
  {
    id: 'e-6', _id: 'e-6', title: 'Apple Watch Series 9 GPS 45mm', price: 41900, originalPrice: 44900, discountPercentage: 7,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 5310 }, description: 'S9 SiP with Double Tap gesture, brighter Always-On display, ECG and Blood Oxygen apps.',
    badge: 'Trending', stock: 25, colors: ['Midnight', 'Starlight', 'Silver']
  },
  {
    id: 'e-7', _id: 'e-7', title: 'JBL Charge 5 Portable Bluetooth Speaker', price: 14999, originalPrice: 17999, discountPercentage: 17,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 9140 }, description: 'Bold JBL Original Pro Sound, 20 hours playtime, IP67 waterproof and dustproof, built-in powerbank.',
    badge: 'Bestseller', stock: 35, colors: ['Squad Camo', 'Black', 'Teal', 'Red']
  },
  {
    id: 'e-8', _id: 'e-8', title: 'Logitech MX Master 3S Wireless Mouse', price: 8995, originalPrice: 10995, discountPercentage: 18,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc040ff?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc040ff?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 11200 }, description: 'Quiet clicks with 8K DPI track-on-glass sensor, MagSpeed electromagnetic scrolling.',
    badge: 'Editor Choice', stock: 40, colors: ['Graphite', 'Pale Grey']
  },
  {
    id: 'e-9', _id: 'e-9', title: 'Canon EOS R50 Mirrorless Creator Kit', price: 64990, originalPrice: 75990, discountPercentage: 14,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 1890 }, description: '24.2MP APS-C sensor, uncropped 4K 30p video, Dual Pixel CMOS AF II with subject detection.',
    badge: 'Creator Special', stock: 8
  },
  {
    id: 'e-10', _id: 'e-10', title: 'Marshall Emberton II Portable Speaker', price: 15999, originalPrice: 19999, discountPercentage: 20,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 3410 }, description: '30+ hours of portable playtime, IP67 dust and water resistance, multi-directional 360° True Stereophonic sound.',
    badge: 'Iconic Design', stock: 18, colors: ['Black and Brass', 'Cream']
  },
  {
    id: 'e-11', _id: 'e-11', title: 'iPad Pro 11-inch M4 Ultra Retina XDR', price: 99900, originalPrice: 109900, discountPercentage: 9,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 4500 }, description: 'Breakthrough Ultra Retina XDR display, outrageous performance of the Apple M4 chip in an ultrathin design.',
    badge: 'New Launch', stock: 14, colors: ['Space Black', 'Silver']
  },
  {
    id: 'e-12', _id: 'e-12', title: 'Kindle Paperwhite Signature Edition (32GB)', price: 17999, originalPrice: 20999, discountPercentage: 14,
    category: 'Electronics', image: 'https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 14900 }, description: '6.8" glare-free 300 ppi display, wireless charging, auto-adjusting front light, 10 weeks battery.',
    badge: 'Must Have', stock: 30, colors: ['Agave Green', 'Denim', 'Black']
  },

  // ==========================================
  //               FASHION (24)
  // ==========================================
  {
    id: 'f-1', _id: 'f-1', title: 'Adidas Grand Court 2.0 Sneakers', price: 4499, originalPrice: 6999, discountPercentage: 36,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 6542 }, description: 'Classic tennis-inspired lifestyle sneakers built with premium Cloudfoam Comfort cushioning.',
    badge: 'Bestseller', stock: 19, colors: ['Cloud White', 'Triple White', 'Core Black'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: 'f-2', _id: 'f-2', title: 'Minimalist Sand Hoodie Oversized', price: 1999, originalPrice: 3499, discountPercentage: 43,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 1890 }, description: '100% heavyweight 420 GSM organic French terry cotton with relaxed drop-shoulder silhouette.',
    badge: 'Winter Special', stock: 50, colors: ['Oatmeal Sand', 'Charcoal Grey', 'Sage Green'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'f-3', _id: 'f-3', title: "Levi's Men's 511 Slim Fit Jeans", price: 2999, originalPrice: 4599, discountPercentage: 35,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 7420 }, description: 'A modern slim with room to move. Added stretch for all-day comfort with classic 5-pocket styling.',
    badge: 'Classic', stock: 60, colors: ['Dark Indigo', 'Washed Black', 'Light Blue'], sizes: ['30', '32', '34', '36']
  },
  {
    id: 'f-4', _id: 'f-4', title: 'Zara Floral Embroidered Linen Shirt', price: 2790, originalPrice: 3990, discountPercentage: 30,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.4, count: 2130 }, description: '100% breathable European flax linen with intricate artisanal embroidery and camp collar styling.',
    badge: 'Summer Essential', stock: 30, colors: ['Off White', 'Sage Mist', 'Sky Blue'], sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'f-5', _id: 'f-5', title: 'Ray-Ban Aviator Classic Polarized', price: 9590, originalPrice: 11990, discountPercentage: 20,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 5410 }, description: 'Timeless tear-drop shaped gold metal frame with G-15 polarized green crystal lenses providing 100% UV protection.',
    badge: 'Iconic', stock: 25, colors: ['Gold / Green Polarized', 'Gunmetal / Grey']
  },
  {
    id: 'f-6', _id: 'f-6', title: 'Nike Air Force 1 07 Triple White', price: 8195, originalPrice: 9695, discountPercentage: 15,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 18400 }, description: 'The radiance lives on in the Nike Air Force 1 07, the b-ball icon that puts a fresh spin on crisp leather.',
    badge: 'Top Seller', stock: 45, colors: ['Triple White'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  },
  {
    id: 'f-7', _id: 'f-7', title: 'Fossil Townsman Automatic Skeleton Watch', price: 14995, originalPrice: 19995, discountPercentage: 25,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 3120 }, description: 'Mechanical automatic movement with visible inner mechanics, genuine amber leather strap, and 44mm case.',
    badge: 'Luxury', stock: 15, colors: ['Amber Leather', 'Smoke Stainless Steel']
  },
  {
    id: 'f-8', _id: 'f-8', title: 'H&M Rib-Knit Polo Sweater Dress', price: 2299, originalPrice: 3499, discountPercentage: 34,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 2480 }, description: 'Fitted, midi-length rib-knit dress in soft cotton blend with collar, V-neck opening, and side slit hem.',
    badge: 'Trending', stock: 35, colors: ['Cream', 'Mocha Brown', 'Black'], sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'f-9', _id: 'f-9', title: 'Tommy Hilfiger Leather Bifold Wallet', price: 2499, originalPrice: 3999, discountPercentage: 38,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 4890 }, description: '100% genuine Napa leather with RFID blocking technology, 6 card slots, currency compartment, and gift box.',
    badge: 'Gifting Favorite', stock: 55, colors: ['Classic Tan', 'Midnight Navy', 'Matte Black']
  },
  {
    id: 'f-10', _id: 'f-10', title: 'Puma Suede Classic XXI Lifestyle Shoes', price: 4999, originalPrice: 6999, discountPercentage: 28,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 5800 }, description: 'Full suede upper with synthetic lining, comfortable sockliner, rubber midsole and rubber outsole.',
    badge: 'Heritage', stock: 35, colors: ['Puma Black', 'High Risk Red', 'Peacoat Navy'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: 'f-11', _id: 'f-11', title: 'Allen Solly Cotton Tailored Fit Blazer', price: 5499, originalPrice: 8999, discountPercentage: 38,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 3200 }, description: 'Sophisticated single-breasted blazer in fine textured cotton blend with notched lapels and satin lining.',
    badge: 'Smart Casual', stock: 20, colors: ['Navy Blue', 'Charcoal Melange', 'Beige'], sizes: ['38', '40', '42', '44']
  },
  {
    id: 'f-12', _id: 'f-12', title: 'Michael Kors Mercer Leather Crossbody Bag', price: 18500, originalPrice: 24900, discountPercentage: 25,
    category: 'Fashion', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 1950 }, description: 'Crafted from pebbled leather with structured silhouette, gold-tone hardware and detachable shoulder strap.',
    badge: 'Luxury', stock: 12, colors: ['Luggage Brown', 'Black Gold', 'Soft Pink']
  },

  // ==========================================
  //                BEAUTY (24)
  // ==========================================
  {
    id: 'b-1', _id: 'b-1', title: 'Radiant Glow Niacinamide Serum 30ml', price: 699, originalPrice: 999, discountPercentage: 30,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1608248597359-5481d607412e?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 5410 }, description: '10% Pure Niacinamide + 1% Zinc PCA to clarify blemishes, balance sebum, and boost skin radiance.',
    badge: 'Dermatologist Tested', stock: 65
  },
  {
    id: 'b-2', _id: 'b-2', title: "L'Oreal Paris Revitalift 1.5% Hyaluronic Acid Serum", price: 899, originalPrice: 1299, discountPercentage: 31,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 12800 }, description: 'Intensive plumping serum with macro and micro hyaluronic acid molecules for deep hydration and radiance.',
    badge: 'Bestseller', stock: 90
  },
  {
    id: 'b-3', _id: 'b-3', title: 'MAC Matte Lipstick - Velvet Teddy', price: 1950, originalPrice: 2400, discountPercentage: 19,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 9650 }, description: 'Rich in pigment with a velvety matte finish that lasts up to 10 hours without drying the lips.',
    badge: 'Cult Classic', stock: 40, colors: ['Velvet Teddy', 'Ruby Woo', 'Mehr', 'Whirl']
  },
  {
    id: 'b-4', _id: 'b-4', title: 'Forest Essentials Soundarya Radiance Face Cream', price: 3450, originalPrice: 4200, discountPercentage: 18,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 3200 }, description: 'Luxurious Ayurvedic face cream infused with 24K pure gold bhasma, saffron, and SPF 25 for luminous skin.',
    badge: 'Ayurvedic Luxury', stock: 20
  },
  {
    id: 'b-5', _id: 'b-5', title: 'Dyson Supersonic Hair Dryer Ceramic Pop', price: 34900, originalPrice: 39900, discountPercentage: 13,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 4120 }, description: 'Intelligent heat control to protect hair shine, powered by Dyson digital motor V9 with 5 styling attachments.',
    badge: 'Salon Grade', stock: 10, colors: ['Ceramic Pop', 'Nickel & Copper', 'Iron & Fuchsia']
  },
  {
    id: 'b-6', _id: 'b-6', title: 'Laneige Lip Sleeping Mask - Berry 20g', price: 1150, originalPrice: 1450, discountPercentage: 21,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 15400 }, description: 'Enriched with Berry Fruit Complex, Vitamin C, and coconut oil to gently melt away dead skin cells overnight.',
    badge: 'K-Beauty Favorite', stock: 75, colors: ['Berry', 'Gummy Bear', 'Sweet Candy', 'Vanilla']
  },
  {
    id: 'b-7', _id: 'b-7', title: 'Clinique Moisture Surge 100H Hydrator', price: 2950, originalPrice: 3800, discountPercentage: 22,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 8320 }, description: 'Oil-free gel-cream with aloe bio-ferment + HA complex that penetrates deep into skin for 100 hours of stabilizing hydration.',
    badge: 'Top Rated', stock: 45
  },
  {
    id: 'b-8', _id: 'b-8', title: 'Kay Beauty HD Liquid Concealer', price: 799, originalPrice: 1099, discountPercentage: 27,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 6410 }, description: 'High-definition full coverage concealer enriched with marula oil and chamomile for creaseless all-day wear.',
    badge: 'Cruelty Free', stock: 60, colors: ['110N Light', '125Y Medium', '140N Tan', '160Y Deep']
  },
  {
    id: 'b-9', _id: 'b-9', title: 'Sol de Janeiro Brazilian Bum Bum Cream 240ml', price: 4200, originalPrice: 4900, discountPercentage: 14,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228722-d0b5d0f81a4b?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1556228722-d0b5d0f81a4b?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 11200 }, description: 'Award-winning body cream visibly tightens and hydrates skin with guaraná extract and iconic Cheirosa 62 fragrance.',
    badge: 'Viral Sensation', stock: 35
  },
  {
    id: 'b-10', _id: 'b-10', title: 'Olaplex No. 7 Bonding Hair Oil 30ml', price: 2950, originalPrice: 3500, discountPercentage: 15,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1608248597359-5481d607412e?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1608248597359-5481d607412e?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 7890 }, description: 'Highly concentrated weightless styling oil that increases shine, softness, and color vibrancy while minimizing frizz.',
    badge: 'Salon Essential', stock: 50
  },
  {
    id: 'b-11', _id: 'b-11', title: 'Huda Beauty Empowered Eyeshadow Palette', price: 5350, originalPrice: 6200, discountPercentage: 13,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 4200 }, description: '18 luxurious, easy-to-blend shades featuring velvety mattes, metallic gel-hybrids, and wet-look crushed flakes.',
    badge: 'Glamour', stock: 25
  },
  {
    id: 'b-12', _id: 'b-12', title: 'Jo Malone English Pear & Freesia Cologne 100ml', price: 12500, originalPrice: 14500, discountPercentage: 13,
    category: 'Beauty', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 3100 }, description: 'Sensuous freshness of just-ripe pears wrapped in a bouquet of white freesias, and mellowed by amber, patchouli and woods.',
    badge: 'Luxury Fragrance', stock: 15
  },

  // ==========================================
  //                 HOME (24)
  // ==========================================
  {
    id: 'h-1', _id: 'h-1', title: 'Havells Prolife Air Fryer 4.5L', price: 5999, originalPrice: 9999, discountPercentage: 40,
    category: 'Home', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.4, count: 3210 }, description: '1500W Rapid Air Crisp Technology for 85% less oil cooking, digital touch panel with 8 smart presets.',
    badge: 'Deal of Day', stock: 15, colors: ['Obsidian Black', 'Graphite Grey']
  },
  {
    id: 'h-2', _id: 'h-2', title: 'Scandinavian Lounge Chair & Plant Stand', price: 8499, originalPrice: 14999, discountPercentage: 43,
    category: 'Home', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 980 }, description: 'Ergonomic solid beechwood armchair upholstered in premium breathable linen with matching brass plant stand.',
    badge: 'Home Decor', stock: 12, colors: ['Oatmeal Cream', 'Mustard Gold', 'Forest Green']
  },
  {
    id: 'h-3', _id: 'h-3', title: 'Philips Hue Smart Ambient Light Bar Duo', price: 9999, originalPrice: 12999, discountPercentage: 23,
    category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 3890 }, description: '16 million colors with music and screen sync, voice control via Alexa & Google Assistant, versatile mounting.',
    badge: 'Smart Living', stock: 25, colors: ['Matte Black', 'Snow White']
  },
  {
    id: 'h-4', _id: 'h-4', title: 'Wonderchef Royal Velvet Non-Stick Cookware Set', price: 3499, originalPrice: 5999, discountPercentage: 42,
    category: 'Home', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 6720 }, description: '5-piece designer kitchen set including Wok with Lid, Fry Pan, Dosa Tawa and Mini Fry Pan with 5-layer MetaTuff coating.',
    badge: 'Kitchen Best', stock: 40, colors: ['Royal Purple', 'Ruby Red', 'Teal Blue']
  },
  {
    id: 'h-5', _id: 'h-5', title: 'Dyson V12 Detect Slim Cordless Vacuum', price: 44900, originalPrice: 55900, discountPercentage: 20,
    category: 'Home', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 2190 }, description: 'Illuminates invisible dust on hard floors with piezo sensor acoustic particle counter and 60 minutes run time.',
    badge: 'Cutting Edge', stock: 8
  },
  {
    id: 'h-6', _id: 'h-6', title: 'Nespresso Vertuo Pop Espresso Machine', price: 14999, originalPrice: 18999, discountPercentage: 21,
    category: 'Home', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 4120 }, description: 'Centrifusion technology for full-bodied coffee and rich crema at the touch of a button with 5 cup sizes.',
    badge: 'Coffee Bar', stock: 18, colors: ['Licorice Black', 'Spicy Red', 'Aqua Mint', 'Coconut White']
  },
  {
    id: 'h-7', _id: 'h-7', title: 'Wakefit Orthopedic Memory Foam Mattress Queen', price: 11499, originalPrice: 16999, discountPercentage: 32,
    category: 'Home', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 14200 }, description: 'Targeted spine alignment with NextGen memory foam and breathable high-resilience base with removable zipper cover.',
    badge: '100-Night Trial', stock: 20
  },
  {
    id: 'h-8', _id: 'h-8', title: 'Urban Ladder Sheesham Wood Solid Coffee Table', price: 6999, originalPrice: 11999, discountPercentage: 42,
    category: 'Home', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 1840 }, description: 'Handcrafted solid Indian Rosewood with warm provincial teak finish and built-in lower magazine rack.',
    badge: 'Handcrafted', stock: 14, colors: ['Teak Finish', 'Mahogany Dark']
  },
  {
    id: 'h-9', _id: 'h-9', title: 'D\'Decor Blackout Thermal Window Curtains (Pair)', price: 1899, originalPrice: 3299, discountPercentage: 42,
    category: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 5210 }, description: 'Triple weave technology blocks 99% light and UV rays, reduces outside noise, with rust-resistant brass grommets.',
    badge: 'Home Comfort', stock: 50, colors: ['Slate Grey', 'Ivory Cream', 'Navy Night']
  },
  {
    id: 'h-10', _id: 'h-10', title: 'IKEA Modern Minimalist LED Floor Lamp', price: 3490, originalPrice: 4990, discountPercentage: 30,
    category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 4320 }, description: 'Sleek arch design in matte black steel with warm 2700K ambient LED and step-on foot switch.',
    badge: 'Scandinavian', stock: 35, colors: ['Matte Black', 'Brushed Brass']
  },
  {
    id: 'h-11', _id: 'h-11', title: 'Milton Stainless Steel Insulated Casserole Set (3 Pc)', price: 1999, originalPrice: 2999, discountPercentage: 33,
    category: 'Home', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.4, count: 9800 }, description: 'Double-walled polyurethane insulation keeps food piping hot or chilled for hours with integrated side handles.',
    badge: 'Family Dining', stock: 60, colors: ['Silver Metallic', 'Wine Red']
  },
  {
    id: 'h-12', _id: 'h-12', title: 'Bespoke Ceramic Artisan Dinnerware Set (16 Pc)', price: 4999, originalPrice: 7999, discountPercentage: 37,
    category: 'Home', image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 1850 }, description: 'Handcrafted stoneware glazed with organic matte finish. Microwave, dishwasher, and oven safe up to 220°C.',
    badge: 'Artisanal', stock: 18, colors: ['Speckled Sand', 'Nordic Grey', 'Sage Green']
  },

  // ==========================================
  //                FITNESS (24)
  // ==========================================
  {
    id: 'ft-1', _id: 'ft-1', title: 'Pro Hex Cast Iron Dumbbells Set (2x 10kg)', price: 3299, originalPrice: 5499, discountPercentage: 40,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 2150 }, description: 'Heavy-duty anti-roll rubber coated hexagonal dumbbells with knurled ergonomic chrome handles.',
    badge: 'Gym Grade', stock: 25, colors: ['Matte Black']
  },
  {
    id: 'ft-2', _id: 'ft-2', title: 'Optimum Nutrition Gold Standard 100% Whey 2kg', price: 6299, originalPrice: 7999, discountPercentage: 21,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 28400 }, description: '24g of Whey Protein with Whey Protein Isolates as primary ingredient and 5.5g of naturally occurring BCAAs.',
    badge: 'World #1', stock: 80, colors: ['Double Rich Chocolate', 'Extreme Milk Chocolate', 'Delicious Strawberry']
  },
  {
    id: 'ft-3', _id: 'ft-3', title: 'Manduka PRO Yoga & Pilates Mat 6mm', price: 4499, originalPrice: 6499, discountPercentage: 31,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 4890 }, description: 'High-density cushion for unparalleled joint protection, closed-cell surface keeps moisture and sweat out.',
    badge: 'Eco Friendly', stock: 35, colors: ['Midnight Purple', 'Sage Olive', 'Charcoal Black']
  },
  {
    id: 'ft-4', _id: 'ft-4', title: 'Theragun Prime Deep Tissue Percussive Massager', price: 19999, originalPrice: 24999, discountPercentage: 20,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.7, count: 3140 }, description: '16mm amplitude reaches 60% deeper into muscle than consumer-grade vibration massagers with Bluetooth app control.',
    badge: 'Pro Recovery', stock: 12
  },
  {
    id: 'ft-5', _id: 'ft-5', title: 'Nike Pro Dri-FIT Compression Training Tights', price: 2495, originalPrice: 3495, discountPercentage: 29,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 5890 }, description: 'Lightweight fabric hugs your body with sweat-wicking technology to help keep you dry, cool and supported.',
    badge: 'Athletic Wear', stock: 45, colors: ['Black / White', 'Obsidian Navy'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'ft-6', _id: 'ft-6', title: 'Speedo Fastskin Hyper Elite Swimming Goggles', price: 3499, originalPrice: 4999, discountPercentage: 30,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 1840 }, description: 'Hydroscopic lens profile for maximum peripheral vision with IQfit 3D goggle seal for leak-free, secure fit.',
    badge: 'Pro Swim', stock: 30, colors: ['Mirror Blue', 'Gold Amber', 'Smoke Grey']
  },
  {
    id: 'ft-7', _id: 'ft-7', title: 'Garmin Forerunner 265 GPS Running Smartwatch', price: 42990, originalPrice: 49990, discountPercentage: 14,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.9, count: 2980 }, description: 'Vibrant AMOLED touchscreen display, training readiness metrics, HRV status, recovery advisor.',
    badge: 'Marathon Ready', stock: 15, colors: ['Black / Slate Grey', 'Whitestone / Tidal Blue']
  },
  {
    id: 'ft-8', _id: 'ft-8', title: 'Hydro Flask 32 oz Wide Mouth Insulated Bottle', price: 2999, originalPrice: 4299, discountPercentage: 30,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 11400 }, description: 'TempShield double-wall vacuum insulation keeps drinks ice cold up to 24 hours or hot up to 12 hours. BPA-Free.',
    badge: 'Hydration', stock: 65, colors: ['Pacific Blue', 'Olive Green', 'Snapper Red', 'Black']
  },
  {
    id: 'ft-9', _id: 'ft-9', title: 'Cultsport Smart Pro Exercise Spin Bike', price: 16999, originalPrice: 24999, discountPercentage: 32,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.6, count: 2100 }, description: 'Magnetic resistance system with silent belt drive, live session streaming via app, tablet mount and ergonomic saddle.',
    badge: 'Home Cardio', stock: 10, colors: ['Stealth Black', 'Crimson Red']
  },
  {
    id: 'ft-10', _id: 'ft-10', title: 'Under Armour Project Rock Training Backpack 30L', price: 4999, originalPrice: 6999, discountPercentage: 28,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.8, count: 3450 }, description: 'UA Storm water-resistant technology, tough abrasion-resistant bottom panel, soft lined laptop sleeve.',
    badge: 'Tough Built', stock: 35, colors: ['Pitch Gray', 'Black']
  },
  {
    id: 'ft-11', _id: 'ft-11', title: 'Decathlon Cross Training Resistance Band Set (5 Pcs)', price: 1299, originalPrice: 1999, discountPercentage: 35,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.5, count: 8700 }, description: '100% natural latex bands ranging from 5kg to 45kg resistance. Perfect for pull-up assists and mobility.',
    badge: 'Home Workout', stock: 70
  },
  {
    id: 'ft-12', _id: 'ft-12', title: 'Nivia Storm High Grip Match Football Size 5', price: 799, originalPrice: 1299, discountPercentage: 38,
    category: 'Fitness', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&auto=format&fit=crop&q=80'],
    rating: { rate: 4.4, count: 9500 }, description: 'Rubberized molded construction, 32-panel design with reinforced bladder for excellent air retention and shape.',
    badge: 'FIFA Standard', stock: 50, colors: ['White & Orange', 'Yellow & Black']
  }
];
