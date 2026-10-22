/**
 * Munir Ahmed Luxury Celebrations & Event Decor
 * Pakistani Event Guest & Bulk Wholesale Estimator
 */

const BulkEstimator = (function() {
  'use strict';

  function calculate(guestCount, eventType) {
    const guests = parseInt(guestCount, 10) || 50;
    const type = eventType || 'wedding';

    let poppersCount = 4;
    let throwsCount = 6;
    let balloonKits = 1;
    let fairyLightsCount = 2;
    let cakeTopperCount = 1;
    let mehndiThaalsCount = 1;

    // Scaling formulas tailored for Pakistani banquet halls & parties
    if (type === 'wedding') {
      poppersCount = Math.max(4, Math.round(guests / 35));
      throwsCount = Math.max(6, Math.round(guests / 20));
      balloonKits = Math.max(1, Math.round(guests / 120));
      fairyLightsCount = Math.max(2, Math.round(guests / 60));
      mehndiThaalsCount = Math.max(2, Math.round(guests / 80));
    } else if (type === 'birthday') {
      poppersCount = Math.max(4, Math.round(guests / 25));
      throwsCount = Math.max(10, Math.round(guests / 15));
      balloonKits = Math.max(1, Math.round(guests / 40));
      fairyLightsCount = Math.max(1, Math.round(guests / 80));
      mehndiThaalsCount = 0;
    } else {
      // Bridal shower / intimate
      poppersCount = Math.max(3, Math.round(guests / 30));
      throwsCount = Math.max(6, Math.round(guests / 20));
      balloonKits = Math.max(1, Math.round(guests / 50));
      fairyLightsCount = 2;
      mehndiThaalsCount = 1;
    }

    // Map to actual catalog items
    const recommendedItems = [];

    // 1. Party Poppers (PP-101)
    const popperProd = window.Store ? window.Store.getProductById('PP-101') : null;
    if (popperProd) {
      recommendedItems.push({
        ...popperProd,
        qty: poppersCount,
        role: 'Grand Entrance & Cake Cutting Blasts'
      });
    }

    // 2. Party Throws (PP-103)
    const throwProd = window.Store ? window.Store.getProductById('PP-103') : null;
    if (throwProd) {
      recommendedItems.push({
        ...throwProd,
        qty: throwsCount,
        role: 'Dance Floor & Stage Ribbons'
      });
    }

    // 3. Balloon Garland Arch Kit (BL-301)
    const balloonProd = window.Store ? window.Store.getProductById('BL-301') : null;
    if (balloonProd && balloonKits > 0) {
      recommendedItems.push({
        ...balloonProd,
        qty: balloonKits,
        role: 'Welcome Archway & Photo Backdrop'
      });
    }

    // 4. Fairy Waterfall Lights (WD-203)
    const fairyProd = window.Store ? window.Store.getProductById('WD-203') : null;
    if (fairyProd && fairyLightsCount > 0) {
      recommendedItems.push({
        ...fairyProd,
        qty: fairyLightsCount,
        role: 'Curtain & Ceiling Ambience'
      });
    }

    // 5. Cake Topper (CT-001 or CT-002)
    const topperId = (type === 'wedding') ? 'CT-002' : 'CT-001';
    const topperProd = window.Store ? window.Store.getProductById(topperId) : null;
    if (topperProd) {
      recommendedItems.push({
        ...topperProd,
        qty: cakeTopperCount,
        role: 'Centerpiece Cake Highlight'
      });
    }

    // 6. Mehndi Thaal (WD-201) if wedding
    if (mehndiThaalsCount > 0) {
      const thaalProd = window.Store ? window.Store.getProductById('WD-201') : null;
      if (thaalProd) {
        recommendedItems.push({
          ...thaalProd,
          qty: mehndiThaalsCount,
          role: 'Rasm-e-Hina & Mayun Ceremony'
        });
      }
    }

    // Calculate wholesale discount tiers based on guest count & volume
    let retailTotal = 0;
    let wholesaleTotal = 0;

    recommendedItems.forEach(item => {
      retailTotal += item.price * item.qty;
      wholesaleTotal += item.wholesalePrice * item.qty;
    });

    // Volume bonus discount
    let bulkTierName = 'Standard Bulk (15% OFF)';
    let discountPct = 0.15;
    if (guests >= 300) {
      bulkTierName = 'Grand Banquet VIP Tier (30% OFF)';
      discountPct = 0.30;
    } else if (guests >= 150) {
      bulkTierName = 'Event Planner Wholesale (22% OFF)';
      discountPct = 0.22;
    }

    const discountedTotal = Math.round(retailTotal * (1 - discountPct));
    const totalSavings = retailTotal - discountedTotal;
    const costPerGuest = Math.round(discountedTotal / guests);

    return {
      guests,
      eventType: type,
      recommendedItems,
      retailTotal,
      discountedTotal,
      totalSavings,
      costPerGuest,
      bulkTierName
    };
  }

  function addBulkPackageToCart(calculationResult) {
    if (!calculationResult || !calculationResult.recommendedItems) return false;
    
    calculationResult.recommendedItems.forEach(item => {
      if (window.Store) {
        window.Store.addToCart(item.id, item.qty);
      }
    });

    if (window.triggerCelebrationConfetti) {
      window.triggerCelebrationConfetti();
    }
    return true;
  }

  return {
    calculate,
    addBulkPackageToCart
  };
})();

window.BulkEstimator = BulkEstimator;
