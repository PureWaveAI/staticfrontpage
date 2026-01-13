// Static build: copied from root main.js
// Pure Wave Intelligence - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Animate hamburger icon to X
            const spans = this.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'rotate(0deg)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Navigation Scroll Effects
    const navigation = document.querySelector('.navigation');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
        
        // Hide mobile menu when scrolling
        if (scrollTop > lastScrollTop && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0deg)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0deg)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0deg)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0deg)';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Solutions Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content, hide others
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Form Submission Handling with Formspree (with native fallback)
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitButton = document.getElementById('submit-button');
            const successMessage = document.getElementById('form-success-message');
            const errorMessage = document.getElementById('form-error-message');
            const originalText = submitButton.textContent;
            
            // Hide previous messages
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            
            // Update button state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            try {
                // Submit to Formspree via AJAX
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    
                    // Reset form
                    this.reset();
                    
                    // Redirect to Formspree thank you page after 3 seconds
                    setTimeout(() => {
                        window.location.href = 'https://formspree.io/thanks';
                    }, 3000);
                } else {
                    // Handle error response from Formspree (e.g., validation)
                    const data = await response.json();
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    
                    // Re-enable button so user can correct and resubmit
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    console.error('Form submission error:', data);
                }
            } catch (error) {
                // Network/CORS/other error: fall back to native form submission
                console.error('Form submission error, falling back to native submit:', error);
                this.submit();
            }
        });
    }
    
    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const submitButton = this.querySelector('button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for subscribing to our insights! We'll send you updates on Analog AI and intelligence evolution.`);
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.philosophy-card, .solution-card, .insight-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add animation class to trigger CSS animations
    document.querySelectorAll('.wave-animation, .probability-wave, .insight-wave').forEach(element => {
        element.classList.add('animate-in');
    });
    
    // Particle Animation Enhancement
    const waveParticles = document.querySelectorAll('.wave-particle');
    waveParticles.forEach(particle => {
        // Add random initial positions and sizes
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Add random animation duration
        const duration = Math.random() * 10 + 5;
        particle.style.animationDuration = `${duration}s`;
    });
    
    // Studio Screenshot Animation
    const studioScreenshot = document.querySelector('.studio-screenshot');
    if (studioScreenshot) {
        // Add subtle hover effect
        studioScreenshot.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 20;
            const tiltY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        studioScreenshot.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Analytics Tracking (Placeholder - would integrate with actual analytics)
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function() {
            const action = this.textContent || this.getAttribute('href');
            console.log('Analytics Event:', {
                event: 'interaction',
                category: 'user_engagement',
                action: action.trim(),
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // Console Branding (Professional touch for developers)
    console.log(`
        %c✨ Pure Wave Intelligence ✨
        %cMaking Analog AI the new operating system for human progress
        %chttps://purewave.ai
        
        ℹ️ This console is part of our development environment.
        For partnership inquiries: partnerships@purewave.ai
        For studio support: help@purewave.ai
    `, 
    'font-size: 24px; font-weight: bold; color: #00C4B4; text-shadow: 0 0 10px rgba(0, 196, 180, 0.5);',
    'font-size: 16px; color: #2A2D5E; font-weight: 500;',
    'font-size: 14px; color: #4A4F5C;'
    );
    
    console.log('%c🌊 Analog AI Philosophy: Embracing uncertainty as the foundation of intelligence', 
        'color: #00C4B4; font-weight: bold;');
});


