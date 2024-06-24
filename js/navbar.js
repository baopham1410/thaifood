let menu_bar= document.querySelector('#menubar');
let navbar=document.querySelector('.nav-bar');

menu_bar.onclick=()=>{
    navbar.classList.toggle("active");
    if(navbar.classList.contains("active")){
        menu_bar.classList.remove("bx-menu");
        menu_bar.classList.add("bx-x");
    }
    else{
        menu_bar.classList.remove("bx-x");
        menu_bar.classList.add("bx-menu");
    }
}
window.onscroll=()=>{
    navbar.classList.remove("active");
    menu_bar.classList.remove("bx-x");
    menu_bar.classList.add("bx-menu");
}
const itemsliderbar = document.querySelectorAll(".cartegory-left-li")
itemsliderbar.forEach(function(Menu, index){
Menu.addEventListener("click", function(){
Menu. classList.toggle("block")
})
})



// const header = document.querySelector(".header")
// window.addEventListener("scroll", function(){
// x = window.pageYOffset
// if(x>0){
// header.classList.add("sticky")
// }
// else {
// header.classList.remove("sticky")
// }
// })