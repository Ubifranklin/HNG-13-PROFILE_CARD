'use strict';
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    
    if (timeElement) {
        const currentTimestamp = Date.now();
        timeElement.textContent = currentTimestamp;
        
        // Add aria-label for screen readers
        timeElement.setAttribute('aria-label', `Current timestamp: ${currentTimestamp} milliseconds since epoch`);
    }
}

/**
 * Initialize time display and set up interval for updates
 */
function initializeTimeDisplay() {
    // Set initial time immediately
    updateTime();
    
    // Update time every second (1000ms)
    const timeUpdateInterval = setInterval(updateTime, 1000);
    
    // Store interval ID for potential cleanup
    window.timeUpdateInterval = timeUpdateInterval;
    
    console.log('✓ Time display initialized');
}

/**
 * Handles avatar image upload
 * @param {Event} event - File input change event
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        console.warn('No file selected');
        return;
    }
    
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
    }
    
    // Validate file size (max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
        alert('Image file size must be less than 5MB');
        return;
    }
    
    // Read and display the image
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
        
        if (avatarImg) {
            avatarImg.src = e.target.result;
            avatarImg.alt = `Uploaded profile picture of ${file.name}`;
            console.log('✓ Avatar image updated successfully');
        }
    };
    
    reader.onerror = function() {
        console.error('Error reading file');
        alert('Failed to load image. Please try again.');
    };
    
    reader.readAsDataURL(file);
}
/**
 * Add scroll-based animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
    }
    
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
    
    // Observe sections
    const sections = document.querySelectorAll('section, nav');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    console.log('✓ Scroll animations initialized');
}

/**
 * Log all testable elements and their data-testid values
 */
function logTestableElements() {
    const testableElements = document.querySelectorAll('[data-testid]');
    
    console.group('📋 Testable Elements');
    console.log(`Total elements with data-testid: ${testableElements.length}`);
    
    testableElements.forEach(element => {
        const testId = element.getAttribute('data-testid');
        const tagName = element.tagName.toLowerCase();
        const textContent = element.textContent?.trim().substring(0, 50) || '(no text)';
        
        console.log(`• ${testId} | <${tagName}> | "${textContent}..."`);
    });
    
    console.groupEnd();
}

function validateRequiredElements() {
    const requiredTestIds = [
        'test-profile-card',
        'test-user-name',
        'test-user-bio',
        'test-user-time',
        'test-user-avatar',
        'test-user-social-links',
        'test-user-hobbies',
        'test-user-dislikes'
    ];
    
    const missingElements = [];
    const foundElements = [];
    
    requiredTestIds.forEach(testId => {
        const element = document.querySelector(`[data-testid="${testId}"]`);
        if (element) {
            foundElements.push(testId);
        } else {
            missingElements.push(testId);
        }
    });
    
    console.group('✅ Element Validation');
    console.log(`Found: ${foundElements.length}/${requiredTestIds.length} required elements`);
    
    if (missingElements.length === 0) {
        console.log('%c✓ All required elements present!', 'color: green; font-weight: bold;');
    } else {
        console.warn('%c✗ Missing elements:', 'color: red; font-weight: bold;', missingElements);
    }
    
    console.groupEnd();
    
    return missingElements.length === 0;
}
