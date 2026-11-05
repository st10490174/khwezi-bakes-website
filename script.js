/**
 * Source Attribution:
 * Code adapted from AI Collaborator (Gemini) assistance.
 * Reason: Implemented to provide dynamic menu filtering with smooth CSS transitions and client-side form validation and hamburger menu for mobile.
 * Date Accessed: October 2026.
 */


// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. MENU FILTERING LOGIC WITH ANIMATIONS (menu.html)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".item-card");

    if (filterButtons.length > 0 && menuItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const category = button.getAttribute("data-category");

                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute("data-category");
                    const shouldShow = (category === "all" || itemCategory === category);

                    if (shouldShow) {
                        // Reveal item with smooth scale & fade in
                        item.style.display = "block";
                        setTimeout(() => {
                            item.classList.remove("is-hidden");
                        }, 20);
                    } else {
                        // Fade out item first, then set display none
                        item.classList.add("is-hidden");
                        setTimeout(() => {
                            if (item.classList.contains("is-hidden")) {
                                item.style.display = "none";
                            }
                        }, 400); // Matches the 0.4s CSS transition time
                    }
                });
            });
        });
    }

    // ==========================================
    // 2. CLIENT-SIDE FORM VALIDATION (contact.html & enquiry.html)
    // ==========================================
    const contactForm = document.querySelector("#contactForm") || document.querySelector("form");

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");

        inputs.forEach(input => {
            let errorElement = input.nextElementSibling;
            
            // Create error message container dynamically if missing
            if (!errorElement || !errorElement.classList.contains("error-msg")) {
                errorElement = document.createElement("span");
                errorElement.classList.add("error-msg");
                errorElement.style.color = "#d9534f";
                errorElement.style.fontSize = "0.85rem";
                errorElement.style.display = "block";
                errorElement.style.marginTop = "4px";
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }

            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = "#d9534f";
                errorElement.textContent = "This field is required.";
            } else if (input.type === "email" && !validateEmail(input.value)) {
                isValid = false;
                input.style.borderColor = "#d9534f";
                errorElement.textContent = "Please enter a valid email address.";
            } else {
                input.style.borderColor = "#28a745";
                errorElement.textContent = "";
            }
        });

        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validateForm(contactForm)) {
                alert("Thank you for reaching out! Khwezi Bakes has received your message.");
                contactForm.reset();
                
                // Clear green success borders after reset
                const inputs = contactForm.querySelectorAll("input, textarea, select");
                inputs.forEach(input => input.style.borderColor = "");
            }
        });
    }
});

// ==========================================
// HERO BANNER SLIDESHOW LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // Changes slide every 4 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        // Run the slideshow automatically
        setInterval(nextSlide, slideInterval);
    }
});


// CUSTOM CAKE PRICE ESTIMATOR LOGIC // 
document.addEventListener("DOMContentLoaded", () => {
    const sizeSelect = document.getElementById("cakeSize");
    const flavorSelect = document.getElementById("cakeFlavor");
    const layersSelect = document.getElementById("cakeLayers");
    const priceDisplay = document.getElementById("estimatedPrice");

    function calculateEstimate() {
        if (!sizeSelect || !flavorSelect || !layersSelect || !priceDisplay) return;

        // Base price comes from size selection value
        let basePrice = parseInt(sizeSelect.value) || 0;
        
        // Add-on cost from flavor choice
        let flavorCost = parseInt(flavorSelect.value) || 0;
        
        // Layer cost configuration
        let layerChoice = parseInt(layersSelect.value);
        let layerCost = 0;
        if (layerChoice === 3) layerCost = 100;
        if (layerChoice === 4) layerCost = 200;

        // Calculate total
        let totalPrice = basePrice + flavorCost + layerCost;

        // Update display text
        priceDisplay.textContent = `R ${totalPrice}.00`;
    }

    // Attach event listeners to all estimator inputs
    if (sizeSelect && flavorSelect && layersSelect) {
        sizeSelect.addEventListener("change", calculateEstimate);
        flavorSelect.addEventListener("change", calculateEstimate);
        layersSelect.addEventListener("change", calculateEstimate);
        
        // Run once on load to set initial value
        calculateEstimate();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CUSTOM CAKE PRICE ESTIMATOR LOGIC ---
    const cakeSizeSelect = document.getElementById('cakeSize');
    const cakeFlavorSelect = document.getElementById('cakeFlavor');
    const cakeLayersSelect = document.getElementById('cakeLayers');
    const estimatedPriceDisplay = document.getElementById('estimatedPrice');

    function calculatePrice() {
        if (!cakeSizeSelect || !cakeFlavorSelect || !cakeLayersSelect || !estimatedPriceDisplay) return;

        const baseSizePrice = parseFloat(cakeSizeSelect.value) || 0;
        const flavorAddonPrice = parseFloat(cakeFlavorSelect.value) || 0;
        const layerAddonPrice = parseFloat(cakeLayersSelect.value) || 0;

        const totalPrice = baseSizePrice + flavorAddonPrice + layerAddonPrice;
        estimatedPriceDisplay.textContent = `R ${totalPrice.toFixed(2)}`;
    }

    if (cakeSizeSelect && cakeFlavorSelect && cakeLayersSelect) {
        cakeSizeSelect.addEventListener('change', calculatePrice);
        cakeFlavorSelect.addEventListener('change', calculatePrice);
        cakeLayersSelect.addEventListener('change', calculatePrice);
        calculatePrice(); // Run initial calculation on page load
    }

    // --- 2. IMAGE POP-UP (LIGHTBOX MODAL) LOGIC ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');
    const galleryImages = document.querySelectorAll('.item-card img.responsive-img');

    if (modal && modalImg) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// --- 3. MOBILE HAMBURGER MENU LOGIC ---
    const hamburgerToggle = document.getElementById('hamburgerToggle');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerToggle && navLinks) {
        hamburgerToggle.addEventListener('click', () => {
            hamburgerToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close dropdown when clicking any navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }