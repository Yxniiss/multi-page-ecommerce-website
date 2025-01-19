function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert('Produit ajouté au panier avec succès !');
  }
  
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
  
    cartItemsContainer.innerHTML = '';
  
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        totalPriceElement.textContent = '0€';
        return;
    }
  
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
  
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">Prix : ${item.price.toFixed(2)}€</p>
                <p>Quantité : ${item.quantity}</p>
            </div>
            <button class="remove-item-btn" data-id="${item.id}">Supprimer</button>
        `;
  
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });
  
    
  
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}€`;
  
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
  }
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    cart = cart.filter(item => item.id !== productId);
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    loadCart();
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
  
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
  
    document.addEventListener('cartUpdated', updateCartCount);
  });
  
  function triggerCartUpdate() {
    document.dispatchEvent(new Event('cartUpdated')); 
  }

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        const product = cart[productIndex];

        if (product.quantity === 1) {
            if (confirm(`Vous avez un seul exemplaire de "${product.name}". Voulez-vous le supprimer ?`)) {
                cart.splice(productIndex, 1); 
            }
        } else {
            const quantityToRemove = parseInt(prompt(`Combien d'articles de "${product.name}" souhaitez-vous supprimer ? (Max: ${product.quantity})`, "1"), 10);

            if (!isNaN(quantityToRemove) && quantityToRemove > 0 && quantityToRemove <= product.quantity) {
                product.quantity -= quantityToRemove;

                if (product.quantity === 0) {
                    cart.splice(productIndex, 1);
                }
            } else {
                alert("Quantité invalide. Aucune modification n'a été apportée.");
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        loadCart();
        triggerCartUpdate(); 
    } else {
        alert("Produit introuvable dans le panier.");
    }
}

  
  
  