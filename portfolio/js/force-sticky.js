// Force sticky header positioning
(function() {
  'use strict';
  
  console.log('Force sticky script loaded');
  
  function forceStickyHeader() {
    const header = document.querySelector('.site-header');
    
    if (!header) {
      console.log('Header not found');
      return;
    }
    
    console.log('Forcing sticky header...');
    
    // Test if sticky is supported
    const stickySupported = CSS.supports('position', 'sticky') || CSS.supports('position', '-webkit-sticky');
    console.log('Sticky supported:', stickySupported);
    
    // Force sticky positioning
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '9999';
    header.style.width = '100%';
    
    // Add webkit prefix for Safari
    if (CSS.supports('position', '-webkit-sticky')) {
      header.style.position = '-webkit-sticky';
    }
    
    // Force a reflow to ensure the browser applies the styles
    header.offsetHeight;
    
    // Test scroll behavior
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrolled = window.pageYOffset;
        console.log('Scrolled:', scrolled, 'Header position:', getComputedStyle(header).position);
        
        if (scrolled > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, 10);
    });
    
    console.log('Header styles applied:', {
      position: getComputedStyle(header).position,
      top: getComputedStyle(header).top,
      zIndex: getComputedStyle(header).zIndex
    });
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceStickyHeader);
  } else {
    forceStickyHeader();
  }
  
  // Also run on window load as backup
  window.addEventListener('load', forceStickyHeader);
  
})();