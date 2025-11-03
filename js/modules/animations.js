// Animations Module
export function initAnimations() {
  // Fade in elements on scroll
  const animatedElements = document.querySelectorAll(
    '.experience-card, .project-card, .education-item, .value-prop-card, .certification-item'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Use requestAnimationFrame for smoother animation start
        requestAnimationFrame(() => {
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, Math.min(index * 50, 300)); // Reduced stagger delay (50ms max 300ms total)
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05, // Reduced threshold for earlier trigger
    rootMargin: '0px 0px -100px 0px' // Increased margin for earlier trigger
  });
  
  animatedElements.forEach(el => observer.observe(el));
  
  // Parallax effect for hero background
  initParallaxEffect();
  
  // Hover animations for interactive elements
  initHoverAnimations();
}

function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  // Disabled parallax effect to prevent content hiding during scroll
  // The original parallax was causing the hero section to move incorrectly
  // during scroll, making content appear to hide
  
  // Alternative: Subtle parallax only for background elements
  // Optimized with requestAnimationFrame and passive listener
  let parallaxRAF = null;
  const handleParallax = () => {
    if (parallaxRAF) {
      cancelAnimationFrame(parallaxRAF);
    }
    parallaxRAF = requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.1; // Much smaller effect
      
      // Only apply to background elements, not the main content
      const heroBackground = hero.querySelector('.hero-background');
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${parallax}px)`;
      }
      parallaxRAF = null;
    });
  };
  
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', handleParallax, { passive: true });
}

function initHoverAnimations() {
  // REMOVED: JavaScript hover handlers cause flickering and conflict with CSS transitions
  // All hover effects are now handled by CSS for better performance and smoothness
  // See css/performance.css and component CSS files for hover styles
}

// Reveal animations for sections
export function initRevealAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-revealed');
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => observer.observe(section));
}

// Text reveal animation
export function initTextReveal() {
  const textElements = document.querySelectorAll('.hero-name, .hero-title, .hero-tagline');
  
  textElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}
