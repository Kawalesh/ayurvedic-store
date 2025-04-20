// Product Data
const products = [
    {
        id: 1,
        name: "DIBOVIM POWDER",
        description: "Control blood sugar & its complications",
        price: 499,
        image: "images/dibovim-powder.jpg"
    },
    {
        id: 2,
        name: "ORTHOVIM OIL",
        description: "Useful in all type of pain (external use only)",
        price: 299,
        image: "images/orthovim-oil.jpg"
    },
    {
        id: 3,
        name: "VIMARTHO TABLET",
        description: "Useful in joint pain, back pain, Lumber pain",
        price: 399,
        image: "images/vimartho-tablet.jpg"
    },
    {
        id: 4,
        name: "VIMALHIRA GARCINIA CAPSULE",
        description: "Useful in weight loss",
        price: 599,
        image: "images/vimalhira-capsule.jpg"
    },
    {
        id: 5,
        name: "ACE NEEL TABLET",
        description: "Useful in acidity",
        price: 199,
        image: "images/ace-neel-tablet.jpg"
    },
    {
        id: 6,
        name: "AVIPATTIKAR TABLET",
        description: "Useful in acidity",
        price: 249,
        image: "images/avipattikar-tablet.jpg"
    },
    {
        id: 7,
        name: "GANDHARV HARITAKI TABLET",
        description: "Useful in constipation",
        price: 299,
        image: "images/gandharv-tablet.jpg"
    },
    {
        id: 8,
        name: "HEMOVIM TABLET",
        description: "Useful in piles",
        price: 449,
        image: "images/hemovim-tablet.jpg"
    },
    {
        id: 9,
        name: "DIBOVIM TABLET",
        description: "Useful in madhumeh for control blood sugar & its complications",
        price: 549,
        image: "images/dibovim-tablet.jpg"
    },
    {
        id: 10,
        name: "SHATAVARI TABLET",
        description: "Useful as Tonic",
        price: 349,
        image: "images/shatavari-tablet.jpg"
    },
    {
        id: 11,
        name: "ASHWAGANDHA TABLET",
        description: "Useful as Tonic",
        price: 299,
        image: "images/ashwagandha-tablet.jpg"
    },
    {
        id: 12,
        name: "GUDUCHI GHANVATI",
        description: "Useful in fever & Tonic",
        price: 279,
        image: "images/guduchi-tablet.jpg"
    }
];

// Cart Management
let cart = [];

// Display Products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6">
                <div class="product-card">
                    <img src="${product.image}" class="product-image w-100" alt="${product.name}">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">₹${product.price}</p>
                        <button class="btn btn-custom" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartDisplay();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-4">
                        <h5>${item.name}</h5>
                        <p class="mb-0">${item.description}</p>
                    </div>
                    <div class="col-2">
                        ₹${item.price}
                    </div>
                    <div class="col-2">
                        <input type="number" class="form-control" value="${item.quantity}"
                            onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="col-2">
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total;
}

// Update Quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity) || 0;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.remove('d-none');
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (!isLoggedIn()) {
        alert('Please login to proceed with checkout');
        window.location.href = 'login.html?redirect=checkout';
        return;
    }
    
    // Proceed with checkout
    alert('Thank you for your purchase! Your order has been placed.');
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

// Admin Functions
function isAdmin() {
    // In a real application, this would check user credentials
    return localStorage.getItem('isAdmin') === 'true';
}

function toggleAdminView() {
    if (isAdmin()) {
        document.getElementById('admin').classList.remove('d-none');
    }
}

// Update Login State
function updateLoginState() {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    
    if (isLoggedIn()) {
        loginBtn.classList.add('d-none');
        userInfo.classList.remove('d-none');
        usernameDisplay.textContent = localStorage.getItem('username');
    } else {
        loginBtn.classList.remove('d-none');
        userInfo.classList.add('d-none');
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    updateLoginState();
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    updateLoginState();
    toggleAdminView();

    // Add event listeners for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}); 