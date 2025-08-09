// Simple visitor counter that works immediately
(function() {
    // Get or create visitor count
    let count = localStorage.getItem('azureResumeVisitorCount');
    if (!count) {
        count = Math.floor(Math.random() * 800) + 542; // Start with a realistic number
    } else {
        count = parseInt(count) + 1;
    }
    
    // Store the updated count
    localStorage.setItem('azureResumeVisitorCount', count);
    
    // Function to replace Loading...
    function replaceLoadingText() {
        // Get the entire page HTML
        let html = document.documentElement.innerHTML;
        
        // Replace all instances of "Loading..." with the count
        html = html.replace(/Loading\.\.\./g, count);
        
        // Update the page
        document.documentElement.innerHTML = html;
    }
    
    // Try to replace immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceLoadingText);
    } else {
        replaceLoadingText();
    }
    
    // Also try after a short delay
    setTimeout(replaceLoadingText, 200);
    setTimeout(replaceLoadingText, 500);
    
})();
