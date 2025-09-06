// JMD Associates Real Estate Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('JMD Associates website initialized');

    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize with system preference
    let currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';

    // Set theme function
    function setTheme(theme) {
        console.log('Setting theme to:', theme);
        document.documentElement.setAttribute('data-color-scheme', theme);
        currentTheme = theme;
        updateThemeToggleIcon(theme);
        
        // Force a style recalculation
        document.documentElement.style.display = 'none';
        document.documentElement.offsetHeight; // Trigger reflow
        document.documentElement.style.display = '';
    }

    // Update theme toggle icon
    function updateThemeToggleIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }
    }

    // Initialize theme
    setTheme(currentTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked, current theme:', currentTheme);
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Google Maps functionality
    const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=2042+Sector+7+Sonipat+Haryana';

    // Global function for Google Maps
    window.openGoogleMaps = function() {
        console.log('Opening Google Maps with URL:', googleMapsUrl);
        try {
            window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Error opening Google Maps:', error);
            window.location.href = googleMapsUrl;
        }
    };

    // Setup location link event handlers
    function setupLocationLinks() {
        const locationLinks = document.querySelectorAll('.location-link');
        console.log('Setting up', locationLinks.length, 'location links');
        
        locationLinks.forEach(function(link, index) {
            console.log('Setting up location link', index + 1);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Location link clicked');
                window.openGoogleMaps();
            });
        });
    }

    // Form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const queryInput = document.getElementById('query');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const contactError = document.getElementById('contactError');
    const queryError = document.getElementById('queryError');

    // WhatsApp number
    const whatsappNumber = '918607002111';

    // Validation functions
    function validateName(name) {
        const trimmedName = name.trim();
        if (!trimmedName) return 'Full name is required';
        if (trimmedName.length < 2) return 'Name must be at least 2 characters long';
        if (!/^[a-zA-Z\s]+$/.test(trimmedName)) return 'Name should only contain letters and spaces';
        return '';
    }

    function validateEmail(email) {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) return 'Please enter a valid email address';
        return '';
    }

    function validateContact(contact) {
        const trimmedContact = contact.trim();
        if (!trimmedContact) return 'Contact number is required';
        const cleanContact = trimmedContact.replace(/\D/g, '');
        if (cleanContact.length !== 10) return 'Please enter a valid 10-digit mobile number';
        if (!/^[6-9]/.test(cleanContact)) return 'Please enter a valid Indian mobile number';
        return '';
    }

    function validateQuery(query) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return 'Property query is required';
        if (trimmedQuery.length < 10) return 'Please provide more details (at least 10 characters)';
        return '';
    }

    // Show/hide error messages
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.parentElement.classList.add('has-error');
        }
    }

    function clearError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.parentElement.classList.remove('has-error');
        }
    }

    // Contact number input formatting
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // Real-time validation
    if (nameInput && nameError) {
        nameInput.addEventListener('blur', function() {
            const error = validateName(this.value);
            if (error) {
                showError(nameError, error);
                this.classList.add('error');
            } else {
                clearError(nameError);
                this.classList.remove('error');
            }
        });
    }

    if (emailInput && emailError) {
        emailInput.addEventListener('blur', function() {
            const error = validateEmail(this.value);
            if (error) {
                showError(emailError, error);
                this.classList.add('error');
            } else {
                clearError(emailError);
                this.classList.remove('error');
            }
        });
    }

    if (contactInput && contactError) {
        contactInput.addEventListener('blur', function() {
            const error = validateContact(this.value);
            if (error) {
                showError(contactError, error);
                this.classList.add('error');
            } else {
                clearError(contactError);
                this.classList.remove('error');
            }
        });
    }

    if (queryInput && queryError) {
        queryInput.addEventListener('blur', function() {
            const error = validateQuery(this.value);
            if (error) {
                showError(queryError, error);
                this.classList.add('error');
            } else {
                clearError(queryError);
                this.classList.remove('error');
            }
        });
    }

    // Clear errors on input
    [nameInput, emailInput, contactInput, queryInput].forEach(function(input) {
        if (input) {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.name + 'Error');
                if (errorElement) {
                    clearError(errorElement);
                    this.classList.remove('error');
                }
            });
        }
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Get form data
            const formData = {
                name: nameInput ? nameInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim() : '',
                contact: contactInput ? contactInput.value.trim() : '',
                query: queryInput ? queryInput.value.trim() : ''
            };

            console.log('Form data:', formData);

            // Validate all fields
            const errors = {
                name: validateName(formData.name),
                email: validateEmail(formData.email),
                contact: validateContact(formData.contact),
                query: validateQuery(formData.query)
            };

            // Clear all previous errors
            clearError(nameError);
            clearError(emailError);
            clearError(contactError);
            clearError(queryError);

            // Remove error classes
            [nameInput, emailInput, contactInput, queryInput].forEach(function(input) {
                if (input) input.classList.remove('error');
            });

            // Show errors if any
            let hasErrors = false;
            if (errors.name) {
                showError(nameError, errors.name);
                if (nameInput) nameInput.classList.add('error');
                hasErrors = true;
            }
            if (errors.email) {
                showError(emailError, errors.email);
                if (emailInput) emailInput.classList.add('error');
                hasErrors = true;
            }
            if (errors.contact) {
                showError(contactError, errors.contact);
                if (contactInput) contactInput.classList.add('error');
                hasErrors = true;
            }
            if (errors.query) {
                showError(queryError, errors.query);
                if (queryInput) queryInput.classList.add('error');
                hasErrors = true;
            }

            if (hasErrors) {
                console.log('Form has errors, not submitting');
                if (errors.name && nameInput) nameInput.focus();
                else if (errors.email && emailInput) emailInput.focus();
                else if (errors.contact && contactInput) contactInput.focus();
                else if (errors.query && queryInput) queryInput.focus();
                return;
            }

            // Form is valid, proceed with WhatsApp
            console.log('Form is valid, opening WhatsApp');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }

            // Create WhatsApp message
            const message = `🏠 *New Property Inquiry - JMD Associates*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Contact:* ${formData.contact}

*Property Query:*
${formData.query}

*Areas of Interest:* Sonipat, Kundli, Kharkhoda
*Services:* BUY | SELL | RENT

Please respond at your earliest convenience. Thank you!

_Sent from JMD Associates Website_`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            console.log('WhatsApp URL generated:', whatsappUrl);

            // Open WhatsApp after short delay
            setTimeout(function() {
                try {
                    console.log('Opening WhatsApp...');
                    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                    if (!whatsappWindow) {
                        console.log('Popup blocked, trying direct navigation');
                        window.location.href = whatsappUrl;
                    } else {
                        console.log('WhatsApp opened successfully');
                    }
                    
                    // Show success message
                    showNotification('WhatsApp is opening with your inquiry. Please send the message to complete your request.', 'success');
                    
                    // Clear form
                    contactForm.reset();
                    
                } catch (error) {
                    console.error('Error opening WhatsApp:', error);
                    showNotification('Unable to open WhatsApp automatically. Please call us at 9812257473 or 8607002111', 'error');
                }
                
                // Reset button
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }
            }, 500);
        });
    }

    // Notification system
    function showNotification(message, type) {
        type = type || 'success';
        
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        let lastScrollTop = 0;
        let ticking = false;

        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .area-card, .contact-card, .feature');
    animateElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Initialize location links after DOM is ready
    setTimeout(function() {
        setupLocationLinks();
    }, 100);

    console.log('Website setup complete');
    console.log('WhatsApp number:', whatsappNumber);
    console.log('Google Maps URL:', googleMapsUrl);
    console.log('Theme initialized:', currentTheme);
    console.log('Contact numbers: 9812257473, 8607002111');
});