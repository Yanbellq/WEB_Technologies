const products = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const userProducts = new WeakSet();

let productIdCounter = 1;

function addProduct(name, price, quantity) {
    const product = {
        id: productIdCounter++,
        name,
        price,
        quantity,
    };
    products.set(product.id, product);
    productHistory.set(product, [{ action: 'added', timestamp: new Date() }]);
    displayProducts();
    displayAllProducts();
}

function deleteProduct(id) {
    products.delete(id);
    displayProducts();
    displayAllProducts();
}

function updateProduct(id, price, quantity) {
    const product = products.get(id);
    if (product) {
        product.price = price;
        product.quantity = quantity;
        productHistory.get(product).push({ action: 'updated', timestamp: new Date() });
        displayProducts();
        displayAllProducts();
    }
}

function findProductByName(name) {
    const foundProducts = [];
    for (const product of products.values()) {
        if (product.name.toLowerCase().includes(name.toLowerCase())) {
            foundProducts.push(product);
        }
    }
    return foundProducts;
}

function placeOrder(productId, quantity) {
    const product = products.get(productId);
    if (product && product.quantity >= quantity) {
        product.quantity -= quantity;
        const order = { product, quantity, timestamp: new Date() };
        orders.add(order);
        displayProducts();
        displayOrders();
        displayAllProducts();
    } else if (!product) {
        alert("Товар не знайдено");
    } else {
        alert("Недостатньо кількості товару на складі");
    }
}

function deleteOrder(order) {
    orders.delete(order);
    const product = products.get(order.product.id);
    if (product) {
        product.quantity = parseInt(product.quantity) + parseInt(order.quantity);
        displayProducts();
        displayAllProducts();
    }
    displayOrders();
}

function clearOrders() {
    orders.forEach(order => {
        const product = products.get(order.product.id);
        if (product) {
            product.quantity = parseInt(product.quantity) + parseInt(order.quantity);
        }
    });
    orders.clear();
    displayProducts();
    displayOrders();
    displayAllProducts();
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    for (const product of products.values()) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price}</p>
            <p>Кількість: ${product.quantity}</p>
            <button onclick="deleteProduct(${product.id})">Видалити</button>
            <button onclick="updateProduct(${product.id}, prompt('Нова ціна'), prompt('Нова кількість'))">Оновити</button>
            <button onclick="placeOrder(${product.id}, prompt('Кількість для замовлення'))">Замовити</button>
        `;
        productList.appendChild(productDiv);
    }
}

function displayOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '<h2>Замовлення:</h2>';
    for (const order of orders) {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `<p>${order.product.name} - ${order.quantity} шт. (${order.timestamp}) <button onclick="deleteOrder(${JSON.stringify(order)})">Видалити</button></p>`;
        orderList.appendChild(orderDiv);
    }
    const clearButton = document.createElement('button');
    clearButton.textContent = "Очистити всі замовлення";
    clearButton.onclick = clearOrders;
    orderList.appendChild(clearButton);
}
function displayAllProducts() {
    const allProductsList = document.getElementById('all-products-list');
    allProductsList.innerHTML = '';
    for (const product of products.values()) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price}</p>
            <p>Кількість: ${product.quantity}</p>
        `;
        allProductsList.appendChild(productDiv);
    }
}

document.getElementById('add-product').addEventListener('click', () => {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);
    addProduct(name, price, quantity);
});

document.getElementById('search-button').addEventListener('click', () => {
    const name = document.getElementById('search-name').value;
    const foundProducts = findProductByName(name);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    foundProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price}</p>
            <p>Кількість: ${product.quantity}</p>
            <button onclick="deleteProduct(${product.id})">Видалити</button>
            <button onclick="updateProduct(${product.id}, prompt('Нова ціна'), prompt('Нова кількість'))">Оновити</button>
            <button onclick="placeOrder(${product.id}, prompt('Кількість для замовлення'))">Замовити</button>
        `;
        productList.appendChild(productDiv);
    });
});

displayAllProducts();