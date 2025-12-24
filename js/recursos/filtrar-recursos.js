/**
 * Resource Filtering
 * Handles filtering and searching of resources
 */

/**
 * Initialize Filters
 */
function initializeFilters() {
    // Materia filters
    const materiaFilters = document.querySelectorAll('#materiaFilters input[type="checkbox"]');
    materiaFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Tipo filters
    const tipoFilters = document.querySelectorAll('#tipoFilters input[type="checkbox"]');
    tipoFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Semestre filter
    const semestreFilter = document.getElementById('semestreFilter');
    semestreFilter?.addEventListener('change', applyFilters);

    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    sortFilter?.addEventListener('change', applyFilters);

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    clearFiltersBtn?.addEventListener('click', clearFilters);

    // Search input (from header)
    const searchInput = document.querySelector('.header-search-input');
    let searchTimeout;
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300); // Debounce search
    });
}

/**
 * Apply Filters
 */
function applyFilters() {
    let filtered = [...sampleResources];

    // Get selected materias
    const selectedMaterias = getSelectedCheckboxes('#materiaFilters');
    if (selectedMaterias.length > 0 && !selectedMaterias.includes('todas')) {
        filtered = filtered.filter(resource => selectedMaterias.includes(resource.materia));
    }

    // Get selected tipos
    const selectedTipos = getSelectedCheckboxes('#tipoFilters');
    if (selectedTipos.length > 0 && !selectedTipos.includes('todos')) {
        filtered = filtered.filter(resource => selectedTipos.includes(resource.tipoContenido));
    }

    // Get selected semestre
    const semestreFilter = document.getElementById('semestreFilter');
    const selectedSemestre = semestreFilter?.value;
    if (selectedSemestre && selectedSemestre !== 'todos') {
        filtered = filtered.filter(resource => resource.semestre === parseInt(selectedSemestre));
    }

    // Apply search
    const searchInput = document.querySelector('.header-search-input');
    const searchQuery = searchInput?.value.toLowerCase().trim();
    if (searchQuery) {
        filtered = filtered.filter(resource => {
            return resource.titulo.toLowerCase().includes(searchQuery) ||
                resource.descripcion.toLowerCase().includes(searchQuery) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
                resource.autorNombre.toLowerCase().includes(searchQuery);
        });
    }

    // Apply sorting
    const sortFilter = document.getElementById('sortFilter');
    const sortBy = sortFilter?.value || 'recientes';
    filtered = sortResources(filtered, sortBy);

    // Update display
    currentResources = filtered;
    currentPage = 1; // Reset to first page
    displayResources(currentResources);
    updateResourceCount(currentResources.length);
}

/**
 * Get Selected Checkboxes
 */
function getSelectedCheckboxes(selector) {
    const checkboxes = document.querySelectorAll(`${selector} input[type="checkbox"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Sort Resources
 */
function sortResources(resources, sortBy) {
    const sorted = [...resources];

    switch (sortBy) {
        case 'recientes':
            return sorted.sort((a, b) => b.fechaSubida - a.fechaSubida);

        case 'populares':
            return sorted.sort((a, b) => b.descargas - a.descargas);

        case 'mejor-calificados':
            return sorted.sort((a, b) => {
                if (b.calificacionPromedio === a.calificacionPromedio) {
                    return b.totalCalificaciones - a.totalCalificaciones;
                }
                return b.calificacionPromedio - a.calificacionPromedio;
            });

        case 'mas-descargados':
            return sorted.sort((a, b) => b.descargas - a.descargas);

        default:
            return sorted;
    }
}

/**
 * Clear All Filters
 */
function clearFilters() {
    // Uncheck all checkboxes except "todas" and "todos"
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(cb => {
        if (cb.value === 'todas' || cb.value === 'todos') {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });

    // Reset selects
    const semestreFilter = document.getElementById('semestreFilter');
    if (semestreFilter) semestreFilter.value = 'todos';

    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) sortFilter.value = 'recientes';

    // Clear search
    const searchInput = document.querySelector('.header-search-input');
    if (searchInput) searchInput.value = '';

    // Reapply filters (will show all resources)
    applyFilters();
}

/**
 * Handle "Todas" and "Todos" checkboxes
 */
function setupExclusiveCheckboxes() {
    // Materia filters
    const todasCheckbox = document.querySelector('#materiaFilters input[value="todas"]');
    const materiaCheckboxes = document.querySelectorAll('#materiaFilters input[type="checkbox"]:not([value="todas"])');

    todasCheckbox?.addEventListener('change', (e) => {
        if (e.target.checked) {
            materiaCheckboxes.forEach(cb => cb.checked = false);
        }
    });

    materiaCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked && todasCheckbox) {
                todasCheckbox.checked = false;
            }
            // If no checkboxes are checked, check "todas"
            const anyChecked = Array.from(materiaCheckboxes).some(checkbox => checkbox.checked);
            if (!anyChecked && todasCheckbox) {
                todasCheckbox.checked = true;
            }
        });
    });

    // Tipo filters
    const todosCheckbox = document.querySelector('#tipoFilters input[value="todos"]');
    const tipoCheckboxes = document.querySelectorAll('#tipoFilters input[type="checkbox"]:not([value="todos"])');

    todosCheckbox?.addEventListener('change', (e) => {
        if (e.target.checked) {
            tipoCheckboxes.forEach(cb => cb.checked = false);
        }
    });

    tipoCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked && todosCheckbox) {
                todosCheckbox.checked = false;
            }
            // If no checkboxes are checked, check "todos"
            const anyChecked = Array.from(tipoCheckboxes).some(checkbox => checkbox.checked);
            if (!anyChecked && todosCheckbox) {
                todosCheckbox.checked = true;
            }
        });
    });
}

// Initialize filters when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeFilters();
        setupExclusiveCheckboxes();
    });
} else {
    initializeFilters();
    setupExclusiveCheckboxes();
}
