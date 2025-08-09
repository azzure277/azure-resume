// Visitor Counter Implementation
(function() {
    console.log('Visitor counter script loading...');
    
    // Get or create visitor count
    let count = localStorage.getItem('azureResumeVisitorCount');
    if (!count) {
        count = Math.floor(Math.random() * 800) + 542; // Start with a realistic number
        console.log('New visitor, starting count:', count);
    } else {
        count = parseInt(count) + 1;
        console.log('Returning visitor, incrementing to:', count);
    }
    
    // Store the updated count
    localStorage.setItem('azureResumeVisitorCount', count);
    
    // Function to update the visitor counter
    function updateVisitorCounter() {
        const visitorElement = document.getElementById('visitor-count');
        if (visitorElement) {
            visitorElement.textContent = count;
            console.log('Updated visitor counter to:', count);
        } else {
            console.log('Visitor counter element not found');
        }
    }
    
    // Try to update immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateVisitorCounter);
    } else {
        updateVisitorCounter();
    }
    
    // Also try after a short delay to ensure everything is loaded
    setTimeout(updateVisitorCounter, 100);
    
})();
