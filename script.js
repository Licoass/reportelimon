// ==========================================================================
// COMPORTAMIENTO INTERACTIVO - INFORME TÉCNICO ECO INGENIERÍA CR
// ==========================================================================

// CAMBIAR PESTAÑAS (NAVEGACIÓN)
function switchTab(sectionId) {
    // Obtener todas las pestañas y secciones
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');

    // Desactivar todas las pestañas y ocultar secciones
    tabs.forEach(tab => tab.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));

    // Activar pestaña seleccionada
    const activeTab = Array.from(tabs).find(tab => tab.getAttribute('onclick').includes(sectionId));
    if (activeTab) activeTab.classList.add('active');

    // Mostrar sección seleccionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
        // Scroll suave al inicio de la sección en móvil
        if (window.innerWidth <= 768) {
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// FILTRAR GALERÍA FOTOGRÁFICA
function filterGallery(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    // Actualizar botón activo
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(category));
    if (activeBtn) activeBtn.classList.add('active');

    // Filtrar elementos de la cuadrícula
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            // Pequeño retardo para animación
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300); // Duración de la transición
        }
    });
}

// VISUALIZADOR DE IMÁGENES (LIGHTBOX)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// Agregar evento click a todas las imágenes de la galería
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-box img');
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            const imgSrc = e.target.getAttribute('src');
            const imgAlt = e.target.getAttribute('alt');
            const infoText = e.target.closest('.gallery-item').querySelector('.image-info p').innerText;
            const infoTitle = e.target.closest('.gallery-item').querySelector('.image-info h5').innerText;

            openLightbox(imgSrc, `${infoTitle} - ${infoText}`);
        });
    });
});

function openLightbox(src, captionText) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
    lightboxCaption.innerText = captionText;
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Habilitar scroll nuevamente
}

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});
