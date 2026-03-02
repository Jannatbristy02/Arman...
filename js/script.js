// SEO Portfolio Website - Custom JavaScript

// ===== DOM Content Loaded Event =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
    initNavbarScroll();
    initNewsletterForm();
    initContactForm();
    initActiveNavigation();
});

// ===== Smooth Scrolling =====
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.service-card, .benefit-item, .profile-card, .tools-list, .workflow-images img, .illustration img'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== Navbar Scroll Effect =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== Form Validation =====
function initFormValidation() {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Add validation styles
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

// ===== Field Validation =====
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove previous validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if required and empty
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Add validation classes
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
    }
    
    return isValid;
}

// ===== Newsletter Form =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Validate email
            if (!validateField(email)) {
                showMessage(newsletterForm, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                email.value = '';
                email.classList.remove('is-valid', 'is-invalid');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showMessage(newsletterForm, 'Thank you for subscribing! Check your email for confirmation.', 'success');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    hideMessage(newsletterForm);
                }, 5000);
            }, 2000);
        });
    }
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Validate all fields
            let isValid = true;
            [name, email, message].forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showMessage(contactForm, 'Please fill in all required fields correctly', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                [name, email, message].forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showMessage(contactForm, 'Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    hideMessage(contactForm);
                }, 5000);
            }, 2000);
        });
    }
}

// ===== Show Message =====
function showMessage(form, message, type) {
    // Remove existing messages
    hideMessage(form);
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Show message with animation
    setTimeout(() => {
        messageDiv.style.display = 'block';
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }, 10);
}

// ===== Hide Message =====
function hideMessage(form) {
    const existingMessage = form.parentNode.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.style.opacity = '0';
        existingMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            existingMessage.remove();
        }, 300);
    }
}

// ===== Active Navigation Highlight =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    function updateActiveNav() {
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
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on load
    updateActiveNav();
}

// ===== Mobile Menu Close on Click =====
function initMobileMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('collapsed');
            }
        });
    });
}

// ===== Initialize mobile menu =====
initMobileMenu();

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== Lazy Loading for Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ===== Console Welcome Message =====
console.log('%c🚀 SEO Portfolio Website', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript', 'color: #FF9800; font-size: 14px;');
