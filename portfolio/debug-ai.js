// Simple debug version to test AI chatbot
console.log('Debug AI script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, creating simple chatbot...');
  
  // Create a simple test chatbot
  const widget = document.createElement('div');
  widget.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 28px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
  `;
  widget.innerHTML = '🤖';
  widget.title = 'AI Assistant';
  
  widget.addEventListener('click', () => {
    alert('AI Chatbot clicked! The full version should be working.');
  });
  
  document.body.appendChild(widget);
  console.log('Simple chatbot created successfully');
});