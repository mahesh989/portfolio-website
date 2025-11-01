// Smart Sidebar Scrolling
export function initSidebarScroll() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  
  if (!sidebar || !mainContent) {
    console.warn('Sidebar or main content not found');
    return;
  }
  
  // CRITICAL FIX: Only run on desktop (>767px)
  const isDesktop = window.innerWidth > 767;
  if (!isDesktop) {
    console.log('Mobile detected - skipping simultaneous scroll');
    return; // Exit early on mobile
  }
  
  let isHoveringSidebar = false;
  let isHoveringMain = false;
  let scrollTimeout = null;
  let isScrolling = false;
  let lastScrollTime = 0;
  
  console.log('Initializing smart scroll...');
  console.log('Sidebar scrollHeight:', sidebar.scrollHeight);
  console.log('Sidebar clientHeight:', sidebar.clientHeight);
  console.log('Can sidebar scroll:', sidebar.scrollHeight > sidebar.clientHeight);
  
  // CRITICAL: Set initial state - assume user is in main content area
  isHoveringMain = true;
  isHoveringSidebar = false;
  
  // Track mouse position for sidebar
  sidebar.addEventListener('mouseenter', () => {
    isHoveringSidebar = true;
    isHoveringMain = false;
    console.log('Mouse entered sidebar');
  });
  
  sidebar.addEventListener('mouseleave', () => {
    isHoveringSidebar = false;
    console.log('Mouse left sidebar');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      sidebar.classList.remove('sidebar-scrolling');
    }, 300);
  });
  
  // Track mouse position for main content
  mainContent.addEventListener('mouseenter', () => {
    isHoveringMain = true;
    isHoveringSidebar = false;
    console.log('Mouse entered main content');
  });
  
  mainContent.addEventListener('mouseleave', () => {
    isHoveringMain = false;
    console.log('Mouse left main content');
  });
  
  // Handle sidebar scroll when hovering sidebar - IMPROVED THROTTLING
  sidebar.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      e.preventDefault();
      e.stopPropagation();
      
      // Set flag to prevent main content sync
      isScrolling = true;
      
      // Throttle scroll events to prevent vibration
      const now = Date.now();
      if (now - lastScrollTime < 16) { // ~60fps throttling
        return;
      }
      lastScrollTime = now;
      
      // Use same scroll speed as main content
      const scrollAmount = e.deltaY;
      const currentScroll = sidebar.scrollTop;
      const maxScroll = sidebar.scrollHeight - sidebar.clientHeight;
      
      // Direct scroll - no animation delays that cause vibration
      const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + scrollAmount));
      sidebar.scrollTop = newScroll;
      
      // Add visual feedback
      sidebar.classList.add('sidebar-scrolling');
      
      // Clear flag after scroll completes
      setTimeout(() => {
        isScrolling = false;
      }, 100);
    }
  }, { passive: false });
  
  // Prevent main content scroll when hovering sidebar - CRITICAL FIX
  document.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { passive: false });
  
  // CRITICAL: Also prevent window scroll events from syncing when hovering sidebar
  window.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { passive: false });
  
  // Handle main content scroll - THROTTLED
  // CRITICAL FIX: Always sync sidebar with main content scroll, not just when hovering
  let mainScrollTimeout = null;
  
  // Function to sync sidebar with main content
  function syncSidebarWithMain() {
    const mainScroll = window.pageYOffset;
    
    // Calculate proportional scroll position (same speed as main)
    const mainMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const sidebarMaxScroll = sidebar.scrollHeight - sidebar.clientHeight;
    
    if (mainMaxScroll > 0 && sidebarMaxScroll > 0) {
      const scrollRatio = mainScroll / mainMaxScroll;
      const sidebarScroll = scrollRatio * sidebarMaxScroll;
      
      // Apply scroll to sidebar
      sidebar.scrollTop = sidebarScroll;
    }
  }
  
  // CRITICAL: Initialize sync immediately on load
  setTimeout(() => {
    syncSidebarWithMain();
    console.log('Initial sidebar sync completed at load');
  }, 100);
  
  // CRITICAL: Also sync after a longer delay to catch late-loading content
  setTimeout(() => {
    syncSidebarWithMain();
    console.log('Secondary sidebar sync completed');
  }, 500);
  
  window.addEventListener('scroll', () => {
    // CRITICAL: Only sync when NOT hovering sidebar AND not actively scrolling sidebar
    if (!isHoveringSidebar && !isScrolling) {
      clearTimeout(mainScrollTimeout);
      mainScrollTimeout = setTimeout(() => {
        syncSidebarWithMain();
      }, 5); // Reduced delay for more responsive sync
    }
  });
  
  // Disable smooth scroll behavior to prevent vibration
  sidebar.style.scrollBehavior = 'auto';
  
  // Add visual feedback for scroll state
  sidebar.addEventListener('scroll', () => {
    if (isHoveringSidebar) {
      sidebar.classList.add('sidebar-scrolling');
    }
  });
  
  // Handle Skills navigation to Core Skills section
  const skillsLink = document.querySelector('a[href="#core-skills"]');
  if (skillsLink) {
    skillsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const coreSkillsSection = document.getElementById('core-skills');
      if (coreSkillsSection) {
        // Scroll the sidebar to show the Core Skills section
        const scrollTop = coreSkillsSection.offsetTop - sidebar.offsetTop - 50;
        
        // Smooth scroll to the Core Skills section
        sidebar.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        
        console.log('Scrolling to Core Skills section');
      }
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSidebarScroll);
