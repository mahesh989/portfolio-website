// Smooth Scroll Module
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash
        history.pushState(null, null, href);
        
        // Track scroll events for analytics
        if (window.gtag) {
          gtag('event', 'scroll_to_section', {
            event_category: 'Navigation',
            event_label: href
          });
        }
      }
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.section) {
      const target = document.querySelector(e.state.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
