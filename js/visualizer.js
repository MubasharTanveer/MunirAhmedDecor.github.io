/**
 * Munir Ahmed Luxury Celebrations & Event Decor
 * The Royal Event Stage & Party Decor Visualizer Studio (Interactive Stage Designer)
 */

const StageVisualizer = (function() {
  'use strict';

  // Current visualizer state
  const state = {
    eventType: 'mehndi', // 'mehndi', 'barat', 'birthday', 'nikkah'
    lighting: 'evening', // 'day', 'evening', 'party'
    props: {
      arch: true,
      centerpiece: 'sofa', // 'sofa', 'cake_table', 'cushions'
      topper: 'Dulhan', // 'Dulhan', 'Happy Birthday', 'Mr & Mrs'
      fairyLights: true,
      poppersBlasting: false,
      coldPyro: false,
      dholkiProps: true
    }
  };

  // Preset themes configuration
  const THEMES = {
    mehndi: {
      name: 'Royal Mehndi Ki Raat',
      urdu: 'شاہی مہندی کی رات',
      bgGradient: 'linear-gradient(135deg, #1b382b 0%, #0d2319 60%, #3d2606 100%)',
      curtainColor: '#c5a059',
      accentColor: '#f59e0b',
      floralType: 'marigold',
      defaultTopper: 'Dulhan',
      includedItems: [
        { id: 'WD-201', qty: 2, title: 'Royal Handcrafted Gota Kinari Mehndi Thaal' },
        { id: 'WD-202', qty: 1, title: 'Traditional Desi Mayun Umbrella & Dholki Props' },
        { id: 'WD-203', qty: 2, title: '100ft Warm Golden LED Fairy Curtain Waterfall Lights' },
        { id: 'PP-101', qty: 2, title: '60cm Gold Metallic Confetti Cannon (Pack of 4)' }
      ]
    },
    barat: {
      name: 'Grand Royal Barat Stage',
      urdu: 'عظیم الشان شاہی بارات اسٹیج',
      bgGradient: 'linear-gradient(135deg, #3d0c15 0%, #150307 60%, #2a1608 100%)',
      curtainColor: '#d4af37',
      accentColor: '#e11d48',
      floralType: 'roses',
      defaultTopper: 'Mr & Mrs',
      includedItems: [
        { id: 'WD-204', qty: 1, title: 'Opulent "Phoolon Ki Chaadar" Bridal Entry Frame' },
        { id: 'WD-203', qty: 3, title: '100ft Warm Golden LED Fairy Curtain Waterfall Lights' },
        { id: 'PP-102', qty: 2, title: 'Barat Royal Color Smoke Fog Flares (Set of 5)' },
        { id: 'PP-104', qty: 2, title: 'Smokeless Cold Pyro Stage Fountain (4 Pcs)' },
        { id: 'CT-003', qty: 1, title: '"Mr & Mrs" Elegant Floral Wreath Cake Topper' }
      ]
    },
    birthday: {
      name: 'Luxury Milestone Birthday Gala',
      urdu: 'لگژری سالگرہ و برتھ ڈے سیٹ اپ',
      bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #3b0764 100%)',
      curtainColor: '#ec4899',
      accentColor: '#fbbf24',
      floralType: 'balloons',
      defaultTopper: 'Happy Birthday',
      includedItems: [
        { id: 'BL-301', qty: 1, title: 'Deluxe Emerald & Chrome Gold 110-pc Balloon Garland Arch' },
        { id: 'BL-302', qty: 1, title: 'Pastel Macaron Dream Birthday Arch & Pedestal Set' },
        { id: 'BL-303', qty: 2, title: 'Giant 40-inch Metallic Golden Number Foil Balloon' },
        { id: 'CT-001', qty: 1, title: 'Royal Mirror Gold "Happy Birthday" Calligraphy Topper' },
        { id: 'PP-101', qty: 2, title: '60cm Gold Metallic Confetti Cannon (Pack of 4)' }
      ]
    },
    nikkah: {
      name: 'Serene Nikkah & Walima Pavilion',
      urdu: 'پروقار نکاح و ولیمہ پویلین',
      bgGradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 60%, #134e4a 100%)',
      curtainColor: '#fef08a',
      accentColor: '#34d399',
      floralType: 'motia',
      defaultTopper: 'Dulhan',
      includedItems: [
        { id: 'EB-401', qty: 1, title: 'Nikkah Mubarak Signature Ceremony Hamper & Pen Set' },
        { id: 'WD-203', qty: 2, title: '100ft Warm Golden LED Fairy Curtain Waterfall Lights' },
        { id: 'CT-002', qty: 1, title: '"Dulhan" Royal Urdu Calligraphy Wedding Cake Topper' },
        { id: 'PP-103', qty: 2, title: 'Holographic Flutter Fetti Party Throw Ribbons (12 Pcs)' }
      ]
    }
  };

  /**
   * Calculate total price of currently visualized stage
   */
  function calculateStagePackage() {
    const currentTheme = THEMES[state.eventType];
    let originalTotal = 0;
    const items = [];

    currentTheme.includedItems.forEach(spec => {
      const prod = window.Store ? window.Store.getProductById(spec.id) : null;
      if (prod) {
        const lineTotal = prod.price * spec.qty;
        originalTotal += lineTotal;
        items.push({
          ...prod,
          qty: spec.qty,
          lineTotal
        });
      }
    });

    // 20% package bundle discount
    const packageDiscount = Math.round(originalTotal * 0.20);
    const bundlePrice = originalTotal - packageDiscount;

    return {
      theme: currentTheme,
      items,
      originalTotal,
      packageDiscount,
      bundlePrice
    };
  }

  /**
   * Add all items in the visualized package directly to cart
   */
  function addEntirePackageToCart() {
    const pkg = calculateStagePackage();
    let addedCount = 0;

    pkg.items.forEach(item => {
      if (window.Store) {
        window.Store.addToCart(item.id, item.qty);
        addedCount += item.qty;
      }
    });

    if (window.triggerCelebrationConfetti) {
      window.triggerCelebrationConfetti();
    }

    return {
      success: true,
      addedCount,
      bundlePrice: pkg.bundlePrice,
      savings: pkg.packageDiscount
    };
  }

  /**
   * Set theme
   */
  function setEventType(type) {
    if (THEMES[type]) {
      state.eventType = type;
      state.props.topper = THEMES[type].defaultTopper;
      if (type === 'birthday') {
        state.props.centerpiece = 'cake_table';
        state.props.dholkiProps = false;
      } else {
        state.props.centerpiece = 'sofa';
        state.props.dholkiProps = true;
      }
      renderStage();
    }
  }

  /**
   * Set lighting mode
   */
  function setLighting(mode) {
    state.lighting = mode;
    renderStage();
  }

  /**
   * Toggle a specific prop
   */
  function toggleProp(propName) {
    if (propName === 'centerpiece') {
      const sequence = ['sofa', 'cake_table', 'cushions'];
      const nextIdx = (sequence.indexOf(state.props.centerpiece) + 1) % sequence.length;
      state.props.centerpiece = sequence[nextIdx];
    } else if (propName === 'topper') {
      const toppers = ['Dulhan', 'Happy Birthday', 'Mr & Mrs'];
      const nextIdx = (toppers.indexOf(state.props.topper) + 1) % toppers.length;
      state.props.topper = toppers[nextIdx];
    } else {
      state.props[propName] = !state.props[propName];
    }
    renderStage();
  }

  /**
   * Render the stage in the DOM container
   */
  function renderStage() {
    const container = document.getElementById('stage-canvas-container');
    if (!container) return;

    const theme = THEMES[state.eventType];
    const lightingClass = `lighting-${state.lighting}`;

    // Compute dynamic package price
    const pkg = calculateStagePackage();

    // Render HTML inside container
    container.className = `stage-preview-box ${lightingClass}`;
    container.style.background = theme.bgGradient;

    let propsHtml = `
      <div class="stage-ambient-lights ${state.props.fairyLights ? 'active' : ''}">
        <div class="light-strings"></div>
      </div>
      
      <div class="stage-backdrop-drapes" style="border-color: ${theme.curtainColor}">
        <div class="stage-crest">
          <span class="crest-icon">✦</span>
          <span class="crest-text">${theme.urdu}</span>
          <span class="crest-icon">✦</span>
        </div>
      </div>
    `;

    // Floral / Arch
    if (state.props.arch) {
      if (theme.floralType === 'balloons') {
        propsHtml += `
          <div class="stage-prop prop-balloon-arch">
            <div class="balloon-garland-visual">
              <span class="balloon-cluster c1"></span>
              <span class="balloon-cluster c2"></span>
              <span class="balloon-cluster c3"></span>
            </div>
            <div class="neon-sign-glow">✨ Celebrations ✨</div>
          </div>
        `;
      } else {
        propsHtml += `
          <div class="stage-prop prop-floral-arch ${theme.floralType}">
            <div class="arch-frame"></div>
            <div class="lanterns-hanging">
              <span class="lantern l1">🏮</span>
              <span class="lantern l2">🏮</span>
              <span class="lantern l3">🏮</span>
            </div>
          </div>
        `;
      }
    }

    // Centerpiece
    if (state.props.centerpiece === 'sofa') {
      propsHtml += `
        <div class="stage-prop prop-center-sofa">
          <div class="maharaja-sofa">
            <div class="cushion left"></div>
            <div class="sofa-seat"></div>
            <div class="cushion right"></div>
          </div>
          <div class="persian-rug"></div>
        </div>
      `;
    } else if (state.props.centerpiece === 'cake_table') {
      propsHtml += `
        <div class="stage-prop prop-cake-table">
          <div class="pedestal-table">
            <div class="cake-display">
              <div class="cake-layer tier3"></div>
              <div class="cake-layer tier2"></div>
              <div class="cake-layer tier1"></div>
              <div class="cake-topper-visual">
                <span class="gold-topper-text">${state.props.topper}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      propsHtml += `
        <div class="stage-prop prop-baithak">
          <div class="low-seating-gaddi">
            <span class="round-pillow p1"></span>
            <span class="round-pillow p2"></span>
          </div>
          <div class="persian-rug"></div>
        </div>
      `;
    }

    // Traditional Mehndi dholki props
    if (state.props.dholkiProps && state.eventType !== 'birthday') {
      propsHtml += `
        <div class="stage-prop prop-dholki-side">
          <div class="desi-thaal-mini">
            <span class="diya-flame">🪔</span>
            <span class="gota-umbrella">⛱️</span>
          </div>
        </div>
      `;
    }

    // Cold Pyro fountains
    if (state.props.coldPyro) {
      propsHtml += `
        <div class="stage-prop prop-cold-pyro left active"><div class="spark-jets"></div></div>
        <div class="stage-prop prop-cold-pyro right active"><div class="spark-jets"></div></div>
      `;
    }

    // Popper blast streamers
    if (state.props.poppersBlasting) {
      propsHtml += `
        <div class="stage-prop prop-popper-blast">
          <div class="streamer s1"></div>
          <div class="streamer s2"></div>
          <div class="streamer s3"></div>
          <div class="streamer s4"></div>
          <div class="streamer s5"></div>
        </div>
      `;
    }

    container.innerHTML = propsHtml;

    // Update pricing badge outside canvas
    const priceDisplay = document.getElementById('visualizer-price-display');
    if (priceDisplay) {
      priceDisplay.innerHTML = `
        <div class="viz-pricing-box">
          <div class="viz-title-info">
            <span class="viz-theme-badge">${theme.name} (${theme.urdu})</span>
            <span class="viz-item-count">${pkg.items.length} Decor Essentials Included</span>
          </div>
          <div class="viz-price-math">
            <span class="viz-orig-price">PKR ${pkg.originalTotal.toLocaleString()}</span>
            <span class="viz-bundle-price">PKR ${pkg.bundlePrice.toLocaleString()}</span>
            <span class="viz-save-pill">Save 20% (PKR ${pkg.packageDiscount.toLocaleString()})</span>
          </div>
        </div>
      `;
    }
  }

  function firePoppers() {
    state.props.poppersBlasting = true;
    renderStage();
    if (window.triggerCelebrationConfetti) {
      window.triggerCelebrationConfetti();
    }
    setTimeout(() => {
      state.props.poppersBlasting = false;
      renderStage();
    }, 2800);
  }

  return {
    init: () => {
      renderStage();
    },
    setEventType,
    setLighting,
    toggleProp,
    firePoppers,
    calculateStagePackage,
    addEntirePackageToCart,
    getState: () => ({ ...state })
  };
})();

window.StageVisualizer = StageVisualizer;
