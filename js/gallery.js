/* ===================================
   GALLERY - PROFESSIONAL IMAGE GALLERY
   WITH LIGHTBOX & SLIDER
   =================================== */

// Gallery Images Data
const galleryImages = [
    // Events
    { 
        src: 'event_images/innovex.jpg', 
        category: 'events', 
        title: 'InnovEx Tech Fest',
        description: 'Annual technical festival showcasing student innovations and projects'
    },
    { 
        src: 'event_images/euphoria.jpg', 
        category: 'events', 
        title: 'Euphoria Cultural Fest',
        description: 'Department cultural celebration with various performances and activities'
    },
    { 
        src: 'images/achievement/achievement1.jpg', 
        category: 'achievements', 
        title: 'Hackathon Winners',
        description: 'Students winning first place at National Level Hackathon'
    },
    { 
        src: 'images/achievement/achievement2.jpg', 
        category: 'achievements', 
        title: 'Research Excellence Award',
        description: 'Faculty receiving award for outstanding research contribution'
    },
    { 
        src: 'images/banner/lab1.jpg', 
        category: 'labs', 
        title: 'Computer Lab',
        description: 'State-of-the-art computer laboratory with latest technology'
    },
    { 
        src: 'images/banner/lab2.jpg', 
        category: 'labs', 
        title: 'AI & ML Research Lab',
        description: 'Dedicated laboratory for artificial intelligence and machine learning research'
    },
    { 
        src: 'images/projects/project1.jpg', 
        category: 'activities', 
        title: 'Student Project Demo',
        description: 'Students presenting their final year projects'
    },
    { 
        src: 'images/projects/project2.jpg', 
        category: 'activities', 
        title: 'Workshop Session',
        description: 'Hands-on workshop on emerging technologies'
    },
    { 
        src: 'event_images/department-day.jpg', 
        category: 'events', 
        title: 'Department Day Celebration',
        description: 'Annual department day with fun activities and awards'
    },
    { 
        src: 'event_images/alumni-meet.jpg', 
        category: 'events', 
        title: 'Alumni Meet 2025',
        description: 'Reconnecting with our successful alumni'
    },
    { 
        src: 'images/banner/campus1.jpg', 
        category: 'labs', 
        title: 'Department Building',
        description: 'Modern infrastructure with spacious classrooms'
    },
    { 
        src: 'images/achievement/award1.jpg', 
        category: 'achievements', 
        title: 'Smart India Hackathon',
        description: 'Team winning grand prize at national hackathon'
    },
    { 
        src: 'images/projects/project3.jpg', 
        category: 'activities', 
        title: 'Coding Competition',
        description: 'Inter-college programming contest'
    },
    { 
        src: 'event_images/guest-lecture.jpg', 
        category: 'events', 
        title: 'Industry Expert Session',
        description: 'Guest lecture by industry professional'
    },
    { 
        src: 'images/banner/library.jpg', 
        category: 'labs', 
        title: 'Digital Library',
        description: 'Well-stocked library with digital resources'
    },
    { 
        src: 'images/achievement/sports.jpg', 
        category: 'achievements', 
        title: 'Sports Achievement',
        description: 'Students excelling in sports events'
    },
    { 
        src: 'images/projects/innovation.jpg', 
        category: 'activities', 
        title: 'Innovation Lab',
        description: 'Students working on innovative projects'
    },
    { 
        src: 'event_images/tech-fest.jpg', 
        category: 'events', 
        title: 'Tech Fest 2025',
        description: 'Annual technical festival with various competitions'
    }
];

// State Management
let currentImageIndex = 0;
let currentFilter = 'all';
let filteredImages = [...galleryImages];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const currentImageSpan = document.getElementById('currentImage');
const totalImagesSpan = document.getElementById('totalImages');
const filterButtons = document.querySelectorAll('.filter-btn');

// ===================================
// INITIALIZE GALLERY
// ===================================

function initGallery() {
    renderGallery();
    setupEventListeners();
}

// ===================================
// RENDER GALLERY GRID
// ===================================

function renderGallery() {
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = image.category;
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.loading = 'lazy';
        
        // Handle image load error
        img.onerror = function() {
            this.src = 'images/banner/default.jpg'; // Fallback image
        };
        
        galleryItem.appendChild(img);
        galleryItem.addEventListener('click', () => openLightbox(index));
        
        galleryGrid.appendChild(galleryItem);
    });
    
    updateCounter();
}

// ===================================
// FILTER FUNCTIONALITY
// ===================================

function filterGallery(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredImages = [...galleryImages];
    } else {
        filteredImages = galleryImages.filter(img => img.category === category);
    }
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // CRITICAL FIX: Reset index to prevent out-of-bounds errors
    currentImageIndex = 0;
    
    renderGallery();
}

// ===================================
// LIGHTBOX FUNCTIONS
// ===================================

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage('fade');
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

function updateLightboxImage(animation = '') {
    const image = filteredImages[currentImageIndex];
    
    if (!image) return;
    
    // Apply animation class
    const lightboxContent = document.querySelector('.lightbox-content');
    if (animation) {
        lightboxContent.classList.remove('slide-left', 'slide-right');
        void lightboxContent.offsetWidth; // Trigger reflow
        if (animation !== 'fade') {
            lightboxContent.classList.add(animation);
            // Remove animation class after it completes to prevent conflicts
            setTimeout(() => {
                lightboxContent.classList.remove('slide-left', 'slide-right');
            }, 400);
        }
    }
    
    // CRITICAL FIX: Preload image to prevent flash/jump
    const tempImg = new Image();
    tempImg.onload = function() {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
    };
    tempImg.onerror = function() {
        // Fallback if image fails to load
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
    };
    tempImg.src = image.src;
    
    updateCounter();
    updateNavigationButtons();
}

function nextImage() {
    if (currentImageIndex < filteredImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage('slide-left');
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage('slide-right');
    }
}

function updateCounter() {
    currentImageSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = filteredImages.length;
}

function updateNavigationButtons() {
    // Disable prev button if at start
    if (currentImageIndex === 0) {
        lightboxPrev.disabled = true;
    } else {
        lightboxPrev.disabled = false;
    }
    
    // Disable next button if at end
    if (currentImageIndex === filteredImages.length - 1) {
        lightboxNext.disabled = true;
    } else {
        lightboxNext.disabled = false;
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.dataset.filter);
        });
    });
    
    // Lightbox close button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);
    
    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const lightboxContent = document.querySelector('.lightbox-content');
    lightboxContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    lightboxContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only trigger if horizontal swipe is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', initGallery);

// ===================================
// UTILITY: Add More Images Dynamically
// ===================================

function addImagesToGallery(newImages) {
    galleryImages.push(...newImages);
    if (currentFilter === 'all') {
        filteredImages = [...galleryImages];
    } else {
        filteredImages = galleryImages.filter(img => img.category === currentFilter);
    }
    renderGallery();
}

// Example usage:
// addImagesToGallery([
//     { src: 'path/to/image.jpg', category: 'events', title: 'Title', description: 'Description' }
// ]);
