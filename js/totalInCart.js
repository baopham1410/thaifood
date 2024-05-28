let quantityInCart=document.querySelector('.quantity-cart');
function totalInCart(){
    let quantity=0;
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(dish=>{
        quantity+=dish.quantity;
    });
    quantityInCart.textContent=quantity;
}

window.onload = totalInCart;
