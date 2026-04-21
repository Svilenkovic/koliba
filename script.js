// ===================================
// Koliba Šablon - Demo Template
// Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initCounters();
    updateActiveNavLink();
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled past 50px
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.sadrzaj-card, .benefit, .season-card, .kontakt-item, .showcase-card, .section-header, .o-nama-stats .stat, .galerija-item, .hero-feature'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${(index % 6) * 0.1}s, transform 0.6s ease ${(index % 6) * 0.1}s`;
        observer.observe(el);
    });
}

// ===================================
// Form Handler
// ===================================
function initFormHandler() {
    const form = document.getElementById('kontaktForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validate dates
        const dolazak = document.getElementById('dolazak').value;
        const odlazak = document.getElementById('odlazak').value;
        
        if (new Date(dolazak) >= new Date(odlazak)) {
            showNotification('Datum odlaska mora biti posle datuma dolaska.', 'error');
            return;
        }
        
        if (new Date(dolazak) < new Date()) {
            showNotification('Datum dolaska ne može biti u prošlosti.', 'error');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Slanje...</span>';
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual endpoint)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showNotification('Uspešno ste poslali upit za rezervaciju! Javićemo vam se uskoro. 🐝', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            showNotification('Došlo je do greške. Molimo pokušajte ponovo.', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// ===================================
// Date Pickers - Set minimum date
// ===================================
function initDatePickers() {
    const dolazak = document.getElementById('dolazak');
    const odlazak = document.getElementById('odlazak');
    
    if (!dolazak || !odlazak) return;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dolazak.min = today;
    odlazak.min = today;
    
    // Update odlazak minimum when dolazak changes
    dolazak.addEventListener('change', function() {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        odlazak.min = nextDay.toISOString().split('T')[0];
        
        if (odlazak.value && new Date(odlazak.value) <= new Date(this.value)) {
            odlazak.value = '';
        }
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    const bgColor = type === 'success' ? '#1A2614' : '#2a1a1a';
    const borderColor = type === 'success' ? 'rgba(212, 168, 83, 0.4)' : 'rgba(255, 100, 100, 0.3)';
    const iconBg = type === 'success' ? '#D4A853' : '#ff6464';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        border-radius: 12px;
        color: #F5F1E8;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .notification-icon {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${iconBg};
            color: #0F1A0A;
            border-radius: 50%;
            font-weight: bold;
            flex-shrink: 0;
        }
        .notification-close {
            background: none;
            border: none;
            color: #6B7A5A;
            font-size: 1.4rem;
            cursor: pointer;
            padding: 0 0 0 12px;
            margin-left: auto;
            line-height: 1;
        }
        .notification-close:hover {
            color: #F5F1E8;
        }
    `;
    document.head.appendChild(style);
    
    // Append to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===================================
// Active Navigation Link
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Parallax Effect for Hero
// ===================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-leaf, .floating-bee');
    
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            
            // Parallax for floating elements
            floatingElements.forEach((el, index) => {
                const speed = 0.2 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}

// ===================================
// Counter Animation
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;
                
                // Check for different formats
                if (text.includes('%')) {
                    const number = parseInt(text);
                    animateNumber(counter, number, '%');
                } else if (text.includes('+')) {
                    const number = parseInt(text);
                    animateNumber(counter, number, '+');
                } else if (text.includes('m')) {
                    const number = parseInt(text);
                    animateNumber(counter, number, 'm');
                }
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateNumber(element, target, suffix) {
    let current = 0;
    const increment = target / 40;
    const duration = 1500;
    const stepTime = duration / 40;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, stepTime);
}

// ===================================
// Honeycomb Hover Effect
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hexagons = document.querySelectorAll('.hex');
    
    hexagons.forEach(hex => {
        hex.addEventListener('mouseenter', function() {
            // Add glow effect to neighboring hexagons
            const index = Array.from(hexagons).indexOf(hex);
            hexagons.forEach((h, i) => {
                if (Math.abs(i - index) <= 1) {
                    h.style.boxShadow = '0 0 30px rgba(212, 168, 83, 0.4)';
                }
            });
        });
        
        hex.addEventListener('mouseleave', function() {
            hexagons.forEach(h => {
                h.style.boxShadow = 'none';
            });
        });
    });
});

// ===================================
// Image Gallery Lightbox (Optional)
// ===================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.galerija-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Future implementation: Open lightbox with full image
            console.log('Gallery item clicked');
        });
    });
}

// ===================================
// Lazy Loading Images (When real images are added)
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Season Cards Animation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const seasonCards = document.querySelectorAll('.season-card');
    
    seasonCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===================================
// Smooth Reveal for Statistics
// ===================================
function revealStats() {
    const stats = document.querySelectorAll('.o-nama-stats .stat');
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===================================
// Mobile Touch Enhancements
// ===================================
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback to cards
    const cards = document.querySelectorAll('.sadrzaj-card, .season-card, .showcase-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🐝 Koliba Pčelica 1', 'font-size: 24px; font-weight: bold; color: #D4A853;');
console.log('%cDobrodošli u raj u srcu prirode!', 'font-size: 14px; color: #B8C4A8;');
