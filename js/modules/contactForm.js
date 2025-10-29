// Contact Form Module
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) return;
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    
    try {
      // Option 1: FormSpree (replace with your form ID)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showFormStatus('success');
        form.reset();
        
        // Track with analytics
        if (window.gtag) {
          gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: 'Contact Form Submitted'
          });
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showFormStatus('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
  
  // Real-time validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll('[required]');
  
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const errorMsg = field.parentElement.querySelector('.error-message');
  let isValid = true;
  
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMsg.textContent = 'This field is required';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMsg.textContent = 'Please enter a valid email';
    }
  } else if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
      isValid = false;
      errorMsg.textContent = 'Please enter a valid phone number';
    }
  }
  
  if (isValid) {
    field.classList.remove('error');
    errorMsg.hidden = true;
  } else {
    field.classList.add('error');
    errorMsg.hidden = false;
  }
  
  return isValid;
}

function clearFieldError(field) {
  const errorMsg = field.parentElement.querySelector('.error-message');
  field.classList.remove('error');
  errorMsg.hidden = true;
}

function showFormStatus(status) {
  const statusDiv = document.querySelector('.form-status');
  const successMsg = statusDiv.querySelector('.success-message');
  const errorMsg = statusDiv.querySelector('.error-message');
  
  statusDiv.hidden = false;
  
  if (status === 'success') {
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      statusDiv.hidden = true;
    }, 5000);
  } else {
    successMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      statusDiv.hidden = true;
    }, 8000);
  }
}

// Alternative form handling methods
export function initEmailJS() {
  // EmailJS implementation (if using EmailJS instead of FormSpree)
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');
    
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
          .then(() => {
            showFormStatus('success');
            form.reset();
          })
          .catch(() => {
            showFormStatus('error');
          });
      });
    }
  }
}

// Netlify Forms (if hosting on Netlify)
export function initNetlifyForms() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.setAttribute('netlify', '');
    form.setAttribute('netlify-honeypot', 'bot-field');
    
    // Add hidden honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'hidden';
    honeypot.name = 'bot-field';
    form.appendChild(honeypot);
  }
}
