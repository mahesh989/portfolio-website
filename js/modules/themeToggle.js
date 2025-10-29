// Theme Toggle Module (Optional Dark Mode)
export function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle button appearance
      updateToggleButton(newTheme);
      
      // Track theme change
      if (window.gtag) {
        gtag('event', 'theme_change', {
          event_category: 'UI',
          event_label: newTheme
        });
      }
    });
    
    // Initialize toggle button
    updateToggleButton(currentTheme);
  }
}

function updateToggleButton(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// System theme detection
export function initSystemThemeDetection() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  function handleThemeChange(e) {
    const systemTheme = e.matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme');
    
    // Only apply system theme if user hasn't manually set a preference
    if (!savedTheme) {
      document.body.setAttribute('data-theme', systemTheme);
    }
  }
  
  // Listen for system theme changes
  mediaQuery.addEventListener('change', handleThemeChange);
  
  // Apply initial system theme if no saved preference
  if (!localStorage.getItem('theme')) {
    handleThemeChange(mediaQuery);
  }
}

// Theme transition animation
export function initThemeTransitions() {
  const style = document.createElement('style');
  style.textContent = `
    * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}
