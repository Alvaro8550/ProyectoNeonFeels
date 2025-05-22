const form = document.getElementById('forgotPasswordForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();

  if (!email) {
    message.textContent = 'Por favor, ingresa un correo válido.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/olvide-contraseña', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email })
    });   

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.';
      form.reset();
    } else {
      message.style.color = 'red';
      message.textContent = 'Error al enviar el correo. Intenta de nuevo.';
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = 'Error en la conexión con el servidor.';
    console.error('Error:', error);
  }
});
