/*array de productos*/

let productos = [
    {
        id: 1,
        nombre: 'Docena de empanadas',
        descripcion: 'Las mejores Empandas artesanales que podes probar',
        precio: 3500,
        imagen: 'Empanadas.jpg',
        categoría: 'Lo más vendido',
    },
    {
        id: 2,
        nombre: 'Pizza',
        descripcion: 'Contamos con amplia variedad en sabores de Pizzas',
        precio: 3000,
        imagen: 'Pizza.jpg',
        categoría: 'Clásico',
    },
    {
        id: 3,
        nombre: 'Panchos',
        descripcion: 'Los mejores Panchos del pais los encontras aca',
        precio: 6000,
        imagen: 'panchos.jpg',
        categoría: 'Nuevos Ingresos',
    },
    {
        id: 4,
        nombre: 'Medialunas',
        descripcion: 'Docena de Medialunas',
        precio: 3000,
        imagen: 'medialunas.jpg',
        categoría: 'Lo más vendido',
    },
    {
        id: 5,
        nombre: 'Pastelitos',
        descripcion: 'Docena de Pastelitos tradicionales',
        precio: 2400,
        imagen: 'pastelitos.jpg',
        categoría: 'Clásico',
    },
    {
        id: 6,
        nombre: 'Chipá sabor Queso',
        descripcion: 'La mejor chipá la encontras aca',
        precio: 2600,
        imagen: 'chipa.jpg',
        categoría: 'Nuevos Ingresos',
    },
];

//*filtros de productos

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('#minicarrito a');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });

    const clearFilterLink = document.querySelector('#minicarrito a:last-child');
    clearFilterLink.addEventListener('click', function(event) {
        event.preventDefault();
        showAllCards();
    });
});

function filterByCategory(category) {
    const products = document.querySelectorAll('.productos .card');
    
    products.forEach(product => {
        const productId = parseInt(product.querySelector('.category').getAttribute('data-productid'));
        const selectedProduct = productos.find(item => item.id === productId);
        
        if (category === 'Borrar filtros' || selectedProduct.categoría === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function showAllCards() {
    const products = document.querySelectorAll('.productos .card');
    
    products.forEach(product => {
        product.style.display = 'block';
    });
}


//Carrito
let cartItems = []; // array de carrito

// datos de carrito
function updateCartInfo() {
    const itemsAgregados = document.getElementById('itemsAgregados');
    const total = document.getElementById('total');

    // Cantidad de productos
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    itemsAgregados.textContent = totalItems;

    // Precio total
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    total.textContent = totalPrice.toFixed(2); 
}

// Agregar producto
function addToCart(productId) {
    const productElement = document.querySelector(`[data-productid="${productId}"]`);
    const priceSpan = productElement.querySelector('span');
    const price = parseFloat(priceSpan.textContent); 

    const productInCart = cartItems.find(item => item.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cartItems.push({ id: productId, price: price, quantity: 1 });
    }

    updateCartInfo();
}

document.querySelector('#btn-ver-carrito').addEventListener('click', function() {
    displayCartItems(); // activar informacion 
});



function displayCartItems() {
    const cartItemList = document.getElementById('cartItemList');
    cartItemList.innerHTML = '';

    const itemCounts = {}; //contar la cantidad de cada productos

    cartItems.forEach(item => {
        const product = productos.find(producto => producto.id === item.id);
        if (product) {
            const listItem = document.createElement('li');
            const productName = `${product.nombre} - $${item.price}`;

            //contar la cantidad de cada producto
            itemCounts[item.id] = itemCounts[item.id] ? itemCounts[item.id] + item.quantity : item.quantity;

            listItem.textContent = `${productName} (x${itemCounts[item.id]})`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-primary');
            deleteButton.onclick = function () {

                // Borrar de carrito
                removeFromCart(item.id);
                displayCartItems(); // Actualizar la lista de productos
                updateCartInfo(); // Actualizar la información del carrito
            };
        
            listItem.appendChild(deleteButton);
            cartItemList.appendChild(listItem);
        }
    });

    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
    }

    //boton de comprar
  
      document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        
        // la información del formulario 
        let formData = {
          nombre: document.getElementById('nombre').value,
          telefono: document.getElementById('telefono').value,
          email: document.getElementById('email').value,
          lugarEntrega: document.getElementById('lugarEntrega').value,
          fechaEntrega: document.getElementById('fechaEntrega').value,
          metodoPago: document.getElementById('metodoPago').value,
          cuotas: document.getElementById('cuotas').value
        };
  
        console.log(formData); 
        alert('Compra completada. Gracias por tu compra!');
      });

    // Cantidad y precio totales en carrito
    const totalItems = Object.values(itemCounts).reduce((acc, count) => acc + count, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    document.getElementById('checkout-form').textContent = formData;
    document.getElementById('modalTotalItems').textContent = totalItems;
    document.getElementById('modalTotalPrice').textContent = totalPrice;
}

(function () {
    'use strict';
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        event.preventDefault();
        successMessage.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
      }
    });
  })();

