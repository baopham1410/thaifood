let doan=[];
let list_doan=document.querySelector('.list-doan');

function getDoan(){
    fetch("json/monan.json").then(reponse=>reponse.json()).then(data=>{
        doan=data
        addDoanToHTML();
    })
};

getDoan();

const addDoanToHTML=()=>{
    if(doan.length>0){
        doan.forEach(data=>{
            let monan=document.createElement('div');
            monan.classList.add('col-lg-3','col-md-4');
            monan.innerHTML=`<div class="dish">
            <div class="img-contain"><img src="${data.image}" alt=""></div>
            <div class="detail">
              <div class="name">${data.name}</div>
              <div class="price">${data.price}đ</div>
            </div>
            <div class="add-cart-contain"><button>Thêm vào giỏ hàng <i class='bx bxs-cart-add'></i></button></div>
          </div>`;
          list_doan.appendChild(monan);
        });
    }
}

function addToCart(){
    
}