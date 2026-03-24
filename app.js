(function () {
    var THEME_KEY = 'theme';
    var PALETTE_KEY = 'palette';

    function applyPreferences() {
        try {
            var theme = localStorage.getItem(THEME_KEY);
            var palette = localStorage.getItem(PALETTE_KEY);
            if (theme) {
                document.documentElement.setAttribute('data-theme', theme);
            } else if (!document.documentElement.hasAttribute('data-theme')) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
            }
            if (palette) {
                document.documentElement.setAttribute('data-palette', palette);
            }
        } catch (e) {}
    }

    function toggleTheme() {
        try {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            updateThemeControls();
        } catch (e) {}
    }

    function setPalette(name) {
        try {
            document.documentElement.setAttribute('data-palette', name);
            localStorage.setItem(PALETTE_KEY, name);
            updatePaletteControls(name);
        } catch (e) {}
    }

    function updateThemeControls() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = isDark ? '☀️' : '🌙';
            themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
        var themeCheckbox = document.getElementById('theme-checkbox');
        if (themeCheckbox) {
            themeCheckbox.checked = isDark;
        }
    }

    function updatePaletteControls(palette) {
        document.querySelectorAll('[data-palette-btn]').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-palette-btn') === palette);
        });
    }

    // Apply preferences immediately (also handled by anti-FOUC script in <head>)
    applyPreferences();

    // Expose public API
    window.toggleTheme = toggleTheme;
    window.setPalette = setPalette;

    // Sync UI controls once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        applyPreferences();
        var palette = '';
        try { palette = localStorage.getItem(PALETTE_KEY) || ''; } catch (e) {}
        updateThemeControls();
        updatePaletteControls(palette);
    });
}());
