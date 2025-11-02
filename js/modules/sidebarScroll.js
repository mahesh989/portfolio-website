// Smart Sidebar Scrolling - Simultaneous scroll by default, independent when hovering sidebar
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
  let isSidebarScrolling = false;
  let mainScrollTimeout = null;
  let hoverTimeout = null;
  
  console.log('Initializing smart scroll...');
  console.log('Sidebar scrollHeight:', sidebar.scrollHeight);
  console.log('Sidebar clientHeight:', sidebar.clientHeight);
  console.log('Can sidebar scroll:', sidebar.scrollHeight > sidebar.clientHeight);
  
  // Track mouse position for sidebar with debounce to prevent flickering
  sidebar.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      isHoveringSidebar = true;
      sidebar.classList.add('sidebar-hover');
      console.log('Mouse entered sidebar - independent scroll enabled');
    }, 50); // Small delay to prevent flickering
  });
  
  sidebar.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    isHoveringSidebar = false;
    sidebar.classList.remove('sidebar-hover');
    sidebar.classList.remove('sidebar-scrolling');
    isSidebarScrolling = false;
    console.log('Mouse left sidebar - simultaneous scroll enabled');
  });
  
  // CRITICAL: Prevent window scroll when hovering sidebar
  window.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });
  
  // Handle sidebar scroll when hovering sidebar - INDEPENDENT SCROLLING
  sidebar.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      // Prevent event from bubbling
      e.stopPropagation();
      
      // Set flag to prevent main content sync
      isSidebarScrolling = true;
      
      // Add visual feedback
      sidebar.classList.add('sidebar-scrolling');
      
      // Clear flag after a short delay
      clearTimeout(mainScrollTimeout);
      mainScrollTimeout = setTimeout(() => {
        isSidebarScrolling = false;
        sidebar.classList.remove('sidebar-scrolling');
      }, 150);
    }
  }, { passive: true });
  
  // Track last scroll position to avoid unnecessary updates
  let lastMainScroll = -1;
  let syncInProgress = false;
  
  // Function to sync sidebar with main content
  function syncSidebarWithMain() {
    if (isHoveringSidebar || isSidebarScrolling || syncInProgress) {
      return; // Don't sync when hovering, scrolling sidebar, or sync in progress
    }
    
    const mainScroll = window.pageYOffset;
    
    // Skip if scroll position hasn't changed significantly
    if (Math.abs(mainScroll - lastMainScroll) < 1) {
      return;
    }
    
    lastMainScroll = mainScroll;
    syncInProgress = true;
    
    // Calculate proportional scroll position
    const mainMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const sidebarMaxScroll = sidebar.scrollHeight - sidebar.clientHeight;
    
    if (mainMaxScroll > 0 && sidebarMaxScroll > 0) {
      const scrollRatio = mainScroll / mainMaxScroll;
      const targetSidebarScroll = scrollRatio * sidebarMaxScroll;
      
      // Only update if the difference is significant
      if (Math.abs(sidebar.scrollTop - targetSidebarScroll) > 0.5) {
        sidebar.scrollTop = targetSidebarScroll;
      }
    }
    
    syncInProgress = false;
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
  
  // Sync sidebar with main content scroll (SIMULTANEOUS SCROLLING)
  let scrollRAF = null;
  window.addEventListener('scroll', () => {
    if (!isHoveringSidebar && !isSidebarScrolling) {
      // Cancel previous animation frame to prevent stacking
      if (scrollRAF) {
        cancelAnimationFrame(scrollRAF);
      }
      // Use RAF for smooth sync
      scrollRAF = requestAnimationFrame(() => {
        syncSidebarWithMain();
        scrollRAF = null;
      });
    }
  }, { passive: true });
  
  // Disable smooth scroll behavior to prevent lag
  sidebar.style.scrollBehavior = 'auto';
  
  // Handle resize events to re-check desktop mode
  window.addEventListener('resize', () => {
    const nowDesktop = window.innerWidth > 767;
    if (!nowDesktop) {
      // Clean up if switched to mobile
      sidebar.classList.remove('sidebar-hover');
      sidebar.classList.remove('sidebar-scrolling');
    }
  });
  
  // NOTE: Skills navigation is now handled by initEnhancedNavigation() in main.js
  // This ensures consistent behavior across desktop and mobile, with proper touch event support
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSidebarScroll);
