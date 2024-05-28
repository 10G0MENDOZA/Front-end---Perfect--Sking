const listUsers = async () => {
    const response = await fetch("http://localhost:9998/api/persons");
    const users = await response.json();

    let tableBody = ``;
    users.forEach((user, index) => {
        tableBody += `<tr>
        <td class='centered'>${user.username}</td>
        <td class='centered'>${user.password}</td>
        </tr>`;
    });
    // document.getElementById("tableBody_Users").innerHTML = tableBody;
    const tableBody_Users = document.getElementById('tableBody_Users');
};

window.addEventListener("load", function () {
    listUsers();
});

function savePerson() {

   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;

   savePersonPost(username, password);
}

const savePersonPost = async (usernameReq, passwordReq) => {

    var url = "http://localhost:9998/api/persons";
    var data = { username: usernameReq, password: passwordReq };
    
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
};
function registrar() {
    var name = document.getElementById("username").value;
    var apellido = document.querySelector('#login-form #additional-fields input[name="apellido"]').value;
    var edad = document.querySelector('#login-form #additional-fields input[name="edad"]').value;
    var CC = document.querySelector('#login-form #additional-fields input[name="CC"]').value;

    $.ajax({
        type: "POST",
        url: "registrar_clientes",
        data: {
            method: 'crear',
            usernanme: name,
            apellido: apellido,
            
        },
        success: function(res) {
            // Cambia el contenido y estilo del elemento de registro exitoso
            document.getElementById('registroExitoso').style.display = 'block';
            setTimeout(function() {
                document.getElementById('registroExitoso').style.display = 'none';
            }, 3000); 
            // Después de 3 segundos, oculta el mensaje de registro exitoso
        }
    });
}
function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
    dateTimeElement.textContent = formattedDateTime;
}

// Actualiza la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime(); // Actualiza la fecha y hora al cargar la página
});

var roleSelect = document.getElementById('rol');
var additionalFields = document.getElementById('additional-fields');
var passwordFields = document.getElementById('password-fields');
var inputFields = document.querySelectorAll('.input-effect');

// Aplica el efecto de enfoque a todos los campos
inputFields.forEach(function(field) {
    field.addEventListener('focus', function() {
        field.parentElement.parentElement.classList.add('focus');
    });

    field.addEventListener('blur', function() {
        if (field.value === '') {
            field.parentElement.parentElement.classList.remove('focus');
            // Muestra la alerta de campo vacío

        }
    });
});

roleSelect.addEventListener('change', function() {
    // Limpiar todas las alertas al cambiar de rol
    document.getElementById('nombreAlert').textContent = '';
    document.getElementById('passwordAlert').textContent = '';
    document.getElementById('apellidoAlert').textContent = '';
    document.getElementById('edadAlert').textContent = '';
    document.getElementById('ccAlert').textContent = '';

    var selectedOption = roleSelect.options[roleSelect.selectedIndex];
    if (selectedOption.value === 'cliente') {
        additionalFields.classList.remove('hidden');
        passwordFields.classList.add('hidden');

        // Limpiar el mensaje de error al cambiar a rol cliente
        document.getElementById('mensajeError').textContent = '';
    } else {
        additionalFields.classList.add('hidden');
        passwordFields.classList.remove('hidden');
    }
});

// Maneja el evento de envío del formulario
var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var rol = roleSelect.value;

    // Limpiar el mensaje de error al intentar enviar el formulario nuevamente
    document.getElementById('mensajeError').textContent = '';

 if (rol === 'administrador') {
        if (username.trim() === '' && password.trim() === '') {
            // Mostrar el mensaje de error si ambos campos están vacíos
            document.getElementById('mensajeError').textContent = 'Todos los campos son obligatorios.';
        } else {
            validateSession(username, password);
        }
    } else {
        // Otros roles (si los hubiera)
      //  document.getElementById('mensajeError').textContent = 'Rol no reconocido.';
      registrarCliente();
    }
});

const validateSession = async (usernameReq, passwordReq) => {

    var url = "http://localhost:9998/api/admin/login";
    var data = { username : usernameReq, password: passwordReq };
    
    const response = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    const validate = await response.json();
    console.log(validate)
    if(validate){
         // Muestra el mensaje de bienvenida al administrador
         document.getElementById('bienvenidaAdmin').style.display = 'block';
         // Oculta el formulario después de la redirección
         loginForm.style.display = 'none';
         // Redirigir al administrador después de 3 segundos
         //setTimeout(function() {
           window.location.href = 'Administrador.html';
         //}, 3000);
    } else {
        // Mostrar el mensaje de error si las credenciales son incorrectas
        document.getElementById('mensajeError').textContent =
            'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
};