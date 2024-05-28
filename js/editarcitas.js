document.addEventListener("DOMContentLoaded", function() {
    // Obtén el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const citaId = urlParams.get('id');

    if (citaId) {
        // Cargar los datos de la cita
        fetch(`http://localhost:9998/api/citas/${citaId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Rellenar el formulario con los datos de la cita
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            document.getElementById('cedula').value = data.cedula;
            document.getElementById('edad').value = data.edad;
            document.getElementById('correo').value = data.correo;
            document.getElementById('fecha').value = data.fecha;
            document.getElementById('hora').value = data.hora;
        })
        .catch(error => console.error('Error al cargar los datos de la cita:', error));
    } else {
        console.error('No se ha proporcionado un ID de cita válido.');
    }

    // Manejar el envío del formulario para guardar los cambios
    document.getElementById('editarCitaForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            cedula: document.getElementById('cedula').value,
            edad: document.getElementById('edad').value,
            correo: document.getElementById('correo').value,
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value
        };

        fetch(`http://localhost:9998/api/citas/${citaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('message').style.display = 'block';
                document.getElementById('backButton').style.display = 'block';
            } else {
                alert('Error al actualizar la cita');
            }
        })
        .catch(error => console.error('Error al actualizar la cita:', error));
    });
});
