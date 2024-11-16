// Cargar ventas desde LocalStorage y mostrar en la tabla
document.addEventListener('DOMContentLoaded', () => {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    mostrarVentas(ventas);
});

// Función para mostrar las ventas en la tabla
function mostrarVentas(ventas) {
    const registroVentas = document.getElementById('registroVentas');
    registroVentas.innerHTML = ''; // Limpiar la tabla antes de mostrar los datos

    ventas.forEach((venta, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${venta.fecha}</td>
            <td>${venta.cliente}</td>
            <td>${venta.productos}</td>
            <td>${venta.cantidad}</td>
            <td>$${venta.total.toFixed(2)}</td>
            <td>
                <button class="view" onclick="mostrarDetallesVenta(${index})">Ver Detalles</button>
            </td>
        `;
        registroVentas.appendChild(fila);
    });
}

// Función para buscar ventas por cliente, fecha o productos
document.getElementById('buscarVentas').addEventListener('input', (e) => {
    const filtro = e.target.value.toLowerCase();
    const filas = document.querySelectorAll('#registroVentas tr');

    filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        fila.style.display = contenido.includes(filtro) ? '' : 'none';
    });
});

// Función para exportar ventas a un archivo CSV
document.getElementById('exportarVentas').addEventListener('click', () => {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const csvContent = "data:text/csv;charset=utf-8," + 
        ["Fecha,Cliente,Productos,Cantidad,Total"].join(",") + "\n" +
        ventas.map(v => `${v.fecha},${v.cliente},"${v.productos}",${v.cantidad},${v.total.toFixed(2)}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ventas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Función para mostrar los detalles de una venta en un modal
function mostrarDetallesVenta(index) {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const venta = ventas[index];
    const modal = document.getElementById('modalVenta');
    const detalles = document.getElementById('detallesVenta');

    // Mostrar los detalles de la venta seleccionada
    detalles.innerHTML = `
        <p><strong>Fecha:</strong> ${venta.fecha}</p>
        <p><strong>Cliente:</strong> ${venta.cliente}</p>
        <p><strong>Productos:</strong> ${venta.productos}</p>
        <p><strong>Cantidad:</strong> ${venta.cantidad}</p>
        <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>
    `;

    // Mostrar el modal
    modal.style.display = 'block';

    // Evento para cerrar el modal
    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Función de cierre de sesión
document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn'); // Eliminar el estado de sesión
    sessionStorage.removeItem('isAdmin'); // Eliminar el rol de administrador
    sessionStorage.removeItem('username'); // Eliminar el nombre de usuario
    alert('Sesión cerrada');
    window.location.href = 'login.html'; // Redirigir a la página de login
});