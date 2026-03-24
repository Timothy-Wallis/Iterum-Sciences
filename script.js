// Constants
const MOBILE_BREAKPOINT = 768;

// Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const menuBtn = document.getElementById('menuBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Determine if we're on mobile
function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

// Open sidebar
function openSidebar() {
    if (isMobile()) {
        sidebar.classList.add('mobile-open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
    } else {
        document.body.classList.remove('sidebar-collapsed');
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}

// Close sidebar
function closeSidebar() {
    if (isMobile()) {
        sidebar.classList.remove('mobile-open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
    } else {
        document.body.classList.add('sidebar-collapsed');
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

// Toggle sidebar
function toggleSidebar() {
    if (isMobile()) {
        if (sidebar.classList.contains('mobile-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    } else {
        if (document.body.classList.contains('sidebar-collapsed')) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
    // Sidebar always starts closed on all devices
    document.body.classList.add('sidebar-collapsed');
    menuBtn.setAttribute('aria-expanded', 'false');
}

// Close sidebar on overlay click (mobile)
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// On resize: clean up mobile-specific classes
window.addEventListener('resize', () => {
    if (!isMobile()) {
        sidebar.classList.remove('mobile-open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    } else {
        document.body.classList.remove('sidebar-collapsed');
    }
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Get the target section
        const targetSection = document.querySelector(href);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close sidebar on mobile after clicking a link
        if (isMobile()) {
            closeSidebar();
        }
    });
});

const redirectLinks = document.querySelectorAll('.redirect-link');

redirectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        window.open(url, '_blank');
    });
});

// Update Active Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and tool cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .tool-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
