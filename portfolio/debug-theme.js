// Debug theme toggle functionality
console.log('Theme debug script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, debugging theme...');
  
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  
  console.log('Root element:', root);
  console.log('Toggle button:', toggle);
  console.log('Current classes on html:', root.className);
  console.log('Stored theme:', localStorage.getItem('theme'));
  
  // Test theme switching manually
  if (toggle) {
    console.log('Adding debug click handler to theme toggle');
    
    toggle.addEventListener('click', (e) => {
      console.log('Theme toggle clicked!');
      console.log('Before toggle - classes:', root.className);
      
      const wasLight = root.classList.contains('light');
      console.log('Was light mode:', wasLight);
      
      if (wasLight) {
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
      } else {
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
      }
      
      console.log('After toggle - classes:', root.className);
      console.log('Stored theme:', localStorage.getItem('theme'));
      
      // Visual feedback
      const feedback = document.createElement('div');
      feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card);
        color: var(--text);
        padding: 20px;
        border-radius: 10px;
        border: 2px solid var(--border);
        z-index: 9999;
        font-family: Arial, sans-serif;
        text-align: center;
      `;
      feedback.innerHTML = `
        <h3>Theme Debug</h3>
        <p>Current mode: ${root.classList.contains('light') ? 'Light' : 'Dark'}</p>
        <p>Classes: ${root.className}</p>
        <button onclick="this.parentNode.remove()">Close</button>
      `;
      document.body.appendChild(feedback);
      
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 3000);
    });
  } else {
    console.error('Theme toggle button not found!');
  }
  
  // Add manual theme test buttons
  const testContainer = document.createElement('div');
  testContainer.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
    display: flex;
    gap: 10px;
  `;
  
  const lightBtn = document.createElement('button');
  lightBtn.textContent = 'Force Light';
  lightBtn.style.cssText = 'padding: 10px; background: white; color: black; border: 1px solid black; cursor: pointer;';
  lightBtn.onclick = () => {
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
    console.log('Forced light mode');
  };
  
  const darkBtn = document.createElement('button');
  darkBtn.textContent = 'Force Dark';
  darkBtn.style.cssText = 'padding: 10px; background: black; color: white; border: 1px solid white; cursor: pointer;';
  darkBtn.onclick = () => {
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    console.log('Forced dark mode');
  };
  
  testContainer.appendChild(lightBtn);
  testContainer.appendChild(darkBtn);
  document.body.appendChild(testContainer);
  
  console.log('Theme debug setup complete');
});