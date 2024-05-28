document.addEventListener('DOMContentLoaded', () => {
    const backgrounds = ['img/fondo1.avif', 'img/fondo2.jpg', 'img/fondo3.jpg']; // Lista de imágenes de fondo
    const secondBackground = backgrounds[1]; // Segunda imagen de fondo

    // Función para cambiar la imagen de fondo
    function changeBackground() {
        const currentBackground = document.body.style.backgroundImage.replace(/url\(['"](.*)['"]\)/, '$1');
        if (currentBackground !== secondBackground) {
            document.body.style.backgroundImage = `url(${secondBackground})`; // Aplicar el fondo al cuerpo de la página
        }
    }

    // Ejecutar la función una vez al inicio para establecer el fondo inicial
    changeBackground();
});
