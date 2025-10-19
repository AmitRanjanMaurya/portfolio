// Professional Header Enhancements
(function() {
  'use strict';
  
  console.log('Header enhancements loaded');
  
  function initHeaderEnhancements() {
    const header = document.querySelector('.site-header');
    const progressBar = document.querySelector('.header-progress');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!header) return;
    
    let lastScrollTop = 0;
    let scrollDirection = 'up';
    
    // Enhanced scroll progress and header effects
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Update progress bar
      if (progressBar) {
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
      }
      
      // Determine scroll direction
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }
      
      // Enhanced sticky behavior
      if (scrollTop > 50) {
        header.classList.add('scrolled');
        
        // Hide header when scrolling down fast, show when scrolling up
        if (scrollDirection === 'down' && scrollTop > 200) {
          header.classList.add('hidden');
        } else if (scrollDirection === 'up') {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('scrolled', 'hidden');
      }
      
      lastScrollTop = scrollTop;
    }
    
    // Smooth scroll progress
    let ticking = false;
    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
        setTimeout(() => { ticking = false; }, 10);
      }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Mobile navigation
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        
        if (isOpen) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        } else {
          navMenu.classList.add('open');
          navToggle.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
        }
      });
      
      // Close menu when clicking nav links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Active link highlighting
    function updateActiveLink() {
      const currentPath = window.location.pathname;
      const currentPage = currentPath.split('/').pop() || 'index.html';
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPage || 
            (currentPage === '' && linkPath === 'index.html') ||
            (currentPage === 'index.html' && linkPath === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
    
    updateActiveLink();
    
    // Logo animation on scroll
    const logo = document.querySelector('.logo');
    if (logo) {
      let lastScrollY = window.pageYOffset;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          logo.style.transform = 'scale(0.9)';
        } else {
          // Scrolling up
          logo.style.transform = 'scale(1)';
        }
        
        lastScrollY = currentScrollY;
      }, { passive: true });
    }
    
    // Header background parallax effect
    function updateHeaderParallax() {
      const scrolled = window.pageYOffset;
      const headerBg = document.querySelector('.header-background');
      
      if (headerBg && scrolled < window.innerHeight) {
        const opacity = Math.min(scrolled / 200, 1);
        headerBg.style.opacity = opacity;
      }
    }
    
    window.addEventListener('scroll', updateHeaderParallax, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Initialize
    updateScrollProgress();
    updateHeaderParallax();
    
    console.log('Header enhancements initialized');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderEnhancements);
  } else {
    initHeaderEnhancements();
  }
  
})(); 
 // Force sticky header on page load
  function ensureStickyHeader() {
    const header = document.querySelector('.site-header');
    if (header) {
      // Force reflow to ensure sticky positioning
      header.style.position = 'sticky';
      header.style.top = '0';
      header.style.zIndex = '9999';
      
      // Trigger a reflow
      header.offsetHeight;
      
      console.log('Sticky header enforced');
    }
  }
  
  // Call on load and resize
  window.addEventListener('load', ensureStickyHeader);
  window.addEventListener('resize', ensureStickyHeader);
  
  // Also call immediately
  ensureStickyHeader();