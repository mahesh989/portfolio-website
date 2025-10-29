// Animations Module
export function initAnimations() {
  // Fade in elements on scroll
  const animatedElements = document.querySelectorAll(
    '.experience-card, .project-card, .education-item, .value-prop-card, .certification-item'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in-up');
        }, index * 100); // Stagger animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.1; // Much smaller effect
    
    // Only apply to background elements, not the main content
    const heroBackground = hero.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${parallax}px)`;
    }
  });
}

function initHoverAnimations() {
  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Experience card hover effects
  const experienceCards = document.querySelectorAll('.experience-card');
  experienceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (!btn.disabled) {
        btn.style.transform = 'translateY(-2px)';
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      if (!btn.disabled) {
        btn.style.transform = 'translateY(0)';
      }
    });
  });
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
