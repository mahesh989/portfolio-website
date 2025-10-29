// Smart Sidebar Scrolling
export function initSidebarScroll() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  
  if (!sidebar || !mainContent) {
    console.warn('Sidebar or main content not found');
    return;
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
    }
  }, { passive: false });
  
  // Prevent main content scroll when hovering sidebar - IMPROVED
  document.addEventListener('wheel', (e) => {
    if (isHoveringSidebar) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { passive: false });
  
  // Handle main content scroll - THROTTLED
  let mainScrollTimeout = null;
  window.addEventListener('scroll', () => {
    if (isHoveringMain && !isScrolling) {
      clearTimeout(mainScrollTimeout);
      mainScrollTimeout = setTimeout(() => {
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
      }, 10); // Small delay to prevent conflicts
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
