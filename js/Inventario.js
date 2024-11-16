// Array para almacenar los productos
let productos = [];

// Cargar productos del LocalStorage si existen
document.addEventListener('DOMContentLoaded', () => {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    mostrarInventario();
});

// Función para mostrar los productos en la tabla de inventario
function mostrarInventario() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td class="${producto.stock < 5 ? 'stock-bajo' : ''}">${producto.stock}</td>
            <td>
            <button class="edit" onclick="editarProducto(${index})">Editar</button>
            <button class="delete" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        listaProductos.appendChild(fila);
    });
}

// Función para agregar o editar productos
document.getElementById('formularioProducto').addEventListener('submit', (e) => {
    e.preventDefault();

    const index = document.getElementById('indexProducto').value;
    const nuevoProducto = {
        id: index ? productos[index].id : Date.now(),
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };

    if (index) {
        // Editar producto
        productos[index] = nuevoProducto;
    } else {
        // Agregar nuevo producto
        productos.push(nuevoProducto);
    }

    // Guardar en LocalStorage y actualizar la vista
    localStorage.setItem('productos', JSON.stringify(productos));
    document.getElementById('formularioProducto').reset();
    mostrarInventario();
});

// Función para cargar el producto en el formulario para editar
function editarProducto(index) {
    const filas = document.querySelectorAll('#listaProductos tr');
    filas.forEach(fila => fila.classList.remove('fila-activa'));
    filas[index].classList.add('fila-activa');
    
    const producto = productos[index];
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('indexProducto').value = index;
}

// Función para eliminar un producto del inventario
function eliminarProducto(index) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmacion) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarInventario();
    }
}

// Función de cierre de sesión
document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn'); // Eliminar el estado de sesión
    sessionStorage.removeItem('isAdmin'); // Eliminar el rol de administrador
    sessionStorage.removeItem('username'); // Eliminar el nombre de usuario
    alert('Sesión cerrada');
    window.location.href = 'login.html'; // Redirigir a la página de login
});

document.getElementById('buscarProducto').addEventListener('input', (e) => {
    const filtro = e.target.value.toLowerCase();
    const filas = document.querySelectorAll('#listaProductos tr');

    filas.forEach(fila => {
        const nombreProducto = fila.querySelector('td:first-child').textContent.toLowerCase();
        fila.style.display = nombreProducto.includes(filtro) ? '' : 'none';
    });
});
