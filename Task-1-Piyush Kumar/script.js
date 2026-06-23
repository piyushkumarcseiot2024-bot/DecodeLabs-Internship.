/**
 * ClickCraft Keyboards - Core Application Logic
 * Project 1: Responsive Frontend Interface
 * State Management & Interactivity Framework
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Application State ---
    let totalItemsInCart = 0;
    const cartDisplayCounter = document.getElementById('cart-count');

    // ==========================================
    // 1. Mobile Navigation Menu Toggle
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Check current menu state for accessibility (WCAG compliance)
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle state attributes and classes
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('nav-active');
            
            // Optional: Toggle visual icon between ☰ and ✕
            menuToggle.textContent = isExpanded ? '☰' : '✕';
        });

        // Close mobile menu gracefully when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('nav-active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // ==========================================
    // 2. Catalog Filtering Functionality
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state class on filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');

            // Toggle element visibility based on category matches
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedFilter === 'all' || cardCategory === selectedFilter) {
                    card.style.display = ''; // Reverts to stylesheet default layout rules
                    // Small opacity fade-in animation trigger
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // ==========================================
    // 3. Cart Interaction Logic
    // ==========================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Increment application state counter
            totalItemsInCart++;
            
            // Update UI element with polite screen reader feedback notices
            if (cartDisplayCounter) {
                cartDisplayCounter.textContent = totalItemsInCart;
            }

            // Micro-interaction UI feedback for the clicked button
            const originalText = button.textContent;
            button.textContent = "Added!";
            button.style.backgroundColor = "#2C2A29"; // Highlight temporary state change
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = ""; // Reset inline styling back to CSS variables
                button.disabled = false;
            }, 800);
        });
    });

    // ==========================================
    // 4. Checkout Form Validation & Submission
    // ==========================================
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page reload behavior

            // Business validation rule: Cart cannot be empty
            if (totalItemsInCart === 0) {
                alert("Your cart is empty! Please add some grounded mechanical excellence to your cart before checking out.");
                return;
            }

            // Retrieve form button elements to manage async state shifts
            const submitBtn = checkoutForm.querySelector('.checkout-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Switch button style visually to processing layout state
            submitBtn.textContent = "Processing Order...";
            submitBtn.style.backgroundColor = "#2C2A29"; // Switch to dark charcoal processing state
            submitBtn.disabled = true;

            // Simulate server handling / gateway response pipeline time (1.5 seconds)
            setTimeout(() => {
                // Success State notification alert
                alert(`Success! Your order for ${totalItemsInCart} item(s) has been placed securely.`);
                
                // Reset application context data fields back to baseline levels
                checkoutForm.reset();
                totalItemsInCart = 0;
                
                if (cartDisplayCounter) {
                    cartDisplayCounter.textContent = totalItemsInCart;
                }
                
                // Restore button functional properties completely
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = ""; // Revert to standard Mocha Mousse setting template
                submitBtn.disabled = false;
                
                // Bring view position back up smoothly to the digital starting block interface point
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1500);
        });
    }
});