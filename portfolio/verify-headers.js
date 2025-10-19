// Header verification script
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 Verifying header structure...');
  
  const checks = {
    header: document.querySelector('.site-header'),
    headerInner: document.querySelector('.header-inner'),
    logoSection: document.querySelector('.logo-section'),
    logo: document.querySelector('.logo'),
    logoIcon: document.querySelector('.logo-icon'),
    logoText: document.querySelector('.logo-text'),
    siteNav: document.querySelector('.site-nav'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    headerActions: document.querySelector('.header-actions'),
    themeToggle: document.querySelector('#theme-toggle'),
    ctaButton: document.querySelector('.cta-button'),
    navToggle: document.querySelector('.nav-toggle'),
    progressBar: document.querySelector('.header-progress')
  };
  
  let allGood = true;
  
  Object.entries(checks).forEach(([name, element]) => {
    if (!element || (Array.isArray(element) && element.length === 0)) {
      console.error(`❌ Missing: ${name}`);
      allGood = false;
    } else {
      console.log(`✅ Found: ${name}`);
    }
  });
  
  // Check if scripts are loaded
  const scripts = [
    'header-enhancements.js',
    'fix-theme.js',
    'ai-features.js'
  ];
  
  scripts.forEach(script => {
    const scriptElement = document.querySelector(`script[src*="${script}"]`);
    if (scriptElement) {
      console.log(`✅ Script loaded: ${script}`);
    } else {
      console.error(`❌ Script missing: ${script}`);
      allGood = false;
    }
  });
  
  // Show result
  const result = document.createElement('div');
  result.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: ${allGood ? '#10b981' : '#ef4444'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  `;
  result.textContent = allGood ? '✅ Header: All Good!' : '❌ Header: Issues Found';
  
  document.body.appendChild(result);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (result.parentNode) {
      result.parentNode.removeChild(result);
    }
  }, 3000);
  
  console.log(allGood ? '✅ Header verification complete - All good!' : '❌ Header verification complete - Issues found!');
});