document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#cart-close");
    const cartContent = document.querySelector(".cart-content");
    const totalPrice = document.querySelector(".total-price");
    const buyNowBtn = document.querySelector(".btn-buy");
    let total = 0;

    // Open cart when clicking on cart icon
    cartIcon.addEventListener('click', () => {
        cart.classList.add('active');
    });

    // Close cart when clicking on close icon
    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });

    // Add item to cart
    function addItemToCart(productTitle, productPrice, productImage) {
        const cartItems = cartContent.querySelectorAll('.cart-box');
        let itemAlreadyInCart = false;

        cartItems.forEach(cartItem => {
            const itemTitle = cartItem.querySelector('.cart-product-title').textContent;
            if (itemTitle === productTitle) {
                const quantityElement = cartItem.querySelector('.cart-quantity');
                quantityElement.value = parseInt(quantityElement.value) + 1;
                itemAlreadyInCart = true;
            }
        });

        if (!itemAlreadyInCart) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-box');
            cartItem.innerHTML = `
                <img src="${productImage}" alt="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${productTitle}</div>
                    <div class="cart-price">${productPrice}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class='bx bxs-trash cart-remove'></i>
            `;
            cartContent.appendChild(cartItem);
        }

        updateTotal();
    }

    // Remove item from cart
    function removeItemFromCart(cartItem) {
        const priceElement = cartItem.querySelector('.cart-price');
        const price = parseFloat(priceElement.textContent.replace('R', ''));
        const quantity = parseInt(cartItem.querySelector('.cart-quantity').value);
        total -= price * quantity;
        totalPrice.textContent = `R${total.toFixed(2)}`;
        cartItem.remove();
        updateTotal();
    }

    // Update total price
    function updateTotal() {
        total = 0;
        const cartItems = cartContent.querySelectorAll('.cart-box');
        cartItems.forEach(cartItem => {
            const price = parseFloat(cartItem.querySelector('.cart-price').textContent.replace('R', ''));
            const quantity = parseInt(cartItem.querySelector('.cart-quantity').value);
            total += price * quantity;
        });
        totalPrice.textContent = `R${total.toFixed(2)}`;
    }

    // Event delegation for dynamically added remove buttons and quantity change
    cartContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-remove')) {
            removeItemFromCart(e.target.parentElement);
        }
    });

    cartContent.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            updateTotal();
        }
    });

    const addToCartButtons = document.querySelectorAll('.add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const title = product.querySelector('.product-title').textContent;
            const price = product.querySelector('.product-price').textContent;
            const image = product.querySelector('img').src;
            addItemToCart(title, price, image);
        });
    });

    // Buy now button functionality
    buyNowBtn.addEventListener('click', () => {
        // Implement your buy now functionality here
        alert('Buying now...');
    });
});
document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.shop-content .product');

    products.forEach(function(product) {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.shop-content .product');

    products.forEach(function(product) {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('home-btn').addEventListener('click', function() {
    const products = document.querySelectorAll('.shop-content .product');

    products.forEach(function(product) {
        product.style.display = 'block';
    });

    document.getElementById('search-input').value = '';
});

