document.addEventListener("DOMContentLoaded", function() {
    obtenerDatos();
});

function obtenerDatos() {
    fetch('http://localhost:9998/api/citas')
        .then(response => response.json())
        .then(data => {
            mostrarDatos(data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function mostrarDatos(datos) {
    const tabla = document.querySelector('table tbody');
    tabla.innerHTML = '';

    datos.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.cedula}</td>
            <td>${dato.edad}</td>
            <td>${dato.fecha}</td>
            <td>${dato.hora}</td>
            <td>${dato.correo}</td>
            <td>
                <button onclick="editarCita(${dato.id})">Editar</button>
               
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function eliminarCita(citaId) {
     fetch(`http://localhost:9998/api/citas/${citaId}`, {  
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            // Refrescar la lista de citas después de eliminar
            obtenerDatos();
        } else {
            throw new Error('Error al eliminar la cita');
        }
    })
    .catch(error => console.error('Error al eliminar la cita:', error));
}

function editarCita(id) {
    window.location.href = `editarcitas.html?id=${id}`;
}
