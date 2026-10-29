/**
 * Munir Ahmed Decorations (منیر احمد ڈیکوریشنز)
 * Authoritative Master Catalog & Stock Inventory
 * Real Pakistani Party Supplies, Balloons, Candles, Toppers, Sashes, Gift Wrap & Bags
 */

const MUNIR_CATALOG = [
  // =========================================================================
  // 1. FOIL BALLOONS & LETTER BANNERS
  // =========================================================================
  {
    id: 'FB-001',
    title: '"DATE FIXED" 9-Piece Foil Balloon Letter Banner',
    urduTitle: 'ڈیٹ فکسڈ 9 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 380,
    stock: 94,
    lowStockThreshold: 15,
    badge: 'Wedding Hit',
    rating: 4.9,
    reviewsCount: 184,
    image: 'assets/inventory/date_fixed_balloons.jpg',
    description: 'High-grade 16" metallic foil alphabet letter balloons spelling "DATE FIXED". Self-sealing valve, reusable, comes with hanging ribbon straw. Available in Imperial Gold, Sterling Silver, Crimson Red, and Rose Pink.',
    specs: {
      pieces: '9 Foil Letter Balloons',
      size: '16 Inch / ~40cm per letter',
      colors: 'Gold, Silver, Red, Pink',
      material: 'Multi-layer Mylar Foil with Micro-Seals'
    }
  },
  {
    id: 'FB-002',
    title: '"BAAT PAKKI" 9-Piece Foil Balloon Letter Banner',
    urduTitle: 'بات پکی 9 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 390,
    stock: 82,
    lowStockThreshold: 15,
    badge: 'Trending',
    rating: 5.0,
    reviewsCount: 215,
    image: 'assets/inventory/baat_pakki_balloons.jpg',
    description: 'The iconic Pakistani engagement celebration letter banner. 9-piece high-shine metallic balloons spelling "BAAT PAKKI". Brilliant photo-shoot backdrop for family dholkis and formal proposals.',
    specs: {
      pieces: '9 Foil Letter Balloons',
      size: '16 Inch per letter',
      colors: 'Mirror Gold, Sterling Silver',
      material: 'Premium High-Gloss Foil'
    }
  },
  {
    id: 'FB-003',
    title: '"MEHNDI" 6-Piece Foil Balloon Letter Banner',
    urduTitle: 'مہندی 6 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 290,
    stock: 120,
    lowStockThreshold: 20,
    badge: 'Bestseller',
    rating: 4.9,
    reviewsCount: 270,
    image: 'assets/inventory/mehndi_balloons.jpg',
    description: 'Vibrant 6-piece "MEHNDI" foil banner set. Self-inflating with included straw, hangs securely on curtains, walls, or floral frames. Brilliant shine under festive warm lighting.',
    specs: {
      pieces: '6 Foil Letter Balloons',
      size: '16 Inch',
      colors: 'Radiant Gold, Bright Silver',
      material: 'Mylar Foil'
    }
  },
  {
    id: 'FB-004',
    title: '"ENGAGEMENT" 10-Piece Foil Balloon Letter Banner',
    urduTitle: 'انگیجمنٹ 10 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 420,
    stock: 65,
    lowStockThreshold: 12,
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 140,
    image: 'assets/inventory/engagement_balloons.jpg',
    description: '10-piece "ENGAGEMENT" luxury foil balloons. Designed for stage backdrops, entry doors, and milestone photography. Self-sealing leak-proof valves.',
    specs: {
      pieces: '10 Foil Letter Balloons',
      size: '16 Inch per letter',
      colors: 'Gold, Silver, Red',
      material: 'Reinforced Mylar'
    }
  },
  {
    id: 'FB-005',
    title: '"BRIDE TO BE" 9-Piece Foil Balloon Banner Set',
    urduTitle: 'برائیڈ ٹو بی 9 پیس فوائل بیلون',
    category: 'foil-balloons',
    price: 390,
    stock: 88,
    lowStockThreshold: 15,
    badge: 'Top Pick',
    rating: 4.9,
    reviewsCount: 310,
    image: 'assets/inventory/bride_to_be_balloons.jpg',
    description: 'Essential for bridal showers, bachelorette party rooms, and wedding morning photo corners. 9-piece foil balloons in Rose Pink, Gold, Silver, Red, and Midnight Black.',
    specs: {
      pieces: '9 Foil Letter Balloons',
      size: '16 Inch',
      colors: 'Rose Pink, Gold, Silver, Red, Black',
      material: 'Mylar Foil'
    }
  },
  {
    id: 'FB-006',
    title: '"NIKKAH MUBARAK" 13-Piece Foil Balloon Banner',
    urduTitle: 'نکاح مبارک 13 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 520,
    stock: 73,
    lowStockThreshold: 10,
    badge: 'Nikkah Hit',
    rating: 5.0,
    reviewsCount: 290,
    image: 'assets/inventory/nikkah_mubarak_balloons.jpg',
    description: 'Complete 13-piece "NIKKAH MUBARAK" foil balloon letters set. Premium metallic finish creates a grand, blessing-filled atmosphere for the couple and wedding hall guests.',
    specs: {
      pieces: '13 Foil Letter Balloons',
      size: '16 Inch per letter',
      colors: 'Golden, Crimson Red, Silver',
      material: 'Tear-resistant Mylar'
    }
  },
  {
    id: 'FB-007',
    title: '"WELCOME" 7-Piece Premium Foil Balloon Letters',
    urduTitle: 'ویلکم 7 پیس فوائل بیلون بینر',
    category: 'foil-balloons',
    price: 340,
    stock: 90,
    lowStockThreshold: 15,
    badge: 'Versatile',
    rating: 4.8,
    reviewsCount: 165,
    image: 'assets/inventory/welcome_balloons.jpg',
    description: '7-piece "WELCOME" balloon set for welcoming Umrah/Hajj pilgrims, new brides home, newborn babies, or international guests. Vibrant, eye-catching gloss.',
    specs: {
      pieces: '7 Foil Letter Balloons',
      size: '16 Inch',
      colors: 'Gold, Silver, Rose Gold, Pink',
      material: 'Mylar Foil'
    }
  },
  {
    id: 'FB-008',
    title: '"HAPPY ANNIVERSARY" 16-Piece Foil Balloon Set',
    urduTitle: 'ہیپی اینیورسری 16 پیس فوائل بیلون',
    category: 'foil-balloons',
    price: 580,
    stock: 58,
    lowStockThreshold: 10,
    badge: 'Anniversary',
    rating: 4.9,
    reviewsCount: 178,
    image: 'assets/inventory/happy_anniversary_balloons.jpg',
    description: '16-piece complete "HAPPY ANNIVERSARY" banner. Elevates milestone wedding anniversaries with radiant romantic shine.',
    specs: {
      pieces: '16 Foil Letters',
      size: '16 Inch',
      colors: 'Gold, Silver, Rainbow Multi',
      material: 'Mylar Foil'
    }
  },
  {
    id: 'FB-009',
    title: '"HAPPY BIRTHDAY" 16" Foil Balloon Set (14 Themes)',
    urduTitle: 'ہیپی برتھ ڈے 13 پیس فوائل بیلون سیٹ',
    category: 'foil-balloons',
    price: 350,
    stock: 240,
    lowStockThreshold: 30,
    badge: 'All-Time #1',
    rating: 5.0,
    reviewsCount: 650,
    image: 'assets/inventory/happy_birthday_balloons_set.jpg',
    description: '13-letter "HAPPY BIRTHDAY" foil balloon banner available in 14 distinct color themes: Confetti dots, Black/Gold luxury, Rainbow, Fireworks, Rose Gold, Royal Blue, and Pastel Pink.',
    specs: {
      pieces: '13 Foil Letter Balloons + Ribbon',
      size: '16 Inch',
      themes: '14 Assorted Colorways',
      material: 'Eco-grade Mylar Foil'
    }
  },
  {
    id: 'FB-010',
    title: 'Giant 32-Inch Number Foil Balloons (0 to 9)',
    urduTitle: 'بڑے 32 انچ نمبر فوائل غبارے (0 تا 9)',
    category: 'foil-balloons',
    price: 220,
    stock: 310,
    lowStockThreshold: 40,
    badge: 'Essential',
    rating: 4.8,
    reviewsCount: 420,
    image: 'assets/inventory/happy_birthday_balloons_set.jpg',
    description: 'Jumbo 32-inch metallic numbers (0, 1, 2, 3, 4, 5, 6, 7, 8, 9). For 1st birthdays, sweet 16, 18th, 25th, and golden 50th jubilees. Air or helium float compatible.',
    specs: {
      size: '32 Inch (~80cm)',
      numbers: 'All Digits 0 through 9',
      colors: 'Gold, Silver, Rose Gold, Royal Blue',
      material: 'High-Density Foil'
    }
  },

  // =========================================================================
  // 2. GIFT PAPER & GIFT BAGS (NEWEST REQUESTED INVENTORY)
  // =========================================================================
  {
    id: 'GP-001',
    title: 'Luxury Foil-Stamped Gift Wrapping Paper (Pack of 10 Sheets)',
    urduTitle: 'لگزری فوائل اسٹیمپڈ گفٹ پیپر (10 شیٹس پیک)',
    category: 'gift-packaging',
    price: 450,
    stock: 145,
    lowStockThreshold: 25,
    badge: 'New Arrival',
    rating: 4.9,
    reviewsCount: 112,
    image: 'assets/images/gift_paper.jpg',
    description: 'Heavyweight 80 GSM ultra-glossy gift wrapping paper sheets with metallic gold & silver foil stamping. Features elegant birthday confetti, marble veins, romantic floral, and geometric luxury patterns.',
    specs: {
      packSize: '10 Full Size Sheets (70cm x 50cm)',
      paperWeight: '80 GSM Premium Coated Art Paper',
      finish: 'Metallic Foil Stamping + Gloss Laminate',
      suitableFor: 'Weddings, Birthdays, Eids, Formal Giveaways'
    }
  },
  {
    id: 'GP-002',
    title: 'Jumbo 5-Meter Roll Metallic Gift Wrapping Paper',
    urduTitle: 'جمبو 5 میٹر رول میٹالک گفٹ پیپر',
    category: 'gift-packaging',
    price: 380,
    stock: 95,
    lowStockThreshold: 15,
    badge: 'Best Value',
    rating: 4.8,
    reviewsCount: 88,
    image: 'assets/images/gift_paper.jpg',
    description: 'Continuous 5-meter gift wrap roll (70cm wide). Cuts cleanly without tearing or wrinkling. Tear-resistant grid-lines on reverse side for precise straight cuts.',
    specs: {
      length: '5 Meters (70cm Width)',
      patterns: 'Royal Polka Gold, Holographic Stars, Vintage Florals',
      material: 'Recyclable Kraft Gloss Coated Paper'
    }
  },
  {
    id: 'GB-001',
    title: 'Luxury Foil-Stamped Gift Bags with Satin Handles (Pack of 6)',
    urduTitle: 'لگزری فوائل گفٹ بیگز معہ ساٹن ہینڈل (6 بیگز سیٹ)',
    category: 'gift-packaging',
    price: 650,
    stock: 110,
    lowStockThreshold: 20,
    badge: 'Bestseller',
    rating: 5.0,
    reviewsCount: 156,
    image: 'assets/images/gift_bags.jpg',
    description: 'Exquisite rigid party gift bags crafted from 250 GSM thick artboard. Fitted with soft silk satin ribbon handles, reinforced cardboard base, and matching foil gift tags. Assorted Small, Medium & Large in festive pastel and jewel tones.',
    specs: {
      quantity: '6 Bags (2 Small, 2 Medium, 2 Large)',
      sizes: 'Small: 18x15cm | Med: 24x20cm | Large: 32x26cm',
      handles: 'Woven Silky Satin Ribbon with Eyelet Reinforcement',
      weightCapacity: 'Up to 3.5 kg payload'
    }
  },
  {
    id: 'GB-002',
    title: 'Jumbo Royal Wedding & Birthday Gift Bags (Pack of 4)',
    urduTitle: 'جمبو شاہی گفٹ بیگز (4 بیگز پیک)',
    category: 'gift-packaging',
    price: 780,
    stock: 75,
    lowStockThreshold: 12,
    badge: 'Luxury VIP',
    rating: 4.9,
    reviewsCount: 94,
    image: 'assets/images/gift_bags.jpg',
    description: 'Extra-large luxury party gift bags designed for bridal clothes, electronic gifts, and giant teddy bears. Features embossed gold foil calligraphy with ribbon tie bow closure.',
    specs: {
      quantity: '4 Extra Large Bags (42cm x 31cm x 12cm)',
      material: '300 GSM Heavy Ivory Cardstock',
      closure: 'Front Center Satin Tie Bow'
    }
  },

  // =========================================================================
  // 3. SASHES / WEAR STRIPS (BRIDE, BIRTHDAY GIRL/BOY, ETC.)
  // =========================================================================
  {
    id: 'PS-001',
    title: 'Royal "Bride to Be" Satin Gold Foil Sash with Pearl Pin',
    urduTitle: 'برائیڈ ٹو بی شاہی ساٹن گولڈن شیش',
    category: 'party-sashes',
    price: 320,
    stock: 115,
    lowStockThreshold: 20,
    badge: 'Bride Favorite',
    rating: 5.0,
    reviewsCount: 265,
    image: 'assets/images/party_sashes.jpg',
    description: 'Double-face silky soft satin ribbon sash with mirror gold calligraphy "Bride to Be". Includes decorative faux pearl safety pin for tailored drape across any dress or bridal lehenga.',
    specs: {
      length: '160cm (80cm folded) x 9.5cm wide',
      colors: 'Pure Ivory White, Rose Quartz Pink, Champagne Gold',
      material: 'Premium Non-Crease Silky Satin'
    }
  },
  {
    id: 'PS-002',
    title: '"Birthday Girl" Glitter Satin Sash & Rhinestone Tiara Set',
    urduTitle: 'برتھ ڈے گرل ساٹن شیش اور کرسٹل تاج سیٹ',
    category: 'party-sashes',
    price: 490,
    stock: 84,
    lowStockThreshold: 15,
    badge: '2-in-1 Combo',
    rating: 4.9,
    reviewsCount: 198,
    image: 'assets/images/party_sashes.jpg',
    description: 'Deluxe birthday princess combo! Includes vibrant hot-pink satin sash with sparkling gold glitter font, paired with an alloy rhinestone crystal birthday headband tiara.',
    specs: {
      includes: '1 Sash + 1 Metal Crystal Tiara',
      sashSize: '160cm x 9.5cm',
      tiaraSize: 'Universal Comfort Fit with Anti-Slip Combs'
    }
  },
  {
    id: 'PS-003',
    title: '"Birthday Boy" Midnight Blue & Gold Foil Wear Sash',
    urduTitle: 'برتھ ڈے بوائے نیوی بلیو ساٹن شیش',
    category: 'party-sashes',
    price: 290,
    stock: 76,
    lowStockThreshold: 15,
    badge: 'Boy Birthday',
    rating: 4.8,
    reviewsCount: 142,
    image: 'assets/images/party_sashes.jpg',
    description: 'Crisp midnight navy blue satin sash with bold metallic gold "Birthday Boy" lettering and royal crown emblem. Comfortable wear for all ages.',
    specs: {
      length: '160cm x 9.5cm',
      color: 'Midnight Navy Blue with Gold Foil',
      material: 'Heavy Satin Ribbon'
    }
  },
  {
    id: 'PS-004',
    title: '"Bridal Shower" & "Mom to Be" Milestone Satin Sashes',
    urduTitle: 'برائیڈل شاور اور مام ٹو بی ساٹن شیش',
    category: 'party-sashes',
    price: 320,
    stock: 62,
    lowStockThreshold: 10,
    badge: 'Shower Special',
    rating: 4.9,
    reviewsCount: 120,
    image: 'assets/images/party_sashes.jpg',
    description: 'Pastel peach, baby pink, and mint satin sashes stamped with rose gold cursive. Perfect for bridal shower squads and motherhood celebrations.',
    specs: {
      options: '"Bridal Shower", "Mom to Be", "Groom to Be"',
      material: 'Silky Satin Ribbon'
    }
  },

  // =========================================================================
  // 4. CANDLES & ANAR SPARKLERS (FIREWORK CANDLES)
  // =========================================================================
  {
    id: 'CD-001',
    title: 'Anar Candles (Indoor Firework Fountain Sparklers - 6 Pack)',
    urduTitle: 'انار کینڈلز (انڈور فائر ورک شعلہ کینڈلز 6 پیک)',
    category: 'candles-sparklers',
    price: 680,
    stock: 135,
    lowStockThreshold: 25,
    badge: 'Bestseller 🔥',
    rating: 5.0,
    reviewsCount: 380,
    image: 'assets/inventory/anar_firework_candles.jpg',
    description: 'Indoor ice fountain sparkler candles (Anar Candles). Burns with dazzling, smokeless, cold-spark golden fireworks for 45-60 seconds! Comes with food-grade cake spikes. Dazzling centerpiece for cake cutting ceremonies and bridal entry!',
    specs: {
      quantity: '6 Sparkler Fountain Sticks in Pack',
      height: '18cm with Spikes',
      duration: '45 to 60 seconds continuous cold sparks',
      safety: 'Food-safe spike base, indoor certified, smokeless'
    }
  },
  {
    id: 'CD-002',
    title: 'Tall Metallic Spiral Birthday Candles (Pack of 10 with Spikes)',
    urduTitle: 'لمبی میٹالک اسپرل موم بتیاں (10 پیس معہ اسٹینڈ)',
    category: 'candles-sparklers',
    price: 250,
    stock: 210,
    lowStockThreshold: 30,
    badge: 'Cake Essential',
    rating: 4.9,
    reviewsCount: 290,
    image: 'assets/inventory/spiral_candles_metallic.jpg',
    description: 'Elegant slender spiral candles in rich metallic chrome colors (Rose Gold, Royal Blue, Purple, Soft Pink, Crimson Red, and Imperial Gold). Non-drip paraffin wax with white cake spikes.',
    specs: {
      quantity: '10 Spiral Candles per Blister Pack',
      length: '14cm tall',
      burnTime: '10+ minutes smokeless clean burn',
      colors: 'Chrome Gold, Rose Gold, Blue, Silver, Purple'
    }
  },
  {
    id: 'CD-003',
    title: 'Star Topper Stem Candles + Spiral Candles Set',
    urduTitle: 'اسٹار ٹاپر اور اسپرل کینڈل سیٹ',
    category: 'candles-sparklers',
    price: 290,
    stock: 140,
    lowStockThreshold: 20,
    badge: 'Cute Design',
    rating: 4.8,
    reviewsCount: 175,
    image: 'assets/inventory/star_candles_spiral.jpg',
    description: 'Multi-star molded candles with long slender spiral companion candles. Gives cakes an enchanting layered height dimension in Gold, Silver, Lilac, and Blue.',
    specs: {
      setIncludes: '2 Star Top Candles + 4 Metallic Sticks',
      material: 'Refined Paraffin Wax'
    }
  },
  {
    id: 'CD-004',
    title: '3-Star Stem Cake Candles (Pack of 5)',
    urduTitle: '3 اسٹار اسٹیم کیک کینڈلز (5 پیک)',
    category: 'candles-sparklers',
    price: 260,
    stock: 115,
    lowStockThreshold: 15,
    badge: 'Kids Favorite',
    rating: 4.8,
    reviewsCount: 130,
    image: 'assets/inventory/star_stem_cake_candles.jpg',
    description: 'Triple star cluster molded candles on clear slender sticks. Available in Ruby Red, Royal Blue, Silver, Gold, and Metallic Pink.',
    specs: {
      quantity: '5 Stem Candles',
      height: '15cm'
    }
  },
  {
    id: 'CD-005',
    title: 'Crown Glitter Metallic Number Candles (0 to 9)',
    urduTitle: 'کراؤن گلیٹر نمبر کینڈلز (0 تا 9)',
    category: 'candles-sparklers',
    price: 180,
    stock: 280,
    lowStockThreshold: 30,
    badge: 'Milestone',
    rating: 4.9,
    reviewsCount: 340,
    image: 'assets/inventory/star_candles_spiral.jpg',
    description: 'Glitter encrusted 3D number candles crowned with a miniature gold tiara. Individual digits 0 to 9 in Gold, Rose Gold, and Silver.',
    specs: {
      height: '7.5cm (excluding stick)',
      digits: '0 through 9 individually packed',
      material: 'Smokeless Wax'
    }
  },

  // =========================================================================
  // 5. CAKE TOPPERS (MIRROR ACRYLIC & CALLIGRAPHY)
  // =========================================================================
  {
    id: 'CT-001',
    title: 'Metallic Acrylic "Happy Birthday" Star Toppers (Pack of 6)',
    urduTitle: 'میٹالک ایکریلک ہیپی برتھ ڈے ٹاپرز (6 پیس سیٹ)',
    category: 'cake-toppers',
    price: 450,
    stock: 160,
    lowStockThreshold: 25,
    badge: 'Top Value',
    rating: 4.9,
    reviewsCount: 295,
    image: 'assets/inventory/acrylic_cake_toppers.jpg',
    description: 'Assorted 6-piece acrylic cake topper collection. Includes Cursive Gold, Geometric Blue, Star Cyan, Violet Star, Romantic Pink, and Silver Calligraphy. Reusable and food safe.',
    specs: {
      quantity: '6 Individual Cake Toppers',
      size: '15cm x 12cm',
      material: 'Laser-Cut Cast Acrylic',
      reusable: 'Yes (Washable)'
    }
  },
  {
    id: 'CT-002',
    title: '"Dulhan" (دلہن) Royal Mirror Gold Acrylic Cake Topper',
    urduTitle: 'شاہی "دلہن" نستعلیق گولڈن ایکریلک ٹاپر',
    category: 'cake-toppers',
    price: 490,
    stock: 78,
    lowStockThreshold: 15,
    badge: 'Wedding Hit',
    rating: 5.0,
    reviewsCount: 240,
    image: 'assets/images/cake_toppers.jpg',
    description: 'Iconic traditional Nastaliq script "Dulhan" cake topper in radiant 3mm mirror gold acrylic. Centerpiece of choice for bridal showers, Mayun, and Mehndi cakes.',
    specs: {
      material: '3mm Mirror Gold Cast Acrylic',
      script: 'Urdu Nastaliq Calligraphy',
      dimensions: '16cm x 14cm'
    }
  },
  {
    id: 'CT-003',
    title: '"Baat Pakki" (بات پکی) & "Nikkah Mubarak" Acrylic Toppers',
    urduTitle: 'بات پکی اور نکاح مبارک شیشہ نما ٹاپرز',
    category: 'cake-toppers',
    price: 480,
    stock: 85,
    lowStockThreshold: 15,
    badge: 'Bestseller',
    rating: 5.0,
    reviewsCount: 220,
    image: 'assets/images/cake_toppers.jpg',
    description: 'Laser-cut Urdu script toppers for milestone Pakistani ceremonies. High-reflective gold finish with crystal-clear food stem.',
    specs: {
      options: '"Baat Pakki", "Nikkah Mubarak", "Qabool Hai"',
      material: 'Dual-surface Mirror Acrylic'
    }
  },
  {
    id: 'CT-004',
    title: '"Mr & Mrs" Botanical Wreath Mirror Gold Cake Topper',
    urduTitle: 'مسٹر اینڈ مسز بارات گولڈن ٹاپر',
    category: 'cake-toppers',
    price: 450,
    stock: 64,
    lowStockThreshold: 10,
    badge: 'Walima Choice',
    rating: 4.8,
    reviewsCount: 160,
    image: 'assets/images/cake_toppers.jpg',
    description: 'Elegant circular laurel wreath framing cursive "Mr & Mrs". Sophisticated modern aesthetic for Nikkah & Walima receptions.',
    specs: {
      diameter: '14cm',
      material: 'Mirror Gold Acrylic'
    }
  },

  // =========================================================================
  // 6. PARTY POPPERS, SNOW SPRAYS & PARTY THROWS
  // =========================================================================
  {
    id: 'PP-001',
    title: '20cm Metallic Confetti Cannon Party Popper',
    urduTitle: '20 سینٹی میٹر کنفیٹی کینن پارٹی پوپر',
    category: 'poppers-sprays',
    price: 220,
    stock: 180,
    lowStockThreshold: 25,
    badge: '20cm Size 🎉',
    rating: 4.9,
    reviewsCount: 340,
    image: 'assets/inventory/party_poppers_cannons.jpg',
    description: 'Authentic 20cm compressed-air celebration party popper loaded with gleaming metallic foil confetti strips and star glitter. 100% non-explosive pneumatic twist action. Perfect for birthday cake cutting, surprise reveals, and festive parties.',
    specs: {
      size: '20cm (~8 Inch)',
      mechanism: 'Air-Compressed Twist Action (Non-explosive)',
      contents: 'Flame-Retardant Metallic Gold & Multi-color Foil',
      safety: '100% Safe for Indoor & Outdoor Celebrations'
    }
  },
  {
    id: 'PP-002',
    title: '30cm Deluxe Confetti Cannon Party Popper',
    urduTitle: '30 سینٹی میٹر ڈیلکس کنفیٹی پارٹی پوپر',
    category: 'poppers-sprays',
    price: 350,
    stock: 150,
    lowStockThreshold: 25,
    badge: '30cm Mega Blast 💥',
    rating: 5.0,
    reviewsCount: 420,
    image: 'assets/inventory/party_poppers_cannons.jpg',
    description: 'High-blast 30cm compressed-air confetti cannon loaded with multi-color metallic foil confetti and shimmering stars. Shoots confetti 5 to 7 meters high! Twist-action base for weddings, stage celebrations, Barat entries, and milestone grand moments.',
    specs: {
      size: '30cm (~12 Inch)',
      blastHeight: '5 - 7 Meters',
      mechanism: 'Pneumatic Air-Compressed Twist Base',
      contents: 'High-Shine Metallic Confetti Stars & Ribbons'
    }
  },
  {
    id: 'PP-003',
    title: 'Colour Smoke Torches / Smoke Grenades (3-Pack)',
    urduTitle: 'کلر اسموک کینڈلز / اسموک گرینیڈز (3 پیک)',
    category: 'poppers-sprays',
    price: 750,
    stock: 92,
    lowStockThreshold: 15,
    badge: 'Viral Photo Prop',
    rating: 4.9,
    reviewsCount: 280,
    image: 'assets/inventory/smoke_bombs_colour.jpg',
    description: 'High-density color smoke torches for bridal entries, car rally celebrations, and dynamic outdoor photo shoots. Produces thick vibrant clouds for 60 seconds.',
    specs: {
      quantity: '3 Smoke Torches per Pack',
      colors: 'Assorted Red, Blue, Yellow, Green',
      duration: '50-60 Seconds Dense Cloud',
      use: 'Outdoor Use Recommended'
    }
  },
  {
    id: 'PP-004',
    title: 'Crazy Party Snow Sprays (Canned Non-Toxic Foam - Pack of 3)',
    urduTitle: 'کریزی اسنو اسپرے (3 کینز پیک)',
    category: 'poppers-sprays',
    price: 420,
    stock: 180,
    lowStockThreshold: 30,
    badge: 'Fun Time',
    rating: 4.8,
    reviewsCount: 320,
    image: 'assets/images/party_poppers.jpg',
    description: 'Classic party snow spray cans with aerosol nozzle. Non-sticky, self-dissolving foam that evaporates without staining party clothes or rugs.',
    specs: {
      quantity: '3 Large 250ml Aerosol Cans',
      safety: 'Non-toxic, Skin Safe, Leaves No Residue'
    }
  },
  {
    id: 'PP-005',
    title: 'Foil Fringe Curtain - Metallic Gold Shimmer Backdrop (3ft x 6ft)',
    urduTitle: 'فوائل فرنج شمر کرٹن بیک ڈراپ (3x6 فٹ)',
    category: 'poppers-sprays',
    price: 290,
    stock: 175,
    lowStockThreshold: 25,
    badge: 'Photo Wall',
    rating: 4.9,
    reviewsCount: 360,
    image: 'assets/inventory/foil_fringe_curtain.jpg',
    description: 'Shimmering metallic tinsel foil curtain with adhesive backing. Hangs behind cake tables or entrance doorways for an instant Hollywood glam backdrop.',
    specs: {
      size: '3 Feet Wide x 6 Feet Tall (1m x 2m)',
      backing: 'Pre-applied Peel-and-Stick Adhesive Tape',
      colors: 'Mirror Gold, Rose Gold, Silver, Royal Blue'
    }
  },

  // =========================================================================
  // 7. BALLOON ARCH KITS, LATEX BALLOONS & PARTY ACCESSORIES
  // =========================================================================
  {
    id: 'BG-001',
    title: 'DiMi 80-Piece Deluxe DIY Balloon Garland Arch Kit',
    urduTitle: 'ڈی می 80 پیس ڈیلکس غبارہ آرچ کٹ',
    category: 'balloon-kits',
    price: 1150,
    stock: 68,
    lowStockThreshold: 12,
    badge: 'Top Rated ⭐',
    rating: 5.0,
    reviewsCount: 295,
    image: 'assets/inventory/balloon_garland_dimi.jpg',
    description: 'Complete all-in-one organic balloon arch kit! Contains 80 premium chrome, confetti and pastel balloons, 16" Happy Birthday banner, 5m arch decorating strip, and 100 glue dots. 4 Designer Themes: Black/Gold, Royal Blue/Black, Red/Black, Rose Pink.',
    specs: {
      totalPieces: '80 Assorted Latex Balloons + Arch Accessories',
      balloonSizes: '18", 12", 10", 5" for organic layering',
      accessoriesIncluded: '5m Arch Strip Tape, 100 Glue Dots, Tying Tool, Ribbon',
      themes: '4 Pre-matched Color Schemes'
    }
  },
  {
    id: 'BG-002',
    title: 'TONGLE Party Latex Balloons (100 Pieces - 12 Color Packs)',
    urduTitle: 'ٹونگل 100 پیس پارٹی لیٹیکس غبارے (12 رنگ)',
    category: 'balloon-kits',
    price: 490,
    stock: 260,
    lowStockThreshold: 40,
    badge: 'Party Favorite',
    rating: 4.9,
    reviewsCount: 520,
    image: 'assets/inventory/tongle_balloons_100pcs.jpg',
    description: 'Original high-elasticity Tongle party balloons. Thick natural latex that inflates up to 12 inches with minimal popping risk. Available in 12 single-color packs or rainbow mix.',
    specs: {
      quantity: '100 Balloons per Bag',
      size: '12 Inch Standard Party Size',
      colors: 'Gold, Silver, Black, White, Pink, Cyan, Yellow, Lime, Purple, Multicolor',
      material: 'Biodegradable Pure Natural Latex'
    }
  },
  {
    id: 'BG-003',
    title: 'Dual-Action Manual Balloon Air Pump (2-Way Fast Inflator)',
    urduTitle: 'ڈبل ایکشن بیلون ایئر پمپ',
    category: 'balloon-kits',
    price: 240,
    stock: 190,
    lowStockThreshold: 30,
    badge: 'Must Have',
    rating: 4.8,
    reviewsCount: 380,
    image: 'assets/inventory/balloon_air_pumps.jpg',
    description: 'Blows balloons twice as fast! Pushes air on both the push and pull strokes. Tapered nozzle easily grips foil letters and 5-inch to 18-inch latex balloons.',
    specs: {
      mechanism: 'Dual-Way Air Flow',
      material: 'High-Impact Polypropylene',
      colors: 'Pink, Cyan, Red'
    }
  },
  {
    id: 'BG-004',
    title: '3D Metallic Hollow Butterflies (Pack of 12)',
    urduTitle: 'تھری ڈی میٹالک تتلیاں (12 پیس پیک)',
    category: 'balloon-kits',
    price: 220,
    stock: 175,
    lowStockThreshold: 25,
    badge: 'Cute Decor',
    rating: 4.9,
    reviewsCount: 210,
    image: 'assets/inventory/3d_butterflies_12pcs.jpg',
    description: 'Laser cut 3D shiny butterflies with pre-cut fold lines. Stick onto balloon arches, cake sides, or backdrop walls with included adhesive dots. Available in Gold, Silver, Blue, Emerald, and Rose Gold.',
    specs: {
      quantity: '12 Butterflies in 3 Graduated Sizes',
      material: 'Metallic Coated Mirror Card',
      adhesive: 'Glue Dots Included'
    }
  },
  {
    id: 'BG-005',
    title: 'Deluxe Happy Birthday Cone Party Hats with Tinsel Fringe (Pack of 5)',
    urduTitle: 'ڈیلکس ہیپی برتھ ڈے ٹنسل ہیٹس (5 ہیٹس پیک)',
    category: 'balloon-kits',
    price: 340,
    stock: 130,
    lowStockThreshold: 20,
    badge: 'Festive Wear',
    rating: 4.9,
    reviewsCount: 190,
    image: 'assets/inventory/tinsel_party_hats.jpg',
    description: 'Sturdy party hats embellished with iridescent tinsel fringe skirts and fluffy pom-pom toppers. Fitted with soft elastic chin cords.',
    specs: {
      quantity: '5 Hats per Pack',
      height: '20cm',
      features: 'Foil Stamping + Iridescent Tinsel Fringe'
    }
  },
  {
    id: 'BG-006',
    title: 'Glitter Cursive Happy Birthday Bunting Banner Garland',
    urduTitle: 'گلیٹر کرسیو ہیپی برتھ ڈے بنٹنگ بینر',
    category: 'balloon-kits',
    price: 260,
    stock: 145,
    lowStockThreshold: 20,
    badge: 'Classic Bunting',
    rating: 4.8,
    reviewsCount: 165,
    image: 'assets/inventory/glitter_bunting_banner.jpg',
    description: 'Non-shedding glitter cardstock banner with hanging ribbon needle. Colors: Royal Blue, Rose Gold, Silver, and Sky Blue.',
    specs: {
      length: '2.5 Meters Hanging String',
      card: '300 GSM Heavy Glitter Card'
    }
  },
  {
    id: 'BG-007',
    title: 'Fishtail Swallowtail Flag Happy Birthday Bunting Banner',
    urduTitle: 'فش ٹیل فلیگ برتھ ڈے بینر معہ ربن',
    category: 'balloon-kits',
    price: 240,
    stock: 155,
    lowStockThreshold: 20,
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 180,
    image: 'assets/inventory/fishtail_flag_banner.jpg',
    description: '13-flag swallowtail banner with gold-foil letters on glittering cardstock. Available in Gold, Silver, Emerald, Ruby, Baby Pink, and Purple.',
    specs: {
      flags: '13 Fishtail Pennants + Ribbon Spool',
      size: '16cm x 11.5cm per pennant'
    }
  },

  // =========================================================================
  // 8. RELIGIOUS & FESTIVE ISLAMIC BANNERS
  // =========================================================================
  {
    id: 'RL-001',
    title: 'Milad-un-Nabi Mubarak Golden Foil Celebration Banner (16")',
    urduTitle: 'میلاد النبی مبارک 16 انچ گولڈن فوائل بینر',
    category: 'religious-banners',
    price: 550,
    stock: 65,
    lowStockThreshold: 12,
    badge: 'Milad Special',
    rating: 5.0,
    reviewsCount: 190,
    image: 'assets/inventory/nikkah_mubarak_balloons.jpg',
    description: 'Large golden foil letter set for Rabi-ul-Awwal and 12 Rabi-ul-Awwal Mehfil-e-Milad functions, mosque decorations, and home gatherings.',
    specs: {
      size: '16 Inch per letter',
      material: 'Metallic Emerald Green & Gold Foil',
      reusable: 'Yes'
    }
  },
  {
    id: 'RL-002',
    title: 'Hajj Mubarak & Umrah Mubarak Deluxe Bunting Banner Set',
    urduTitle: 'حج مبارک و عمرہ مبارک ڈیلکس بینر سیٹ',
    category: 'religious-banners',
    price: 480,
    stock: 70,
    lowStockThreshold: 12,
    badge: 'Blessings',
    rating: 5.0,
    reviewsCount: 210,
    image: 'assets/inventory/welcome_balloons.jpg',
    description: 'Glitter crescent moon, Kaaba motif, and golden Islamic calligraphy banner welcoming returning pilgrims with love and honor.',
    specs: {
      length: '3 Meters Total Spool',
      motifs: 'Kaaba, Crescent Star, Lanterns & Calligraphy'
    }
  }
];

// Product Category Registry
const MUNIR_CATEGORIES = [
  { id: 'all', name: 'All Inventory', urduName: 'تمام اسٹاک', icon: '✨', count: 32 },
  { id: 'foil-balloons', name: 'Foil Balloons & Letters', urduName: 'فوائل غبارے اور بینرز', icon: '🎈', count: 10 },
  { id: 'gift-packaging', name: 'Gift Paper & Gift Bags', urduName: 'گفٹ پیپر اور گفٹ بیگز', icon: '🎁', count: 4 },
  { id: 'party-sashes', name: 'Sashes & Wear Strips', urduName: 'شیش اور پہننے کی پٹیاں', icon: '🎀', count: 4 },
  { id: 'candles-sparklers', name: 'Candles & Anar Sparklers', urduName: 'موم بتیاں اور انار شعلے', icon: '🕯️', count: 5 },
  { id: 'cake-toppers', name: 'Cake Toppers', urduName: 'کیک ٹاپرز', icon: '🎂', count: 4 },
  { id: 'poppers-sprays', name: 'Poppers, Sprays & Backdrops', urduName: 'پوپرز، اسپرے اور پردے', icon: '🎉', count: 5 },
  { id: 'balloon-kits', name: 'Garland Kits & Latex', urduName: 'آرچ کٹس اور لیٹیکس غبارے', icon: '🪁', count: 7 },
  { id: 'religious-banners', name: 'Milad & Hajj Banners', urduName: 'میلاد اور حج بینرز', icon: '🌙', count: 2 }
];

// Delivery Cities & Zones (Pakistani Express Couriers: TCS, Leopards, Trax, Daewoo)
const PAKISTAN_CITIES = [
  { name: 'Lahore', rate: 150, days: 'Same Day / 24 Hours (Express)' },
  { name: 'Karachi', rate: 250, days: '2-3 Business Days' },
  { name: 'Islamabad', rate: 220, days: '24-48 Hours' },
  { name: 'Rawalpindi', rate: 220, days: '24-48 Hours' },
  { name: 'Faisalabad', rate: 180, days: '24 Hours' },
  { name: 'Multan', rate: 190, days: '24-48 Hours' },
  { name: 'Gujranwala', rate: 160, days: '24 Hours' },
  { name: 'Peshawar', rate: 240, days: '2-3 Business Days' },
  { name: 'Sialkot', rate: 170, days: '24 Hours' },
  { name: 'Quetta', rate: 280, days: '3-4 Business Days' },
  { name: 'Hyderabad', rate: 250, days: '2-3 Business Days' },
  { name: 'Bahawalpur', rate: 200, days: '2-3 Business Days' },
  { name: 'Sargodha', rate: 180, days: '24-48 Hours' },
  { name: 'Other Cities / Rural Tehsils', rate: 280, days: '3-4 Business Days' }
];

// Pakistani Payment Gateways & Offline Channels
const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    urduName: 'کیش آن ڈیلیوری',
    icon: '💵',
    description: 'Pay cash to TCS / Leopards courier rider when parcel arrives at your doorstep.',
    isAvailable: true,
    requiresVerification: false
  },
  {
    id: 'jazzcash',
    name: 'JazzCash Direct (Account / QR)',
    urduName: 'جاز کیش',
    icon: '📱',
    accountNumber: '0300-8451998',
    accountTitle: 'Munir Ahmed (Decorations Co.)',
    description: 'Instant transfer via JazzCash app or shop. Upload or send screenshot for instant dispatch.',
    isAvailable: true,
    requiresVerification: true
  },
  {
    id: 'easypaisa',
    name: 'EasyPaisa Direct (Account / QR)',
    urduName: 'ایزی پیسہ',
    icon: '🟢',
    accountNumber: '0300-8451998',
    accountTitle: 'Munir Ahmed (Decorations Co.)',
    description: 'Transfer directly to our registered EasyPaisa merchant account. Zero transaction fee.',
    isAvailable: true,
    requiresVerification: true
  },
  {
    id: 'meezan',
    name: 'Meezan Bank & Raast (Instant Transfer)',
    urduName: 'میزان بینک اور راست',
    icon: '🏦',
    iban: 'PK42MEZN0001234567890101',
    raastId: '03008451998',
    accountTitle: 'Munir Ahmed Decorations Co.',
    description: 'Instant 24/7 bank transfer via Raast ID or Meezan IBAN from any Pakistani bank app (HBL, MCB, Allied, Alfalah, UBL).',
    isAvailable: true,
    requiresVerification: true
  }
];

if (typeof window !== 'undefined') {
  window.MUNIR_CATALOG = MUNIR_CATALOG;
  window.MUNIR_CATEGORIES = MUNIR_CATEGORIES;
  window.PAKISTAN_CITIES = PAKISTAN_CITIES;
  window.PAYMENT_METHODS = PAYMENT_METHODS;
}
