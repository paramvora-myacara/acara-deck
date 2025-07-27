// Global state
let currentPage = 'home';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('Initializing ACARA CAP application...');
    
    // Initialize navigation
    setupMainCardNavigation();
    setupBackNavigation();
    setupContactButton();
    setupCardEffects();
    
    // Show home page
    showPage('home');
    
    console.log('Application initialized successfully');
}

// Show specific page
function showPage(pageId) {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Determine target page ID
    let targetPageId;
    if (pageId === 'home') {
        targetPageId = 'home-page';
    } else {
        targetPageId = pageId + '-page';
    }
    
    // Show target page
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('Successfully navigated to:', targetPageId);
    } else {
        console.error('Page not found:', targetPageId);
    }
}

// Setup main card navigation
function setupMainCardNavigation() {
    console.log('Setting up main card navigation...');
    
    const mainCards = document.querySelectorAll('.main-card');
    console.log('Found main cards:', mainCards.length);
    
    mainCards.forEach((card, index) => {
        const targetPage = card.getAttribute('data-page');
        const cardTitle = card.querySelector('.card-title')?.textContent || 'Unknown';
        
        console.log(`Card ${index + 1} (${cardTitle}) -> ${targetPage}`);
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const page = this.getAttribute('data-page');
            console.log(`Card clicked: ${cardTitle} -> ${page}`);
            
            if (page) {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Navigate to page
                showPage(page);
            }
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                if (page) {
                    console.log(`Keyboard navigation: ${cardTitle} -> ${page}`);
                    showPage(page);
                }
            }
        });
        
        // Make accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Navigate to ${cardTitle} section`);
    });
    
    console.log('Main card navigation setup complete');
}

// Setup back navigation
function setupBackNavigation() {
    console.log('Setting up back navigation...');
    
    const backButtons = document.querySelectorAll('.back-to-home');
    console.log('Found back buttons:', backButtons.length);
    
    backButtons.forEach((button, index) => {
        console.log(`Back button ${index + 1} found`);
        
        // Add click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Back button clicked -> home');
            showPage('home');
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Keyboard back navigation -> home');
                showPage('home');
            }
        });
    });
    
    console.log('Back navigation setup complete');
}

// Setup contact button
function setupContactButton() {
    console.log('Setting up contact button...');
    
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Contact button clicked');
            openContactModal();
        });
        
        console.log('Contact button setup complete');
    } else {
        console.log('No contact button found');
    }
}

// Open contact modal
function openContactModal() {
    console.log('Opening contact modal...');
    
    const modal = createContactModal();
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
        
        // Focus first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }, 10);
}

// Create contact modal
function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Contact ACARA CAP</h3>
                <button class="modal-close" type="button" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Interested in our $2.5M Series A opportunity?</p>
                <form class="contact-form">
                    <div class="form-group">
                        <label class="form-label" for="contact-name">Name *</label>
                        <input type="text" id="contact-name" name="contact-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-email">Email *</label>
                        <input type="email" id="contact-email" name="contact-email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-company">Company</label>
                        <input type="text" id="contact-company" name="contact-company" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-message">Message</label>
                        <textarea id="contact-message" name="contact-message" class="form-control" rows="4" placeholder="Tell us about your investment interests..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn--primary">Send Message</button>
                        <button type="button" class="btn btn--secondary modal-cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.getElementById('modal-styles')) {
        const modalStyles = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .contact-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: translateY(-20px);
                transition: transform 0.3s ease;
                z-index: 1001;
            }
            
            .contact-modal.show .modal-content {
                transform: translateY(0);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--color-primary);
                font-size: var(--font-size-2xl);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-3xl);
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-sm);
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: var(--color-secondary);
                color: var(--color-text);
            }
            
            .modal-body {
                padding: var(--space-24);
            }
            
            .contact-form .form-actions {
                display: flex;
                gap: var(--space-12);
                margin-top: var(--space-24);
            }
            
            .contact-form .form-actions .btn {
                flex: 1;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Set up modal event listeners
    setTimeout(() => {
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const backdrop = modal.querySelector('.modal-backdrop');
        const form = modal.querySelector('.contact-form');
        
        // Close handlers
        [closeBtn, cancelBtn, backdrop].forEach(element => {
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal(modal);
                });
            }
        });
        
        // Form handler
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handleFormSubmission(form, modal);
            });
        }
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }, 50);
    
    return modal;
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Handle form submission
function handleFormSubmission(form, modal) {
    const formData = {
        name: form.querySelector('#contact-name').value,
        email: form.querySelector('#contact-email').value,
        company: form.querySelector('#contact-company').value,
        message: form.querySelector('#contact-message').value
    };
    
    // Validation
    if (!formData.name || !formData.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal(modal);
        showNotification('Thanks for your interest! We\'ll be in touch soon.', 'success');
        console.log('Contact form submitted:', formData);
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Add notification styles if not present
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = `
            .notification {
                position: fixed;
                top: var(--space-24);
                right: var(--space-24);
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-base);
                padding: var(--space-16);
                box-shadow: var(--shadow-lg);
                z-index: 1100;
                max-width: 400px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification--success {
                border-left: 4px solid var(--color-success);
                background: var(--color-bg-3);
            }
            
            .notification--error {
                border-left: 4px solid var(--color-error);
                background: var(--color-bg-4);
            }
            
            .notification--info {
                border-left: 4px solid var(--color-info);
                background: var(--color-bg-1);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show and auto-hide
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Setup card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.style.transform !== 'translateY(-4px)') {
                card.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.style.transform === 'translateY(-4px)') {
                card.style.transform = '';
            }
        });
    });
}