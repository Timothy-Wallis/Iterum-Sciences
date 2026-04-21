// ── Theme & Palette management ────────────────────────────────────────────────
// Applies saved preferences (must also run inline in <head> to prevent FOUC)
function applyPreferences() {
    const theme       = localStorage.getItem('theme');
    const palette     = localStorage.getItem('palette');
    if (theme)   document.documentElement.setAttribute('data-theme',   theme);
    else if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.documentElement.setAttribute('data-theme', 'dark');
    if (palette) document.documentElement.setAttribute('data-palette', palette);
    restoreCustomColorIfNeeded();
}

function updateThemeControls() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Header theme button aria-label (icons are CSS-driven via .theme-icon-light / .theme-icon-dark)
    const headerBtn = document.getElementById('themeBtn');
    if (headerBtn) {
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
    // Clear any custom inline color vars when switching to a named palette
    clearCustomColorVars();
    document.documentElement.setAttribute('data-palette', palette);
    localStorage.setItem('palette', palette);
    localStorage.removeItem('customColor');
    syncActiveSwatch(palette);
}

function syncActiveSwatch(palette) {
    const current = palette || document.documentElement.getAttribute('data-palette') || 'blue';
    document.querySelectorAll('.palette-swatch').forEach(s =>
        s.classList.toggle('active', s.dataset.palette === current)
    );
    // Sync custom color picker highlight
    const picker = document.getElementById('customColorPicker');
    if (picker) picker.classList.toggle('active', current === 'custom');
}

// ── Custom color picker helpers ───────────────────────────────────────────────
const CUSTOM_SECONDARY_LIGHTNESS_OFFSET = -15;
const CUSTOM_ACCENT_LIGHTNESS_OFFSET    =  10;
const CUSTOM_LIGHTNESS_MAX              =  95;

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            default: h = ((r - g) / d + 4) / 6;
        }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function applyCustomColorVars(hex) {
    const [h, s, l] = hexToHsl(hex);
    const secondary = hslToHex(h, s, Math.max(0, l + CUSTOM_SECONDARY_LIGHTNESS_OFFSET));
    const accent    = hslToHex(h, s, Math.min(CUSTOM_LIGHTNESS_MAX, l + CUSTOM_ACCENT_LIGHTNESS_OFFSET));
    const [r, g, b] = [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
    ];
    // Derive a complementary base background: very light tint of the custom color
    const bgBase = `hsl(${h}, ${Math.round(s * 0.4)}%, 90%)`;
    const root = document.documentElement;
    root.style.setProperty('--primary-color',   hex);
    root.style.setProperty('--secondary-color', secondary);
    root.style.setProperty('--accent-color',    accent);
    root.style.setProperty('--glass-tint',      `rgba(${r}, ${g}, ${b}, 0.22)`);
    root.style.setProperty('--glass-tint-hover',`rgba(${r}, ${g}, ${b}, 0.36)`);
    root.style.setProperty('--bg-base',         bgBase);
}

function clearCustomColorVars() {
    const root = document.documentElement;
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--secondary-color');
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--glass-tint');
    root.style.removeProperty('--glass-tint-hover');
    root.style.removeProperty('--bg-base');
}

function setCustomColor(hex) {
    applyCustomColorVars(hex);
    document.documentElement.setAttribute('data-palette', 'custom');
    localStorage.setItem('palette', 'custom');
    localStorage.setItem('customColor', hex);
    syncActiveSwatch('custom');
    const picker = document.getElementById('customColorPicker');
    if (picker) picker.value = hex;
}

function restoreCustomColorIfNeeded() {
    if (localStorage.getItem('palette') === 'custom') {
        const customColor = localStorage.getItem('customColor');
        if (customColor) applyCustomColorVars(customColor);
    }
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

    // Custom color picker
    const picker = document.getElementById('customColorPicker');
    if (picker) {
        const saved = localStorage.getItem('customColor');
        if (saved) picker.value = saved;
        picker.addEventListener('input', () => setCustomColor(picker.value));
    }

    // Restore custom color vars if palette was 'custom'
    restoreCustomColorIfNeeded();

    // Sync initial state
    updateThemeControls();
    syncActiveSwatch();
});

// ── Cross-tab / cross-page theme sync ────────────────────────────────────────
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        applyPreferences();
        updateThemeControls();
    } else if (e.key === 'palette' || e.key === 'customColor') {
        applyPreferences();
        restoreCustomColorIfNeeded();
        syncActiveSwatch();
    }
});
