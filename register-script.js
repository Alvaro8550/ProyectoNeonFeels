document.addEventListener('DOMContentLoaded', function () {
    const logocontainer = document.querySelector('.login-container');
    const registerBtn = document.querySelector('.submit-button');

    //Api de regsitro
    const registerForm = document.querySelector('#registerForm');
    const API_URL = 'http://localhost:3000/api';



    //Manejar el formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();



        //Obtener datos de los formularios
        const nombre_usuario = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const contraseña = registerForm.querySelector('input[type="password"]').value;



        try {
            //Enviar la solicitud al servidor
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    nombre_usuario,
                    email,
                    contraseña

                    
                })

            });


            if (response.ok) {
                alert("Usuario registrado correctamnete")

                //Limpiar el formulario 
                registerForm.reset();



            } else {
                alert("Error al registrar el usuario");
                registerForm.reset();

            }
        } catch (error) {   

            console.log("Error al registrar el usuario", error);



        }



    });

})