// Función para registrar un cliente
function registrarCliente() {
    var username = document.getElementById("username").value;
    var apellido = document.querySelector('#login-form #additional-fields input[name="apellido"]').value;
    var edad = document.querySelector('#login-form #additional-fields input[name="edad"]').value;
    var CC = document.querySelector('#login-form #additional-fields input[name="CC"]').value;

    var url = "http://localhost:9998/api/save";
    var data = { 
        nombre: username,
        apellido: apellido,
        edad: edad,
        cc: CC
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((response) => {
        // Redirigir a la página del cliente después de completar el registro
        window.location.href = 'Cliente.html';
    })
    .catch((error) => console.error("Error:", error));
}

// Event listener para el formulario de registro
var clienteForm = document.getElementById('login-form');
clienteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Aquí puedes realizar validaciones o enviar los datos del cliente al backend
    // En este ejemplo, simplemente llamamos a la función de registro
    registrarCliente();
});
