// Advanced Projects Page Features
(function() {
  'use strict';
  
  console.log('Advanced projects features loaded');
  
  class AdvancedProjectsManager {
    constructor() {
      this.projects = [];
      this.currentFilter = 'all';
      this.sortBy = 'date';
      this.viewMode = 'grid';
      this.searchQuery = '';
      this.init();
    }
    
    init() {
      this.loadProjects();
      this.setupFilters();
      this.setupSearch();
      this.setupSorting();
      this.setupViewModes();
      this.setupProjectModals();
      this.setupProjectAnimations();
      this.setupProjectComparison();
      this.setupProjectBookmarks();
      this.setupProjectSharing();
      this.setupProjectStats();
      this.setupInfiniteScroll();
    }
    
    loadProjects() {
      // Enhanced project data with more details
      this.projects = [
        {
          id: 'ecommerce',
          title: 'Advanced E-Commerce Platform',
          category: 'web',
          tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
          description: 'Full-stack e-commerce solution with real-time inventory, payment integration, and advanced analytics dashboard.',
          longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include real-time inventory management, secure payment processing with Stripe, advanced analytics dashboard, user authentication, shopping cart functionality, order tracking, and admin panel for product management.',
          image: 'assets/placeholder-1.svg',
          demoUrl: '#',
          codeUrl: '#',
          date: '2024-01-15',
          status: 'completed',
          featured: true,
          difficulty: 'advanced',
          duration: '3 months',
          team: 'Solo Project',
          technologies: {
            frontend: ['React.js', 'Redux', 'Tailwind CSS', 'Framer Motion'],
            backend: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
            deployment: ['AWS EC2', 'Docker', 'Nginx'],
            tools: ['Git', 'VS Code', 'Postman', 'Figma']
          },
          features: [
            'Real-time inventory management',
            'Secure payment processing',
            'Advanced search and filtering',
            'User authentication and profiles',
            'Order tracking system',
            'Admin dashboard',
            'Responsive design',
            'Performance optimization'
          ],
          metrics: {
            performance: 95,
            accessibility: 98,
            seo: 92,
            bestPractices: 96
          },
          testimonial: {
            text: "Exceptional work! The platform exceeded our expectations with its performance and user experience.",
            author: "Sarah Johnson",
            role: "Product Manager"
          }
        },
        {
          id: 'analytics',
          title: 'Real-Time Analytics Dashboard',
          category: 'data',
          tags: ['Python', 'D3.js', 'Flask', 'PostgreSQL'],
          description: 'Interactive dashboard for real-time data visualization with Python, D3.js, and machine learning insights.',
          longDescription: 'A powerful analytics dashboard that processes real-time data streams and provides interactive visualizations. Built with Python for data processing, D3.js for dynamic charts, and includes machine learning models for predictive analytics.',
          image: 'assets/placeholder-2.svg',
          demoUrl: '#',
          codeUrl: '#',
          date: '2023-11-20',
          status: 'completed',
          featured: false,
          difficulty: 'intermediate',
          duration: '2 months',
          team: '2 developers',
          technologies: {
            frontend: ['D3.js', 'JavaScript', 'HTML5', 'CSS3'],
            backend: ['Python', 'Flask', 'Pandas', 'NumPy'],
            database: ['PostgreSQL', 'Redis'],
            ml: ['Scikit-learn', 'TensorFlow']
          },
          features: [
            'Real-time data processing',
            'Interactive visualizations',
            'Predictive analytics',
            'Custom dashboard builder',
            'Export functionality',
            'Multi-user support'
          ],
          metrics: {
            performance: 88,
            accessibility: 94,
            seo: 85,
            bestPractices: 91
          }
        },
        {
          id: 'chatbot',
          title: 'AI-Powered Customer Support Bot',
          category: 'ai',
          tags: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
          description: 'Intelligent chatbot using NLP and machine learning to provide 24/7 customer support with 95% accuracy.',
          longDescription: 'An advanced AI chatbot system that uses natural language processing and machine learning to understand customer queries and provide accurate responses. Features include sentiment analysis, multi-language support, and continuous learning capabilities.',
          image: 'assets/placeholder-3.svg',
          demoUrl: '#',
          codeUrl: '#',
          date: '2023-09-10',
          status: 'completed',
          featured: true,
          difficulty: 'advanced',
          duration: '4 months',
          team: '3 developers',
          technologies: {
            ai: ['TensorFlow', 'NLTK', 'spaCy', 'Transformers'],
            backend: ['Python', 'FastAPI', 'Celery'],
            frontend: ['React', 'Socket.io'],
            deployment: ['Docker', 'Kubernetes', 'GCP']
          },
          features: [
            'Natural language understanding',
            'Sentiment analysis',
            'Multi-language support',
            'Continuous learning',
            'Integration APIs',
            'Analytics dashboard'
          ],
          metrics: {
            accuracy: 95,
            responseTime: '< 2s',
            satisfaction: 4.8,
            uptime: 99.9
          }
        }
      ];
    }
    
    setupFilters() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          // Remove active class from all buttons
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          
          // Add active class to clicked button
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          
          // Update current filter
          this.currentFilter = btn.dataset.filter;
          
          // Filter projects
          this.filterProjects();
          
          // Add ripple effect
          this.addRippleEffect(btn, e);
        });
      });
    }
    
    setupSearch() {
      // Create search bar
      const filtersWrapper = document.querySelector('.filters-wrapper');
      if (filtersWrapper) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
          <div class="search-input-wrapper">
            <input type="text" id="project-search" placeholder="Search projects..." class="search-input">
            <button class="search-btn" type="button">
              <span class="search-icon">🔍</span>
            </button>
            <button class="clear-search" type="button" style="display: none;">
              <span class="clear-icon">✕</span>
            </button>
          </div>
          <div class="search-suggestions" id="search-suggestions"></div>
        `;
        
        filtersWrapper.appendChild(searchContainer);
        
        // Setup search functionality
        const searchInput = document.getElementById('project-search');
        const clearBtn = document.querySelector('.clear-search');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase();
          
          if (this.searchQuery.length > 0) {
            clearBtn.style.display = 'block';
            this.showSearchSuggestions();
          } else {
            clearBtn.style.display = 'none';
            suggestions.style.display = 'none';
          }
          
          this.filterProjects();
        });
        
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          this.searchQuery = '';
          clearBtn.style.display = 'none';
          suggestions.style.display = 'none';
          this.filterProjects();
        });
      }
    }
    
    setupSorting() {
      // Create sorting controls
      const container = document.querySelector('.projects-showcase .container');
      if (container) {
        const sortingControls = document.createElement('div');
        sortingControls.className = 'sorting-controls';
        sortingControls.innerHTML = `
          <div class="sort-options">
            <label for="sort-select">Sort by:</label>
            <select id="sort-select" class="sort-select">
              <option value="date">Latest First</option>
              <option value="title">Title A-Z</option>
              <option value="category">Category</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
          <div class="view-options">
            <button class="view-btn active" data-view="grid" title="Grid View">
              <span class="view-icon">⊞</span>
            </button>
            <button class="view-btn" data-view="list" title="List View">
              <span class="view-icon">☰</span>
            </button>
            <button class="view-btn" data-view="cards" title="Card View">
              <span class="view-icon">⊡</span>
            </button>
          </div>
        `;
        
        container.insertBefore(sortingControls, document.getElementById('projects-grid'));
        
        // Setup sorting
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (e) => {
          this.sortBy = e.target.value;
          this.filterProjects();
        });
        
        // Setup view modes
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this.viewMode = btn.dataset.view;
            this.updateViewMode();
          });
        });
      }
    }
    
    setupViewModes() {
      // Different view modes for projects
      this.updateViewMode();
    }
    
    updateViewMode() {
      const grid = document.getElementById('projects-grid');
      if (grid) {
        grid.className = `projects-grid view-${this.viewMode}`;
      }
    }
    
    setupProjectModals() {
      // Enhanced project modal system
      this.createModalContainer();
      
      // Setup modal triggers
      document.addEventListener('click', (e) => {
        if (e.target.closest('[onclick*="openProjectModal"]')) {
          e.preventDefault();
          const projectId = e.target.closest('[onclick*="openProjectModal"]').getAttribute('onclick').match(/'([^']+)'/)[1];
          this.openProjectModal(projectId);
        }
      });
    }
    
    createModalContainer() {
      if (!document.getElementById('project-modal')) {
        const modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'project-modal';
        modal.innerHTML = `
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            <div class="modal-header">
              <h2 class="modal-title"></h2>
              <button class="modal-close" aria-label="Close modal">✕</button>
            </div>
            <div class="modal-content">
              <div class="modal-loading">
                <div class="loading-spinner"></div>
                <p>Loading project details...</p>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup modal close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeProjectModal());
        modal.querySelector('.modal-backdrop').addEventListener('click', () => this.closeProjectModal());
        
        // Escape key handler
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('active')) {
            this.closeProjectModal();
          }
        });
      }
    }
    
    openProjectModal(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      if (!project) return;
      
      const modal = document.getElementById('project-modal');
      const title = modal.querySelector('.modal-title');
      const content = modal.querySelector('.modal-content');
      
      title.textContent = project.title;
      
      // Show loading state
      content.innerHTML = `
        <div class="modal-loading">
          <div class="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      `;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Simulate loading and show content
      setTimeout(() => {
        content.innerHTML = this.generateModalContent(project);
        this.setupModalInteractions(project);
      }, 800);
    }
    
    generateModalContent(project) {
      return `
        <div class="modal-body">
          <div class="project-hero">
            <img src="${project.image}" alt="${project.title}" class="project-hero-image">
            <div class="project-hero-overlay">
              <div class="project-badges">
                ${project.featured ? '<span class="badge featured">Featured</span>' : ''}
                <span class="badge difficulty">${project.difficulty}</span>
                <span class="badge status">${project.status}</span>
              </div>
            </div>
          </div>
          
          <div class="project-details">
            <div class="project-info">
              <div class="info-section">
                <h3>Project Overview</h3>
                <p>${project.longDescription}</p>
              </div>
              
              <div class="info-section">
                <h3>Key Features</h3>
                <ul class="features-list">
                  ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
              </div>
              
              <div class="info-section">
                <h3>Technologies Used</h3>
                <div class="tech-stack">
                  ${Object.entries(project.technologies).map(([category, techs]) => `
                    <div class="tech-category">
                      <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                      <div class="tech-tags">
                        ${techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              ${project.metrics ? `
                <div class="info-section">
                  <h3>Performance Metrics</h3>
                  <div class="metrics-grid">
                    ${Object.entries(project.metrics).map(([key, value]) => `
                      <div class="metric-item">
                        <div class="metric-value">${value}${typeof value === 'number' && value <= 100 ? '%' : ''}</div>
                        <div class="metric-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${project.testimonial ? `
                <div class="info-section">
                  <h3>Client Testimonial</h3>
                  <blockquote class="testimonial">
                    <p>"${project.testimonial.text}"</p>
                    <cite>— ${project.testimonial.author}, ${project.testimonial.role}</cite>
                  </blockquote>
                </div>
              ` : ''}
            </div>
            
            <div class="project-sidebar">
              <div class="project-meta">
                <div class="meta-item">
                  <span class="meta-label">Duration</span>
                  <span class="meta-value">${project.duration}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Team</span>
                  <span class="meta-value">${project.team}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Category</span>
                  <span class="meta-value">${project.category}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Date</span>
                  <span class="meta-value">${new Date(project.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div class="project-actions">
                <a href="${project.demoUrl}" class="action-btn primary" target="_blank">
                  <span class="btn-icon">🚀</span>
                  <span class="btn-text">Live Demo</span>
                </a>
                <a href="${project.codeUrl}" class="action-btn secondary" target="_blank">
                  <span class="btn-icon">💻</span>
                  <span class="btn-text">View Code</span>
                </a>
                <button class="action-btn tertiary" onclick="advancedProjects.shareProject('${project.id}')">
                  <span class="btn-icon">📤</span>
                  <span class="btn-text">Share</span>
                </button>
                <button class="action-btn tertiary bookmark-btn" onclick="advancedProjects.toggleBookmark('${project.id}')">
                  <span class="btn-icon">🔖</span>
                  <span class="btn-text">Bookmark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    closeProjectModal() {
      const modal = document.getElementById('project-modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    setupProjectAnimations() {
      // Enhanced animations for project cards
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
      });
    }
    
    setupProjectComparison() {
      // Project comparison feature
      this.comparisonList = [];
      
      // Add comparison buttons to project cards
      document.querySelectorAll('.project-card').forEach(card => {
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-btn';
        compareBtn.innerHTML = '<span class="compare-icon">⚖️</span>';
        compareBtn.title = 'Add to comparison';
        
        compareBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleComparison(card.dataset.category);
        });
        
        card.appendChild(compareBtn);
      });
    }
    
    setupProjectBookmarks() {
      // Load bookmarks from localStorage
      this.bookmarks = JSON.parse(localStorage.getItem('project-bookmarks') || '[]');
      this.updateBookmarkUI();
    }
    
    toggleBookmark(projectId) {
      const index = this.bookmarks.indexOf(projectId);
      
      if (index > -1) {
        this.bookmarks.splice(index, 1);
      } else {
        this.bookmarks.push(projectId);
      }
      
      localStorage.setItem('project-bookmarks', JSON.stringify(this.bookmarks));
      this.updateBookmarkUI();
      
      // Show feedback
      this.showNotification(
        index > -1 ? 'Removed from bookmarks' : 'Added to bookmarks',
        'success'
      );
    }
    
    updateBookmarkUI() {
      // Update bookmark button states
      document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const projectId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (this.bookmarks.includes(projectId)) {
          btn.classList.add('bookmarked');
          btn.querySelector('.btn-text').textContent = 'Bookmarked';
        } else {
          btn.classList.remove('bookmarked');
          btn.querySelector('.btn-text').textContent = 'Bookmark';
        }
      });
    }
    
    setupProjectSharing() {
      // Project sharing functionality
      window.advancedProjects = this; // Make available globally for onclick handlers
    }
    
    shareProject(projectId) {
      const project = this.projects.find(p => p.id === projectId);
      if (!project) return;
      
      if (navigator.share) {
        navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href + '#project-' + projectId
        });
      } else {
        // Fallback: copy to clipboard
        const url = window.location.href + '#project-' + projectId;
        navigator.clipboard.writeText(url).then(() => {
          this.showNotification('Project link copied to clipboard!', 'success');
        });
      }
    }
    
    setupProjectStats() {
      // Animate project statistics
      const statNumbers = document.querySelectorAll('.stat-number');
      
      const animateStats = () => {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          const duration = 2000;
          const start = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            stat.textContent = current;
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        });
      };
      
      // Trigger animation when stats come into view
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      });
      
      const statsSection = document.querySelector('.projects-stats');
      if (statsSection) {
        statsObserver.observe(statsSection);
      }
    }
    
    setupInfiniteScroll() {
      // Infinite scroll for large project lists
      let loading = false;
      
      window.addEventListener('scroll', () => {
        if (loading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 1000) {
          loading = true;
          this.loadMoreProjects().then(() => {
            loading = false;
          });
        }
      });
    }
    
    async loadMoreProjects() {
      // Simulate loading more projects
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Loading more projects...');
          resolve();
        }, 1000);
      });
    }
    
    filterProjects() {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        
        const matchesFilter = this.currentFilter === 'all' || category === this.currentFilter;
        const matchesSearch = this.searchQuery === '' || 
          title.includes(this.searchQuery) || 
          description.includes(this.searchQuery);
        
        if (matchesFilter && matchesSearch) {
          card.style.display = 'block';
          card.classList.add('animate-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('animate-in');
        }
      });
      
      this.updateFilterCounts();
    }
    
    updateFilterCounts() {
      // Update filter button counts
      const filterBtns = document.querySelectorAll('.filter-btn');
      
      filterBtns.forEach(btn => {
        const filter = btn.dataset.filter;
        const count = filter === 'all' 
          ? document.querySelectorAll('.project-card').length
          : document.querySelectorAll(`[data-category="${filter}"]`).length;
        
        const countElement = btn.querySelector('.filter-count');
        if (countElement) {
          countElement.textContent = count;
        }
      });
    }
    
    showSearchSuggestions() {
      const suggestions = document.getElementById('search-suggestions');
      const query = this.searchQuery;
      
      if (query.length < 2) {
        suggestions.style.display = 'none';
        return;
      }
      
      const matches = this.projects.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
      
      if (matches.length > 0) {
        suggestions.innerHTML = matches.slice(0, 5).map(project => `
          <div class="suggestion-item" onclick="advancedProjects.selectSuggestion('${project.title}')">
            <span class="suggestion-title">${project.title}</span>
            <span class="suggestion-category">${project.category}</span>
          </div>
        `).join('');
        suggestions.style.display = 'block';
      } else {
        suggestions.style.display = 'none';
      }
    }
    
    selectSuggestion(title) {
      const searchInput = document.getElementById('project-search');
      searchInput.value = title;
      this.searchQuery = title.toLowerCase();
      document.getElementById('search-suggestions').style.display = 'none';
      this.filterProjects();
    }
    
    addRippleEffect(element, event) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card);
        color: var(--text);
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid var(--border);
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 3000);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('.projects-page')) {
        new AdvancedProjectsManager();
      }
    });
  } else {
    if (document.querySelector('.projects-page')) {
      new AdvancedProjectsManager();
    }
  }
  
})();