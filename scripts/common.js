// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const isExpanded = navLinks.classList.contains('active');
    
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }
}); 