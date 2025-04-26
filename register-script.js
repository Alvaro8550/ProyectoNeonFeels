// Obtener el formulario y el mensaje de error
const registerForm = document.getElementById('registerForm');
const errorMessageRegister = document.getElementById('error-message-register');

// Función para validar el registro
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validar si el correo tiene una sintaxis válida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessageRegister.textContent = 'Por favor, ingresa un correo electrónico válido.';
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        errorMessageRegister.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    // Validación simple para la contraseña (al menos 6 caracteres)
    if (password.length < 6) {
        errorMessageRegister.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    // Si todo es válido, simular el registro
    errorMessageRegister.textContent = '';
    alert('¡Te has registrado exitosamente! Ahora puedes iniciar sesión.');
    
    // Simular el almacenamiento del usuario en el localStorage (para fines de ejemplo)
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirigir a la página de login
    window.location.href = 'index.html';
});
