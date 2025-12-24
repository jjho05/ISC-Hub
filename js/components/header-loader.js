/**
 * Header and Footer Component Loader
 * Loads header and footer HTML into pages
 */

// Detect if we're in admin folder
const isInAdminFolder = window.location.pathname.includes('/admin/');
const componentsPath = isInAdminFolder ? '../components/' : 'components/';

// Load Header
fetch(componentsPath + 'header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;
        initializeHeader();
    })
    .catch(error => console.error('Error loading header:', error));

// Load Footer
fetch(componentsPath + 'footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    })
    .catch(error => console.error('Error loading footer:', error));

/**
 * Initialize Header Functionality
 */
function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuToggle?.addEventListener('click', () => {
        mobileMenu.classList.add('show');
    });

    mobileMenuClose?.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
    });

    // User dropdown toggle
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.getElementById('userMenu');

    userDropdown?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        userMenu?.classList.remove('show');
    });

    // Check if user is logged in (placeholder - will be replaced with Firebase auth)
    checkUserAuth();
}

/**
 * Check User Authentication Status
 * TODO: Replace with actual Firebase authentication
 */
function checkUserAuth() {
    // Placeholder: Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole') || 'alumno';
    const userName = localStorage.getItem('userName') || 'Usuario';

    if (isLoggedIn) {
        // Update user avatar with first letter of name
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.textContent = userName.charAt(0).toUpperCase();
        }

        // Show admin link if user is admin
        if (userRole === 'admin') {
            const adminLink = document.getElementById('adminLink');
            const adminLinkMobile = document.getElementById('adminLinkMobile');
            const adminDivider = document.getElementById('adminDivider');

            if (adminLink) adminLink.style.display = 'block';
            if (adminLinkMobile) adminLinkMobile.style.display = 'block';
            if (adminDivider) adminDivider.style.display = 'block';
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutBtnMobile = document.getElementById('logoutBtnMobile');

        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });

        logoutBtnMobile?.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        // Redirect to login if not logged in
        // For now, we'll just set a default logged in state for development
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Estudiante ISC');
        localStorage.setItem('userRole', 'alumno');
        location.reload();
    }
}

/**
 * Logout Function
 */
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    const loginPath = isInAdminFolder ? '../login.html' : 'login.html';
    window.location.href = loginPath;
}
