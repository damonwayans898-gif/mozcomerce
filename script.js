// ============================================
// MozCommerce - Marketplace Digital de Moçambique
// Main JavaScript Application
// ============================================

// ============================================
// Global State Management
// ============================================

const MozCommerce = {
    state: {
        user: null,
        cart: [],
        products: [],
        categories: [],
        services: [],
        isAuthenticated: false,
        userType: null // 'buyer', 'seller', 'admin'
    },
    
    config: {
        currency: 'MZN',
        locale: 'pt-MZ',
        paymentMethods: ['mpesa', 'emola', 'mkesh', 'visa', 'mastercard'],
        whatsappPrefix: '258',
        commissionRate: 0.05 // 5%
    }
};

// ============================================
// Utility Functions
// ============================================

const Utils = {
    // Formatar preço em Meticais
    formatPrice(price) {
        return new Intl.NumberFormat('pt-MZ', {
            style: 'currency',
            currency: 'MZN',
            minimumFractionDigits: 2
        }).format(price);
    },
    
    // Formatar número de telefone moçambicano
    formatPhone(phone) {
        // Remove espaços e caracteres especiais
        const cleaned = phone.replace(/\D/g, '');
        
        // Se começa com 258, mantém; senão, adiciona
        if (cleaned.startsWith('258')) {
            return cleaned;
        }
        
        // Remove zero inicial se houver
        const withoutZero = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;
        return '258' + withoutZero;
    },
    
    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Validar email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validar telefone moçambicano
    validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        // Números moçambicanos: 258 + 8/8 dígitos
        return /^258[0-9]{9}$/.test(cleaned) || /^[0-9]{9}$/.test(cleaned);
    },
    
    // Mostrar notificação
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#66BB6A' : type === 'error' ? '#EF5350' : '#2196F3'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ============================================
// Search Functionality
// ============================================

const Search = {
    init() {
        const searchBtn = document.getElementById('openSearch');
        const closeBtn = document.getElementById('closeSearch');
        const modal = document.getElementById('searchModal');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.open());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });
        }
    },
    
    open() {
        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.add('active');
            const input = modal.querySelector('.search-input');
            if (input) input.focus();
        }
    },
    
    close() {
        const modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    perform(query) {
        console.log('Searching for:', query);
        // Implementar lógica de busca
        const results = MozCommerce.state.products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayResults(results);
    },
    
    displayResults(results) {
        console.log('Search results:', results);
        // Mostrar resultados
    }
};

// ============================================
// Authentication System
// ============================================

const Auth = {
    init() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openModal('login'));
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', () => this.openModal('register'));
        }
        
        // Verificar se já está autenticado
        this.checkAuth();
    },
    
    openModal(type) {
        const modalId = type === 'login' ? 'loginModal' : 'registerModal';
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },
    
    checkAuth() {
        const userData = localStorage.getItem('mozcommerce_user');
        if (userData) {
            MozCommerce.state.user = JSON.parse(userData);
            MozCommerce.state.isAuthenticated = true;
            this.updateUI();
        }
    },
    
    login(credentials) {
        // Simular login (em produção, fazer chamada API)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.email && credentials.password) {
                    const user = {
                        id: Utils.generateId(),
                        email: credentials.email,
                        name: 'Usuário Teste',
                        type: 'buyer',
                        phone: '258840000000',
                        createdAt: new Date().toISOString()
                    };
                    
                    localStorage.setItem('mozcommerce_user', JSON.stringify(user));
                    MozCommerce.state.user = user;
                    MozCommerce.state.isAuthenticated = true;
                    
                    this.updateUI();
                    Utils.showNotification('Login realizado com sucesso!', 'success');
                    resolve(user);
                } else {
                    reject(new Error('Credenciais inválidas'));
                }
            }, 1000);
        });
    },
    
    register(userData) {
        // Validações
        if (!Utils.validateEmail(userData.email)) {
            Utils.showNotification('Email inválido', 'error');
            return Promise.reject(new Error('Email inválido'));
        }
        
        if (!Utils.validatePhone(userData.phone)) {
            Utils.showNotification('Telefone inválido', 'error');
            return Promise.reject(new Error('Telefone inválido'));
        }
        
        // Simular registro
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = {
                    id: Utils.generateId(),
                    ...userData,
                    phone: Utils.formatPhone(userData.phone),
                    createdAt: new Date().toISOString(),
                    verified: false,
                    status: userData.type === 'seller' ? 'pending' : 'active'
                };
                
                localStorage.setItem('mozcommerce_user', JSON.stringify(user));
                MozCommerce.state.user = user;
                MozCommerce.state.isAuthenticated = true;
                
                this.updateUI();
                
                if (user.type === 'seller') {
                    Utils.showNotification('Conta criada! Aguarde aprovação do administrador.', 'success');
                } else {
                    Utils.showNotification('Conta criada com sucesso!', 'success');
                }
                
                resolve(user);
            }, 1000);
        });
    },
    
    logout() {
        localStorage.removeItem('mozcommerce_user');
        MozCommerce.state.user = null;
        MozCommerce.state.isAuthenticated = false;
        this.updateUI();
        Utils.showNotification('Sessão encerrada', 'info');
        window.location.href = '/';
    },
    
    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        
        if (MozCommerce.state.isAuthenticated && MozCommerce.state.user) {
            if (loginBtn) loginBtn.textContent = MozCommerce.state.user.name;
            if (registerBtn) {
                registerBtn.textContent = 'Sair';
                registerBtn.onclick = () => this.logout();
            }
        }
    }
};

// ============================================
// Products Management
// ============================================

const Products = {
    init() {
        this.loadSampleProducts();
        this.renderProducts();
    },
    
    loadSampleProducts() {
        MozCommerce.state.products = [
            {
                id: '1',
                title: 'Samsung Galaxy A54 5G',
                description: 'Smartphone Samsung Galaxy A54 5G com 128GB',
                price: 18500.00,
                image: 'https://via.placeholder.com/300x300/1976D2/FFFFFF?text=Galaxy+A54',
                category: 'Eletrónicos',
                seller: {
                    id: 's1',
                    name: 'TechStore Maputo',
                    phone: '258840001234',
                    rating: 4.8
                },
                stock: 15,
                rating: 4.5,
                reviews: 127,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Capulana Tradicional',
                description: 'Capulana 100% algodão, cores vibrantes',
                price: 450.00,
                image: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?text=Capulana',
                category: 'Moda',
                seller: {
                    id: 's2',
                    name: 'Artesanato Moçambique',
                    phone: '258845678901',
                    rating: 4.9
                },
                stock: 50,
                rating: 4.9,
                reviews: 89,
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                title: 'MacBook Air M2',
                description: 'Apple MacBook Air 13" M2, 8GB RAM, 256GB SSD',
                price: 75000.00,
                image: 'https://via.placeholder.com/300x300/9C27B0/FFFFFF?text=MacBook',
                category: 'Eletrónicos',
                seller: {
                    id: 's3',
                    name: 'Apple Store Maputo',
                    phone: '258841112233',
                    rating: 5.0
                },
                stock: 5,
                rating: 5.0,
                reviews: 45,
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                title: 'Sofá 3 Lugares',
                description: 'Sofá confortável de 3 lugares, tecido premium',
                price: 12500.00,
                image: 'https://via.placeholder.com/300x300/FF9800/FFFFFF?text=Sofa',
                category: 'Casa & Jardim',
                seller: {
                    id: 's4',
                    name: 'Móveis Premium',
                    phone: '258843334455',
                    rating: 4.7
                },
                stock: 8,
                rating: 4.6,
                reviews: 34,
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                title: 'Bicicleta Mountain Bike',
                description: 'Bicicleta MTB 21 marchas, suspensão dianteira',
                price: 8900.00,
                image: 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Bicicleta',
                category: 'Desporto',
                seller: {
                    id: 's5',
                    name: 'Sports Moz',
                    phone: '258847778899',
                    rating: 4.5
                },
                stock: 12,
                rating: 4.4,
                reviews: 56,
                createdAt: new Date().toISOString()
            },
            {
                id: '6',
                title: 'Kit Maquiagem Profissional',
                description: 'Kit completo com 50 peças para maquiagem profissional',
                price: 2850.00,
                image: 'https://via.placeholder.com/300x300/F50057/FFFFFF?text=Maquiagem',
                category: 'Beleza',
                seller: {
                    id: 's6',
                    name: 'Beauty Store',
                    phone: '258848889999',
                    rating: 4.8
                },
                stock: 25,
                rating: 4.7,
                reviews: 92,
                createdAt: new Date().toISOString()
            }
        ];
    },
    
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        MozCommerce.state.products.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });
    },
    
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${Utils.formatPrice(product.price)}</p>
                <div class="product-meta">
                    <div class="product-rating">
                        <span>⭐</span>
                        <span>${product.rating} (${product.reviews})</span>
                    </div>
                    <span>${product.stock} em stock</span>
                </div>
                <div class="product-actions">
                    <button class="btn-whatsapp" data-product-id="${product.id}">
                        WhatsApp
                    </button>
                    <button class="btn-cart-add" data-product-id="${product.id}">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        
        // Event listeners
        const whatsappBtn = card.querySelector('.btn-whatsapp');
        const cartBtn = card.querySelector('.btn-cart-add');
        
        whatsappBtn.addEventListener('click', () => this.contactViaWhatsApp(product));
        cartBtn.addEventListener('click', () => Cart.addItem(product));
        
        return card;
    },
    
    contactViaWhatsApp(product) {
        const message = `Olá, estou interessado no produto "${product.title}" anunciado no MozCommerce.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${product.seller.phone}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Registrar interação
        console.log('WhatsApp contact initiated for product:', product.id);
    }
};

// ============================================
// Shopping Cart
// ============================================

const Cart = {
    init() {
        this.loadCart();
        this.updateCartUI();
    },
    
    loadCart() {
        const savedCart = localStorage.getItem('mozcommerce_cart');
        if (savedCart) {
            MozCommerce.state.cart = JSON.parse(savedCart);
        }
    },
    
    saveCart() {
        localStorage.setItem('mozcommerce_cart', JSON.stringify(MozCommerce.state.cart));
    },
    
    addItem(product, quantity = 1) {
        const existingItem = MozCommerce.state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            MozCommerce.state.cart.push({
                ...product,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        Utils.showNotification('Produto adicionado ao carrinho!', 'success');
    },
    
    removeItem(productId) {
        MozCommerce.state.cart = MozCommerce.state.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        Utils.showNotification('Produto removido do carrinho', 'info');
    },
    
    updateQuantity(productId, quantity) {
        const item = MozCommerce.state.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    },
    
    getTotal() {
        return MozCommerce.state.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = MozCommerce.state.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    },
    
    clear() {
        MozCommerce.state.cart = [];
        this.saveCart();
        this.updateCartUI();
    }
};

// ============================================
// Payment System
// ============================================

const Payment = {
    methods: {
        mpesa: {
            name: 'M-Pesa',
            icon: '📱',
            color: '#00A651'
        },
        emola: {
            name: 'E-Mola',
            icon: '💰',
            color: '#FF6B00'
        },
        mkesh: {
            name: 'M-Kesh',
            icon: '💳',
            color: '#1E3A8A'
        },
        visa: {
            name: 'VISA',
            icon: '💳',
            color: '#1A1F71'
        },
        mastercard: {
            name: 'Mastercard',
            icon: '💳',
            color: '#EB001B'
        }
    },
    
    initiatePayment(orderId, method, amount, phoneOrCard) {
        console.log('Initiating payment:', { orderId, method, amount, phoneOrCard });
        
        return new Promise((resolve, reject) => {
            // Simular processo de pagamento
            setTimeout(() => {
                // Simular requisição à API do método de pagamento
                const paymentRequest = {
                    orderId,
                    method,
                    amount,
                    credential: phoneOrCard,
                    timestamp: new Date().toISOString(),
                    reference: this.generateReference()
                };
                
                // Simular webhook de confirmação
                setTimeout(() => {
                    const paymentConfirmation = {
                        ...paymentRequest,
                        status: 'completed',
                        transactionId: Utils.generateId(),
                        confirmedAt: new Date().toISOString()
                    };
                    
                    this.processPaymentConfirmation(paymentConfirmation);
                    resolve(paymentConfirmation);
                }, 3000);
                
            }, 1000);
        });
    },
    
    generateReference() {
        return 'MZC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
    },
    
    processPaymentConfirmation(confirmation) {
        console.log('Payment confirmed:', confirmation);
        
        // Atualizar status do pedido
        const order = this.getOrder(confirmation.orderId);
        if (order) {
            order.status = 'paid';
            order.payment = confirmation;
            order.paidAt = confirmation.confirmedAt;
            
            // Calcular e aplicar comissão
            const commission = order.total * MozCommerce.config.commissionRate;
            order.commission = commission;
            order.sellerAmount = order.total - commission;
            
            this.saveOrder(order);
            
            // Notificar vendedor (implementar integração WhatsApp Business API)
            this.notifySeller(order);
            
            Utils.showNotification('Pagamento confirmado com sucesso!', 'success');
        }
    },
    
    getOrder(orderId) {
        // Simular busca de pedido
        const orders = JSON.parse(localStorage.getItem('mozcommerce_orders') || '[]');
        return orders.find(o => o.id === orderId);
    },
    
    saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem('mozcommerce_orders') || '[]');
        const index = orders.findIndex(o => o.id === order.id);
        
        if (index >= 0) {
            orders[index] = order;
        } else {
            orders.push(order);
        }
        
        localStorage.setItem('mozcommerce_orders', JSON.stringify(orders));
    },
    
    notifySeller(order) {
        console.log('Notifying seller about new order:', order.id);
        // Implementar notificação via WhatsApp Business API
    },
    
    releasePaymentToSeller(orderId) {
        const order = this.getOrder(orderId);
        
        if (order && order.status === 'paid' && order.deliveryConfirmed) {
            order.status = 'completed';
            order.paymentReleasedAt = new Date().toISOString();
            this.saveOrder(order);
            
            console.log(`Payment of ${Utils.formatPrice(order.sellerAmount)} released to seller`);
            Utils.showNotification('Pagamento liberado ao vendedor!', 'success');
        }
    }
};

// ============================================
// Order Management
// ============================================

const Orders = {
    create(cartItems, shippingInfo, paymentMethod) {
        const order = {
            id: Utils.generateId(),
            items: cartItems,
            shipping: shippingInfo,
            paymentMethod,
            subtotal: Cart.getTotal(),
            commission: Cart.getTotal() * MozCommerce.config.commissionRate,
            total: Cart.getTotal(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            buyer: MozCommerce.state.user,
            tracking: null
        };
        
        Payment.saveOrder(order);
        return order;
    },
    
    updateStatus(orderId, newStatus) {
        const order = Payment.getOrder(orderId);
        if (order) {
            order.status = newStatus;
            order.updatedAt = new Date().toISOString();
            Payment.saveOrder(order);
        }
    },
    
    confirmDelivery(orderId) {
        const order = Payment.getOrder(orderId);
        if (order) {
            order.deliveryConfirmed = true;
            order.deliveredAt = new Date().toISOString();
            Payment.saveOrder(order);
            
            // Liberar pagamento ao vendedor
            Payment.releasePaymentToSeller(orderId);
        }
    }
};

// ============================================
// Seller Dashboard
// ============================================

const SellerDashboard = {
    init() {
        if (!MozCommerce.state.user || MozCommerce.state.user.type !== 'seller') {
            return;
        }
        
        this.loadSellerData();
        this.renderDashboard();
    },
    
    loadSellerData() {
        // Carregar dados do vendedor
        console.log('Loading seller data...');
    },
    
    renderDashboard() {
        // Renderizar dashboard
        console.log('Rendering seller dashboard...');
    },
    
    addProduct(productData) {
        const product = {
            id: Utils.generateId(),
            ...productData,
            seller: {
                id: MozCommerce.state.user.id,
                name: MozCommerce.state.user.name,
                phone: MozCommerce.state.user.phone,
                rating: MozCommerce.state.user.rating || 0
            },
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        
        const products = JSON.parse(localStorage.getItem('seller_products') || '[]');
        products.push(product);
        localStorage.setItem('seller_products', JSON.stringify(products));
        
        Utils.showNotification('Produto adicionado com sucesso!', 'success');
        return product;
    },
    
    updateProduct(productId, updates) {
        const products = JSON.parse(localStorage.getItem('seller_products') || '[]');
        const index = products.findIndex(p => p.id === productId);
        
        if (index >= 0) {
            products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('seller_products', JSON.stringify(products));
            Utils.showNotification('Produto atualizado!', 'success');
        }
    },
    
    deleteProduct(productId) {
        const products = JSON.parse(localStorage.getItem('seller_products') || '[]');
        const filtered = products.filter(p => p.id !== productId);
        localStorage.setItem('seller_products', JSON.stringify(filtered));
        Utils.showNotification('Produto removido!', 'info');
    }
};

// ============================================
// WhatsApp Integration
// ============================================

const WhatsAppIntegration = {
    sendMessage(phone, message) {
        const formattedPhone = Utils.formatPhone(phone);
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
        
        window.open(url, '_blank');
    },
    
    notifyOrderPlaced(order) {
        const message = `🎉 Novo pedido #${order.id}!\n\nTotal: ${Utils.formatPrice(order.total)}\nItens: ${order.items.length}\n\nAcesse o painel do vendedor para mais detalhes.`;
        
        order.items.forEach(item => {
            this.sendMessage(item.seller.phone, message);
        });
    },
    
    notifyPaymentConfirmed(order) {
        const message = `✅ Pagamento confirmado!\n\nPedido #${order.id}\nValor: ${Utils.formatPrice(order.total)}\n\nPrepare os produtos para envio.`;
        
        order.items.forEach(item => {
            this.sendMessage(item.seller.phone, message);
        });
    },
    
    notifyDeliveryUpdate(order, trackingInfo) {
        const message = `📦 Atualização de entrega\n\nPedido #${order.id}\nStatus: ${trackingInfo.status}\n\nRastreamento: ${trackingInfo.code}`;
        
        this.sendMessage(order.buyer.phone, message);
    }
};

// ============================================
// Anti-Fraud System
// ============================================

const AntiFraud = {
    checkOrder(order) {
        const score = this.calculateRiskScore(order);
        
        if (score > 70) {
            return {
                approved: false,
                reason: 'Alto risco de fraude detectado',
                score
            };
        }
        
        return {
            approved: true,
            score
        };
    },
    
    calculateRiskScore(order) {
        let score = 0;
        
        // Verificar valor do pedido
        if (order.total > 50000) score += 20;
        if (order.total > 100000) score += 30;
        
        // Verificar conta nova
        const accountAge = Date.now() - new Date(order.buyer.createdAt).getTime();
        const daysOld = accountAge / (1000 * 60 * 60 * 24);
        if (daysOld < 1) score += 30;
        if (daysOld < 7) score += 15;
        
        // Verificar telefone verificado
        if (!order.buyer.verified) score += 20;
        
        return Math.min(score, 100);
    },
    
    reportSuspiciousActivity(userId, activity) {
        console.log('Suspicious activity reported:', { userId, activity });
        // Implementar sistema de denúncias
    }
};

// ============================================
// Modal Management
// ============================================

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => {
        const toModal = document.getElementById(toModalId);
        if (toModal) {
            toModal.classList.add('active');
        }
    }, 300);
}

function selectRegisterType(type) {
    const buttons = document.querySelectorAll('.type-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
    
    const sellerFields = document.querySelector('.seller-fields');
    if (sellerFields) {
        sellerFields.style.display = type === 'seller' ? 'block' : 'none';
    }
}

// ============================================
// Form Handling
// ============================================

function initializeForms() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const credentials = {
                email: formData.get('email') || loginForm.querySelector('input[type="text"]').value,
                password: formData.get('password') || loginForm.querySelector('input[type="password"]').value
            };
            
            try {
                await Auth.login(credentials);
                closeModal('loginModal');
            } catch (error) {
                Utils.showNotification(error.message, 'error');
            }
        });
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const inputs = registerForm.querySelectorAll('input');
            const userData = {
                name: inputs[0].value,
                email: inputs[1].value,
                phone: inputs[2].value,
                password: inputs[3].value,
                type: document.querySelector('.type-btn.active').textContent.toLowerCase() === 'vendedor' ? 'seller' : 'buyer'
            };
            
            if (userData.type === 'seller') {
                userData.storeName = inputs[4]?.value || '';
                userData.businessType = registerForm.querySelector('select')?.value || 'products';
            }
            
            try {
                await Auth.register(userData);
                closeModal('registerModal');
            } catch (error) {
                Utils.showNotification(error.message, 'error');
            }
        });
    }
}

// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 MozCommerce initialized');
    
    // Initialize modules
    Search.init();
    Auth.init();
    Products.init();
    Cart.init();
    
    // Initialize forms
    initializeForms();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Check for seller dashboard
    if (window.location.pathname.includes('seller')) {
        SellerDashboard.init();
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Exportar para uso global
window.MozCommerce = MozCommerce;
window.Utils = Utils;
window.Payment = Payment;
window.Orders = Orders;
window.WhatsAppIntegration = WhatsAppIntegration;
