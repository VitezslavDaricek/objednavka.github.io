// Odeslání formuláře a zobrazení ceny
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const product = document.getElementById('product').value.trim();

    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const totalPriceElement = document.getElementById("totalPrice");

    // Zde nevoláme toFixed, aby nedošlo k chybě při výpočtu
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);
    
    // Základní vstupní validace polí
    if (!name || !surname || !email || !product || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
        alert("Prosím vyplňte všechna povinná pole a zadejte platné hodnoty pro cenu a množstíví.");
        return;  // Zastaví odeslání formuláře
    }

    const totalPrice = price * quantity;
    const totalPriceWithVAT = (totalPrice * 1.21).toFixed(2);   // Předpoklad 21% DPH

    document.getElementById('summary').innerHTML = `
        <h3>Rekapitulace objednávky</h3>
        <p><strong>Jméno:</strong> ${name} ${surname}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Produkt:</strong> ${product}</p>
        <p><strong>Cena bez DPH:</strong> ${totalPrice} Kč</p>
        <p><strong>Cena s DPH:</strong> ${totalPriceWithVAT} Kč</p>
    `;

    // Přepočet na jinou měnu (použití fiktivního kurzu)
    fetch('https://tvujserver.cz/getCNBData.php')
        .then(response => response.text())
        .then(data => {
            const exchangeRate = extractExchangeRate(data, 'EUR');    // Příklad pro Euro
            if (exchangeRate) {
                const totalPriceWithVAT = parseFloat(document.getElementById('totalPrice').textContent) * 1.21;  // Získání ceny s DPH
                const priceInEUR = (totalPriceWithVAT / exchangeRate).toFixed(2);
                document.getElementById('summary').innerHTML += `
                    <p><strong>Cena v EUR:</strong> ${priceInEUR} EUR</p>
                `;
            } else {
                throw new Error('Exchange rate not found');
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('summary').innerHTML += `
                <p><strong>Přepočet ceny se nezdařil, zkuste to později.</strong></p>
            `;
        });
});

function extractExchangeRate(data, currency) {
    const lines = data.split('\n');     // Rozdělí text na jednotlivé řádky
    for (let line of lines) {
        if (line.includes(currency)) {  // Najde řádek obsahující zadanou měnu
            const parts = line.split('|');  // Rozdělí řádek podle '|'
            return parseFloat(parts[4].replace(',', '.'));  // Získá kurz a převede na číslo
        }
    }
    return null;  // Pokud kurz nenalezen
}