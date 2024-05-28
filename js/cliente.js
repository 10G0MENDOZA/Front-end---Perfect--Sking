// En la primera página (login)
function registrarCliente() {
    var username = document.getElementById("username").value;
    var apellido = document.querySelector('#login-form #additional-fields input[name="apellido"]').value;
    var edad = document.querySelector('#login-form #additional-fields input[name="edad"]').value;
    var cedula = document.querySelector('#login-form #additional-fields input[name="cedula"]').value;

    // Almacena los datos en el almacenamiento local
    localStorage.setItem('datosUsuario', JSON.stringify({
        nombre: username,
        apellido: apellido,
        edad: edad,
        cedula: cedula
    }));

    // Redirige a la página del cliente
    window.location.href = 'Cliente.html';
}

// En la segunda página (cliente.html)
function registrarDatosAdicionales() {
    var correo = document.querySelector('input[name="correo"]').value;
    var fecha = document.querySelector('input[name="fecha"]').value;
    var hora = document.querySelector('input[name="hora"]').value;

    // Recupera los datos del almacenamiento local
    var datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));

    // Combina los datos
    var data = {
        ...datosUsuario,
        correo: correo,
        fecha: fecha,
        hora: hora
    };

    var url1 = "http://localhost:9998/api/cliente/save";
    var url2 = "http://localhost:9998/api/save";

    // Enviar solicitud a la primera URL
    fetch(url1, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((response) => {
        // Redirige a la página de éxito
        window.location.href = 'exito.html';
    })
    .catch((error) => console.error("Error:", error));

    // Enviar solicitud a la segunda URL
    fetch(url2, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((response) => {
        // Redirige a la página de éxito
        window.location.href = 'exito.html';
    })
    .catch((error) => console.error("Error:", error));
}

document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    registrarDatosAdicionales();
});
