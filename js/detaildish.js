let listDish=[];
let cartBtn=document.querySelector('.cart-add');
let increaseBtn=document.querySelector('.increase');
let decreaseBtn=document.querySelector('.decrease');

function getDoan(){
    return fetch('json/monan.json').then(reponse=>reponse.json()).then(data=>{
        listDish=data
    })
}

function showDetailProduct(){
    let detail=JSON.parse(localStorage.getItem('detail')) || [];
    let name=detail.name;
    let dishes=listDish;
    if(dishes){
        const dish=dishes.find(p=>p.name===name);
        if(dish){
            const dishInfo=document.querySelector('.product-info');
            dishInfo.querySelector('.name').textContent=dish.name;
            dishInfo.querySelector('.des').textContent=dish.des;
            dishInfo.querySelector('.price').textContent=dish.price+'đ';
            const image_contain=document.querySelector('.image-contain img');
            image_contain.setAttribute('src', dish.image);
            cartBtn.addEventListener('click', addToCart);
            increaseBtn.addEventListener('click', increaseQuantity);
            decreaseBtn.addEventListener('click', decreaseQuantity);
        }
    }
}

function addToCart(event){
    event.stopPropagation();
    var product=event.target.closest('.product-detail');
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    let quantity=parseInt(product.querySelector('.number').innerText);
    if(product){
        var image=product.querySelector('img').getAttribute('src');
        var name=product.querySelector('.name').innerText;
        var price = parseFloat(product.querySelector('.price').innerText.match(/\d+(\.\d+)?/)[0]);

        const existProduct=cart.findIndex(product=> product.name===name);
        if(existProduct >=0){
            cart[existProduct].quantity+=quantity;
            cart[existProduct].subtotal=cart[existProduct].price*cart[existProduct].quantity;
        }
        else{
            const newProduct={
                image,
                name,
                price,
                quantity: quantity,
                subtotal:price
            };
            cart.push(newProduct);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    totalInCart();
}

function decreaseQuantity(event){
    var product=event.target.closest('.product-detail');
    let number_text=product.querySelector('.number');
    let number=parseInt(product.querySelector('.number').innerText);
    if(number>1){
        number--;
        number_text.textContent=number;
    }
    else{
        alert('Số lượng không hợp lệ! Số lượng phải lớn hơn 0');
    }
}

function increaseQuantity(event){
    var product=event.target.closest('.product-detail');
    let number_text=product.querySelector('.number')
    let number=parseInt(product.querySelector('.number').innerText);
    number++;
    number_text.textContent=number;
}

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([getDoan()]).then(showDetailProduct)});
