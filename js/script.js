// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Mobile menu toggle (if needed)
    const nav = document.querySelector('nav ul');
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'menu-toggle';
    menuToggle.style.display = 'none';
    
    // Add menu toggle for mobile
    if (window.innerWidth <= 768) {
        document.querySelector('nav').insertBefore(menuToggle, nav);
        menuToggle.style.display = 'block';
        nav.style.display = 'none';
        
        menuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#27ae60';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item, .value-item, .card');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Phone number click tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'header_phone'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .value-item, .card, article');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Price calculator (simple example)
    function createPriceCalculator() {
        const calculator = document.createElement('div');
        calculator.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin: 2rem 0;">
                <h3 style="color: #27ae60; margin-bottom: 1rem;">Quick Price Estimate</h3>
                <div style="margin-bottom: 1rem;">
                    <label>Sidewalk Length (feet):</label>
                    <input type="number" id="length" min="1" style="width: 100px; margin-left: 10px; padding: 5px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label>Repair Type:</label>
                    <select id="repairType" style="margin-left: 10px; padding: 5px;">
                        <option value="basic">Basic Repair ($15/sq ft)</option>
                        <option value="standard">Standard Repair ($25/sq ft)</option>
                        <option value="premium">Premium Repair ($35/sq ft)</option>
                    </select>
                </div>
                <button onclick="calculatePrice()" style="background: #27ae60; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Calculate</button>
                <div id="priceResult" style="margin-top: 1rem; font-weight: bold; color: #27ae60;"></div>
            </div>
        `;
        
        // Insert calculator after services section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.insertAdjacentHTML('afterend', calculator.innerHTML);
        }
    }

    // Add price calculator to page
    createPriceCalculator();
});

// Price calculation function
function calculatePrice() {
    const length = document.getElementById('length').value;
    const repairType = document.getElementById('repairType').value;
    const resultDiv = document.getElementById('priceResult');
    
    if (!length || length <= 0) {
        resultDiv.innerHTML = 'Please enter a valid length.';
        return;
    }
    
    const rates = {
        basic: 15,
        standard: 25,
        premium: 35
    };
    
    const width = 4; // Assume 4 feet width
    const area = length * width;
    const total = area * rates[repairType];
    
    resultDiv.innerHTML = `
        Estimated Cost: $${total.toLocaleString()}<br>
        <small>Area: ${area} sq ft | Rate: $${rates[repairType]}/sq ft</small><br>
        <small style="color: #666;">*This is a rough estimate. Contact us for a free detailed quote.</small>
    `;
}

// Add CSS for mobile menu toggle
const style = document.createElement('style');
style.textContent = `
    .menu-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block !important;
        }
        
        nav ul {
            flex-direction: column;
            width: 100%;
            background: rgba(39, 174, 96, 0.95);
            position: absolute;
            top: 100%;
            left: 0;
            padding: 1rem;
            border-radius: 0 0 10px 10px;
        }
        
        nav li {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);

