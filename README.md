# ISC-Hub

Plataforma web para compartir recursos educativos de Ingeniería en Sistemas Computacionales del ITCM.

## 🚀 Características

- **Repositorio de Recursos**: Comparte apuntes, códigos, proyectos y material de estudio
- **Banco de Ideas**: Propón y adopta ideas de proyectos basados en necesidades reales
- **Sistema de Autenticación**: Registro y login de usuarios
- **Filtros Avanzados**: Busca recursos por materia, semestre, tipo y más
- **Diseño Responsive**: Funciona perfectamente en móviles, tablets y escritorio

## 📁 Estructura del Proyecto

```
ISC-Hub/
├── index.html              # Página principal
├── subir-recurso.html      # Formulario para subir recursos
├── banco-ideas/            # Sistema de banco de ideas
│   ├── index.html          # Galería de ideas
│   ├── enviar-idea.html    # Formulario de ideas
│   ├── mis-ideas.html      # Gestión personal
│   ├── idea-detalle.html   # Vista detallada
│   └── admin/              # Panel administrativo
├── components/             # Componentes reutilizables
├── css/                    # Estilos
├── js/                     # JavaScript
└── assets/                 # Recursos estáticos
```

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: FormSubmit.co para notificaciones por correo
- **Hosting**: GitHub Pages compatible

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
```bash
git clone https://github.com/jjho05/ISC-Hub.git
cd ISC-Hub
```

2. **Abrir con Live Server**:
   - Usa la extensión Live Server de VS Code
   - O cualquier servidor local (Python, Node, etc.)

3. **Configurar correos** (opcional):
   - Edita `banco-ideas/enviar-idea.html`
   - Reemplaza `PON_TU_EMAIL_ADMIN_AQUI` con tu correo

## 📧 Sistema de Notificaciones

El Banco de Ideas usa **FormSubmit.co** para enviar notificaciones por correo:
- Cuando se propone una nueva idea
- Cuando una idea es aprobada/rechazada
- Cuando alguien adopta una idea

## 🎨 Características del Banco de Ideas

### Para Usuarios
- ✅ Proponer ideas con protocolo completo
- ✅ Ver ideas disponibles con filtros
- ✅ Adoptar ideas para desarrollar
- ✅ Gestionar "Mis Ideas"

### Para Administradores
- ✅ Dashboard con estadísticas
- ✅ Revisar y aprobar/rechazar ideas
- ✅ Gestionar estados de ideas
- ✅ Configurar tiempo de abandono automático

### Estados de Ideas
- 🟡 **Pendiente**: En revisión por admin
- 🟢 **Disponible**: Lista para ser adoptada
- 🔵 **En Desarrollo**: Siendo trabajada por un equipo
- ✅ **Completada**: Proyecto finalizado
- ⚫ **Abandonada**: Sin actualizaciones por tiempo prolongado
- 🔴 **Rechazada**: No aprobada por admin

## 🌐 Demo

Visita: [https://jjho05.github.io/ISC-Hub](https://jjho05.github.io/ISC-Hub)

## 👨‍💻 Autor

**Jesús Olvera**
- GitHub: [@jjho05](https://github.com/jjho05)
- Email: jjho.reivaj05@gmail.com

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Instituto Tecnológico de Ciudad Madero**  
Ingeniería en Sistemas Computacionales  
© 2025
