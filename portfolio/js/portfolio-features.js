// Advanced Portfolio Features
(function() {
  'use strict';
  
  console.log('Portfolio features loaded');
  
  class PortfolioFeatures {
    constructor() {
      this.init();
    }
    
    init() {
      this.setupKeyboardShortcuts();
      this.setupCommandPalette();
      this.setupProgressTracking();
      this.setupPerformanceMonitor();
      this.setupAccessibilityEnhancements();
      this.setupAnalytics();
      this.setupOfflineSupport();
      this.setupPrintOptimization();
      this.setupScreenshotMode();
      this.setupDeveloperMode();
    }
    
    setupKeyboardShortcuts() {
      const shortcuts = {
        'ctrl+k': () => this.openCommandPalette(),
        'ctrl+/': () => this.showShortcutsHelp(),
        'ctrl+d': () => this.toggleDeveloperMode(),
        'ctrl+p': () => this.toggleScreenshotMode(),
        'ctrl+shift+a': () => this.toggleAccessibilityMode(),
        'escape': () => this.closeModals(),
        '?': () => this.showShortcutsHelp(),
        'h': () => this.goToSection('home'),
        'a': () => this.goToSection('about'),
        's': () => this.goToSection('skills'),
        'v': () => this.goToSection('services'),
        'p': () => this.goToSection('projects'),
        'r': () => this.goToSection('pricing'),
        'c': () => this.goToSection('contact')
      };
      
      document.addEventListener('keydown', (e) => {
        const key = this.getKeyCombo(e);
        
        if (shortcuts[key] && !this.isTyping(e)) {
          e.preventDefault();
          shortcuts[key]();
        }
      });
    }
    
    getKeyCombo(e) {
      const parts = [];
      if (e.ctrlKey) parts.push('ctrl');
      if (e.shiftKey) parts.push('shift');
      if (e.altKey) parts.push('alt');
      parts.push(e.key.toLowerCase());
      return parts.join('+');
    }
    
    isTyping(e) {
      const activeElement = document.activeElement;
      return activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      );
    }
    
    setupCommandPalette() {
      // Create command palette
      const palette = document.createElement('div');
      palette.id = 'command-palette';
      palette.className = 'command-palette';
      palette.innerHTML = `
        <div class="palette-backdrop"></div>
        <div class="palette-container">
          <div class="palette-header">
            <input type="text" class="palette-input" placeholder="Type a command or search..." />
            <button class="palette-close">✕</button>
          </div>
          <div class="palette-content">
            <div class="palette-section">
              <h3>Navigation</h3>
              <div class="command-item" data-action="navigate" data-target="index.html">
                <span class="command-icon">🏠</span>
                <span class="command-text">Go to Home</span>
                <span class="command-shortcut">H</span>
              </div>
              <div class="command-item" data-action="navigate" data-target="about.html">
                <span class="command-icon">👤</span>
                <span class="command-text">Go to About</span>
                <span class="command-shortcut">A</span>
              </div>
              <div class="command-item" data-action="navigate" data-target="skills.html">
                <span class="command-icon">⚡</span>
                <span class="command-text">Go to Skills</span>
                <span class="command-shortcut">S</span>
              </div>
              <div class="command-item" data-action="navigate" data-target="services.html">
                <span class="command-icon">🛠️</span>
                <span class="command-text">Go to Services</span>
                <span class="command-shortcut">V</span>
              </div>
              <div class="command-item" data-action="navigate" data-target="projects.html">
                <span class="command-icon">🚀</span>
                <span class="command-text">Go to Projects</span>
                <span class="command-shortcut">P</span>
              </div>
              <div class="command-item" data-action="navigate" data-target="contact.html">
                <span class="command-icon">📧</span>
                <span class="command-text">Go to Contact</span>
                <span class="command-shortcut">C</span>
              </div>
            </div>
            <div class="palette-section">
              <h3>Actions</h3>
              <div class="command-item" data-action="theme">
                <span class="command-icon">🌙</span>
                <span class="command-text">Toggle Theme</span>
                <span class="command-shortcut">T</span>
              </div>
              <div class="command-item" data-action="ai-chat">
                <span class="command-icon">🤖</span>
                <span class="command-text">Open AI Assistant</span>
                <span class="command-shortcut">Ctrl+K</span>
              </div>
              <div class="command-item" data-action="screenshot">
                <span class="command-icon">📸</span>
                <span class="command-text">Screenshot Mode</span>
                <span class="command-shortcut">Ctrl+P</span>
              </div>
              <div class="command-item" data-action="developer">
                <span class="command-icon">🔧</span>
                <span class="command-text">Developer Mode</span>
                <span class="command-shortcut">Ctrl+D</span>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(palette);
      
      // Setup palette interactions
      const input = palette.querySelector('.palette-input');
      const close = palette.querySelector('.palette-close');
      const backdrop = palette.querySelector('.palette-backdrop');
      
      close.addEventListener('click', () => this.closeCommandPalette());
      backdrop.addEventListener('click', () => this.closeCommandPalette());
      
      input.addEventListener('input', (e) => this.filterCommands(e.target.value));
      
      // Setup command execution
      palette.addEventListener('click', (e) => {
        const commandItem = e.target.closest('.command-item');
        if (commandItem) {
          this.executeCommand(commandItem);
        }
      });
    }
    
    openCommandPalette() {
      const palette = document.getElementById('command-palette');
      palette.classList.add('active');
      palette.querySelector('.palette-input').focus();
      document.body.style.overflow = 'hidden';
    }
    
    closeCommandPalette() {
      const palette = document.getElementById('command-palette');
      palette.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    filterCommands(query) {
      const commands = document.querySelectorAll('.command-item');
      
      commands.forEach(command => {
        const text = command.querySelector('.command-text').textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
          command.style.display = 'flex';
        } else {
          command.style.display = 'none';
        }
      });
    }
    
    executeCommand(commandItem) {
      const action = commandItem.dataset.action;
      const target = commandItem.dataset.target;
      
      switch (action) {
        case 'navigate':
          window.location.href = target;
          break;
        case 'theme':
          document.getElementById('theme-toggle')?.click();
          break;
        case 'ai-chat':
          document.getElementById('ai-chat-toggle')?.click();
          break;
        case 'screenshot':
          this.toggleScreenshotMode();
          break;
        case 'developer':
          this.toggleDeveloperMode();
          break;
      }
      
      this.closeCommandPalette();
    }
    
    setupProgressTracking() {
      // Track user progress through the portfolio
      this.progress = {
        pagesVisited: new Set(),
        timeSpent: {},
        interactions: 0,
        scrollDepth: {}
      };
      
      // Track page visits
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      this.progress.pagesVisited.add(currentPage);
      
      // Track time spent
      this.startTime = Date.now();
      
      window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - this.startTime;
        this.progress.timeSpent[currentPage] = timeSpent;
        localStorage.setItem('portfolio-progress', JSON.stringify(this.progress));
      });
      
      // Track interactions
      document.addEventListener('click', () => {
        this.progress.interactions++;
      });
      
      // Track scroll depth
      let maxScroll = 0;
      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
        this.progress.scrollDepth[currentPage] = maxScroll;
      });
      
      // Show progress indicator
      this.createProgressIndicator();
    }
    
    createProgressIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'progress-indicator';
      indicator.innerHTML = `
        <div class="progress-circle">
          <svg width="40" height="40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--border)" stroke-width="2"/>
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--primary)" stroke-width="2" 
                    stroke-dasharray="113" stroke-dashoffset="113" class="progress-ring"/>
          </svg>
          <span class="progress-text">0%</span>
        </div>
      `;
      
      indicator.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        z-index: 1000;
        opacity: 0.7;
        transition: opacity 0.3s ease;
      `;
      
      document.body.appendChild(indicator);
      
      // Update progress
      const updateProgress = () => {
        const totalPages = 7; // Total number of pages
        const visitedPages = this.progress.pagesVisited.size;
        const progressPercent = (visitedPages / totalPages) * 100;
        
        const ring = indicator.querySelector('.progress-ring');
        const text = indicator.querySelector('.progress-text');
        
        const circumference = 113;
        const offset = circumference - (progressPercent / 100) * circumference;
        
        ring.style.strokeDashoffset = offset;
        text.textContent = Math.round(progressPercent) + '%';
      };
      
      setInterval(updateProgress, 1000);
    }
    
    setupPerformanceMonitor() {
      // Monitor performance metrics
      this.performanceData = {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0,
        memoryUsage: 0
      };
      
      // Measure load time
      window.addEventListener('load', () => {
        this.performanceData.loadTime = performance.now();
        this.updatePerformanceDisplay();
      });
      
      // Measure interaction time
      let interactionStart = 0;
      document.addEventListener('mousedown', () => {
        interactionStart = performance.now();
      });
      
      document.addEventListener('mouseup', () => {
        if (interactionStart) {
          this.performanceData.interactionTime = performance.now() - interactionStart;
        }
      });
      
      // Monitor memory usage (if available)
      if (performance.memory) {
        setInterval(() => {
          this.performanceData.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
        }, 5000);
      }
    }
    
    updatePerformanceDisplay() {
      // Show performance metrics in developer mode
      if (this.developerMode) {
        const perfDisplay = document.getElementById('perf-display');
        if (perfDisplay) {
          perfDisplay.innerHTML = `
            <div>Load: ${Math.round(this.performanceData.loadTime)}ms</div>
            <div>Memory: ${Math.round(this.performanceData.memoryUsage)}MB</div>
            <div>FPS: ${this.getFPS()}</div>
          `;
        }
      }
    }
    
    getFPS() {
      // Simple FPS counter
      if (!this.fpsCounter) {
        this.fpsCounter = { frames: 0, lastTime: performance.now() };
      }
      
      this.fpsCounter.frames++;
      const now = performance.now();
      
      if (now - this.fpsCounter.lastTime >= 1000) {
        const fps = Math.round((this.fpsCounter.frames * 1000) / (now - this.fpsCounter.lastTime));
        this.fpsCounter.frames = 0;
        this.fpsCounter.lastTime = now;
        return fps;
      }
      
      return 60; // Default
    }
    
    setupAccessibilityEnhancements() {
      // Enhanced accessibility features
      this.accessibilityMode = false;
      
      // Skip links
      this.createSkipLinks();
      
      // Focus management
      this.setupFocusManagement();
      
      // Keyboard navigation
      this.setupKeyboardNavigation();
      
      // Screen reader announcements
      this.setupScreenReaderSupport();
    }
    
    createSkipLinks() {
      const skipLinks = document.createElement('div');
      skipLinks.className = 'skip-links';
      skipLinks.innerHTML = `
        <a href="#main" class="skip-link">Skip to main content</a>
        <a href="#navigation" class="skip-link">Skip to navigation</a>
        <a href="#footer" class="skip-link">Skip to footer</a>
      `;
      
      document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    setupFocusManagement() {
      // Trap focus in modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          const modal = document.querySelector('.modal.active, .project-modal.active');
          if (modal) {
            this.trapFocus(e, modal);
          }
        }
      });
    }
    
    trapFocus(e, container) {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
    
    setupKeyboardNavigation() {
      // Enhanced keyboard navigation for cards and interactive elements
      const interactiveElements = document.querySelectorAll('.card, .project-card, .service-card');
      
      interactiveElements.forEach((element, index) => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
          }
        });
      });
    }
    
    setupScreenReaderSupport() {
      // Create live region for announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'live-region';
      
      document.body.appendChild(liveRegion);
    }
    
    announce(message) {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }
    
    setupAnalytics() {
      // Privacy-friendly analytics
      this.analytics = {
        pageViews: {},
        interactions: {},
        performance: {},
        errors: []
      };
      
      // Track page views
      const page = window.location.pathname;
      this.analytics.pageViews[page] = (this.analytics.pageViews[page] || 0) + 1;
      
      // Track errors
      window.addEventListener('error', (e) => {
        this.analytics.errors.push({
          message: e.message,
          filename: e.filename,
          line: e.lineno,
          timestamp: Date.now()
        });
      });
      
      // Save analytics periodically
      setInterval(() => {
        localStorage.setItem('portfolio-analytics', JSON.stringify(this.analytics));
      }, 30000);
    }
    
    setupOfflineSupport() {
      // Basic offline support
      if ('serviceWorker' in navigator) {
        this.registerServiceWorker();
      }
      
      // Offline indicator
      this.createOfflineIndicator();
      
      window.addEventListener('online', () => {
        this.updateConnectionStatus(true);
      });
      
      window.addEventListener('offline', () => {
        this.updateConnectionStatus(false);
      });
    }
    
    registerServiceWorker() {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
    
    createOfflineIndicator() {
      const indicator = document.createElement('div');
      indicator.id = 'offline-indicator';
      indicator.className = 'offline-indicator';
      indicator.innerHTML = `
        <span class="offline-icon">📡</span>
        <span class="offline-text">You're offline</span>
      `;
      
      indicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
        display: none;
      `;
      
      document.body.appendChild(indicator);
    }
    
    updateConnectionStatus(online) {
      const indicator = document.getElementById('offline-indicator');
      
      if (online) {
        indicator.style.display = 'none';
        this.announce('Connection restored');
      } else {
        indicator.style.display = 'block';
        indicator.style.transform = 'translateY(0)';
        this.announce('You are now offline');
      }
    }
    
    setupPrintOptimization() {
      // Optimize for printing
      window.addEventListener('beforeprint', () => {
        document.body.classList.add('print-mode');
        
        // Hide unnecessary elements
        const hideElements = document.querySelectorAll('.nav-toggle, .theme-toggle, .ai-chatbot-widget');
        hideElements.forEach(el => el.style.display = 'none');
      });
      
      window.addEventListener('afterprint', () => {
        document.body.classList.remove('print-mode');
        
        // Restore hidden elements
        const hideElements = document.querySelectorAll('.nav-toggle, .theme-toggle, .ai-chatbot-widget');
        hideElements.forEach(el => el.style.display = '');
      });
    }
    
    setupScreenshotMode() {
      this.screenshotMode = false;
    }
    
    toggleScreenshotMode() {
      this.screenshotMode = !this.screenshotMode;
      
      if (this.screenshotMode) {
        document.body.classList.add('screenshot-mode');
        this.announce('Screenshot mode enabled');
      } else {
        document.body.classList.remove('screenshot-mode');
        this.announce('Screenshot mode disabled');
      }
    }
    
    setupDeveloperMode() {
      this.developerMode = false;
    }
    
    toggleDeveloperMode() {
      this.developerMode = !this.developerMode;
      
      if (this.developerMode) {
        this.enableDeveloperMode();
      } else {
        this.disableDeveloperMode();
      }
    }
    
    enableDeveloperMode() {
      document.body.classList.add('developer-mode');
      
      // Create developer panel
      const devPanel = document.createElement('div');
      devPanel.id = 'dev-panel';
      devPanel.className = 'dev-panel';
      devPanel.innerHTML = `
        <div class="dev-header">
          <h3>Developer Mode</h3>
          <button class="dev-close" onclick="portfolioFeatures.toggleDeveloperMode()">✕</button>
        </div>
        <div class="dev-content">
          <div class="dev-section">
            <h4>Performance</h4>
            <div id="perf-display"></div>
          </div>
          <div class="dev-section">
            <h4>Console</h4>
            <div id="dev-console"></div>
          </div>
        </div>
      `;
      
      devPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 300px;
        height: 400px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        z-index: 10000;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      `;
      
      document.body.appendChild(devPanel);
      
      this.updatePerformanceDisplay();
      this.announce('Developer mode enabled');
    }
    
    disableDeveloperMode() {
      document.body.classList.remove('developer-mode');
      
      const devPanel = document.getElementById('dev-panel');
      if (devPanel) {
        devPanel.remove();
      }
      
      this.announce('Developer mode disabled');
    }
    
    showShortcutsHelp() {
      // Show keyboard shortcuts help
      const helpModal = document.createElement('div');
      helpModal.className = 'shortcuts-modal';
      helpModal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h2>Keyboard Shortcuts</h2>
            <button class="modal-close" onclick="this.closest('.shortcuts-modal').remove()">✕</button>
          </div>
          <div class="modal-content">
            <div class="shortcuts-grid">
              <div class="shortcut-item">
                <kbd>Ctrl + K</kbd>
                <span>Open Command Palette</span>
              </div>
              <div class="shortcut-item">
                <kbd>Ctrl + /</kbd>
                <span>Show this help</span>
              </div>
              <div class="shortcut-item">
                <kbd>Ctrl + D</kbd>
                <span>Toggle Developer Mode</span>
              </div>
              <div class="shortcut-item">
                <kbd>Ctrl + P</kbd>
                <span>Screenshot Mode</span>
              </div>
              <div class="shortcut-item">
                <kbd>H</kbd>
                <span>Go to Home</span>
              </div>
              <div class="shortcut-item">
                <kbd>A</kbd>
                <span>Go to About</span>
              </div>
              <div class="shortcut-item">
                <kbd>S</kbd>
                <span>Go to Skills</span>
              </div>
              <div class="shortcut-item">
                <kbd>P</kbd>
                <span>Go to Projects</span>
              </div>
              <div class="shortcut-item">
                <kbd>C</kbd>
                <span>Go to Contact</span>
              </div>
              <div class="shortcut-item">
                <kbd>Escape</kbd>
                <span>Close Modals</span>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(helpModal);
      
      setTimeout(() => {
        helpModal.classList.add('active');
      }, 10);
    }
    
    closeModals() {
      // Close all open modals
      const modals = document.querySelectorAll('.modal.active, .project-modal.active, .shortcuts-modal');
      modals.forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
      });
      
      this.closeCommandPalette();
    }
    
    goToSection(section) {
      const pages = {
        home: 'index.html',
        about: 'about.html',
        skills: 'skills.html',
        services: 'services.html',
        projects: 'projects.html',
        pricing: 'pricing.html',
        contact: 'contact.html'
      };
      
      if (pages[section]) {
        window.location.href = pages[section];
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.portfolioFeatures = new PortfolioFeatures();
    });
  } else {
    window.portfolioFeatures = new PortfolioFeatures();
  }
  
})();