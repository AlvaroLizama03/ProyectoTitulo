<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de Ventas</title>
    <link rel="stylesheet" href="css/Ventas.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Barra de navegación -->
    <nav>
        <ul>
            <li><a href="Catalogo.html">Catálogo</a></li>
            <li><a href="inventario.html">Inventario</a></li>
            <li><a href="ventas.html" class="active">Ventas</a></li>
            <li>
                <a href="#" id="logout" class="logout-icon" title="Cerrar Sesión">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </ul>
    </nav>

    <!-- Sección de ventas -->
    <section id="ventas">
        <h1>Historial de Ventas</h1>

        <!-- Barra de búsqueda -->
        <input type="text" id="buscarVentas" placeholder="Buscar ventas por cliente, fecha o producto..." />

        <!-- Botón para exportar -->
        <button id="exportarVentas">Exportar Ventas</button>

        <!-- Tabla de ventas -->
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="registroVentas">
                <!-- Las filas de ventas se cargarán dinámicamente -->
            </tbody>
        </table>
    </section>

    <!-- Modal para detalles de la venta -->
    <div id="modalVenta" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Detalles de la Venta</h2>
            <div id="detallesVenta">
                <!-- Detalles de la venta se cargarán aquí -->
            </div>
        </div>
    </div>

    <!-- Script -->
    <script src="js/ventas.js"></script>
</body>
</html>
