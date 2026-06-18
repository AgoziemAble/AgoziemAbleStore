/*

let productsDiv = document.querySelector(".prodocts");
let viewProductDiv = document.querySelector(".view-product");
let closeIcon = document.querySelector(".close");

const url = "https://fakestoreapi.com/products";
// const data = fetch(url);

async function fetchData() {
  try {
        // 1. Send the HTTP request
        const response = await fetch(url);
        
        // 2. Check if the HTTP status code is successful (200-299)
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // 3. Parse the incoming response body into a JavaScript object
        const products = await response.json();
        
        // 4. Log the final data to your console
        // console.log(data);
        displayProducts(products);
    } catch (error) {
        // Catch and log any network or runtime errors
        console.error('Error fetching data:', error);
    }
}

// Execute the function
fetchData();

function displayProducts(products) {
   console.log(products);

    for(i = 0; i < products.length; i++){
        const productCard = document.createElement("div");
        const productCardImageDiv = document.createElement("div");
        const imgEl = document.createElement("img");
        const productDetailsDiv =document.createElement("div");
        const productTitleEl = document.createElement("p");
        const productFooterDiv = document.createElement("div");
        const priceEl = document.createElement("p");
        const buttonEl = document.createElement("button");

        productCard.classList.add("product-card");
        productCardImageDiv.classList.add("image-div");
        productDetailsDiv.classList.add("product-details");
        productTitleEl.classList.add("title")
        productFooterDiv.classList.add("product-footer");
        priceEl.classList.add("price");
        buttonEl.classList.add("add-to-cart");

        priceEl.textContent = `$${products[i].price}`;
        productTitleEl.textContent = `${products[i].title}`;
        buttonEl.textContent = `Add to Cart`;
        imgEl.src = `${products[i].image}`;

        productCardImageDiv.appendChild(imgEl);

        productDetailsDiv.appendChild(productTitleEl);
        productDetailsDiv.appendChild(productFooterDiv);
        productFooterDiv.appendChild(priceEl);
        productFooterDiv.appendChild(buttonEl);

        productCard.appendChild(productCardImageDiv);
        productCard.appendChild(productDetailsDiv);

        productsDiv.appendChild(productCard);
    }
}

// function viewProduct(e){
//     if (e.target.tagName === "IMG") {
//         // console.log("clicked");
//         console.log(e.target);
//     }
// }

productsDiv.addEventListener("click", (e) => {
   viewProduct(e);
})

closeIcon.addEventListener("click", () => {
    closeProduct();
})

function viewProduct(e, ) {
    const productCard = e.target.closest(".product-card");

    if (!productCard) return;

    if (e.target.tagName === "IMG") {
        console.log("Image clicked inside product:", productCard);
        // productsDiv.classList.add("active");
        // viewProductDiv.classList.remove("active");

        const  image = productCard.querySelector("img");
        const  title = productCard.querySelector(".title").textContent;
        const  price = productCard.querySelector(".price").textContent;
        const  button = productCard.querySelector(".add-to-cart");

        const productImageEl = viewProductDiv.querySelector(".produc-image");
        const productTitleEl = viewProductDiv.querySelector(".title");
        const productDescEl = viewProductDiv.querySelector(".description");
        const productPriceEl = viewProductDiv.querySelector(".price");


        productImageEl.src = image.src;
        productTitleEl.textContent = title;
        productDescEl.textContent = `SOmething Like description`;
        productPriceEl.textContent = `${price}`;


        console.log(image.src);
        console.log(title);
        console.log(price);
        console.log(button.textContent);
        console.log(productTitleEl.textContent);

        productsDiv.classList.add("active");
        viewProductDiv.classList.remove("active");


    }
}

function closeProduct() {
    productsDiv.classList.remove("active");
    viewProductDiv.classList.add("active");
}

*/


const productsDiv = document.querySelector(".prodocts");
const viewProductDiv = document.querySelector(".view-product");
const closeIcon = document.querySelector(".close");

const url = "https://fakestoreapi.com/products";

let productsData = [];

// Fetch Products
async function fetchData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        productsData = products;

        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchData();


// Display Products
function displayProducts(products) {

    productsDiv.innerHTML = "";

    products.forEach(product => {

        const productCard = document.createElement("div");
        const productCardImageDiv = document.createElement("div");
        const imgEl = document.createElement("img");
        const productDetailsDiv = document.createElement("div");
        const productTitleEl = document.createElement("p");
        const productFooterDiv = document.createElement("div");
        const priceEl = document.createElement("p");
        const buttonEl = document.createElement("button");

        productCard.classList.add("product-card");
        productCardImageDiv.classList.add("image-div");
        productDetailsDiv.classList.add("product-details");
        productTitleEl.classList.add("title");
        productFooterDiv.classList.add("product-footer");
        priceEl.classList.add("price");
        buttonEl.classList.add("add-to-cart");

        // Save product id
        productCard.dataset.id = product.id;

        imgEl.src = product.image;
        productTitleEl.textContent = product.title;
        priceEl.textContent = `$${product.price}`;
        buttonEl.textContent = "Add to Cart";

        productCardImageDiv.appendChild(imgEl);

        productFooterDiv.appendChild(priceEl);
        productFooterDiv.appendChild(buttonEl);

        productDetailsDiv.appendChild(productTitleEl);
        productDetailsDiv.appendChild(productFooterDiv);

        productCard.appendChild(productCardImageDiv);
        productCard.appendChild(productDetailsDiv);

        productsDiv.appendChild(productCard);
    });
}


// Open Product Modal
productsDiv.addEventListener("click", viewProduct);

function viewProduct(e) {

    if (e.target.tagName !== "IMG") return;

    const productCard = e.target.closest(".product-card");

    if (!productCard) return;

    const productId = Number(productCard.dataset.id);

    const product = productsData.find(
        item => item.id === productId
    );

    if (!product) return;

    const productImageEl = viewProductDiv.querySelector(".product-image");

    const productTitleEl = viewProductDiv.querySelector(".title");

    const productDescEl = viewProductDiv.querySelector(".description");

    const productPriceEl = viewProductDiv.querySelector(".price");

    productImageEl.src = product.image;
    productTitleEl.textContent = product.title;
    productDescEl.textContent = product.description;
    productPriceEl.textContent = `$${product.price}`;

    productsDiv.classList.add("active");
    viewProductDiv.classList.remove("active");
    document.body.classList.add("modal-open");
}


// Close Product Modal
closeIcon.addEventListener("click", closeProduct);

function closeProduct() {
    productsDiv.classList.remove("active");
    viewProductDiv.classList.add("active");

    document.body.classList.remove("modal-open");
}