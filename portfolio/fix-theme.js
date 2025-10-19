// Fixed theme toggle - standalone version
(function() {
  'use strict';
  
  console.log('Fixed theme toggle loaded');
  
  function initTheme() {
    console.log('Initializing theme system...');
    
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    
    if (!toggle) {
      console.error('Theme toggle button not found!');
      return;
    }
    
    console.log('Theme toggle button found:', toggle);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    if (savedTheme === 'light') {
      root.classList.add('light');
      console.log('Applied light theme from storage');
    } else {
      root.classList.remove('light');
      console.log('Applied dark theme (default)');
    }
    
    // Remove any existing event listeners by cloning the button
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    
    // Add single event listener
    newToggle.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Theme toggle clicked!');
      
      const isCurrentlyLight = root.classList.contains('light');
      console.log('Currently light mode:', isCurrentlyLight);
      
      if (isCurrentlyLight) {
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
      } else {
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
      }
      
      // Visual feedback
      const currentTheme = root.classList.contains('light') ? 'light' : 'dark';
      console.log('New theme:', currentTheme);
      
      // Show notification
      showThemeNotification(currentTheme);
    });
    
    console.log('Theme system initialized successfully');
  }
  
  function showThemeNotification(theme) {
    // Remove any existing notifications
    const existing = document.querySelector('.theme-notification');
    if (existing) {
      existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--card);
      color: var(--text);
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid var(--border);
      z-index: 9999;
      font-family: Inter, sans-serif;
      font-size: 14px;
      font-weight: 500;
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      transform: translateX(100%);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>${theme === 'light' ? '☀️' : '🌙'}</span>
        <span>${theme === 'light' ? 'Light' : 'Dark'} mode activated</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 2000);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
})();