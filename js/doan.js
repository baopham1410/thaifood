let doan=[];
let list_doan=document.querySelector('.list-doan');

function getDoan(){
    return Promise.resolve(monan);
};

const addDoanToHTML=()=>{
    if(doan.length>0){
        doan.forEach(data=>{
            let monan=document.createElement('div');
            monan.classList.add('col-lg-3','col-md-4','col-sm-6');
            monan.innerHTML=`<div class="dish">
            <div class="img-contain"><a href="detaildish.html"><img src="${data.image}" alt=""></a></div>
            <div class="detail">
              <div class="name"><a href="detaildish.html">${data.name}</a></div>
              <div class="price">${data.price}đ</div>
            </div>
            <div class="add-cart-contain"><button id="add-cart">Thêm vào giỏ hàng <i class='bx bxs-cart-add'></i></button></div>
          </div>`;
          list_doan.appendChild(monan);
          monan.querySelector('#add-cart').addEventListener('click', addToCart);
          monan.querySelector('img').addEventListener('click', seenDetailProduct);
          monan.querySelector('.name').addEventListener('click', seenDetailProduct);
        });
    }
}

function addToCart(event){
    event.stopPropagation();
    var dish=event.target.closest('.dish');
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    if(dish){
        var image=dish.querySelector('img').getAttribute('src');
        var name=dish.querySelector('.name').innerText;
        var price = parseFloat(dish.querySelector('.price').innerText.replace(/[^0-9]/,''));

        const existDish=cart.findIndex(dish=> dish.name===name);
        if(existDish >=0){
            cart[existDish].quantity+=1;
            cart[existDish].subtotal=cart[existDish].price*cart[existDish].quantity;
        }
        else{
            const newDish={
                image,
                name,
                price,
                quantity:1,
                subtotal:price
            };
            cart.push(newDish);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    totalInCart();
}

function seenDetailProduct(event){
    event.stopPropagation();
    var dish=event.target.closest('.dish');

    if(dish){
        var name=dish.querySelector('.name').innerText;
        var detail={
            name:name
        };
    }
    localStorage.setItem('detail', JSON.stringify(detail));
}

async function getDoanAndRender() {
    try {
        const data = await getDoan();
        doan = data;
        addDoanToHTML(); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getDoanAndRender();
});
