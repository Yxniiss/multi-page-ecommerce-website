var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) { myIndex = 1; }  
  x[myIndex - 1].style.display = "block";  
  setTimeout(carousel, 2000);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
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