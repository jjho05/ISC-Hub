/**
 * Resource Listing
 * Handles displaying resources in the gallery
 */

// Sample data (will be replaced with Firebase data)
const sampleResources = [
    {
        id: '1',
        titulo: 'Apuntes de Programación Web',
        descripcion: 'Apuntes completos del curso de Programación Web incluyendo HTML, CSS, JavaScript y frameworks modernos.',
        materia: 'programacion',
        tipoContenido: 'apuntes',
        semestre: 5,
        tags: ['html', 'css', 'javascript', 'react'],
        archivoTipo: 'application/pdf',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=PDF',
        autorNombre: 'Juan Pérez',
        descargas: 45,
        calificacionPromedio: 4.5,
        totalCalificaciones: 12,
        fechaSubida: new Date('2025-01-15')
    },
    {
        id: '2',
        titulo: 'Proyecto: Sistema de Gestión Escolar',
        descripcion: 'Proyecto completo de un sistema de gestión escolar desarrollado en Python con Django y PostgreSQL.',
        materia: 'bases-datos',
        tipoContenido: 'proyectos',
        semestre: 6,
        tags: ['python', 'django', 'postgresql', 'crud'],
        archivoTipo: 'application/zip',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=ZIP',
        autorNombre: 'María González',
        descargas: 78,
        calificacionPromedio: 5.0,
        totalCalificaciones: 25,
        fechaSubida: new Date('2025-01-10')
    },
    {
        id: '3',
        titulo: 'Tutorial: Configuración de Redes con Cisco',
        descripcion: 'Tutorial paso a paso para configurar redes utilizando Cisco Packet Tracer. Incluye ejemplos prácticos.',
        materia: 'redes',
        tipoContenido: 'tutoriales',
        semestre: 4,
        tags: ['cisco', 'redes', 'packet-tracer'],
        archivoTipo: 'video/mp4',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=VIDEO',
        autorNombre: 'Carlos Ramírez',
        descargas: 120,
        calificacionPromedio: 4.8,
        totalCalificaciones: 35,
        fechaSubida: new Date('2025-01-05')
    },
    {
        id: '4',
        titulo: 'Código: Algoritmos de Ordenamiento',
        descripcion: 'Implementación de diversos algoritmos de ordenamiento en Java con análisis de complejidad.',
        materia: 'programacion',
        tipoContenido: 'codigos',
        semestre: 3,
        tags: ['java', 'algoritmos', 'ordenamiento'],
        archivoTipo: 'application/zip',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=CODE',
        autorNombre: 'Ana López',
        descargas: 92,
        calificacionPromedio: 4.3,
        totalCalificaciones: 18,
        fechaSubida: new Date('2025-01-12')
    },
    {
        id: '5',
        titulo: 'Ideas: Proyectos de IA para Principiantes',
        descripcion: 'Colección de ideas de proyectos de Inteligencia Artificial perfectos para estudiantes que están comenzando.',
        materia: 'inteligencia-artificial',
        tipoContenido: 'ideas',
        semestre: 7,
        tags: ['ia', 'machine-learning', 'proyectos'],
        archivoTipo: 'text/markdown',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=MD',
        autorNombre: 'Roberto Sánchez',
        descargas: 65,
        calificacionPromedio: 4.7,
        totalCalificaciones: 22,
        fechaSubida: new Date('2025-01-08')
    },
    {
        id: '6',
        titulo: 'Examen: Arquitectura de Computadoras',
        descripcion: 'Examen de práctica de Arquitectura de Computadoras con respuestas y explicaciones detalladas.',
        materia: 'arquitectura',
        tipoContenido: 'examenes',
        semestre: 4,
        tags: ['arquitectura', 'examen', 'practica'],
        archivoTipo: 'application/pdf',
        thumbnailURL: 'https://via.placeholder.com/400x300/1B396A/ffffff?text=EXAM',
        autorNombre: 'Prof. Martínez',
        descargas: 156,
        calificacionPromedio: 4.9,
        totalCalificaciones: 42,
        fechaSubida: new Date('2025-01-03')
    }
];

let currentResources = [...sampleResources];
let currentPage = 1;
const resourcesPerPage = 6;

/**
 * Initialize Resource Listing
 */
function initializeResourceListing() {
    displayResources(currentResources);
    updateResourceCount(currentResources.length);
}

/**
 * Display Resources in Grid
 */
function displayResources(resources) {
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const resourcesGrid = document.getElementById('resourcesGrid');

    // Hide loading
    if (loadingState) loadingState.style.display = 'none';

    // Check if there are resources
    if (resources.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (resourcesGrid) resourcesGrid.style.display = 'none';
        return;
    }

    // Hide empty state and show grid
    if (emptyState) emptyState.style.display = 'none';
    if (resourcesGrid) resourcesGrid.style.display = 'grid';

    // Calculate pagination
    const startIndex = (currentPage - 1) * resourcesPerPage;
    const endIndex = startIndex + resourcesPerPage;
    const paginatedResources = resources.slice(startIndex, endIndex);

    // Clear grid
    resourcesGrid.innerHTML = '';

    // Create resource cards
    paginatedResources.forEach(resource => {
        const card = createResourceCard(resource);
        resourcesGrid.appendChild(card);
    });

    // Update pagination
    updatePagination(resources.length);
}

/**
 * Create Resource Card Element
 */
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'card resource-card';
    card.style.cursor = 'pointer';
    card.onclick = () => window.location.href = `recurso-detalle.html?id=${resource.id}`;

    // Get file type icon
    const fileIcon = getFileTypeIcon(resource.archivoTipo);

    // Format date
    const formattedDate = formatDate(resource.fechaSubida);

    card.innerHTML = `
        <div class="resource-card-thumbnail">
            ${resource.thumbnailURL ?
            `<img src="${resource.thumbnailURL}" alt="${resource.titulo}">` :
            `<div style="font-size: 48px; color: var(--text-muted);">${fileIcon}</div>`
        }
        </div>
        <div class="resource-card-content">
            <h3 class="resource-card-title">${resource.titulo}</h3>
            <p class="resource-card-description">${resource.descripcion}</p>
            <div class="resource-card-meta">
                <span class="badge badge-primary">${getMateriaLabel(resource.materia)}</span>
                <span class="badge badge-secondary">${getTipoLabel(resource.tipoContenido)}</span>
                <span class="badge badge-outline">Sem. ${resource.semestre}</span>
            </div>
            <div class="resource-card-footer">
                <div class="resource-card-stats">
                    <div class="resource-card-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>${resource.descargas}</span>
                    </div>
                    <div class="resource-card-stat">
                        ${renderStars(resource.calificacionPromedio)}
                        <span>${resource.calificacionPromedio.toFixed(1)}</span>
                    </div>
                </div>
                <div style="font-size: var(--font-size-xs); color: var(--text-muted);">
                    ${formattedDate}
                </div>
            </div>
        </div>
    `;

    return card;
}

/**
 * Get File Type Icon
 */
function getFileTypeIcon(mimeType) {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('video')) return '🎥';
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return '📦';
    if (mimeType.includes('markdown')) return '📝';
    return '📁';
}

/**
 * Get Materia Label
 */
function getMateriaLabel(materia) {
    const labels = {
        'programacion': 'Programación',
        'bases-datos': 'Bases de Datos',
        'redes': 'Redes',
        'arquitectura': 'Arquitectura',
        'inteligencia-artificial': 'IA'
    };
    return labels[materia] || materia;
}

/**
 * Get Tipo Label
 */
function getTipoLabel(tipo) {
    const labels = {
        'apuntes': 'Apuntes',
        'proyectos': 'Proyecto',
        'ideas': 'Ideas',
        'codigos': 'Código',
        'tareas': 'Tarea',
        'examenes': 'Examen',
        'tutoriales': 'Tutorial',
        'otros': 'Otro'
    };
    return labels[tipo] || tipo;
}

/**
 * Render Star Rating
 */
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }

    return `<span style="color: #ffc107;">${stars}</span>`;
}

/**
 * Format Date
 */
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString('es-MX');
}

/**
 * Update Resource Count
 */
function updateResourceCount(count) {
    const resourceCount = document.getElementById('resourceCount');
    if (resourceCount) {
        resourceCount.textContent = count;
    }
}

/**
 * Update Pagination
 */
function updatePagination(totalResources) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(totalResources / resourcesPerPage);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';
    pagination.innerHTML = '';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-outline btn-sm';
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayResources(currentResources);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = currentPage === i ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            displayResources(currentResources);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-outline btn-sm';
    nextBtn.textContent = 'Siguiente →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayResources(currentResources);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    pagination.appendChild(nextBtn);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResourceListing);
} else {
    initializeResourceListing();
}
