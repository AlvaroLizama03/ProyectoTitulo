// Array para almacenar los productos en el carrito
let carrito = [];

// Cargar productos del LocalStorage y mostrar en el catálogo
document.addEventListener('DOMContentLoaded', () => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    mostrarCatalogo(productos);

    // Cargar el carrito desde el LocalStorage si existe
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarrito();

    // Agregar evento a todos los botones de "Agregar al carrito"
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
});

// Función para mostrar productos en el catálogo
function mostrarCatalogo(productos) {
    const catalogo = document.querySelector('.productos-grid');
    catalogo.innerHTML = '';

    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.setAttribute('data-id', producto.id);
        div.setAttribute('data-nombre', producto.nombre);
        div.setAttribute('data-precio', producto.precio);

        const stockTexto = producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado';
        const buttonDisabled = producto.stock > 0 ? '' : 'disabled';

        div.innerHTML = `
            <img src="img/producto.jpg" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito">Agregar al carrito</button>
        `;
        
        catalogo.appendChild(div);
    });
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    const productoElemento = e.target.closest('.producto');
    const id = productoElemento.dataset.id;
    const nombre = productoElemento.dataset.nombre;
    const precio = parseFloat(productoElemento.dataset.precio);

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const nuevoProducto = {
            id,
            nombre,
            precio,
            cantidad: 1
        };
        carrito.push(nuevoProducto);
    }

    // Guardar en LocalStorage y actualizar el carrito en la interfaz
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    const carritoCantidad = document.getElementById('carritoCantidad');
    
    // Calcular el total de unidades en el carrito
    const totalUnidades = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    carritoCantidad.textContent = `(${totalUnidades})`;

    // Mostrar productos en el modal
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    contenidoCarrito.innerHTML = '';

    let totalCompra = 0;

    carrito.forEach((producto, index) => {
        const totalPrecio = producto.precio * producto.cantidad;
        totalCompra += totalPrecio;

        const fila = document.createElement('div');
        fila.innerHTML = `
            <div>
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${totalPrecio.toFixed(2)}
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        contenidoCarrito.appendChild(fila);
    });

    // Mostrar u ocultar el botón de finalizar compra
    finalizarCompraBtn.style.display = carrito.length > 0 ? 'block' : 'none';

    // Agregar el total de la compra
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${totalCompra.toFixed(2)}`;
    contenidoCarrito.appendChild(totalDiv);

    agregarEventosCarrito();
}

// Función para agregar eventos de eliminar producto en el carrito
function agregarEventosCarrito() {
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        });
    });
}

// Función para finalizar la compra y registrar la venta
document.getElementById('finalizarCompra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No se puede finalizar la compra.");
        return;
    }

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    // Obtener el nombre del usuario logueado desde SessionStorage
    const cliente = sessionStorage.getItem('username') || 'Cliente desconocido';

    const venta = {
        fecha: new Date().toLocaleDateString(),
        cliente: cliente,
        productos: carrito.map(producto => `${producto.nombre} (x${producto.cantidad})`).join(', '),
        cantidad: carrito.reduce((acc, producto) => acc + producto.cantidad, 0),
        total: total
    };

    // Cargar el historial de ventas de LocalStorage y convertirlo en un array si es necesario
    let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    if (!Array.isArray(ventas)) {
        ventas = [];
    }

    // Reducir el stock de cada producto en el carrito
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            producto.stock -= item.cantidad;
            if (producto.stock < 0) producto.stock = 0; // Evitar stock negativo
        }
    });

    localStorage.setItem('productos', JSON.stringify(productos));

    // Agregar la nueva venta al historial y guardar en LocalStorage
    ventas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(ventas));

    // Vaciar el carrito y actualizar la vista
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    alert('Compra finalizada. Gracias por su compra.');
    document.getElementById('modalCarrito').style.display = 'none';
});

// Función para vaciar el carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    alert('El carrito ha sido vaciado.');
});

// Función para cerrar el modal del carrito
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modalCarrito').style.display = 'none';
});

// Mostrar el carrito cuando se hace clic en el botón de ver carrito
document.getElementById('verCarrito').addEventListener('click', () => {
    document.getElementById('modalCarrito').style.display = 'block';
});

// Función de cierre de sesión
document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn'); // Eliminar el estado de sesión
    sessionStorage.removeItem('isAdmin'); // Eliminar el rol de administrador
    sessionStorage.removeItem('username'); // Eliminar el nombre de usuario
    alert('Sesión cerrada');
    window.location.href = 'login.html'; // Redirigir a la página de login
});
