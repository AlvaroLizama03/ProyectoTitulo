// Datos de usuario simulados
const usuarios = [
    { username: "admin", password: "1234", rol: "admin" },
    { username: "cliente", password: "5678", rol: "cliente" }
];

// Manejo del formulario de inicio de sesión
document.getElementById('formularioLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        // Guardar en SessionStorage y redirigir
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('isAdmin', usuario.rol === 'admin' ? 'true' : 'false');
        sessionStorage.setItem('username', username);
        alert('Inicio de sesión exitoso');
        window.location.href = 'Catalogo.html';
    } else {
        // Mostrar mensaje de error
        document.getElementById('errorMensaje').style.display = 'block';
    }
});


