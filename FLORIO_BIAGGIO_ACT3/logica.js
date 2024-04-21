document.addEventListener("DOMContentLoaded", function () {
    let products;
    let uniqueCategories = [];
    let uniqueBrands = [];

    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            products = data.products;
            uniqueCategories = [...new Set(products.map(product => product.category))];
            uniqueBrands = [...new Set(products.map(product => product.brand))];
            renderProducts(products); 
            renderFilterOptions(uniqueCategories, uniqueBrands);
        })
        .catch(error => console.error("Error fetching data:", error));

    const cartItems = []; 

    function addToCart(product) {
        cartItems.push(product); 
        renderCart(); 
    }

    function deleteLastItem() {
        if (cartItems.length > 0) {
            cartItems.pop(); 
            renderCart(); 
        }
    }

    function renderCart() {
        const cartItemsElement = document.getElementById("cart-items");
        cartItemsElement.innerHTML = ""; 

        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.title;
            li.classList.add("cart-item");
            cartItemsElement.appendChild(li);
        });

        const cartTotalElement = document.getElementById("cart-total");
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", deleteLastItem);

    document.getElementById('apply-filter-btn').addEventListener('click', function() {
        const minPrice = parseFloat(document.getElementById('min-price').value);
        const selectedCategory = document.getElementById('category-select').value;
        const selectedBrand = document.getElementById('brand-select').value;

        const productosFiltrados = products.filter(product => {
            const priceCondition = parseFloat(product.price) >= minPrice;
            const categoryCondition = selectedCategory === '' || product.category === selectedCategory;
            const brandCondition = selectedBrand === '' || product.brand === selectedBrand;
         
            return priceCondition && categoryCondition && brandCondition;
        });

        renderProducts(productosFiltrados);
    });

    function renderProducts(products) {
        const productRow = document.getElementById("product-row");
        productRow.innerHTML = ""; 

        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.classList.add("col-md-6", "mb-4");
            card.innerHTML = `
                <div class="card">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Rating: ${product.rating}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                        <button type="button" class="btn btn-primary add-to-cart-btn" data-index="${index}">Agregar al carrito</button>
                    </div>
                </div>
            `;
            productRow.appendChild(card); 
        });

        const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
        addToCartBtns.forEach(btn => {
            btn.addEventListener("click", function(event) {
                const selectedProductIndex = event.target.dataset.index;
                const selectedProduct = products[selectedProductIndex];
                addToCart(selectedProduct);
            });
        });
    }

    function renderFilterOptions(categories, brands) {
        const categorySelect = document.getElementById("category-select");
        const brandSelect = document.getElementById("brand-select");

        categorySelect.innerHTML = "";
        brandSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Todos";
        defaultOption.value = "";
        categorySelect.appendChild(defaultOption);
        brandSelect.appendChild(defaultOption.cloneNode(true));

        categories.forEach(category => {
            const option = document.createElement("option");
            option.textContent = category;
            option.value = category;
            categorySelect.appendChild(option);
        });

        brands.forEach(brand => {
            const option = document.createElement("option");
            option.textContent = brand;
            option.value = brand;
            brandSelect.appendChild(option);
        });
    }
    document.getElementById('checkout-btn2').addEventListener('click', function() { 
        Swal.fire({
            title: "¡Excelente!",
            text: "¡Compra realizada!",
            icon: "success"
        });
    });
});