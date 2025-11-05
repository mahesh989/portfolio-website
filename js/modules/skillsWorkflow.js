// Sidebar Skills - Modal-based Full Tech Stack
export function initSkillsWorkflow() {
  // Initialize modal functionality
  initTechStackModal();
  
  // Add tooltips to core skills
  initCoreSkillTooltips();
  
  // Track skill interactions
  trackSkillInteractions();
}

// Tech Stack Modal Functionality
function initTechStackModal() {
  const viewAllBtn = document.getElementById('viewAllSkillsBtn');
  const viewAllBtnMobile = document.getElementById('viewAllSkillsBtnMobile');
  const modal = document.getElementById('techStackModal');
  const closeBtn = document.getElementById('closeTechStackModal');
  
  // Handle both desktop (sidebar) and mobile (main content) buttons
  const buttons = [viewAllBtn, viewAllBtnMobile].filter(Boolean);
  
  if (buttons.length > 0 && modal) {
    const handleViewAllClick = () => {
      modal.hidden = false;
      modal.style.display = 'flex';
      document.body.classList.add('no-scroll');
      
      // Track modal open
      if (window.gtag) {
        gtag('event', 'modal_open', {
          event_category: 'Skills',
          event_label: 'Full Tech Stack',
          value: 1
        });
      }
    };
    
    // Add handlers to all buttons (desktop and mobile)
    buttons.forEach(btn => {
      // Mobile touch handling
      if (window.addMobileTouchHandling) {
        window.addMobileTouchHandling(btn, handleViewAllClick);
      }
      btn.addEventListener('click', handleViewAllClick);
    });
    
    if (closeBtn) {
      // Mobile touch handling
      if (window.addMobileTouchHandling) {
        window.addMobileTouchHandling(closeBtn, () => closeModal());
      }
      closeBtn.addEventListener('click', () => {
        closeModal();
      });
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  function closeModal() {
    const modal = document.getElementById('techStackModal');
    if (modal) {
      modal.hidden = true;
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  }
}

// Core Skill Tooltips
function initCoreSkillTooltips() {
  const coreSkills = document.querySelectorAll('.core-skill-item');
  
  coreSkills.forEach(skill => {
    skill.addEventListener('mouseenter', (e) => {
      const skillName = skill.querySelector('.skill-name').textContent;
      const proficiency = skill.querySelector('.skill-level').classList.contains('expert') ? 'expert' : 
                         skill.querySelector('.skill-level').classList.contains('advanced') ? 'advanced' : 'intermediate';
      
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'skill-tooltip';
      tooltip.innerHTML = `
        <strong>${skillName}</strong><br>
        <span class="tooltip-level">${getProficiencyText(proficiency)}</span>
      `;
      
      document.body.appendChild(tooltip);
      
      // Position tooltip
      const rect = skill.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 10}px`;
      
      // Show tooltip
      setTimeout(() => tooltip.classList.add('show'), 10);
      
      // Store tooltip reference
      skill._tooltip = tooltip;
    });
    
    skill.addEventListener('mouseleave', (e) => {
      if (skill._tooltip) {
        skill._tooltip.classList.remove('show');
        setTimeout(() => skill._tooltip.remove(), 300);
      }
    });
  });
}

function getProficiencyText(proficiency) {
  const levels = {
    'expert': '5+ years of production experience',
    'advanced': '3+ years of regular use',
    'intermediate': '1-2 years of working knowledge'
  };
  return levels[proficiency] || 'Familiar';
}

// Track skill interactions for analytics
function trackSkillInteractions() {
  const coreSkills = document.querySelectorAll('.core-skill-item');
  const skillTags = document.querySelectorAll('.skill-tag');
  const techSkills = document.querySelectorAll('.tech-skill');
  
  // Core skills
  coreSkills.forEach(skill => {
    skill.addEventListener('click', () => {
      const skillName = skill.querySelector('.skill-name').textContent;
      
      if (window.gtag) {
        gtag('event', 'skill_interaction', {
          event_category: 'Skills',
          event_label: skillName,
          value: 1
        });
      }
    });
  });
  
  // Skill tags
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skillName = tag.textContent;
      
      if (window.gtag) {
        gtag('event', 'skill_interaction', {
          event_category: 'Skills',
          event_label: skillName,
          value: 1
        });
      }
    });
  });
  
  // Tech skills in modal
  techSkills.forEach(skill => {
    skill.addEventListener('click', () => {
      const skillName = skill.querySelector('span').textContent;
      
      if (window.gtag) {
        gtag('event', 'skill_interaction', {
          event_category: 'Skills',
          event_label: skillName,
          value: 1
        });
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSkillsWorkflow);
