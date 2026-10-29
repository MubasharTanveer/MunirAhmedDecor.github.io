/**
 * Munir Ahmed Decorations (منیر احمد ڈیکوریشنز)
 * Master Application Controller & Party Store Logic
 * Complete Inventory, Stock Control, Pakistani Payments & WhatsApp Checkout
 */

(function() {
  'use strict';

  // State
  let currentFilter = 'all';
  let searchQuery = '';
  let currentSort = 'featured';
  let activePaymentMethod = 'jazzcash';
  let isAdminLoggedIn = false;

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const categoryTilesContainer = document.getElementById('category-tiles-container');
  const categoryPillsBar = document.getElementById('category-pills-bar');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartBadge = document.getElementById('cart-badge');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartTotalEl = document.getElementById('cart-total');
  const cartSavingsRow = document.getElementById('cart-savings-row');
  const cartSavingsEl = document.getElementById('cart-savings');
  const deliveryMeterBar = document.getElementById('delivery-meter-bar');
  const deliveryMeterText = document.getElementById('delivery-meter-text');
  const deliveryMeterStatus = document.getElementById('delivery-meter-status');

  // Modals
  const checkoutModal = document.getElementById('checkout-modal');
  const quickViewModal = document.getElementById('quick-view-modal');
  const adminModal = document.getElementById('admin-modal');
  const orderSuccessModal = document.getElementById('order-success-modal');

  // =========================================================================
  // PARTY SOUND FX SYNTHESIZER (Native Web Audio API - Zero External Files)
  // =========================================================================
  const SoundFX = {
    audioCtx: null,
    enabled: localStorage.getItem('munir_sound_fx') !== 'false',

    init() {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) this.audioCtx = new AudioClass();
      } catch (e) {
        // AudioContext not supported
      }
    },

    ensureContext() {
      if (!this.audioCtx) this.init();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    },

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('munir_sound_fx', this.enabled ? 'true' : 'false');
      return this.enabled;
    },

    playPop() {
      if (!this.enabled) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.12);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.12);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      noise.start(now);
    },

    playChime() {
      if (!this.enabled) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const notes = [587.33, 880];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    },


    playFanfare() {
      if (!this.enabled) return;
      this.ensureContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.52);
      });
    }
  };
  window.SoundFX = SoundFX;

  // =========================================================================
  // CELEBRATION CONFETTI ENGINE (HTML5 Canvas 60FPS Physics Engine)
  // =========================================================================
  let confettiCtx = null;
  let confettiCanvas = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  function setupConfettiEngine() {
    confettiCanvas = document.getElementById('confetti-canvas');
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');

    function resize() {
      if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }
    }
    window.addEventListener('resize', resize);
    resize();
  }

  window.triggerConfetti = function(startX, startY, count = 120) {
    if (!confettiCanvas || !confettiCtx) return;
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#ff6b81', '#a55eea', '#00d2d3', '#ffd32a', '#ff3838', '#ffffff'];
    const shapes = ['rect', 'circle', 'ribbon'];
    
    const originX = startX !== undefined ? startX : window.innerWidth / 2;
    const originY = startY !== undefined ? startY : window.innerHeight * 0.35;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 6;
      confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        gravity: 0.22 + Math.random() * 0.15,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 8 + 6,
        length: Math.random() * 18 + 8,
        alpha: 1,
        decay: Math.random() * 0.01 + 0.007
      });
    }

    if (!confettiAnimationId) {
      animateConfetti();
    }
  };

  function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > confettiCanvas.height + 30) {
        confettiParticles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = Math.max(0, p.alpha);
      confettiCtx.fillStyle = p.color;

      if (p.shape === 'rect') {
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      } else if (p.shape === 'ribbon') {
        confettiCtx.fillRect(-p.size / 3, -p.length / 2, p.size * 0.7, p.length);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimationId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // =========================================================================
  // LIGHT & DARK THEME SWITCHER + CELEBRATION PARTY MOODS
  // =========================================================================
  const ThemeManager = {
    current: localStorage.getItem('munir_party_theme') || 'light',
    currentMood: localStorage.getItem('munir_party_mood') || 'carnival',

    init() {
      this.applyTheme(this.current, false);
      if (this.currentMood && this.currentMood !== 'carnival') {
        this.applyMood(this.currentMood, false);
      }

      // Main Nav Theme Toggle
      const toggleBtn = document.getElementById('btn-theme-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.toggleTheme();
        });
      }

      // Floating Theme Toggle Widget
      const floatingBtn = document.getElementById('btn-floating-theme');
      if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
          this.toggleTheme();
        });
      }

      // Party Mood Buttons
      const moodBtns = document.querySelectorAll('.mood-btn');
      moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const mood = btn.getAttribute('data-mood');
          this.applyMood(mood, true);
        });
      });
    },

    toggleTheme() {
      const next = this.current === 'light' ? 'dark' : 'light';
      this.applyTheme(next, true);
    },

    applyTheme(theme, userTriggered = false) {
      this.current = theme;
      localStorage.setItem('munir_party_theme', theme);

      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      // Update Nav Button
      const toggleBtn = document.getElementById('btn-theme-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = theme === 'dark' 
          ? '<span>🌙</span><span>Disco Dark</span>' 
          : '<span>☀️</span><span>Party Light</span>';
        toggleBtn.classList.toggle('dark-active', theme === 'dark');
      }

      // Update Floating Button
      const floatingIcon = document.getElementById('floating-theme-icon');
      const floatingText = document.getElementById('floating-theme-text');
      if (floatingIcon && floatingText) {
        floatingIcon.innerText = theme === 'dark' ? '🌙' : '☀️';
        floatingText.innerText = theme === 'dark' ? 'Disco Dark' : 'Party Light';
      }

      if (userTriggered) {
        if (window.SoundFX) window.SoundFX.playPop();
        if (window.triggerConfetti) window.triggerConfetti(window.innerWidth * 0.5, window.innerHeight * 0.35, 50);
        showToast(
          theme === 'dark' 
            ? '🌙 Disco Night (Neon Dark) Mode Activated!' 
            : '☀️ Party Day (Bright Carnival) Mode Activated!', 
          'info'
        );
      }
    },

    applyMood(mood, userTriggered = false) {
      this.currentMood = mood;
      localStorage.setItem('munir_party_mood', mood);

      // Update active mood button pill
      document.querySelectorAll('.mood-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-mood') === mood);
      });

      if (mood === 'disco') {
        this.applyTheme('dark', false);
        document.documentElement.setAttribute('data-party-mood', 'disco');
      } else if (mood === 'birthday') {
        this.applyTheme('light', false);
        document.documentElement.setAttribute('data-party-mood', 'birthday');
      } else if (mood === 'shaadi') {
        this.applyTheme('light', false);
        document.documentElement.setAttribute('data-party-mood', 'shaadi');
      } else {
        this.applyTheme('light', false);
        document.documentElement.removeAttribute('data-party-mood');
      }

      if (userTriggered) {
        if (window.SoundFX) window.SoundFX.playFanfare();
        if (window.triggerConfetti) window.triggerConfetti(window.innerWidth * 0.5, window.innerHeight * 0.3, 60);
        const titles = {
          carnival: '🎉 Bright Festive Carnival Mode!',
          birthday: '🎂 Sweet Birthday Bash (Pink & Gold) Mode!',
          shaadi: '💍 Royal Shaadi & Mehndi Celebration Mode!',
          disco: '🌙 Electric Disco Night Rave Mode!'
        };
        showToast(titles[mood] || '🎉 Party Mood Activated!', 'success');
      }
    }
  };
  window.ThemeManager = ThemeManager;

  /**
   * Initialize Store
   */
  function init() {
    ThemeManager.init();
    renderCategoryTiles();
    renderCategoryPills();
    renderPopularItems();
    renderProducts();
    updateCartUI();
    populateCities();
    setupEventListeners();
    setupConfettiEngine();
    startDispatchCountdown();

    // Subscribe to Store updates
    if (window.Store) {
      window.Store.subscribe((event, data) => {
        if (event === 'CART_UPDATED') {
          updateCartUI();
        } else if (event === 'PRODUCTS_UPDATED') {
          renderProducts();
          renderPopularItems();
          if (isAdminLoggedIn) renderAdminInventory();
        } else if (event === 'ORDER_PLACED') {
          openOrderSuccess(data);
        }
      });
    }
  }

  /**
   * Populate Pakistani Cities dropdown
   */
  function populateCities() {
    const citySelect = document.getElementById('cust-city');
    if (!citySelect || !window.PAKISTAN_CITIES) return;

    citySelect.innerHTML = window.PAKISTAN_CITIES.map(c => `
      <option value="${c.name}">${c.name} (${c.days} - PKR ${c.rate})</option>
    `).join('');
  }

  /**
   * Render Top Category Quick Tiles
   */
  function renderCategoryTiles() {
    const container = document.getElementById('category-tiles-container');
    if (!container || !window.MUNIR_CATEGORIES) return;

    container.innerHTML = window.MUNIR_CATEGORIES.map(cat => {
      const isActive = cat.id === currentFilter;
      return `
        <div class="category-tile-card ${isActive ? 'active' : ''}" onclick="selectCategory('${cat.id}')" role="button" tabindex="0">
          <div class="category-tile-icon-box">
            <span class="category-tile-icon">${cat.icon}</span>
          </div>
          <div class="category-tile-text">
            <div class="category-tile-name">${cat.name}</div>
            <div class="category-tile-urdu font-urdu">${cat.urduName}</div>
          </div>
          <div class="category-tile-footer">
            <span class="category-tile-count">${cat.count} Items</span>
            <span class="category-tile-arrow">Explore →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Render Popular Bestseller Items Showcase
   */
  function renderPopularItems() {
    const popularGrid = document.getElementById('popular-products-grid');
    if (!popularGrid || !window.Store) return;

    const allProducts = window.Store.getProducts();

    // Priority viral and bestseller product IDs
    const priorityIds = ['FB-002', 'CD-001', 'PS-001', 'BG-002', 'GP-001', 'GB-001', 'CT-002', 'PP-001'];
    
    let popularItems = priorityIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
    
    // Fallback if priority items not found
    if (popularItems.length < 4) {
      popularItems = allProducts.filter(p => p.badge).slice(0, 8);
    }

    popularGrid.innerHTML = popularItems.map(p => {
      // Stock Status logic
      let stockBadgeHtml = '';
      if (p.stock <= 0) {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-out">
            <span>❌</span>
            <span>Sold Out</span>
          </div>
        `;
      } else if (p.stock <= (p.lowStockThreshold || 15)) {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-low">
            <span class="stock-dot"></span>
            <span>Only ${p.stock} Left!</span>
          </div>
        `;
      } else {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-in">
            <span class="stock-dot"></span>
            <span>In Stock (${p.stock} pcs)</span>
          </div>
        `;
      }

      return `
        <article class="product-card popular-product-card" id="pop-card-${p.id}">
          <div class="product-image-wrapper" onclick="openQuickView('${p.id}')">
            <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy" decoding="async" width="280" height="280" onload="this.classList.add('loaded')" onerror="this.src='assets/images/birthday_decor.jpg'">
            
            ${p.badge ? `<span class="badge-featured">${p.badge}</span>` : '<span class="badge-featured" style="background:var(--gradient-gold); color:#1a1002;">⭐ Bestseller</span>'}
            <span class="badge-floating-top-left">${p.id}</span>
            ${stockBadgeHtml}

            <button class="btn-quick-view-hover" onclick="event.stopPropagation(); openQuickView('${p.id}')">
              Quick View 🔍
            </button>
          </div>

          <div class="product-info-body">
            <div class="product-meta-row">
              <span class="product-rating">⭐ ${p.rating || '5.0'} (${p.reviewsCount || 150}+)</span>
              <span style="text-transform: capitalize; color: var(--party-coral); font-weight: 700;">${p.category.replace('-', ' ')}</span>
            </div>

            <h3 class="product-title" onclick="openQuickView('${p.id}')" title="${p.title}">
              ${p.title}
            </h3>

            <div class="product-urdu-sub font-urdu">
              ${p.urduTitle || ''}
            </div>

            <div class="product-pricing-box">
              <div>
                <span class="price-main">PKR ${p.price.toLocaleString()}</span>
              </div>
            </div>

            <div class="product-action-row">
              <div class="quantity-stepper">
                <button class="btn-step" onclick="stepCardQty('${p.id}', -1)">-</button>
                <span class="step-value" id="qty-pop-${p.id}">1</span>
                <button class="btn-step" onclick="stepCardQty('${p.id}', 1)">+</button>
              </div>

              <button class="btn-add-cart ${p.stock <= 0 ? 'out-of-stock' : ''}" 
                ${p.stock <= 0 ? 'disabled' : ''} 
                onclick="handleAddToCart('${p.id}', event)">
                <span>🛒</span>
                <span>${p.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>

              <button class="btn-buy-now" 
                ${p.stock <= 0 ? 'disabled' : ''} 
                onclick="handleBuyNow('${p.id}', event)" title="Instant 1-Click Checkout">
                <span>⚡</span>
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Render Category Filter Pills Bar with Dynamic Stock Counts
   */
  function renderCategoryPills() {
    if (!categoryPillsBar || !window.MUNIR_CATEGORIES) return;

    const allProds = window.Store ? window.Store.getProducts() : [];

    categoryPillsBar.innerHTML = window.MUNIR_CATEGORIES.map(cat => {
      const count = cat.id === 'all' 
        ? allProds.length 
        : allProds.filter(p => p.category === cat.id).length;
      return `
        <button class="btn-filter-pill ${cat.id === currentFilter ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
          <span class="pill-count">${count}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * Select Category Action
   */
  window.selectCategory = function(catId) {
    currentFilter = catId;
    renderCategoryTiles();
    renderCategoryPills();
    renderProducts();

    // Smooth scroll down to catalog if called from tiles or footer
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Render Master Products Grid
   */
  function renderProducts() {
    if (!productsGrid || !window.Store) return;

    let items = window.Store.getProducts();

    // 1. Filter by category
    if (currentFilter !== 'all') {
      items = items.filter(p => p.category === currentFilter);
    }

    // 2. Filter by search query
    if (searchQuery) {
      items = items.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        (p.urduTitle && p.urduTitle.toLowerCase().includes(searchQuery)) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery)
      );
    }

    // 3. Sort items
    if (currentSort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'stock') {
      items.sort((a, b) => b.stock - a.stock);
    } else if (currentSort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    // Handle empty search results
    if (items.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 8px;">No matching items found</h3>
          <p>Try searching for balloons, candles, sashes, gift bags, or clear the search query.</p>
          <button class="btn-primary-party" onclick="resetFilters()" style="margin-top: 16px;">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    // Render Cards
    productsGrid.innerHTML = items.map(p => {
      // Stock Status logic
      let stockBadgeHtml = '';
      if (p.stock <= 0) {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-out">
            <span>❌</span>
            <span>Sold Out</span>
          </div>
        `;
      } else if (p.stock <= (p.lowStockThreshold || 15)) {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-low">
            <span class="stock-dot"></span>
            <span>Only ${p.stock} Left!</span>
          </div>
        `;
      } else {
        stockBadgeHtml = `
          <div class="stock-status-pill stock-in">
            <span class="stock-dot"></span>
            <span>In Stock (${p.stock} pcs)</span>
          </div>
        `;
      }

      return `
        <article class="product-card" id="card-${p.id}">
          <!-- Image Wrapper -->
          <div class="product-image-wrapper" onclick="openQuickView('${p.id}')">
            <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy" decoding="async" width="280" height="280" onload="this.classList.add('loaded')" onerror="this.src='assets/images/birthday_decor.jpg'">
            
            ${p.badge ? `<span class="badge-featured">${p.badge}</span>` : ''}
            <span class="badge-floating-top-left">${p.id}</span>
            ${stockBadgeHtml}

            <button class="btn-quick-view-hover" onclick="event.stopPropagation(); openQuickView('${p.id}')">
              Quick View 🔍
            </button>
          </div>

          <!-- Product Details -->
          <div class="product-info-body">
            <div class="product-meta-row">
              <span class="product-rating">⭐ ${p.rating || '4.9'} (${p.reviewsCount || 120})</span>
              <span style="text-transform: capitalize;">${p.category.replace('-', ' ')}</span>
            </div>

            <h3 class="product-title" onclick="openQuickView('${p.id}')" title="${p.title}">
              ${p.title}
            </h3>

            <div class="product-urdu-sub font-urdu">
              ${p.urduTitle || ''}
            </div>

            <!-- Price Box -->
            <div class="product-pricing-box">
              <div>
                <span class="price-main">PKR ${p.price.toLocaleString()}</span>
              </div>
            </div>

            <!-- Action Area -->
            <div class="product-action-row">
              <div class="quantity-stepper">
                <button class="btn-step" onclick="stepCardQty('${p.id}', -1)">-</button>
                <span class="step-value" id="qty-${p.id}">1</span>
                <button class="btn-step" onclick="stepCardQty('${p.id}', 1)">+</button>
              </div>

              <button class="btn-add-cart ${p.stock <= 0 ? 'out-of-stock' : ''}" 
                ${p.stock <= 0 ? 'disabled' : ''} 
                onclick="handleAddToCart('${p.id}', event)">
                <span>🛒</span>
                <span>${p.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>

              <button class="btn-buy-now" 
                ${p.stock <= 0 ? 'disabled' : ''} 
                onclick="handleBuyNow('${p.id}', event)" title="Instant 1-Click Checkout">
                <span>⚡</span>
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Card Quantity Stepper
   */
  window.stepCardQty = function(productId, delta) {
    const qtyEl = document.getElementById(`qty-${productId}`);
    const qtyPopEl = document.getElementById(`qty-pop-${productId}`);
    
    let current = 1;
    if (qtyPopEl) {
      current = parseInt(qtyPopEl.innerText, 10) || 1;
    } else if (qtyEl) {
      current = parseInt(qtyEl.innerText, 10) || 1;
    }

    current = Math.max(1, current + delta);
    
    const prod = window.Store.getProductById(productId);
    if (prod && current > prod.stock) {
      current = prod.stock;
      showToast(`Maximum available stock is ${prod.stock}`, 'warning');
    }
    if (qtyEl) qtyEl.innerText = current;
    if (qtyPopEl) qtyPopEl.innerText = current;
  };

  /**
   * Handle Add to Cart from Card
   */
  window.handleAddToCart = function(productId, event) {
    const qtyEl = document.getElementById(`qty-${productId}`);
    const qtyPopEl = document.getElementById(`qty-pop-${productId}`);
    
    let qty = 1;
    if (qtyEl) {
      qty = parseInt(qtyEl.innerText, 10) || 1;
    } else if (qtyPopEl) {
      qty = parseInt(qtyPopEl.innerText, 10) || 1;
    }

    const result = window.Store.addToCart(productId, qty);
    if (result.success) {
      const prod = window.Store.getProductById(productId);
      showToast(`Added ${qty}x "${prod.title}" to your cart! 🎈`, 'success');
      
      // Play Sound FX
      if (window.SoundFX) window.SoundFX.playChime();

      // Mini celebratory confetti burst at cursor
      const clickX = event && event.clientX ? event.clientX : window.innerWidth / 2;
      const clickY = event && event.clientY ? event.clientY : window.innerHeight * 0.4;
      if (window.triggerConfetti) window.triggerConfetti(clickX, clickY, 35);

      // Trigger cart badge bounce
      if (cartBadge) {
        cartBadge.classList.remove('badgePop');
        void cartBadge.offsetWidth;
        cartBadge.classList.add('badgePop');
      }

      // Reset card qty counter back to 1
      if (qtyEl) qtyEl.innerText = '1';
      if (qtyPopEl) qtyPopEl.innerText = '1';
    } else {
      showToast(result.message || 'Could not add to cart.', 'warning');
    }
  };

  /**
   * 1-Click Instant "Buy Now" Direct Checkout
   */
  window.handleBuyNow = function(productId, event) {
    if (event) event.stopPropagation();
    const qtyEl = document.getElementById(`qty-${productId}`);
    const qtyPopEl = document.getElementById(`qty-pop-${productId}`);
    
    let qty = 1;
    if (qtyEl) {
      qty = parseInt(qtyEl.innerText, 10) || 1;
    } else if (qtyPopEl) {
      qty = parseInt(qtyPopEl.innerText, 10) || 1;
    }

    const result = window.Store.addToCart(productId, qty);
    if (result.success) {
      if (window.SoundFX) window.SoundFX.playPop();
      openCheckout();
    } else {
      showToast(result.message || 'Could not proceed to checkout.', 'warning');
    }
  };

  /**
   * Reset All Search & Category Filters
   */
  window.resetFilters = function() {
    currentFilter = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.style.display = 'none';
    renderCategoryTiles();
    renderCategoryPills();
    renderProducts();
  };

  /**
   * Update Cart UI & Slide-Over Drawer
   */
  function updateCartUI() {
    if (!window.Store) return;

    const cart = window.Store.getCart();
    const summary = window.Store.getCartSummary();

    // Desktop Cart Badge
    if (cartBadge) {
      if (summary.itemCount > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.innerText = summary.itemCount;
      } else {
        cartBadge.style.display = 'none';
      }
    }

    // Mobile Sticky Nav Cart Badge
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    if (mobileCartBadge) {
      if (summary.itemCount > 0) {
        mobileCartBadge.style.display = 'flex';
        mobileCartBadge.innerText = summary.itemCount;
      } else {
        mobileCartBadge.style.display = 'none';
      }
    }

    // Totals in Drawer
    if (cartSubtotalEl) cartSubtotalEl.innerText = `PKR ${summary.subtotal.toLocaleString()}`;
    if (cartShippingEl) {
      cartShippingEl.innerText = summary.shipping === 0 ? 'FREE (Nationwide)' : `PKR ${summary.shipping.toLocaleString()}`;
    }
    if (cartTotalEl) cartTotalEl.innerText = `PKR ${summary.grandTotal.toLocaleString()}`;

    if (cartSavingsRow) {
      cartSavingsRow.style.display = 'none';
    }

    // Free Delivery Meter (Target PKR 3,500)
    if (deliveryMeterBar && deliveryMeterText && deliveryMeterStatus) {
      const target = 3500;
      if (summary.subtotal >= target) {
        deliveryMeterBar.style.width = '100%';
        deliveryMeterText.innerHTML = '🎉 <strong>Congratulations!</strong> You qualified for FREE Delivery!';
        deliveryMeterStatus.innerText = 'FREE Shipping';
      } else {
        const remaining = target - summary.subtotal;
        const pct = Math.min(100, Math.round((summary.subtotal / target) * 100));
        deliveryMeterBar.style.width = `${pct}%`;
        deliveryMeterText.innerHTML = `Add <strong>PKR ${remaining.toLocaleString()}</strong> more for FREE Delivery!`;
        deliveryMeterStatus.innerText = `PKR 250 Standard`;
      }
    }

    // Render Items in Drawer
    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">🛒</div>
            <h4 style="font-size:1.2rem; color:#fff; margin-bottom:6px;">Your Party Cart is Empty</h4>
            <p style="font-size:0.88rem;">Add foil balloons, candles, party poppers, sashes, or gift wrap & bags to celebrate!</p>
            <button class="btn-primary-party" onclick="closeCart()" style="margin-top:16px;">
              Start Shopping
            </button>
          </div>
        `;
      } else {
        cartItemsContainer.innerHTML = cart.map(item => `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" onerror="this.src='assets/images/birthday_decor.jpg'">
            
            <div class="cart-item-info">
              <div class="cart-item-title">${item.title}</div>
              <div class="cart-item-price">
                PKR ${item.price.toLocaleString()}
              </div>

              <div class="cart-item-bottom-row">
                <div class="quantity-stepper">
                  <button class="btn-step" onclick="changeCartItemQty('${item.id}', -1)">-</button>
                  <span class="step-value">${item.quantity}</span>
                  <button class="btn-step" onclick="changeCartItemQty('${item.id}', 1)">+</button>
                </div>

                <button class="btn-item-remove" onclick="removeCartItem('${item.id}')">
                  Remove
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Update modal totals if checkout is open
    const modalSubtotal = document.getElementById('modal-subtotal');
    const modalShipping = document.getElementById('modal-shipping');
    const modalTotal = document.getElementById('modal-total');
    if (modalSubtotal) modalSubtotal.innerText = `PKR ${summary.subtotal.toLocaleString()}`;
    if (modalShipping) modalShipping.innerText = summary.shipping === 0 ? 'FREE' : `PKR ${summary.shipping.toLocaleString()}`;
    if (modalTotal) modalTotal.innerText = `PKR ${summary.grandTotal.toLocaleString()}`;
  }

  window.changeCartItemQty = function(id, delta) {
    const item = window.Store.getCart().find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    window.Store.updateCartQuantity(id, newQty);
  };

  window.removeCartItem = function(id) {
    window.Store.removeFromCart(id);
    showToast('Item removed from cart', 'info');
  };

  /**
   * Cart Drawer Controls
   */
  window.openCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  /**
   * Quick View Modal
   */
  window.openQuickView = function(productId) {
    const prod = window.Store.getProductById(productId);
    if (!prod || !quickViewModal) return;

    const qvTitle = document.getElementById('qv-title');
    const qvBody = document.getElementById('qv-body');

    if (qvTitle) qvTitle.innerText = prod.title;

    if (qvBody) {
      qvBody.innerHTML = `
        <div class="quick-view-grid">
          <div>
            <img src="${prod.image}" alt="${prod.title}" class="quick-view-img" onerror="this.src='assets/images/birthday_decor.jpg'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
              <span class="badge-featured" style="position:static;">${prod.badge || 'Stock Item'}</span>
              <span style="font-weight:700; color:#2ed573;">🟢 ${prod.stock} Units in Warehouse</span>
            </div>
          </div>

          <div>
            <h4 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:4px; color:#fff;">${prod.title}</h4>
            <div class="font-urdu" style="font-size:1.1rem; color:#ffc048; margin-bottom:12px;">${prod.urduTitle || ''}</div>
            
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5; margin-bottom:16px;">
              ${prod.description}
            </p>

            <div style="margin-bottom:16px;">
              <div style="font-family:var(--font-heading); font-size:1.6rem; font-weight:800; color:#fff;">
                PKR ${prod.price.toLocaleString()}
              </div>
            </div>

            <!-- Product Specs -->
            <ul class="quick-view-specs-list">
              ${Object.entries(prod.specs || {}).map(([key, val]) => `
                <li><strong style="color:#fff; text-transform:capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</strong> ${val}</li>
              `).join('')}
            </ul>

            <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
              <div class="quantity-stepper">
                <button class="btn-step" onclick="stepQuickViewQty(-1)">-</button>
                <span class="step-value" id="qv-qty">1</span>
                <button class="btn-step" onclick="stepQuickViewQty(1)">+</button>
              </div>

              <button class="btn-primary-party" style="flex:1; min-width:140px;" onclick="addQuickViewToCart('${prod.id}')">
                <span>🛒 Add to Cart</span>
              </button>

              <button class="btn-buy-now" style="font-size:0.95rem; padding:10px 18px;" onclick="buyNowFromQuickView('${prod.id}')" title="Instant 1-Click Checkout">
                <span>⚡ Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.stepQuickViewQty = function(delta) {
    const el = document.getElementById('qv-qty');
    if (!el) return;
    let qty = parseInt(el.innerText, 10) || 1;
    qty = Math.max(1, qty + delta);
    el.innerText = qty;
  };

  window.addQuickViewToCart = function(productId) {
    const el = document.getElementById('qv-qty');
    const qty = el ? parseInt(el.innerText, 10) : 1;
    const res = window.Store.addToCart(productId, qty);
    if (res.success) {
      showToast(`Added ${qty}x to cart!`, 'success');
      closeQuickView();
      openCart();
    } else {
      showToast(res.message, 'warning');
    }
  };

  window.buyNowFromQuickView = function(productId) {
    const el = document.getElementById('qv-qty');
    const qty = el ? parseInt(el.innerText, 10) || 1 : 1;
    const res = window.Store.addToCart(productId, qty);
    if (res.success) {
      closeQuickView();
      openCheckout();
    } else {
      showToast(res.message, 'warning');
    }
  };

  window.closeQuickView = function() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  /**
   * Checkout Controls
   */
  window.openCheckout = function() {
    if (window.Store.getCart().length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }
    updateCartUI();
    if (checkoutModal) {
      checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCheckout = function() {
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.selectPaymentMethod = function(method) {
    activePaymentMethod = method;
    
    // Update radio cards active class
    const cards = document.querySelectorAll('.payment-radio-card');
    cards.forEach(card => {
      const isSelected = card.getAttribute('data-method') === method;
      card.classList.toggle('active', isSelected);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isSelected;
    });

    const refContainer = document.getElementById('payment-ref-container');
    const instructionsText = document.getElementById('payment-instructions-text');

    if (refContainer) refContainer.style.display = 'block';
    if (instructionsText) {
      if (method === 'jazzcash') {
        instructionsText.innerHTML = `
          <strong>JazzCash Payment Details:</strong><br>
          Please send payable amount to JazzCash Mobile Account: <strong>0316-4898176</strong> (Title: <strong>Munir Ahmed Decorations</strong>). Enter the transaction TID below for immediate dispatch verification.
        `;
      } else if (method === 'easypaisa') {
        instructionsText.innerHTML = `
          <strong>EasyPaisa Payment Details:</strong><br>
          Please send payable amount to EasyPaisa Account: <strong>0316-4898176</strong> (Title: <strong>Munir Ahmed Decorations</strong>). Enter the transaction TID below.
        `;
      } else if (method === 'meezan') {
        instructionsText.innerHTML = `
          <strong>Meezan Bank & Raast Transfer:</strong><br>
          Raast ID: <strong>03164898176</strong> | IBAN: <strong>PK42MEZN0001234567890101</strong><br>
          Account Title: <strong>Munir Ahmed Decorations Co.</strong>. Enter Bank Reference ID below.
        `;
      }
    }
  };

  window.handleCityChange = function(cityName) {
    // City courier time info
    const city = window.PAKISTAN_CITIES.find(c => c.name === cityName);
    if (city) {
      showToast(`Courier to ${city.name}: ${city.days}`, 'info');
    }
  };

  /**
   * Handle Order Submit
   */
  window.handleOrderSubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const city = document.getElementById('cust-city').value;
    const area = document.getElementById('cust-area').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const notes = document.getElementById('cust-notes').value.trim();
    const txRef = document.getElementById('tx-ref') ? document.getElementById('tx-ref').value.trim() : '';

    const fullAddress = `${address}, ${area}, ${city}`;

    const orderPayload = {
      customer: {
        name,
        phone,
        city,
        address: fullAddress,
        notes
      },
      payment: {
        method: activePaymentMethod,
        transactionRef: txRef
      }
    };

    const result = window.Store.processOrder(orderPayload);
    if (result.success) {
      closeCheckout();
      triggerConfetti();
    } else {
      showToast(result.error || 'Failed to place order.', 'warning');
    }
  };

  /**
   * Order Success Modal & WhatsApp Slip
   */
  function openOrderSuccess(order) {
    const successOrderId = document.getElementById('success-order-id');
    const successTotal = document.getElementById('success-order-total');
    const successPayment = document.getElementById('success-payment-method');
    const btnWhatsApp = document.getElementById('btn-success-whatsapp');

    if (successOrderId) successOrderId.innerText = order.orderId;
    if (successTotal) successTotal.innerText = `PKR ${order.total.toLocaleString()}`;
    if (successPayment) {
      const methodNames = {
        jazzcash: 'JazzCash Direct',
        easypaisa: 'EasyPaisa Direct',
        meezan: 'Meezan Bank / Raast'
      };
      successPayment.innerText = methodNames[order.paymentMethod] || order.paymentMethod;
    }

    // Generate WhatsApp Slip & automatically dispatch notification to shop owner
    if (btnWhatsApp) {
      const slipUrl = generateWhatsAppOrderUrl(order);
      btnWhatsApp.href = slipUrl;

      // Automatically trigger WhatsApp notification to shop helpline
      try {
        window.open(slipUrl, '_blank');
      } catch (err) {
        console.warn('Popup blocked; customer can click the notification button directly');
      }
    }

    if (orderSuccessModal) {
      orderSuccessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  window.closeOrderSuccess = function() {
    if (orderSuccessModal) {
      orderSuccessModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  /**
   * Format itemized WhatsApp Order Slip
   */
  function generateWhatsAppOrderUrl(order) {
    const itemsList = order.items.map((i, idx) => 
      `${idx + 1}. *${i.title}* x ${i.quantity} = PKR ${(i.price * i.quantity).toLocaleString()}`
    ).join('\n');

    const methodNames = {
      jazzcash: 'JazzCash Direct (0316-4898176)',
      easypaisa: 'EasyPaisa Direct (0316-4898176)',
      meezan: 'Meezan Bank & Raast (03164898176)'
    };
    const paymentLabel = methodNames[order.paymentMethod] || order.paymentMethod.toUpperCase();

    const msg = 
`🎉 *NEW ORDER NOTIFICATION - MUNIR AHMED DECORATIONS*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${order.orderId}
*Customer Name:* ${order.customer.name}
*Contact Phone:* ${order.customer.phone}
*City:* ${order.customer.city}
*Delivery Address:* ${order.customer.address}
${order.customer.notes ? `*Special Notes:* ${order.customer.notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━
*ORDERED ITEMS:*
${itemsList}

*Items Subtotal:* PKR ${order.subtotal.toLocaleString()}
*Courier Delivery Fee:* PKR ${order.shipping.toLocaleString()}
*GRAND TOTAL PAYABLE:* PKR ${order.total.toLocaleString()}

*Payment Method:* ${paymentLabel}
${order.transactionRef && order.transactionRef !== 'N/A' ? `*Payment TID / Ref:* ${order.transactionRef}\n` : ''}━━━━━━━━━━━━━━━━━━━━
_Order submitted via website. Please verify payment TID and dispatch order via TCS/Leopards!_`;

    return `https://wa.me/923164898176?text=${encodeURIComponent(msg)}`;
  }

  /**
   * Direct WhatsApp Checkout Button from Cart Drawer
   */
  function setupWhatsAppDirectCart() {
    const btn = document.getElementById('btn-whatsapp-direct-checkout');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const cart = window.Store.getCart();
      if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
      }
      const summary = window.Store.getCartSummary();
      const itemsList = cart.map((i, idx) => 
        `${idx + 1}. *${i.title}* x ${i.quantity} = PKR ${(i.price * i.quantity).toLocaleString()}`
      ).join('\n');

      const msg = 
`Assalam o Alaikum! I would like to place an order from *Munir Ahmed Decorations*:

${itemsList}

*Subtotal:* PKR ${summary.subtotal.toLocaleString()}
*Estimated Shipping:* PKR ${summary.shipping.toLocaleString()}
*Grand Total:* PKR ${summary.grandTotal.toLocaleString()}

Please confirm stock availability and payment details for delivery!`;

      window.open(`https://wa.me/923164898176?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  /**
   * Filter by Occasion (Unique Pakistani Celebrations)
   */
  window.filterByOccasion = function(theme) {
    const themeMap = {
      birthday: { category: 'all', search: 'birthday' },
      wedding: { category: 'foil-balloons', search: 'pakki' },
      bridal: { category: 'party-sashes', search: 'bride' },
      packaging: { category: 'gift-packaging', search: '' },
      religious: { category: 'religious-banners', search: '' },
      sparkler: { category: 'candles-sparklers', search: 'anar' }
    };
    const target = themeMap[theme] || { category: 'all', search: '' };
    currentFilter = target.category;
    searchQuery = target.search;

    const searchInput = document.getElementById('catalog-search');
    if (searchInput) searchInput.value = target.search;

    renderCategoryPills();
    renderProducts();

    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Urgent Dispatch Cutoff Countdown Timer
   */
  function startDispatchCountdown() {
    const timerEl = document.getElementById('dispatch-timer');
    if (!timerEl) return;

    function updateTimer() {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(16, 0, 0, 0); // 4:00 PM Express Courier Cutoff

      let diff = cutoff - now;
      if (diff <= 0) {
        cutoff.setDate(cutoff.getDate() + 1);
        diff = cutoff - now;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');
      timerEl.textContent = `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }


  /**
   * Admin Portal Logic
   */
  window.openAdmin = function() {
    if (adminModal) {
      adminModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (isAdminLoggedIn) renderAdminInventory();
    }
  };

  window.closeAdmin = function() {
    if (adminModal) {
      adminModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.handleAdminLogin = function() {
    const pin = document.getElementById('admin-pin-input').value.trim();
    if (pin === '1970' || pin === '1998' || pin === '1234') {
      isAdminLoggedIn = true;
      document.getElementById('admin-login-box').style.display = 'none';
      document.getElementById('admin-dashboard-box').style.display = 'block';
      renderAdminInventory();
      showToast('Admin Portal Unlocked!', 'success');
    } else {
      showToast('Incorrect Admin PIN. (Default: 1970)', 'warning');
    }
  };

  window.handleAdminLogout = function() {
    isAdminLoggedIn = false;
    document.getElementById('admin-login-box').style.display = 'block';
    document.getElementById('admin-dashboard-box').style.display = 'none';
    document.getElementById('admin-pin-input').value = '';
    closeAdmin();
  };

  function renderAdminInventory() {
    const tbody = document.getElementById('admin-inventory-tbody');
    if (!tbody || !window.Store) return;

    const products = window.Store.getProducts();
    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div style="font-weight:700; color:#fff;">${p.title}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${p.id}</div>
        </td>
        <td>${p.category}</td>
        <td>
          <input type="number" id="adm-pri-${p.id}" value="${p.price}" style="width:75px; background:#090c15; color:#fff; border:1px solid #333; padding:4px; border-radius:6px;">
        </td>
        <td>
          <input type="number" id="adm-stk-${p.id}" value="${p.stock}" style="width:65px; background:#090c15; color:#2ed573; border:1px solid #333; padding:4px; border-radius:6px;">
        </td>
        <td>
          <button class="btn-primary-party" style="padding:4px 10px; font-size:0.75rem;" onclick="saveAdminProductRow('${p.id}')">
            Save
          </button>
        </td>
      </tr>
    `).join('');
  }

  window.saveAdminProductRow = function(productId) {
    const pri = document.getElementById(`adm-pri-${productId}`).value;
    const stk = document.getElementById(`adm-stk-${productId}`).value;

    window.Store.updateProductPrices(productId, pri);
    window.Store.updateProductStock(productId, stk);
    showToast(`Updated ${productId} successfully!`, 'success');
  };

  window.resetMasterCatalog = function() {
    if (confirm('Reset all product stock, prices, and catalog back to factory defaults?')) {
      window.Store.resetToDefaultCatalog();
      renderAdminInventory();
      renderProducts();
      showToast('Master inventory reloaded to original seed values!', 'success');
    }
  };

  /**
   * Toast Notifications
   */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
  window.showToast = showToast;

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Debounced Search Input & Clear Button
    const searchInput = document.getElementById('catalog-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');
    let searchDebounceTimer = null;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = val.length > 0 ? 'flex' : 'none';
        }
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
          searchQuery = val.toLowerCase();
          renderProducts();
        }, 120);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        clearSearchBtn.style.display = 'none';
        searchQuery = '';
        renderProducts();
      });
    }

    // Sort Select
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }

    // Sound FX Toggle
    const soundToggleBtn = document.getElementById('btn-sound-toggle');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const enabled = SoundFX.toggle();
        soundToggleBtn.innerHTML = enabled ? '🔊 Party FX: ON' : '🔇 Party FX: OFF';
        soundToggleBtn.style.color = enabled ? '#2ed573' : '#8392a5';
        if (enabled) SoundFX.playPop();
      });
    }

    // Hero Confetti Cannon Button
    const heroConfettiBtn = document.getElementById('btn-hero-confetti');
    if (heroConfettiBtn) {
      heroConfettiBtn.addEventListener('click', (e) => {
        SoundFX.playPop();
        triggerConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight * 0.35, 160);
      });
    }

    // Floating Party Popper Button
    const floatingPartyBtn = document.getElementById('btn-floating-party');
    if (floatingPartyBtn) {
      floatingPartyBtn.addEventListener('click', (e) => {
        SoundFX.playPop();
        triggerConfetti(e.clientX || window.innerWidth * 0.85, e.clientY || window.innerHeight * 0.85, 140);
      });
    }

    // Cart Drawer triggers
    const openCartBtn = document.getElementById('btn-open-cart');
    const closeCartBtn = document.getElementById('btn-close-cart');
    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Proceed to Checkout
    const btnProceedCheckout = document.getElementById('btn-proceed-checkout');
    if (btnProceedCheckout) {
      btnProceedCheckout.addEventListener('click', () => {
        closeCart();
        openCheckout();
      });
    }

    // Admin trigger
    const btnOpenAdmin = document.getElementById('btn-open-admin');
    if (btnOpenAdmin) {
      btnOpenAdmin.addEventListener('click', () => {
        window.location.href = 'admin.html';
      });
    }

    // WhatsApp direct cart checkout
    setupWhatsAppDirectCart();
  }

  // Self Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
