// Dynamický výpočet ceny
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const totalPriceElement = document.getElementById("totalPrice");

function calculateTotalPrice() {
    const price = parseFloat(priceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 1;

    // Ošetření neplatných hodnot - pokud je hodnota prázdná nebo neplatná, nastaví se výchozí hodnota 0
    if (isNaN(price) || price <= 1) {
        totalPriceElement.textContent = '0.00';
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        totalPriceElement.textContent = '0.00';
        return;
    }
    
    const totalPrice = price * quantity;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

priceInput.addEventListener('input', calculateTotalPrice);
quantityInput.addEventListener('input', calculateTotalPrice);