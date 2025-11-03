// Analytics Module
export function initAnalytics() {
  // Google Analytics 4
  const measurementId = 'G-XXXXXXXXXX'; // Replace with your GA4 measurement ID
  
  // Load Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  });
  
  // Track custom events
  trackDownloads();
  trackExternalLinks();
  trackProjectViews();
  trackFormInteractions();
  trackScrollDepth();
}

function trackDownloads() {
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'file_download', {
          event_category: 'Downloads',
          event_label: link.getAttribute('href'),
          value: 1
        });
      }
    });
  });
}

function trackExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'click', {
          event_category: 'External Links',
          event_label: link.getAttribute('href'),
          transport_type: 'beacon'
        });
      }
    });
  });
}

function trackProjectViews() {
  const projectCards = document.querySelectorAll('.project-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const projectTitle = entry.target.querySelector('.project-title').textContent;
        
        if (window.gtag) {
          gtag('event', 'view_item', {
            event_category: 'Projects',
            event_label: projectTitle
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  projectCards.forEach(card => observer.observe(card));
}

function trackFormInteractions() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Track form field interactions
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      if (window.gtag) {
        gtag('event', 'form_field_focus', {
          event_category: 'Contact Form',
          event_label: field.name || field.id
        });
      }
    });
  });
  
  // Track form submission attempts
  form.addEventListener('submit', () => {
    if (window.gtag) {
      gtag('event', 'form_submit_attempt', {
        event_category: 'Contact Form',
        event_label: 'Contact Form'
      });
    }
  });
}

function trackScrollDepth() {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  let scrollRAF = null;
  
  const handleScroll = () => {
    if (scrollRAF) {
      cancelAnimationFrame(scrollRAF);
    }
    scrollRAF = requestAnimationFrame(() => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && maxScroll < milestone + 5) {
          if (window.gtag) {
            gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: `${milestone}%`,
              value: milestone
            });
          }
        }
      });
    }
      scrollRAF = null;
  });
  };
  
  // Use passive listener for better scroll performance
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Track time on page
export function trackTimeOnPage() {
  const startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    if (window.gtag) {
      gtag('event', 'time_on_page', {
        event_category: 'Engagement',
        event_label: 'Page Visit',
        value: timeOnPage
      });
    }
  });
}

// Track user interactions
export function trackUserInteractions() {
  // Track clicks on navigation items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'navigation_click', {
          event_category: 'Navigation',
          event_label: item.textContent.trim()
        });
      }
    });
  });
  
  // Track clicks on social links
  document.querySelectorAll('.social-links a, .footer-social a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'social_click', {
          event_category: 'Social',
          event_label: link.getAttribute('aria-label') || link.href
        });
      }
    });
  });
  
  // Track clicks on project links
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.gtag) {
        gtag('event', 'project_link_click', {
          event_category: 'Projects',
          event_label: link.textContent.trim()
        });
      }
    });
  });
}

// Performance tracking
export function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (window.gtag) {
          gtag('event', 'page_load_time', {
            event_category: 'Performance',
            event_label: 'Page Load',
            value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
          });
        }
      }, 0);
    });
  }
}
