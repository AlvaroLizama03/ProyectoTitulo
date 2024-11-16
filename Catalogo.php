<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo</title>
    <link rel="stylesheet" href="css/Catalogo.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Barra de navegación -->
    <nav>
        <ul>
            <li><a href="Catalogo.html" class="active">Catálogo</a></li>
            <li><a href="inventario.html">Inventario</a></li>
            <li><a href="ventas.html">Ventas</a></li>
            <li class="carrito-nav">
                <a href="#" id="verCarrito">
                    <i class="fas fa-shopping-bag"></i>
                    <span id="carritoCantidad">(0)</span>
                </a>
            </li>
            <li>
                <a href="#" id="logout" class="logout-icon" title="Cerrar Sesión">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </ul>
    </nav>

    <!-- Sección del catálogo -->
    <section id="catalogo">
        <h1>Catálogo de Productos</h1>
        <div class="productos-grid">
            <!-- Los productos se cargarán dinámicamente -->
        </div>
    </section>

    <!-- Modal para el carrito -->
    <div id="modalCarrito" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Carrito de Compras</h2>
            <div id="contenidoCarrito">
                <!-- Productos del carrito se cargarán dinámicamente -->
            </div>
            <button id="vaciarCarrito">Vaciar Carrito</button>
            <button id="finalizarCompra" style="display: none;">Finalizar Compra</button>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/Catalogo.js"></script>
</body>
</html>
