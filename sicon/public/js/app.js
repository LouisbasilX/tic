// Enhanced interactivity for the MVC structure
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations
    initAnimations();
    
    // Add search functionality enhancements
    initSearch();
    
    // Add smooth scrolling
    initSmoothScroll();
    
    // Initialize analytics charts
    initCharts();

    // Initialize connection buttons
    initConnectionButtons();

    // Initialize filter handlers
    initFilterHandlers();
});

function initAnimations() {
    // Animate elements on scroll
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

    // Observe all student cards and stats
    document.querySelectorAll('.student-card, .bg-gradient-to-br').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initSearch() {
    const searchInput = document.querySelector('input[name="search"]');
    
    if (searchInput) {
        // Add debounced search
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                e.target.form.submit();
            }, 500);
        });
    }
}

function initFilterHandlers() {
    // Auto-submit form when filters change
    const filterSelects = document.querySelectorAll('select[name="department"], select[name="year"]');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            this.form.submit();
        });
    });
}

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

function initCharts() {
    // Animate progress bars
    document.querySelectorAll('.bg-gradient-to-r').forEach(bar => {
        const width = bar.style.width;
        if (width && width !== '0%') {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        }
    });
}

function initConnectionButtons() {
    // Handle connect button clicks
    document.querySelectorAll('.connect-btn').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student-id');
            const originalText = this.innerHTML;
            
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connecting...';
            this.disabled = true;
            
            // Make API call to connect
            fetch(`/students/${studentId}/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.innerHTML = '<i class="fas fa-check mr-2"></i>Connected!';
                    this.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-green-600');
                    this.classList.add('bg-gray-400', 'cursor-not-allowed');
                    
                    // Show success message
                    showNotification(data.message, 'success');
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Connection error:', error);
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('Failed to connect. Please try again.', 'error');
            });
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check' :
                type === 'error' ? 'fa-exclamation-triangle' :
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add hover effects for interactive elements
document.querySelectorAll('.student-card, .bg-white\\/80').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});