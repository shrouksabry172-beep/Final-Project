// ! Payment Selection
const paymentOptions = document.querySelectorAll(".payment-option");

paymentOptions.forEach(option => {
    option.addEventListener("click", () => {
        paymentOptions.forEach(opt => {
            opt.classList.remove("active");
            opt.querySelector(".radio").classList.remove("active");
        });

        option.classList.add("active");
        option.querySelector(".radio").classList.add("active");
    });
});


// ! Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItemsContainer = document.getElementById("order-items");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const totalElement = document.getElementById("total");

function displayCart(){

    orderItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        orderItemsContainer.innerHTML += `
            <div class="order-item">
                <img src="${item.img}" width="60">
                <div class="order-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="order-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `;
    });

    updateSummary(subtotal);
}

function updateSummary(subtotal){

    const delivery = 5.50;
    const tax = subtotal * 0.05;
    const total = subtotal + tax + delivery;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}


// ! Place Order
document.querySelector(".place-order").addEventListener("click", () => {

    if(cart.length === 0){
        alert("Your Cart Is Empty!");
        return;
    }

    alert("Order Placed Successfully 🎉");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
});

displayCart();