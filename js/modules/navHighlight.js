// Navigation Highlight Module
export function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav a');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
        
        // Update URL hash without scrolling
        if (history.replaceState) {
          history.replaceState(null, null, `#${id}`);
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -80% 0px'
  });
  
  sections.forEach(section => observer.observe(section));
  
  // Handle initial page load with hash
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}
