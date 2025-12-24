// Fix header links for banco-ideas subfolder
function fixHeaderLinks(levelsUp = 1) {
    const prefix = '../'.repeat(levelsUp);

    // Fix relative links in header
    const headerLinks = document.querySelectorAll('#header-container a[data-page], #header-container a[data-page-mobile]');
    headerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('banco-ideas')) {
            link.setAttribute('href', prefix + href);
        }
    });

    // Fix banco-ideas link to be relative
    const bancoIdeasLinks = document.querySelectorAll('#header-container a[href*="banco-ideas/index.html"]');
    bancoIdeasLinks.forEach(link => {
        if (levelsUp === 1) {
            link.setAttribute('href', 'index.html');
        } else {
            link.setAttribute('href', '../index.html');
        }
    });
}
