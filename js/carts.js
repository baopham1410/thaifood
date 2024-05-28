let listcart= document.querySelector('.list-cart');

function formatPrice(price) {
    // Chuyển số thành chuỗi có phân cách hàng nghìn
    return price.toLocaleString('vi-VN');
}

function displayProductToCart(){
    let cart=JSON.parse(localStorage.getItem('cart')) || [];

    if(cart.length === 0){
        let text=document.createElement('div');
        text.classList.add('d-flex','justify-conentt-center','text-secondary','h3');
        text.innerHTML='Giỏ hàng của bạn rỗng!';
        listcart.appendChild(text);
        let cart_product_title=listcart.querySelector('.cart-product-title');
        cart_product_title.style.display='none';
    }
    else{
        cart.forEach(product=>{
            let cart_product=document.createElement('div');
            cart_product.classList.add('cart-product');
            cart_product.innerHTML=`<div class="product">
            <img src="${product.image}" alt="">
            <p>${product.name}</p>
        </div>
        <div class="price-contain">
            <div class="price-text">Giá</div>
            <div class="price">${formatPrice(product.price)}đ</div>
        </div>
        <div class="quantity-contain">
            <div class="quantity-text">Số lượng</div>
            <div class="quantity">
                <div class="decrease"><i class="bx bx-minus"></i></div>
                <div class="number">${product.quantity}</div>
                <div class="increase"><i class="bx bx-plus "></i></div>
            </div>
        </div>
        <div class="subtotal-contain">
            <div class="subtotal-text">Tổng</div>
            <div class="subtotal">${formatPrice(product.subtotal)}đ</div>
        </div>
        <div class="remove-cart"><i class='bx bx-x' id="remove-cart"></i></div>`;
        listcart.appendChild(cart_product);
        cart_product.querySelector('.decrease').addEventListener('click', decreaseQuantity);
        cart_product.querySelector('.increase').addEventListener('click', increaseQuantity);
        cart_product.querySelector('#remove-cart').addEventListener('click', removeCartProduct);
        });
    }
}

function decreaseQuantity(event){
    var cart_product=event.target.closest('.cart-product');
    const name=cart_product.querySelector('.product p').innerText;
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product=>{
        if(product.name===name){
            if(product.quantity>1){
                product.quantity--;
                product.subtotal = product.price * product.quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                cart_product.querySelector('.number').innerText=product.quantity;
                cart_product.querySelector('.subtotal').innerText = `$${formatPrice(product.subtotal)}`;
            }else{
                removeCartProduct(event);
            }
        }
    })
    displayCartCollateral();
    totalInCart();
}

function increaseQuantity(event){
    var cart_product=event.target.closest('.cart-product');
    const name=cart_product.querySelector('.product p').innerText;
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product=>{
        if(product.name===name){
            product.quantity++;
            product.subtotal = product.price * product.quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            cart_product.querySelector('.number').innerText=product.quantity;
            cart_product.querySelector('.subtotal').innerText = `${formatPrice(product.subtotal)}đ`;
        }
    })
    displayCartCollateral();
    totalInCart();
}

function removeCartProduct(event){
    let cart_product = event.target.closest('.cart-product');
    const name = cart_product.querySelector('.product p').innerText;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    cart_product.remove();
    if (cart.length === 0) {
        let text=document.createElement('div');
        text.classList.add('d-flex','justify-conentt-center','text-secondary','h3');
        text.innerHTML='Giỏ hàng của bạn rỗng!';
        listcart.appendChild(text);
        let cart_product_title=listcart.querySelector('.cart-product-title');
        cart_product_title.style.display='none';
    }
    displayCartCollateral();
    totalInCart();
}

function chooseShipMethod() {
    let selectedShipping = document.querySelector('input[name="ship"]:checked');
    if(selectedShipping){
        return parseInt(selectedShipping.value);
    }
    else{
        return 0;
    }
}

function calculateTotal(){
    let total=0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product=>{
        total+=product.quantity*product.price;
    });
    total=total+chooseShipMethod();
    return total;
}

function displayCartCollateral(){
    let totalprice=document.querySelector('.totalprice');
    let total=calculateTotal();
    totalprice.textContent=`${formatPrice(total)}đ`;
}

const totalPriceElement = document.querySelector('.totalprice');
const shippingOptions = document.querySelectorAll('input[name="ship"]');


document.addEventListener('DOMContentLoaded', function(){
    displayProductToCart();
    displayCartCollateral();
    shippingOptions.forEach(option=>{
        option.addEventListener('change', displayCartCollateral);
    })
});