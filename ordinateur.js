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