let lishProduct=document.getElementById("list-dish");
let total=document.getElementById("total");
let quantityProduct=document.getElementById("quantityProduct");

function formatPrice(price) {
    // Chuyển số thành chuỗi có phân cách hàng nghìn
    return price.toLocaleString('vi-VN');
}

function displayProductToBill(){
    let products=JSON.parse(localStorage.getItem("cart")) || [];
    let quantity=0;
    products.forEach(product=>{
        let productInfo=document.createElement('li');
        productInfo.classList.add('list-group-item','d-flex', 'justify-content-between', 'lh-sm');
        productInfo.innerHTML=`<div>
              <h6 class="my-0">${product.name} <span style="color:rgba(0,0,0,0.4)">x${product.quantity}</span></h6>
              <small class="text-body-secondary"></small>
            </div>
            <span class="text-body-secondary">${formatPrice(product.price)}đ</span>`
            lishProduct.appendChild(productInfo);
            quantity++;
    });
    let totalPrice=calculateTotal(products);
    total.textContent=`${formatPrice(totalPrice)}đ`;
    quantityProduct.textContent=`${quantity}`;
}

function calculateTotal(products){
    let total=0;
    products.forEach(product=>{
        total+=product.quantity*product.price;
    });
    // total=total+chooseShipMethod();
    return total;
}

document.addEventListener("DOMContentLoaded",function(){
    displayProductToBill();
})