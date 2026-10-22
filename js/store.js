/**
 * Munir Ahmed Luxury Celebrations & Event Decor
 * Central Reactive Store & Secure State Manager
 */

const Store = (function() {
  'use strict';

  const STORAGE_KEYS = {
    PRODUCTS: 'munir_party_products_v4',
    CART: 'munir_party_cart_v4',
    ORDERS: 'munir_party_orders_v4',
    WHOLESALE: 'munir_is_wholesale_v4',
    ADMIN_SESSION: 'munir_admin_auth_v4'
  };

  // State objects
  let products = [];
  let cart = [];
  let orders = [];
  let isWholesaleMode = false;
  let listeners = [];

  /**
   * Initialize state from localStorage or defaults
   */
  function init() {
    // 1. Products
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts && JSON.parse(storedProducts).length >= 25) {
        products = JSON.parse(storedProducts);
      } else {
        products = JSON.parse(JSON.stringify(window.MUNIR_CATALOG || []));
        saveProducts();
      }
    } catch (e) {
      products = JSON.parse(JSON.stringify(window.MUNIR_CATALOG || []));
    }

    // 2. Cart
    try {
      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      cart = [];
    }

    // 3. Orders
    try {
      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      orders = storedOrders ? JSON.parse(storedOrders) : seedOrders();
    } catch (e) {
      orders = seedOrders();
    }

    // 4. Wholesale Mode
    try {
      isWholesaleMode = localStorage.getItem(STORAGE_KEYS.WHOLESALE) === 'true';
    } catch (e) {
      isWholesaleMode = false;
    }

    // Verify initial cart against products & security
    validateCartAgainstStock();
  }

  function seedOrders() {
    const demo = [
      {
        orderId: 'MAD-PK-88421',
        date: new Date(Date.now() - 3600000 * 28).toISOString(),
        customer: {
          name: 'Hamza Tariq (Wedding Planner)',
          phone: '0300-4567891',
          city: 'Lahore',
          address: 'Gulberg III, Near MM Alam Road'
        },
        items: [
          { id: 'WD-201', title: 'Royal Handcrafted Gota Kinari Mehndi Thaal', price: 1850, quantity: 4, isWholesale: true },
          { id: 'PP-101', title: '60cm Gold Metallic Confetti Cannon', price: 750, quantity: 12, isWholesale: true }
        ],
        subtotal: 16400,
        shipping: 0,
        total: 16400,
        paymentMethod: 'jazzcash',
        paymentStatus: 'VERIFIED',
        transactionRef: 'JC-904812491',
        orderStatus: 'Confirmed & Packing',
        securityHash: 'verified-authentic-01'
      },
      {
        orderId: 'MAD-PK-88419',
        date: new Date(Date.now() - 3600000 * 72).toISOString(),
        customer: {
          name: 'Ayesha Khan',
          phone: '0321-9876543',
          city: 'Karachi',
          address: 'Block 4, Clifton'
        },
        items: [
          { id: 'CT-002', title: '"Dulhan" Royal Urdu Calligraphy Wedding Cake Topper', price: 550, quantity: 1, isWholesale: false },
          { id: 'BL-301', title: 'Deluxe Emerald & Chrome Gold Balloon Garland Kit', price: 2100, quantity: 1, isWholesale: false }
        ],
        subtotal: 2650,
        shipping: 250,
        total: 2900,
        paymentMethod: 'cod',
        paymentStatus: 'PENDING_DELIVERY',
        transactionRef: 'COD-RIDER',
        orderStatus: 'Dispatched (TCS/Leopard)',
        securityHash: 'verified-authentic-02'
      }
    ];
    saveOrders(demo);
    return demo;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }

  function notify(changeType, payload) {
    listeners.forEach(fn => {
      try {
        fn(changeType, payload);
      } catch (err) {
        console.error('Store listener error:', err);
      }
    });
  }

  function saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }

  function saveOrders(newOrders) {
    orders = newOrders || orders;
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }

  function getProducts() {
    return products;
  }

  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  function getCart() {
    return cart;
  }

  function getOrders() {
    return orders;
  }

  function isWholesale() {
    return isWholesaleMode;
  }

  function setWholesaleMode(enabled) {
    isWholesaleMode = Boolean(enabled);
    localStorage.setItem(STORAGE_KEYS.WHOLESALE, String(isWholesaleMode));
    
    // Update existing items in cart with their wholesale prices if qualified
    cart.forEach(item => {
      const prod = getProductById(item.id);
      if (prod) {
        if (isWholesaleMode || item.quantity >= prod.minWholesaleQty) {
          item.isWholesale = true;
          item.price = prod.wholesalePrice;
        } else {
          item.isWholesale = false;
          item.price = prod.price;
        }
      }
    });
    saveCart();
    notify('WHOLESALE_TOGGLED', isWholesaleMode);
    notify('CART_UPDATED', cart);
  }

  /**
   * Add Item to Cart with Stock Check and Tamper-Proof Price
   */
  function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
      return { success: false, message: 'Product not found in catalog.' };
    }

    if (product.stock <= 0) {
      return { success: false, message: 'Sorry! This item is currently Sold Out.' };
    }

    const existingIndex = cart.findIndex(item => item.id === productId);
    let requestedQty = quantity;

    if (existingIndex > -1) {
      requestedQty += cart[existingIndex].quantity;
    }

    // Stock constraint
    if (requestedQty > product.stock) {
      return {
        success: false,
        message: `Only ${product.stock} units currently available in stock!`
      };
    }

    const qualifiesWholesale = isWholesaleMode || requestedQty >= product.minWholesaleQty;
    const effectivePrice = qualifiesWholesale ? product.wholesalePrice : product.price;

    if (existingIndex > -1) {
      cart[existingIndex].quantity = requestedQty;
      cart[existingIndex].isWholesale = qualifiesWholesale;
      cart[existingIndex].price = effectivePrice;
      cart[existingIndex].hash = window.CyberDefense ? window.CyberDefense.computeItemHash(productId, effectivePrice) : '';
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        urduTitle: product.urduTitle,
        category: product.category,
        image: product.image,
        price: effectivePrice,
        isWholesale: qualifiesWholesale,
        quantity: requestedQty,
        minWholesaleQty: product.minWholesaleQty,
        hash: window.CyberDefense ? window.CyberDefense.computeItemHash(productId, effectivePrice) : ''
      });
    }

    saveCart();
    notify('CART_UPDATED', cart);
    return { success: true, cart };
  }

  function updateCartQuantity(productId, newQty) {
    const product = getProductById(productId);
    const itemIndex = cart.findIndex(i => i.id === productId);

    if (itemIndex === -1) return;

    if (newQty <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      if (product && newQty > product.stock) {
        newQty = product.stock;
      }
      cart[itemIndex].quantity = newQty;
      
      if (product) {
        const qualifiesWholesale = isWholesaleMode || newQty >= product.minWholesaleQty;
        cart[itemIndex].isWholesale = qualifiesWholesale;
        cart[itemIndex].price = qualifiesWholesale ? product.wholesalePrice : product.price;
      }
    }

    saveCart();
    notify('CART_UPDATED', cart);
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    notify('CART_UPDATED', cart);
  }

  function clearCart() {
    cart = [];
    saveCart();
    notify('CART_UPDATED', cart);
  }

  function getCartSummary() {
    let count = 0;
    let subtotal = 0;
    let totalSavings = 0;

    cart.forEach(item => {
      const prod = getProductById(item.id);
      count += item.quantity;
      subtotal += item.price * item.quantity;
      if (prod && item.isWholesale) {
        const retailCost = prod.price * item.quantity;
        totalSavings += (retailCost - (item.price * item.quantity));
      }
    });

    // Free delivery in Pakistan above PKR 3,500
    const shipping = subtotal >= 3500 || subtotal === 0 ? 0 : 250;
    const grandTotal = subtotal + shipping;

    return {
      itemCount: count,
      subtotal,
      shipping,
      grandTotal,
      totalSavings
    };
  }

  function validateCartAgainstStock() {
    let modified = false;
    cart = cart.filter(item => {
      const prod = getProductById(item.id);
      if (!prod || prod.stock <= 0) {
        modified = true;
        return false;
      }
      if (item.quantity > prod.stock) {
        item.quantity = prod.stock;
        modified = true;
      }
      return true;
    });

    if (modified) {
      saveCart();
      notify('CART_UPDATED', cart);
    }
  }

  /**
   * Process and verify checkout with Cyber Defense
   */
  function processOrder(orderPayload) {
    if (!window.CyberDefense) {
      return { success: false, error: 'Security engine unavailable.' };
    }

    // 1. Rate limiting check
    if (!window.CyberDefense.checkRateLimit('checkout', 5, 60)) {
      return {
        success: false,
        error: 'Too many checkout attempts in a short period. Please wait 60 seconds.'
      };
    }

    // 2. Validate Cart Integrity
    const integrityResult = window.CyberDefense.verifyCartIntegrity(cart, products);
    if (!integrityResult.isValid) {
      return {
        success: false,
        error: 'Security Warning: Price or quantity mismatch detected. Cart has been re-synchronized.'
      };
    }

    // 3. Validate customer inputs
    const { customer, payment } = orderPayload;
    if (!customer || !customer.name || !customer.phone || !customer.city || !customer.address) {
      return { success: false, error: 'Please fill in all shipping details.' };
    }

    if (!window.CyberDefense.validatePakistaniPhone(customer.phone)) {
      return { success: false, error: 'Please enter a valid Pakistani phone number (e.g. 0300-1234567).' };
    }

    // 4. Check stock availability and deduct
    for (const item of cart) {
      const prod = getProductById(item.id);
      if (!prod || prod.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${item.title}. Only ${prod ? prod.stock : 0} remaining.`
        };
      }
    }

    // Deduct stock in real-time
    cart.forEach(item => {
      const prod = getProductById(item.id);
      if (prod) {
        prod.stock -= item.quantity;
      }
    });
    saveProducts();

    // 5. Construct secure order record
    const summary = getCartSummary();
    const cityCode = customer.city.substring(0, 3).toUpperCase();
    const newOrderId = `MAD-${cityCode}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      orderId: newOrderId,
      date: new Date().toISOString(),
      customer: {
        name: window.CyberDefense.sanitizeHTML(customer.name),
        phone: window.CyberDefense.sanitizeHTML(customer.phone),
        city: window.CyberDefense.sanitizeHTML(customer.city),
        address: window.CyberDefense.sanitizeHTML(customer.address),
        notes: window.CyberDefense.sanitizeHTML(customer.notes || '')
      },
      items: JSON.parse(JSON.stringify(cart)),
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      total: summary.grandTotal,
      savings: summary.totalSavings,
      paymentMethod: payment.method,
      paymentStatus: payment.method === 'cod' ? 'PENDING_DELIVERY' : 'PENDING_VERIFICATION',
      transactionRef: window.CyberDefense.sanitizeHTML(payment.transactionRef || 'N/A'),
      orderStatus: 'Confirmed & Packing',
      securityToken: window.CyberDefense.getCsrfToken()
    };

    orders.unshift(newOrder);
    saveOrders();

    // Clear cart
    clearCart();

    // Audit log
    window.CyberDefense.logSecurityEvent(
      'CHECKOUT',
      'ORDER_COMPLETED',
      `Order ${newOrderId} processed for PKR ${summary.grandTotal} via ${payment.method}.`,
      'INFO'
    );

    notify('ORDER_PLACED', newOrder);
    notify('PRODUCTS_UPDATED', products);

    return {
      success: true,
      order: newOrder
    };
  }

  /**
   * Admin Operations: Update stock, price, add product, order status
   */
  function updateProductStock(productId, newStock) {
    const prod = getProductById(productId);
    if (prod) {
      prod.stock = Math.max(0, parseInt(newStock, 10) || 0);
      saveProducts();
      notify('PRODUCTS_UPDATED', products);
      window.CyberDefense.logSecurityEvent('ADMIN_INVENTORY', 'STOCK_UPDATED', `Product ${productId} stock adjusted to ${prod.stock}`, 'INFO');
      return true;
    }
    return false;
  }

  function updateProductPrices(productId, retailPrice, wholesalePrice) {
    const prod = getProductById(productId);
    if (prod) {
      prod.price = Math.max(1, parseFloat(retailPrice) || prod.price);
      prod.wholesalePrice = Math.max(1, parseFloat(wholesalePrice) || prod.wholesalePrice);
      saveProducts();
      notify('PRODUCTS_UPDATED', products);
      window.CyberDefense.logSecurityEvent('ADMIN_INVENTORY', 'PRICE_UPDATED', `Product ${productId} prices updated.`, 'INFO');
      return true;
    }
    return false;
  }

  function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.orderStatus = newStatus;
      saveOrders();
      notify('ORDERS_UPDATED', orders);
      return true;
    }
    return false;
  }

  function addProduct(productData) {
    const newProd = {
      id: 'MAD-' + (Math.floor(100 + Math.random() * 900)),
      title: window.CyberDefense.sanitizeHTML(productData.title),
      urduTitle: window.CyberDefense.sanitizeHTML(productData.urduTitle || ''),
      category: productData.category || 'wedding-decor',
      price: parseFloat(productData.price) || 500,
      wholesalePrice: parseFloat(productData.wholesalePrice) || 350,
      minWholesaleQty: parseInt(productData.minWholesaleQty, 10) || 10,
      stock: parseInt(productData.stock, 10) || 20,
      lowStockThreshold: 5,
      badge: productData.badge || 'New Arrival',
      rating: 5.0,
      reviewsCount: 1,
      image: productData.image || 'assets/images/hero_wedding.jpg',
      description: window.CyberDefense.sanitizeHTML(productData.description || 'Exclusive party decor item.'),
      specs: {
        material: 'Premium Commercial Quality',
        origin: 'Munir Ahmed Studio Lahore'
      }
    };
    products.unshift(newProd);
    saveProducts();
    notify('PRODUCTS_UPDATED', products);
    window.CyberDefense.logSecurityEvent('ADMIN_CATALOG', 'PRODUCT_ADDED', `Product ${newProd.id} (${newProd.title}) created.`, 'INFO');
    return newProd;
  }

  function resetToDefaultCatalog() {
    products = JSON.parse(JSON.stringify(window.MUNIR_CATALOG || []));
    saveProducts();
    notify('PRODUCTS_UPDATED', products);
    return products;
  }

  // Initialize immediately
  init();

  return {
    getProducts,
    getProductById,
    getCart,
    getOrders,
    getCartSummary,
    isWholesale,
    setWholesaleMode,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    processOrder,
    updateProductStock,
    updateProductPrices,
    updateOrderStatus,
    addProduct,
    resetToDefaultCatalog,
    subscribe
  };
})();

window.Store = Store;
