// Enviar Idea - JavaScript con FormSubmit

document.getElementById('ideaForm').addEventListener('submit', function (e) {
    // Validar que haya al menos un objetivo específico
    const objetivos = document.querySelectorAll('.objetivo-input');
    let tieneObjetivos = false;
    objetivos.forEach(input => {
        if (input.value.trim()) tieneObjetivos = true;
    });

    if (!tieneObjetivos) {
        e.preventDefault();
        alert('Debes agregar al menos un objetivo específico');
        return;
    }

    // Validar que haya al menos un paso
    const pasos = document.querySelectorAll('.paso-input');
    let tienePasos = false;
    pasos.forEach(input => {
        if (input.value.trim()) tienePasos = true;
    });

    if (!tienePasos) {
        e.preventDefault();
        alert('Debes agregar al menos un paso propuesto');
        return;
    }

    // Validar que haya al menos una actividad en el cronograma
    const actividades = document.querySelectorAll('#cronogramaBody tr');
    let tieneActividades = false;
    actividades.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs[0] && inputs[0].value.trim()) tieneActividades = true;
    });

    if (!tieneActividades) {
        e.preventDefault();
        alert('Debes agregar al menos una actividad al cronograma');
        return;
    }

    // Si todo está bien, el formulario se enviará normalmente a FormSubmit
    // FormSubmit enviará un correo al admin con todos los datos
    console.log('Formulario válido, enviando a FormSubmit...');
});
