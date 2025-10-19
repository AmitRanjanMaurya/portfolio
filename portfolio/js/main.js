// Basic functionality - Year and header scroll effect
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing basic functions...');

  // Set current year
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
    console.log('Year set to:', new Date().getFullYear());
  }

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    console.log('Header found, adding scroll effect');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = currentScrollY;
    });
  } else {
    console.log('Header not found');
  }
});

// Theme toggle with persistence - Fixed
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing theme toggle...');

  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Load saved theme
  const stored = localStorage.getItem('theme');
  if (stored === 'light') {
    root.classList.add('light');
    console.log('Light theme loaded from storage');
  } else {
    root.classList.remove('light');
    console.log('Dark theme active');
  }

  // Theme toggle functionality
  if (toggle) {
    console.log('Theme toggle button found');
    toggle.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      const isLight = root.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      console.log('Theme switched to:', isLight ? 'light' : 'dark');
    });
  } else {
    console.log('Theme toggle button not found');
  }
});

// Mobile navigation - Fixed
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing mobile navigation...');

  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (btn && menu) {
    console.log('Mobile nav elements found');

    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      console.log('Mobile menu toggled:', open);
    });

    menu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.nodeName === 'A') {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        console.log('Mobile menu closed via link click');
      }
    });
  } else {
    console.log('Mobile nav elements not found - btn:', !!btn, 'menu:', !!menu);
  }
});

// Preloader - Disabled for debugging
// (Preloader is hidden via CSS display:none in HTML)

// Advanced cursor effects - Temporarily disabled for debugging
// (Complex cursor animations can cause performance issues)

// Intersection reveal - Fixed with fallback
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing reveal animations...');

  const els = document.querySelectorAll('[data-reveal]');
  console.log('Found elements with data-reveal:', els.length);

  // Immediate fallback - show all elements after 1 second if they're not visible
  setTimeout(() => {
    els.forEach(el => {
      if (!el.classList.contains('visible')) {
        console.log('Fallback: Making element visible', el);
        el.classList.add('visible');
      }
    });
  }, 1000);

  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported, showing all elements immediately');
    els.forEach(e => e.classList.add('visible'));
    return;
  }

  if (els.length === 0) {
    console.log('No elements with data-reveal found');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Element became visible:', entry.target);
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 }); // Very low threshold

  els.forEach(el => {
    io.observe(el);
    // Show elements that are already in viewport immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      console.log('Element already in viewport, showing immediately:', el);
      el.classList.add('visible');
    }
  });
});

// Enhanced typing effect (home)
(function () {
  const el = document.getElementById('typing');
  if (!el) return;
  const phrases = [
    'Full Stack Developer & Data Scientist',
    'Building Web, Data, and AI Solutions',
    'Performance, Accessibility, and UX Focused',
    'Creating Digital Experiences That Matter'
  ];
  let pi = 0, ci = 0, dir = 1;
  const tick = () => {
    const p = phrases[pi];
    ci += dir;
    if (ci === p.length + 6) dir = -1;
    if (ci < 0) { dir = 1; pi = (pi + 1) % phrases.length; ci = 0; }
    el.textContent = p.slice(0, Math.max(0, Math.min(ci, p.length)));
    setTimeout(tick, dir > 0 ? 80 : 40);
  };
  tick();
})();

// Advanced Real-time Metrics with Physics
(function () {
  const metrics = document.querySelectorAll('[data-counter], [data-target]');
  if (metrics.length === 0) return;

  const animate = (el) => {
    const numEl = el.querySelector('.num, .stat-value');
    const target = Number(el.getAttribute('data-target')) || 0;
    const start = performance.now();
    const duration = 2000;

    // Add physics-based easing
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);

      // Advanced easing with bounce effect
      const easeOutBounce = (t) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      };

      const easedProgress = easeOutBounce(progress);
      const val = Math.floor(target * easedProgress);

      if (numEl) {
        numEl.textContent = String(val);
        // Add visual feedback
        if (progress < 1) {
          numEl.style.transform = `scale(${1 + Math.sin(progress * Math.PI * 4) * 0.1})`;
        } else {
          numEl.style.transform = 'scale(1)';
        }
      }

      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  metrics.forEach(m => io.observe(m));
})();

// AI-Powered Dynamic Content
(function () {
  const aiPanel = document.querySelector('.ai-interaction-panel');
  const suggestions = document.querySelectorAll('.suggestion');

  if (aiPanel && suggestions.length > 0) {
    const responses = [
      "I can help you explore my portfolio!",
      "Ask me about my skills and experience.",
      "Want to see my latest projects?",
      "I'm here to answer your questions.",
      "Let's discuss your project needs!"
    ];

    let currentSuggestion = 0;
    setInterval(() => {
      suggestions.forEach((suggestion, index) => {
        if (index === currentSuggestion) {
          suggestion.style.background = 'var(--gradient-primary)';
          suggestion.style.color = 'white';
          suggestion.style.transform = 'translateX(4px)';
        } else {
          suggestion.style.background = 'var(--card-glass)';
          suggestion.style.color = 'var(--muted)';
          suggestion.style.transform = 'translateX(0)';
        }
      });
      currentSuggestion = (currentSuggestion + 1) % suggestions.length;
    }, 3000);
  }
})();

// Radial chart animations
(function () {
  const radials = document.querySelectorAll('.radial[data-value]');
  if (radials.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const radial = entry.target;
        const value = parseFloat(radial.getAttribute('data-value'));
        radial.style.setProperty('--value', value);
        radial.classList.add('animated');
        io.unobserve(radial);
      }
    });
  }, { threshold: 0.5 });
  radials.forEach(r => io.observe(r));
})();

// Smooth anchor scrolling offset for fixed header
document.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  if (target.matches('a[href^="#"]')) {
    const id = target.getAttribute('href');
    if (!id) return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
});

// Advanced Smooth Scrolling with Physics
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const startPosition = window.pageYOffset;
      const targetPosition = target.offsetTop - 80;
      const distance = targetPosition - startPosition;
      const duration = Math.min(1000, Math.abs(distance) * 0.5);

      let startTime = null;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  });
});

// Advanced Gesture Controls
(function () {
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - could trigger navigation
        console.log('Swipe right detected');
      } else {
        // Swipe left - could trigger navigation
        console.log('Swipe left detected');
      }
    }
  });
})();

// Real-time Performance Monitoring
(function () {
  const performanceData = {
    loadTime: performance.now(),
    interactions: 0,
    scrollDistance: 0
  };

  // Track interactions
  document.addEventListener('click', () => {
    performanceData.interactions++;
  });

  // Track scroll distance
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    performanceData.scrollDistance += Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
  });

  // Update real-time stats
  setInterval(() => {
    const uptimeElement = document.querySelector('[data-target="99"]');
    const responseTimeElement = document.querySelector('[data-target="24"]');

    if (uptimeElement) {
      const uptime = Math.min(99, 95 + Math.random() * 4);
      uptimeElement.textContent = Math.floor(uptime);
    }

    if (responseTimeElement) {
      const responseTime = Math.floor(20 + Math.random() * 10);
      responseTimeElement.textContent = responseTime;
    }
  }, 2000);
})();


// Enhanced Skills Page Animations
(function () {
  // Animate skill progress bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress[data-width]');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');

          // Animate with delay for staggered effect
          setTimeout(() => {
            bar.style.width = width + '%';
          }, Math.random() * 500);

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Animate circular progress charts
  function animateCircularProgress() {
    const circularSkills = document.querySelectorAll('.circular-skill[data-value]');
    if (circularSkills.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skill = entry.target;
          const value = parseFloat(skill.getAttribute('data-value'));
          const circle = skill.querySelector('.progress-ring-bar');
          const percentElement = skill.querySelector('.skill-percent');

          if (circle && percentElement) {
            const circumference = 2 * Math.PI * 70; // radius = 70
            const offset = circumference - (value * circumference);

            // Animate the circle
            setTimeout(() => {
              circle.style.strokeDashoffset = offset;
            }, Math.random() * 300);

            // Animate the percentage counter
            animateCounter(percentElement, Math.floor(value * 100), 2000);
          }

          observer.unobserve(skill);
        }
      });
    }, { threshold: 0.4 });

    circularSkills.forEach(skill => observer.observe(skill));
  }

  // Animate stat numbers
  function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'));
          animateCounter(element, target, 2500);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
  }

  // Counter animation helper
  function animateCounter(element, target, duration) {
    const start = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

      element.textContent = currentValue;

      // Add visual feedback
      if (progress < 1) {
        element.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.1})`;
        requestAnimationFrame(updateCounter);
      } else {
        element.style.transform = 'scale(1)';
        element.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Floating code animation
  function animateFloatingCode() {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    codeSnippets.forEach((snippet, index) => {
      // Add random movement
      setInterval(() => {
        const x = Math.sin(Date.now() * 0.001 + index) * 20;
        const y = Math.cos(Date.now() * 0.0015 + index) * 15;
        snippet.style.transform = `translate(${x}px, ${y}px) rotate(${Math.sin(Date.now() * 0.002 + index) * 5}deg)`;
      }, 50);
    });
  }

  // Skill category hover effects
  function addSkillCategoryEffects() {
    const categories = document.querySelectorAll('.skill-category');
    categories.forEach(category => {
      category.addEventListener('mouseenter', () => {
        const icon = category.querySelector('.category-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
      });

      category.addEventListener('mouseleave', () => {
        const icon = category.querySelector('.category-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  // Initialize all animations when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Add small delay to ensure elements are rendered
    setTimeout(() => {
      animateSkillBars();
      animateCircularProgress();
      animateStatNumbers();
      animateFloatingCode();
      addSkillCategoryEffects();
    }, 100);
  });

  // Re-initialize on page visibility change (for better performance)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(() => {
        animateSkillBars();
        animateCircularProgress();
        animateStatNumbers();
      }, 200);
    }
  });
})();

// Advanced Skills Page Interactions
(function () {
  // Add particle effects on skill hover
  function createParticleEffect(element) {
    const particles = [];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: all 0.6s ease-out;
      `;

      document.body.appendChild(particle);
      particles.push(particle);

      const rect = element.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      setTimeout(() => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '1';

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 600);
        }, 300);
      }, i * 50);
    }
  }

  // Add particle effects to skill items
  document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (Math.random() > 0.7) { // 30% chance for performance
          createParticleEffect(item);
        }
      });
    });
  });
})();

// ===== PRICING PAGE FUNCTIONALITY =====
(function () {
  // Pricing toggle functionality
  function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const projectPrices = document.querySelectorAll('.project-price');
    const monthlyPeriods = document.querySelectorAll('.monthly-period');
    const projectPeriods = document.querySelectorAll('.project-period');
    const projectSavings = document.querySelectorAll('.project-savings');
    const toggleLabels = document.querySelectorAll('.toggle-label');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isProjectBased = toggle.classList.toggle('active');

      // Update toggle labels
      toggleLabels.forEach((label, index) => {
        label.classList.toggle('active', index === (isProjectBased ? 1 : 0));
      });

      // Animate price changes
      if (isProjectBased) {
        // Switch to project-based pricing
        monthlyPrices.forEach(price => {
          price.style.transform = 'translateY(-20px)';
          price.style.opacity = '0';
          setTimeout(() => {
            price.style.display = 'none';
          }, 150);
        });

        monthlyPeriods.forEach(period => {
          period.style.transform = 'translateY(-20px)';
          period.style.opacity = '0';
          setTimeout(() => {
            period.style.display = 'none';
          }, 150);
        });

        setTimeout(() => {
          projectPrices.forEach(price => {
            price.style.display = 'inline';
            price.style.transform = 'translateY(20px)';
            price.style.opacity = '0';
            setTimeout(() => {
              price.style.transform = 'translateY(0)';
              price.style.opacity = '1';
            }, 50);
          });

          projectPeriods.forEach(period => {
            period.style.display = 'inline';
            period.style.transform = 'translateY(20px)';
            period.style.opacity = '0';
            setTimeout(() => {
              period.style.transform = 'translateY(0)';
              period.style.opacity = '1';
            }, 50);
          });

          projectSavings.forEach(saving => {
            saving.style.display = 'block';
            saving.style.transform = 'scale(0.8)';
            saving.style.opacity = '0';
            setTimeout(() => {
              saving.style.transform = 'scale(1)';
              saving.style.opacity = '1';
            }, 100);
          });
        }, 150);

      } else {
        // Switch to monthly pricing
        projectPrices.forEach(price => {
          price.style.transform = 'translateY(-20px)';
          price.style.opacity = '0';
          setTimeout(() => {
            price.style.display = 'none';
          }, 150);
        });

        projectPeriods.forEach(period => {
          period.style.transform = 'translateY(-20px)';
          period.style.opacity = '0';
          setTimeout(() => {
            period.style.display = 'none';
          }, 150);
        });

        projectSavings.forEach(saving => {
          saving.style.transform = 'scale(0.8)';
          saving.style.opacity = '0';
          setTimeout(() => {
            saving.style.display = 'none';
          }, 150);
        });

        setTimeout(() => {
          monthlyPrices.forEach(price => {
            price.style.display = 'inline';
            price.style.transform = 'translateY(20px)';
            price.style.opacity = '0';
            setTimeout(() => {
              price.style.transform = 'translateY(0)';
              price.style.opacity = '1';
            }, 50);
          });

          monthlyPeriods.forEach(period => {
            period.style.display = 'inline';
            period.style.transform = 'translateY(20px)';
            period.style.opacity = '0';
            setTimeout(() => {
              period.style.transform = 'translateY(0)';
              period.style.opacity = '1';
            }, 50);
          });
        }, 150);
      }
    });
  }

  // FAQ functionality
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs
        faqQuestions.forEach(q => {
          if (q !== question) {
            q.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current FAQ
        question.setAttribute('aria-expanded', String(!isExpanded));
      });
    });
  }

  // Pricing card hover effects
  function initPricingCardEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add subtle animation to other cards
        pricingCards.forEach(otherCard => {
          if (otherCard !== card && !otherCard.classList.contains('popular')) {
            otherCard.style.transform = 'scale(0.98)';
            otherCard.style.opacity = '0.8';
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        // Reset other cards
        pricingCards.forEach(otherCard => {
          if (otherCard !== card && !otherCard.classList.contains('popular')) {
            otherCard.style.transform = '';
            otherCard.style.opacity = '';
          }
        });
      });
    });
  }

  // Floating price elements animation
  function initFloatingPriceElements() {
    const priceElements = document.querySelectorAll('.price-element');

    priceElements.forEach((element, index) => {
      // Add random movement
      setInterval(() => {
        const x = Math.sin(Date.now() * 0.001 + index * 2) * 15;
        const y = Math.cos(Date.now() * 0.0012 + index * 2) * 10;
        const rotation = Math.sin(Date.now() * 0.0008 + index) * 10;

        element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      }, 100);
    });
  }

  // Initialize all pricing page functionality
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.pricing-page')) {
      initPricingToggle();
      initFAQ();
      initPricingCardEffects();
      initFloatingPriceElements();
    }
  });
})();

// Enhanced pricing card animations
(function () {
  function addPricingCardParticles(card) {
    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: all 0.8s ease-out;
      `;

      document.body.appendChild(particle);
      particles.push(particle);

      const rect = card.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      setTimeout(() => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '0.8';

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 800);
        }, 400);
      }, i * 30);
    }
  }

  // Add particle effects to popular plan
  document.addEventListener('DOMContentLoaded', () => {
    const popularCard = document.querySelector('.pricing-card.popular');
    if (popularCard) {
      // Add particles on hover with reduced frequency
      popularCard.addEventListener('mouseenter', () => {
        if (Math.random() > 0.6) { // 40% chance
          addPricingCardParticles(popularCard);
        }
      });

      // Add periodic particle burst
      setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance every interval
          addPricingCardParticles(popularCard);
        }
      }, 3000);
    }
  });
})();

// Emergency content visibility fix
document.addEventListener('DOMContentLoaded', () => {
  console.log('Emergency content fix running...');

  // Force show all content after 500ms
  setTimeout(() => {
    // Show all elements with data-reveal
    const hiddenElements = document.querySelectorAll('[data-reveal]:not(.visible)');
    console.log('Force showing', hiddenElements.length, 'hidden elements');
    hiddenElements.forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Ensure main content is visible
    const main = document.querySelector('main');
    if (main) {
      main.style.display = 'block';
      main.style.visibility = 'visible';
      main.style.opacity = '1';
      console.log('Main content forced visible');
    }

    // Ensure sections are visible
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.opacity = '1';
    });
    console.log('All sections forced visible');

  }, 500);
});

// Simplified initialization
console.log('Portfolio JavaScript loaded successfully');// =====
 PROFESSIONAL ANIMATIONS SYSTEM =====

  // Advanced Scroll Animations
  class ScrollAnimations {
    constructor() {
      this.elements = document.querySelectorAll('[data-reveal]');
      this.init();
    }

    init() {
      this.createObserver();
      this.addScrollEffects();
      this.addParallaxEffects();
    }

    createObserver() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, options);

      this.elements.forEach(el => this.observer.observe(el));
    }

    animateElement(element) {
      const animationType = element.getAttribute('data-reveal');
      const delay = element.getAttribute('data-delay') || 0;

      setTimeout(() => {
        element.classList.add('visible');

        // Add specific animation classes
        switch (animationType) {
          case 'fade-up':
            element.style.animation = 'slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
          case 'slide-left':
            element.style.animation = 'slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
          case 'slide-right':
            element.style.animation = 'slideInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
          case 'fade-in':
            element.style.animation = 'fadeInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            break;
        }
      }, delay);
    }

    addScrollEffects() {
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.updateScrollEffects();
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    updateScrollEffects() {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }

    addParallaxEffects() {
      const parallaxElements = document.querySelectorAll('.hero-bg, .floating-shapes');

      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
          const speed = 0.3;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    }
  }

// Professional Typing Animation
class TypingAnimation {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: 100,
      deleteSpeed: 50,
      delayBetween: 2000,
      loop: true,
      ...options
    };
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.options.delayBetween;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Smooth Counter Animation
class CounterAnimation {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.startTime = null;
  }

  start() {
    const animate = (currentTime) => {
      if (!this.startTime) this.startTime = currentTime;

      const progress = Math.min((currentTime - this.startTime) / this.duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(this.target * easeOutQuart);

      this.element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.element.textContent = this.target;
      }
    };

    requestAnimationFrame(animate);
  }
}

// Particle System
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      particleCount: 50,
      particleSize: 2,
      speed: 1,
      color: '#3b82f6',
      ...options
    };
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${this.options.particleSize}px;
        height: ${this.options.particleSize}px;
        background: ${this.options.color};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.3;
      `;

      this.container.appendChild(particle);

      this.particles.push({
        element: particle,
        x: Math.random() * this.container.offsetWidth,
        y: Math.random() * this.container.offsetHeight,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        life: Math.random()
      });
    }
  }

  animate() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.01;

      if (particle.life <= 0 || particle.x < 0 || particle.x > this.container.offsetWidth ||
        particle.y < 0 || particle.y > this.container.offsetHeight) {
        particle.x = Math.random() * this.container.offsetWidth;
        particle.y = Math.random() * this.container.offsetHeight;
        particle.life = 1;
      }

      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      particle.element.style.opacity = particle.life * 0.5;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Mouse Trail Effect
class MouseTrail {
  constructor() {
    this.trail = [];
    this.maxTrail = 20;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.addTrailPoint(e.clientX, e.clientY);
    });

    this.animate();
  }

  addTrailPoint(x, y) {
    const point = document.createElement('div');
    point.className = 'mouse-trail-point';
    point.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.8;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(point);
    this.trail.push(point);

    if (this.trail.length > this.maxTrail) {
      const oldPoint = this.trail.shift();
      oldPoint.remove();
    }
  }

  animate() {
    this.trail.forEach((point, index) => {
      const life = (index + 1) / this.trail.length;
      point.style.opacity = life * 0.8;
      point.style.transform = `translate(-50%, -50%) scale(${life})`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing professional animations...');

  // Initialize scroll animations
  new ScrollAnimations();

  // Initialize typing animation for hero text
  const typingElement = document.querySelector('.hero-roles');
  if (typingElement) {
    const texts = [
      'a Full Stack Developer.',
      'a Professional Coder.',
      'a Data Scientist.',
      'an AI Specialist.',
      'a Problem Solver.'
    ];
    new TypingAnimation(typingElement, texts);
  }

  // Initialize counters
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        new CounterAnimation(entry.target, target).start();
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // Initialize particle systems
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    new ParticleSystem(heroSection, {
      particleCount: 30,
      particleSize: 1,
      speed: 0.5,
      color: 'rgba(59, 130, 246, 0.3)'
    });
  }

  // Initialize mouse trail (only on desktop)
  if (window.innerWidth > 768) {
    new MouseTrail();
  }

  // Add smooth hover effects to cards
  const cards = document.querySelectorAll('.card, .feature-card, .portfolio-card, .skill-card, .service, .pricing-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });

  // Add loading bar animation
  const loadingBar = document.createElement('div');
  loadingBar.className = 'loading-bar';
  loadingBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 10000;
    width: 0%;
  `;
  document.body.appendChild(loadingBar);

  // Animate loading bar
  setTimeout(() => {
    loadingBar.style.width = '100%';
    setTimeout(() => {
      loadingBar.style.opacity = '0';
      setTimeout(() => loadingBar.remove(), 300);
    }, 1000);
  }, 100);

  console.log('Professional animations initialized successfully!');
});

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.98)';
});

// Performance optimization
let animationId;
function optimizedAnimation(callback) {
  if (animationId) cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(callback);
}

console.log('Professional animation system loaded!');// ====
= ADVANCED INTERACTIVE FEATURES =====

  // Scroll Progress Indicator
  class ScrollProgress {
    constructor() {
      this.createIndicator();
      this.updateProgress();
    }

    createIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'scroll-indicator';
      indicator.innerHTML = '<div class="scroll-progress"></div>';
      document.body.appendChild(indicator);

      this.progressBar = indicator.querySelector('.scroll-progress');
    }

    updateProgress() {
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        this.progressBar.style.width = scrollPercent + '%';
      });
    }
  }

// Magnetic Effect for Interactive Elements
class MagneticEffect {
  constructor() {
    this.elements = document.querySelectorAll('.btn, .card, .feature-card');
    this.init();
  }

  init() {
    this.elements.forEach(element => {
      element.classList.add('magnetic');

      element.addEventListener('mousemove', (e) => {
        this.handleMouseMove(e, element);
      });

      element.addEventListener('mouseleave', () => {
        this.handleMouseLeave(element);
      });
    });
  }

  handleMouseMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * 0.1;
    const moveY = y * 0.1;

    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  handleMouseLeave(element) {
    element.style.transform = 'translate(0px, 0px)';
  }
}

// Advanced Text Animations
class TextAnimations {
  constructor() {
    this.initTextReveal();
    this.initShimmerEffect();
  }

  initTextReveal() {
    const textElements = document.querySelectorAll('.hero-title, .section-title');

    textElements.forEach(element => {
      const text = element.textContent;
      const words = text.split(' ');

      element.innerHTML = words.map(word =>
        `<span class="text-reveal-word">${word}</span>`
      ).join(' ');

      const spans = element.querySelectorAll('.text-reveal-word');
      spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
        span.classList.add('text-reveal');
      });
    });
  }

  initShimmerEffect() {
    const shimmerElements = document.querySelectorAll('.name-highlight');
    shimmerElements.forEach(element => {
      element.classList.add('shimmer-text');
    });
  }
}

// Professional Loading States
class LoadingStates {
  constructor() {
    this.createPageTransition();
    this.handleFormSubmissions();
  }

  createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // Handle page navigation
    document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) return;

        e.preventDefault();
        transition.classList.add('active');

        setTimeout(() => {
          window.location.href = link.href;
        }, 600);
      });
    });
  }

  handleFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.innerHTML = '<span class="loading-wave">.</span><span class="loading-wave">.</span><span class="loading-wave">.</span>';
          submitBtn.disabled = true;

          // Reset after 3 seconds (adjust based on actual form handling)
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }
      });
    });
  }
}

// Enhanced Skill Bars with Advanced Animations
class AdvancedSkillBars {
  constructor() {
    this.initSkillBars();
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percentage = bar.getAttribute('data-width');

          bar.style.setProperty('--skill-percentage', percentage + '%');
          bar.classList.add('skill-bar-advanced');

          // Add number counter animation
          const skillItem = bar.closest('.skill-item');
          const percentageElement = skillItem?.querySelector('.skill-percentage');

          if (percentageElement) {
            this.animatePercentage(percentageElement, parseInt(percentage));
          }

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  animatePercentage(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation

    const animate = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + '%';
        requestAnimationFrame(animate);
      } else {
        element.textContent = target + '%';
      }
    };

    animate();
  }
}

// Interactive Background Effects
class InteractiveBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.3;
    `;

    document.body.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.min(50, window.innerWidth / 20);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= dx * force * 0.01;
        particle.y -= dy * force * 0.01;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing advanced interactive features...');

  // Initialize scroll progress
  new ScrollProgress();

  // Initialize magnetic effects
  new MagneticEffect();

  // Initialize text animations
  new TextAnimations();

  // Initialize loading states
  new LoadingStates();

  // Initialize advanced skill bars
  new AdvancedSkillBars();

  // Initialize interactive background (only on desktop)
  if (window.innerWidth > 768) {
    new InteractiveBackground();
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log('Advanced interactive features initialized!');
});

// Performance monitoring and optimization
const performanceMonitor = {
  fps: 0,
  lastTime: performance.now(),

  update() {
    const now = performance.now();
    this.fps = 1000 / (now - this.lastTime);
    this.lastTime = now;

    // Reduce animations if FPS is too low
    if (this.fps < 30) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }

    requestAnimationFrame(() => this.update());
  }
};

// Start performance monitoring
performanceMonitor.update();

console.log('Advanced animation system fully loaded and optimized!');// ==
=== ENHANCED SERVICES PAGE FUNCTIONALITY =====

// Services Page Interactive Features
class ServicesPageEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.initServiceCardAnimations();
    this.initFAQFunctionality();
    this.initServiceComparison();
    this.initTestimonialRotation();
    this.initServiceStats();
    this.initServiceHoverEffects();
  }

  initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add staggered animation on load
    serviceCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });

    // Add interactive hover effects
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateServiceCard(card, 'enter');
      });

      card.addEventListener('mouseleave', () => {
        this.animateServiceCard(card, 'leave');
      });
    });
  }

  animateServiceCard(card, action) {
    const icon = card.querySelector('.service-icon-wrapper');
    const features = card.querySelectorAll('.feature-item');
    const techBadges = card.querySelectorAll('.tech-badge');

    if (action === 'enter') {
      // Animate icon
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(10deg)';
      }

      // Stagger feature animations
      features.forEach((feature, index) => {
        setTimeout(() => {
          feature.style.transform = 'translateX(8px)';
          feature.style.color = 'var(--primary)';
        }, index * 50);
      });

      // Animate tech badges
      techBadges.forEach((badge, index) => {
        setTimeout(() => {
          badge.style.transform = 'translateY(-2px)';
          badge.style.background = 'var(--gradient-primary)';
          badge.style.color = 'white';
        }, index * 30);
      });
    } else {
      // Reset animations
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }

      features.forEach(feature => {
        feature.style.transform = 'translateX(0)';
        feature.style.color = '';
      });

      techBadges.forEach(badge => {
        badge.style.transform = 'translateY(0)';
        badge.style.background = '';
        badge.style.color = '';
      });
    }
  }

  initFAQFunctionality() {
    const faqQuestions = document.querySelectorAll('.services-faq .faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQs
        faqQuestions.forEach(q => {
          if (q !== question) {
            q.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current FAQ
        question.setAttribute('aria-expanded', String(!isExpanded));
        
        // Add smooth animation
        const answer = question.nextElementSibling;
        if (!isExpanded) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0px';
        }
      });
    });
  }

  initServiceComparison() {
    const comparisonTable = document.querySelector('.comparison-table');
    if (!comparisonTable) return;

    // Add hover effects to comparison rows
    const rows = comparisonTable.querySelectorAll('.comparison-row');
    rows.forEach(row => {
      const cells = row.querySelectorAll('.comparison-cell');
      
      cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
          cells.forEach(c => c.style.background = 'var(--primary)');
          cells.forEach(c => c.style.color = 'white');
          cells.forEach(c => c.style.transform = 'scale(1.05)');
        });

        cell.addEventListener('mouseleave', () => {
          cells.forEach(c => c.style.background = '');
          cells.forEach(c => c.style.color = '');
          cells.forEach(c => c.style.transform = 'scale(1)');
        });
      });
    });
  }

  initTestimonialRotation() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    // Add subtle highlight rotation
    setInterval(() => {
      testimonials.forEach(testimonial => {
        testimonial.style.transform = '';
        testimonial.style.boxShadow = '';
      });

      if (testimonials[currentIndex]) {
        testimonials[currentIndex].style.transform = 'translateY(-5px) scale(1.02)';
        testimonials[currentIndex].style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
      }

      currentIndex = (currentIndex + 1) % testimonials.length;
    }, 4000);
  }

  initServiceStats() {
    const statNumbers = document.querySelectorAll('.stat-number-large[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'));
          this.animateStatNumber(element, target);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  animateStatNumber(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      current = Math.floor(target * easeOutQuart);
      
      element.textContent = current;
      
      // Add visual feedback
      element.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.1})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
        element.style.transform = 'scale(1)';
      }
    };

    requestAnimationFrame(animate);
  }

  initServiceHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      // Add ripple effect on click
      card.addEventListener('click', (e) => {
        this.createRippleEffect(e, card);
      });

      // Add tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        this.addTiltEffect(e, card);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      animation: rippleAnimation 0.6s ease-out;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addTiltEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const tiltX = deltaY * 5; // Max 5 degrees
    const tiltY = deltaX * -5; // Max 5 degrees

    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
  }
}

// Service Card Particle Effects
class ServiceParticleEffects {
  constructor() {
    this.init();
  }

  init() {
    const premiumCards = document.querySelectorAll('.service-card.premium');
    
    premiumCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (Math.random() > 0.7) { // 30% chance
          this.createParticleEffect(card);
        }
      });
    });
  }

  createParticleEffect(element) {
    const particles = [];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: all 0.8s ease-out;
      `;

      document.body.appendChild(particle);
      particles.push(particle);

      const rect = element.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      setTimeout(() => {
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '0.8';

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 800);
        }, 400);
      }, i * 40);
    }
  }
}

// Initialize services page enhancements
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.services-page')) {
    console.log('Initializing services page enhancements...');
    
    new ServicesPageEnhancements();
    new ServiceParticleEffects();
    
    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleAnimation {
        0% {
          transform: scale(0);
          opacity: 0.6;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    console.log('Services page enhancements initialized!');
  }
});

// Projects Page Enhanced Functionality
class ProjectsPageEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.initProjectFilters();
    this.initProjectModal();
    this.initProjectAnimations();
    this.initLoadMore();
  }

  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.remove('filtered-out');
            card.classList.add('filtered-in');
          } else {
            card.classList.remove('filtered-in');
            card.classList.add('filtered-out');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  initProjectModal() {
    const modal = document.getElementById('project-modal');
    const openBtns = document.querySelectorAll('[onclick^="openProjectModal"]');
    const closeBtns = document.querySelectorAll('[data-close]');

    // Create global function for opening modal
    window.openProjectModal = (projectId) => {
      this.populateModal(projectId);
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  populateModal(projectId) {
    const projectData = {
      'ecommerce': {
        title: 'Advanced E-Commerce Platform',
        image: 'assets/placeholder-1.svg',
        rating: '5.0',
        stars: '⭐⭐⭐⭐⭐',
        description: 'A comprehensive e-commerce solution built with modern technologies, featuring real-time inventory management, secure payment processing, and advanced analytics.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'],
        features: [
          'Real-time inventory tracking',
          'Secure payment processing',
          'Advanced analytics dashboard',
          'Multi-vendor support',
          'Mobile-responsive design',
          'SEO optimization'
        ],
        details: {
          'Duration': '3 months',
          'Client': 'TechCorp Inc.',
          'Team Size': '4 developers',
          'Technologies': '6+ modern tools'
        },
        liveDemo: '#',
        sourceCode: '#'
      },
      'analytics': {
        title: 'Real-Time Analytics Dashboard',
        image: 'assets/placeholder-2.svg',
        rating: '4.8',
        stars: '⭐⭐⭐⭐⭐',
        description: 'Interactive dashboard for real-time data visualization with machine learning insights and predictive analytics.',
        tech: ['Python', 'D3.js', 'Flask', 'PostgreSQL', 'Pandas', 'Scikit-learn'],
        features: [
          'Real-time data processing',
          'Interactive visualizations',
          'Machine learning insights',
          'Custom report generation',
          'Data export capabilities',
          'Multi-user access control'
        ],
        details: {
          'Duration': '2 months',
          'Type': 'Data Science',
          'Data Points': '1M+ processed',
          'Accuracy': '94% prediction'
        },
        liveDemo: '#',
        sourceCode: '#'
      }
      // Add more project data as needed
    };

    const project = projectData[projectId];
    if (!project) return;

    // Populate modal content
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-image').src = project.image;
    document.getElementById('modal-project-rating').textContent = project.rating;
    document.getElementById('modal-project-stars').textContent = project.stars;
    document.getElementById('modal-project-desc').textContent = project.description;

    // Populate tech tags
    const techContainer = document.getElementById('modal-project-tech');
    techContainer.innerHTML = project.tech.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Populate features
    const featuresContainer = document.getElementById('modal-project-features');
    featuresContainer.innerHTML = project.features.map(feature => 
      `<li>${feature}</li>`
    ).join('');

    // Populate details
    const detailsContainer = document.getElementById('modal-project-details');
    detailsContainer.innerHTML = Object.entries(project.details).map(([key, value]) => 
      `<div class="meta-item">
        <span class="meta-label">${key}:</span>
        <span class="meta-value">${value}</span>
      </div>`
    ).join('');

    // Set links
    document.getElementById('modal-live-demo').href = project.liveDemo;
    document.getElementById('modal-source-code').href = project.sourceCode;
  }

  initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add subtle particle effect
        if (Math.random() > 0.8) { // 20% chance
          this.createProjectParticles(card);
        }
      });
    });
  }

  createProjectParticles(element) {
    const particles = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: all 0.6s ease-out;
      `;

      document.body.appendChild(particle);
      particles.push(particle);

      const rect = element.getBoundingClientRect();
      const startX = rect.left + Math.random() * rect.width;
      const startY = rect.top + Math.random() * rect.height;

      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';

      setTimeout(() => {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = '0.6';

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 600);
        }, 300);
      }, i * 50);
    }
  }

  initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
      // Simulate loading more projects
      loadMoreBtn.innerHTML = '<span class="loading-spinner"></span> Loading...';
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        loadMoreBtn.innerHTML = '<span class="btn-text">Load More Projects</span><span class="btn-icon">↓</span>';
        loadMoreBtn.disabled = false;
        
        // Here you would typically load more projects from an API
        console.log('Loading more projects...');
      }, 2000);
    });
  }
}

// Initialize projects page enhancements
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.projects-page')) {
    console.log('Initializing projects page enhancements...');
    new ProjectsPageEnhancements();
    console.log('Projects page enhancements initialized!');
  }
});

console.log('Enhanced services and projects functionality loaded!');