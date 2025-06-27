document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Property Modal
    const propertyCards = document.querySelectorAll('.property-card');
    const modal = document.getElementById('propertyModal');
    const closeModal = document.querySelector('.close-modal');

    // Kenyan property data
    const properties = {
        "westlands": {
            title: "Westlands Luxury Apartment",
            price: "KSh 25,000,000",
            location: "Westlands, Nairobi",
            size: "250 sq.m",
            bedrooms: "4",
            bathrooms: "3",
            description: "Premium apartment with stunning city views, located in Nairobi's most prestigious neighborhood. Includes 24/7 security, gym, and swimming pool.",
            features: [
                "Gated community with armed guards",
                "2 dedicated parking slots",
                "Backup generator",
                "Water storage tanks",
                "Proximity to shopping malls"
            ],
            images: [
                "https://via.placeholder.com/800x600?text=Westlands+Apartment",
                "https://via.placeholder.com/800x600?text=Living+Room",
                "https://via.placeholder.com/800x600?text=Master+Bedroom"
            ]
        },
        "nyali": {
            title: "Nyali Beachfront Villa",
            price: "KSh 45,000,000",
            location: "Nyali, Mombasa",
            size: "400 sq.m",
            bedrooms: "5",
            bathrooms: "4",
            description: "Luxurious beachfront villa with private access to Nyali beach. Includes staff quarters and tropical garden.",
            features: [
                "Private beach access",
                "Solar water heating",
                "Staff quarters included",
                "5-minute drive to Nyali Mall",
                "Sea-view balconies"
            ],
            images: [
                "https://via.placeholder.com/800x600?text=Nyali+Villa",
                "https://via.placeholder.com/800x600?text=Ocean+View",
                "https://via.placeholder.com/800x600?text=Private+Beach"
            ]
        }
    };

    // Open modal when property card is clicked
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            const propertyId = this.dataset.property;
            const property = properties[propertyId];
            
            // Populate modal
            document.getElementById('modalTitle').textContent = property.title;
            document.getElementById('modalPrice').textContent = property.price;
            document.getElementById('modalLocation').textContent = property.location;
            document.getElementById('modalSize').textContent = property.size;
            document.getElementById('modalBedrooms').textContent = property.bedrooms;
            document.getElementById('modalBathrooms').textContent = property.bathrooms;
            document.getElementById('modalDescription').textContent = property.description;
            
            // Set main image
            document.getElementById('modalMainImage').src = property.images[0];
            
            // Create thumbnails
            const thumbnailsContainer = document.getElementById('thumbnails');
            thumbnailsContainer.innerHTML = '';
            property.images.forEach(img => {
                const thumb = document.createElement('img');
                thumb.src = img;
                thumb.addEventListener('click', () => {
                    document.getElementById('modalMainImage').src = img;
                });
                thumbnailsContainer.appendChild(thumb);
            });
            
            // Create Kenyan features list
            const featuresList = document.getElementById('modalKenyanFeatures');
            featuresList.innerHTML = '';
            property.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // WhatsApp Integration - YOUR NUMBER INSERTED HERE
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.addEventListener('click', function() {
        const phone = "+254113405388"; // Your Kenyan number
        const message = `Hello Fertile Works, I'm interested in: ${document.getElementById('modalTitle').textContent}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Floating WhatsApp Button - YOUR NUMBER INSERTED HERE
    const floatingWhatsApp = document.createElement('div');
    floatingWhatsApp.className = 'floating-whatsapp';
    floatingWhatsApp.innerHTML = `
        <a href="https://wa.me/254113405388" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp">
        </a>
    `;
    document.body.appendChild(floatingWhatsApp);
});