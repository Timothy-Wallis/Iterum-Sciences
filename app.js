// ── Theme & Palette management ────────────────────────────────────────────────
// Applies saved preferences (must also run inline in <head> to prevent FOUC)
function applyPreferences() {
    const theme   = localStorage.getItem('theme');
    const palette = localStorage.getItem('palette');
    if (theme)   document.documentElement.setAttribute('data-theme',   theme);
    else if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.documentElement.setAttribute('data-theme', 'dark');
    if (palette) document.documentElement.setAttribute('data-palette', palette);
}

function updateThemeControls() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Header moon/sun button (both pages)
    const headerBtn = document.getElementById('themeBtn');
    if (headerBtn) {
        const icon = headerBtn.querySelector('.theme-icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
        headerBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Settings toggle checkbox (account page)
    const settingsToggle = document.getElementById('darkModeToggle');
    if (settingsToggle) settingsToggle.checked = isDark;
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeControls();
}

function setPalette(palette) {
    document.documentElement.setAttribute('data-palette', palette);
    localStorage.setItem('palette', palette);
    syncActiveSwatch(palette);
}

function syncActiveSwatch(palette) {
    const current = palette || document.documentElement.getAttribute('data-palette') || 'blue';
    document.querySelectorAll('.palette-swatch').forEach(s =>
        s.classList.toggle('active', s.dataset.palette === current)
    );
}

// ── Wire up controls after DOM is ready ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Header dark-mode button
    const headerBtn = document.getElementById('themeBtn');
    if (headerBtn) headerBtn.addEventListener('click', toggleTheme);

    // Settings dark-mode checkbox
    const settingsToggle = document.getElementById('darkModeToggle');
    if (settingsToggle) settingsToggle.addEventListener('change', toggleTheme);

    // Palette swatches
    document.querySelectorAll('.palette-swatch').forEach(s =>
        s.addEventListener('click', () => setPalette(s.dataset.palette))
    );

    // Sync initial state
    updateThemeControls();
    syncActiveSwatch();
});
