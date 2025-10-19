// Script to update all page headers with professional structure
// This is a one-time utility script

const professionalHeader = `  <header class="site-header" data-sticky>
    <div class="header-background"></div>
    <div class="container header-inner">
      <div class="logo-section">
        <a class="logo" href="index.html" aria-label="Go to home">
          <div class="logo-icon">
            <span class="logo-symbol">A</span>
          </div>
          <div class="logo-content">
            <span class="logo-text">Amit Ranjan</span>
            <span class="logo-subtitle">Full Stack Developer</span>
          </div>
        </a>
      </div>
      
      <nav class="site-nav" aria-label="Primary">
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu">
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="sr-only">Menu</span>
        </button>
        
        <ul id="nav-menu" class="nav-menu">
          <li><a href="index.html" class="nav-link" data-text="Home">Home</a></li>
          <li><a href="about.html" class="nav-link" data-text="About">About</a></li>
          <li><a href="skills.html" class="nav-link" data-text="Skills">Skills</a></li>
          <li><a href="services.html" class="nav-link" data-text="Services">Services</a></li>
          <li><a href="projects.html" class="nav-link" data-text="Portfolio">Portfolio</a></li>
          <li><a href="pricing.html" class="nav-link" data-text="Pricing">Pricing</a></li>
          <li><a href="contact.html" class="nav-link" data-text="Contact">Contact</a></li>
        </ul>
        
        <div class="header-actions">
          <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
            <span class="theme-icon" aria-hidden="true"></span>
            <span class="theme-text">Theme</span>
          </button>
          <a href="contact.html" class="cta-button">
            <span class="cta-text">Let's Talk</span>
            <span class="cta-icon">→</span>
          </a>
        </div>
      </nav>
    </div>
    
    <div class="header-progress"></div>
  </header>`;

// Function to set active page
function setActivePage(headerHTML, pageName) {
  return headerHTML.replace(
    `<a href="${pageName}" class="nav-link" data-text="${pageName.charAt(0).toUpperCase() + pageName.slice(1, -5)}">${pageName.charAt(0).toUpperCase() + pageName.slice(1, -5)}</a>`,
    `<a href="${pageName}" class="nav-link active" data-text="${pageName.charAt(0).toUpperCase() + pageName.slice(1, -5)}">${pageName.charAt(0).toUpperCase() + pageName.slice(1, -5)}</a>`
  );
}

console.log('Professional header template created');
console.log('Use this template to update remaining pages manually');
console.log(professionalHeader);