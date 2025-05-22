// Obtener el formulario y el mensaje de error
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

// Función para validar el login haciendo petición al backend
loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, contraseña: password }) // nombre de campo que espera backend
    });

    if (response.ok) {
      // Login correcto
      errorMessage.textContent = '';
      alert('¡Bienvenido al sistema!');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      window.location.href = 'profile.html'; // redirige a perfil
    } else {
      // Login fallido
      errorMessage.textContent = 'Correo o contraseña incorrectos.';
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    errorMessage.textContent = 'Error de conexión con el servidor.';
  }
});
