// Obtener el formulario y el mensaje de error
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

// Función para validar el login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtener datos del "registro" almacenado en localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    // Verificar si el correo y la contraseña coinciden
    if (email === storedEmail && password === storedPassword) {
        errorMessage.textContent = '';
        alert('¡Bienvenido al sistema!');
        
        // Guardar estado de login y redirigir a perfil
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'profile.html';
    } else {
        errorMessage.textContent = 'Correo o contraseña incorrectos.';
    }
});
