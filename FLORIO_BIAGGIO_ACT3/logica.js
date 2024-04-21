document.addEventListener("DOMContentLoaded", function () {
    let products; // Declarar la variable products en un ámbito más amplio
    let uniqueCategories = [];
    let uniqueBrands = [];

    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            products = data.products; // Asignar los productos al cargar el JSON
            uniqueCategories = [...new Set(products.map(product => product.category))];
            uniqueBrands = [...new Set(products.map(product => product.brand))];
            renderProducts(products); // Renderizar productos al cargar la página
            renderFilterOptions(uniqueCategories, uniqueBrands);
        })
        .catch(error => console.error("Error fetching data:", error));

    const cartItems = []; // Array para almacenar los elementos del carrito

    // Función para agregar un artículo al carrito
    function addToCart(product) {
        cartItems.push(product); // Agrega el producto al array del carrito
        renderCart(); // Vuelve a renderizar el carrito con el nuevo elemento
    }

    // Función para eliminar el último artículo del carrito
    function deleteLastItem() {
        if (cartItems.length > 0) {
            cartItems.pop(); // Elimina el último artículo del array del carrito
            renderCart(); // Vuelve a renderizar el carrito después de eliminar el elemento
        }
    }

    // Función para renderizar el contenido del carrito
    function renderCart() {
        const cartItemsElement = document.getElementById("cart-items");
        cartItemsElement.innerHTML = ""; // Limpia el contenido actual del carrito

        // Itera sobre los elementos del carrito y crea la estructura HTML
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.title;
            li.classList.add("cart-item");
            cartItemsElement.appendChild(li);
        });

        // Calcula y muestra el total del carrito
        const cartTotalElement = document.getElementById("cart-total");
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Agrega un evento de clic al botón "Eliminar último artículo"
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", deleteLastItem);

    // Evento de clic en el botón "Aplicar filtro"
    document.getElementById('apply-filter-btn').addEventListener('click', function() {
        const minPrice = parseFloat(document.getElementById('min-price').value);
        const selectedCategory = document.getElementById('category-select').value;
        const selectedBrand = document.getElementById('brand-select').value;

        // Filtrar productos
        const productosFiltrados = products.filter(product => {
            // Verificar si el precio es mayor o igual al mínimo
            const priceCondition = parseFloat(product.price) >= minPrice;
            // Verificar si la categoría y la marca coinciden
            const categoryCondition = selectedCategory === '' || product.category === selectedCategory;
            const brandCondition = selectedBrand === '' || product.brand === selectedBrand;
            // Devolver true solo si todas las condiciones se cumplen
            return priceCondition && categoryCondition && brandCondition;
        });

        // Mostrar productos filtrados
        renderProducts(productosFiltrados);
    });

    function renderProducts(products) {
        const productRow = document.getElementById("product-row");
        productRow.innerHTML = ""; // Limpiar el contenedor de productos

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
            productRow.appendChild(card); // Agregar la tarjeta al contenedor de la fila
        });

        // Adjuntar eventos de clic a los botones "Agregar al carrito"
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

        // Limpiar las opciones existentes
        categorySelect.innerHTML = "";
        brandSelect.innerHTML = "";

        // Agregar la opción predeterminada
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Todos";
        defaultOption.value = "";
        categorySelect.appendChild(defaultOption);
        brandSelect.appendChild(defaultOption.cloneNode(true));

        // Agregar las opciones de categoría
        categories.forEach(category => {
            const option = document.createElement("option");
            option.textContent = category;
            option.value = category;
            categorySelect.appendChild(option);
        });

        // Agregar las opciones de marca
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