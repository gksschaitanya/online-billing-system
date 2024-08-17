// const billingList = document.getElementById('billing-list');
// const totalPriceElement = document.getElementById('total-price');
// let totalPrice = 0; // Initialize total price

// document.getElementById('billing-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const itemName = document.getElementById('item-name').value;
//     const itemPrice = parseFloat(document.getElementById('item-price').value);

//     // Create a new list item
//     const newItem = document.createElement('div');
//     newItem.classList.add('list-group-item');
//     newItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
//     billingList.appendChild(newItem);

//     // Update total price
//     totalPrice += itemPrice;
//     totalPriceElement.textContent = totalPrice.toFixed(2);

//     // Clear the input fields
//     document.getElementById('item-name').value = '';
//     document.getElementById('item-price').value = '';
// });

// // Handle payment button click
// document.getElementById('pay-button').addEventListener('click', function() {
//     const gateway = document.getElementById('payment-gateway').value;
//     alert(`Proceeding to payment via ${gateway}. Total: $${totalPrice.toFixed(2)}`);
// });

const billingList = document.getElementById('billing-list');
const totalPriceElement = document.getElementById('total-price');
let totalPrice = 0; // Initialize total price

let products = []; // To store product details

// Fetch product details from the server when the page loads
fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

document.getElementById('billing-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemquantity = parseFloat(document.getElementById('item-quantity').value);
    // Find the product with the matching name
    const product = products.find(p => p.name === itemName);

    if (product) {
        const itemPrice = parseFloat(product.price);

        // Create a new list item
        const newItem = document.createElement('div');
        newItem.classList.add('list-group-item');
        const price = itemPrice.toFixed(2)*itemquantity;
        // newItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
        newItem.textContent = `${itemName} - $${price}`;
        billingList.appendChild(newItem);

        // Update total price
        totalPrice += price;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Clear the input fields
        document.getElementById('item-name').value = '';
    } else {
        alert('Product not found');
    }
});

// Handle payment button click
document.getElementById('pay-button').addEventListener('click', function() {
    const gateway = document.getElementById('payment-gateway').value;
    alert(`Proceeding to payment via ${gateway}. Total: $${totalPrice.toFixed(2)}`);
});
