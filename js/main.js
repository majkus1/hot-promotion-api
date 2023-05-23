let products = []; // Miejsce na przechowywanie produktów

// Pobieranie danych o produktach
fetch('https://www.mamezi.pl/praca/front/products/data.json')
    .then(response => response.json())
    .then(data => {
        products = data.list;
        displayProducts(); // Wyświetlaj produkty po załadowaniu
    });

function displayProducts() {
    const productContainer = document.getElementById('productContainer');
    const selectedNumber = document.getElementById('productNumber').value;
    const screenWidth = window.innerWidth;

    // Usuń wszystkie istniejące produkty
    productContainer.innerHTML = '';

    // Wyświetlanie produktów
    for (let i = 0; i < selectedNumber; i++) {
        const product = products[i];
        let base = product.price.gross.base_float
        let promo = product.price.gross.promo_float
        let saving = base - promo
        product.savings = saving
        let imageUrl = `https://www.mamezi.pl/praca/front/products/upload/${product.main_image}.png`;
        const productElement = document.createElement('div');
        productElement.classList.add('cart')
        let savingsHTML = screenWidth > 450 ? `oszczędzasz: <strong>${product.savings} zł</strong>` : `oszczędzasz: </br><strong>${product.savings} zł</strong>`;
        productElement.innerHTML = `
        <div class="pieces-and-saves"><div class="pieces"><img src="img/cart-plus.webp" alt="koszyk z zakupami" class="image-cartplus"><p class="pieces-text">${product.availability.name}</p></div>
        <p class="saves">${savingsHTML}</p></div>
        <img src="${imageUrl}" alt="${product.name}" class="product-image">
        <div class="prices"><p class="final-price">${product.price.gross.final_float} zł</p>
        <p class="base-price">${product.price.gross.base_float} zł</p></div>
        <a href="${product.url}" class="product-link"><h2 class="product-name">${product.name}</h2></a>
        <p class="producer-name">${product.producer.name}</p>
    
`;
        productContainer.appendChild(productElement);
    }
}
window.addEventListener('resize', displayProducts);


let totalSeconds = 4 * 24 * 60 * 60 + 11 * 60 * 60 + 16 * 60 + 12;

let countdownFunction = setInterval(function () {
    totalSeconds--;

    let days = Math.floor(totalSeconds / (60 * 60 * 24));
    let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    let seconds = totalSeconds % 60;

    document.getElementById("days").innerHTML = days + "<span class='under'>dni</span>";
    document.getElementById("hours").innerHTML = hours + "<span class='under'>godz.</span>";
    document.getElementById("minutes").innerHTML = minutes + "<span class='under'>min</span>";
    document.getElementById("seconds").innerHTML = seconds + "<span class='under'>sek.</span>";

    if (totalSeconds <= 0) {
        clearInterval(countdownFunction);
        document.getElementById("days").innerHTML = "";
        document.getElementById("hours").innerHTML = "";
        document.getElementById("minutes").innerHTML = "";
        document.getElementById("seconds").innerHTML = "Odliczanie zakończone!";
    }
}, 1000);