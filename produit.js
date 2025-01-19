document.getElementById('add-to-cart-btn').addEventListener('click', function () {
    const productId = this.dataset.id;
    const productName = this.dataset.name;
    const productPrice = parseFloat(this.dataset.price);
    const productImage = document.querySelector('.product-image img').src;

    console.log('Données récupérées :', {
        productId,
        productName,
        productPrice,
        productImage
    });

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
        if (!existingProduct.image) {
            existingProduct.image = productImage;
        }
        console.log('Produit existant mis à jour :', existingProduct);
    } else {
        const newProduct = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage 
        };
        console.log('Nouveau produit ajouté :', newProduct);
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Contenu du panier après ajout :', JSON.parse(localStorage.getItem('cart')));

    alert(`${productName} a été ajouté au panier !`);
    triggerCartUpdate();
});


function triggerCartUpdate() {
document.dispatchEvent(new Event('cartUpdated'));
}


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
