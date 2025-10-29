// Constants and Configuration
export const CONFIG = {
  // Animation durations
  ANIMATION_DURATION: {
    FAST: 150,
    BASE: 250,
    SLOW: 350
  },
  
  // Scroll thresholds
  SCROLL_THRESHOLD: {
    NAVIGATION: 0.3,
    ANIMATIONS: 0.1,
    SKILLS: 0.5
  },
  
  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1440
  },
  
  // API endpoints
  API: {
    FORMS: {
      FORMSPREE: 'https://formspree.io/f/YOUR_FORM_ID',
      EMAILJS: {
        SERVICE_ID: 'YOUR_SERVICE_ID',
        TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
        PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
      }
    }
  },
  
  // Analytics
  ANALYTICS: {
    GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX'
  },
  
  // Performance
  PERFORMANCE: {
    LAZY_LOAD_THRESHOLD: 0.1,
    IMAGE_LOAD_TIMEOUT: 5000,
    FORM_SUBMIT_TIMEOUT: 10000
  },
  
  // Accessibility
  ACCESSIBILITY: {
    FOCUS_VISIBLE_CLASS: 'focus-visible',
    SKIP_LINK_TARGET: '#main-content',
    MIN_TOUCH_TARGET: 44
  }
};

export const SELECTORS = {
  // Navigation
  NAV: {
    SIDEBAR: '.sidebar',
    MOBILE_HEADER: '.mobile-header',
    HAMBURGER: '.hamburger',
    OVERLAY: '.mobile-overlay',
    NAV_ITEMS: '.nav-item',
    SKIP_LINK: '.skip-link'
  },
  
  // Sections
  SECTIONS: {
    HERO: '#hero',
    ABOUT: '#about',
    SKILLS: '#skills',
    EXPERIENCE: '#experience',
    PROJECTS: '#projects',
    EDUCATION: '#education',
    CONTACT: '#contact'
  },
  
  // Components
  COMPONENTS: {
    PROJECT_CARDS: '.project-card',
    EXPERIENCE_CARDS: '.experience-card',
    EDUCATION_ITEMS: '.education-item',
    SKILL_BARS: '.skill-fill',
    STATS_COUNTERS: '.stat-number',
    FILTER_BUTTONS: '.filter-btn',
    CONTACT_FORM: '#contactForm',
    SCROLL_TO_TOP: '#scrollToTopBtn'
  },
  
  // Forms
  FORMS: {
    CONTACT_FORM: '#contactForm',
    FORM_GROUPS: '.form-group',
    FORM_INPUTS: 'input, textarea',
    FORM_BUTTONS: 'button[type="submit"]',
    ERROR_MESSAGES: '.error-message',
    SUCCESS_MESSAGES: '.success-message'
  },
  
  // Animations
  ANIMATIONS: {
    FADE_IN_UP: '.fade-in-up',
    FADE_IN: '.fade-in',
    SLIDE_IN_LEFT: '.slide-in-left',
    SLIDE_IN_RIGHT: '.slide-in-right'
  }
};

export const EVENTS = {
  // Custom events
  CUSTOM: {
    THEME_CHANGE: 'theme:change',
    FORM_SUBMIT: 'form:submit',
    FORM_SUCCESS: 'form:success',
    FORM_ERROR: 'form:error',
    PROJECT_FILTER: 'project:filter',
    SKILL_ANIMATE: 'skill:animate',
    STATS_COUNTER: 'stats:counter'
  },
  
  // DOM events
  DOM: {
    CLICK: 'click',
    SCROLL: 'scroll',
    RESIZE: 'resize',
    LOAD: 'load',
    DOM_CONTENT_LOADED: 'DOMContentLoaded',
    BEFORE_UNLOAD: 'beforeunload',
    FOCUS: 'focus',
    BLUR: 'blur',
    INPUT: 'input',
    SUBMIT: 'submit',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    TOUCH_START: 'touchstart',
    TOUCH_END: 'touchend'
  }
};

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    FORM_SUBMITTED: 'Message sent successfully! I\'ll get back to you soon.',
    EMAIL_COPIED: 'Email copied to clipboard!',
    RESUME_DOWNLOADED: 'Resume downloaded successfully!',
    THEME_CHANGED: 'Theme changed successfully!'
  },
  
  // Error messages
  ERROR: {
    FORM_SUBMIT_FAILED: 'Sorry, something went wrong. Please email me directly.',
    EMAIL_COPY_FAILED: 'Failed to copy email. Please try again.',
    RESUME_DOWNLOAD_FAILED: 'Failed to download resume. Please try again.',
    THEME_CHANGE_FAILED: 'Failed to change theme. Please try again.',
    FORM_VALIDATION_FAILED: 'Please check the form for errors.',
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    MESSAGE_TOO_LONG: 'Message is too long. Please keep it under 1000 characters.'
  },
  
  // Loading messages
  LOADING: {
    FORM_SUBMITTING: 'Sending message...',
    LOADING_PROJECTS: 'Loading projects...',
    LOADING_SKILLS: 'Loading skills...',
    LOADING_EXPERIENCE: 'Loading experience...'
  }
};

export const VALIDATION = {
  // Email validation
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone validation
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  
  // Name validation
  NAME_REGEX: /^[a-zA-Z\s]{2,50}$/,
  
  // Message validation
  MESSAGE_MAX_LENGTH: 1000,
  MESSAGE_MIN_LENGTH: 10,
  
  // Form field limits
  FIELD_LIMITS: {
    NAME_MAX: 50,
    EMAIL_MAX: 100,
    SUBJECT_MAX: 100,
    MESSAGE_MAX: 1000
  }
};

export const STORAGE_KEYS = {
  THEME: 'portfolio_theme',
  FORM_DATA: 'portfolio_form_data',
  USER_PREFERENCES: 'portfolio_user_preferences',
  ANALYTICS_CONSENT: 'portfolio_analytics_consent'
};

export const ANALYTICS_EVENTS = {
  // Page events
  PAGE_VIEW: 'page_view',
  PAGE_LOAD_TIME: 'page_load_time',
  TIME_ON_PAGE: 'time_on_page',
  SCROLL_DEPTH: 'scroll_depth',
  
  // Navigation events
  NAVIGATION_CLICK: 'navigation_click',
  SCROLL_TO_SECTION: 'scroll_to_section',
  
  // Form events
  FORM_FIELD_FOCUS: 'form_field_focus',
  FORM_SUBMIT_ATTEMPT: 'form_submit_attempt',
  FORM_SUBMISSION: 'form_submission',
  
  // Project events
  PROJECT_VIEW: 'project_view',
  PROJECT_LINK_CLICK: 'project_link_click',
  
  // Social events
  SOCIAL_CLICK: 'social_click',
  
  // Download events
  FILE_DOWNLOAD: 'file_download',
  
  // UI events
  THEME_CHANGE: 'theme_change',
  PROJECT_FILTER: 'project_filter'
};

export const PERFORMANCE_METRICS = {
  // Load time thresholds
  LOAD_TIME_THRESHOLDS: {
    EXCELLENT: 1000,
    GOOD: 2000,
    NEEDS_IMPROVEMENT: 3000
  },
  
  // Image optimization
  IMAGE_OPTIMIZATION: {
    MAX_WIDTH: 1200,
    MAX_HEIGHT: 800,
    QUALITY: 85,
    FORMATS: ['webp', 'jpg', 'png']
  },
  
  // Lazy loading
  LAZY_LOADING: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '50px'
  }
};

export const ACCESSIBILITY = {
  // ARIA labels
  ARIA_LABELS: {
    MOBILE_MENU: 'Toggle mobile menu',
    SCROLL_TO_TOP: 'Scroll to top',
    CLOSE_MODAL: 'Close modal',
    DOWNLOAD_RESUME: 'Download resume',
    COPY_EMAIL: 'Copy email address',
    VIEW_PROJECT: 'View project',
    FILTER_PROJECTS: 'Filter projects by category'
  },
  
  // Keyboard navigation
  KEYBOARD: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight'
  },
  
  // Focus management
  FOCUS: {
    SKIP_LINK_TARGET: '#main-content',
    MODAL_FOCUS_TARGET: '.modal-content',
    FORM_FIRST_FIELD: 'input[type="text"], input[type="email"], textarea'
  }
};
