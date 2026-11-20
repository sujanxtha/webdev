

// Select HTML elements
const searchBtn = document.getElementById("searchBtn");
const categorySelect = document.getElementById("category");
const productList = document.getElementById("productList");
const message = document.getElementById("message");

// Function to fetch products from the live API
async function fetchProducts() {
    const category = categorySelect.value;
    let apiURL = "https://fakestoreapi.com/products";

    if (category !== "all") {
        apiURL += "/category/" + encodeURIComponent(category);
    }

    message.textContent = "Loading products...";
    productList.innerHTML = "";

    try {
        // AJAX request using native JavaScript
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        displayProducts(products);

    } catch (error) {
        message.textContent = "Unable to load products. Please try again.";
        console.error("API Error:", error);
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    productList.innerHTML = "";

    if (products.length === 0) {
        message.textContent = "No products found.";
        return;
    }

    message.textContent = products.length + " products found.";

    // Create a card for each product
    products.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;

        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = "$" + product.price.toFixed(2);

     
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);

        
        productList.appendChild(card);
    });
}

searchBtn.addEventListener("click", fetchProducts);
