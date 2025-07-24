// Funcionalidades del sitio web de Café Registrado

// Variables globales
let cartCount = 0;
let cartItems = [];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    initializeNavigation();
    initializeProductCards();
    initializeScrollEffects();
    initializeNewsletter();
});

// Funcionalidades del carrito
function initializeCart() {
    const cartButtons = document.querySelectorAll('.btn-primary');
    
    cartButtons.forEach(button => {
        if (button.textContent.includes('Agregar al Carrito')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(this);
            });
        }
    });
}

function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    const productImage = productCard.querySelector('.product-img').src;
    
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        id: Date.now()
    };
    
    cartItems.push(product);
    cartCount++;
    updateCartDisplay();
    showCartNotification(productName);
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'inline' : 'none';
    }
}

function showCartNotification(productName) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>✅ ${productName} agregado al carrito</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navegación móvil
function initializeNavigation() {
    // Botón de menú móvil (para implementar en el futuro)
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    // Detectar scroll para header sticky
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos en las tarjetas de productos
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card, .category-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Efecto parallax ligero en las imágenes
    const images = document.querySelectorAll('.product-img, .category-img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Efectos de scroll y animaciones
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .hero-text, .about-text');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Agregar estilos CSS dinámicamente para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .category-card, .product-card, .hero-text, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);
}

// Newsletter
function initializeNewsletter() {
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNewsletterSuccess();
                this.reset();
            } else {
                showNewsletterError();
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterSuccess() {
    showNotification('¡Gracias por suscribirte! Recibirás nuestras novedades.', 'success');
}

function showNewsletterError() {
    showNotification('Por favor, ingresa un email válido.', 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const backgroundColor = type === 'success' ? '#10B981' : '#EF4444';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Búsqueda (funcionalidad básica)
function initializeSearch() {
    const searchButton = document.querySelector('.search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = prompt('¿Qué estás buscando?');
            if (searchTerm) {
                // Aquí se implementaría la lógica de búsqueda
                alert(`Buscando: ${searchTerm}`);
            }
        });
    }
}

// Utilidades
function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
}

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

// Inicializar búsqueda
document.addEventListener('DOMContentLoaded', initializeSearch);

// Analytics simulado
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Aquí se integraría con Google Analytics o similar
}

// Lazy loading para imágenes
function initializeLazyLoading() {
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

// Video functionality
function playVideo() {
    const overlay = document.querySelector('.video-overlay');
    const iframe = document.querySelector('.video-wrapper iframe');
    
    if (overlay && iframe) {
        // Ocultar overlay
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
        
        // Agregar parámetro autoplay al iframe
        const currentSrc = iframe.src;
        if (currentSrc.includes('vimeo.com')) {
            iframe.src = currentSrc.includes('?') ? 
                currentSrc + '&autoplay=1' : 
                currentSrc + '?autoplay=1';
        } else if (currentSrc.includes('youtube.com') || currentSrc.includes('youtu.be')) {
            iframe.src = currentSrc.includes('?') ? 
                currentSrc + '&autoplay=1' : 
                currentSrc + '?autoplay=1';
        }
        
        // Tracking del evento
        trackEvent('Video Play', { video: 'Proceso Café Registrado' });
    }
}

// Inicializar video cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const videoOverlay = document.querySelector('.video-overlay');
    if (videoOverlay) {
        videoOverlay.addEventListener('click', playVideo);
    }
});

// Exportar funciones para uso global
window.CafeRegistrado = {
    addToCart,
    updateCartDisplay,
    trackEvent,
    formatPrice,
    playVideo
}; 