// Simple visitor counter without jQuery dependency
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor counter
    initVisitorCounter();
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Visitor counter functionality
function initVisitorCounter() {
    // Get current count from localStorage
    let count = localStorage.getItem('visitorCount');
    
    // If no count exists, start at a realistic number, otherwise increment
    if (!count) {
        count = Math.floor(Math.random() * 1000) + 500; // Start with a number between 500-1500
    } else {
        count = parseInt(count) + 1;
    }
    
    // Store the updated count
    localStorage.setItem('visitorCount', count);
    
    // Update the visitor count display
    updateVisitorDisplay(count);
}

function updateVisitorDisplay(count) {
    // Replace "Loading..." with the actual count
    setTimeout(function() {
        // Find and replace all instances of "Loading..."
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (node.textContent.includes('Loading...')) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            textNode.textContent = textNode.textContent.replace(/Loading\.\.\./g, count);
        });
        
    }, 100); // Small delay for better UX
}
