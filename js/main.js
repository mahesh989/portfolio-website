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

// Mobile Button Touch Handler - Universal function for all buttons
function addMobileTouchHandling(element, clickHandler, options = {}) {
  if (!element) return;
  
  const isMobile = () => window.innerWidth <= 767;
  const {
    deltaTimeThreshold = 500,
    preventDefault = true,
    stopPropagation = true
  } = options;
  
  // Ensure element is touchable
  element.style.pointerEvents = 'auto';
  element.style.touchAction = 'manipulation';
  element.style.cursor = 'pointer';
  if (!element.style.zIndex || parseInt(element.style.zIndex) < 1000) {
    element.style.zIndex = '1000';
  }
  
  // Ensure child elements are also touchable
  element.querySelectorAll('*').forEach(child => {
    child.style.pointerEvents = 'auto';
    child.style.touchAction = 'manipulation';
  });
  
  let touchStartTime = 0;
  
  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartTime = Date.now();
    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };
  
  const handleTouchEnd = (e) => {
    const deltaTime = Date.now() - touchStartTime;
    
    if (deltaTime < deltaTimeThreshold) {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      clickHandler(e);
    }
  };
  
  // Add touch handlers with capture phase
  element.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
  
  // Also add to child elements
  element.querySelectorAll('*').forEach(child => {
    child.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    child.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
  });
  
  // Ensure click handler also uses capture phase
  element.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    clickHandler(e);
  }, { passive: false, capture: true });
}

// Make function globally available for modules
window.addMobileTouchHandling = addMobileTouchHandling;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  hideLoadingScreen();
  
  // Initialize all modules
  // initSmoothScroll(); // Disabled - using initEnhancedNavigation() instead (mobile-aware)
  initNavHighlight();
  initAnimations();
  initContactForm();
  initThemeToggle();
  initAnalytics();
  initSkillsWorkflow();
  initSidebarScroll();
  
  // CRITICAL: Initialize experience collapsible FIRST (before navigation)
  // This ensures toggle handlers are registered before navigation handlers
  initExperienceCollapsible();
  
  // Initialize conferences collapsible
  initConferencesCollapsible();
  
  // Initialize navigation (after toggle handlers)
  initEnhancedNavigation();
  
  // Initialize additional functionality
  initMobileMenu();
  initScrollToTop();
  initScrollToNext();
  initSkillBars();
  initStatsCounter();
  initTypingEffect();
  initProjectFilters();
  initCopyEmail();
  initJourneyModal();
  initMobileQuickNav();
  
  // Desktop-only iframe to img replacement for puppy GIF
  replacePuppyIframeOnDesktop();

  // Mobile: ensure Blogs link opens in same tab
  try {
    if (window.innerWidth <= 767) {
      document.querySelectorAll('a[href$="blogs.html"]').forEach(a => {
        if (a.target === '_blank') a.removeAttribute('target');
      });
    }
  } catch {}

  // Mark first visit (for sidebar behavior)
  try { if (!localStorage.getItem('visited')) localStorage.setItem('visited', '1'); } catch {}
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

// Mobile Quick Nav (three horizontal lines)
function initMobileQuickNav() {
  const trigger = document.getElementById('navLinesBtn');
  const panel = document.getElementById('mobileQuickNav');
  if (!trigger || !panel) return;
  let isAnimating = false;
  const closePanel = (after) => {
    if (!panel.classList.contains('open') || isAnimating) return;
    isAnimating = true;
    panel.classList.remove('open');
    panel.classList.add('closing');
    const onEnd = () => {
      panel.classList.remove('closing');
      isAnimating = false;
      if (typeof after === 'function') {
        // Defer to allow paint
        setTimeout(after, 10);
      }
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd, { once: true });
    // Fallback in case transitionend doesn't fire (Safari quirks)
    setTimeout(() => {
      if (isAnimating) {
        onEnd();
      }
    }, 260);
  };
  // Add mobile touch handling
  addMobileTouchHandling(trigger, (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      panel.classList.remove('closing');
      panel.classList.add('open');
    }
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== trigger) {
      closePanel();
    }
  });
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });
  // Close with animation THEN navigate
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href') || '';
      const navigate = () => {
        if (href.startsWith('#')) {
          const id = href.slice(1);
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', href);
          }
        } else {
          window.location.href = href;
        }
      };
      // Trigger animated close, then navigate
      closePanel(navigate);
    });
  });
  // Close on scroll
  window.addEventListener('scroll', closePanel, { passive: true });
}

// Collapsible Experience Sections
function initExperienceCollapsible() {
  const categories = document.querySelectorAll('.experience-category');
  if (!categories || categories.length === 0) return;
  const isMobile = () => window.innerWidth <= 767;
  
  categories.forEach((cat) => {
    const toggle = cat.querySelector('.exp-toggle');
    const panelId = toggle?.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : cat.querySelector('.experience-timeline');
    if (!toggle || !panel) {
      console.warn('[Experience] Toggle or panel not found for category:', cat);
      return;
    }
    
    // Ensure buttons are clickable on mobile
    toggle.style.pointerEvents = 'auto';
    toggle.style.touchAction = 'manipulation';
    toggle.style.cursor = 'pointer';
    toggle.style.zIndex = '1000';
    toggle.style.position = 'relative';
    
    // Mark button to prevent navigation handlers from intercepting
    toggle.dataset.isToggleButton = 'true';
    toggle.dataset.expToggle = 'true';
    
    // Ensure child elements are also touchable
    toggle.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
      child.style.touchAction = 'manipulation';
      child.dataset.isToggleButton = 'true';
    });
    
    // Ensure initial collapsed state per markup
    const isCollapsed = cat.classList.contains('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!isCollapsed));
    const label = toggle.querySelector('.exp-toggle-label');
    if (label) label.textContent = isCollapsed ? 'Expand' : 'Collapse';
    
    const handleToggle = (e) => {
      console.log('[Experience] Toggle button clicked/touched');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // CRITICAL: Prevent other handlers from firing
      
      const nowCollapsed = cat.classList.toggle('is-collapsed');
      toggle.setAttribute('aria-expanded', String(!nowCollapsed));
      if (label) label.textContent = nowCollapsed ? 'Expand' : 'Collapse';
      
      console.log('[Experience] Toggle completed, collapsed:', nowCollapsed);
      return false; // Additional safeguard
    };
    
    // CRITICAL: Use document-level capture phase listener to catch events BEFORE anything else
    const handleClickCapture = (e) => {
      // Only handle if the event target is this toggle or its children
      if (e.target === toggle || toggle.contains(e.target)) {
        console.log('[Experience] Capture phase click detected on toggle');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleToggle(e);
      }
    };
    
    // Add to document in capture phase - this runs BEFORE any other handlers
    document.addEventListener('click', handleClickCapture, { capture: true, passive: false });
    
    // Also add directly to button as backup
    toggle.addEventListener('click', handleToggle, { passive: false, capture: true });
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, { passive: false });
    
    // Touch handlers for mobile - use document-level capture to run FIRST
    let touchStartTime = 0;
    
    const handleTouchStartCapture = (e) => {
      if (e.target === toggle || toggle.contains(e.target)) {
        touchStartTime = Date.now();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('[Experience] Touch start on toggle');
      }
    };
    
    const handleTouchEndCapture = (e) => {
      if (e.target === toggle || toggle.contains(e.target)) {
        const deltaTime = Date.now() - touchStartTime;
        console.log('[Experience] Touch end on toggle, deltaTime:', deltaTime);
        
        if (deltaTime < 500) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          handleToggle(e);
        }
      }
    };
    
    // Add to document in capture phase
    document.addEventListener('touchstart', handleTouchStartCapture, { passive: true, capture: true });
    document.addEventListener('touchend', handleTouchEndCapture, { passive: false, capture: true });
    
    // Also add to button directly
    toggle.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, { passive: true, capture: true });
    
    toggle.addEventListener('touchend', (e) => {
      const deltaTime = Date.now() - touchStartTime;
      if (deltaTime < 500) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleToggle(e);
      }
    }, { passive: false, capture: true });
  });
}

// Collapsible Conferences Sections
function initConferencesCollapsible() {
  const isMobile = () => window.innerWidth <= 767;
  
  // Handle section-level toggle
  const category = document.querySelector('.conferences-category');
  const sectionToggle = document.querySelector('.conf-section-toggle');
  
  if (category && sectionToggle) {
    // Ensure initial collapsed state
    category.classList.add('is-collapsed');
    sectionToggle.setAttribute('aria-expanded', 'false');
    const label = sectionToggle.querySelector('.conf-toggle-label');
    if (label) label.textContent = 'Expand';
    
    // Mark button to prevent navigation handlers
    sectionToggle.dataset.isToggleButton = 'true';
    sectionToggle.dataset.confSectionToggle = 'true';
    sectionToggle.style.pointerEvents = 'auto';
    sectionToggle.style.touchAction = 'manipulation';
    sectionToggle.style.cursor = 'pointer';
    sectionToggle.style.zIndex = '1000';
    
    const handleSectionToggle = (e) => {
      console.log('[Conferences] Section toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      const isCollapsed = category.classList.toggle('is-collapsed');
      sectionToggle.setAttribute('aria-expanded', String(!isCollapsed));
      if (label) label.textContent = isCollapsed ? 'Expand' : 'Collapse';
      
      console.log('[Conferences] Section toggled, collapsed:', isCollapsed);
      return false;
    };
    
    // Add click handler with capture phase
    sectionToggle.addEventListener('click', handleSectionToggle, { passive: false, capture: true });
    
    // Touch handlers for mobile
    let touchStartTime = 0;
    sectionToggle.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      e.stopPropagation();
    }, { passive: true, capture: true });
    
    sectionToggle.addEventListener('touchend', (e) => {
      const deltaTime = Date.now() - touchStartTime;
      if (deltaTime < 500) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleSectionToggle(e);
      }
    }, { passive: false, capture: true });
  }
  
  // Handle individual conference items
  const conferenceItems = document.querySelectorAll('.conference-item');
  if (!conferenceItems || conferenceItems.length === 0) return;
  
  conferenceItems.forEach((item) => {
    const toggle = item.querySelector('.conference-header');
    const panel = item.querySelector('.conference-details');
    if (!toggle || !panel) {
      console.warn('[Conferences] Toggle or panel not found for item:', item);
      return;
    }
    
    // Ensure buttons are clickable on mobile
    toggle.style.pointerEvents = 'auto';
    toggle.style.touchAction = 'manipulation';
    toggle.style.cursor = 'pointer';
    toggle.style.zIndex = '1000';
    toggle.style.position = 'relative';
    
    // Mark button to prevent navigation handlers from intercepting
    toggle.dataset.isToggleButton = 'true';
    toggle.dataset.confToggle = 'true';
    
    // Ensure child elements are also touchable
    toggle.querySelectorAll('*').forEach(child => {
      child.style.pointerEvents = 'auto';
      child.style.touchAction = 'manipulation';
      child.dataset.isToggleButton = 'true';
    });
    
    // Ensure initial collapsed state (aria-expanded starts as false)
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(isExpanded));
    
    const handleToggle = (e) => {
      console.log('[Conferences] Toggle button clicked/touched');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // CRITICAL: Prevent other handlers from firing
      
      const currentlyExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !currentlyExpanded;
      toggle.setAttribute('aria-expanded', String(newState));
      
      console.log('[Conferences] Toggle completed, expanded:', newState);
      return false; // Additional safeguard
    };
    
    // CRITICAL: Use document-level capture phase listener to catch events BEFORE anything else
    const handleClickCapture = (e) => {
      // Only handle if the event target is this toggle or its children
      if (e.target === toggle || toggle.contains(e.target)) {
        console.log('[Conferences] Capture phase click detected on toggle');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleToggle(e);
      }
    };
    
    // Add to document in capture phase - this runs BEFORE any other handlers
    document.addEventListener('click', handleClickCapture, { capture: true, passive: false });
    
    // Also add directly to button as backup
    toggle.addEventListener('click', handleToggle, { passive: false, capture: true });
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, { passive: false });
    
    // Touch handlers for mobile - use document-level capture to run FIRST
    let touchStartTime = 0;
    
    const handleTouchStartCapture = (e) => {
      if (e.target === toggle || toggle.contains(e.target)) {
        touchStartTime = Date.now();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('[Conferences] Touch start on toggle');
      }
    };
    
    const handleTouchEndCapture = (e) => {
      if (e.target === toggle || toggle.contains(e.target)) {
        const deltaTime = Date.now() - touchStartTime;
        console.log('[Conferences] Touch end on toggle, deltaTime:', deltaTime);
        
        if (deltaTime < 500) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          handleToggle(e);
        }
      }
    };
    
    // Add to document in capture phase
    document.addEventListener('touchstart', handleTouchStartCapture, { passive: true, capture: true });
    document.addEventListener('touchend', handleTouchEndCapture, { passive: false, capture: true });
    
    // Also add to button directly
    toggle.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, { passive: true, capture: true });
    
    toggle.addEventListener('touchend', (e) => {
      const deltaTime = Date.now() - touchStartTime;
      if (deltaTime < 500) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleToggle(e);
      }
    }, { passive: false, capture: true });
  });
}

// Mobile Menu - Fixed: Immediate Scroll + No Content Shift
function initMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  const sidebarClose = document.querySelector('.sidebar-close');
  // Use hamburger from top-nav (not mobile-header)
  const hamburger = document.querySelector('.top-nav .hamburger');
  
  if (!sidebar) return;
  
  let scrollY = 0;
  const isMobile = () => window.innerWidth <= 767;
  
  const openSidebar = () => {
    scrollY = window.scrollY;
    
    // Add classes
    sidebar.classList.add('active');
    document.body.classList.add('sidebar-open');
    document.body.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (hamburger) hamburger.classList.add('active');
    
    // CRITICAL: Ensure body can scroll on mobile
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.position = 'relative';
    document.body.style.height = 'auto';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    
    // Reset sidebar scroll and enable scrolling
    sidebar.scrollTop = 0;
    
    // CRITICAL: Force enable sidebar scrolling
        sidebar.style.overflowY = 'auto';
        sidebar.style.webkitOverflowScrolling = 'touch';
        sidebar.style.touchAction = 'pan-y';
  };
  
  const closeSidebar = () => {
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    document.body.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    
    // CRITICAL: Restore scrolling - reset all inline styles
    document.body.style.overflowY = '';
    document.body.style.overflowX = '';
    document.body.style.position = '';
    document.body.style.height = '';
    document.documentElement.style.overflowY = '';
    document.documentElement.style.overflowX = '';
    
    // No need to restore scroll position since body wasn't locked
  };
  
  const toggleSidebar = () => {
    sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
  };
  
  // Event listeners - use click with capture to ensure it fires
  if (sidebarClose) {
    // Mark button to prevent navigation handlers from intercepting
    sidebarClose.dataset.isCloseButton = 'true';
    sidebarClose.dataset.isToggleButton = 'true';
    
    // CRITICAL: Use document-level capture to run BEFORE navigation handlers
    const handleCloseClickCapture = (e) => {
      if (e.target === sidebarClose || sidebarClose.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // CRITICAL: Stop all other handlers
        closeSidebar();
      }
    };
    
    document.addEventListener('click', handleCloseClickCapture, { capture: true, passive: false });
    
    // Add mobile touch handling
    addMobileTouchHandling(sidebarClose, (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // CRITICAL: Stop all other handlers
      closeSidebar();
    });
    
    // Also keep original click handler on button itself
    sidebarClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // CRITICAL: Stop all other handlers
      closeSidebar();
    }, { passive: false, capture: true });
  }
  
  if (hamburger) {
    // Add mobile touch handling
    addMobileTouchHandling(hamburger, (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    });
    
    // Also keep original click handler for desktop
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      // CRITICAL: Don't close sidebar if click was on top-nav
      const topNav = document.querySelector('.top-nav');
      if (topNav && topNav.contains(e.target)) {
        return; // Allow top-nav clicks to go through
      }
      e.preventDefault();
      closeSidebar();
    });
    
    // Also prevent overlay from blocking touch events on top-nav
    overlay.addEventListener('touchstart', (e) => {
      const topNav = document.querySelector('.top-nav');
      if (topNav && topNav.contains(e.target)) {
        e.stopPropagation(); // Don't let overlay handle this touch
      }
    }, { passive: true });
  }
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
  
  // Note: Navigation link clicks are now handled by initEnhancedNavigation()
  // which properly closes the sidebar before navigating
  
  // CRITICAL: Prevent scroll ONLY on body/overlay, NOT sidebar or navigation links
  let touchStartY = 0;
  let isTouchingInSidebar = false;
  let isTouchingNavLink = false;
  let isTouchingButton = false;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    const target = e.target;
    // Check if touch started inside sidebar
    isTouchingInSidebar = sidebar && sidebar.contains(target);
    // Check if touch started on a navigation link (or parent is nav link)
    const navLink = target.closest('a[href^="#"]');
    isTouchingNavLink = !!(navLink || (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')));
    
    // Check if touching interactive buttons
    isTouchingButton = !!(target.classList.contains('view-btn') || 
                          target.closest('.view-btn') ||
                          target.classList.contains('exp-toggle') ||
                          target.closest('.exp-toggle') ||
                          (target.tagName === 'BUTTON' && !target.disabled) ||
                          target.closest('button:not([disabled])'));
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    // Only if sidebar is open
    if (!sidebar || !sidebar.classList.contains('active')) return;
    
    const target = e.target;
    
    // CRITICAL: ALWAYS allow scrolling inside the sidebar - check if target is inside sidebar
    if (sidebar.contains(target)) {
      return; // Don't prevent default - allow sidebar scrolling
    }
    
    // CRITICAL: Always allow touches on navigation links (including top-nav)
    const targetLink = target.closest('a[href^="#"]'); // Check if target or parent is a nav link
    
    // Don't prevent default for nav links (anywhere on page, including top-nav)
    if (targetLink || (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#'))) {
      return; // Don't prevent default for nav links
    }
    
    // CRITICAL: Allow touches on interactive buttons (view toggle buttons, expand buttons)
    if (target.classList.contains('view-btn') || target.closest('.view-btn')) {
      return; // Don't prevent default for view toggle buttons
    }
    if (target.classList.contains('exp-toggle') || target.closest('.exp-toggle')) {
      return; // Don't prevent default for expand/collapse buttons
    }
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const button = target.tagName === 'BUTTON' ? target : target.closest('button');
      // Allow buttons that are interactive (not disabled)
      if (button && !button.disabled) {
        return; // Don't prevent default for interactive buttons
      }
    }
    
    // If touch started inside sidebar, always allow scroll
    if (isTouchingInSidebar) return;
    
    // If touch started on nav link, allow it
    if (isTouchingNavLink) return;
    
    // If touch started on interactive button, allow it
    if (isTouchingButton) return;
    
    // Also check if current target is inside sidebar or is a nav link
    if (target.closest('a[href^="#"]')) return; // Check if parent is nav link
    
    // CRITICAL: Also check if touching top-nav (it should always work)
    const topNav = document.querySelector('.top-nav');
    if (topNav && topNav.contains(target)) {
      return; // Don't prevent default for top-nav touches
    }
    
    // Prevent scroll everywhere else (body, overlay, main content)
    e.preventDefault();
  }, { passive: false });
  
  document.addEventListener('touchend', (e) => {
    isTouchingInSidebar = false;
    isTouchingNavLink = false;
    isTouchingButton = false;
  }, { passive: true });
  
  // Auto-open only on FIRST visit on index page (not blogs) and only on mobile
  try {
    const isFirstVisit = !sessionStorage.getItem('sidebarShownOnce') && !localStorage.getItem('sidebarShownEver');
    const isBlogsPage = /(^|\/)blogs\.html$/.test(window.location.pathname);
    if (isMobile() && isFirstVisit && !isBlogsPage) {
      setTimeout(() => {
        openSidebar();
        sessionStorage.setItem('sidebarShownOnce', '1');
        localStorage.setItem('sidebarShownEver', '1');
      }, 500);
  }
  } catch {}
  
  // Handle resize
  let wasMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (nowMobile && !wasMobile) {
      openSidebar();
    } else if (!nowMobile && wasMobile) {
      closeSidebar();
    }
    wasMobile = nowMobile;
  });
}

// Scroll to Top
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  
  if (!scrollBtn) {
    console.warn('Scroll to top button not found');
    return;
  }
  
  try {
    // Optimized scroll handler with RAF and passive listener
    let scrollRAF = null;
    const handleScroll = throttle(() => {
      if (scrollRAF) {
        cancelAnimationFrame(scrollRAF);
      }
      scrollRAF = requestAnimationFrame(() => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
        scrollRAF = null;
      });
    }, 200);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add mobile touch handling
    addMobileTouchHandling(scrollBtn, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Also keep original click handler
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

    // Optimized scroll handler with RAF and passive listener
    let scrollRAF = null;
    const handleScroll = throttle(() => {
      if (scrollRAF) {
        cancelAnimationFrame(scrollRAF);
      }
      scrollRAF = requestAnimationFrame(() => {
        updateVisibility();
        scrollRAF = null;
      });
    }, 200);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', throttle(updateVisibility, 200), { passive: true });
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

    // Add mobile touch handling
    addMobileTouchHandling(nextBtn, () => {
      // Scroll by one viewport height without overshooting the bottom
      const maxTarget = document.body.scrollHeight - window.innerHeight;
      const desired = window.pageYOffset + window.innerHeight;
      const distance = Math.max(0, Math.min(window.innerHeight, maxTarget - window.pageYOffset));
      if (distance > 0) smoothScrollBy(distance);
      setTimeout(updateVisibility, 350);
    });
    
    // Also keep original click handler
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
    'AI Engineer'
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
      const handleFilterClick = () => {
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
      };
      
      // Add mobile touch handling
      addMobileTouchHandling(btn, handleFilterClick);
      
      // Also keep original click handler
      btn.addEventListener('click', handleFilterClick);
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

// Enhanced Navigation - Handle all sections (sidebar and main content)
function initEnhancedNavigation() {
  console.log('[Navigation] Initializing enhanced navigation system...');
  
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  // Use hamburger from top-nav (not mobile-header)
  const hamburger = document.querySelector('.top-nav .hamburger');
  const isMobile = () => window.innerWidth <= 767; // Consistent with initMobileMenu
  
  if (!sidebar) {
    console.error('[Navigation] Sidebar not found!');
    return;
  }
  
  console.log('[Navigation] Sidebar found, setting up navigation...');
  
  // Sections in sidebar (only for desktop - on mobile, all sections are in main content)
  const sidebarSections = ['core-skills'];
  
  // Shared close sidebar function
  function closeSidebar() {
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    document.body.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    
    // CRITICAL: Restore scrolling - keep it simple
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.body.style.overflowX = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = '';
    document.documentElement.style.overflowX = 'hidden';
    
    // No padding adjustments needed since we didn't lock scroll
    // No need to force reflow
  }
  
  // Function to open sidebar and navigate to a section within it
  function openSidebarAndNavigate(sectionId) {
    console.log(`[Navigation] openSidebarAndNavigate called for: ${sectionId}`);
    if (isMobile() && sidebar) {
      // Open sidebar on mobile
      sidebar.classList.add('active');
      if (overlay) overlay.classList.add('active');
      if (hamburger) hamburger.classList.add('active');
      document.body.classList.add('sidebar-open');
      document.body.classList.add('active');
      
      // CRITICAL: Ensure body can scroll on mobile
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.height = 'auto';
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      
      // CRITICAL: Enable sidebar scrolling immediately
      sidebar.style.overflowY = 'auto';
      sidebar.style.overflowX = 'hidden';
      sidebar.style.webkitOverflowScrolling = 'touch';
      sidebar.style.touchAction = 'pan-y';
      sidebar.style.overscrollBehaviorY = 'contain';
      
      // Navigate to section first (scroll to it)
      setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          // Scroll the sidebar to show the target section
          targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
    
    // Navigate to section in sidebar
    setTimeout(() => {
      const targetSection = document.getElementById(sectionId);
      if (targetSection && sidebar) {
        const scrollTop = targetSection.offsetTop - sidebar.offsetTop - 50;
        
        sidebar.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        console.log(`[Navigation] Scrolled sidebar to ${sectionId}`);
      } else {
        console.error(`[Navigation] Target section ${sectionId} not found`);
      }
    }, isMobile() ? 300 : 100);
  }
  
  // Scroll function using scrollIntoView (Method D - the one that works!)
  function scrollToSectionWithScrollIntoView(sectionId, topOffset) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;
    
    console.log(`[Navigation] Using scrollIntoView for: ${sectionId}`);
    
    // CRITICAL: Ensure no scroll blocking
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Force layout calculation
    void targetSection.offsetHeight;
    
    // Use the working method: scrollIntoView
    targetSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Adjust for fixed header offset
    setTimeout(() => {
      const currentPos = window.scrollY;
      const targetPos = Math.max(0, targetSection.offsetTop - topOffset);
      
      if (Math.abs(currentPos - targetPos) > 10) {
        console.log(`[Navigation] Adjusting scroll position for header offset...`);
        window.scrollBy(0, -topOffset);
      }
      
      console.log(`[Navigation] ✅ Scroll to ${sectionId} completed!`);
    }, 600);
  }

  // Function to navigate to main content section
  function navigateToMainContent(sectionId) {
    console.log(`[Navigation] navigateToMainContent called for: ${sectionId}`);
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection) {
      console.error(`[Navigation] Section ${sectionId} not found in DOM!`);
      return;
    }
    
    const sidebarWasOpen = sidebar && sidebar.classList.contains('active');
    const topOffset = isMobile() ? 70 : 20;
    
    // Close sidebar first if needed
    if (isMobile() && sidebarWasOpen) {
      console.log('[Navigation] Closing sidebar...');
      closeSidebar();
      
      // Wait for sidebar to fully close, then scroll
      setTimeout(() => {
        scrollToSectionWithScrollIntoView(sectionId, topOffset);
      }, 400);
    } else {
      // Immediate scroll
      scrollToSectionWithScrollIntoView(sectionId, topOffset);
    }
  }
  
  // Handle all navigation links (top nav, footer, anywhere)
  function handleNavigationClick(e, href) {
    // Prevent default anchor behavior
    e.preventDefault();
    e.stopPropagation();
    
    const sectionId = href.replace('#', '');
    console.log(`[Navigation] Link clicked/touched for section: ${sectionId}, Mobile: ${isMobile()}`);
    // Define proceed navigation first so callbacks can reference it
    const proceed = () => {
    // On mobile, always navigate to main content (even if it's core-skills-mobile)
    // On desktop, check if it's a sidebar section
    if (!isMobile() && sidebarSections.includes(sectionId)) {
      console.log(`[Navigation] Navigating to sidebar section: ${sectionId}`);
      openSidebarAndNavigate(sectionId);
    } else {
      console.log(`[Navigation] Navigating to main content section: ${sectionId}`);
      navigateToMainContent(sectionId);
    }
    };
    
    // If mobile quick nav is open, close it FIRST, then navigate
    const quickNavPanel = document.getElementById('mobileQuickNav');
    if (quickNavPanel && quickNavPanel.classList.contains('open')) {
      quickNavPanel.classList.remove('open');
      quickNavPanel.classList.add('closing');
      const onEnd = () => {
        quickNavPanel.classList.remove('closing');
        proceed();
      };
      quickNavPanel.addEventListener('transitionend', onEnd, { once: true });
      setTimeout(() => { try { onEnd(); } catch {} }, 260);
      return;
    }

    proceed();
  }
  
  // Add event listeners to all navigation links
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  console.log(`[Navigation] Found ${allNavLinks.length} navigation links`);
  
  // Track touched links to prevent double-firing (touch + click)
  const touchedLinks = new WeakSet();
  
  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    
    if (href && href !== '#') {
      // CRITICAL: Ensure links are always clickable on mobile
      link.style.pointerEvents = 'auto';
      link.style.touchAction = 'manipulation';
      link.style.cursor = 'pointer';
      link.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0.1)';
      
      // Handle click events (desktop and mobile fallback)
      link.addEventListener('click', (e) => {
        // CRITICAL: Don't handle navigation if click came from a toggle button or close button
        const target = e.target;
        if (target.closest('.exp-toggle') || 
            target.closest('.conference-header') ||
            target.closest('.conf-section-toggle') ||
            target.closest('[data-is-toggle-button="true"]') ||
            target.closest('[data-exp-toggle="true"]') ||
            target.closest('[data-conf-toggle="true"]') ||
            target.closest('[data-conf-section-toggle="true"]') ||
            target.closest('.sidebar-close') ||
            target.closest('[data-is-close-button="true"]') ||
            target.dataset.isToggleButton === 'true' ||
            target.dataset.expToggle === 'true' ||
            target.dataset.confToggle === 'true' ||
            target.dataset.confSectionToggle === 'true' ||
            target.dataset.isCloseButton === 'true') {
          console.log('[Navigation] Ignoring click - came from toggle/close button');
          return; // Let button handle its own click
        }
        
        // On mobile, skip if touch was already handled for this link
        if (isMobile() && touchedLinks.has(link)) {
          touchedLinks.delete(link);
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        handleNavigationClick(e, href);
      });
      
      // CRITICAL: Add touchstart handler for mobile devices (<= 767px)
      // Touchstart fires immediately, more reliable than click on mobile
      // We use touchstart to ensure it fires before any scroll prevention
      link.addEventListener('touchstart', (e) => {
        // Only handle if on mobile
        if (isMobile()) {
          console.log(`[Navigation] Touch start detected on mobile for: ${href}`);
          // Mark that we're handling this touch
          link.dataset.touchHandled = 'true';
        }
      }, { passive: true }); // passive for touchstart to avoid blocking
      
      // CRITICAL: Add touchend handler for mobile devices (<= 767px)
      // touchend fires when tap completes, more reliable than click on mobile
      link.addEventListener('touchend', (e) => {
        // CRITICAL: Don't handle navigation if touch came from a toggle button or close button
        const target = e.target;
        if (target.closest('.exp-toggle') || 
            target.closest('.conference-header') ||
            target.closest('.conf-section-toggle') ||
            target.closest('[data-is-toggle-button="true"]') ||
            target.closest('[data-exp-toggle="true"]') ||
            target.closest('[data-conf-toggle="true"]') ||
            target.closest('[data-conf-section-toggle="true"]') ||
            target.closest('.sidebar-close') ||
            target.closest('[data-is-close-button="true"]') ||
            target.dataset.isToggleButton === 'true' ||
            target.dataset.expToggle === 'true' ||
            target.dataset.confToggle === 'true' ||
            target.dataset.confSectionToggle === 'true' ||
            target.dataset.isCloseButton === 'true') {
          console.log('[Navigation] Ignoring touchend - came from toggle/close button');
          return; // Let button handle its own touch
        }
        
        // Only handle if on mobile and touch was started on this link
        if (isMobile() && link.dataset.touchHandled === 'true') {
          console.log(`[Navigation] Touch end detected on mobile for: ${href}`);
          e.preventDefault(); // Prevent default anchor behavior
          e.stopPropagation(); // Stop propagation to overlay
          e.stopImmediatePropagation(); // Stop other handlers
          touchedLinks.add(link);
          handleNavigationClick(e, href);
          // Clear flags after delay to allow normal clicks if needed
          setTimeout(() => {
            touchedLinks.delete(link);
            link.dataset.touchHandled = 'false';
          }, 500);
        }
      }, { passive: false }); // non-passive so we can preventDefault
    }
  });
  
  console.log(`[Navigation] Navigation system initialized - Mobile: ${isMobile()}, Links: ${allNavLinks.length}`);
  
  // Ensure external links (like blogs.html) work properly on all devices and browsers
  // These links are NOT selected by the navigation handler above (only # links are)
  // So they will use default browser behavior (target="_blank" will open in new tab)
  // Handle both top nav and footer nav external links
  const externalNavLinks = document.querySelectorAll(
    'a.top-nav-item[href$=".html"], ' +
    'a.footer-nav a[href$=".html"], ' +
    'nav.footer-nav > a[href$=".html"]'
  );
  
  externalNavLinks.forEach((link) => {
    // Ensure these links are always clickable on all devices
    link.style.pointerEvents = 'auto';
    link.style.touchAction = 'manipulation';
    link.style.cursor = 'pointer';
    link.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0.1)';
    
    // Explicitly ensure target="_blank" works across all browsers and devices
    // Modern browsers handle this natively, but we ensure no interference
    if (link.hasAttribute('target') && link.getAttribute('target') === '_blank') {
      // The link will naturally open in a new tab - no preventDefault needed
      // The navigation handler above only handles href^="#" links, so this is safe
    }
  });
}

// Desktop-only iframe to img replacement for puppy GIF
function replacePuppyIframeOnDesktop() {
  // Only run on desktop (width > 768px)
  if (window.innerWidth <= 768) {
    return; // Mobile keeps iframe
  }
  
  const puppy = document.querySelector('.hero-puppy');
  if (!puppy) return;
  
  const iframe = puppy.querySelector('iframe');
  // Check if already replaced (img exists) or no iframe found
  if (!iframe || puppy.querySelector('img')) {
    return;
  }
  
  // Extract Giphy ID from iframe src
  // Format: https://giphy.com/embed/RrVJHB3KSTCznWubpd
  const iframeSrc = iframe.src;
  const giphyIdMatch = iframeSrc.match(/embed\/([a-zA-Z0-9]+)/);
  
  if (!giphyIdMatch) {
    console.warn('[Puppy GIF] Could not extract Giphy ID from iframe src');
    return;
  }
  
  const giphyId = giphyIdMatch[1];
  const gifUrl = `https://media.giphy.com/media/${giphyId}/giphy.gif`;
  
  // Create img element with desktop-specific styling
  const img = document.createElement('img');
  img.src = gifUrl;
  img.alt = 'Animated puppy';
  img.style.cssText = 'width:100%; height:100%; object-fit:cover; object-position:center 60%; border-radius:50%; display:block;';
  
  // Replace iframe with img
  puppy.innerHTML = '';
  puppy.appendChild(img);
  
  console.log('✅ Replaced iframe with img on desktop - 60% position should work now');
  
  // Handle window resize - revert to iframe if user resizes to mobile
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= 768 && puppy.querySelector('img')) {
        // User resized to mobile - restore iframe (reload page or recreate iframe)
        location.reload(); // Simple solution - reload to restore original HTML
      }
    }, 250);
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
