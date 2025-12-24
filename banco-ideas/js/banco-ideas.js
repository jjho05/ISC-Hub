// Banco de Ideas - JavaScript Principal

// Datos de ejemplo (temporal, se reemplazará con Firebase)
const ideasEjemplo = [
    {
        id: 1,
        titulo: "Sistema de Inventario para Miscelánea",
        descripcion: "Aplicación web para gestionar inventario, ventas y proveedores de una miscelánea familiar. Incluye control de stock, alertas de productos bajos y reportes de ventas.",
        estado: "disponible",
        autor: "Juan Pérez García",
        destinos: ["innovatec", "gps"],
        habilidades: ["JavaScript", "Node.js", "MySQL"],
        fecha: "2025-01-15"
    },
    {
        id: 2,
        titulo: "App de Citas para Consultorio Médico",
        descripcion: "Sistema de gestión de citas médicas con recordatorios automáticos, historial de pacientes y generación de recetas digitales.",
        estado: "en-desarrollo",
        autor: "María González López",
        equipo: ["Carlos Ramírez", "Ana Martínez"],
        profesorAsesor: "Dr. Roberto Sánchez",
        destinos: ["expociencias"],
        habilidades: ["React", "Firebase", "Flutter"],
        fecha: "2025-01-10",
        ultimaActualizacion: "2025-01-20"
    },
    {
        id: 3,
        titulo: "Plataforma de Tutorías en Línea",
        descripcion: "Sistema para conectar estudiantes con tutores, incluye videollamadas, pizarra digital compartida y sistema de pagos.",
        estado: "completada",
        autor: "Luis Hernández",
        destinos: ["practica"],
        habilidades: ["Python", "Django", "WebRTC"],
        fecha: "2024-12-01"
    },
    {
        id: 4,
        titulo: "Control de Asistencia con Reconocimiento Facial",
        descripcion: "Sistema de control de asistencia usando reconocimiento facial para empresas pequeñas.",
        estado: "abandonada",
        autor: "Pedro Martínez",
        destinos: ["otro"],
        habilidades: ["Python", "OpenCV", "TensorFlow"],
        fecha: "2024-11-15"
    }
];

// Estado de la aplicación
let ideasActuales = [...ideasEjemplo];
let filtroEstado = '';
let filtroDestino = '';
let busqueda = '';

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    cargarIdeas();
    configurarFiltros();
});

// Cargar y mostrar ideas
function cargarIdeas() {
    const grid = document.getElementById('ideasGrid');
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');

    // Simular carga
    loadingState.classList.remove('hidden');
    
    setTimeout(() => {
        loadingState.classList.add('hidden');
        
        const ideasFiltradas = filtrarIdeas();
        
        if (ideasFiltradas.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            mostrarIdeas(ideasFiltradas);
        }
    }, 500);
}

// Filtrar ideas según criterios
function filtrarIdeas() {
    return ideasActuales.filter(idea => {
        const cumpleEstado = !filtroEstado || idea.estado === filtroEstado;
        const cumpleDestino = !filtroDestino || idea.destinos.includes(filtroDestino);
        const cumpleBusqueda = !busqueda || 
            idea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            idea.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        
        return cumpleEstado && cumpleDestino && cumpleBusqueda;
    });
}

// Mostrar ideas en el grid
function mostrarIdeas(ideas) {
    const grid = document.getElementById('ideasGrid');
    
    grid.innerHTML = ideas.map(idea => crearTarjetaIdea(idea)).join('');
    
    // Agregar event listeners a las tarjetas
    document.querySelectorAll('.idea-card').forEach(card => {
        card.addEventListener('click', function() {
            const ideaId = this.dataset.ideaId;
            verDetalleIdea(ideaId);
        });
    });
}

// Crear HTML de tarjeta de idea
function crearTarjetaIdea(idea) {
    const estadoInfo = obtenerInfoEstado(idea.estado);
    
    return `
        <div class="idea-card" data-idea-id="${idea.id}">
            <div class="flex justify-between items-start mb-3">
                <h3 class="idea-title flex-1">${idea.titulo}</h3>
                <span class="estado-badge estado-${idea.estado}">
                    ${estadoInfo.icono} ${estadoInfo.texto}
                </span>
            </div>
            
            <p class="idea-description">${idea.descripcion}</p>
            
            <div class="idea-meta">
                ${idea.destinos.map(d => `<span class="badge badge-primary">${obtenerNombreDestino(d)}</span>`).join('')}
                ${idea.habilidades.slice(0, 3).map(h => `<span class="badge">${h}</span>`).join('')}
            </div>
            
            ${idea.estado === 'en-desarrollo' ? `
                <div class="bg-blue-50 p-3 rounded-lg mb-3 text-sm">
                    <p class="font-semibold text-blue-900">En desarrollo por:</p>
                    <p class="text-blue-700">${idea.equipo.join(', ')}</p>
                    ${idea.profesorAsesor ? `<p class="text-blue-600">Asesor: ${idea.profesorAsesor}</p>` : ''}
                </div>
            ` : ''}
            
            <div class="idea-footer">
                <span class="idea-author">Por ${idea.autor}</span>
                <span class="text-sm text-gray-500">${formatearFecha(idea.fecha)}</span>
            </div>
        </div>
    `;
}

// Obtener información del estado
function obtenerInfoEstado(estado) {
    const estados = {
        'disponible': { icono: '🟢', texto: 'Disponible' },
        'en-desarrollo': { icono: '🔵', texto: 'En Desarrollo' },
        'completada': { icono: '✅', texto: 'Completada' },
        'abandonada': { icono: '⚫', texto: 'Abandonada' },
        'pendiente': { icono: '🟡', texto: 'Pendiente' }
    };
    return estados[estado] || { icono: '❓', texto: 'Desconocido' };
}

// Obtener nombre del destino
function obtenerNombreDestino(destino) {
    const destinos = {
        'innovatec': 'Innovatec',
        'expociencias': 'Expociencias',
        'gps': 'GPS',
        'otro': 'Otro evento',
        'practica': 'Práctica'
    };
    return destinos[destino] || destino;
}

// Formatear fecha
function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Configurar filtros
function configurarFiltros() {
    const searchInput = document.getElementById('searchInput');
    const filterEstado = document.getElementById('filterEstado');
    const filterDestino = document.getElementById('filterDestino');
    
    searchInput.addEventListener('input', function() {
        busqueda = this.value;
        cargarIdeas();
    });
    
    filterEstado.addEventListener('change', function() {
        filtroEstado = this.value;
        cargarIdeas();
    });
    
    filterDestino.addEventListener('change', function() {
        filtroDestino = this.value;
        cargarIdeas();
    });
}

// Ver detalle de idea
function verDetalleIdea(ideaId) {
    window.location.href = `idea-detalle.html?id=${ideaId}`;
}
