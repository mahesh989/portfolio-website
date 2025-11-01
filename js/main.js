// Main JavaScript Entry Point
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initNavHighlight } from './modules/navHighlight.js';
import { initAnimations } from './modules/animations.js';
import { initContactForm } from './modules/contactForm.js';
import { initThemeToggle } from './modules/themeToggle.js';
import { initAnalytics } from './modules/analytics.js';
import { initSkillsWorkflow } from './modules/skillsWorkflow.js';
import { initSidebarScroll } from './modules/sidebarScroll.js';
import { debounce, throttle } from './utils/helpers.js';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  hideLoadingScreen();
  
  // Initialize all modules
  initSmoothScroll();
  initNavHighlight();
  initAnimations();
  initContactForm();
  initThemeToggle();
  initAnalytics();
  initSkillsWorkflow();
  initSidebarScroll();
  
  // Initialize additional functionality
  initMobileMenu();
  initScrollToTop();
  initScrollToNext();
  initSkillBars();
  initStatsCounter();
  initTypingEffect();
  initProjectFilters();
  initCopyEmail();
  initSkillsNavigation();
  initJourneyModal();
});

// Loading Screen Management
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Ensure minimum loading time for better UX
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  }
}

// Auto-Opening Mobile Menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenuButton = document.querySelector('.nav-menu-button');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  const sidebarClose = document.querySelector('.sidebar-close');
  const mainContent = document.querySelector('.main-content');
  
  if ((!hamburger && !navMenuButton) || !sidebar) {
    console.warn('Mobile menu elements not found');
    return;
  }
  
  try {
    const isMobile = window.innerWidth <= 767;
    
    const toggleMenu = (open) => {
      const isOpening = open !== undefined ? open : !sidebar.classList.contains('active');
      
      if (isOpening) {
        // Opening sidebar
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        if (hamburger) hamburger.classList.add('active');
        
        // Add body class to indicate sidebar is open
        document.body.classList.add('sidebar-open');
        
      } else {
        // Closing sidebar
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        
        // Remove body class to restore main content
        document.body.classList.remove('sidebar-open');
      }
    };

    // Event listeners
    if (hamburger) hamburger.addEventListener('click', () => toggleMenu());
    if (navMenuButton) navMenuButton.addEventListener('click', () => toggleMenu());
    if (sidebarClose) sidebarClose.addEventListener('click', () => toggleMenu(false));

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', () => toggleMenu(false));
    }
    
    // Close on nav link click (only for hash links within sidebar)
    const sidebarNavLinks = document.querySelectorAll('.sidebar a[href*="#"]');
    sidebarNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          toggleMenu(false);
        }
      });
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleMenu(false);
      }
    });

    // CRITICAL: Auto-open sidebar on mobile
    if (isMobile) {
      // Delay to ensure CSS is loaded
      setTimeout(() => {
        toggleMenu(true); // Auto-open sidebar
      }, 300);
    }

    // Handle window resize
    let wasMobile = isMobile;
    window.addEventListener('resize', () => {
      const nowMobile = window.innerWidth <= 767;
      
      if (nowMobile && !wasMobile) {
        // Just switched to mobile - auto-open sidebar
        setTimeout(() => {
          toggleMenu(true);
        }, 100);
      } else if (!nowMobile && wasMobile) {
        // Just switched to desktop - ensure sidebar is closed
        toggleMenu(false);
      }
      
      wasMobile = nowMobile;
    });

  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }
}

// Scroll to Top
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  
  if (!scrollBtn) {
    console.warn('Scroll to top button not found');
    return;
  }
  
  try {
    window.addEventListener('scroll', throttle(() => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, 200));
    
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } catch (error) {
    console.error('Error initializing scroll to top:', error);
  }
}

// Scroll to Next (one viewport height)
function initScrollToNext() {
  const nextBtn = document.getElementById('scrollToNextBtn');

  if (!nextBtn) {
    console.warn('Scroll to next button not found');
    return;
  }

  try {
    const updateVisibility = () => {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 10;
      if (!atBottom) {
        nextBtn.classList.add('visible');
      } else {
        nextBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', throttle(updateVisibility, 200));
    window.addEventListener('resize', throttle(updateVisibility, 200));
    updateVisibility();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth scroll fallback for browsers without native smooth support
    const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const smoothScrollBy = (distance, duration = 400) => {
      const startY = window.pageYOffset;
      const targetY = Math.min(
        document.body.scrollHeight - window.innerHeight,
        startY + distance
      );
      if (prefersReducedMotion) {
        window.scrollTo(0, targetY);
        return;
      }
      if (supportsSmooth) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        return;
      }
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const y = startY + (targetY - startY) * easeInOut(progress);
        window.scrollTo(0, y);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    nextBtn.addEventListener('click', () => {
      // Scroll by one viewport height without overshooting the bottom
      const maxTarget = document.body.scrollHeight - window.innerHeight;
      const desired = window.pageYOffset + window.innerHeight;
      const distance = Math.max(0, Math.min(window.innerHeight, maxTarget - window.pageYOffset));
      if (distance > 0) smoothScrollBy(distance);
      setTimeout(updateVisibility, 350);
    }, { passive: true });
  } catch (error) {
    console.error('Error initializing scroll to next:', error);
  }
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.dataset.percent;
        bar.style.width = `${percent}%`;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => observer.observe(bar));
}

// Stats Counter Animation
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  const duration = 2000; // 2 seconds
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.dataset.count);
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

// Typing Effect
// Typing Effect - Both titles type simultaneously with circular rotation
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-effect');
  const titleHighlight = document.querySelector('.title-highlight');
  if (!typingElement || !titleHighlight) return;
  
  const jobTitles = [
    'Data Analyst',
    'AI Engineer', 
    'Data Scientist',
    'Data Engineer'
  ];
  
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const firstTitle = jobTitles[currentIndex];
    const secondTitle = jobTitles[(currentIndex + 1) % jobTitles.length];
    const maxLen = Math.max(firstTitle.length, secondTitle.length);

    if (isDeleting) {
      // Delete both titles simultaneously, clamped to 0
      const nextIndex = Math.max(charIndex - 1, 0);
      titleHighlight.textContent = firstTitle.substring(0, Math.min(nextIndex, firstTitle.length));
      typingElement.textContent = secondTitle.substring(0, Math.min(nextIndex, secondTitle.length));
      charIndex = nextIndex;
    } else {
      // Type both titles simultaneously, clamped to their lengths
      const nextIndex = Math.min(charIndex + 1, maxLen);
      titleHighlight.textContent = firstTitle.substring(0, Math.min(nextIndex, firstTitle.length));
      typingElement.textContent = secondTitle.substring(0, Math.min(nextIndex, secondTitle.length));
      charIndex = nextIndex;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Only switch to deleting when BOTH titles have fully rendered (based on max length)
    if (!isDeleting && charIndex === maxLen) {
      typeSpeed = 2000; // Pause when both titles are complete
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % jobTitles.length; // Move to next pair
      typeSpeed = 1000; // Longer pause between cycles
    }

    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Project Filters
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length === 0 || projectCards.length === 0) {
    console.warn('Project filter elements not found');
    return;
  }
  
  try {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in'), 10);
          } else {
            card.classList.remove('fade-in');
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  } catch (error) {
    console.error('Error initializing project filters:', error);
  }
}

// Copy Email
function initCopyEmail() {
  const emailLinks = document.querySelectorAll('[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          window.location.href = link.href;
        });
      }
    });
  });
}

// Journey Modal
function initJourneyModal() {
  const readMoreBtn = document.getElementById('readMoreBtn');
  const modal = document.getElementById('journeyModal');
  const closeBtn = modal?.querySelector('.modal-close');
  
  if (readMoreBtn && modal) {
    readMoreBtn.addEventListener('click', () => {
      modal.hidden = false;
      modal.style.display = 'block';
      document.body.classList.add('no-scroll');
    });
    
    closeBtn?.addEventListener('click', () => {
      modal.hidden = true;
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        modal.hidden = true;
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.hidden = true;
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }
    });
  }
}

// Toast Notification
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Skip to main content with Tab
  if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.focus();
    }
  }
});

// Preload critical images
function preloadImages() {
  const criticalImages = [
    'assets/images/profile/headshot.jpg',
    'assets/images/projects/project1-thumbnail.jpg',
    'assets/images/projects/project2-thumbnail.jpg',
    'assets/images/projects/project3-thumbnail.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Skills Navigation - Open sidebar and navigate to core-skills
function initSkillsNavigation() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  const hamburger = document.querySelector('.hamburger');
  
  // Function to open sidebar and navigate to core-skills
  function openSidebarAndNavigateToSkills() {
    // Check if we're on mobile (sidebar is hidden by default)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && sidebar) {
      // Open sidebar on mobile
      sidebar.classList.add('active');
      if (overlay) overlay.classList.add('active');
      if (hamburger) hamburger.classList.add('active');
      document.body.classList.add('no-scroll');
    }
    
    // Navigate to core-skills section in sidebar
    setTimeout(() => {
      const coreSkillsSection = document.getElementById('core-skills');
      if (coreSkillsSection && sidebar) {
        const scrollTop = coreSkillsSection.offsetTop - sidebar.offsetTop - 50;
        
        // Smooth scroll to the Core Skills section
        sidebar.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        
        console.log('Navigating to Core Skills section');
      }
    }, isMobile ? 300 : 100); // Delay for mobile to allow sidebar animation
  }
  
  // Add event listeners to all Skills links
  const skillsLinks = document.querySelectorAll('a[href="#core-skills"]');
  skillsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebarAndNavigateToSkills();
    });
  });
  
  // Also handle any Skills links in footer
  const footerSkillsLinks = document.querySelectorAll('footer a[href="#core-skills"], .footer a[href="#core-skills"]');
  footerSkillsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebarAndNavigateToSkills();
    });
  });
}

// Initialize image preloading
preloadImages();

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
    
    if (loadTime > 3000) {
      console.warn('Page load time is slow:', loadTime + 'ms');
    }
  });
}
