// Enhanced interactions for existing features
(function() {
  'use strict';
  
  console.log('Enhanced interactions loaded');
  
  function initEnhancedInteractions() {
    // Enhanced scroll effects
    enhanceScrollEffects();
    
    // Enhanced hover animations
    enhanceHoverAnimations();
    
    // Enhanced loading states
    enhanceLoadingStates();
    
    // Enhanced form interactions
    enhanceFormInteractions();
    
    // Enhanced navigation feedback
    enhanceNavigationFeedback();
    
    // Enhanced visual feedback
    enhanceVisualFeedback();
  }
  
  function enhanceScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Enhanced parallax for hero elements
      const heroElements = document.querySelectorAll('.hero-bg, .floating-shapes');
      heroElements.forEach(element => {
        if (element) {
          const speed = element.dataset.speed || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
      
      // Enhanced reveal animations with stagger
      const revealElements = document.querySelectorAll('[data-reveal]:not(.visible)');
      revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 100); // Stagger animation
        }
      });
      
      // Enhanced header blur based on scroll speed
      const header = document.querySelector('.site-header');
      if (header) {
        const scrollSpeed = Math.abs(scrolled - (window.lastScrollTop || 0));
        window.lastScrollTop = scrolled;
        
        if (scrollSpeed > 5) {
          header.style.backdropFilter = 'blur(30px) saturate(180%)';
        } else {
          header.style.backdropFilter = 'blur(20px) saturate(180%)';
        }
      }
      
      ticking = false;
    }
    
    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    updateScrollEffects(); // Initial call
  }
  
  function enhanceHoverAnimations() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card, .feature-card, .portfolio-card, .service-card, .project-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        // Add magnetic effect
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add glow effect
        this.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)';
        
        // Enhance images inside cards
        const img = this.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.05)';
          img.style.transition = 'transform 0.4s ease';
        }
      });
      
      card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        const img = this.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      });
      
      // Add mouse move effect for subtle tilt
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn, .cta-button, .nav-link');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  function enhanceLoadingStates() {
    // Enhanced image loading with blur effect
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      // Add blur while loading
      img.style.filter = 'blur(5px)';
      img.style.transition = 'filter 0.3s ease';
      
      img.addEventListener('load', function() {
        this.style.filter = 'blur(0)';
      });
    });
    
    // Enhanced content loading animation
    const contentSections = document.querySelectorAll('section, .card, .feature-card');
    
    contentSections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  function enhanceFormInteractions() {
    // Enhanced form field animations
    const formFields = document.querySelectorAll('input, textarea, select');
    
    formFields.forEach(field => {
      // Add focus ring animation
      field.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        this.style.transition = 'all 0.3s ease';
      });
      
      field.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
      });
      
      // Add typing animation
      field.addEventListener('input', function() {
        this.style.borderColor = 'var(--primary)';
        
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.style.borderColor = '';
        }, 1000);
      });
    });
  }
  
  function enhanceNavigationFeedback() {
    // Enhanced navigation with breadcrumb effect
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  function enhanceVisualFeedback() {
    // Enhanced success/error states
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
          
          // Simulate form processing
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
          }, 2000);
        }
      });
    });
    
    // Enhanced tooltip system
    const tooltipElements = document.querySelectorAll('[title], [data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', function(e) {
        const tooltipText = this.getAttribute('title') || this.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        // Remove default title to prevent browser tooltip
        this.setAttribute('data-original-title', tooltipText);
        this.removeAttribute('title');
        
        const tooltip = document.createElement('div');
        tooltip.className = 'enhanced-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
          position: absolute;
          background: var(--card);
          color: var(--text);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          z-index: 1000;
          pointer-events: none;
          border: 1px solid var(--border);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(5px);
          transition: all 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
        
        setTimeout(() => {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(0)';
        }, 10);
        
        this._tooltip = tooltip;
      });
      
      element.addEventListener('mouseleave', function() {
        if (this._tooltip) {
          this._tooltip.style.opacity = '0';
          this._tooltip.style.transform = 'translateY(5px)';
          
          setTimeout(() => {
            if (this._tooltip && this._tooltip.parentNode) {
              this._tooltip.parentNode.removeChild(this._tooltip);
            }
          }, 300);
        }
        
        // Restore original title
        const originalTitle = this.getAttribute('data-original-title');
        if (originalTitle) {
          this.setAttribute('title', originalTitle);
          this.removeAttribute('data-original-title');
        }
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedInteractions);
  } else {
    initEnhancedInteractions();
  }
  
})();