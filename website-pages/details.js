document.addEventListener("DOMContentLoaded", function(){
//! Load Product Data

let basePrice = parseFloat(
        document.querySelector(".price").textContent.replace("$","")
    );

    
let quantity = 1;

const productData = JSON.parse(localStorage.getItem("selectedProduct"));

if(productData){

    const title = document.querySelector(".product-title");
    const image = document.querySelector(".details-img");
    const price = document.querySelector(".price");
    const description = document.querySelector(".details-description");

    if(title) title.innerText = productData.name;
    if(image) image.src = productData.img;
    if(price) price.innerText = "$" + productData.price;
    if(description) description.innerText = productData.description;

    basePrice = parseFloat(productData.price);
}


// =====================
// Favourite Button
// =====================

const favBtn = document.querySelector(".fav-btn");

if(favBtn){

    const favIcon = favBtn.querySelector("i");

    favBtn.addEventListener("click", function(){

        favBtn.classList.toggle("active");

        if(favBtn.classList.contains("active")){
            favIcon.classList.remove("fa-regular");
            favIcon.classList.add("fa-solid");
        }else{
            favIcon.classList.remove("fa-solid");
            favIcon.classList.add("fa-regular");
        }

    });
}


// =====================
// Back Button
// =====================

const backBtn = document.querySelector(".back-btn");

if(backBtn){
    backBtn.addEventListener("click", function(){
        window.location.href = "../index.html#cards";
    });
}


// =====================
// Quantity
// =====================

const qtyNumber = document.querySelector(".qty-number");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");

function updateTotal(){
    const priceElement = document.querySelector(".price");
    let total = basePrice * quantity;
    if(priceElement) priceElement.innerText = "$" + total;
}

if(plusBtn){
    plusBtn.addEventListener("click", function(){
        quantity++;
        if(qtyNumber) qtyNumber.innerText = quantity;
        updateTotal();
    });
}

if(minusBtn){
    minusBtn.addEventListener("click", function(){
        if(quantity > 1){
            quantity--;
            if(qtyNumber) qtyNumber.innerText = quantity;
            updateTotal();
        }
    });
}


// =====================
// Weight Selection
// =====================

const weightButtons = document.querySelectorAll(".weight-btn");

weightButtons.forEach(btn => {

    btn.addEventListener("click", function(){

        weightButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

        basePrice = parseFloat(this.dataset.price);

        updateTotal();

    });

});


// =====================
// Add To Cart
// =====================

const cartBtn = document.querySelector(".cart-btn");

if(cartBtn){
    cartBtn.addEventListener("click", function(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: document.querySelector(".product-title").textContent,
        price: basePrice,
        quantity: quantity,
        img: document.querySelector(".details-img").src
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added To Cart 🛒");
});
}

});